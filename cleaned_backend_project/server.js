
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, organization } = req.body;
  try {
    const user = new User({ name, email, organization });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Return a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { name, email, organization } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, organization },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001; // Changed the port to 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
