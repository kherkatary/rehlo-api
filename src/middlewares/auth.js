import jwt from 'jsonwebtoken';
import { initializeApp } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';

import { firebaseAdmin } from '../config/firebase.js';

// const requireSignIn = async (req, res, next) => {
//     try {
//         // Extract token from authorization header
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).send({ message: "Authorization token required" });
//         }

//         // Verify token using the secret key
//         const decodedData = jwt.verify(token, process.env.SUPER_SECRET_KEY);
//         req.body.user = decodedData;
//         next();
//     } catch (err) {
//         return res.status(500).send({
//             message: "Error verifying token",
//             error: err
//         });
//     }
// };

const requireSignInFire= async(req,res,next)=>{
    const idToken= req.headers.authorization?.split(' ')[1];

    if(!idToken){
        return res.status(401).send({message:"Unauthorized token provided "})
    }

    try{
        const decodedToken = await getAuth(firebaseAdmin).verifyIdToken(idToken)
        req.user= decodedToken
        
        next()

    }catch(err){
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }

}

export { requireSignInFire };
