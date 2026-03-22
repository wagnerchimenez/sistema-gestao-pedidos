"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAuditoriaSchema = void 0;
const typeorm_1 = require("typeorm");
let LogAuditoriaSchema = class LogAuditoriaSchema {
};
exports.LogAuditoriaSchema = LogAuditoriaSchema;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogAuditoriaSchema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], LogAuditoriaSchema.prototype, "entidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entidade_id', length: 100 }),
    __metadata("design:type", String)
], LogAuditoriaSchema.prototype, "entidadeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], LogAuditoriaSchema.prototype, "operacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dados_anteriores', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LogAuditoriaSchema.prototype, "dadosAnteriores", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dados_novos', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LogAuditoriaSchema.prototype, "dadosNovos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], LogAuditoriaSchema.prototype, "criadoEm", void 0);
exports.LogAuditoriaSchema = LogAuditoriaSchema = __decorate([
    (0, typeorm_1.Entity)({ name: 'logs_auditoria' })
], LogAuditoriaSchema);
//# sourceMappingURL=log-auditoria.schema.js.map