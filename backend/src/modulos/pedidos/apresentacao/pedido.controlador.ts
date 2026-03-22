import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CriarPedidoCasoDeUso } from '../aplicacao/casos-de-uso/criar-pedido.caso-de-uso';
import { ListarPedidosCasoDeUso } from '../aplicacao/casos-de-uso/listar-pedidos.caso-de-uso';
import { BuscarPedidoCasoDeUso } from '../aplicacao/casos-de-uso/buscar-pedido.caso-de-uso';
import { AtualizarStatusCasoDeUso } from '../aplicacao/casos-de-uso/atualizar-status.caso-de-uso';
import { CriarPedidoDto } from '../aplicacao/dtos/criar-pedido.dto';
import { AtualizarStatusDto } from '../aplicacao/dtos/atualizar-status.dto';
import {
  ListaPedidosRespostaDto,
  PedidoRespostaDto,
} from '../aplicacao/dtos/pedido-resposta.dto';
import { StatusPedido } from '../dominio/enums/status-pedido.enum';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoControlador {
  constructor(
    private readonly criarPedido: CriarPedidoCasoDeUso,
    private readonly listarPedidos: ListarPedidosCasoDeUso,
    private readonly buscarPedido: BuscarPedidoCasoDeUso,
    private readonly atualizarStatus: AtualizarStatusCasoDeUso,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo pedido (enfileira processamento automático)' })
  @ApiResponse({ status: 201, type: PedidoRespostaDto })
  async criar(@Body() dto: CriarPedidoDto): Promise<PedidoRespostaDto> {
    return this.criarPedido.executar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos com filtros e paginação' })
  @ApiResponse({ status: 200, type: ListaPedidosRespostaDto })
  @ApiQuery({ name: 'status', enum: StatusPedido, required: false })
  @ApiQuery({ name: 'nomeCliente', required: false })
  @ApiQuery({ name: 'pagina', required: false, type: Number })
  @ApiQuery({ name: 'itensPorPagina', required: false, type: Number })
  async listar(
    @Query('status') status?: StatusPedido,
    @Query('nomeCliente') nomeCliente?: string,
    @Query('pagina') pagina?: number,
    @Query('itensPorPagina') itensPorPagina?: number,
  ): Promise<ListaPedidosRespostaDto> {
    return this.listarPedidos.executar({ status, nomeCliente, pagina, itensPorPagina });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiResponse({ status: 200, type: PedidoRespostaDto })
  async buscar(@Param('id') id: string): Promise<PedidoRespostaDto> {
    return this.buscarPedido.executar(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status do pedido (com validação de transição)' })
  @ApiResponse({ status: 200, type: PedidoRespostaDto })
  async atualizar(
    @Param('id') id: string,
    @Body() dto: AtualizarStatusDto,
  ): Promise<PedidoRespostaDto> {
    return this.atualizarStatus.executar(id, dto);
  }
}
