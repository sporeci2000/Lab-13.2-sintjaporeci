// Import the mongoose library 
const mongoose = require('mongoose');

//  Read the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

async function connectDatabase() {
    try {
        await mongoose.connect(uri);

        console.log('Connected successfully!');
    } catch (err) {
        console.error(' Error!', err.message);
    }
}

connectDatabase();

module.exports = mongoose;