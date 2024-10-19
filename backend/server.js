const express = require('express'); //npm install bcryptjs jsonwebtoken for log in
const mongoose = require('mongoose'); //npm install react-router-dom for navigation between the login and securepage
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords
const User = require('./models/User'); // Import the User model

const fileRoutes = require('./routes/fileRoutes');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();
const port = 3000;

// Enable CORS for React
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
const connectDB = require('./database'); 
connectDB();

// Routes
app.use('/api/files', fileRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/auth', authRoutes); // Use the new auth routes

// Temporary User Registration Route (For Testing Only)
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err); // Improved logging
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
