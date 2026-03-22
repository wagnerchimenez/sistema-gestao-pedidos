import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
interface DadosJobPedido {
    pedidoId: string;
}
export declare class PedidoProcessador {
    private readonly pedidoRepositorio;
    private readonly emissorEventos;
    private readonly logger;
    constructor(pedidoRepositorio: IPedidoRepositorio, emissorEventos: EventEmitter2);
    processarPedido(job: Job<DadosJobPedido>): Promise<{
        sucesso: boolean;
    }>;
    aoCompletarJob(job: Job<DadosJobPedido>): void;
    aoFalharJob(job: Job<DadosJobPedido>, erro: Error): void;
}
export {};
