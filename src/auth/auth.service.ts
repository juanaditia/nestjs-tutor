import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.usersService.findOneUsername(username);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
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
    const password = await bcrypt.hash(loginUserInput.password, 10);  // bcrypt has password
    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }

}
