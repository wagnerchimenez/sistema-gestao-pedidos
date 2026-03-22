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
exports.CriarPedidoCasoDeUso = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const event_emitter_1 = require("@nestjs/event-emitter");
const pedido_entidade_1 = require("../../dominio/entidades/pedido.entidade");
const pedido_repositorio_token_1 = require("../../dominio/repositorios/pedido.repositorio.token");
const item_pedido_vo_1 = require("../../dominio/valor-objetos/item-pedido.vo");
const pedido_resposta_dto_1 = require("../dtos/pedido-resposta.dto");
let CriarPedidoCasoDeUso = class CriarPedidoCasoDeUso {
    constructor(pedidoRepositorio, emissordEventos, filaPedidos) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.emissordEventos = emissordEventos;
        this.filaPedidos = filaPedidos;
    }
    async executar(dto) {
        const itens = dto.itens.map((item) => item_pedido_vo_1.ItemPedidoVO.criar({
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
        }));
        const pedido = pedido_entidade_1.PedidoEntidade.criar({
            nomeCliente: dto.nomeCliente,
            emailCliente: dto.emailCliente,
            itens,
        });
        await this.pedidoRepositorio.salvar(pedido);
        for (const evento of pedido.eventos) {
            await this.emissordEventos.emitAsync(evento.constructor.name, evento);
        }
        pedido.limparEventos();
        await this.filaPedidos.add('processar-pedido', { pedidoId: pedido.id }, { delay: 0, attempts: 3 });
        return pedido_resposta_dto_1.PedidoRespostaDto.deEntidade(pedido);
    }
};
exports.CriarPedidoCasoDeUso = CriarPedidoCasoDeUso;
exports.CriarPedidoCasoDeUso = CriarPedidoCasoDeUso = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __param(2, (0, bull_1.InjectQueue)('fila-pedidos')),
    __metadata("design:paramtypes", [Object, event_emitter_1.EventEmitter2, Object])
], CriarPedidoCasoDeUso);
//# sourceMappingURL=criar-pedido.caso-de-uso.js.map