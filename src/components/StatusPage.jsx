import Link from "next/link";
import StatusAction from "./StatusAction";

export default function StatusPage({
  statusCode,
  title,
  description,
  type = "primary",
  actionText,
  actionHref,
  onAction,
}) {
  const isErrorType = type === "error";

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
      <div className="container px-4">
        <div
          className={`${
            isErrorType
              ? "bg-error-bg border border-error-border p-8 rounded-lg shadow-sm max-w-lg mx-auto"
              : ""
          } transition-all duration-300`}
        >
          <h1
            className={`${
              isErrorType ? "text-error text-7xl" : "text-primary text-9xl"
            } font-extrabold mb-4`}
          >
            {statusCode}
          </h1>
          <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
          <p className="max-w-md mx-auto mb-10 text-zinc-600 leading-relaxed">{description}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <StatusAction
              onAction={onAction}
              actionText={actionText}
              actionHref={actionHref}
              isErrorType={isErrorType}
            />

            {isErrorType && actionHref !== "/" && (
              <Link
                href="/"
                className="btn border border-zinc-300 bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
              >
                Go Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
