import { NegocioErro } from '../../../../nucleo/erros/negocio.erro';

interface CriarItemPedidoProps {
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

export class ItemPedidoVO {
  public readonly nomeProduto: string;
  public readonly quantidade: number;
  public readonly precoUnitario: number;
  public readonly total: number;

  private constructor(props: CriarItemPedidoProps) {
    this.nomeProduto = props.nomeProduto;
    this.quantidade = props.quantidade;
    this.precoUnitario = props.precoUnitario;
    this.total = parseFloat((props.quantidade * props.precoUnitario).toFixed(2));
  }

  static criar(props: CriarItemPedidoProps): ItemPedidoVO {
    if (!props.nomeProduto || props.nomeProduto.trim().length === 0) {
      throw new NegocioErro('Nome do produto é obrigatório.');
    }
    if (props.quantidade <= 0) {
      throw new NegocioErro('Quantidade deve ser maior que zero.');
    }
    if (props.precoUnitario <= 0) {
      throw new NegocioErro('Preço unitário deve ser maior que zero.');
    }
    return new ItemPedidoVO(props);
  }

  static restaurar(props: CriarItemPedidoProps & { total?: number }): ItemPedidoVO {
    return new ItemPedidoVO(props);
  }
}
