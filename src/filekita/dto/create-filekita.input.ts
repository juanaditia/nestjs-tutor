// DTO = Data transfer object
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator'


@InputType()
export class FileKitaDTO{
  @IsAlpha()
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;

  @Field()
  isPublished: boolean;

}