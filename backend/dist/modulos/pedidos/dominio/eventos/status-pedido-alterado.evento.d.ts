import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';
import { StatusPedido } from '../enums/status-pedido.enum';
export declare class StatusPedidoAlteradoEvento extends EventoDominio {
    readonly pedidoId: string;
    readonly statusAnterior: StatusPedido;
    readonly novoStatus: StatusPedido;
    constructor(pedidoId: string, statusAnterior: StatusPedido, novoStatus: StatusPedido);
}
