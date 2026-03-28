const ProductSpecs = ({ product }) => {
  if (!product) return null;

  const specItems = [
    { label: "Return Policy", value: product.returnPolicy },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Weight", value: `${product.weight} kg` },
    { label: "Min. Order", value: `${product.minimumOrderQuantity} unit` },
    {
      label: "Dimensions",
      value: `${product.dimensions?.width}x${product.dimensions?.height}x${product.dimensions?.depth} cm`,
    },
    { label: "Availability", value: product.availabilityStatus },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12 pt-10 border-t border-zinc-100">
      {specItems.map((spec, i) => (
        <div key={i} className="flex flex-col gap-1.5 group">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            {spec.label}
          </span>
          <span className="text-base font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
            {spec.value || "Not Specified"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecs;
