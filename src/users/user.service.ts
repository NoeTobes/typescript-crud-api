import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, User } from '../_helpers/db';
import { Role } from '../_helpers/role';
import config from '../../config.json';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    authenticate,
    register
};

async function getAll(): Promise<User[]> {
    return await db.User.findAll();
}

async function getById(id: number): Promise<User> {
    const user = await db.User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
}

async function create(params: any): Promise<void> {
    // Check if email already exists
    const existingUser = await db.User.findOne({ where: { email: params.email } });
    if (existingUser) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(params.password, 10);

    // Create user
    await db.User.create({
        ...params,
        passwordHash,
        role: params.role || Role.User,
    });
}

async function update(id: number, params: any): Promise<void> {
    const user = await getById(id);

    // Check if email is being changed and if it already exists
    if (params.email && params.email !== user.email) {
        const existingUser = await db.User.findOne({ where: { email: params.email } });
        if (existingUser) {
            throw new Error(`Email "${params.email}" is already taken`);
        }
    }

    // Hash password if provided
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
        delete params.password;
    }

    // Update user
    Object.assign(user, params);
    await db.User.update(user, params);
}

async function _delete(id: number): Promise<void> {
    const user = await getById(id);
    await db.User.destroy(user);
}

async function authenticate({ email, password }: { email: string; password: string }): Promise<{ user: any; token: string }> {
    // Get user
    const user = await db.User.findOne({ where: { email } });
    
    if (!user) {
        throw new Error('Email not found');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
        },
        config.jwtSecret,
        { expiresIn: '7d' }
    );

    // Return user without password hash
    const { passwordHash, ...userWithoutHash } = user;

    return { user: userWithoutHash, token };
}

async function register(params: any): Promise<void> {
    return await create({ ...params, role: Role.User });
}