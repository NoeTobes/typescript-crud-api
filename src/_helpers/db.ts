import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database.json');

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

// In-memory cache for faster access
let usersCache: User[] = [];

// Initialize database
export async function initialize(): Promise<void> {
    try {
        await loadFromFile();
        console.log('✓ JSON database initialized');
        console.log(`✓ Data file: ${DB_FILE}`);
    } catch (error) {
        console.error('✗ Database initialization failed:', error);
        throw error;
    }
}

// Load data from JSON file
async function loadFromFile(): Promise<void> {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8');
        const parsed = JSON.parse(data);
        usersCache = parsed.users || [];
        console.log(`✓ Loaded ${usersCache.length} users from file`);
    } catch (error) {
        // File doesn't exist, start with empty array
        usersCache = [];
        await saveToFile();
        console.log('✓ Created new database file');
    }
}

// Save data to JSON file
async function saveToFile(): Promise<void> {
    const data = {
        users: usersCache
    };
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Database operations
export const db = {
    User: {
        findAll: async (): Promise<User[]> => {
            return [...usersCache];
        },
        
        findByPk: async (id: number): Promise<User | null> => {
            const user = usersCache.find(u => u.id === id);
            return user || null;
        },
        
        findOne: async (options: any): Promise<User | null> => {
            const where = options?.where || {};
            let user = null;
            
            if (where.email) {
                user = usersCache.find(u => u.email === where.email);
            } else if (where.id) {
                user = usersCache.find(u => u.id === where.id);
            }
            
            return user || null;
        },
        
        create: async (userData: any): Promise<User> => {
            const newUser: User = {
                ...userData,
                id: Date.now(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            usersCache.push(newUser);
            await saveToFile();
            return newUser;
        },
        
        update: async (user: User, updates: any): Promise<User> => {
            Object.assign(user, updates);
            user.updatedAt = new Date();
            
            const index = usersCache.findIndex(u => u.id === user.id);
            if (index !== -1) {
                usersCache[index] = user;
                await saveToFile();
            }
            return user;
        },
        
        destroy: async (user: User): Promise<void> => {
            const index = usersCache.findIndex(u => u.id === user.id);
            if (index !== -1) {
                usersCache.splice(index, 1);
                await saveToFile();
            }
        },
        
        scope: (name: string) => {
            if (name === 'withHash') {
                return db.User;
            }
            return db.User;
        }
    }
};