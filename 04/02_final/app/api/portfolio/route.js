// app/api/portfolio/route.js

import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Node.js file system promises API
import path from 'path';     // Node.js path module

// --- Configuration ---
// Define the base directory for storing user data files
const dataDir = path.join(process.cwd(), 'data', 'watchlistPortfolio');

// --- Helper Functions ---

/**
 * Generates the full file path for a given username.
 * @param {string} username - The username.
 * @returns {string} The absolute path to the user's JSON data file.
 */
const getUserFilePath = (username) => path.join(dataDir, `${username}.json`);

/**
 * Ensures the data directory exists. Creates it if it doesn't.
 */
async function ensureDataDirectoryExists() {
    try {
        await fs.mkdir(dataDir, { recursive: true }); // recursive: true prevents error if dir exists
    } catch (error) {
        // We only care about errors other than the directory already existing
        if (error.code !== 'EEXIST') {
            console.error("Fatal Error: Could not create data directory:", dataDir, error);
            // This is a server configuration issue, throw a critical error
            throw new Error("Server configuration error preventing data storage.");
        }
    }
}

/**
 * Reads and parses the JSON data for a specific user.
 * @param {string} username - The username whose data needs to be read.
 * @returns {Promise<object | null>} A promise that resolves to the parsed user data object,
 * or null if the user's file doesn't exist.
 * @throws {Error} If reading or parsing fails for reasons other than file not found.
 */
async function readUserData(username) {
    const filePath = getUserFilePath(username);
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist for this user yet, which is a valid state
            return null;
        }
        // Log and re-throw other errors (permission issues, JSON parse errors, etc.)
        console.error(`Error reading data file for user ${username}:`, error);
        throw new Error(`Failed to read data for user ${username}.`);
    }
}

/**
 * Writes user data object to a JSON file.
 * @param {string} username - The username whose data needs to be written.
 * @param {object} data - The user data object to write.
 * @throws {Error} If writing fails.
 */
async function writeUserData(username, data) {
    const filePath = getUserFilePath(username);
    try {
        // Ensure the directory exists before attempting to write
        await ensureDataDirectoryExists();
        // Convert data to JSON string with pretty printing (2 spaces indentation)
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, 'utf-8');
    } catch (error) {
        // Log and re-throw write errors
        console.error(`Error writing data file for user ${username}:`, error);
        throw new Error(`Failed to save data for user ${username}.`);
    }
}

// --- API Handlers ---

// GET Handler (Existing, slightly refactored to use helpers)
export async function GET(request) {
    // !!! TEMPORARY: Hardcoding username. Replace with auth logic. !!!
    const username = 'Ram';

    try {
        const userData = await readUserData(username);

        // If user file exists, return their portfolio or an empty array if no portfolio key
        // If user file doesn't exist (userData is null), return empty array
        const portfolio = userData?.portfolio || [];
        return NextResponse.json({ portfolio });

    } catch (error) {
        // Handle errors thrown by readUserData (excluding file not found)
        console.error("API Portfolio GET Processing Error:", error);
        return NextResponse.json(
            { message: error.message || 'Failed to retrieve portfolio data.' },
            { status: 500 } // Internal Server Error
        );
    }
}

// POST Handler (Add a new stock to the portfolio)
export async function POST(request) {
    // !!! TEMPORARY: Hardcoding username. Replace with auth logic. !!!
    const username = 'Ram';

    try {
        // 1. Get the new stock data from the request body
        const newStock = await request.json();

        // 2. Basic Validation (adjust required fields as needed)
        if (!newStock || !newStock.name || newStock.quantity == null || newStock.avgPrice == null || newStock.currentPrice == null) {
            return NextResponse.json({ message: 'Missing required stock fields (name, quantity, avgPrice, currentPrice).' }, { status: 400 }); // Bad Request
        }

        // 3. Read existing user data (or get null if file doesn't exist)
        let userData = await readUserData(username);

        // 4. Initialize user data if it doesn't exist
        if (!userData) {
            userData = { watchlist: [], portfolio: [] };
        }
        // Ensure portfolio array exists
        if (!userData.portfolio) {
            userData.portfolio = [];
        }

        // 5. Check if stock already exists in portfolio (by name)
        const existingStockIndex = userData.portfolio.findIndex(stock => stock.name === newStock.name);
        if (existingStockIndex !== -1) {
            return NextResponse.json({ message: `Stock '${newStock.name}' already exists in the portfolio.` }, { status: 409 }); // Conflict
        }

        // 6. Add the new stock
        userData.portfolio.push(newStock);

        // 7. Write updated data back to file
        await writeUserData(username, userData);

        // 8. Return success response
        return NextResponse.json({ message: 'Stock added successfully.', addedStock: newStock }, { status: 201 }); // Created

    } catch (error) {
        // Handle JSON parsing errors, file I/O errors, etc.
        console.error("API Portfolio POST Error:", error);
        // Check if it's a known error type we threw
        const errorMessage = error instanceof Error ? error.message : 'Failed to add stock to portfolio.';
        return NextResponse.json(
            { message: errorMessage },
            { status: (error instanceof SyntaxError) ? 400 : 500 } // Bad request for JSON parse errors, 500 otherwise
        );
    }
}

