import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';
export declare class PedidoCriadoEvento extends EventoDominio {
    readonly pedidoId: string;
    readonly nomeCliente: string;
    readonly valorTotal: number;
    constructor(pedidoId: string, nomeCliente: string, valorTotal: number);
}
