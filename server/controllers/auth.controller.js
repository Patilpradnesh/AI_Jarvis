import bcrypt from "bcryptjs";
import User from "../models/user.model.js"; 
import genToken from "../config/token.js";

// signUp function to handle user registration
// It checks if the email already exists, validates the password length, hashes the password
// and creates a new user in the database
export const signUp =async(req,res)=>{
    try {
        const {name ,email,password}=req.body;

        const existEmail =await User.findOne({email})

        if(existEmail){
            return res.status(400).json({message:"Email already exist"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be six characters"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashPassword,
            
        });

        const token =await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            samesite:"static",
            secure:false, // Set to true if using HTTPS

        })
        return res.status(201).json(user,{message:"successful sign up"})
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}
// SignIn function to handle user login
// It checks if the email exists, compares the password, generates a token, and sets it as a cookie
// Returns a success message if login is successful
export const SignIn =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Email is not exist !!"});

        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Password is incorrect!!"});
        }
        const token =await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            secure: false, // Set to true if using HTTPS
        });
        return res.status(200).json({message:"successful sign In"});

    } catch (error) {
        console.log("Error during signin:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}


// SignOut function to handle user logout
// It clears the authentication token cookie and returns a success message
export const SignOut =async (req,res)=>{
    try {
        res.clearCookies("token");
        return res.status(200).json({msg:"logout successfully"})
       
        
    } catch (error) {
        console.log("Error during signout:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}