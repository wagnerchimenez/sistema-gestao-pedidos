import { Response } from 'express';
import { Queue } from 'bull';
import { FiltroRelatorioDto, RelatorioSolicitadoDto } from '../aplicacao/dtos/filtro-relatorio.dto';
import { ExcelServico } from '../infraestrutura/excel/excel.servico';
export declare class RelatorioControlador {
    private readonly filaRelatorios;
    private readonly excelServico;
    constructor(filaRelatorios: Queue, excelServico: ExcelServico);
    solicitarRelatorio(filtro: FiltroRelatorioDto): Promise<RelatorioSolicitadoDto>;
    verificarStatus(jobId: string): Promise<{
        jobId: string;
        estado: import("bull").JobStatus | "stuck";
        progresso: any;
        concluidoEm: Date | null;
        erro: string | null;
    }>;
    baixarRelatorio(jobId: string, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
