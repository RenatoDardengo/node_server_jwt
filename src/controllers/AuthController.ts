import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const db = require ("@src/config/sequelize");
import UserAdmin from '@src/models/userAdm';
import bcrypt from '@src/helpers/bcrypt';
import { logError } from '@src/helpers/logger';
import { Transaction } from 'sequelize';
const  {sequelize}  = require('@src/config/sequelize');
const authController = {

    storeUser: async (req:Request, res:Response)=>{
        const {name,password,isAdmin, permission} = req.body;
        const t = await sequelize.transaction();
        try {
            if(!name|| !password){
                return res.status(400).json({ msg: 'Atenção! Todos os campos são de preenchimento obrigatório.' });
            }
            const existingUser = await UserAdmin.findOne({ where: { name } });
            if (existingUser) {
                return res.status(400).json({ msg: 'Usuário já existe' });
            }

            const hashedPassword = bcrypt.generateHash(password);
            const newUser = await UserAdmin.create({
                name,
                password:hashedPassword,
                isAdmin,
                permission,

            },{transaction:t})
            await t.commit();
           return res.status(201).json({msg:"Usuário cadastrado com sucesso!", newUser})
            
        } catch (error) {
            await t.rollback();
            if (error instanceof Error) {
                console.error('Erro:', error);
                logError(error);
            } else {
                console.error('Erro inesperado:', error);
            }
            return res.status(500).json({ msg: `Ocorreu um erro com sua requisição ao servidor.` });
        }

    },

    updateUser: async (req: Request, res: Response) => {
        const { name, password, isAdmin, permission } = req.body;
        const id = req.params.id;
        const t = await sequelize.transaction();
  


        try {
            // Verifica se o usuário existe
            const existingUser = await UserAdmin.findByPk(id);
            if (!existingUser) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            // Atualiza somente os campos recebidos que não são nulos
            if (name !== undefined) {
                existingUser.name = name;
            }
            if (password !== undefined) {
                existingUser.password = bcrypt.generateHash(password);
            }
            if (isAdmin !== undefined) {
                existingUser.isAdmin = isAdmin;
            }
            if (permission !== undefined) {
                existingUser.permission = permission;
            }

            await sequelize.transaction(async (t:Transaction) => {
                await existingUser.save({ transaction: t });
            });

            return res.status(200).json({ msg: 'Usuário atualizado com sucesso', user: existingUser });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro:', error);
                logError(error);
            } else {
                console.error('Erro inesperado:', error);
            }
            return res.status(500).json({ msg: 'Ocorreu um erro ao atualizar o usuário' });
        }
    },


    authentication: async (req: Request, res: Response) => {
        const { name, password } = req.body;
        try {
            const userAuth = await UserAdmin.findOne({
                where: {
                    name: name,
                    
                }
            });

            if (userAuth) {
                const isPasswordValid = bcrypt.compareHash(password, userAuth.password);
                if (isPasswordValid) {
                        const secret = process.env.SECRET;
                        const token = jwt.sign(
                        {
                            id:userAuth.id
                        },
                        secret
                        
                        )
                      return  res.status(200).json({ msg: `Atenticação realizada com sucesso`, token });
                } else {
                    return res.status(401).json({ msg: `O usuário ${name} não existe ou a senha está incorreta` });
                }
                
            } else {
                return res.status(401).json({ msg: `O usuário ${name} não existe ou a senha está incorreta` });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro:', error);
                logError(error);
            } else {
                console.error('Erro inesperado:', error);
            }
           return res.status(400).json({ msg: `Ocorreu um erro com sua requisição ao servidor.` });
        }
    },
    login: (req: Request, res: Response) => {
        res.status(200).json({ msg: 'Bem vindo ao login' })
    },
}

module.exports=authController;