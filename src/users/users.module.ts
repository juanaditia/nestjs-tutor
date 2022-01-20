import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FilekitaModule } from 'src/filekita/filekita.module';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => FilekitaModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
