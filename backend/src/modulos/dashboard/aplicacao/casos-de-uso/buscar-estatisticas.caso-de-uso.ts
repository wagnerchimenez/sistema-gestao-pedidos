import { Inject, Injectable } from '@nestjs/common';
import { IPedidoRepositorio } from '../../../pedidos/dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../../pedidos/dominio/repositorios/pedido.repositorio.token';
import { EstatisticasDashboardDto } from '../dtos/estatisticas.dto';

@Injectable()
export class BuscarEstatisticasCasoDeUso {
  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
  ) {}

  async executar(): Promise<EstatisticasDashboardDto> {
    const [pedidosPorStatus, faturamentoPorDia, resultadoTotal] = await Promise.all([
      this.pedidoRepositorio.contarPorStatus(),
      this.pedidoRepositorio.somarFaturamentoPorDia(30),
      this.pedidoRepositorio.listar({ pagina: 1, itensPorPagina: 1 }),
    ]);

    const totalPedidos = pedidosPorStatus.reduce((soma, r) => soma + r.quantidade, 0);
    const faturamentoTotal = faturamentoPorDia.reduce((soma, r) => soma + r.valor, 0);
    const ticketMedio = totalPedidos > 0 ? parseFloat((faturamentoTotal / totalPedidos).toFixed(2)) : 0;

    return {
      totalPedidos: resultadoTotal.total,
      pedidosPorStatus,
      faturamentoTotal: parseFloat(faturamentoTotal.toFixed(2)),
      ticketMedio,
      faturamentoPorDia,
    };
  }
}
