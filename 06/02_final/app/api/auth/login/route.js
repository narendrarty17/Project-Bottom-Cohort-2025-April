// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { readUsers, verifyPassword } from '@/lib/authUtils'; // Adjust path if needed

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Basic Validation
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username and password are required.' },
                { status: 400 } // Bad Request
            );
        }

        const users = await readUsers();

        // Find user by username (case-insensitive)
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (!user) {
            console.log(`API Login attempt failed: User ${username} not found.`);
             // Use a generic message for security
            return NextResponse.json(
                { success: false, message: 'Invalid credentials.' },
                { status: 401 } // Unauthorized
            );
        }

        // Verify the password
        const passwordMatch = await verifyPassword(password, user.password);

        if (passwordMatch) {
            console.log(`API Login successful for user: ${username}`);
            // IMPORTANT: In a real app, generate a session token/JWT here
            // and include it in the response or set an HttpOnly cookie.
            // Never send the password hash back to the client.
            return NextResponse.json(
                { success: true, message: 'Login successful!', user: { username: user.username } },
                { status: 200 } // OK
            );
        } else {
            console.log(`API Login attempt failed: Incorrect password for user ${username}.`);
             // Use a generic message for security
            return NextResponse.json(
                { success: false, message: 'Invalid credentials.' },
                { status: 401 } // Unauthorized
            );
        }

    } catch (error) {
        console.error("API Login Error:", error);
         // Don't expose detailed internal errors during login
        return NextResponse.json(
            { success: false, message: 'An error occurred during login.' },
            { status: 500 } // Internal Server Error
        );
    }
}