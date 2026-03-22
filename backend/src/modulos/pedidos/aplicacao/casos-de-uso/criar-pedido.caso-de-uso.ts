import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { PedidoEntidade } from '../../dominio/entidades/pedido.entidade';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../dominio/repositorios/pedido.repositorio.token';
import { ItemPedidoVO } from '../../dominio/valor-objetos/item-pedido.vo';
import { CriarPedidoDto } from '../dtos/criar-pedido.dto';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';

@Injectable()
export class CriarPedidoCasoDeUso {
  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
    private readonly emissordEventos: EventEmitter2,
    @InjectQueue('fila-pedidos')
    private readonly filaPedidos: Queue,
  ) {}

  async executar(dto: CriarPedidoDto): Promise<PedidoRespostaDto> {
    const itens = dto.itens.map((item) =>
      ItemPedidoVO.criar({
        nomeProduto: item.nomeProduto,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      }),
    );

    const pedido = PedidoEntidade.criar({
      nomeCliente: dto.nomeCliente,
      emailCliente: dto.emailCliente,
      itens,
    });

    await this.pedidoRepositorio.salvar(pedido);

    // Publicar eventos de domínio após persistência
    for (const evento of pedido.eventos) {
      await this.emissordEventos.emitAsync(evento.constructor.name, evento);
    }
    pedido.limparEventos();

    // Enfileirar para processamento assíncrono
    await this.filaPedidos.add(
      'processar-pedido',
      { pedidoId: pedido.id },
      { delay: 0, attempts: 3 },
    );

    return PedidoRespostaDto.deEntidade(pedido);
  }
}
