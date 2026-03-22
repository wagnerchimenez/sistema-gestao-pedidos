import { Inject, Injectable } from '@nestjs/common';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../dominio/repositorios/pedido.repositorio.token';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';
import { ListaPedidosRespostaDto, PedidoRespostaDto } from '../dtos/pedido-resposta.dto';

interface FiltroListarPedidosDto {
  status?: StatusPedido;
  nomeCliente?: string;
  pagina?: number;
  itensPorPagina?: number;
}

@Injectable()
export class ListarPedidosCasoDeUso {
  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
  ) {}

  async executar(filtro: FiltroListarPedidosDto): Promise<ListaPedidosRespostaDto> {
    const resultado = await this.pedidoRepositorio.listar({
      status: filtro.status,
      nomeCliente: filtro.nomeCliente,
      pagina: filtro.pagina ?? 1,
      itensPorPagina: filtro.itensPorPagina ?? 10,
    });

    return {
      dados: resultado.dados.map(PedidoRespostaDto.deEntidade),
      total: resultado.total,
      pagina: resultado.pagina,
      itensPorPagina: resultado.itensPorPagina,
    };
  }
}
