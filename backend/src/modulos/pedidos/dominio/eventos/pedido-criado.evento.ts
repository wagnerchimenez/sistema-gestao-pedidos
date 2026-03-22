import { EventoDominio } from '../../../../nucleo/eventos/evento-dominio';

export class PedidoCriadoEvento extends EventoDominio {
  constructor(
    public readonly pedidoId: string,
    public readonly nomeCliente: string,
    public readonly valorTotal: number,
  ) {
    super();
  }
}
