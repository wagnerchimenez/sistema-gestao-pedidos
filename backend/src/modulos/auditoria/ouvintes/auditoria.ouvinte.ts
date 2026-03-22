import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoCriadoEvento } from '../../pedidos/dominio/eventos/pedido-criado.evento';
import { StatusPedidoAlteradoEvento } from '../../pedidos/dominio/eventos/status-pedido-alterado.evento';
import { LogAuditoriaSchema } from '../infraestrutura/persistencia/entidades/log-auditoria.schema';

@Injectable()
export class AuditoriaOuvinte {
  private readonly logger = new Logger(AuditoriaOuvinte.name);

  constructor(
    @InjectRepository(LogAuditoriaSchema, 'auditoria')
    private readonly logRepositorio: Repository<LogAuditoriaSchema>,
  ) {}

  @OnEvent('PedidoCriadoEvento')
  async aocriarPedido(evento: PedidoCriadoEvento): Promise<void> {
    await this.registrar({
      entidade: 'Pedido',
      entidadeId: evento.pedidoId,
      operacao: 'CRIACAO',
      dadosNovos: JSON.stringify({
        nomeCliente: evento.nomeCliente,
        valorTotal: evento.valorTotal,
      }),
    });
    this.logger.log(`Auditoria: pedido ${evento.pedidoId} criado.`);
  }

  @OnEvent('StatusPedidoAlteradoEvento')
  async aoAlterarStatus(evento: StatusPedidoAlteradoEvento): Promise<void> {
    await this.registrar({
      entidade: 'Pedido',
      entidadeId: evento.pedidoId,
      operacao: 'ATUALIZACAO_STATUS',
      dadosAnteriores: JSON.stringify({ status: evento.statusAnterior }),
      dadosNovos: JSON.stringify({ status: evento.novoStatus }),
    });
    this.logger.log(
      `Auditoria: pedido ${evento.pedidoId} → ${evento.statusAnterior} → ${evento.novoStatus}.`,
    );
  }

  private async registrar(dados: {
    entidade: string;
    entidadeId: string;
    operacao: string;
    dadosAnteriores?: string;
    dadosNovos?: string;
  }): Promise<void> {
    const log = this.logRepositorio.create({
      entidade: dados.entidade,
      entidadeId: dados.entidadeId,
      operacao: dados.operacao,
      dadosAnteriores: dados.dadosAnteriores ?? null,
      dadosNovos: dados.dadosNovos ?? null,
    });
    await this.logRepositorio.save(log);
  }
}
