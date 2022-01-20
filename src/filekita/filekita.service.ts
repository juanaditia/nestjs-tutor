import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileKita } from './entity/filekita.entity';
import { FileKitaCreate } from './dto/create-filekita.input';
import { UpdateFilekia } from './dto/update-filekita.input'
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FilekitaService {
  constructor(
    @InjectRepository(FileKita)
    private filekitaRepository: Repository<FileKita>,
    @Inject(forwardRef(() => UsersService))
    private userService:UsersService,
  ) {}

  async showAll() {
    return await this.filekitaRepository.find();
  }

  async findOneData(id: number): Promise<FileKita> {
    return await this.filekitaRepository.findOneOrFail(id);
  }

  // create data
  async create(data: FileKitaCreate) {
    const fileKitaNew = await this.filekitaRepository.create(data);
    await this.filekitaRepository.save(fileKitaNew);
    return fileKitaNew;
  }

  // async create(data: FileKitaCreate): Promise<FileKita> {
  //   return await this.filekitaRepository.save(data)
  // }

  async showPreRecord(id: string) {
    return await this.filekitaRepository.findOne({
      where: { id },
    });
  }

  // update data

  // async update(id: string, data: Partial<FileKitaCreate>) {
  //   await this.filekitaRepository.update(id, data);
  //   return await this.filekitaRepository.findOne({
  //     where: { id },
  //   });
  // }

  async update(id: string, UpdateFilekia:UpdateFilekia ) {
    // typeORM update method
    const data = await this.filekitaRepository.findOneOrFail(id);
    Object.assign(data, UpdateFilekia);
    return await this.filekitaRepository.save(data);
  }

  // delete data

  // async deleteData(id: string) {
  //   await this.filekitaRepository.delete(id);
  //   return { deleted: true };
  // }
  async deleteData(id: number) {
    return await this.filekitaRepository.delete(id);
    
  }

  async getUser(id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  async getFilekita(id: number): Promise<FileKita[]> {
    return await this.filekitaRepository.find({ userId: id });
  }

}
