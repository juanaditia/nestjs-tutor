import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

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
  @Field(() => Int)
  age: number;

  @Column()
  @Field()
  isPublished: boolean;

}
