import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';
export declare class EstatisticasPorStatusDto {
    status: StatusPedido;
    quantidade: number;
}
export declare class FaturamentoPorDiaDto {
    data: string;
    valor: number;
}
export declare class EstatisticasDashboardDto {
    totalPedidos: number;
    pedidosPorStatus: EstatisticasPorStatusDto[];
    faturamentoTotal: number;
    ticketMedio: number;
    faturamentoPorDia: FaturamentoPorDiaDto[];
}
