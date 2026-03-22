"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegocioErro = void 0;
class NegocioErro extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NegocioErro';
    }
}
exports.NegocioErro = NegocioErro;
//# sourceMappingURL=negocio.erro.js.map