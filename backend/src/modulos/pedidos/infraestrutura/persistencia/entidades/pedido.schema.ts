import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusPedido } from '../../../dominio/enums/status-pedido.enum';
import { ItemPedidoVO } from '../../../dominio/valor-objetos/item-pedido.vo';

// Schema TypeORM — separado da entidade de domínio para não poluir o domínio
@Entity({ name: 'pedidos' })
export class PedidoSchema {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'nome_cliente', length: 255 })
  nomeCliente: string;

  @Column({ name: 'email_cliente', length: 255 })
  emailCliente: string;

  @Column({ type: 'enum', enum: StatusPedido, default: StatusPedido.PENDENTE })
  status: StatusPedido;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  // Itens armazenados como JSONB para simplicidade sem tabela extra
  @Column({ type: 'jsonb', default: '[]' })
  itens: ItemPedidoVO[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
