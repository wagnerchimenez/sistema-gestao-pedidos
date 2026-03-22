"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosModulo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const pedido_controlador_1 = require("./apresentacao/pedido.controlador");
const criar_pedido_caso_de_uso_1 = require("./aplicacao/casos-de-uso/criar-pedido.caso-de-uso");
const listar_pedidos_caso_de_uso_1 = require("./aplicacao/casos-de-uso/listar-pedidos.caso-de-uso");
const buscar_pedido_caso_de_uso_1 = require("./aplicacao/casos-de-uso/buscar-pedido.caso-de-uso");
const atualizar_status_caso_de_uso_1 = require("./aplicacao/casos-de-uso/atualizar-status.caso-de-uso");
const pedido_repositorio_1 = require("./infraestrutura/persistencia/repositorios/pedido.repositorio");
const pedido_schema_1 = require("./infraestrutura/persistencia/entidades/pedido.schema");
const pedido_processador_1 = require("./infraestrutura/filas/pedido.processador");
const pedido_repositorio_token_1 = require("./dominio/repositorios/pedido.repositorio.token");
let PedidosModulo = class PedidosModulo {
};
exports.PedidosModulo = PedidosModulo;
exports.PedidosModulo = PedidosModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pedido_schema_1.PedidoSchema]),
            bull_1.BullModule.registerQueue({ name: 'fila-pedidos' }),
        ],
        controllers: [pedido_controlador_1.PedidoControlador],
        providers: [
            {
                provide: pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN,
                useClass: pedido_repositorio_1.PedidoRepositorio,
            },
            criar_pedido_caso_de_uso_1.CriarPedidoCasoDeUso,
            listar_pedidos_caso_de_uso_1.ListarPedidosCasoDeUso,
            buscar_pedido_caso_de_uso_1.BuscarPedidoCasoDeUso,
            atualizar_status_caso_de_uso_1.AtualizarStatusCasoDeUso,
            pedido_processador_1.PedidoProcessador,
        ],
        exports: [pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN],
    })
], PedidosModulo);
//# sourceMappingURL=pedidos.modulo.js.map