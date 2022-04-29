import {Request, Response} from 'express';
import { ListUsersService } from '../services/ListUsersService';

class ListUsersController {

    async handle(request: Request, response: Response){
       const listUsersService = new ListUsersService();
       const users = await listUsersService.execute();

       return response.json(users).status(200);
    }
}

export {ListUsersController};