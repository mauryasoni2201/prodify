const ProductReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-20 border-t border-zinc-100 pt-16">
      <h2 className="text-2xl font-bold text-primary mb-10">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev, index) => (
          <div key={index} className="p-6 rounded-xl border border-zinc-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={i < rev.rating ? "#ff6d1f" : "#e2e2e2"}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              ))}
            </div>
            <p className="text-primary font-medium mb-6 italic">"{rev.comment}"</p>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary tracking-tight">
                {rev.reviewerName}
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                {new Date(rev.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
