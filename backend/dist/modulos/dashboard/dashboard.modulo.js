"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModulo = void 0;
const common_1 = require("@nestjs/common");
const dashboard_controlador_1 = require("./apresentacao/dashboard.controlador");
const buscar_estatisticas_caso_de_uso_1 = require("./aplicacao/casos-de-uso/buscar-estatisticas.caso-de-uso");
const pedidos_modulo_1 = require("../pedidos/pedidos.modulo");
let DashboardModulo = class DashboardModulo {
};
exports.DashboardModulo = DashboardModulo;
exports.DashboardModulo = DashboardModulo = __decorate([
    (0, common_1.Module)({
        imports: [pedidos_modulo_1.PedidosModulo],
        controllers: [dashboard_controlador_1.DashboardControlador],
        providers: [buscar_estatisticas_caso_de_uso_1.BuscarEstatisticasCasoDeUso],
    })
], DashboardModulo);
//# sourceMappingURL=dashboard.modulo.js.map