import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const userRepository = getCustomRepository(UsersRepositories);
        
        /**
         * /verifica se o email existe
         */
        const user = await userRepository.findOne({
            email,
        });

        if(!user){
            throw new Error("E-mail ou senha incorretos.");
        }

        /**
         * verifica se a senha esta correta
         */
        const correctPassword = await compare(password, user.password);
        if(!correctPassword){
            throw new Error("E-mail ou senha incorretos.");
        }

        /**
         * gera token de autenticacao do usuario
         * que expira em 1 dia
         */
        const userToken = sign({
            email: user.email,
        }, "434d86d7a2d194e6adec53075b5374ca", {
            subject: user.id,
            expiresIn: "1d",
        });
        return userToken;
    }
}

export {AuthenticateUserService};