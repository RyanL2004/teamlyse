import Companion from "../models/Companion.js";

export const getAllCompanions = async (req, res) => {
    try {
        const companions = await Companion.find();
        res.status(200).json({ companions });
    }
    catch (error) {
        console.error('Error fetching companions:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getCompanionById = async (req, res) => {
    try {
        const companion = await Companion.findById(req.params.id);

        if (!companion) {
            return res.status(404).json({ message: "Companion not found" });
        }

        res.status(200).json({ companion });

    }
    catch (error) {
        console.error('Error fetching companion by ID:', error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Admin Purposes Only 
export const createCompanion = async (req, res) => {
    try{
        const newCompanion = new Companion(req.body);
        await newCompanion.save();
        res.status(201).json({ message: "Companion created successfully", newCompanion });
    }
    catch (error) {
        console.error('Error creating companion:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCompanion = async (req, res) => {
    try {
        // Check if companion exists 
        const updatedCompanion = await Companion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedCompanion) {
            return res.status(404).json({ message: "Companion not found" });
        }
        res.status(200).json({ message: "Companion updated successfully", updatedCompanion});
    }
    catch (error) {
        console.error('Error updating companion:', error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}


export const deleteCompanion = async (req, res) => {
    try {
        const deletedCompanion = await Companion.findByIdAndDelete(req.params.id);

        if (!deletedCompanion) {
            return res.status(404).json ({ message: "Companion not found" });
        }
        res.status(200).json({ message: "Companion deleted" });
    }
    catch (error) {
        console.error('Error deleting companion:', error);
        res.status(500).json({ message: "Internal Server Error"})
    }

};


