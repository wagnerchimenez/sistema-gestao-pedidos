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
var ExcelServico_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelServico = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
let ExcelServico = ExcelServico_1 = class ExcelServico {
    constructor(configServico) {
        this.configServico = configServico;
        this.logger = new common_1.Logger(ExcelServico_1.name);
        this.diretorioRelatorios = configServico.get('RELATORIOS_PATH', './relatorios');
        if (!fs.existsSync(this.diretorioRelatorios)) {
            fs.mkdirSync(this.diretorioRelatorios, { recursive: true });
        }
    }
    async gerarRelatorioExcel(pedidos, nomeArquivo) {
        const pasta = new ExcelJS.Workbook();
        pasta.creator = 'Sistema de Gestão de Pedidos';
        pasta.created = new Date();
        const aba = pasta.addWorksheet('Pedidos', {
            pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 },
        });
        aba.columns = [
            { header: 'Nº', key: 'numero', width: 6 },
            { header: 'ID', key: 'id', width: 38 },
            { header: 'Cliente', key: 'nomeCliente', width: 30 },
            { header: 'E-mail', key: 'emailCliente', width: 35 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Total (R$)', key: 'valorTotal', width: 15 },
            { header: 'Criado em', key: 'criadoEm', width: 20 },
        ];
        const linhasCabecalho = aba.getRow(1);
        linhasCabecalho.eachCell((celula) => {
            celula.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2563EB' },
            };
            celula.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 11 };
            celula.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        linhasCabecalho.height = 25;
        pedidos.forEach((pedido, indice) => {
            const linha = aba.addRow({
                numero: indice + 1,
                id: pedido.id,
                nomeCliente: pedido.nomeCliente,
                emailCliente: pedido.emailCliente,
                status: pedido.status,
                valorTotal: Number(pedido.valorTotal),
                criadoEm: new Date(pedido.criadoEm).toLocaleDateString('pt-BR'),
            });
            if (indice % 2 === 0) {
                linha.eachCell((celula) => {
                    celula.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFF0F9FF' },
                    };
                });
            }
            linha.getCell('valorTotal').numFmt = 'R$ #,##0.00';
        });
        const totalLinhas = pedidos.length + 2;
        const linhaTotais = aba.getRow(totalLinhas);
        aba.getCell(`A${totalLinhas}`).value = 'TOTAL';
        aba.getCell(`F${totalLinhas}`).value = {
            formula: `SUM(F2:F${pedidos.length + 1})`,
        };
        aba.getCell(`F${totalLinhas}`).numFmt = 'R$ #,##0.00';
        linhaTotais.font = { bold: true };
        linhaTotais.eachCell((celula) => {
            celula.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFDBEAFE' },
            };
        });
        aba.eachRow((linha) => {
            linha.eachCell((celula) => {
                celula.border = {
                    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                };
            });
        });
        const caminhoArquivo = path.join(this.diretorioRelatorios, `${nomeArquivo}.xlsx`);
        await pasta.xlsx.writeFile(caminhoArquivo);
        this.logger.log(`Relatório gerado: ${caminhoArquivo}`);
        return caminhoArquivo;
    }
    obterCaminhoArquivo(nomeArquivo) {
        return path.join(this.diretorioRelatorios, `${nomeArquivo}.xlsx`);
    }
};
exports.ExcelServico = ExcelServico;
exports.ExcelServico = ExcelServico = ExcelServico_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ExcelServico);
//# sourceMappingURL=excel.servico.js.map