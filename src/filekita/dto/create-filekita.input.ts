// DTO = Data transfer object
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator'


@InputType()
export class FileKitaCreate{
  @IsAlpha()
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  age: string;

  @Field(() => Int)
  userId: number;

  @Field()
  isPublished: boolean;

}