import { CheckCircle2 } from "lucide-react"

type RadioCardProps = {
  id: string
  name: string
  value: string
  label: string
  icon?: React.ReactNode
}

export const RadioCard = ({ id, name, value, label, icon }: RadioCardProps) => {
  return (
    <div className="relative">
      <input 
        id={id}
        name={name}
        value={value}
        type="radio"
        className="peer sr-only"
      />
      <label 
        htmlFor={id}
        className="flex h-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white p-4 text-center text-sm transition-all peer-checked:border-fitness-primary peer-checked:bg-fitness-light peer-checked:font-medium cursor-pointer"
      >
        {icon}
        {label}
      </label>
      <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 opacity-0 transition-opacity peer-checked:opacity-100" />
    </div>
  )
}
