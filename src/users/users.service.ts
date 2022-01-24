import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileKita } from 'src/filekita/entity/filekita.entity';
import { FilekitaService } from 'src/filekita/filekita.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => FilekitaService))
    private filekitaService:FilekitaService,
  ) {}

  async getFilekita(id: number): Promise<FileKita[]> {
    return await this.filekitaService.getFilekita(id);
  }
  
  async create(data: CreateUserInput): Promise<User> {
    return await this.usersRepository.save(data)
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async findOneUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.findOneOrFail(id);
    Object.assign(user, updateUserInput);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
