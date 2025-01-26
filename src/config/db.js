// Add code for database connection here...

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connection: SUCCESS 🚀');
  } catch (error) {
    console.error('MongoDB Connection: FAILED 🚨', error);
    process.exit(1);
  }
}

connectDB();

module.exports = mongoose;


