interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

