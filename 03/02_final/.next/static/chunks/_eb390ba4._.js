(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_eb390ba4._.js", {

"[project]/app/login/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/login/page.js (Relevant part of the component)
__turbopack_context__.s({
    "default": (()=>LoginPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.js [app-client] (ecmascript)"); // Adjust path if needed
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LoginPage() {
    _s();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { loginUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])(); // Get loginUser from context
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setMessage('');
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username')?.toString().trim();
        const password = formData.get('password')?.toString();
        if (!username || !password) {
            setMessage('Please fill in all fields.');
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            let result = {}; // Initialize result object
            try {
                // Attempt to parse JSON regardless of response.ok, as error responses might contain details
                result = await response.json();
            } catch (jsonError) {
                // Handle cases where the response body isn't valid JSON
                console.error("Failed to parse JSON response:", jsonError);
                if (!response.ok) {
                    // If response status indicates error and JSON parsing failed, show generic error
                    setMessage(`Login failed with status: ${response.status}. Please try again.`);
                    setIsLoading(false);
                    return; // Stop processing
                }
            // If response was OK but not JSON (very unlikely for a login API), treat as missing data below.
            }
            if (response.ok) {
                // --- Logic Change Starts Here ---
                // Check if the successful response ALSO contains the expected username
                if (result.user?.username) {
                    // SUCCESS CASE: Response is OK and username confirmed by API
                    console.log('Login successful via API for user:', result.user.username);
                    setMessage(result.message || "Login successful!");
                    // 3. Call loginUser ONLY when API confirms the user via username.
                    // The context's loginUser function will handle setting the state to "Ram".
                    loginUser(result.user.username);
                    router.push('/'); // Redirect on successful login and context update
                } else {
                    // EDGE CASE / ERROR: Response status is OK, but required user data is missing.
                    // Do NOT log the user in.
                    console.error('API Login response OK, but user data missing.');
                    setMessage('Login successful, but user details could not be retrieved. Please contact support.');
                // No call to loginUser() here
                // No redirect here
                }
            // --- Logic Change Ends Here ---
            } else {
                // FAILURE CASE: Response status indicates failure (e.g., 401, 404, 500)
                console.error('API Login failed:', result.message || `Status ${response.status}`);
                // Use message from API if available, otherwise provide a default
                setMessage(result.message || 'Login failed. Please check your username and password.');
            // No call to loginUser() here
            // No redirect here
            }
        } catch (error) {
            // NETWORK/UNEXPECTED ERROR CASE
            console.error('Network or unexpected error during login:', error);
            setMessage('Login failed. Please check your connection and try again.');
        } finally{
            setIsLoading(false);
        }
    };
    // Determine message color (remains the same)
    const messageIsError = message.toLowerCase().includes('fail') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('error') || message.toLowerCase().includes('fill') || message.toLowerCase().includes('missing') || message.toLowerCase().includes('could not');
    const messageColor = messageIsError ? 'text-red-600' : 'text-green-600';
    // --- Rest of the component's JSX (form, message display, etc.) remains the same ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-center text-gray-900",
                    children: "Log in to your account"
                }, void 0, false, {
                    fileName: "[project]/app/login/page.js",
                    lineNumber: 102,
                    columnNumber: 18
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "space-y-6",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "username",
                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                    children: "Username"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.js",
                                    lineNumber: 107,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "username",
                                    name: "username",
                                    required: true,
                                    disabled: isLoading,
                                    className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.js",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/login/page.js",
                            lineNumber: 106,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "password",
                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.js",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "password",
                                    name: "password",
                                    required: true,
                                    disabled: isLoading,
                                    className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/app/login/page.js",
                                    lineNumber: 112,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/login/page.js",
                            lineNumber: 110,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading,
                                className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: isLoading ? 'Logging in...' : 'Login'
                            }, void 0, false, {
                                fileName: "[project]/app/login/page.js",
                                lineNumber: 115,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.js",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/login/page.js",
                    lineNumber: 105,
                    columnNumber: 17
                }, this),
                message && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `text-sm text-center ${messageColor} mt-4`,
                    children: message
                }, void 0, false, {
                    fileName: "[project]/app/login/page.js",
                    lineNumber: 122,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-center text-sm text-gray-600",
                    children: [
                        "Don't have an account?",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/register",
                            className: "font-medium text-indigo-600 hover:text-indigo-500 hover:underline",
                            children: "Register here"
                        }, void 0, false, {
                            fileName: "[project]/app/login/page.js",
                            lineNumber: 127,
                            columnNumber: 20
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/login/page.js",
                    lineNumber: 125,
                    columnNumber: 16
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/login/page.js",
            lineNumber: 100,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/login/page.js",
        lineNumber: 98,
        columnNumber: 9
    }, this);
}
_s(LoginPage, "Yq9TQvslLrJ2fesMKR0OGlS9K7s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_eb390ba4._.js.map