import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';
export declare class FiltroRelatorioDto {
    status?: StatusPedido;
    dataInicio?: string;
    dataFim?: string;
}
export declare class RelatorioSolicitadoDto {
    jobId: string;
    mensagem: string;
}
