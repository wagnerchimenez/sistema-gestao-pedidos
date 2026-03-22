import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RelatorioControlador } from './apresentacao/relatorio.controlador';
import { RelatorioProcessador } from './infraestrutura/filas/relatorio.processador';
import { ExcelServico } from './infraestrutura/excel/excel.servico';
import { PedidosModulo } from '../pedidos/pedidos.modulo';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'fila-relatorios' }),
    PedidosModulo, // Importa o token do repositório de pedidos
  ],
  controllers: [RelatorioControlador],
  providers: [RelatorioProcessador, ExcelServico],
})
export class RelatoriosModulo {}
