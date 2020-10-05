import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json('Token não informado!');
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, 'token');

        req.usuarioID = decoded.id;

        return next();
    } catch (error){
        return res.status(401).json('Token inválido!');
    }
}