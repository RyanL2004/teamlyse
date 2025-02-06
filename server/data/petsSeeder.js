import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pet from '../models/Pet.js';
import connectDB from '../config/db.js';

dotenv.config();

const pets = [
    {
        id: 1,
        name: "Knight",
        image: "/assets/gifs/lethal-company-dance.gif",
        price: 3.99,
        description: "A fearless knight companion for your meetings.",
    },
    {
        id: 2,
        name: "Maiden",
        image: "/assets/gifs/lethal-company-dance.gif",
        price: 3.99,
        description: "A noble mainden with a supportive presence",
    },
    {
        id: 3,
        name: "Raven",
        image: "/assets/gifs/lethal-company-dance.gif",
        price: 4.99,
        description: "A wide raven that shares insighful meetings ideas",
    },
    {

        id: 4,
        name: "Phoenix",
        image: "/assets/gifs/lethal-company-dance.gif",
        price: 9.99,
        description: "A majestic phoenix that keeps meeetings engaging",
    }
]

//Seed the Pets data into the Database 
const seedPets = async () => {
    try {
        await connectDB();
        await Pet.deleteMany();
        await Pet.insertMany(pets);
        console.log('✅ Pets data seeded successfully');
        
        process.exit(0); // Exit process with success
    }
    catch (error) {
        console.error('❌ Error seeding pets', error)
        process.exit(1); // Exiting the process with an error 
    }
}

seedPets();