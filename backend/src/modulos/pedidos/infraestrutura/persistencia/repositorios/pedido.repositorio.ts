import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntidade } from '../../../dominio/entidades/pedido.entidade';
import { StatusPedido } from '../../../dominio/enums/status-pedido.enum';
import {
  FiltroListarPedidos,
  IPedidoRepositorio,
  ResultadoPaginado,
} from '../../../dominio/repositorios/pedido.repositorio.interface';
import { ItemPedidoVO } from '../../../dominio/valor-objetos/item-pedido.vo';
import { PedidoSchema } from '../entidades/pedido.schema';

// Adaptador (Adapter) — implementa a porta IPedidoRepositorio
@Injectable()
export class PedidoRepositorio implements IPedidoRepositorio {
  constructor(
    @InjectRepository(PedidoSchema)
    private readonly repositorioTypeOrm: Repository<PedidoSchema>,
  ) {}

  async salvar(pedido: PedidoEntidade): Promise<PedidoEntidade> {
    const schema = this.paraSchema(pedido);
    await this.repositorioTypeOrm.save(schema);
    return pedido;
  }

  async buscarPorId(id: string): Promise<PedidoEntidade | null> {
    const schema = await this.repositorioTypeOrm.findOne({ where: { id } });
    return schema ? this.paraEntidade(schema) : null;
  }

  async listar(filtro: FiltroListarPedidos): Promise<ResultadoPaginado<PedidoEntidade>> {
    const pagina = filtro.pagina ?? 1;
    const itensPorPagina = filtro.itensPorPagina ?? 10;

    const query = this.repositorioTypeOrm.createQueryBuilder('pedido');

    if (filtro.status) {
      query.andWhere('pedido.status = :status', { status: filtro.status });
    }
    if (filtro.nomeCliente) {
      query.andWhere('pedido.nomeCliente ILIKE :nome', {
        nome: `%${filtro.nomeCliente}%`,
      });
    }

    query
      .orderBy('pedido.criadoEm', 'DESC')
      .skip((pagina - 1) * itensPorPagina)
      .take(itensPorPagina);

    const [schemas, total] = await query.getManyAndCount();

    return {
      dados: schemas.map(this.paraEntidade),
      total,
      pagina,
      itensPorPagina,
    };
  }

  async contarPorStatus(): Promise<{ status: StatusPedido; quantidade: number }[]> {
    const resultado = await this.repositorioTypeOrm
      .createQueryBuilder('pedido')
      .select('pedido.status', 'status')
      .addSelect('COUNT(*)', 'quantidade')
      .groupBy('pedido.status')
      .getRawMany();

    return resultado.map((r) => ({
      status: r.status as StatusPedido,
      quantidade: parseInt(r.quantidade, 10),
    }));
  }

  async somarFaturamentoPorDia(dias: number): Promise<{ data: string; valor: number }[]> {
    const resultado = await this.repositorioTypeOrm
      .createQueryBuilder('pedido')
      .select("TO_CHAR(pedido.criadoEm, 'YYYY-MM-DD')", 'data')
      .addSelect('SUM(pedido.valorTotal)', 'valor')
      .where("pedido.criadoEm >= NOW() - (:dias * INTERVAL '1 day')", { dias })
      .andWhere('pedido.status = :status', { status: StatusPedido.CONCLUIDO })
      .groupBy("TO_CHAR(pedido.criadoEm, 'YYYY-MM-DD')")
      .orderBy('data', 'ASC')
      .getRawMany();

    return resultado.map((r) => ({
      data: r.data,
      valor: parseFloat(r.valor),
    }));
  }

  private paraSchema(pedido: PedidoEntidade): PedidoSchema {
    const schema = new PedidoSchema();
    schema.id = pedido.id;
    schema.nomeCliente = pedido.nomeCliente;
    schema.emailCliente = pedido.emailCliente;
    schema.status = pedido.status;
    schema.valorTotal = pedido.valorTotal;
    schema.itens = pedido.itens;
    schema.criadoEm = pedido.criadoEm;
    schema.atualizadoEm = pedido.atualizadoEm;
    return schema;
  }

  private paraEntidade(schema: PedidoSchema): PedidoEntidade {
    const itens = schema.itens.map((item) =>
      ItemPedidoVO.restaurar({
        nomeProduto: item.nomeProduto,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      }),
    );

    return PedidoEntidade.restaurar({
      id: schema.id,
      nomeCliente: schema.nomeCliente,
      emailCliente: schema.emailCliente,
      status: schema.status,
      itens,
      valorTotal: Number(schema.valorTotal),
      criadoEm: schema.criadoEm,
      atualizadoEm: schema.atualizadoEm,
    });
  }
}
