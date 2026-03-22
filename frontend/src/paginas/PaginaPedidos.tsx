import { useCallback, useEffect, useState } from 'react'
import { TabelaPedidos } from '../componentes/TabelaPedidos'
import { ModalCriarPedido } from '../componentes/ModalCriarPedido'
import { pedidosServico } from '../servicos/pedidos.servico'
import {
  ListaPedidosResposta,
  Pedido,
  StatusPedido,
} from '../tipos/pedido.tipos'

const OPCOES_STATUS = [
  { valor: '', rotulo: 'Todos os status' },
  { valor: StatusPedido.PENDENTE, rotulo: 'Pendente' },
  { valor: StatusPedido.PROCESSANDO, rotulo: 'Processando' },
  { valor: StatusPedido.CONCLUIDO, rotulo: 'Concluído' },
  { valor: StatusPedido.CANCELADO, rotulo: 'Cancelado' },
]

const PROXIMOS_STATUS: Partial<Record<StatusPedido, StatusPedido[]>> = {
  [StatusPedido.PENDENTE]: [StatusPedido.PROCESSANDO, StatusPedido.CANCELADO],
  [StatusPedido.PROCESSANDO]: [StatusPedido.CONCLUIDO, StatusPedido.CANCELADO],
}

export function PaginaPedidos() {
  const [resultado, setResultado] = useState<ListaPedidosResposta | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState<string>('')
  const [filtroNome, setFiltroNome] = useState<string>('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [modalAberto, setModalAberto] = useState(false)
  const [pedidoParaAtualizar, setPedidoParaAtualizar] = useState<Pedido | null>(null)
  const [atualizandoStatus, setAtualizandoStatus] = useState(false)

  const carregarPedidos = useCallback(async () => {
    setCarregando(true)
    try {
      const dados = await pedidosServico.listar({
        status: filtroStatus ? (filtroStatus as StatusPedido) : undefined,
        nomeCliente: filtroNome || undefined,
        pagina: paginaAtual,
        itensPorPagina: 10,
      })
      setResultado(dados)
    } catch (err: any) {
      console.error('Erro ao carregar pedidos:', err.message)
    } finally {
      setCarregando(false)
    }
  }, [filtroStatus, filtroNome, paginaAtual])

  useEffect(() => {
    carregarPedidos()
  }, [carregarPedidos])

  function handleFiltroNomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltroNome(e.target.value)
    setPaginaAtual(1)
  }

  function handleFiltroStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFiltroStatus(e.target.value)
    setPaginaAtual(1)
  }

  async function handleAtualizarStatus(pedido: Pedido, novoStatus: StatusPedido) {
    setAtualizandoStatus(true)
    try {
      await pedidosServico.atualizarStatus(pedido.id, { status: novoStatus })
      await carregarPedidos()
    } catch (err: any) {
      alert(`Erro: ${err.message}`)
    } finally {
      setAtualizandoStatus(false)
      setPedidoParaAtualizar(null)
    }
  }

  const totalPaginas = resultado ? Math.ceil(resultado.total / resultado.itensPorPagina) : 1

  return (
    <div className="space-y-6">
      {/* Cabeçalho com filtros */}
      <div className="card">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Buscar por cliente
            </label>
            <input
              type="text"
              value={filtroNome}
              onChange={handleFiltroNomeChange}
              placeholder="Nome do cliente..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <select
              value={filtroStatus}
              onChange={handleFiltroStatusChange}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {OPCOES_STATUS.map((opcao) => (
                <option key={opcao.valor} value={opcao.valor}>
                  {opcao.rotulo}
                </option>
              ))}
            </select>
          </div>

          <button onClick={() => setModalAberto(true)} className="btn-primario ml-auto">
            + Novo Pedido
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-700">
            {resultado ? `${resultado.total} pedido(s) encontrado(s)` : ''}
          </h3>
        </div>

        <TabelaPedidos
          pedidos={resultado?.dados ?? []}
          carregando={carregando}
          aoAtualizarStatus={(pedido) => setPedidoParaAtualizar(pedido)}
        />

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="btn-secundario py-1 px-3 disabled:opacity-40"
            >
              ‹ Anterior
            </button>
            <span className="text-sm text-slate-600">
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
              className="btn-secundario py-1 px-3 disabled:opacity-40"
            >
              Próxima ›
            </button>
          </div>
        )}
      </div>

      {/* Modal de criação de pedido */}
      {modalAberto && (
        <ModalCriarPedido
          aoFechar={() => setModalAberto(false)}
          aoSalvar={() => {
            setModalAberto(false)
            carregarPedidos()
          }}
        />
      )}

      {/* Modal de atualização de status */}
      {pedidoParaAtualizar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Atualizar Status</h3>
            <p className="text-sm text-slate-600 mb-4">
              Selecione o novo status para o pedido de{' '}
              <strong>{pedidoParaAtualizar.nomeCliente}</strong>:
            </p>
            <div className="space-y-2">
              {(PROXIMOS_STATUS[pedidoParaAtualizar.status] ?? []).map((status) => (
                <button
                  key={status}
                  onClick={() => handleAtualizarStatus(pedidoParaAtualizar, status)}
                  disabled={atualizandoStatus}
                  className="w-full btn-primario"
                >
                  {status === StatusPedido.PROCESSANDO ? '🔄 Iniciar Processamento' : ''}
                  {status === StatusPedido.CONCLUIDO ? '✅ Marcar como Concluído' : ''}
                  {status === StatusPedido.CANCELADO ? '❌ Cancelar Pedido' : ''}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPedidoParaAtualizar(null)}
              className="w-full btn-secundario mt-3"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
