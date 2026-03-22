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
var AuditoriaOuvinte_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaOuvinte = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_criado_evento_1 = require("../../pedidos/dominio/eventos/pedido-criado.evento");
const status_pedido_alterado_evento_1 = require("../../pedidos/dominio/eventos/status-pedido-alterado.evento");
const log_auditoria_schema_1 = require("../infraestrutura/persistencia/entidades/log-auditoria.schema");
let AuditoriaOuvinte = AuditoriaOuvinte_1 = class AuditoriaOuvinte {
    constructor(logRepositorio) {
        this.logRepositorio = logRepositorio;
        this.logger = new common_1.Logger(AuditoriaOuvinte_1.name);
    }
    async aocriarPedido(evento) {
        await this.registrar({
            entidade: 'Pedido',
            entidadeId: evento.pedidoId,
            operacao: 'CRIACAO',
            dadosNovos: JSON.stringify({
                nomeCliente: evento.nomeCliente,
                valorTotal: evento.valorTotal,
            }),
        });
        this.logger.log(`Auditoria: pedido ${evento.pedidoId} criado.`);
    }
    async aoAlterarStatus(evento) {
        await this.registrar({
            entidade: 'Pedido',
            entidadeId: evento.pedidoId,
            operacao: 'ATUALIZACAO_STATUS',
            dadosAnteriores: JSON.stringify({ status: evento.statusAnterior }),
            dadosNovos: JSON.stringify({ status: evento.novoStatus }),
        });
        this.logger.log(`Auditoria: pedido ${evento.pedidoId} → ${evento.statusAnterior} → ${evento.novoStatus}.`);
    }
    async registrar(dados) {
        const log = this.logRepositorio.create({
            entidade: dados.entidade,
            entidadeId: dados.entidadeId,
            operacao: dados.operacao,
            dadosAnteriores: dados.dadosAnteriores ?? null,
            dadosNovos: dados.dadosNovos ?? null,
        });
        await this.logRepositorio.save(log);
    }
};
exports.AuditoriaOuvinte = AuditoriaOuvinte;
__decorate([
    (0, event_emitter_1.OnEvent)('PedidoCriadoEvento'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pedido_criado_evento_1.PedidoCriadoEvento]),
    __metadata("design:returntype", Promise)
], AuditoriaOuvinte.prototype, "aocriarPedido", null);
__decorate([
    (0, event_emitter_1.OnEvent)('StatusPedidoAlteradoEvento'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_pedido_alterado_evento_1.StatusPedidoAlteradoEvento]),
    __metadata("design:returntype", Promise)
], AuditoriaOuvinte.prototype, "aoAlterarStatus", null);
exports.AuditoriaOuvinte = AuditoriaOuvinte = AuditoriaOuvinte_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_auditoria_schema_1.LogAuditoriaSchema, 'auditoria')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditoriaOuvinte);
//# sourceMappingURL=auditoria.ouvinte.js.map