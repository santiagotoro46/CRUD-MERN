import { z } from 'zod';

export const registerSchema = z.object({ // creamos el schema del register para las validaciones
    username: z.string({ 
        required_error: "username required field"
    }),
    email: z.string({
        required_error: "Email address required field"
    }). email({
        message: 'Invalid email address'
    }),
    password: z.string({
        required_error: "password required field"
    }).min(6,{
        message: 'password must be at least 6 characters long'
    })
});


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email address required field"
    }). email({
        message: 'Invalid email address'
    }),
    password: z.string({
        required_error: "Password required field"
    }). min(6,{
        message: 'Password must be at least 6 characters long'
    })
}) // creamos el schema del login para las validaciones