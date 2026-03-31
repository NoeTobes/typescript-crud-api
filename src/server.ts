import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/errorHandler';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', usersController);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4091;

initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log('✓ No database needed! Data stored in database.json');
            console.log('✓ API endpoints:');
            console.log('  POST   /users/register     - Register new user');
            console.log('  POST   /users/authenticate - Login');
            console.log('  GET    /users              - Get all users');
            console.log('  GET    /users/:id          - Get user by ID');
            console.log('  PUT    /users/:id          - Update user');
            console.log('  DELETE /users/:id          - Delete user');
        });
    })
    .catch((err) => {
        console.error('✗ Failed to initialize:', err);
        process.exit(1);
    });