import { v4 as uuidv4 } from 'uuid';
import { EntidadeBase } from '../../../../nucleo/entidade-base';
import { NegocioErro } from '../../../../nucleo/erros/negocio.erro';
import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';
import { StatusPedido, TRANSICOES_VALIDAS } from '../enums/status-pedido.enum';
import { PedidoCriadoEvento } from '../eventos/pedido-criado.evento';
import { StatusPedidoAlteradoEvento } from '../eventos/status-pedido-alterado.evento';
import { ItemPedidoVO } from '../valor-objetos/item-pedido.vo';

interface CriarPedidoProps {
  nomeCliente: string;
  emailCliente: string;
  itens: ItemPedidoVO[];
}

interface RestaurarPedidoProps {
  id: string;
  nomeCliente: string;
  emailCliente: string;
  status: StatusPedido;
  itens: ItemPedidoVO[];
  valorTotal: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

export class PedidoEntidade extends EntidadeBase {
  public readonly nomeCliente: string;
  public readonly emailCliente: string;
  public readonly itens: ItemPedidoVO[];
  public readonly valorTotal: number;
  private _status: StatusPedido;
  private readonly _eventos: EventoDominio[] = [];

  private constructor(props: RestaurarPedidoProps) {
    super(props.id, props.criadoEm, props.atualizadoEm);
    this.nomeCliente = props.nomeCliente;
    this.emailCliente = props.emailCliente;
    this.itens = props.itens;
    this.valorTotal = props.valorTotal;
    this._status = props.status;
  }

  get status(): StatusPedido {
    return this._status;
  }

  get eventos(): EventoDominio[] {
    return [...this._eventos];
  }

  static criar(props: CriarPedidoProps): PedidoEntidade {
    if (!props.nomeCliente || props.nomeCliente.trim().length === 0) {
      throw new NegocioErro('Nome do cliente é obrigatório.');
    }
    if (!props.emailCliente || props.emailCliente.trim().length === 0) {
      throw new NegocioErro('E-mail do cliente é obrigatório.');
    }
    if (!props.itens || props.itens.length === 0) {
      throw new NegocioErro('O pedido deve ter pelo menos um item.');
    }

    const valorTotal = parseFloat(
      props.itens.reduce((soma, item) => soma + item.total, 0).toFixed(2),
    );

    const agora = new Date();
    const pedido = new PedidoEntidade({
      id: uuidv4(),
      nomeCliente: props.nomeCliente.trim(),
      emailCliente: props.emailCliente.trim().toLowerCase(),
      itens: props.itens,
      valorTotal,
      status: StatusPedido.PENDENTE,
      criadoEm: agora,
      atualizadoEm: agora,
    });

    pedido._eventos.push(
      new PedidoCriadoEvento(pedido.id, pedido.nomeCliente, pedido.valorTotal),
    );

    return pedido;
  }

  static restaurar(props: RestaurarPedidoProps): PedidoEntidade {
    return new PedidoEntidade(props);
  }

  atualizarStatus(novoStatus: StatusPedido): void {
    const transicoesPermitidas = TRANSICOES_VALIDAS[this._status];
    if (!transicoesPermitidas.includes(novoStatus)) {
      throw new NegocioErro(
        `Transição de status inválida: ${this._status} → ${novoStatus}.`,
      );
    }

    const statusAnterior = this._status;
    this._status = novoStatus;
    this.atualizadoEm = new Date();

    this._eventos.push(
      new StatusPedidoAlteradoEvento(this.id, statusAnterior, novoStatus),
    );
  }

  limparEventos(): void {
    this._eventos.length = 0;
  }
}
