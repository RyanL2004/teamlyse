import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    image: { type: String, required: true},
    price: { type: Number, required: true, unique: false},
    description: { type: String, required: true },
    selectedAt: { type: Date, default: Date.now},
})


export default mongoose.model('Pet', petSchema);