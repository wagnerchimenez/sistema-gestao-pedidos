import { useState } from 'react'
import { CriarPedidoInput } from '../tipos/pedido.tipos'
import { pedidosServico } from '../servicos/pedidos.servico'

interface Props {
  aoFechar: () => void
  aoSalvar: () => void
}

type UIItem = {
  nomeProduto: string
  quantidade: number
  precoUnitarioStr: string
}

const uiItemVazio = (): UIItem => ({
  nomeProduto: '',
  quantidade: 1,
  precoUnitarioStr: '0,00',
})

function parsePrecoString(value: string): number {
  if (!value) return 0
  const cleaned = String(value).trim().replace(/\s/g, '').replace(/[R$\u00A0]/g, '')
  let normalized = cleaned
  if (normalized.indexOf(',') > -1 && normalized.indexOf('.') > -1) {
    normalized = normalized.replace(/\./g, '').replace(',', '.')
  } else {
    normalized = normalized.replace(',', '.')
  }
  const num = Number(normalized)
  return Number.isFinite(num) ? num : 0
}

function formatPrecoForDisplay(value: string): string {
  const num = parsePrecoString(value)
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ModalCriarPedido({ aoFechar, aoSalvar }: Props) {
  const [nomeCliente, setNomeCliente] = useState('')
  const [emailCliente, setEmailCliente] = useState('')
  const [itens, setItens] = useState<UIItem[]>([uiItemVazio()])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  function atualizarItem(indice: number, campo: keyof UIItem, valor: string | number) {
    setItens((prev) => prev.map((item, i) => (i === indice ? { ...item, [campo]: valor } : item)))
  }

  function adicionarItem() {
    setItens((prev) => [...prev, itemVazio()])
  }

  function removerItem(indice: number) {
    setItens((prev) => prev.filter((_, i) => i !== indice))
  }

  const totalPedido = itens.reduce((soma, item) => soma + item.quantidade * parsePrecoString(item.precoUnitarioStr), 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      const itensParaEnvio = itens.map((it) => ({
        nomeProduto: it.nomeProduto,
        quantidade: it.quantidade,
        precoUnitario: parsePrecoString(it.precoUnitarioStr),
      }))

      const input: CriarPedidoInput = { nomeCliente, emailCliente, itens: itensParaEnvio }
      await pedidosServico.criar(input)
      aoSalvar()
    } catch (err: any) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Novo Pedido</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {erro}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Cliente</label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Maria Silva"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <input
                type="email"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="maria@email.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Itens do Pedido</label>
              <button type="button" onClick={adicionarItem} className="btn-secundario py-1">
                + Adicionar Item
              </button>
            </div>

            <div className="space-y-3">
              {itens.map((item, indice) => (
                <div key={indice} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    {indice === 0 && (
                      <label className="block text-xs text-slate-500 mb-1">Produto</label>
                    )}
                    <input
                      type="text"
                      value={item.nomeProduto}
                      onChange={(e) => atualizarItem(indice, 'nomeProduto', e.target.value)}
                      required
                      placeholder="Nome do produto"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    {indice === 0 && <label className="block text-xs text-slate-500 mb-1">Qtd</label>}
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => atualizarItem(indice, 'quantidade', Number(e.target.value))}
                      required
                      min="1"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-3">
                    {indice === 0 && (
                      <label className="block text-xs text-slate-500 mb-1">Preço Unit.</label>
                    )}
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9,.]*"
                      value={item.precoUnitarioStr}
                      onChange={(e) => atualizarItem(indice, 'precoUnitarioStr', e.target.value)}
                      onBlur={() => atualizarItem(indice, 'precoUnitarioStr', formatPrecoForDisplay(item.precoUnitarioStr))}
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    {itens.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removerItem(indice)}
                        className="text-red-500 hover:text-red-700 text-sm px-2 py-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-right text-sm font-semibold text-slate-700">
              Total:{' '}
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                totalPedido,
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={aoFechar} className="btn-secundario">
              Cancelar
            </button>
            <button type="submit" disabled={carregando} className="btn-primario">
              {carregando ? 'Salvando...' : 'Criar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
