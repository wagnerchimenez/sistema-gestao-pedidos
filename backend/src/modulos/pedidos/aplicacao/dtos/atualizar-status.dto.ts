import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';

export class AtualizarStatusDto {
  @ApiProperty({ enum: StatusPedido, example: StatusPedido.PROCESSANDO })
  @IsEnum(StatusPedido, { message: 'Status inválido.' })
  status: StatusPedido;
}
