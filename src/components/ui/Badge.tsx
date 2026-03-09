interface BadgeProps {
  children: React.ReactNode;
  variante?: 'accent' | 'neutral';
}

export function Badge({ children, variante = 'accent' }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center px-3 py-1 rounded text-xs font-medium uppercase tracking-wider';

  const varianteClasses =
    variante === 'accent'
      ? 'bg-accent/10 border border-accent/30 text-accent'
      : 'bg-surface-border/50 text-text-secondary border border-surface-border';

  return (
    <span className={`${baseClasses} ${varianteClasses}`}>
      {children}
    </span>
  );
}
