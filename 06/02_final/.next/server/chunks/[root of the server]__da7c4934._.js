module.exports = {

"[project]/.next-internal/server/app/api/watchlist/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/app/api/watchlist/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/api/watchlist/route.js
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET),
    "POST": (()=>POST),
    "PUT": (()=>PUT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)"); // Node.js file system promises API
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)"); // Node.js path module
;
;
;
// --- Configuration ---
// Define the base directory for storing user data files
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'watchlistPortfolio');
// --- Helper Functions (Identical to the ones in portfolio API) ---
/**
 * Generates the full file path for a given username.
 */ const getUserFilePath = (username)=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, `${username}.json`);
/**
 * Ensures the data directory exists. Creates it if it doesn't.
 */ async function ensureDataDirectoryExists() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(dataDir, {
            recursive: true
        });
    } catch (error) {
        if (error.code !== 'EEXIST') {
            console.error("Fatal Error: Could not create data directory:", dataDir, error);
            throw new Error("Server configuration error preventing data storage.");
        }
    }
}
/**
 * Reads and parses the JSON data for a specific user.
 * Resolves to the parsed object or null if the file doesn't exist.
 */ async function readUserData(username) {
    const filePath = getUserFilePath(username);
    try {
        const jsonData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null; // File not found is a valid state
        }
        console.error(`Error reading data file for user ${username}:`, error);
        throw new Error(`Failed to read data for user ${username}.`);
    }
}
/**
 * Writes user data object to a JSON file.
 */ async function writeUserData(username, data) {
    const filePath = getUserFilePath(username);
    try {
        await ensureDataDirectoryExists();
        const jsonData = JSON.stringify(data, null, 2);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, jsonData, 'utf-8');
    } catch (error) {
        console.error(`Error writing data file for user ${username}:`, error);
        throw new Error(`Failed to save data for user ${username}.`);
    }
}
async function GET(request) {
    // !!! TEMPORARY: Hardcoding username. Replace with auth logic. !!!
    const username = 'Ram';
    try {
        const userData = await readUserData(username);
        // Return user's watchlist or empty array if no data or no watchlist key
        const watchlist = userData?.watchlist || [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            watchlist
        });
    } catch (error) {
        console.error("API Watchlist GET Processing Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || 'Failed to retrieve watchlist data.'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    // !!! TEMPORARY: Hardcoding username. !!!
    const username = 'Ram';
    try {
        // 1. Get the new stock data from the request body
        const newStock = await request.json();
        // 2. Basic Validation (adjust required fields as needed for watchlist)
        if (!newStock || !newStock.name) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing required stock field: name.'
            }, {
                status: 400
            });
        }
        // Add defaults for optional fields if necessary
        const stockToAdd = {
            name: newStock.name,
            price: newStock.price ?? 0,
            changePercent: newStock.changePercent ?? 0,
            description: newStock.description ?? ''
        };
        // 3. Read existing user data (or get null)
        let userData = await readUserData(username);
        // 4. Initialize user data if it doesn't exist
        if (!userData) {
            userData = {
                watchlist: [],
                portfolio: []
            };
        }
        // Ensure watchlist array exists
        if (!userData.watchlist) {
            userData.watchlist = [];
        }
        // 5. Check if stock already exists in watchlist (by name)
        const existingStockIndex = userData.watchlist.findIndex((stock)=>stock.name === stockToAdd.name);
        if (existingStockIndex !== -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Stock '${stockToAdd.name}' already exists in the watchlist.`
            }, {
                status: 409
            }); // Conflict
        }
        // 6. Add the new stock
        userData.watchlist.push(stockToAdd);
        // 7. Write updated data back
        await writeUserData(username, userData);
        // 8. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Stock added to watchlist successfully.',
            addedStock: stockToAdd
        }, {
            status: 201
        }); // Created
    } catch (error) {
        console.error("API Watchlist POST Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to add stock to watchlist.';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: errorMessage
        }, {
            status: error instanceof SyntaxError ? 400 : 500
        });
    }
}
async function DELETE(request) {
    // !!! TEMPORARY: Hardcoding username. !!!
    const username = 'Ram';
    try {
        // 1. Get stock name from query parameters
        const { searchParams } = new URL(request.url);
        const stockNameToDelete = searchParams.get('name');
        if (!stockNameToDelete) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing stock name parameter to delete.'
            }, {
                status: 400
            });
        }
        // 2. Read user data
        let userData = await readUserData(username);
        // 3. Check if user data or watchlist exists
        if (!userData || !userData.watchlist || userData.watchlist.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Watchlist not found or empty for user ${username}.`
            }, {
                status: 404
            });
        }
        // 4. Filter out the stock to delete
        const initialLength = userData.watchlist.length;
        userData.watchlist = userData.watchlist.filter((stock)=>stock.name !== stockNameToDelete);
        // 5. Check if anything was removed
        if (userData.watchlist.length === initialLength) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Stock '${stockNameToDelete}' not found in the watchlist.`
            }, {
                status: 404
            });
        }
        // 6. Write updated data back
        await writeUserData(username, userData);
        // 7. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Stock '${stockNameToDelete}' deleted from watchlist successfully.`,
            watchlist: userData.watchlist
        }); // OK
    } catch (error) {
        console.error("API Watchlist DELETE Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete stock from watchlist.';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: errorMessage
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    // !!! TEMPORARY: Hardcoding username. !!!
    const username = 'Ram';
    try {
        // 1. Get stock name from query parameters
        const { searchParams } = new URL(request.url);
        const stockNameToUpdate = searchParams.get('name');
        if (!stockNameToUpdate) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing stock name parameter to update.'
            }, {
                status: 400
            });
        }
        // 2. Get update data from request body
        const updatedData = await request.json();
        // 3. Basic Validation (allow updating description, price, changePercent)
        if (!updatedData || updatedData.description == null && updatedData.price == null && updatedData.changePercent == null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'No update data provided (e.g., description, price, changePercent).'
            }, {
                status: 400
            });
        }
        // 4. Read user data
        let userData = await readUserData(username);
        // 5. Check if user data or watchlist exists
        if (!userData || !userData.watchlist) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Watchlist not found for user ${username}.`
            }, {
                status: 404
            });
        }
        // 6. Find the index of the stock to update
        const stockIndex = userData.watchlist.findIndex((stock)=>stock.name === stockNameToUpdate);
        if (stockIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Stock '${stockNameToUpdate}' not found in the watchlist.`
            }, {
                status: 404
            });
        }
        // 7. Update the stock data (merge existing with new data)
        const originalStock = userData.watchlist[stockIndex];
        const updatedStock = {
            ...originalStock,
            // Overwrite with new data only if provided in the request body
            description: updatedData.description ?? originalStock.description,
            price: updatedData.price ?? originalStock.price,
            changePercent: updatedData.changePercent ?? originalStock.changePercent
        };
        userData.watchlist[stockIndex] = updatedStock;
        // 8. Write updated data back
        await writeUserData(username, userData);
        // 9. Return success response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: `Stock '${stockNameToUpdate}' updated in watchlist successfully.`,
            updatedStock
        }); // OK
    } catch (error) {
        console.error("API Watchlist PUT Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update stock in watchlist.';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: errorMessage
        }, {
            status: error instanceof SyntaxError ? 400 : 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__da7c4934._.js.map