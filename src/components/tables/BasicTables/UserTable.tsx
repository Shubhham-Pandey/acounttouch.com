// import { useNavigate } from "react-router";
// import { useEffect, useState } from "react"; // ✅ For API + State

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import { getUserListService } from "../../../services/restApi/user";
// import { Eye, Trash } from "lucide-react";

// // ✅ Interface stays the same
// interface Order {
//   id: number;
//   phone_number: string;
//   email: string | null;
//   first_name: string;
//   last_name: string;
//   full_name: string;
//   roles: string[];
//   is_active: boolean;
//   is_staff: boolean;
//   is_superuser: boolean;
//   date_joined: string;
//   last_login: string | null;
//   created_by: {
//     id: number;
//     email: string | null;
//     first_name: string;
//     last_name: string;
//     full_name: string;
//   };
//   assigned_to: string | null;
// }

// export default function UserTableOne() {
//   const navigate = useNavigate();

//   // ✅ Replace static tableData with state
//   const [tableData, setTableData] = useState<Order[]>([]);

//   // ✅ Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await getUserListService();
//       console.log(res, 'res');
    
//       if (res && Array.isArray(res.results)) {
//         setTableData(res.results); // <- set the user list from `results`
//       } else {
//         console.error("Failed to fetch user list.");
//       }
//     };
//     fetchUsers();
//   }, []);

//   const showDetails = (order: Order) => {
//     navigate(`/user-details/${order.id}`);
//     return;
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this?")) {
//       // perform delete logic here
//       const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    
//       const accessToken = auth?.access;
//       try {
//         const response = await fetch(`https://api.accountouch.com/api/users/users/${id}/`, {
//           method: "DELETE",
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//           },     
//         });
//         const data = await response.json(); // parse the response body
//         return data;
//       } catch (e) {
//         console.log("Something went wrong in signUp API", e);
//       }
//     }
//   };

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <div className="min-w-[1102px]">
//           <Table>
//             {/* Table Header */}
//             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//               <TableRow>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   User name
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Phone Number
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Roles
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Assigned To
//                 </TableCell>
//                 <TableCell
//                   isHeader
//                   className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//                 >
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHeader>

//             {/* Table Body */}
//             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//               {tableData.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell className="px-5 py-4 sm:px-6 text-start">
//                     <div className="flex items-center gap-3">
//                       <div>
//                         <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                           {order.full_name}
//                         </span>
//                         <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                           {new Date(order.date_joined).toDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                     {order.phone_number}
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                     {order.roles?.join(", ")}
//                   </TableCell>
//                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                     {order.assigned_to || "-"}
//                   </TableCell>
//                   <TableRow key={order.id}>
//   {/* Show Details with Eye Icon */}
//   <TableCell
//     onClick={() => showDetails(order)}
//     className="cursor-pointer px-4 py-3 text-blue-600 hover:text-blue-800 text-theme-sm"
//   >
//     <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800" />
//   </TableCell>

//   {/* Delete Action */}
//   <TableCell
//     onClick={() => handleDelete(order.id)}
//     className="cursor-pointer px-4 py-3 text-red-600 hover:text-red-800 text-theme-sm"
//   >
//   <Trash className="w-5 h-5 text-red-600 hover:text-red-800" />  </TableCell>
// </TableRow>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

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

interface Order {
  id: number;
  phone_number: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  roles: string[];
  is_active: boolean;
  // is_staff: boolean;
  // is_superuser: boolean;
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
}

export default function UserTableOne() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = async () => {
    const params = {
      page,
      page_size: pageSize,
    };

    const res = await getUserListService(params);
    console.log(res, 'res');

    if (res && Array.isArray(res.results)) {
      setTableData(res.results);
      setTotalCount(res.count || 0);
    } else {
      console.error("Failed to fetch user list.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const showDetails = (order: Order) => {
    // navigate(`/user-details/${order.id}`);
    navigate(`/user-details/${order.id}`, { state: { hideFields: true } });

    return;
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const accessToken = auth?.access;
      try {
        const response = await fetch(`https://api.accountouch.com/api/users/users/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        const data = await response.json();
        fetchUsers(); // refresh after delete
        return data;
      } catch (e) {
        console.log("Something went wrong in delete API", e);
      }
    }
  };

  return (
    <>
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
                    Roles
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
                      {order.roles?.join(", ")}
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

      {/* Pagination - show only if totalCount > 10 */}
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
