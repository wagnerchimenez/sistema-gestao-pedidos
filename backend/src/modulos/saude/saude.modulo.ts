import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { BullModule } from '@nestjs/bull';
import { SaudeControlador } from './saude.controlador';
import { RedisIndicador } from './indicadores/redis.indicador';
import { FilaIndicador } from './indicadores/fila.indicador';

@Module({
  imports: [
    TerminusModule,
    // Re-registra as filas para injeção no indicador (Bull compartilha conexão Redis)
    BullModule.registerQueue({ name: 'fila-pedidos' }),
    BullModule.registerQueue({ name: 'fila-relatorios' }),
  ],
  controllers: [SaudeControlador],
  providers: [RedisIndicador, FilaIndicador],
})
export class SaudeModulo {}
