interface CardProps {
  destaque?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Card({ destaque = false, children, className = '' }: CardProps) {
  const baseClasses =
    'bg-surface border rounded-card p-8 transition-colors duration-300';
  const bordaClasses = destaque
    ? 'border-accent shadow-accent-glow'
    : 'border-surface-border hover:border-accent/30';

  return (
    <div className={`${baseClasses} ${bordaClasses} ${className}`}>
      {children}
    </div>
  );
}
