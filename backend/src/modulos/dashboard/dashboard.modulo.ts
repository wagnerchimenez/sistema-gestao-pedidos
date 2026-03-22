import { Module } from '@nestjs/common';
import { DashboardControlador } from './apresentacao/dashboard.controlador';
import { BuscarEstatisticasCasoDeUso } from './aplicacao/casos-de-uso/buscar-estatisticas.caso-de-uso';
import { PedidosModulo } from '../pedidos/pedidos.modulo';

@Module({
  imports: [PedidosModulo],
  controllers: [DashboardControlador],
  providers: [BuscarEstatisticasCasoDeUso],
})
export class DashboardModulo {}
