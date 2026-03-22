import { HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { DataSource } from 'typeorm';
import { RedisIndicador } from './indicadores/redis.indicador';
import { FilaIndicador } from './indicadores/fila.indicador';
export declare class SaudeControlador {
    private readonly healthCheck;
    private readonly typeOrmIndicator;
    private readonly memoryIndicator;
    private readonly pgDataSource;
    private readonly sqliteDataSource;
    private readonly redisIndicador;
    private readonly filaIndicador;
    constructor(healthCheck: HealthCheckService, typeOrmIndicator: TypeOrmHealthIndicator, memoryIndicator: MemoryHealthIndicator, pgDataSource: DataSource, sqliteDataSource: DataSource, redisIndicador: RedisIndicador, filaIndicador: FilaIndicador);
    verificar(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
