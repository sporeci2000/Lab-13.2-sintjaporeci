// Import Express so we can make a router
const express = require('express');

// Imports the Mongoose model
const Book = require('../models/Book');

// Create a new router instance
const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    try {

        // req.body contains the data sent by the client
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one book by ID
router.get('/:id', async (req, res) => {
    try {
        // Queries MongoDB for a document with that ID
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Error! Book not found...' });
        res.json(book);
    } catch (err) {
        // Internal Server Error.
        res.status(500).json({ error: err.message });
    }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            // Returns the updated document instead of the old one
            new: true,

            // Ensures Mongoose validates the data before updating
            runValidators: true
        });
        // Not Found
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        // Bad Request
        res.status(400).json({ error: err.message });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;