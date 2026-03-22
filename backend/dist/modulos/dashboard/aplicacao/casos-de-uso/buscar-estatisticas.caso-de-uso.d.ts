import { IPedidoRepositorio } from '../../../pedidos/dominio/repositorios/pedido.repositorio.interface';
import { EstatisticasDashboardDto } from '../dtos/estatisticas.dto';
export declare class BuscarEstatisticasCasoDeUso {
    private readonly pedidoRepositorio;
    constructor(pedidoRepositorio: IPedidoRepositorio);
    executar(): Promise<EstatisticasDashboardDto>;
}
