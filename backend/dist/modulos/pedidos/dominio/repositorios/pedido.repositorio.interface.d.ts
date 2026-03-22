import { PedidoEntidade } from '../entidades/pedido.entidade';
import { StatusPedido } from '../enums/status-pedido.enum';
export interface FiltroListarPedidos {
    status?: StatusPedido;
    nomeCliente?: string;
    pagina?: number;
    itensPorPagina?: number;
}
export interface ResultadoPaginado<T> {
    dados: T[];
    total: number;
    pagina: number;
    itensPorPagina: number;
}
export interface IPedidoRepositorio {
    salvar(pedido: PedidoEntidade): Promise<PedidoEntidade>;
    buscarPorId(id: string): Promise<PedidoEntidade | null>;
    listar(filtro: FiltroListarPedidos): Promise<ResultadoPaginado<PedidoEntidade>>;
    contarPorStatus(): Promise<{
        status: StatusPedido;
        quantidade: number;
    }[]>;
    somarFaturamentoPorDia(dias: number): Promise<{
        data: string;
        valor: number;
    }[]>;
}
