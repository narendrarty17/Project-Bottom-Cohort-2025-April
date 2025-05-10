// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { readUsers, writeUsers, hashPassword } from '@/lib/authUtils'; // Adjust path if needed

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // --- Basic Validation ---
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username and password are required.' },
                { status: 400 } // Bad Request
            );
        }
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 6 characters long.' },
                { status: 400 }
            );
        }
        // --- End Validation ---

        const users = await readUsers();

        // Check if username already exists (case-insensitive)
        const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'Username already taken.' },
                { status: 409 } // Conflict
            );
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Add new user
        users.push({ username, password: hashedPassword });

        // Write updated data back to file
        await writeUsers(users);

        console.log(`API: User registered: ${username}`);
        return NextResponse.json(
            { success: true, message: 'Registration successful!' },
            { status: 201 } // Created
        );

    } catch (error) {
        console.error("API Registration Error:", error);
        // Distinguish between file read/write errors and others
        const errorMessage = error.message.includes('Could not')
            ? 'Server error saving user data.'
            : 'An unexpected error occurred during registration.';
        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 } // Internal Server Error
        );
    }
}