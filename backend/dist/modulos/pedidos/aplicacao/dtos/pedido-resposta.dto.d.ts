import { PedidoEntidade } from '../../dominio/entidades/pedido.entidade';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';
export declare class ItemPedidoRespostaDto {
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    total: number;
}
export declare class PedidoRespostaDto {
    id: string;
    nomeCliente: string;
    emailCliente: string;
    status: StatusPedido;
    itens: ItemPedidoRespostaDto[];
    valorTotal: number;
    criadoEm: Date;
    atualizadoEm: Date;
    static deEntidade(pedido: PedidoEntidade): PedidoRespostaDto;
}
export declare class ListaPedidosRespostaDto {
    dados: PedidoRespostaDto[];
    total: number;
    pagina: number;
    itensPorPagina: number;
}
