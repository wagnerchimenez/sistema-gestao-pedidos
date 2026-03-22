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
exports.ListaPedidosRespostaDto = exports.PedidoRespostaDto = exports.ItemPedidoRespostaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_pedido_enum_1 = require("../../dominio/enums/status-pedido.enum");
class ItemPedidoRespostaDto {
}
exports.ItemPedidoRespostaDto = ItemPedidoRespostaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemPedidoRespostaDto.prototype, "nomeProduto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ItemPedidoRespostaDto.prototype, "quantidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ItemPedidoRespostaDto.prototype, "precoUnitario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ItemPedidoRespostaDto.prototype, "total", void 0);
class PedidoRespostaDto {
    static deEntidade(pedido) {
        const dto = new PedidoRespostaDto();
        dto.id = pedido.id;
        dto.nomeCliente = pedido.nomeCliente;
        dto.emailCliente = pedido.emailCliente;
        dto.status = pedido.status;
        dto.itens = pedido.itens.map((item) => ({
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            total: item.total,
        }));
        dto.valorTotal = pedido.valorTotal;
        dto.criadoEm = pedido.criadoEm;
        dto.atualizadoEm = pedido.atualizadoEm;
        return dto;
    }
}
exports.PedidoRespostaDto = PedidoRespostaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PedidoRespostaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PedidoRespostaDto.prototype, "nomeCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PedidoRespostaDto.prototype, "emailCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_pedido_enum_1.StatusPedido }),
    __metadata("design:type", String)
], PedidoRespostaDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ItemPedidoRespostaDto] }),
    __metadata("design:type", Array)
], PedidoRespostaDto.prototype, "itens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PedidoRespostaDto.prototype, "valorTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PedidoRespostaDto.prototype, "criadoEm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PedidoRespostaDto.prototype, "atualizadoEm", void 0);
class ListaPedidosRespostaDto {
}
exports.ListaPedidosRespostaDto = ListaPedidosRespostaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PedidoRespostaDto] }),
    __metadata("design:type", Array)
], ListaPedidosRespostaDto.prototype, "dados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ListaPedidosRespostaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ListaPedidosRespostaDto.prototype, "pagina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ListaPedidosRespostaDto.prototype, "itensPorPagina", void 0);
//# sourceMappingURL=pedido-resposta.dto.js.map