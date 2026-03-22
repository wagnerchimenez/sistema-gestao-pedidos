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
exports.EstatisticasDashboardDto = exports.FaturamentoPorDiaDto = exports.EstatisticasPorStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_pedido_enum_1 = require("../../../pedidos/dominio/enums/status-pedido.enum");
class EstatisticasPorStatusDto {
}
exports.EstatisticasPorStatusDto = EstatisticasPorStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_pedido_enum_1.StatusPedido }),
    __metadata("design:type", String)
], EstatisticasPorStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EstatisticasPorStatusDto.prototype, "quantidade", void 0);
class FaturamentoPorDiaDto {
}
exports.FaturamentoPorDiaDto = FaturamentoPorDiaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FaturamentoPorDiaDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FaturamentoPorDiaDto.prototype, "valor", void 0);
class EstatisticasDashboardDto {
}
exports.EstatisticasDashboardDto = EstatisticasDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EstatisticasDashboardDto.prototype, "totalPedidos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EstatisticasPorStatusDto] }),
    __metadata("design:type", Array)
], EstatisticasDashboardDto.prototype, "pedidosPorStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EstatisticasDashboardDto.prototype, "faturamentoTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EstatisticasDashboardDto.prototype, "ticketMedio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FaturamentoPorDiaDto] }),
    __metadata("design:type", Array)
], EstatisticasDashboardDto.prototype, "faturamentoPorDia", void 0);
//# sourceMappingURL=estatisticas.dto.js.map