import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    // Store Selected Pet
    selectedPet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", default: null },
    bio: { type: String, required: false, default: null},
    profilePhoto: { type: String, required: false, default: null},
     

},{ timestamps: true});

// Hash password before saving
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

const User = mongoose.model("User", userSchema);
export default User;

