import jwt from 'jsonwebtoken';
const isAuth =async(req,res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json(message,"token doesn't found")
        }
        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)

        req.userId =verifyToken(userId);
        next();

    }catch(error){
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal isAuth error" });
    }
}

export default isAuth;
