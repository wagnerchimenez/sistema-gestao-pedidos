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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIndicador = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const terminus_1 = require("@nestjs/terminus");
const ioredis_1 = require("ioredis");
let RedisIndicador = class RedisIndicador extends terminus_1.HealthIndicator {
    constructor(configServico) {
        super();
        this.configServico = configServico;
    }
    onModuleInit() {
        this.cliente = new ioredis_1.default({
            host: this.configServico.get('REDIS_HOST', 'localhost'),
            port: this.configServico.get('REDIS_PORT', 6379),
            lazyConnect: false,
            enableOfflineQueue: false,
        });
    }
    async onModuleDestroy() {
        await this.cliente.quit().catch(() => {
        });
    }
    async verificar(chave) {
        try {
            const resposta = await this.cliente.ping();
            const saudavel = resposta === 'PONG';
            const resultado = this.getStatus(chave, saudavel, {
                host: this.configServico.get('REDIS_HOST', 'localhost'),
                port: this.configServico.get('REDIS_PORT', 6379),
            });
            if (!saudavel) {
                throw new terminus_1.HealthCheckError(`Redis respondeu incorretamente: ${resposta}`, resultado);
            }
            return resultado;
        }
        catch (erro) {
            if (erro instanceof terminus_1.HealthCheckError)
                throw erro;
            const resultado = this.getStatus(chave, false, {
                mensagem: erro.message,
            });
            throw new terminus_1.HealthCheckError('Redis indisponível', resultado);
        }
    }
};
exports.RedisIndicador = RedisIndicador;
exports.RedisIndicador = RedisIndicador = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisIndicador);
//# sourceMappingURL=redis.indicador.js.map