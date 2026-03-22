"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPedidoAlteradoEvento = void 0;
const evento_dominio_1 = require("../../../../nucleo/eventos/evento-dominio");
class StatusPedidoAlteradoEvento extends evento_dominio_1.EventoDominio {
    constructor(pedidoId, statusAnterior, novoStatus) {
        super();
        this.pedidoId = pedidoId;
        this.statusAnterior = statusAnterior;
        this.novoStatus = novoStatus;
    }
}
exports.StatusPedidoAlteradoEvento = StatusPedidoAlteradoEvento;
//# sourceMappingURL=status-pedido-alterado.evento.js.map