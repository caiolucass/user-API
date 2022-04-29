import {Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import {Exclude, Expose} from "class-transformer";

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: "user_name"})
  userName(): string{
    return `#${this.name}`;
  }


  constructor(){
    if(!this.id){
        this.id = uuid();
    }
  }
}

export { User };