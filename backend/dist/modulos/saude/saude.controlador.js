"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaudeControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const redis_indicador_1 = require("./indicadores/redis.indicador");
const fila_indicador_1 = require("./indicadores/fila.indicador");
let SaudeControlador = class SaudeControlador {
    constructor(healthCheck, typeOrmIndicator, memoryIndicator, pgDataSource, sqliteDataSource, redisIndicador, filaIndicador) {
        this.healthCheck = healthCheck;
        this.typeOrmIndicator = typeOrmIndicator;
        this.memoryIndicator = memoryIndicator;
        this.pgDataSource = pgDataSource;
        this.sqliteDataSource = sqliteDataSource;
        this.redisIndicador = redisIndicador;
        this.filaIndicador = filaIndicador;
    }
    verificar() {
        return this.healthCheck.check([
            () => this.typeOrmIndicator.pingCheck('postgres', {
                connection: this.pgDataSource,
            }),
            () => this.typeOrmIndicator.pingCheck('sqlite-auditoria', {
                connection: this.sqliteDataSource,
            }),
            () => this.redisIndicador.verificar('redis'),
            () => this.filaIndicador.verificar('fila-pedidos'),
            () => this.filaIndicador.verificar('fila-relatorios'),
            () => this.memoryIndicator.checkHeap('memoria-heap', 500 * 1024 * 1024),
        ]);
    }
};
exports.SaudeControlador = SaudeControlador;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica saúde de todos os serviços',
        description: 'Retorna o status de PostgreSQL, SQLite (auditoria), Redis, filas assíncronas e uso de memória.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SaudeControlador.prototype, "verificar", null);
exports.SaudeControlador = SaudeControlador = __decorate([
    (0, swagger_1.ApiTags)('saude'),
    (0, common_1.Controller)('saude'),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __param(4, (0, typeorm_1.InjectDataSource)('auditoria')),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        typeorm_2.DataSource,
        typeorm_2.DataSource,
        redis_indicador_1.RedisIndicador,
        fila_indicador_1.FilaIndicador])
], SaudeControlador);
//# sourceMappingURL=saude.controlador.js.map