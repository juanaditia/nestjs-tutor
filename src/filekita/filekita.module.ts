import { Module } from '@nestjs/common';
import { FileKita } from './entity/filekita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilekitaController } from './filekita.controller';
import { FilekitaService } from './filekita.service';
import { FilekitaResolver } from './filekita.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FileKita])],
  controllers: [FilekitaController],
  providers: [FilekitaService, FilekitaResolver]
})
export class FilekitaModule {}
