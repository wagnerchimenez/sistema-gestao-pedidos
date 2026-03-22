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
exports.PedidoControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const criar_pedido_caso_de_uso_1 = require("../aplicacao/casos-de-uso/criar-pedido.caso-de-uso");
const listar_pedidos_caso_de_uso_1 = require("../aplicacao/casos-de-uso/listar-pedidos.caso-de-uso");
const buscar_pedido_caso_de_uso_1 = require("../aplicacao/casos-de-uso/buscar-pedido.caso-de-uso");
const atualizar_status_caso_de_uso_1 = require("../aplicacao/casos-de-uso/atualizar-status.caso-de-uso");
const criar_pedido_dto_1 = require("../aplicacao/dtos/criar-pedido.dto");
const atualizar_status_dto_1 = require("../aplicacao/dtos/atualizar-status.dto");
const pedido_resposta_dto_1 = require("../aplicacao/dtos/pedido-resposta.dto");
const status_pedido_enum_1 = require("../dominio/enums/status-pedido.enum");
let PedidoControlador = class PedidoControlador {
    constructor(criarPedido, listarPedidos, buscarPedido, atualizarStatus) {
        this.criarPedido = criarPedido;
        this.listarPedidos = listarPedidos;
        this.buscarPedido = buscarPedido;
        this.atualizarStatus = atualizarStatus;
    }
    async criar(dto) {
        return this.criarPedido.executar(dto);
    }
    async listar(status, nomeCliente, pagina, itensPorPagina) {
        return this.listarPedidos.executar({ status, nomeCliente, pagina, itensPorPagina });
    }
    async buscar(id) {
        return this.buscarPedido.executar(id);
    }
    async atualizar(id, dto) {
        return this.atualizarStatus.executar(id, dto);
    }
};
exports.PedidoControlador = PedidoControlador;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo pedido (enfileira processamento automático)' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: pedido_resposta_dto_1.PedidoRespostaDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_pedido_dto_1.CriarPedidoDto]),
    __metadata("design:returntype", Promise)
], PedidoControlador.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar pedidos com filtros e paginação' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: pedido_resposta_dto_1.ListaPedidosRespostaDto }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: status_pedido_enum_1.StatusPedido, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'nomeCliente', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'pagina', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'itensPorPagina', required: false, type: Number }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('nomeCliente')),
    __param(2, (0, common_1.Query)('pagina')),
    __param(3, (0, common_1.Query)('itensPorPagina')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PedidoControlador.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pedido por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: pedido_resposta_dto_1.PedidoRespostaDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PedidoControlador.prototype, "buscar", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar status do pedido (com validação de transição)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: pedido_resposta_dto_1.PedidoRespostaDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, atualizar_status_dto_1.AtualizarStatusDto]),
    __metadata("design:returntype", Promise)
], PedidoControlador.prototype, "atualizar", null);
exports.PedidoControlador = PedidoControlador = __decorate([
    (0, swagger_1.ApiTags)('pedidos'),
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [criar_pedido_caso_de_uso_1.CriarPedidoCasoDeUso,
        listar_pedidos_caso_de_uso_1.ListarPedidosCasoDeUso,
        buscar_pedido_caso_de_uso_1.BuscarPedidoCasoDeUso,
        atualizar_status_caso_de_uso_1.AtualizarStatusCasoDeUso])
], PedidoControlador);
//# sourceMappingURL=pedido.controlador.js.map