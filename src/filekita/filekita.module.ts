import { forwardRef, Module } from '@nestjs/common';
import { FileKita } from './entity/filekita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilekitaController } from './filekita.controller';
import { FilekitaService } from './filekita.service';
import { FilekitaResolver } from './filekita.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileKita]), forwardRef(() => UsersModule) ],
  controllers: [FilekitaController],
  providers: [FilekitaService, FilekitaResolver],
  exports: [FilekitaService]
})
export class FilekitaModule {}
