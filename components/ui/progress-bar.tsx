interface ProgressBarProps {
  label: string
  progress: number
  color: string
  estimated?: number
  logged?: number
}

export function ProgressBar({ label, progress, color, estimated, logged }: ProgressBarProps) {
  const baseColor = color.split("-")[0]

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-slate-300">{label}</span>
        <span className={`text-${baseColor}-400`}>{progress}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mt-1 overflow-hidden shadow-inner">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out bg-${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {estimated !== undefined && estimated > 0 && (
        <div className="mt-1 text-xs text-slate-500 flex justify-between">
          <span>{logged}h registradas</span>
          <span>{estimated}h estimadas</span>
        </div>
      )}
    </div>
  )
}
