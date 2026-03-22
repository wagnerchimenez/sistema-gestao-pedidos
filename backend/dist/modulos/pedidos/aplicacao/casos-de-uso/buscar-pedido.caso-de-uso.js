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
exports.BuscarPedidoCasoDeUso = void 0;
const common_1 = require("@nestjs/common");
const entidade_nao_encontrada_erro_1 = require("../../../../nucleo/erros/entidade-nao-encontrada.erro");
const pedido_repositorio_token_1 = require("../../dominio/repositorios/pedido.repositorio.token");
const pedido_resposta_dto_1 = require("../dtos/pedido-resposta.dto");
let BuscarPedidoCasoDeUso = class BuscarPedidoCasoDeUso {
    constructor(pedidoRepositorio) {
        this.pedidoRepositorio = pedidoRepositorio;
    }
    async executar(id) {
        const pedido = await this.pedidoRepositorio.buscarPorId(id);
        if (!pedido) {
            throw new entidade_nao_encontrada_erro_1.EntidadeNaoEncontradaErro('Pedido', id);
        }
        return pedido_resposta_dto_1.PedidoRespostaDto.deEntidade(pedido);
    }
};
exports.BuscarPedidoCasoDeUso = BuscarPedidoCasoDeUso;
exports.BuscarPedidoCasoDeUso = BuscarPedidoCasoDeUso = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __metadata("design:paramtypes", [Object])
], BuscarPedidoCasoDeUso);
//# sourceMappingURL=buscar-pedido.caso-de-uso.js.map