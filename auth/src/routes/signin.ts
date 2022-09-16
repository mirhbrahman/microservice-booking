import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../services/password';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is required')
], 
validateRequest,
async(req: Request, res: Response)=>{
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
       throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = Password.compare(existingUser.password, password);

    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials');
    }

    // Generate jwt
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // Store to session
    req.session = {
        jwt: userJwt
    };

    return res.status(200).send(existingUser);

});

export { router as signinRouter };