const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5; // Number of retry attempts
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            });
            console.log('Connected to MongoDB Successfully');
            break; // Exit the loop on successful connection
        } catch (error) {
            retries++;
            console.error(`MongoDB connection error (attempt ${retries}):`, error);
            if (retries >= maxRetries) {
                process.exit(1); // Exit if max retries reached
            }
            await new Promise(res => setTimeout(res, 5000)); // Wait before retrying
        }
    }
};

module.exports = connectDB;
