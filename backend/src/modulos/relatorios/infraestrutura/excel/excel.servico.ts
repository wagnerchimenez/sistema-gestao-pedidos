import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import { PedidoEntidade } from '../../../pedidos/dominio/entidades/pedido.entidade';

@Injectable()
export class ExcelServico {
  private readonly logger = new Logger(ExcelServico.name);
  private readonly diretorioRelatorios: string;

  constructor(private readonly configServico: ConfigService) {
    this.diretorioRelatorios = configServico.get('RELATORIOS_PATH', './relatorios');
    if (!fs.existsSync(this.diretorioRelatorios)) {
      fs.mkdirSync(this.diretorioRelatorios, { recursive: true });
    }
  }

  async gerarRelatorioExcel(
    pedidos: PedidoEntidade[],
    nomeArquivo: string,
  ): Promise<string> {
    const pasta = new ExcelJS.Workbook();
    pasta.creator = 'Sistema de Gestão de Pedidos';
    pasta.created = new Date();

    const aba = pasta.addWorksheet('Pedidos', {
      pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 },
    });

    // Cabeçalho com estilo
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

    // Dados
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

      // Zebra striping
      if (indice % 2 === 0) {
        linha.eachCell((celula) => {
          celula.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F9FF' },
          };
        });
      }

      // Formatar coluna de valor como moeda
      linha.getCell('valorTotal').numFmt = 'R$ #,##0.00';
    });

    // Linha de totalizador
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

    // Bordas em todas as células
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

  obterCaminhoArquivo(nomeArquivo: string): string {
    return path.join(this.diretorioRelatorios, `${nomeArquivo}.xlsx`);
  }
}
