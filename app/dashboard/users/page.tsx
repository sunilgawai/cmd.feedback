import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamListSkeleton } from "@/components/teams/team-list";
import { DataTable } from "@/components/ui/data-table";
import { Suspense } from "react";
import { getAllUsers } from "./actions";
// Example data for DataTable
const columns = [
  { accessorKey: "usercode", header: "User Code" },
  { accessorKey: "username", header: "User Name" },
  { accessorKey: "balance", header: "Balance" },
  { accessorKey: "account", header: "Account No." },
  { accessorKey: "ifsc", header: "IFSC" },
  {
    accessorKey: "status",
    header: "User Status"
  },
  { accessorKey: "waggering", header: "Waggering" },
];

export default async function UsersPage() {
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   async function getUsers() {
  //     const users = await getAllUsers();
  //     setUsers(users);
  //     console.log("users", users);
  //   }
  //   getUsers();
  // }, []);
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <CreateTeamDialog />
      </div>
      <Card>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            {users.length > 0 ? (
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <DataTable
                      columns={columns}
                      data={users}
                      searchKey="name"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">No users found</p>
              </div>
            )}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
