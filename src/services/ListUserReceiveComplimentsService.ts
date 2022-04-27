import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';

class ListUserReceiveComplimentsService {

    async execute(user_id: string){
          const complimentRepository = getCustomRepository(ComplimentsRepositories);
          const compliments = await complimentRepository.find({
              where: {
                  userReceiver: user_id,
              },
          });

          return compliments;
    }
}
export {ListUserReceiveComplimentsService};