import Breadcrumb from "./Breadcrumb";

const PageLayout = ({
  children,
  breadcrumbItems = [],
  className = "",
  containerClassName = "",
  suppressHydration = true,
}) => {
  return (
    <div className={`py-12 bg-white min-h-screen ${className}`} suppressHydrationWarning>
      <div className={`container ${containerClassName}`} suppressHydrationWarning>
        <Breadcrumb items={breadcrumbItems} />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
