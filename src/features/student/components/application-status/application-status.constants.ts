export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export const orbConfig = {
  PENDING: { a: "bg-primary", b: "bg-blue-500", c: "bg-amber-500" },
  APPROVED: { a: "bg-emerald-500", b: "bg-teal-500", c: "bg-blue-500" },
  REJECTED: { a: "bg-red-500", b: "bg-orange-500", c: "bg-slate-500" },
};