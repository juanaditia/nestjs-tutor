import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { FileKita } from 'src/filekita/entity/filekita.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => FileKita, (filekita) => filekita.user)
  @Field(() => [FileKita], { nullable: true })
  filekita?: FileKita[];
}
