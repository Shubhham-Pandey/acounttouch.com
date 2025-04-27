import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getUserListService } from "../../../services/restApi/user";
import { Eye, Trash } from "lucide-react";
import Swal from "sweetalert2";

interface Order {
  id: number;
  phone_number: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  roles: string[];
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
  created_by: {
    id: number;
    email: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
  };
  assigned_to: string | null;
  pan_card?: string;
  aadhar_card?: string;
}

export default function UserTableOne() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // New: Search and Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchUsers = async () => {
    const params: any = {
      page,
      page_size: pageSize,
    };

    if (searchTerm) params.search = searchTerm;
    if (roleFilter) params.role = roleFilter; // Send role as a string, not an integer
    if (statusFilter) params.is_active = statusFilter === "true"; // Send boolean value for active/inactive

    const res = await getUserListService(params);

    if (res && Array.isArray(res.results)) {
      setTableData(res.results);
      setTotalCount(res.count || 0);
    } else {
      console.error("Failed to fetch user list.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, roleFilter, statusFilter]);

  const showDetails = (order: Order) => {
    navigate(`/user-details/${order.id}`, { state: { hideFields: true } });
    return;
  };

  const handleDelete = async (id: number) => {
    // Show custom confirmation modal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true, // Optional: Switch confirm and cancel button positions
    });
  
    // If user confirms (clicks 'Yes, delete it!')
    if (result.isConfirmed) {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const accessToken = auth?.access;
      try {
        const response = await fetch(
          `https://api.accountouch.com/api/users/users/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        // If the response status is 204 (no content), no need to parse JSON
        if (response.status === 204) {
          // Update the table state by removing the deleted user from the tableData
          setTableData((prevUsers: any) =>
            prevUsers.filter((user: any) => user.id !== id)
          );
          // Show success alert
          Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    timer: 2000, // 2 seconds
                    showConfirmButton: false, // OK button hatana
                  });
        } else {
          // Handle unexpected response status
          Swal.fire("Error", "There was a problem deleting the user.", "error");
        }
      } catch (e) {
        console.log("Something went wrong in delete API", e);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // reset to page 1 when searching
  };

  const handleRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, phone, email, PAN, Aadhar"
          className="px-4 py-2 border rounded-md w-60"
        />

        <select
          value={roleFilter}
          onChange={handleRoleFilter}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Checker">Checker</option>
          <option value="Maker">Maker</option>
          <option value="Franchise">Franchise</option>
          <option value="Client">Client</option>
        </select>

        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    User name
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Phone Number
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Email
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Roles
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Assigned To
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.full_name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {new Date(order.date_joined).toDateString()}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.phone_number}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.email || "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.roles?.join(", ")}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.assigned_to || "-"}
                    </TableCell>
                    <TableCell className="flex items-center gap-3 px-4 py-3">
                      <Eye
                        className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => showDetails(order)}
                      />
                      <Trash
                        className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDelete(order.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalCount > 10 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-sm">
            Page {page} of {Math.ceil(totalCount / pageSize)}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= Math.ceil(totalCount / pageSize)}
            className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
