import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'logs_auditoria' })
export class LogAuditoriaSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  entidade: string;

  @Column({ name: 'entidade_id', length: 100 })
  entidadeId: string;

  @Column({ length: 50 })
  operacao: string;

  @Column({ name: 'dados_anteriores', type: 'text', nullable: true })
  dadosAnteriores: string | null;

  @Column({ name: 'dados_novos', type: 'text', nullable: true })
  dadosNovos: string | null;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
