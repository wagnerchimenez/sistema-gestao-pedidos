import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';
export declare class BuscarPedidoCasoDeUso {
    private readonly pedidoRepositorio;
    constructor(pedidoRepositorio: IPedidoRepositorio);
    executar(id: string): Promise<PedidoRespostaDto>;
}
