import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';

export class FiltroRelatorioDto {
  @ApiProperty({ enum: StatusPedido, required: false })
  @IsOptional()
  @IsEnum(StatusPedido)
  status?: StatusPedido;

  @ApiProperty({ example: '2026-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiProperty({ example: '2026-12-31', required: false })
  @IsOptional()
  @IsDateString()
  dataFim?: string;
}

export class RelatorioSolicitadoDto {
  @ApiProperty() jobId: string;
  @ApiProperty() mensagem: string;
}
