import express from 'express';
import Pet from '../models/Pet.js';

const petRoute = express.Router();

// Fetch all the pets available in DB
petRoute.get('/all', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets)
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch pets'})
    }
})

export default petRoute;
