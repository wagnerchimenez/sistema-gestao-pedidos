import { ApiProperty } from '@nestjs/swagger';
import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';

export class EstatisticasPorStatusDto {
  @ApiProperty({ enum: StatusPedido }) status: StatusPedido;
  @ApiProperty() quantidade: number;
}

export class FaturamentoPorDiaDto {
  @ApiProperty() data: string;
  @ApiProperty() valor: number;
}

export class EstatisticasDashboardDto {
  @ApiProperty() totalPedidos: number;
  @ApiProperty({ type: [EstatisticasPorStatusDto] }) pedidosPorStatus: EstatisticasPorStatusDto[];
  @ApiProperty() faturamentoTotal: number;
  @ApiProperty() ticketMedio: number;
  @ApiProperty({ type: [FaturamentoPorDiaDto] }) faturamentoPorDia: FaturamentoPorDiaDto[];
}
