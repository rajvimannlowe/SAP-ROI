import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Back', className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-muted-foreground',
        'hover:text-[#4160F0] transition-colors',
        'mb-2',
        className
      )}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

