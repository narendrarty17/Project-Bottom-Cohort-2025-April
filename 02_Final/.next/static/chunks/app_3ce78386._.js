(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_3ce78386._.js", {

"[project]/app/actions/actions.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// actions.js (or lib/actions.js)
__turbopack_context__.s({
    "loginUser": (()=>loginUser),
    "registerUser": (()=>registerUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$path$2f$path$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/path/path.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcrypt$2f$bcrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcrypt/bcrypt.js [app-client] (ecmascript)");
'use client'; // <--- forcefully added client so is workable in client machine alone
;
;
;
const saltRounds = 10; // Cost factor for hashing
const dataFilePath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$path$2f$path$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), 'users.json'); // Store users.json in project root
// Helper function to read users data
async function readUsers() {
    try {
        // Check if file exists first
        await fs.access(dataFilePath);
        const jsonData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        // If file doesn't exist or is empty/invalid JSON, return empty array
        if (error.code === 'ENOENT') {
            console.log('users.json not found, starting with empty list.');
            return [];
        } else {
            console.error('Error reading or parsing users.json:', error);
            // In a real app, you might want to throw a more specific error
            // or handle corrupted data recovery. For now, return empty.
            return [];
        }
    }
}
// Helper function to write users data
async function writeUsers(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON
        await fs.writeFile(dataFilePath, jsonData, 'utf-8');
    } catch (error) {
        console.error('Error writing users.json:', error);
        throw new Error('Could not save user data.'); // Propagate error
    }
}
async function registerUser(formData) {
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();
    if (!username || !password) {
        return {
            success: false,
            message: 'Username and password are required.'
        };
    }
    // Basic password strength check (example)
    if (password.length < 6) {
        return {
            success: false,
            message: 'Password must be at least 6 characters long.'
        };
    }
    try {
        const users = await readUsers();
        // Check if username already exists
        const existingUser = users.find((user)=>user.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
            return {
                success: false,
                message: 'Username already taken.'
            };
        }
        // Hash the password
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcrypt$2f$bcrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hash(password, saltRounds);
        // Add new user
        users.push({
            username,
            password: hashedPassword
        });
        // Write updated data back to file
        await writeUsers(users);
        console.log(`User registered: ${username}`);
        return {
            success: true,
            message: 'Registration successful!'
        };
    } catch (error) {
        console.error("Registration Error:", error);
        return {
            success: false,
            message: error.message || 'Registration failed. Please try again.'
        };
    }
}
async function loginUser(formData) {
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();
    if (!username || !password) {
        return {
            success: false,
            message: 'Username and password are required.'
        };
    }
    try {
        const users = await readUsers();
        // Find user by username (case-insensitive comparison is often good practice)
        const user = users.find((u)=>u.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            console.log(`Login attempt failed: User ${username} not found.`);
            return {
                success: false,
                message: 'Invalid username or password.'
            }; // Generic message
        }
        // Compare submitted password with stored hash
        const passwordMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcrypt$2f$bcrypt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
        if (passwordMatch) {
            console.log(`Login successful for user: ${username}`);
            // IMPORTANT: In a real app, you'd generate a session token here
            // and send it back or set a cookie. For this example, just success.
            return {
                success: true,
                message: 'Login successful!',
                user: {
                    username: user.username
                }
            }; // Don't send password hash back!
        } else {
            console.log(`Login attempt failed: Incorrect password for user ${username}.`);
            return {
                success: false,
                message: 'Invalid username or password.'
            }; // Generic message
        }
    } catch (error) {
        console.error("Login Error:", error);
        // Don't expose detailed error info during login
        return {
            success: false,
            message: 'An error occurred during login. Please try again.'
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/login/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/login/page.js
__turbopack_context__.s({
    "default": (()=>LoginPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/actions.js [app-client] (ecmascript)"); // Adjust path if actions.js is elsewhere (e.g., ../../actions)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)"); // To redirect on success
;
var _s = __turbopack_context__.k.signature();
'use client'; // <--- Make this a Client Component
;
;
;
function LoginPage() {
    _s();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])(); // Initialize router
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setMessage(''); // Clear previous messages
        const formData = new FormData(event.currentTarget);
        if (!formData.get('username') || !formData.get('password')) {
            setMessage('Please fill in all fields.');
            return;
        }
        startTransition(async ()=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$actions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(formData);
            setMessage(result.message);
            if (result.success) {
                // Login successful - handle session/redirect
                // In a real app, you'd likely set a cookie or token here
                console.log('Logged in user:', result.user?.username); // Use optional chaining
                // Redirect to a dashboard or home page
                router.push('/'); // Redirect to home page after successful login
            // Optionally clear the form:
            // event.target.reset();
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Login"
            }, void 0, false, {
                fileName: "[project]/app/login/page.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "username",
                                children: "Username:"
                            }, void 0, false, {
                                fileName: "[project]/app/login/page.js",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "username",
                                name: "username",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/login/page.js",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/login/page.js",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "password",
                                children: "Password:"
                            }, void 0, false, {
                                fileName: "[project]/app/login/page.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                id: "password",
                                name: "password",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/login/page.js",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/login/page.js",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isPending,
                        children: isPending ? 'Logging in...' : 'Login'
                    }, void 0, false, {
                        fileName: "[project]/app/login/page.js",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/login/page.js",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: message.startsWith('Login successful') ? 'green' : 'red'
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/app/login/page.js",
                lineNumber: 56,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Don't have an account? ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/register",
                        children: "Register here"
                    }, void 0, false, {
                        fileName: "[project]/app/login/page.js",
                        lineNumber: 57,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/login/page.js",
                lineNumber: 57,
                columnNumber: 8
            }, this),
            " "
        ]
    }, void 0, true, {
        fileName: "[project]/app/login/page.js",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "CO/vYh5oHFvnMAvTmVnwi7ABWdo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_3ce78386._.js.map