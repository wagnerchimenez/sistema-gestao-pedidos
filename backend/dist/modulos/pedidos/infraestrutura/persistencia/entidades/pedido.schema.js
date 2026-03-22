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
exports.PedidoSchema = void 0;
const typeorm_1 = require("typeorm");
const status_pedido_enum_1 = require("../../../dominio/enums/status-pedido.enum");
let PedidoSchema = class PedidoSchema {
};
exports.PedidoSchema = PedidoSchema;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], PedidoSchema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_cliente', length: 255 }),
    __metadata("design:type", String)
], PedidoSchema.prototype, "nomeCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_cliente', length: 255 }),
    __metadata("design:type", String)
], PedidoSchema.prototype, "emailCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: status_pedido_enum_1.StatusPedido, default: status_pedido_enum_1.StatusPedido.PENDENTE }),
    __metadata("design:type", String)
], PedidoSchema.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PedidoSchema.prototype, "valorTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], PedidoSchema.prototype, "itens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PedidoSchema.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PedidoSchema.prototype, "atualizadoEm", void 0);
exports.PedidoSchema = PedidoSchema = __decorate([
    (0, typeorm_1.Entity)({ name: 'pedidos' })
], PedidoSchema);
//# sourceMappingURL=pedido.schema.js.map