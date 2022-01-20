import { InputType, PartialType } from '@nestjs/graphql';
import { FileKitaCreate } from './create-filekita.input';


@InputType()
export class UpdateFilekia extends PartialType(FileKitaCreate) {}
