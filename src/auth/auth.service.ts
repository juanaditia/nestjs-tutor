import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.usersService.findOneUsername(username);

    if (user && user.password === password) {
      const{ password, ...result } = user;
      return user;
    }
    return null;
  }

  async login (user: User){

    return{
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    }
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOneUsername(
      loginUserInput.username,
    );

    if (user) {
      throw new Error('User already exists!');
    }

    return this.usersService.create({
      ...loginUserInput,
    });
  }

}
