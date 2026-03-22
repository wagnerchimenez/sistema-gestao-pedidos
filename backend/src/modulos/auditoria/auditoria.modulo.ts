import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaOuvinte } from './ouvintes/auditoria.ouvinte';
import { LogAuditoriaSchema } from './infraestrutura/persistencia/entidades/log-auditoria.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogAuditoriaSchema], 'auditoria'),
  ],
  providers: [AuditoriaOuvinte],
})
export class AuditoriaModulo {}
