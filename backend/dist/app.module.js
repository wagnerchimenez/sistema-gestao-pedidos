"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const event_emitter_1 = require("@nestjs/event-emitter");
const pedidos_modulo_1 = require("./modulos/pedidos/pedidos.modulo");
const relatorios_modulo_1 = require("./modulos/relatorios/relatorios.modulo");
const dashboard_modulo_1 = require("./modulos/dashboard/dashboard.modulo");
const auditoria_modulo_1 = require("./modulos/auditoria/auditoria.modulo");
const saude_modulo_1 = require("./modulos/saude/saude.modulo");
const pedido_schema_1 = require("./modulos/pedidos/infraestrutura/persistencia/entidades/pedido.schema");
const log_auditoria_schema_1 = require("./modulos/auditoria/infraestrutura/persistencia/entidades/log-auditoria.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configServico) => ({
                    type: 'postgres',
                    host: configServico.get('POSTGRES_HOST', 'localhost'),
                    port: configServico.get('POSTGRES_PORT', 5432),
                    username: configServico.get('POSTGRES_USER', 'postgres'),
                    password: configServico.get('POSTGRES_PASSWORD', 'postgres123'),
                    database: configServico.get('POSTGRES_DB', 'sistema_gestao'),
                    entities: [pedido_schema_1.PedidoSchema],
                    synchronize: true,
                    retryAttempts: 5,
                    retryDelay: 3000,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'auditoria',
                imports: [config_1.ConfigModule],
                useFactory: (configServico) => ({
                    name: 'auditoria',
                    type: 'better-sqlite3',
                    database: configServico.get('SQLITE_PATH', './data/auditoria.sqlite'),
                    entities: [log_auditoria_schema_1.LogAuditoriaSchema],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configServico) => ({
                    redis: {
                        host: configServico.get('REDIS_HOST', 'localhost'),
                        port: configServico.get('REDIS_PORT', 6379),
                    },
                    defaultJobOptions: {
                        attempts: 3,
                        backoff: { type: 'exponential', delay: 2000 },
                        removeOnComplete: true,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot({ wildcard: true }),
            pedidos_modulo_1.PedidosModulo,
            relatorios_modulo_1.RelatoriosModulo,
            dashboard_modulo_1.DashboardModulo,
            auditoria_modulo_1.AuditoriaModulo,
            saude_modulo_1.SaudeModulo,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map