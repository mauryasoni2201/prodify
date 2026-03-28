"use client";
import Link from "next/link";
export default function StatusAction({ onAction, actionText, actionHref }) {
  if (onAction) {
    return (
      <button onClick={onAction} className="btn secondary">
        {actionText || "Try again"}
      </button>
    );
  }
  return (
    <Link href={actionHref || "/"} className="btn primary">
      {actionText || "Return Home"}
    </Link>
  );
}
