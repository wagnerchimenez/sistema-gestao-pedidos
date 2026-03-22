import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PedidosModulo } from './modulos/pedidos/pedidos.modulo';
import { RelatoriosModulo } from './modulos/relatorios/relatorios.modulo';
import { DashboardModulo } from './modulos/dashboard/dashboard.modulo';
import { AuditoriaModulo } from './modulos/auditoria/auditoria.modulo';
import { PedidoSchema } from './modulos/pedidos/infraestrutura/persistencia/entidades/pedido.schema';
import { LogAuditoriaSchema } from './modulos/auditoria/infraestrutura/persistencia/entidades/log-auditoria.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Banco principal: PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServico: ConfigService) => ({
        type: 'postgres',
        host: configServico.get('POSTGRES_HOST', 'localhost'),
        port: configServico.get<number>('POSTGRES_PORT', 5432),
        username: configServico.get('POSTGRES_USER', 'postgres'),
        password: configServico.get('POSTGRES_PASSWORD', 'postgres123'),
        database: configServico.get('POSTGRES_DB', 'sistema_gestao'),
        entities: [PedidoSchema],
        synchronize: true,
        retryAttempts: 5,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),

    // Banco de auditoria: SQLite
    TypeOrmModule.forRootAsync({
      name: 'auditoria',
      imports: [ConfigModule],
      useFactory: (configServico: ConfigService) => ({
        name: 'auditoria',
        type: 'better-sqlite3',
        database: configServico.get('SQLITE_PATH', './data/auditoria.sqlite'),
        entities: [LogAuditoriaSchema],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // Filas assíncronas: Redis + BullMQ
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServico: ConfigService) => ({
        redis: {
          host: configServico.get('REDIS_HOST', 'localhost'),
          port: configServico.get<number>('REDIS_PORT', 6379),
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: true,
        },
      }),
      inject: [ConfigService],
    }),

    // Eventos de domínio internos
    EventEmitterModule.forRoot({ wildcard: true }),

    PedidosModulo,
    RelatoriosModulo,
    DashboardModulo,
    AuditoriaModulo,
  ],
})
export class AppModule {}
