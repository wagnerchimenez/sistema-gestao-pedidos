"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoCriadoEvento = void 0;
const evento_dominio_1 = require("../../../../nucleo/eventos/evento-dominio");
class PedidoCriadoEvento extends evento_dominio_1.EventoDominio {
    constructor(pedidoId, nomeCliente, valorTotal) {
        super();
        this.pedidoId = pedidoId;
        this.nomeCliente = nomeCliente;
        this.valorTotal = valorTotal;
    }
}
exports.PedidoCriadoEvento = PedidoCriadoEvento;
//# sourceMappingURL=pedido-criado.evento.js.map