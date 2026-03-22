"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedidoVO = void 0;
const negocio_erro_1 = require("../../../../nucleo/erros/negocio.erro");
class ItemPedidoVO {
    constructor(props) {
        this.nomeProduto = props.nomeProduto;
        this.quantidade = props.quantidade;
        this.precoUnitario = props.precoUnitario;
        this.total = parseFloat((props.quantidade * props.precoUnitario).toFixed(2));
    }
    static criar(props) {
        if (!props.nomeProduto || props.nomeProduto.trim().length === 0) {
            throw new negocio_erro_1.NegocioErro('Nome do produto é obrigatório.');
        }
        if (props.quantidade <= 0) {
            throw new negocio_erro_1.NegocioErro('Quantidade deve ser maior que zero.');
        }
        if (props.precoUnitario <= 0) {
            throw new negocio_erro_1.NegocioErro('Preço unitário deve ser maior que zero.');
        }
        return new ItemPedidoVO(props);
    }
    static restaurar(props) {
        return new ItemPedidoVO(props);
    }
}
exports.ItemPedidoVO = ItemPedidoVO;
//# sourceMappingURL=item-pedido.vo.js.map