import {Request, Response, NextFunction} from "express";

function ensureAdmin(request: Request, response: Response, next: NextFunction){

    //verifica se o usuario possui privilegio de "Admin" no sistema
    const admin = true;

    if(admin){
        return next();
    }

    //usuario sem autorizacao ou sem acesso
    return response.status(401).json({
        error: "Nao autorizado. Usuario nao e admin.",
    });
}

export {ensureAdmin};