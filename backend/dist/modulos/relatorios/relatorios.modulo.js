"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatoriosModulo = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const relatorio_controlador_1 = require("./apresentacao/relatorio.controlador");
const relatorio_processador_1 = require("./infraestrutura/filas/relatorio.processador");
const excel_servico_1 = require("./infraestrutura/excel/excel.servico");
const pedidos_modulo_1 = require("../pedidos/pedidos.modulo");
let RelatoriosModulo = class RelatoriosModulo {
};
exports.RelatoriosModulo = RelatoriosModulo;
exports.RelatoriosModulo = RelatoriosModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: 'fila-relatorios' }),
            pedidos_modulo_1.PedidosModulo,
        ],
        controllers: [relatorio_controlador_1.RelatorioControlador],
        providers: [relatorio_processador_1.RelatorioProcessador, excel_servico_1.ExcelServico],
    })
], RelatoriosModulo);
//# sourceMappingURL=relatorios.modulo.js.map