import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';


class CreateTagService{

    async execute(name: string){
       const tagrepository = getCustomRepository(TagsRepositories);

       if(!name){
           throw new Error("Nome incorreto");
       }

       //SELECT * FROM TAGS WHERE NAME = 'name'
       const tagAlreadyExists = await tagrepository.findOne({
           name
       });

       //caso a tag ja exista no banco
       if(tagAlreadyExists){
           throw new Error("Tag ja existe");
       }

       const tag = tagrepository.create({
           name,
       });

       await tagrepository.save(tag);
       return tag;
    }
}

export {CreateTagService};