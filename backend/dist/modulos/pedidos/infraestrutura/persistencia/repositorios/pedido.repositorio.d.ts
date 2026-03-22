import { Repository } from 'typeorm';
import { PedidoEntidade } from '../../../dominio/entidades/pedido.entidade';
import { StatusPedido } from '../../../dominio/enums/status-pedido.enum';
import { FiltroListarPedidos, IPedidoRepositorio, ResultadoPaginado } from '../../../dominio/repositorios/pedido.repositorio.interface';
import { PedidoSchema } from '../entidades/pedido.schema';
export declare class PedidoRepositorio implements IPedidoRepositorio {
    private readonly repositorioTypeOrm;
    constructor(repositorioTypeOrm: Repository<PedidoSchema>);
    salvar(pedido: PedidoEntidade): Promise<PedidoEntidade>;
    buscarPorId(id: string): Promise<PedidoEntidade | null>;
    listar(filtro: FiltroListarPedidos): Promise<ResultadoPaginado<PedidoEntidade>>;
    contarPorStatus(): Promise<{
        status: StatusPedido;
        quantidade: number;
    }[]>;
    somarFaturamentoPorDia(dias: number): Promise<{
        data: string;
        valor: number;
    }[]>;
    private paraSchema;
    private paraEntidade;
}
