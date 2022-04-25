import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository} from "typeorm";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, password, admin = false} : IUserRequest){
        const userRepository = getCustomRepository(UsersRepositories);

        //verfica se e um email
        if(!email){
            throw new Error("Email incorreto.");
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        //verifica se o email ja existe
        if(userAlreadyExists){
            throw new Error("Usuario ja existe.");
        }

        //criptografa a senha do usuario
        const passwordHash = await hash(password, 8);

        //cria um novo usuario
        const user = userRepository.create({
            name, 
            email, 
            password:passwordHash, 
            admin,
        });

        await userRepository.save(user);
        return user;
    }
}

export {CreateUserService};