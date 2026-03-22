"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadeBase = void 0;
const uuid_1 = require("uuid");
class EntidadeBase {
    constructor(id, criadoEm, atualizadoEm) {
        this.id = id ?? (0, uuid_1.v4)();
        this.criadoEm = criadoEm ?? new Date();
        this.atualizadoEm = atualizadoEm ?? new Date();
    }
    equals(outra) {
        return this.id === outra.id;
    }
}
exports.EntidadeBase = EntidadeBase;
//# sourceMappingURL=entidade-base.js.map