import { VarianteBotao, TamanhoBotao } from '@/types';

interface BotaoProps {
  variante: VarianteBotao;
  tamanho?: TamanhoBotao;
  href?: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const varianteClasses: Record<VarianteBotao, string> = {
  primary:
    'bg-accent text-background font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors duration-200 inline-flex items-center gap-2',
  secondary:
    'border-2 border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-200 inline-flex items-center gap-2',
  ghost:
    'text-white hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline inline-flex items-center gap-2',
};

const tamanhoClasses: Record<TamanhoBotao, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Botao({
  variante,
  tamanho = 'md',
  href,
  target,
  children,
  className = '',
  ariaLabel,
  onClick,
}: BotaoProps) {
  const baseClasses = 'rounded-sm font-sans cursor-pointer';
  const classes = `${baseClasses} ${varianteClasses[variante]} ${tamanhoClasses[tamanho]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
