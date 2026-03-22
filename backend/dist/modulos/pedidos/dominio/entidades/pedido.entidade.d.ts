import { EntidadeBase } from '../../../../nucleo/entidade-base';
import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';
import { StatusPedido } from '../enums/status-pedido.enum';
import { ItemPedidoVO } from '../valor-objetos/item-pedido.vo';
interface CriarPedidoProps {
    nomeCliente: string;
    emailCliente: string;
    itens: ItemPedidoVO[];
}
interface RestaurarPedidoProps {
    id: string;
    nomeCliente: string;
    emailCliente: string;
    status: StatusPedido;
    itens: ItemPedidoVO[];
    valorTotal: number;
    criadoEm: Date;
    atualizadoEm: Date;
}
export declare class PedidoEntidade extends EntidadeBase {
    readonly nomeCliente: string;
    readonly emailCliente: string;
    readonly itens: ItemPedidoVO[];
    readonly valorTotal: number;
    private _status;
    private readonly _eventos;
    private constructor();
    get status(): StatusPedido;
    get eventos(): EventoDominio[];
    static criar(props: CriarPedidoProps): PedidoEntidade;
    static restaurar(props: RestaurarPedidoProps): PedidoEntidade;
    atualizarStatus(novoStatus: StatusPedido): void;
    limparEventos(): void;
}
export {};
