import Link from "next/link";

const Pagination = ({ totalItems, itemsPerPage, currentPage, baseUrl }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageUrl = (page) => {
    const url = new URL(baseUrl, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    url.searchParams.set("page", page);
    return `${url.pathname}${url.search}`;
  };

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    let pageNum;
    if (totalPages <= 5) pageNum = i + 1;
    else if (currentPage <= 3) pageNum = i + 1;
    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
    else pageNum = currentPage - 2 + i;
    return pageNum;
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`w-12 h-12 flex items-center justify-center rounded-xl border border-zinc-100 transition-all ${currentPage === 1 ? "opacity-50 pointer-events-none" : "hover:bg-zinc-50 hover:border-secondary shadow-sm"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={createPageUrl(p)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-sm transition-all border ${
            currentPage === p
              ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
              : "bg-white border-zinc-100 text-primary hover:border-secondary hover:text-secondary"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`w-12 h-12 flex items-center justify-center rounded-xl border border-zinc-100 transition-all ${currentPage === totalPages ? "opacity-50 pointer-events-none" : "hover:bg-zinc-50 hover:border-secondary shadow-sm"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default Pagination;
