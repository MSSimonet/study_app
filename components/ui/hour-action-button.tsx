"use client"

interface HourActionButtonProps {
  taskId: string
  hours: number
  onClick: (taskId: string, hours: number) => void
  isDisabled: boolean
}

export function HourActionButton({ taskId, hours, onClick, isDisabled }: HourActionButtonProps) {
  return (
    <button
      onClick={() => onClick(taskId, hours)}
      disabled={isDisabled}
      className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-all duration-200 ${
        isDisabled
          ? "bg-slate-700 cursor-not-allowed opacity-50"
          : hours > 0
            ? "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/50 transform hover:scale-105"
            : "bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/50 transform hover:scale-105"
      }`}
      title={hours > 0 ? "Registrar +1 hora" : "Registrar -1 hora"}
    >
      {hours > 0 ? "+" : "-"}
    </button>
  )
}
