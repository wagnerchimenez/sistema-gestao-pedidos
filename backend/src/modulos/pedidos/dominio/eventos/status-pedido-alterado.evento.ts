import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';
import { StatusPedido } from '../enums/status-pedido.enum';

export class StatusPedidoAlteradoEvento extends EventoDominio {
  constructor(
    public readonly pedidoId: string,
    public readonly statusAnterior: StatusPedido,
    public readonly novoStatus: StatusPedido,
  ) {
    super();
  }
}
