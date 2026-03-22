import { EventEmitter2 } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { CriarPedidoDto } from '../dtos/criar-pedido.dto';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';
export declare class CriarPedidoCasoDeUso {
    private readonly pedidoRepositorio;
    private readonly emissordEventos;
    private readonly filaPedidos;
    constructor(pedidoRepositorio: IPedidoRepositorio, emissordEventos: EventEmitter2, filaPedidos: Queue);
    executar(dto: CriarPedidoDto): Promise<PedidoRespostaDto>;
}
