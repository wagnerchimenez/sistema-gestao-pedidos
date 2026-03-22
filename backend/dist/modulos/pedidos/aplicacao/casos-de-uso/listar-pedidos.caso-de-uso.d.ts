import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';
import { ListaPedidosRespostaDto } from '../dtos/pedido-resposta.dto';
interface FiltroListarPedidosDto {
    status?: StatusPedido;
    nomeCliente?: string;
    pagina?: number;
    itensPorPagina?: number;
}
export declare class ListarPedidosCasoDeUso {
    private readonly pedidoRepositorio;
    constructor(pedidoRepositorio: IPedidoRepositorio);
    executar(filtro: FiltroListarPedidosDto): Promise<ListaPedidosRespostaDto>;
}
export {};
