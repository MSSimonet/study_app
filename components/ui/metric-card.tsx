interface MetricCardProps {
  title: string
  value: string | number
  icon: string
  color: string
}

export function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div
      className={`p-6 bg-slate-800 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-xl hover:shadow-${color}/20 transform hover:scale-[1.01] border-t-4 border-${color}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
        <div className={`text-2xl text-${color}`}>{icon}</div>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
