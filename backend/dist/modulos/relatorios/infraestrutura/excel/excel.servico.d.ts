import { ConfigService } from '@nestjs/config';
import { PedidoEntidade } from '../../../pedidos/dominio/entidades/pedido.entidade';
export declare class ExcelServico {
    private readonly configServico;
    private readonly logger;
    private readonly diretorioRelatorios;
    constructor(configServico: ConfigService);
    gerarRelatorioExcel(pedidos: PedidoEntidade[], nomeArquivo: string): Promise<string>;
    obterCaminhoArquivo(nomeArquivo: string): string;
}
