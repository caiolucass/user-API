import { Response, Request } from 'express';
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

   async handle (request: Request, response: Response){
       const {email, password} = request.body;

       const authencaticateUserService = new AuthenticateUserService;
       const userToken = await authencaticateUserService.execute({
           email,
           password,
       });

       return response.json(userToken);
   }
}

export {AuthenticateUserController};