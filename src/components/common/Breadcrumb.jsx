import Link from "next/link";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav
      className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide py-2"
      suppressHydrationWarning
    >
      <Link href="/" className="hover:text-secondary transition-all flex items-center gap-2 group">
        <span className="group-hover:translate-x-0.5 transition-transform">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2" suppressHydrationWarning>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-zinc-300 stroke-[3]"
            suppressHydrationWarning
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          {item.href ? (
            <Link href={item.href} className="hover:text-secondary transition-all group shrink-0">
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-primary font-black tracking-[0.25em] shrink-0">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
