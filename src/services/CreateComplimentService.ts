import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
   async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
       const complimentRepository = getCustomRepository(ComplimentsRepositories);
       const userRepository = getCustomRepository(UsersRepositories);

       /**
        * verifica se o user_sender e o user_receiver
        * sao o mesmo usuario
        */
       if(user_sender === user_receiver){
           throw new Error("User sender e User receiver nao podem ser o mesmo usuario");
       }

        /**
        * verifica se o user_receiver existe
        */
       const userReceiverExists = await userRepository.findOne(user_receiver);
       if(!userReceiverExists){
          throw new Error ("User Receiver nao existe.");
       }

       /**
        * cria um novo elogio
        */
       const compliment = complimentRepository.create({
          tag_id,
          user_receiver,
          user_sender,
          message
       });

       await complimentRepository.save(compliment);
       return compliment;
   }
}

export {CreateComplimentService};