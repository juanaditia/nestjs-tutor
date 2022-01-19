import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileKitaDTO } from './dto/create-filekita.input';
import { FileKita } from './entity/filekita.entity';
import { FilekitaService } from './filekita.service';

@Resolver(() => FileKita)
export class FilekitaResolver {
  constructor(private readonly fileKitaService: FilekitaService) {}

  @Query(() => [FileKita])
  async filekita() {
    return await this.fileKitaService.showAll();
  }

  @Mutation(() => FileKita)
  async create(@Args('input') input: FileKitaDTO){
    return this.fileKitaService.create(input);
  }
}