// DELETE Handler (Remove a stock from the portfolio)
export async function DELETE(request) {
    // !!! TEMPORARY: Hardcoding username. Replace with auth logic. !!!
    const username = 'Ram';

    try {
        // 1. Get the name of the stock to delete from URL query parameters
        const { searchParams } = new URL(request.url);
        const stockNameToDelete = searchParams.get('name');

        if (!stockNameToDelete) {
            return NextResponse.json({ message: 'Missing stock name parameter to delete.' }, { status: 400 }); // Bad Request
        }

        // 2. Read existing user data
        let userData = await readUserData(username);

        // 3. Check if user data or portfolio exists
        if (!userData || !userData.portfolio || userData.portfolio.length === 0) {
            return NextResponse.json({ message: `Portfolio not found or empty for user ${username}.` }, { status: 404 }); // Not Found
        }

        // 4. Find the stock to delete
        const initialLength = userData.portfolio.length;
        userData.portfolio = userData.portfolio.filter(stock => stock.name !== stockNameToDelete);

        // 5. Check if any stock was actually removed
        if (userData.portfolio.length === initialLength) {
            return NextResponse.json({ message: `Stock '${stockNameToDelete}' not found in the portfolio.` }, { status: 404 }); // Not Found
        }

        // 6. Write updated data back to file
        await writeUserData(username, userData);

        // 7. Return success response
        return NextResponse.json({ message: `Stock '${stockNameToDelete}' deleted successfully.`, portfolio: userData.portfolio }); // OK

    } catch (error) {
        console.error("API Portfolio DELETE Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete stock from portfolio.';
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 } // Internal Server Error
        );
    }
}

// PUT Handler (Update an existing stock in the portfolio)
export async function PUT(request) {
    // !!! TEMPORARY: Hardcoding username. Replace with auth logic. !!!
    const username = 'Ram';

    try {
        // 1. Get the name of the stock to update from URL query parameters
        const { searchParams } = new URL(request.url);
        const stockNameToUpdate = searchParams.get('name');

        if (!stockNameToUpdate) {
            return NextResponse.json({ message: 'Missing stock name parameter to update.' }, { status: 400 }); // Bad Request
        }

        // 2. Get the updated stock data from the request body
        const updatedData = await request.json();

        // 3. Basic Validation (at least one updatable field should be present)
        // Note: We allow partial updates (e.g., just quantity, or just prices)
        if (!updatedData || (updatedData.quantity == null && updatedData.avgPrice == null && updatedData.currentPrice == null)) {
             return NextResponse.json({ message: 'No update data provided (e.g., quantity, avgPrice, currentPrice).' }, { status: 400 }); // Bad Request
        }

        // 4. Read existing user data
        let userData = await readUserData(username);

        // 5. Check if user data or portfolio exists
        if (!userData || !userData.portfolio) {
            return NextResponse.json({ message: `Portfolio not found for user ${username}.` }, { status: 404 }); // Not Found
        }

        // 6. Find the index of the stock to update
        const stockIndex = userData.portfolio.findIndex(stock => stock.name === stockNameToUpdate);

        if (stockIndex === -1) {
            return NextResponse.json({ message: `Stock '${stockNameToUpdate}' not found in the portfolio.` }, { status: 404 }); // Not Found
        }

        // 7. Update the stock data (merge existing with new data)
        // Only update fields that are provided in the request body
        const originalStock = userData.portfolio[stockIndex];
        const updatedStock = {
            ...originalStock, // Keep original data
            // Overwrite with new data if provided
            quantity: updatedData.quantity ?? originalStock.quantity,
            avgPrice: updatedData.avgPrice ?? originalStock.avgPrice,
            currentPrice: updatedData.currentPrice ?? originalStock.currentPrice,
        };
        userData.portfolio[stockIndex] = updatedStock;

        // 8. Write updated data back to file
        await writeUserData(username, userData);

        // 9. Return success response
        return NextResponse.json({ message: `Stock '${stockNameToUpdate}' updated successfully.`, updatedStock }); // OK

    } catch (error) {
        console.error("API Portfolio PUT Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update stock in portfolio.';
        return NextResponse.json(
            { message: errorMessage },
            { status: (error instanceof SyntaxError) ? 400 : 500 } // Bad request for JSON errors, 500 otherwise
        );
    }
}