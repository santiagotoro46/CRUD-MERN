import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createAccsessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1h" // expira en 1 hora
            },
            (err,accessToken) => {
                if (err) reject(err);
                resolve(accessToken);
            }
        )
    });
}