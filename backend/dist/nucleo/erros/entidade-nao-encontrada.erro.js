"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadeNaoEncontradaErro = void 0;
class EntidadeNaoEncontradaErro extends Error {
    constructor(entidade, id) {
        super(`${entidade} com id "${id}" não encontrado(a).`);
        this.name = 'EntidadeNaoEncontradaErro';
    }
}
exports.EntidadeNaoEncontradaErro = EntidadeNaoEncontradaErro;
//# sourceMappingURL=entidade-nao-encontrada.erro.js.map