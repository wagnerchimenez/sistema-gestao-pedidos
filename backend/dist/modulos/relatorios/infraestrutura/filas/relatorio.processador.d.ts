import { Job } from 'bull';
import { IPedidoRepositorio } from '../../../pedidos/dominio/repositorios/pedido.repositorio.interface';
import { StatusPedido } from '../../../pedidos/dominio/enums/status-pedido.enum';
import { ExcelServico } from '../excel/excel.servico';
export interface DadosJobRelatorio {
    nomeArquivo: string;
    status?: StatusPedido;
    dataInicio?: string;
    dataFim?: string;
}
export declare class RelatorioProcessador {
    private readonly pedidoRepositorio;
    private readonly excelServico;
    private readonly logger;
    constructor(pedidoRepositorio: IPedidoRepositorio, excelServico: ExcelServico);
    gerarRelatorio(job: Job<DadosJobRelatorio>): Promise<{
        caminhoArquivo: string;
    }>;
    aoCompletarJob(job: Job<DadosJobRelatorio>): void;
    aoFalharJob(job: Job<DadosJobRelatorio>, erro: Error): void;
}
