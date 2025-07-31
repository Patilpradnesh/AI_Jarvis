import user from "../models/user.model.js";
export const getCurrentUser=async(req,res)=>{
        try {
            const userId=req.userId;
            const user =await user.findById(userId).select("-password");
            if(!user){
                return res.status(400).json({message: "user not found"});
            }
        } catch (error) {
            return res.status(400).json({message:"it is error in current user"})
        }
}

// this file give us current user details
