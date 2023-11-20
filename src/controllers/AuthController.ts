import { Request, Response } from 'express';
const db = require ("@src/config/sequelize");
import UserAdmin from '@src/models/userAdm';
const authController = {
    authentication: async (req: Request, res: Response) => {
        const { name, password } = req.body;
        try {
            const userAuth = await UserAdmin.findOne({
                where: {
                    name: name,
                    password: password,
                }
            });

            if (userAuth) {
                res.status(200).json({ msg: `O usuário ${name} existe` });
            } else {
                res.status(401).json({ msg: `O usuário ${name} não existe ou a senha está incorreta` });
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ msg: `Ocorreu um erro` });
        }
    },
    login: (req: Request, res: Response) => {
        res.status(200).json({ msg: 'Bem vindo ao login' })
    },
}

module.exports=authController;