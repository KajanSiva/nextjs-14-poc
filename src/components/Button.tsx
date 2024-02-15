import clsx from 'clsx'

type ButtonProps = {
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  dataTestId?: string;
}

export default function Button({ disabled, label, onClick, children, dataTestId, variant = 'primary' }: ButtonProps) {
  return (
    <button
    className={clsx(
      'min-w-[40px] p-1 rounded flex justify-center',
      variant === 'primary' && 'bg-gray-700 text-white disabled:bg-gray-300 hover:bg-gray-950',
      variant === 'secondary' && 'bg-gray-100 text-black disabled:text-gray-400 hover:bg-gray-400'
      )}
      data-testid={dataTestId || null}
      disabled={disabled}
      onClick={onClick}
    >{label || children}</button>
  )
}