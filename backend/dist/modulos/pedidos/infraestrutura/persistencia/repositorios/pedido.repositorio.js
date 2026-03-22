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
exports.PedidoRepositorio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entidade_1 = require("../../../dominio/entidades/pedido.entidade");
const status_pedido_enum_1 = require("../../../dominio/enums/status-pedido.enum");
const item_pedido_vo_1 = require("../../../dominio/valor-objetos/item-pedido.vo");
const pedido_schema_1 = require("../entidades/pedido.schema");
let PedidoRepositorio = class PedidoRepositorio {
    constructor(repositorioTypeOrm) {
        this.repositorioTypeOrm = repositorioTypeOrm;
    }
    async salvar(pedido) {
        const schema = this.paraSchema(pedido);
        await this.repositorioTypeOrm.save(schema);
        return pedido;
    }
    async buscarPorId(id) {
        const schema = await this.repositorioTypeOrm.findOne({ where: { id } });
        return schema ? this.paraEntidade(schema) : null;
    }
    async listar(filtro) {
        const pagina = filtro.pagina ?? 1;
        const itensPorPagina = filtro.itensPorPagina ?? 10;
        const query = this.repositorioTypeOrm.createQueryBuilder('pedido');
        if (filtro.status) {
            query.andWhere('pedido.status = :status', { status: filtro.status });
        }
        if (filtro.nomeCliente) {
            query.andWhere('pedido.nomeCliente ILIKE :nome', {
                nome: `%${filtro.nomeCliente}%`,
            });
        }
        query
            .orderBy('pedido.criadoEm', 'DESC')
            .skip((pagina - 1) * itensPorPagina)
            .take(itensPorPagina);
        const [schemas, total] = await query.getManyAndCount();
        return {
            dados: schemas.map(this.paraEntidade),
            total,
            pagina,
            itensPorPagina,
        };
    }
    async contarPorStatus() {
        const resultado = await this.repositorioTypeOrm
            .createQueryBuilder('pedido')
            .select('pedido.status', 'status')
            .addSelect('COUNT(*)', 'quantidade')
            .groupBy('pedido.status')
            .getRawMany();
        return resultado.map((r) => ({
            status: r.status,
            quantidade: parseInt(r.quantidade, 10),
        }));
    }
    async somarFaturamentoPorDia(dias) {
        const resultado = await this.repositorioTypeOrm
            .createQueryBuilder('pedido')
            .select("TO_CHAR(pedido.criadoEm, 'YYYY-MM-DD')", 'data')
            .addSelect('SUM(pedido.valorTotal)', 'valor')
            .where("pedido.criadoEm >= NOW() - (:dias * INTERVAL '1 day')", { dias })
            .andWhere('pedido.status = :status', { status: status_pedido_enum_1.StatusPedido.CONCLUIDO })
            .groupBy("TO_CHAR(pedido.criadoEm, 'YYYY-MM-DD')")
            .orderBy('data', 'ASC')
            .getRawMany();
        return resultado.map((r) => ({
            data: r.data,
            valor: parseFloat(r.valor),
        }));
    }
    paraSchema(pedido) {
        const schema = new pedido_schema_1.PedidoSchema();
        schema.id = pedido.id;
        schema.nomeCliente = pedido.nomeCliente;
        schema.emailCliente = pedido.emailCliente;
        schema.status = pedido.status;
        schema.valorTotal = pedido.valorTotal;
        schema.itens = pedido.itens;
        schema.criadoEm = pedido.criadoEm;
        schema.atualizadoEm = pedido.atualizadoEm;
        return schema;
    }
    paraEntidade(schema) {
        const itens = schema.itens.map((item) => item_pedido_vo_1.ItemPedidoVO.restaurar({
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
        }));
        return pedido_entidade_1.PedidoEntidade.restaurar({
            id: schema.id,
            nomeCliente: schema.nomeCliente,
            emailCliente: schema.emailCliente,
            status: schema.status,
            itens,
            valorTotal: Number(schema.valorTotal),
            criadoEm: schema.criadoEm,
            atualizadoEm: schema.atualizadoEm,
        });
    }
};
exports.PedidoRepositorio = PedidoRepositorio;
exports.PedidoRepositorio = PedidoRepositorio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_schema_1.PedidoSchema)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PedidoRepositorio);
//# sourceMappingURL=pedido.repositorio.js.map