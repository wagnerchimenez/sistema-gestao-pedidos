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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatorioControlador = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const filtro_relatorio_dto_1 = require("../aplicacao/dtos/filtro-relatorio.dto");
const excel_servico_1 = require("../infraestrutura/excel/excel.servico");
let RelatorioControlador = class RelatorioControlador {
    constructor(filaRelatorios, excelServico) {
        this.filaRelatorios = filaRelatorios;
        this.excelServico = excelServico;
    }
    async solicitarRelatorio(filtro) {
        const nomeArquivo = `relatorio_pedidos_${Date.now()}`;
        const dadosJob = {
            nomeArquivo,
            status: filtro.status,
            dataInicio: filtro.dataInicio,
            dataFim: filtro.dataFim,
        };
        const job = await this.filaRelatorios.add('gerar-relatorio', dadosJob, {
            attempts: 2,
            removeOnComplete: false,
        });
        return {
            jobId: String(job.id),
            mensagem: `Relatório em processamento. Use o jobId para verificar o status.`,
        };
    }
    async verificarStatus(jobId) {
        const job = await this.filaRelatorios.getJob(jobId);
        if (!job) {
            throw new common_1.NotFoundException(`Job "${jobId}" não encontrado.`);
        }
        const estado = await job.getState();
        const progresso = job.progress();
        return {
            jobId,
            estado,
            progresso,
            concluidoEm: job.finishedOn ? new Date(job.finishedOn) : null,
            erro: job.failedReason ?? null,
        };
    }
    async baixarRelatorio(jobId, res) {
        const job = await this.filaRelatorios.getJob(jobId);
        if (!job) {
            throw new common_1.NotFoundException(`Job "${jobId}" não encontrado.`);
        }
        const estado = await job.getState();
        if (estado !== 'completed') {
            return res.status(common_1.HttpStatus.ACCEPTED).json({
                mensagem: `Relatório ainda em processamento. Estado atual: ${estado}`,
                estado,
            });
        }
        const { nomeArquivo } = job.data;
        const caminhoArquivo = this.excelServico.obterCaminhoArquivo(nomeArquivo);
        if (!fs.existsSync(caminhoArquivo)) {
            throw new common_1.NotFoundException('Arquivo de relatório não encontrado no servidor.');
        }
        res.setHeader('Content-Disposition', `attachment; filename="${nomeArquivo}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        const fluxoArquivo = fs.createReadStream(caminhoArquivo);
        fluxoArquivo.pipe(res);
    }
};
exports.RelatorioControlador = RelatorioControlador;
__decorate([
    (0, common_1.Post)('gerar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar geração assíncrona de relatório Excel' }),
    (0, swagger_1.ApiResponse)({ status: 202, type: filtro_relatorio_dto_1.RelatorioSolicitadoDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtro_relatorio_dto_1.FiltroRelatorioDto]),
    __metadata("design:returntype", Promise)
], RelatorioControlador.prototype, "solicitarRelatorio", null);
__decorate([
    (0, common_1.Get)(':jobId/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar status do job de geração de relatório' }),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelatorioControlador.prototype, "verificarStatus", null);
__decorate([
    (0, common_1.Get)(':jobId/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Baixar relatório Excel após concluído' }),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RelatorioControlador.prototype, "baixarRelatorio", null);
exports.RelatorioControlador = RelatorioControlador = __decorate([
    (0, swagger_1.ApiTags)('relatorios'),
    (0, common_1.Controller)('relatorios'),
    __param(0, (0, bull_1.InjectQueue)('fila-relatorios')),
    __metadata("design:paramtypes", [Object, excel_servico_1.ExcelServico])
], RelatorioControlador);
//# sourceMappingURL=relatorio.controlador.js.map