const express = require('express');
const router = express.Router();
const {client} = require('../database.js');
const { json } = require('body-parser');

const db = client.db(process.env.DBNAME);
const postCollection = db.collection('EventPosts') 

//TO ADD (maybe): Verification that only the webpage can access this route and request the events 
//Get all events
router.get("/", async (req, res) => {
    try {
        // Retrieve all events from the database
        const events = await postCollection.find().toArray();

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;