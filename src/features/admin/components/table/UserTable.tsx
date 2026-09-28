import DataTable, { type Column } from "@/components/common/table/Table";

export type UserStatus = "Active" | "Blocked" | "Suspended";

export interface UserTableRow {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  courses: number;
  coins: number;
  status: UserStatus;
  joined: string;
  avatar: string;
}

interface UserTableProps {
  rows: UserTableRow[];
  loading?: boolean;
  onActionClick?: (action: string, user: UserTableRow) => void;
}

const statusStyles: Record<UserStatus, string> = {
  Active: "text-green-400",
  Blocked: "text-red-400",
  Suspended: "text-yellow-400",
};

const UserTable = ({
  rows,
  loading = false,
  onActionClick,
}: UserTableProps) => {
  const columns: Column<UserTableRow>[] = [
    {
      header: "User",
      render: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full border border-slate-600"
          />
          <div>
            <p className="text-white">{user.name}</p>
            <p className="text-xs text-slate-500">ID: {user.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      render: (user) => (
        <div>
          {user.email}
          {user.verified && <span className="ml-1 text-green-500">✔</span>}
        </div>
      ),
    },
    {
      key: "courses",
      header: "Courses",
      align: "center",
    },
    {
      header: "Coins",
      align: "right",
      render: (user) => `₹${user.coins}`,
    },
    {
      header: "Status",
      align: "center",
      render: (user) => (
        <span className={statusStyles[user.status]}>{user.status}</span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
    },
    {
      header: "Actions",
      align: "right",
      render: (user) => (
        <div className="flex justify-end">
          <button
            onClick={() => onActionClick?.("menu", user)}
            className="text-slate-400 hover:text-white"
          >
            ⋮
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={rows}
      columns={columns}
      loading={loading}
      emptyMessage="No users found"
    />
  );
};

export default UserTable;