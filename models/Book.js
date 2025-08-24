const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },

        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true
        },

        isbn: {
            type: String,
            unique: true,
            trim: true
        },

        publishedDate: {
            type: Date
        },

        inStock: {
            type: Boolean,
            default: true
        }
    }
);

// Compile the schema into a model and export it
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;