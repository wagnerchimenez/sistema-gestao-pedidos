import { ApiProperty } from '@nestjs/swagger';
import { PedidoEntidade } from '../../dominio/entidades/pedido.entidade';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';

export class ItemPedidoRespostaDto {
  @ApiProperty() nomeProduto: string;
  @ApiProperty() quantidade: number;
  @ApiProperty() precoUnitario: number;
  @ApiProperty() total: number;
}

export class PedidoRespostaDto {
  @ApiProperty() id: string;
  @ApiProperty() nomeCliente: string;
  @ApiProperty() emailCliente: string;
  @ApiProperty({ enum: StatusPedido }) status: StatusPedido;
  @ApiProperty({ type: [ItemPedidoRespostaDto] }) itens: ItemPedidoRespostaDto[];
  @ApiProperty() valorTotal: number;
  @ApiProperty() criadoEm: Date;
  @ApiProperty() atualizadoEm: Date;

  static deEntidade(pedido: PedidoEntidade): PedidoRespostaDto {
    const dto = new PedidoRespostaDto();
    dto.id = pedido.id;
    dto.nomeCliente = pedido.nomeCliente;
    dto.emailCliente = pedido.emailCliente;
    dto.status = pedido.status;
    dto.itens = pedido.itens.map((item) => ({
      nomeProduto: item.nomeProduto,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
      total: item.total,
    }));
    dto.valorTotal = pedido.valorTotal;
    dto.criadoEm = pedido.criadoEm;
    dto.atualizadoEm = pedido.atualizadoEm;
    return dto;
  }
}

export class ListaPedidosRespostaDto {
  @ApiProperty({ type: [PedidoRespostaDto] }) dados: PedidoRespostaDto[];
  @ApiProperty() total: number;
  @ApiProperty() pagina: number;
  @ApiProperty() itensPorPagina: number;
}
