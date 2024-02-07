import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


export const requiredAuth = (req, res, next) => {
    //console.log(req.headers)

    const { accsessToken } = req.cookies;
    //console.log(accsessToken);
    if (!accsessToken) return res.status(401).json ({ message: 'No Token, Authorization denied' });

    jwt.verify(accsessToken, TOKEN_SECRET, (err,user) =>{
        if(err) res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    })

    
};