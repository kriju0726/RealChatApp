import jwt from "jsonwebtoken";
import User from "../Models/userModels.js";

const isLogin = async (req, res, next) => {
    try {
        //console.log(req.cookies.jwt);
        const token = req.cookies.jwt;
        
        if (!token) return res.status(500).send({ success: false, message: "User Unauthorise!!!"});
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(500).send({ success: false, message: "User Unauthorise - Invalid Token!!!"});
        //console.log("Decoded ID:", decode.userId);  
        const user = await User.findById(decode.userId).select("-password");
        //console.log("User:", user);  
        if(!user) return res.status(500).send({ success: false, message: "User not Found"});
        req.user = user, 
        next()
    } catch (error) {
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

export default isLogin;


