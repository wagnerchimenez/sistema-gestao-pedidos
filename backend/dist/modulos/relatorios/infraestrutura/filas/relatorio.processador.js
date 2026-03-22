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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RelatorioProcessador_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatorioProcessador = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const pedido_repositorio_token_1 = require("../../../pedidos/dominio/repositorios/pedido.repositorio.token");
const excel_servico_1 = require("../excel/excel.servico");
let RelatorioProcessador = RelatorioProcessador_1 = class RelatorioProcessador {
    constructor(pedidoRepositorio, excelServico) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.excelServico = excelServico;
        this.logger = new common_1.Logger(RelatorioProcessador_1.name);
    }
    async gerarRelatorio(job) {
        this.logger.log(`Iniciando geração de relatório: ${job.data.nomeArquivo}`);
        await job.progress(10);
        const resultado = await this.pedidoRepositorio.listar({
            status: job.data.status,
            pagina: 1,
            itensPorPagina: 10000,
        });
        await job.progress(50);
        const caminhoArquivo = await this.excelServico.gerarRelatorioExcel(resultado.dados, job.data.nomeArquivo);
        await job.progress(100);
        return { caminhoArquivo };
    }
    aoCompletarJob(job) {
        this.logger.log(`Relatório "${job.data.nomeArquivo}" gerado com sucesso.`);
    }
    aoFalharJob(job, erro) {
        this.logger.error(`Falha ao gerar relatório "${job.data.nomeArquivo}": ${erro.message}`);
    }
};
exports.RelatorioProcessador = RelatorioProcessador;
__decorate([
    (0, bull_1.Process)('gerar-relatorio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelatorioProcessador.prototype, "gerarRelatorio", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RelatorioProcessador.prototype, "aoCompletarJob", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], RelatorioProcessador.prototype, "aoFalharJob", null);
exports.RelatorioProcessador = RelatorioProcessador = RelatorioProcessador_1 = __decorate([
    (0, bull_1.Processor)('fila-relatorios'),
    __param(0, (0, common_1.Inject)(pedido_repositorio_token_1.PEDIDO_REPOSITORIO_TOKEN)),
    __metadata("design:paramtypes", [Object, excel_servico_1.ExcelServico])
], RelatorioProcessador);
//# sourceMappingURL=relatorio.processador.js.map