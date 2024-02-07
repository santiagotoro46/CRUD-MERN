import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccsessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    //res.send('Registrando...');

    const { email, password , username} = req.body

    try {

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json (['The email is already exist', userFound]);



        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        console.log(newUser);
        const userSaved = await newUser.save();
        const accsessToken = await createAccsessToken({ id:userSaved._id });
        res.cookie('accsessToken', accsessToken);
        return res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
            //password: userSaved.password
        });
        
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};



export const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const userFound = await User.findOne ({ email });
        if(!userFound ) return res.status(404).json ({ message: 'User Not Found' });

        const isMatch = await bcrypt.compare (password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: 'Error In Your Credentials' });
        





        const accsessToken = await createAccsessToken({ id:userFound._id });
        res.cookie('accsessToken', accsessToken);
         res.status(201).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
        
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

export const logout = (req, res) => {
    res.cookie ('accsessToken', '', {
        expires: new Date(0),

    });
    return res.sendStatus (200);
};

export const profile = async (req, res) => {
    
    const userFound = await User.findById(req.user.id);
    if(!userFound) return res.status(404).json ({ message: 'User not found' });

    res.status(201).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    });

}

export const verifyToken = async (req, res) => {
    const { accsessToken } = req.cookies;
    if(!accsessToken) return res.status(401).json({ message: 'Unauthorized Token' });

    jwt.verify(accsessToken, TOKEN_SECRET, async (err,user) =>{
        if(err) return res.status(401).json({ message: 'Unauthorized Token' });

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({ message: 'Unauthorized Token' });
        
        return res.json ({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        })
    });
};





