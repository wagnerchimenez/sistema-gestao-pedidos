import { CriarPedidoCasoDeUso } from '../aplicacao/casos-de-uso/criar-pedido.caso-de-uso';
import { ListarPedidosCasoDeUso } from '../aplicacao/casos-de-uso/listar-pedidos.caso-de-uso';
import { BuscarPedidoCasoDeUso } from '../aplicacao/casos-de-uso/buscar-pedido.caso-de-uso';
import { AtualizarStatusCasoDeUso } from '../aplicacao/casos-de-uso/atualizar-status.caso-de-uso';
import { CriarPedidoDto } from '../aplicacao/dtos/criar-pedido.dto';
import { AtualizarStatusDto } from '../aplicacao/dtos/atualizar-status.dto';
import { ListaPedidosRespostaDto, PedidoRespostaDto } from '../aplicacao/dtos/pedido-resposta.dto';
import { StatusPedido } from '../dominio/enums/status-pedido.enum';
export declare class PedidoControlador {
    private readonly criarPedido;
    private readonly listarPedidos;
    private readonly buscarPedido;
    private readonly atualizarStatus;
    constructor(criarPedido: CriarPedidoCasoDeUso, listarPedidos: ListarPedidosCasoDeUso, buscarPedido: BuscarPedidoCasoDeUso, atualizarStatus: AtualizarStatusCasoDeUso);
    criar(dto: CriarPedidoDto): Promise<PedidoRespostaDto>;
    listar(status?: StatusPedido, nomeCliente?: string, pagina?: number, itensPorPagina?: number): Promise<ListaPedidosRespostaDto>;
    buscar(id: string): Promise<PedidoRespostaDto>;
    atualizar(id: string, dto: AtualizarStatusDto): Promise<PedidoRespostaDto>;
}
