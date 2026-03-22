import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RedisIndicador } from './indicadores/redis.indicador';
import { FilaIndicador } from './indicadores/fila.indicador';

@ApiTags('saude')
@Controller('saude')
export class SaudeControlador {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private readonly typeOrmIndicator: TypeOrmHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
    @InjectDataSource() private readonly pgDataSource: DataSource,
    @InjectDataSource('auditoria') private readonly sqliteDataSource: DataSource,
    private readonly redisIndicador: RedisIndicador,
    private readonly filaIndicador: FilaIndicador,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Verifica saúde de todos os serviços',
    description:
      'Retorna o status de PostgreSQL, SQLite (auditoria), Redis, filas assíncronas e uso de memória.',
  })
  verificar() {
    return this.healthCheck.check([
      // Banco principal
      () =>
        this.typeOrmIndicator.pingCheck('postgres', {
          connection: this.pgDataSource,
        }),
      // Banco de auditoria
      () =>
        this.typeOrmIndicator.pingCheck('sqlite-auditoria', {
          connection: this.sqliteDataSource,
        }),
      // Redis (cache + filas)
      () => this.redisIndicador.verificar('redis'),
      // Filas Bull
      () => this.filaIndicador.verificar('fila-pedidos'),
      () => this.filaIndicador.verificar('fila-relatorios'),
      // Memória da aplicação
      () => this.memoryIndicator.checkHeap('memoria-heap', 500 * 1024 * 1024),
    ]);
  }
}
