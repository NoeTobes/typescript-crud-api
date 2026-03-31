console.log('=== TypeScript CRUD API Test Information ===\n');
console.log('Base URL: http://localhost:4000\n');

console.log('Available Endpoints:');
console.log('┌─────────────────────────────────────────────────────────┐');
console.log('│ POST   /users/register     - Create new user           │');
console.log('│ POST   /users/authenticate - Login                     │');
console.log('│ GET    /users              - Get all users             │');
console.log('│ GET    /users/:id          - Get user by ID            │');
console.log('│ PUT    /users/:id          - Update user               │');
console.log('│ DELETE /users/:id          - Delete user               │');
console.log('└─────────────────────────────────────────────────────────┘\n');

console.log('Test Commands:\n');

console.log('1. Register a user:');
console.log('curl -X POST http://localhost:4000/users/register \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"title":"Mr","firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123","confirmPassword":"password123"}\'\n');

console.log('2. Login:');
console.log('curl -X POST http://localhost:4000/users/authenticate \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"email":"john@example.com","password":"password123"}\'\n');

console.log('3. Get all users:');
console.log('curl http://localhost:4000/users\n');