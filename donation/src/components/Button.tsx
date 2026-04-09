interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400';
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {label}
    </button>
  );
};
