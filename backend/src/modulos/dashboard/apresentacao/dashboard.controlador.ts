import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuscarEstatisticasCasoDeUso } from '../aplicacao/casos-de-uso/buscar-estatisticas.caso-de-uso';
import { EstatisticasDashboardDto } from '../aplicacao/dtos/estatisticas.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardControlador {
  constructor(private readonly buscarEstatisticas: BuscarEstatisticasCasoDeUso) {}

  @Get('estatisticas')
  @ApiOperation({ summary: 'Obter estatísticas gerais para o dashboard' })
  @ApiResponse({ status: 200, type: EstatisticasDashboardDto })
  async obterEstatisticas(): Promise<EstatisticasDashboardDto> {
    return this.buscarEstatisticas.executar();
  }
}
