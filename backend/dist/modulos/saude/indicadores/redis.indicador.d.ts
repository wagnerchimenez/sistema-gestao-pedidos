import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class RedisIndicador extends HealthIndicator implements OnModuleInit, OnModuleDestroy {
    private readonly configServico;
    private cliente;
    constructor(configServico: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): Promise<void>;
    verificar(chave: string): Promise<HealthIndicatorResult>;
}
