const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${database.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
