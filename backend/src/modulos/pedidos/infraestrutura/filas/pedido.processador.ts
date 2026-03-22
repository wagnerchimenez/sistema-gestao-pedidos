import { Process, Processor, OnQueueFailed, OnQueueCompleted } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { StatusPedido } from '../../dominio/enums/status-pedido.enum';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../dominio/repositorios/pedido.repositorio.token';

interface DadosJobPedido {
  pedidoId: string;
}

@Processor('fila-pedidos')
export class PedidoProcessador {
  private readonly logger = new Logger(PedidoProcessador.name);

  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
    private readonly emissorEventos: EventEmitter2,
  ) {}

  @Process('processar-pedido')
  async processarPedido(job: Job<DadosJobPedido>): Promise<{ sucesso: boolean }> {
    const { pedidoId } = job.data;
    this.logger.log(`Processando pedido ${pedidoId}...`);

    const pedido = await this.pedidoRepositorio.buscarPorId(pedidoId);
    if (!pedido) {
      throw new Error(`Pedido ${pedidoId} não encontrado para processamento.`);
    }

    // Simula validações assíncronas (estoque, limite de crédito, etc.)
    await job.progress(30);
    await new Promise((resolve) => setTimeout(resolve, 500));

    pedido.atualizarStatus(StatusPedido.PROCESSANDO);
    await this.pedidoRepositorio.salvar(pedido);
    await job.progress(60);

    // Simula integração com sistema externo
    await new Promise((resolve) => setTimeout(resolve, 500));

    pedido.atualizarStatus(StatusPedido.CONCLUIDO);
    await this.pedidoRepositorio.salvar(pedido);

    for (const evento of pedido.eventos) {
      await this.emissorEventos.emitAsync(evento.constructor.name, evento);
    }
    pedido.limparEventos();

    await job.progress(100);
    return { sucesso: true };
  }

  @OnQueueCompleted()
  aoCompletarJob(job: Job<DadosJobPedido>) {
    this.logger.log(`Job ${job.id} concluído para pedido ${job.data.pedidoId}.`);
  }

  @OnQueueFailed()
  aoFalharJob(job: Job<DadosJobPedido>, erro: Error) {
    this.logger.error(
      `Job ${job.id} falhou (tentativa ${job.attemptsMade}): ${erro.message}`,
    );
  }
}
