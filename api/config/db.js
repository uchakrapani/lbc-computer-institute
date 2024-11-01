const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5; // Number of retry attempts
    let retries = 0;

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    while (retries < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB
            console.log('Connected to MongoDB Successfully');
            return; // Exit function on success
        } catch (error) {
            retries++;
            console.error(`MongoDB connection error (attempt ${retries}):`, error.message);
            if (retries >= maxRetries) {
                console.error('Max retries reached. Exiting...');
                process.exit(1); // Exit if max retries reached
            }
            await new Promise(res => setTimeout(res, 5000)); // Wait before retrying
        }
    }
};

module.exports = connectDB;
