"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSICOES_VALIDAS = exports.StatusPedido = void 0;
var StatusPedido;
(function (StatusPedido) {
    StatusPedido["PENDENTE"] = "PENDENTE";
    StatusPedido["PROCESSANDO"] = "PROCESSANDO";
    StatusPedido["CONCLUIDO"] = "CONCLUIDO";
    StatusPedido["CANCELADO"] = "CANCELADO";
})(StatusPedido || (exports.StatusPedido = StatusPedido = {}));
exports.TRANSICOES_VALIDAS = {
    [StatusPedido.PENDENTE]: [StatusPedido.PROCESSANDO, StatusPedido.CANCELADO],
    [StatusPedido.PROCESSANDO]: [StatusPedido.CONCLUIDO, StatusPedido.CANCELADO],
    [StatusPedido.CONCLUIDO]: [],
    [StatusPedido.CANCELADO]: [],
};
//# sourceMappingURL=status-pedido.enum.js.map