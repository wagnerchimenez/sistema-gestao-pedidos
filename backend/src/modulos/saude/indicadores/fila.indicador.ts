import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

/**
 * Indicador de saúde das filas Bull.
 * Verifica se as filas conseguem comunicar com o Redis obtendo as contagens de jobs.
 */
@Injectable()
export class FilaIndicador extends HealthIndicator {
  private readonly filas: Map<string, Queue>;

  constructor(
    @InjectQueue('fila-pedidos') private readonly filaPedidos: Queue,
    @InjectQueue('fila-relatorios') private readonly filaRelatorios: Queue,
  ) {
    super();
    this.filas = new Map([
      ['fila-pedidos', filaPedidos],
      ['fila-relatorios', filaRelatorios],
    ]);
  }

  async verificar(nomeFila: string): Promise<HealthIndicatorResult> {
    const fila = this.filas.get(nomeFila);

    if (!fila) {
      const resultado = this.getStatus(nomeFila, false, {
        erro: `Fila "${nomeFila}" não registrada`,
      });
      throw new HealthCheckError(`Fila desconhecida: ${nomeFila}`, resultado);
    }

    try {
      // getJobCounts() realiza uma consulta ao Redis — se falhar, Redis está indisponível
      const contagens = await fila.getJobCounts();

      return this.getStatus(nomeFila, true, {
        aguardando: contagens.waiting,
        ativo: contagens.active,
        concluido: contagens.completed,
        falhou: contagens.failed,
        atrasado: contagens.delayed,
      });
    } catch (erro) {
      const resultado = this.getStatus(nomeFila, false, {
        mensagem: (erro as Error).message,
      });
      throw new HealthCheckError(`Fila "${nomeFila}" indisponível`, resultado);
    }
  }
}
