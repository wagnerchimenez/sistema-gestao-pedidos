interface CriarItemPedidoProps {
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
}
export declare class ItemPedidoVO {
    readonly nomeProduto: string;
    readonly quantidade: number;
    readonly precoUnitario: number;
    readonly total: number;
    private constructor();
    static criar(props: CriarItemPedidoProps): ItemPedidoVO;
    static restaurar(props: CriarItemPedidoProps & {
        total?: number;
    }): ItemPedidoVO;
}
export {};
