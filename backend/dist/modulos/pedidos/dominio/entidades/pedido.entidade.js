"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoEntidade = void 0;
const uuid_1 = require("uuid");
const entidade_base_1 = require("../../../../nucleo/entidade-base");
const negocio_erro_1 = require("../../../../nucleo/erros/negocio.erro");
const status_pedido_enum_1 = require("../enums/status-pedido.enum");
const pedido_criado_evento_1 = require("../eventos/pedido-criado.evento");
const status_pedido_alterado_evento_1 = require("../eventos/status-pedido-alterado.evento");
class PedidoEntidade extends entidade_base_1.EntidadeBase {
    constructor(props) {
        super(props.id, props.criadoEm, props.atualizadoEm);
        this._eventos = [];
        this.nomeCliente = props.nomeCliente;
        this.emailCliente = props.emailCliente;
        this.itens = props.itens;
        this.valorTotal = props.valorTotal;
        this._status = props.status;
    }
    get status() {
        return this._status;
    }
    get eventos() {
        return [...this._eventos];
    }
    static criar(props) {
        if (!props.nomeCliente || props.nomeCliente.trim().length === 0) {
            throw new negocio_erro_1.NegocioErro('Nome do cliente é obrigatório.');
        }
        if (!props.emailCliente || props.emailCliente.trim().length === 0) {
            throw new negocio_erro_1.NegocioErro('E-mail do cliente é obrigatório.');
        }
        if (!props.itens || props.itens.length === 0) {
            throw new negocio_erro_1.NegocioErro('O pedido deve ter pelo menos um item.');
        }
        const valorTotal = parseFloat(props.itens.reduce((soma, item) => soma + item.total, 0).toFixed(2));
        const agora = new Date();
        const pedido = new PedidoEntidade({
            id: (0, uuid_1.v4)(),
            nomeCliente: props.nomeCliente.trim(),
            emailCliente: props.emailCliente.trim().toLowerCase(),
            itens: props.itens,
            valorTotal,
            status: status_pedido_enum_1.StatusPedido.PENDENTE,
            criadoEm: agora,
            atualizadoEm: agora,
        });
        pedido._eventos.push(new pedido_criado_evento_1.PedidoCriadoEvento(pedido.id, pedido.nomeCliente, pedido.valorTotal));
        return pedido;
    }
    static restaurar(props) {
        return new PedidoEntidade(props);
    }
    atualizarStatus(novoStatus) {
        const transicoesPermitidas = status_pedido_enum_1.TRANSICOES_VALIDAS[this._status];
        if (!transicoesPermitidas.includes(novoStatus)) {
            throw new negocio_erro_1.NegocioErro(`Transição de status inválida: ${this._status} → ${novoStatus}.`);
        }
        const statusAnterior = this._status;
        this._status = novoStatus;
        this.atualizadoEm = new Date();
        this._eventos.push(new status_pedido_alterado_evento_1.StatusPedidoAlteradoEvento(this.id, statusAnterior, novoStatus));
    }
    limparEventos() {
        this._eventos.length = 0;
    }
}
exports.PedidoEntidade = PedidoEntidade;
//# sourceMappingURL=pedido.entidade.js.map