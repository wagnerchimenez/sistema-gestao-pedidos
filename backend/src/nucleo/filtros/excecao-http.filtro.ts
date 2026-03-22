import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntidadeNaoEncontradaErro } from '../erros/entidade-nao-encontrada.erro';
import { NegocioErro } from '../erros/negocio.erro';

@Catch()
export class FiltroExcecaoHttp implements ExceptionFilter {
  private readonly logger = new Logger(FiltroExcecaoHttp.name);

  catch(excecao: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resposta = ctx.getResponse<Response>();
    const requisicao = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let mensagem = 'Erro interno do servidor';

    if (excecao instanceof HttpException) {
      status = excecao.getStatus();
      const respostaExcecao = excecao.getResponse();
      mensagem =
        typeof respostaExcecao === 'string'
          ? respostaExcecao
          : (respostaExcecao as any).message;
    } else if (excecao instanceof EntidadeNaoEncontradaErro) {
      status = HttpStatus.NOT_FOUND;
      mensagem = excecao.message;
    } else if (excecao instanceof NegocioErro) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      mensagem = excecao.message;
    } else if (excecao instanceof Error) {
      this.logger.error(`Erro não tratado: ${excecao.message}`, excecao.stack);
    }

    resposta.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: requisicao.url,
      message: mensagem,
    });
  }
}
