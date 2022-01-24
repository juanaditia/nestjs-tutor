import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver,} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=> LoginResponse) 
  @UseGuards(GqlAuthGuard)
  async login( @Args ('LoginUserInput') loginUserInput: LoginUserInput){
    return await this.authService.login(loginUserInput);
  }

}
