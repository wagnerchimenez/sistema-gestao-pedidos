import { Queue } from 'bull';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class FilaIndicador extends HealthIndicator {
    private readonly filaPedidos;
    private readonly filaRelatorios;
    private readonly filas;
    constructor(filaPedidos: Queue, filaRelatorios: Queue);
    verificar(nomeFila: string): Promise<HealthIndicatorResult>;
}
