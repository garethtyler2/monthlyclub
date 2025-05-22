import { CheckCircle2 } from "lucide-react"

type RadioCardProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  icon?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioCard = ({
  id,
  name,
  value,
  label,
  icon,
  checked,
  onChange,
}: RadioCardProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="flex h-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white p-4 text-center text-sm transition-all cursor-pointer peer-checked:border-fitness-primary peer-checked:bg-fitness-light peer-checked:font-medium"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        
      </label>
      <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-fitness-primary opacity-0 transition-opacity peer-checked:opacity-100" />
    </div>
  );
};