
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://harshcad07:Abc1234@harsh07.y5e0e.mongodb.net/?retryWrites=true&w=majority&appName=Harsh07', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;
