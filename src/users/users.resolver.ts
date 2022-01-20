import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id',  {type: () => Int }) id: number,) {
    return await this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const user = this.usersService.findOne(id);
     await this.usersService.remove(id);
     return user
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.findOne(id);
  }

  @ResolveField()
  async fileKita(@Parent() user: User) {
    return this.usersService.getFilekita(user.id);
  }

}
