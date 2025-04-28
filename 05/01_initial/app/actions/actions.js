// actions.js (or lib/actions.js)
'use client'; // <--- forcefully added client so is workable in client machine alone

import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Cost factor for hashing
const dataFilePath = path.join(process.cwd(), 'users.json'); // Store users.json in project root

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

// --- Registration Action ---
export async function registerUser(formData) {
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
        return { success: false, message: 'Username and password are required.' };
    }

    // Basic password strength check (example)
    if (password.length < 6) {
         return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
        const users = await readUsers();

        // Check if username already exists
        const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
            return { success: false, message: 'Username already taken.' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add new user
        users.push({ username, password: hashedPassword });

        // Write updated data back to file
        await writeUsers(users);

        console.log(`User registered: ${username}`);
        return { success: true, message: 'Registration successful!' };

    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: error.message || 'Registration failed. Please try again.' };
    }
}


// --- Login Action ---
export async function loginUser(formData) {
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
        return { success: false, message: 'Username and password are required.' };
    }

    try {
        const users = await readUsers();

        // Find user by username (case-insensitive comparison is often good practice)
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (!user) {
            console.log(`Login attempt failed: User ${username} not found.`);
            return { success: false, message: 'Invalid username or password.' }; // Generic message
        }

        // Compare submitted password with stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            console.log(`Login successful for user: ${username}`);
            // IMPORTANT: In a real app, you'd generate a session token here
            // and send it back or set a cookie. For this example, just success.
            return { success: true, message: 'Login successful!', user: { username: user.username } }; // Don't send password hash back!
        } else {
            console.log(`Login attempt failed: Incorrect password for user ${username}.`);
            return { success: false, message: 'Invalid username or password.' }; // Generic message
        }

    } catch (error) {
         console.error("Login Error:", error);
        // Don't expose detailed error info during login
         return { success: false, message: 'An error occurred during login. Please try again.' };
    }
}