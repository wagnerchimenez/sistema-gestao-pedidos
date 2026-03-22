import { Inject, Injectable } from '@nestjs/common';
import { EntidadeNaoEncontradaErro } from '../../../../nucleo/erros/entidade-nao-encontrada.erro';
import { IPedidoRepositorio } from '../../dominio/repositorios/pedido.repositorio.interface';
import { PEDIDO_REPOSITORIO_TOKEN } from '../../dominio/repositorios/pedido.repositorio.token';
import { PedidoRespostaDto } from '../dtos/pedido-resposta.dto';

@Injectable()
export class BuscarPedidoCasoDeUso {
  constructor(
    @Inject(PEDIDO_REPOSITORIO_TOKEN)
    private readonly pedidoRepositorio: IPedidoRepositorio,
  ) {}

  async executar(id: string): Promise<PedidoRespostaDto> {
    const pedido = await this.pedidoRepositorio.buscarPorId(id);
    if (!pedido) {
      throw new EntidadeNaoEncontradaErro('Pedido', id);
    }
    return PedidoRespostaDto.deEntidade(pedido);
  }
}
