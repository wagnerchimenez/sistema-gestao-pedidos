import { useEffect, useState, useCallback } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'
import { CartaoEstatistica } from '../componentes/CartaoEstatistica'
import { dashboardServico } from '../servicos/dashboard.servico'
import { relatoriosServico } from '../servicos/relatorios.servico'
import { EstatisticasDashboard } from '../tipos/dashboard.tipos'

const ROTULOS_STATUS: Record<string, string> = {
  PENDENTE: 'Pendente',
  PROCESSANDO: 'Processando',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
}

const CORES_STATUS: Record<string, string> = {
  PENDENTE: '#f59e0b',
  PROCESSANDO: '#3b82f6',
  CONCLUIDO: '#10b981',
  CANCELADO: '#ef4444',
}

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}

export function PaginaDashboard() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasDashboard | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false)
  const [mensagemRelatorio, setMensagemRelatorio] = useState<string | null>(null)

  const carregarEstatisticas = useCallback(async () => {
    try {
      setErro(null)
      const dados = await dashboardServico.obterEstatisticas()
      setEstatisticas(dados)
    } catch (err: any) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregarEstatisticas()
    const intervalo = setInterval(carregarEstatisticas, 30000)
    return () => clearInterval(intervalo)
  }, [carregarEstatisticas])

  async function handleGerarRelatorio() {
    setGerandoRelatorio(true)
    setMensagemRelatorio(null)
    try {
      const { jobId, mensagem } = await relatoriosServico.solicitar({})
      setMensagemRelatorio(`${mensagem} (Job ID: ${jobId})`)

      // Polling para verificar quando o relatório está pronto
      const verificar = setInterval(async () => {
        const status = await relatoriosServico.verificarStatus(jobId)
        if (status.estado === 'completed') {
          clearInterval(verificar)
          setGerandoRelatorio(false)
          setMensagemRelatorio(null)
          window.open(relatoriosServico.obterUrlDownload(jobId), '_blank')
        } else if (status.estado === 'failed') {
          clearInterval(verificar)
          setGerandoRelatorio(false)
          setMensagemRelatorio(`Falha ao gerar relatório: ${status.erro}`)
        }
      }, 2000)
    } catch (err: any) {
      setMensagemRelatorio(`Erro: ${err.message}`)
      setGerandoRelatorio(false)
    }
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">Erro ao carregar estatísticas</p>
        <p className="text-sm mt-1">{erro}</p>
        <button onClick={carregarEstatisticas} className="btn-perigo mt-3">
          Tentar novamente
        </button>
      </div>
    )
  }

  const dadosGraficoStatus =
    estatisticas?.pedidosPorStatus.map((item) => ({
      status: ROTULOS_STATUS[item.status] ?? item.status,
      quantidade: item.quantidade,
      cor: CORES_STATUS[item.status] ?? '#94a3b8',
    })) ?? []

  const dadosGraficoFaturamento =
    estatisticas?.faturamentoPorDia.map((item) => ({
      data: new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      valor: item.valor,
    })) ?? []

  return (
    <div className="space-y-8">
      {/* Ação de relatório */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">Atualizado automaticamente a cada 30 segundos.</p>
        <button
          onClick={handleGerarRelatorio}
          disabled={gerandoRelatorio}
          className="btn-primario flex items-center gap-2"
        >
          {gerandoRelatorio ? (
            <>
              <span className="animate-spin">⏳</span> Gerando Excel...
            </>
          ) : (
            '📥 Exportar Excel'
          )}
        </button>
      </div>

      {mensagemRelatorio && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          {mensagemRelatorio}
        </div>
      )}

      {/* Cartões de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CartaoEstatistica
          titulo="Total de Pedidos"
          valor={estatisticas?.totalPedidos ?? 0}
          descricao="Todos os períodos"
          icone="🛒"
          corIcone="bg-blue-100"
        />
        <CartaoEstatistica
          titulo="Faturamento (30d)"
          valor={formatarMoeda(estatisticas?.faturamentoTotal ?? 0)}
          descricao="Pedidos concluídos"
          icone="💰"
          corIcone="bg-green-100"
        />
        <CartaoEstatistica
          titulo="Ticket Médio"
          valor={formatarMoeda(estatisticas?.ticketMedio ?? 0)}
          descricao="Por pedido concluído"
          icone="📈"
          corIcone="bg-purple-100"
        />
        <CartaoEstatistica
          titulo="Concluídos"
          valor={
            estatisticas?.pedidosPorStatus.find((s) => s.status === 'CONCLUIDO')?.quantidade ?? 0
          }
          descricao={`de ${estatisticas?.totalPedidos ?? 0} pedidos`}
          icone="✅"
          corIcone="bg-emerald-100"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos por status */}
        <div className="card">
          <h3 className="text-base font-semibold text-slate-700 mb-5">Pedidos por Status</h3>
          {dadosGraficoStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dadosGraficoStatus} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  formatter={(valor) => [valor, 'Pedidos']}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="quantidade" name="Pedidos" radius={[4, 4, 0, 0]}>
                  {dadosGraficoStatus.map((entry, index) => (
                    <Cell key={index} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-slate-400 text-sm">
              Sem dados de pedidos
            </div>
          )}
        </div>

        {/* Faturamento por dia */}
        <div className="card">
          <h3 className="text-base font-semibold text-slate-700 mb-5">
            Faturamento Diário (30 dias)
          </h3>
          {dadosGraficoFaturamento.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={dadosGraficoFaturamento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="data" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) =>
                    new Intl.NumberFormat('pt-BR', {
                      notation: 'compact',
                      style: 'currency',
                      currency: 'BRL',
                    }).format(v)
                  }
                />
                <Tooltip
                  formatter={(valor: number) => [formatarMoeda(valor), 'Faturamento']}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name="Faturamento"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-slate-400 text-sm">
              Sem dados de faturamento nos últimos 30 dias
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
