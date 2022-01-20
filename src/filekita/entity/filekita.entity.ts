import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity';

@Entity()
@ObjectType()
export class FileKita {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 500 })
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  age: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field()
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.filekita)
  @Field(() => User)
  user: User;

}
