import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CriarItemPedidoDto {
  @ApiProperty({ example: 'Notebook Dell XPS' })
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório.' })
  nomeProduto: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsPositive({ message: 'Quantidade deve ser maior que zero.' })
  quantidade: number;

  @ApiProperty({ example: 4500.0 })
  @IsNumber()
  @IsPositive({ message: 'Preço unitário deve ser maior que zero.' })
  precoUnitario: number;
}

export class CriarPedidoDto {
  @ApiProperty({ example: 'Maria Silva' })
  @IsString()
  @IsNotEmpty({ message: 'Nome do cliente é obrigatório.' })
  nomeCliente: string;

  @ApiProperty({ example: 'maria.silva@email.com' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  emailCliente: string;

  @ApiProperty({ type: [CriarItemPedidoDto] })
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'O pedido deve ter pelo menos um item.' })
  @Type(() => CriarItemPedidoDto)
  itens: CriarItemPedidoDto[];
}
