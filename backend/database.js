const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Duy:3dmFy1HKQgSotuo6@digital-file-cabinet.hqp5c.mongodb.net/Digital-File-Cabinet'; // Your MongoDB URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;