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
exports.FilaIndicador = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const terminus_1 = require("@nestjs/terminus");
let FilaIndicador = class FilaIndicador extends terminus_1.HealthIndicator {
    constructor(filaPedidos, filaRelatorios) {
        super();
        this.filaPedidos = filaPedidos;
        this.filaRelatorios = filaRelatorios;
        this.filas = new Map([
            ['fila-pedidos', filaPedidos],
            ['fila-relatorios', filaRelatorios],
        ]);
    }
    async verificar(nomeFila) {
        const fila = this.filas.get(nomeFila);
        if (!fila) {
            const resultado = this.getStatus(nomeFila, false, {
                erro: `Fila "${nomeFila}" não registrada`,
            });
            throw new terminus_1.HealthCheckError(`Fila desconhecida: ${nomeFila}`, resultado);
        }
        try {
            const contagens = await fila.getJobCounts();
            return this.getStatus(nomeFila, true, {
                aguardando: contagens.waiting,
                ativo: contagens.active,
                concluido: contagens.completed,
                falhou: contagens.failed,
                atrasado: contagens.delayed,
            });
        }
        catch (erro) {
            const resultado = this.getStatus(nomeFila, false, {
                mensagem: erro.message,
            });
            throw new terminus_1.HealthCheckError(`Fila "${nomeFila}" indisponível`, resultado);
        }
    }
};
exports.FilaIndicador = FilaIndicador;
exports.FilaIndicador = FilaIndicador = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('fila-pedidos')),
    __param(1, (0, bull_1.InjectQueue)('fila-relatorios')),
    __metadata("design:paramtypes", [Object, Object])
], FilaIndicador);
//# sourceMappingURL=fila.indicador.js.map