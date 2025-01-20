import express from 'express';
const petRoute = express.Router();

// Mock database for now (can be replaced with a real database later)
const petSelections = [];

petRoute.post('/save-selection', (req, res) => {
    const { pet } = req.body;

    if (!pet) {
        return res.status(400).json({ error: 'Pet selection is required' });
    }

    // Save the pet selection
    petSelections.push(pet);
    return res.status(200).json({ message: `Pet ${pet.name} selected successfully!`, pet });
});

export default petRoute;
