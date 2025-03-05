// Code for RESTFul API
// 1. Setting up the Express Application

// Creating express application instance
const express = require('express');

// Creating an instance of the express application
const app = express();

// Enabling express to use JSON body parsing
app.use(express.json());

// Defining port number
const port = 3000;

// Starting express application
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Defining a route to return list of items in the array
let items = [];

// 2. CRUD Operations :)

// A => Read Operation: One of the CRUD operations
// Defining a route to return list of items in the array
app.get('/items', (req, res) => {
    // Error handling
    if (!items.length) {
        return res.status(404).json({ error: 'No items found' });
    }
    // Sending the items array in response
    res.json(items);
});

// B => Create/Post Operation: One of the CRUD operations
app.post('/items', (req, res) => {
    // if adding validation
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Accessing the request body
    const newItem = req.body;

    // Adding the new item to the items array
    items.push(newItem);

    // Sending the newly created item in response and a 201 status code
    res.status(201).json(newItem);
});

// C => Update/Put: One of the CRUD operations
// Using a route parameter for the ID
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    // Finding the item by id
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    items[itemIndex] = updatedItem;
    res.json(updatedItem);
});

// D => Delete: One of the CRUD operations
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Finding the item by id
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    items.splice(itemIndex, 1);
    res.sendStatus(204);
});