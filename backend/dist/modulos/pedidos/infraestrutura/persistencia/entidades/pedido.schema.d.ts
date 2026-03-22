import { StatusPedido } from '../../../dominio/enums/status-pedido.enum';
import { ItemPedidoVO } from '../../../dominio/valor-objetos/item-pedido.vo';
export declare class PedidoSchema {
    id: string;
    nomeCliente: string;
    emailCliente: string;
    status: StatusPedido;
    valorTotal: number;
    itens: ItemPedidoVO[];
    criadoEm: Date;
    atualizadoEm: Date;
}
