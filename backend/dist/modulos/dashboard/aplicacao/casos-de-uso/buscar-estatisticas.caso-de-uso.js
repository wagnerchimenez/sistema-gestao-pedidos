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
exports.BuscarEstatisticasCasoDeUso = void 0;
const common_1 = require("@nestjs/common");
const pedido_repositorio_token_1 = require("../../../pedidos/dominio/repositorios/pedido.repositorio.token");
let BuscarEstatisticasCasoDeUso = class BuscarEstatisticasCasoDeUso {
    constructor(pedidoRepositorio) {
        this.pedidoRepositorio = pedidoRepositorio;
    }
    async executar() {
        const [pedidosPorStatus, faturamentoPorDia, resultadoTotal] = await Promise.all([
            this.pedidoRepositorio.contarPorStatus(),
            this.pedidoRepositorio.somarFaturamentoPorDia(30),
            this.pedidoRepositorio.listar({ pagina: 1, itensPorPagina: 1 }),
        ]);
        const totalPedidos = pedidosPorStatus.reduce((soma, r) => soma + r.quantidade, 0);
        const faturamentoTotal = faturamentoPorDia.reduce((soma, r) => soma + r.valor, 0);
        const ticketMedio = totalPedidos > 0 ? parseFloat((faturamentoTotal / totalPedidos).toFixed(2)) : 0;
        return {
            totalPedidos: resultadoTotal.total,
            pedidosPorStatus,
            faturamentoTotal: parseFloat(faturamentoTotal.toFixed(2)),
            ticketMedio,
            faturamentoPorDia,
        };
    }
};
exports.BuscarEstatisticasCasoDeUso = BuscarEstatisticasCasoDeUso;
exports.BuscarEstatisticasCasoDeUso = BuscarEstatisticasCasoDeUso = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __metadata("design:paramtypes", [Object])
], BuscarEstatisticasCasoDeUso);
//# sourceMappingURL=buscar-estatisticas.caso-de-uso.js.map