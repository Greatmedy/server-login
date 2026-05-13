//used to store user data in MongoDB. It defines the structure of the user documents, including fields like name, email, password, and createdAt. This schema is then used to create a Mongoose model, which provides an interface for interacting with the user collection in the database.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;