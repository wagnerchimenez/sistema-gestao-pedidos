import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { PedidoControlador } from './apresentacao/pedido.controlador';
import { CriarPedidoCasoDeUso } from './aplicacao/casos-de-uso/criar-pedido.caso-de-uso';
import { ListarPedidosCasoDeUso } from './aplicacao/casos-de-uso/listar-pedidos.caso-de-uso';
import { BuscarPedidoCasoDeUso } from './aplicacao/casos-de-uso/buscar-pedido.caso-de-uso';
import { AtualizarStatusCasoDeUso } from './aplicacao/casos-de-uso/atualizar-status.caso-de-uso';
import { PedidoRepositorio } from './infraestrutura/persistencia/repositorios/pedido.repositorio';
import { PedidoSchema } from './infraestrutura/persistencia/entidades/pedido.schema';
import { PedidoProcessador } from './infraestrutura/filas/pedido.processador';
import { PEDIDO_REPOSITORIO_TOKEN } from './dominio/repositorios/pedido.repositorio.token';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoSchema]),
    BullModule.registerQueue({ name: 'fila-pedidos' }),
  ],
  controllers: [PedidoControlador],
  providers: [
    // Binding Port → Adapter (Arquitetura Hexagonal)
    {
      provide: PEDIDO_REPOSITORIO_TOKEN,
      useClass: PedidoRepositorio,
    },
    CriarPedidoCasoDeUso,
    ListarPedidosCasoDeUso,
    BuscarPedidoCasoDeUso,
    AtualizarStatusCasoDeUso,
    PedidoProcessador,
  ],
  exports: [PEDIDO_REPOSITORIO_TOKEN],
})
export class PedidosModulo {}
