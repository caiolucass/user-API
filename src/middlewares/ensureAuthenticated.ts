import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
   sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
   
    // Recebe o token
       const authToken =  request.headers.authorization;

    // Valida se o token esta preenchido      
       if(!authToken){
           return response.status(401).end();
       }
       
    // Valida se o token e valido
       const [, token] = authToken.split(" ");

       try{
          const {sub} =  verify(token , "434d86d7a2d194e6adec53075b5374ca") as IPayLoad; // token + chave

          // Recupera informacao do usuario
            request.user_id = sub
            return next();
       }catch(err){
          return response.status(401).end();
       }      
}

export  {ensureAuthenticated};