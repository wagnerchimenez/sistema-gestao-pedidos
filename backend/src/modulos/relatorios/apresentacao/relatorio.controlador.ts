import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Queue } from 'bull';
import * as fs from 'fs';
import { FiltroRelatorioDto, RelatorioSolicitadoDto } from '../aplicacao/dtos/filtro-relatorio.dto';
import { ExcelServico } from '../infraestrutura/excel/excel.servico';
import { DadosJobRelatorio } from '../infraestrutura/filas/relatorio.processador';

@ApiTags('relatorios')
@Controller('relatorios')
export class RelatorioControlador {
  constructor(
    @InjectQueue('fila-relatorios')
    private readonly filaRelatorios: Queue,
    private readonly excelServico: ExcelServico,
  ) {}

  @Post('gerar')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Solicitar geração assíncrona de relatório Excel' })
  @ApiResponse({ status: 202, type: RelatorioSolicitadoDto })
  async solicitarRelatorio(@Body() filtro: FiltroRelatorioDto): Promise<RelatorioSolicitadoDto> {
    const nomeArquivo = `relatorio_pedidos_${Date.now()}`;

    const dadosJob: DadosJobRelatorio = {
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

  @Get(':jobId/status')
  @ApiOperation({ summary: 'Verificar status do job de geração de relatório' })
  async verificarStatus(@Param('jobId') jobId: string) {
    const job = await this.filaRelatorios.getJob(jobId);
    if (!job) {
      throw new NotFoundException(`Job "${jobId}" não encontrado.`);
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

  @Get(':jobId/download')
  @ApiOperation({ summary: 'Baixar relatório Excel após concluído' })
  async baixarRelatorio(@Param('jobId') jobId: string, @Res() res: Response) {
    const job = await this.filaRelatorios.getJob(jobId);
    if (!job) {
      throw new NotFoundException(`Job "${jobId}" não encontrado.`);
    }

    const estado = await job.getState();
    if (estado !== 'completed') {
      return res.status(HttpStatus.ACCEPTED).json({
        mensagem: `Relatório ainda em processamento. Estado atual: ${estado}`,
        estado,
      });
    }

    const { nomeArquivo } = job.data as DadosJobRelatorio;
    const caminhoArquivo = this.excelServico.obterCaminhoArquivo(nomeArquivo);

    if (!fs.existsSync(caminhoArquivo)) {
      throw new NotFoundException('Arquivo de relatório não encontrado no servidor.');
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${nomeArquivo}.xlsx"`,
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    const fluxoArquivo = fs.createReadStream(caminhoArquivo);
    fluxoArquivo.pipe(res);
  }
}
