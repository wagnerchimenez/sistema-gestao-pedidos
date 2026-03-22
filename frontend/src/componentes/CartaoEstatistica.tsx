interface Props {
  titulo: string
  valor: string | number
  descricao?: string
  corIcone?: string
  icone: string
}

export function CartaoEstatistica({ titulo, valor, descricao, corIcone = 'bg-blue-100', icone }: Props) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`${corIcone} rounded-xl p-3 text-2xl`}>{icone}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-500 font-medium">{titulo}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5 truncate">{valor}</p>
        {descricao && <p className="text-xs text-slate-400 mt-1">{descricao}</p>}
      </div>
    </div>
  )
}
