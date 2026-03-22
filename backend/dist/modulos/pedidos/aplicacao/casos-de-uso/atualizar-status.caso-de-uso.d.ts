import { EventEmitter2 } from '@nestjs/event-emitter';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { AtualizarStatusDto } from '../dtos/atualizar-status.dto';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';
export declare class AtualizarStatusCasoDeUso {
    private readonly pedidoRepositorio;
    private readonly emissorEventos;
    constructor(pedidoRepositorio: IPedidoRepositorio, emissorEventos: EventEmitter2);
    executar(id: string, dto: AtualizarStatusDto): Promise<PedidoRespostaDto>;
}
