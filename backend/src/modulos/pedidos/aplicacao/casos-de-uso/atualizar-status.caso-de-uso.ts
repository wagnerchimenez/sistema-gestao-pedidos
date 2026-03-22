import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntidadeNaoEncontradaErro } from '../../../../nucleo/erros/entidade-nao-encontrada.erro';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../dominio/repositorios/pedido.repositorio.token';
import { AtualizarStatusDto } from '../dtos/atualizar-status.dto';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';

@Injectable()
export class AtualizarStatusCasoDeUso {
  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
    private readonly emissorEventos: EventEmitter2,
  ) {}

  async executar(id: string, dto: AtualizarStatusDto): Promise<PedidoRespostaDto> {
    const pedido = await this.pedidoRepositorio.buscarPorId(id);
    if (!pedido) {
      throw new EntidadeNaoEncontradaErro('Pedido', id);
    }

    pedido.atualizarStatus(dto.status);
    await this.pedidoRepositorio.salvar(pedido);

    for (const evento of pedido.eventos) {
      await this.emissorEventos.emitAsync(evento.constructor.name, evento);
    }
    pedido.limparEventos();

    return PedidoRespostaDto.deEntidade(pedido);
  }
}
