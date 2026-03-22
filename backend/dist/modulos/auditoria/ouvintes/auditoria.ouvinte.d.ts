import { Repository } from 'typeorm';
import { PedidoCriadoEvento } from '../../pedidos/dominio/eventos/pedido-criado.evento';
import { StatusPedidoAlteradoEvento } from '../../pedidos/dominio/eventos/status-pedido-alterado.evento';
import { LogAuditoriaSchema } from '../infraestrutura/persistencia/entidades/log-auditoria.schema';
export declare class AuditoriaOuvinte {
    private readonly logRepositorio;
    private readonly logger;
    constructor(logRepositorio: Repository<LogAuditoriaSchema>);
    aocriarPedido(evento: PedidoCriadoEvento): Promise<void>;
    aoAlterarStatus(evento: StatusPedidoAlteradoEvento): Promise<void>;
    private registrar;
}
