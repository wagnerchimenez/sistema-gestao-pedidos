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
exports.CriarPedidoDto = exports.CriarItemPedidoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CriarItemPedidoDto {
}
exports.CriarItemPedidoDto = CriarItemPedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Notebook Dell XPS' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome do produto é obrigatório.' }),
    __metadata("design:type", String)
], CriarItemPedidoDto.prototype, "nomeProduto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({ message: 'Quantidade deve ser maior que zero.' }),
    __metadata("design:type", Number)
], CriarItemPedidoDto.prototype, "quantidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4500.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({ message: 'Preço unitário deve ser maior que zero.' }),
    __metadata("design:type", Number)
], CriarItemPedidoDto.prototype, "precoUnitario", void 0);
class CriarPedidoDto {
}
exports.CriarPedidoDto = CriarPedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Maria Silva' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome do cliente é obrigatório.' }),
    __metadata("design:type", String)
], CriarPedidoDto.prototype, "nomeCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria.silva@email.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'E-mail inválido.' }),
    __metadata("design:type", String)
], CriarPedidoDto.prototype, "emailCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CriarItemPedidoDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'O pedido deve ter pelo menos um item.' }),
    (0, class_transformer_1.Type)(() => CriarItemPedidoDto),
    __metadata("design:type", Array)
], CriarPedidoDto.prototype, "itens", void 0);
//# sourceMappingURL=criar-pedido.dto.js.map