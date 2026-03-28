import { toast } from "sonner";

export const showToast = {
  success: (message, options = {}) =>
    toast.success(message, {
      ...options,
      className:
        "!bg-emerald-50 !text-emerald-900 !border-emerald-100 !rounded-xl !font-bold !text-sm",
    }),
  error: (message, options = {}) =>
    toast.error(message, {
      ...options,
      className: "!bg-rose-50 !text-rose-900 !border-rose-100 !rounded-xl !font-bold !text-sm",
    }),
  info: (message, options = {}) =>
    toast.info(message, {
      ...options,
      className: "!bg-amber-50 !text-amber-900 !border-amber-100 !rounded-xl !font-bold !text-sm",
    }),
  remove: (message, options = {}) =>
    toast(message, {
      ...options,
      className: "!bg-rose-50 !text-rose-900 !border-rose-100 !rounded-xl !font-bold !text-sm",
    }),
};
