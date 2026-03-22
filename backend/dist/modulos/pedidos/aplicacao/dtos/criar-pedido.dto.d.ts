export declare class CriarItemPedidoDto {
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
}
export declare class CriarPedidoDto {
    nomeCliente: string;
    emailCliente: string;
    itens: CriarItemPedidoDto[];
}
