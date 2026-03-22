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
var PedidoProcessador_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoProcessador = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const status_pedido_enum_1 = require("../../dominio/enums/status-pedido.enum");
const pedido_repositorio_token_1 = require("../../dominio/repositorios/pedido.repositorio.token");
let PedidoProcessador = PedidoProcessador_1 = class PedidoProcessador {
    constructor(pedidoRepositorio, emissorEventos) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.emissorEventos = emissorEventos;
        this.logger = new common_1.Logger(PedidoProcessador_1.name);
    }
    async processarPedido(job) {
        const { pedidoId } = job.data;
        this.logger.log(`Processando pedido ${pedidoId}...`);
        const pedido = await this.pedidoRepositorio.buscarPorId(pedidoId);
        if (!pedido) {
            throw new Error(`Pedido ${pedidoId} não encontrado para processamento.`);
        }
        await job.progress(30);
        await new Promise((resolve) => setTimeout(resolve, 500));
        pedido.atualizarStatus(status_pedido_enum_1.StatusPedido.PROCESSANDO);
        await this.pedidoRepositorio.salvar(pedido);
        await job.progress(60);
        await new Promise((resolve) => setTimeout(resolve, 500));
        pedido.atualizarStatus(status_pedido_enum_1.StatusPedido.CONCLUIDO);
        await this.pedidoRepositorio.salvar(pedido);
        for (const evento of pedido.eventos) {
            await this.emissorEventos.emitAsync(evento.constructor.name, evento);
        }
        pedido.limparEventos();
        await job.progress(100);
        return { sucesso: true };
    }
    aoCompletarJob(job) {
        this.logger.log(`Job ${job.id} concluído para pedido ${job.data.pedidoId}.`);
    }
    aoFalharJob(job, erro) {
        this.logger.error(`Job ${job.id} falhou (tentativa ${job.attemptsMade}): ${erro.message}`);
    }
};
exports.PedidoProcessador = PedidoProcessador;
__decorate([
    (0, bull_1.Process)('processar-pedido'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PedidoProcessador.prototype, "processarPedido", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PedidoProcessador.prototype, "aoCompletarJob", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], PedidoProcessador.prototype, "aoFalharJob", null);
exports.PedidoProcessador = PedidoProcessador = PedidoProcessador_1 = __decorate([
    (0, bull_1.Processor)('fila-pedidos'),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2])
], PedidoProcessador);
//# sourceMappingURL=pedido.processador.js.map