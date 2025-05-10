// app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Import the file system module
import path from 'path';     // Import the path module

// Define the path to the dashboard data file
const dataFilePath = path.join(process.cwd(), 'data', 'dashboard.json');

// --- GET Handler ---
export async function GET(request) {
  try {
    // Read the JSON file content
    const jsonData = await fs.readFile(dataFilePath, 'utf-8');

    // Parse the JSON string into a JavaScript object
    const data = JSON.parse(jsonData);

    // Return the parsed data
    // The structure { marketData, popularStocksData } is already present in the JSON file
    return NextResponse.json(data);

  } catch (error) {
    // Handle potential errors during file reading or JSON parsing
    console.error("API Dashboard GET Error:", error);

    if (error.code === 'ENOENT') {
        // Specific error if the data file is not found
        return NextResponse.json(
            { message: `Dashboard data file not found at ${dataFilePath}. Please check server configuration.` },
            { status: 500 } // Treat as server error because the file should exist
        );
    } else if (error instanceof SyntaxError) {
        // Specific error if the JSON file is malformed
        return NextResponse.json(
            { message: `Error parsing dashboard data file. Check JSON format at ${dataFilePath}.` },
            { status: 500 } // Server error due to bad data file
        );
    } else {
         // Generic error for other issues (e.g., permissions)
         return NextResponse.json(
             { message: 'Failed to retrieve dashboard data due to a server error.' },
             { status: 500 }
         );
    }
  }
}