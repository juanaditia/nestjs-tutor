import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

import { FileKitaCreate } from './dto/create-filekita.input';
import { UpdateFilekia } from './dto/update-filekita.input';
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
  async createFilekita(@Args('input') input: FileKitaCreate){
    return this.fileKitaService.create(input);
  }

  @Mutation(() => FileKita)
  async updateFilekita(
    @Args('id',  {type: () => Int }) id: string,
    @Args('input') input: UpdateFilekia,
  ){
    return this.fileKitaService.update(id,input);
  }

  // @Mutation(() => FileKita)
  // async removeFilekita(@Args('id', { type: () => Int }) id: string) {
  //    return this.fileKitaService.deleteData(id);
  // }

  @Mutation(() => FileKita)
  async removeFilekita(@Args('id', {type: () => Int }) id: number) {
    const user = this.fileKitaService.findOneData(id);
    this.fileKitaService.deleteData(id);
    return user;
  }

  @Query(() => FileKita)
  async getFilekita(@Args('id', { type: () => Int }) id: number) {
    return await this.fileKitaService.findOneData(id);
  }

  @ResolveField(() => User)
  async user(@Parent() filekita: FileKita) {
    return await this.fileKitaService.getUser(filekita.userId);
  }
}
