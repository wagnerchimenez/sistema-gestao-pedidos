import { Process, Processor, OnQueueFailed, OnQueueCompleted } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { IPedidoRepositorio } from '../../../pedidos/dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../../pedidos/dominio/repositorios/pedido.repositorio.token';
import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';
import { ExcelServico } from '../excel/excel.servico';

export interface DadosJobRelatorio {
  nomeArquivo: string;
  status?: StatusPedido;
  dataInicio?: string;
  dataFim?: string;
}

@Processor('fila-relatorios')
export class RelatorioProcessador {
  private readonly logger = new Logger(RelatorioProcessador.name);

  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
    private readonly excelServico: ExcelServico,
  ) {}

  @Process('gerar-relatorio')
  async gerarRelatorio(job: Job<DadosJobRelatorio>): Promise<{ caminhoArquivo: string }> {
    this.logger.log(`Iniciando geração de relatório: ${job.data.nomeArquivo}`);

    await job.progress(10);

    const resultado = await this.pedidoRepositorio.listar({
      status: job.data.status,
      pagina: 1,
      itensPorPagina: 10000,
    });

    await job.progress(50);

    const caminhoArquivo = await this.excelServico.gerarRelatorioExcel(
      resultado.dados,
      job.data.nomeArquivo,
    );

    await job.progress(100);
    return { caminhoArquivo };
  }

  @OnQueueCompleted()
  aoCompletarJob(job: Job<DadosJobRelatorio>) {
    this.logger.log(`Relatório "${job.data.nomeArquivo}" gerado com sucesso.`);
  }

  @OnQueueFailed()
  aoFalharJob(job: Job<DadosJobRelatorio>, erro: Error) {
    this.logger.error(`Falha ao gerar relatório "${job.data.nomeArquivo}": ${erro.message}`);
  }
}
