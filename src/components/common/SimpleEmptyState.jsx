import Link from "next/link";

const SimpleEmptyState = ({
  icon,
  title,
  description,
  actionPath = "/products",
  actionLabel = "Start Shopping",
}) => {
  return (
    <div className="py-24 text-center max-w-md mx-auto" suppressHydrationWarning>
      <div className="text-5xl mb-6 opacity-30 select-none" suppressHydrationWarning>
        {icon}
      </div>
      <h2
        className="text-xl font-black text-primary uppercase tracking-widest mb-3"
        suppressHydrationWarning
      >
        {title}
      </h2>
      <p
        className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed"
        suppressHydrationWarning
      >
        {description}
      </p>
      <Link
        href={actionPath}
        className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors border-b-2 border-secondary/20 hover:border-primary pb-1"
      >
        {actionLabel}
      </Link>
    </div>
  );
};
export default SimpleEmptyState;
