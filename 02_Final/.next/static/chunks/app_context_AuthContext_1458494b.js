(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_context_AuthContext_1458494b.js", {

"[project]/app/context/AuthContext.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/context/AuthContext.js
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Keep React imports, remove useEffect from here if not used elsewhere
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const AUTH_STORAGE_KEY = 'authUser';
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    // Keep placeholders
    loginUser: ()=>{
        console.warn('loginUser function called without AuthProvider');
    },
    logoutUser: ()=>{
        console.warn('logoutUser function called without AuthProvider');
    }
});
const useAuth = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const AuthProvider = ({ children })=>{
    _s1();
    // 1. Initialize state to null consistently on server and client initial render
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Add a state to track if hydration is complete and localStorage has been checked
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 2. Use useEffect to load state from localStorage AFTER initial mount/hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // This effect runs only on the client, after the component mounts
            try {
                const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
                if (storedUser) {
                    setUser(storedUser); // Set state based on localStorage
                    console.log(`Auth Context: User '${storedUser}' loaded from localStorage`);
                } else {
                    console.log('Auth Context: No user found in localStorage');
                }
            } catch (error) {
                setUser(null);
            } finally{
                // Mark initialization as complete regardless of finding a user or errors
                setIsInitialized(true);
            }
        // Run this effect only once on mount
        }
    }["AuthProvider.useEffect"], []);
    // 3. Update localStorage when user state changes (login/logout)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Only attempt to write to localStorage after initial check is done
            // And ensure we are on the client
            if (isInitialized && "object" !== 'undefined') {
                try {
                    if (user) {
                        // If storing complex objects, use JSON.stringify
                        // window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
                        window.localStorage.setItem(AUTH_STORAGE_KEY, user);
                    } else {
                        window.localStorage.removeItem(AUTH_STORAGE_KEY);
                    }
                } catch (error) {
                    console.error("Auth Context: Error writing to localStorage key “" + AUTH_STORAGE_KEY + "”:", error);
                }
            }
        // Run this effect when user state changes *or* initialization completes
        }
    }["AuthProvider.useEffect"], [
        user,
        isInitialized
    ]);
    // Login function remains the same - it just calls setUser
    const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loginUser]": (username)=>{
            if (username) {
                setUser(username);
                console.log(`Auth Context: User logged in as '${username}'`);
            } else {
                console.warn('Auth Context: Attempted to login with empty username');
                setUser(null);
            }
        }
    }["AuthProvider.useCallback[loginUser]"], []);
    // Logout function remains the same - it just calls setUser
    const logoutUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logoutUser]": ()=>{
            setUser(null);
            console.log('Auth Context: User logged out');
        }
    }["AuthProvider.useCallback[logoutUser]"], []);
    // Include isInitialized in the context value if components need to wait for auth check
    const value = {
        user,
        isInitialized,
        loginUser,
        logoutUser
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AuthContext.js",
        lineNumber: 95,
        columnNumber: 10
    }, this);
};
_s1(AuthProvider, "xAEVM6QnwkSPRosnVT2JK8Y0yik=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_context_AuthContext_1458494b.js.map