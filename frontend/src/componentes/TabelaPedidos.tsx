import { Pedido, StatusPedido } from '../tipos/pedido.tipos'

const ROTULOS_STATUS: Record<StatusPedido, string> = {
  [StatusPedido.PENDENTE]: 'Pendente',
  [StatusPedido.PROCESSANDO]: 'Processando',
  [StatusPedido.CONCLUIDO]: 'Concluído',
  [StatusPedido.CANCELADO]: 'Cancelado',
}

const CLASSES_BADGE: Record<StatusPedido, string> = {
  [StatusPedido.PENDENTE]: 'badge-pendente',
  [StatusPedido.PROCESSANDO]: 'badge-processando',
  [StatusPedido.CONCLUIDO]: 'badge-concluido',
  [StatusPedido.CANCELADO]: 'badge-cancelado',
}

interface Props {
  pedidos: Pedido[]
  carregando: boolean
  aoAtualizarStatus: (pedido: Pedido) => void
}

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function formatarData(data: string): string {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TabelaPedidos({ pedidos, carregando, aoAtualizarStatus }: Props) {
  if (carregando) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-4xl mb-2">📋</p>
        <p className="text-lg font-medium">Nenhum pedido encontrado</p>
        <p className="text-sm mt-1">Crie o primeiro pedido para começar.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-600">Cliente</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">E-mail</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-600">Total</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-600">Criado em</th>
            <th className="text-center py-3 px-4 font-semibold text-slate-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr
              key={pedido.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-slate-800">{pedido.nomeCliente}</td>
              <td className="py-3 px-4 text-slate-500">{pedido.emailCliente}</td>
              <td className="py-3 px-4">
                <span className={CLASSES_BADGE[pedido.status]}>
                  {ROTULOS_STATUS[pedido.status]}
                </span>
              </td>
              <td className="py-3 px-4 text-right font-medium text-slate-700">
                {formatarMoeda(pedido.valorTotal)}
              </td>
              <td className="py-3 px-4 text-slate-500">{formatarData(pedido.criadoEm)}</td>
              <td className="py-3 px-4 text-center">
                {pedido.status === StatusPedido.PENDENTE && (
                  <button
                    onClick={() => aoAtualizarStatus(pedido)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Atualizar Status
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
