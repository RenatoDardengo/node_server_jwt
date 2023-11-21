import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

const authenticated = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split (" ")[1];

    if(!token){
        return res.status (401).json({msg:"Acesso negado!"})
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify (token, secret);
        return next();

        
    } catch (error) {
        return res.status(400).json({ msg: "Token inválido" });
    }

}

export default authenticated