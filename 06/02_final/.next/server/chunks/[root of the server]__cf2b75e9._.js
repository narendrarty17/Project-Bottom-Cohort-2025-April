module.exports = {

"[project]/.next-internal/server/app/api/gemini-stock-predict/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/app/api/gemini-stock-predict/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/api/gemini-stock-predict/route.js
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Define the Gemini model you want to use.
// Popular choices: 'gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-1.0-pro'
// 'gemini-1.5-flash-latest' is often a good balance of capability and speed/cost.
const GEMINI_MODEL_NAME = 'gemini-1.5-flash-latest';
async function POST(request) {
    try {
        const body = await request.json();
        const { query, generationConfig, safetySettings } = body; // Allow passing config from client
        if (!query || typeof query !== 'string' || query.trim() === "") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Invalid query provided.'
            }, {
                status: 400
            });
        }
        // 1. Retrieve your Gemini API Key securely
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            console.error("Gemini API Key not configured in .env.local");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'API Key not configured on server.'
            }, {
                status: 500
            });
        }
        // 2. Prepare the request payload for the Gemini API
        const prompt = `Provide a stock prediction or analysis for: ${query}. Analyze its potential future performance, considering recent news, market trends, and historical data if possible. Be comprehensive but concise. Disclaimer: This is AI-generated and not financial advice.`;
        const geminiPayload = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ],
            // Optional: You can add generationConfig and safetySettings
            // These can also be passed from the client if needed
            ...generationConfig && {
                generationConfig
            },
            ...safetySettings && {
                safetySettings
            }
        };
        // Example: Default generationConfig if not provided
        // if (!geminiPayload.generationConfig) {
        //     geminiPayload.generationConfig = {
        //         temperature: 0.7,
        //         topK: 1,
        //         topP: 1,
        //         maxOutputTokens: 512,
        //     };
        // }
        // Example: Default safetySettings if not provided
        // if (!geminiPayload.safetySettings) {
        //     geminiPayload.safetySettings = [
        //         { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        //         { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        //         { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        //         { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        //     ];
        // }
        // 3. Make the actual API call to Gemini.
        //    The endpoint for generating content is:
        //    https://generativelanguage.googleapis.com/v1beta/models/YOUR_MODEL_NAME:generateContent?key=YOUR_API_KEY
        const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
        console.log('Sending request to Gemini API:', apiEndpoint);
        console.log('Payload:', JSON.stringify(geminiPayload, null, 2));
        const geminiResponse = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(geminiPayload)
        });
        // 4. Handle the response from Gemini.
        if (!geminiResponse.ok) {
            let errorData;
            try {
                errorData = await geminiResponse.json();
                console.error('Gemini API Error Data:', errorData);
            } catch (e) {
                // If response is not JSON (e.g., HTML error page)
                const errorText = await geminiResponse.text();
                console.error('Gemini API Error (Non-JSON):', errorText);
                errorData = {
                    error: {
                        message: errorText
                    }
                };
            }
            const errorMessage = errorData?.error?.message || `Gemini API Error: ${geminiResponse.status} ${geminiResponse.statusText}`;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: errorMessage
            }, {
                status: geminiResponse.status
            });
        }
        const geminiResult = await geminiResponse.json();
        console.log('Gemini API Success Response:', JSON.stringify(geminiResult, null, 2));
        // 5. Extract the relevant prediction data from geminiResult.
        //    This structure is typical for generateContent responses.
        let predictionText = "Could not extract text from Gemini response.";
        if (geminiResult.candidates && geminiResult.candidates.length > 0 && geminiResult.candidates[0].content && geminiResult.candidates[0].content.parts && geminiResult.candidates[0].content.parts.length > 0 && geminiResult.candidates[0].content.parts[0].text) {
            predictionText = geminiResult.candidates[0].content.parts[0].text;
        } else if (geminiResult.promptFeedback && geminiResult.promptFeedback.blockReason) {
            // Handle cases where content is blocked due to safety settings or other reasons
            predictionText = `Content generation blocked. Reason: ${geminiResult.promptFeedback.blockReason}`;
            if (geminiResult.promptFeedback.blockReasonMessage) {
                predictionText += ` Message: ${geminiResult.promptFeedback.blockReasonMessage}`;
            }
            console.warn('Gemini content generation blocked:', geminiResult.promptFeedback);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: predictionText,
                details: geminiResult.promptFeedback
            }, {
                status: 400
            }); // Or a more appropriate status
        } else {
            console.warn('Unexpected Gemini response structure for text extraction.');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            prediction: predictionText
        });
    } catch (error) {
        console.error('API Route Error:', error);
        // Check if the error is a FetchError (e.g. network issue)
        if (error.name === 'FetchError' || error.cause) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Network error communicating with Gemini API: ${error.message}`
            }, {
                status: 503
            }); // Service Unavailable
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message || 'An unexpected error occurred on the server.'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__cf2b75e9._.js.map