import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const db = require ("@src/config/sequelize");
import UserAdmin from '@src/models/Users';
import bcrypt from '@src/helpers/bcrypt';
import { logError } from '@src/helpers/logger';
import { Transaction } from 'sequelize';
const  {sequelize}  = require('@src/config/sequelize');
const authController = {

    storeUser: async (req:Request, res:Response)=>{
        const { name, password, level, phoneNumber, jobTitle, status, createdDate, updatedDate } = req.body;
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
                level,
                phone_number:phoneNumber,
                job_title:jobTitle,
                status,
                created_date:createdDate,
                updated_date:updatedDate

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
        const { name, password, level, phoneNumber, jobTitle, status, createdDate, updatedDate } = req.body;
        const id = req.params.id;
        const t = await sequelize.transaction();
  


        try {
            // Verifica se o usuário existe
            const existingUser = await UserAdmin.findByPk(id);
            if (!existingUser) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            if (name !== undefined) {
                existingUser.name = name;
            }
            if (password !== undefined) {
                existingUser.password = bcrypt.generateHash(password);
            }
            if (level !== undefined) {
                existingUser.level = level;
            }
            if (phoneNumber !== undefined) {
                existingUser.phone_number = phoneNumber;
            }
            if (jobTitle!== undefined) {
                existingUser.job_title = jobTitle;
            }
            if (status !== undefined) {
                existingUser.status = status;
            }
            if (createdDate !== undefined) {
                existingUser.created_date = createdDate;
            }
            if (updatedDate !== undefined) {
                existingUser.updated_date = updatedDate;
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
        const { userName, password } = req.body;
        const expirationTime:number= 14400;//segundos
        try {
            const userAuth = await UserAdmin.findOne({
                where: {
                    name: userName,
                    
                }
            });

            if (userAuth) {
                const isPasswordValid = bcrypt.compareHash(password, userAuth.password);
                if (isPasswordValid) {
                        const secret = process.env.SECRET;
                        const token = jwt.sign(
                        {
                            id:userAuth.id,
                            name: userAuth.name,
                            level: userAuth.level
                        },
                        secret,
                        {
                            expiresIn:expirationTime
                        }
                        
                        )
                      return  res.status(200).json({ msg: `Atenticação realizada com sucesso`, token });
                } else {
                    return res.status(401).json({ msg: `O usuário ${userName} não existe ou a senha está incorreta` });
                }
                
            } else {
                return res.status(401).json({ msg: `O usuário ${userName} não existe ou a senha está incorreta` });
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

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const allUsers = await UserAdmin.findAll({
                attributes: { exclude: ['password'] }
            });
            if(allUsers.length===0){
                return res.status(404).json({msg: "Não há usuários cadastrados."})
            }
            return res.status(200).json({users:allUsers})
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

    verifyToken: async (req: Request, res: Response)=>{
        return res.status(200).json({ msg:"Token validado." })

    }
}

module.exports=authController;