//this is used for handling user-related operations, such as registration and login. 
// It imports the UserModel to interact with the user data in the database and defines functions for registering new users and authenticating existing users. 
// The registerUser function creates a new user document in the database, while the loginUser function checks if the provided email and password match an existing user in the database.

import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";  


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate email and password
        if (!email || !password) {
            return res.status(400).json({success:false, message: "Please enter all the fields"});
        }

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({success:false, message: "invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:false, message: "invalid email or password"});
        }

        const token = createToken(user._id);
        res.status(200).json({success:true, message: "User Logged In Successfully", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "An error occured while logging in the user"});
    }
};

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //validate name, email, password
        if (!name || !email || !password) {
            return res.status(400).json({success:false, message: "Please enter all the fields"});
        }
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success:false, message: "User Already Exists"});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message: "Invalid Email"});
        }

        if(password.length < 8) {
            return res.status(400).json({success:false, message: "Please enter a password with at least 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel ({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({success:true, message: "User Registered Successfully", token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "An error occurred while registering the user"});
    }
};

const getUserData = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({success:false, message: "User not found"});
        }
        res.status(200).json({success:true, user});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "An error occurred while fetching user data"});
    }
};

export { loginUser, registerUser, getUserData };