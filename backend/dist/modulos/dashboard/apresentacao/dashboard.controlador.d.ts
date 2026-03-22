import { BuscarEstatisticasCasoDeUso } from '../aplicacao/casos-de-uso/buscar-estatisticas.caso-de-uso';
import { EstatisticasDashboardDto } from '../aplicacao/dtos/estatisticas.dto';
export declare class DashboardControlador {
    private readonly buscarEstatisticas;
    constructor(buscarEstatisticas: BuscarEstatisticasCasoDeUso);
    obterEstatisticas(): Promise<EstatisticasDashboardDto>;
}
