type ButtonProps = {
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode
}

export default function Button({ disabled, label, onClick, children }: ButtonProps) {
  return (
    <button
      className="bg-gray-700 block min-w-[40px] p-1 text-white disabled:bg-gray-300 hover:bg-gray-950 rounded"
      disabled={disabled}
      onClick={onClick}
    >{label || children}</button>
  )
}