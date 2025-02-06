import express from 'express';
import Pet from '../models/Pet.js';

const petRoute = express.Router();

// Saves Pet/Compagnion Selection
petRoute.post('/save-selection', async (req, res) => {
    const { pet } = req.body;

    if(!pet){
        return res.status(400).send({error: 'Pet selection is required'});
    }

    try {
        // Check if pet already exists (to avoid duplicated IDs)
        const existingPet = await Pet.findOne({ id: pet.id });

        if(existingPet) {
            return res.status(409).json({message: `Pet ${pet.name} is already selected`})
        }

        //Save new pet Selection
        const newPet = newPet(pet);
        const savedPet = await newPet.save();
        res.status(200).json({message: `pet ${pet.name} selected successfully!`, pet: savedPet});

    }
    catch (error) {
        res.status(500).json({error:'Failed to save selected pet'});
    }  
});

// Fetch all the pets available in Mongoose db
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
