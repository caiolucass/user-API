import { getCustomRepository } from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { UsersRepositories } from '../repositories/UsersRepositories';

async function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const {user_id} = request;
    const userRepository = getCustomRepository(UsersRepositories);
    const {admin} = await userRepository.findOne(user_id);

    //verifica se o usuario possui privilegio de "Admin" no sistema
    if(admin){
        return next();
    }

    //usuario sem autorizacao ou sem acesso
    return response.status(401).json({
        error: "Nao autorizado. Usuario nao e admin.",
    });
}

export {ensureAdmin};