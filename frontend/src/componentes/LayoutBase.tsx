import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ItemNavegacao {
  para: string
  rotulo: string
  icone: string
}

const itensNavegacao: ItemNavegacao[] = [
  { para: '/', rotulo: 'Dashboard', icone: '📊' },
  { para: '/pedidos', rotulo: 'Pedidos', icone: '📋' },
]

interface Props {
  children: React.ReactNode
}

export function LayoutBase({ children }: Props) {
  const localizacao = useLocation()

  return (
    <div className="min-h-screen flex">
      {/* Barra lateral */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-blue-600">
          <h1 className="text-lg font-bold leading-tight">
            📦 Gestão de<br />Pedidos
          </h1>
          <p className="text-blue-200 text-xs mt-1">Painel Administrativo</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {itensNavegacao.map((item) => {
              const ativo = localizacao.pathname === item.para
              return (
                <li key={item.para}>
                  <Link
                    to={item.para}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      ativo
                        ? 'bg-white text-blue-700'
                        : 'text-blue-100 hover:bg-blue-600'
                    }`}
                  >
                    <span>{item.icone}</span>
                    {item.rotulo}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 text-xs text-blue-300 border-t border-blue-600">
          <p>NestJS + React + TypeScript</p>
          <p>DDD + Arquitetura Hexagonal</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {itensNavegacao.find((i) => i.para === localizacao.pathname)?.rotulo ?? 'Sistema'}
              </h2>
            </div>
            <span className="text-sm text-slate-500">
              {new Date().toLocaleDateString('pt-BR', { dateStyle: 'long' })}
            </span>
          </div>
        </header>

        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  )
}
