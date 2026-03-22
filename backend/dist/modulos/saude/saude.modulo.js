"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaudeModulo = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const bull_1 = require("@nestjs/bull");
const saude_controlador_1 = require("./saude.controlador");
const redis_indicador_1 = require("./indicadores/redis.indicador");
const fila_indicador_1 = require("./indicadores/fila.indicador");
let SaudeModulo = class SaudeModulo {
};
exports.SaudeModulo = SaudeModulo;
exports.SaudeModulo = SaudeModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            terminus_1.TerminusModule,
            bull_1.BullModule.registerQueue({ name: 'fila-pedidos' }),
            bull_1.BullModule.registerQueue({ name: 'fila-relatorios' }),
        ],
        controllers: [saude_controlador_1.SaudeControlador],
        providers: [redis_indicador_1.RedisIndicador, fila_indicador_1.FilaIndicador],
    })
], SaudeModulo);
//# sourceMappingURL=saude.modulo.js.map