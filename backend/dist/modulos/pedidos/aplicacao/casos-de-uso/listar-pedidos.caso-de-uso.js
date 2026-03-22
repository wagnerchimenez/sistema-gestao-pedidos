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
exports.ListarPedidosCasoDeUso = void 0;
const common_1 = require("@nestjs/common");
const pedido_repositorio_token_1 = require("../../dominio/repositorios/pedido.repositorio.token");
const pedido_resposta_dto_1 = require("../dtos/pedido-resposta.dto");
let ListarPedidosCasoDeUso = class ListarPedidosCasoDeUso {
    constructor(pedidoRepositorio) {
        this.pedidoRepositorio = pedidoRepositorio;
    }
    async executar(filtro) {
        const resultado = await this.pedidoRepositorio.listar({
            status: filtro.status,
            nomeCliente: filtro.nomeCliente,
            pagina: filtro.pagina ?? 1,
            itensPorPagina: filtro.itensPorPagina ?? 10,
        });
        return {
            dados: resultado.dados.map(pedido_resposta_dto_1.PedidoRespostaDto.deEntidade),
            total: resultado.total,
            pagina: resultado.pagina,
            itensPorPagina: resultado.itensPorPagina,
        };
    }
};
exports.ListarPedidosCasoDeUso = ListarPedidosCasoDeUso;
exports.ListarPedidosCasoDeUso = ListarPedidosCasoDeUso = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __metadata("design:paramtypes", [Object])
], ListarPedidosCasoDeUso);
//# sourceMappingURL=listar-pedidos.caso-de-uso.js.map