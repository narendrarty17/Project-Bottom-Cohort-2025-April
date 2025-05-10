// lib/authUtils.js
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs'; // Use bcryptjs

// Configuration
export const SALT_ROUNDS = 10; // Cost factor for hashing
export const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json'); // Store in ./data/users.json

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE_PATH);
fs.mkdir(dataDir, { recursive: true }).catch(console.error); // Create 'data' dir if it doesn't exist

// Helper function to read users data
export async function readUsers() {
    try {
        await fs.access(DATA_FILE_PATH); // Check if file exists
        const jsonData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        // Handle empty file case
        return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
        // If file doesn't exist, return empty array (it will be created on first write)
        if (error.code === 'ENOENT') {
            console.log('users.json not found, starting with empty list.');
            return [];
        } else {
            console.error('Error reading or parsing users.json:', error);
            // More robust error handling might be needed in production
            throw new Error('Could not read user data.');
        }
    }
}

// Helper function to write users data
export async function writeUsers(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON
        await fs.writeFile(DATA_FILE_PATH, jsonData, 'utf-8');
    } catch (error) {
        console.error('Error writing users.json:', error);
        throw new Error('Could not save user data.');
    }
}

// Helper function to hash password
export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Helper function to verify password
export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}