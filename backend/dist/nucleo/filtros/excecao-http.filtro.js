"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FiltroExcecaoHttp_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltroExcecaoHttp = void 0;
const common_1 = require("@nestjs/common");
const entidade_nao_encontrada_erro_1 = require("../erros/entidade-nao-encontrada.erro");
const negocio_erro_1 = require("../erros/negocio.erro");
let FiltroExcecaoHttp = FiltroExcecaoHttp_1 = class FiltroExcecaoHttp {
    constructor() {
        this.logger = new common_1.Logger(FiltroExcecaoHttp_1.name);
    }
    catch(excecao, host) {
        const ctx = host.switchToHttp();
        const resposta = ctx.getResponse();
        const requisicao = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let mensagem = 'Erro interno do servidor';
        if (excecao instanceof common_1.HttpException) {
            status = excecao.getStatus();
            const respostaExcecao = excecao.getResponse();
            mensagem =
                typeof respostaExcecao === 'string'
                    ? respostaExcecao
                    : respostaExcecao.message;
        }
        else if (excecao instanceof entidade_nao_encontrada_erro_1.EntidadeNaoEncontradaErro) {
            status = common_1.HttpStatus.NOT_FOUND;
            mensagem = excecao.message;
        }
        else if (excecao instanceof negocio_erro_1.NegocioErro) {
            status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
            mensagem = excecao.message;
        }
        else if (excecao instanceof Error) {
            this.logger.error(`Erro não tratado: ${excecao.message}`, excecao.stack);
        }
        resposta.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: requisicao.url,
            message: mensagem,
        });
    }
};
exports.FiltroExcecaoHttp = FiltroExcecaoHttp;
exports.FiltroExcecaoHttp = FiltroExcecaoHttp = FiltroExcecaoHttp_1 = __decorate([
    (0, common_1.Catch)()
], FiltroExcecaoHttp);
//# sourceMappingURL=excecao-http.filtro.js.map