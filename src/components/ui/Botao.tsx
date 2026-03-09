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
    'bg-accent text-background font-bold uppercase tracking-wider hover:brightness-110 hover:scale-[1.02] hover:shadow-accent-glow active:scale-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background inline-flex items-center gap-2',
  secondary:
    'border-2 border-accent text-accent hover:bg-accent hover:text-background active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background inline-flex items-center gap-2',
  ghost:
    'text-white hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent inline-flex items-center gap-2',
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
