import type { ReactNode } from "react";

export type Column<T> =
  | {
      key: keyof T;
      header: string;
      align?: "left" | "center" | "right";
      render?: never;
    }
  | {
      key?: never;
      header: string;
      align?: "left" | "center" | "right";
      render: (row: T) => ReactNode;
    };

interface DataTableProps<T> {
  data?: T[];
  columns?: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

const DataTable = <T,>({
  data = [], // default
  columns = [], // default
  loading = false,
  emptyMessage = "No data found",
}: DataTableProps<T>) => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm text-slate-400">
        <thead className="bg-slate-800 text-xs uppercase text-slate-400">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 ${
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                      ? "text-right"
                      : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-slate-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-800/40 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 ${
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                          ? "text-right"
                          : ""
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.key] != null
                        ? String(row[col.key])
                        : ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;