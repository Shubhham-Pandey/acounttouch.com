// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import { useNavigate } from "react-router-dom";
// import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
// import Swal from "sweetalert2";
// import {
//   deleteTaskService,
//   getTaskListService,
// } from "../../../services/restApi/task";

// interface Task {
//   id: number;
//   title: string;
//   status: string;
//   priority: string;
//   client_id: number;
//   created_at: string;
// }

// type PriorityType = "low" | "medium" | "high" | "urgent";
// type StatusType = "pending" | "started" | "completed";

// export default function TasksTable() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   const [search, setSearch] = useState("");
//   const [priority, setPriority] = useState<PriorityType | "">("");
//   const [status, setStatus] = useState<StatusType | "">("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTasks();
//   }, [page, search, priority, status]);

//   const fetchTasks = async () => {
//     const res = await getTaskListService({
//       page,
//       page_size: 10,
//       search,
//       priority: priority || undefined,
//       status: status || undefined,
//     });

//     if (res?.results) {
//       setTasks(res.results);
//       setTotalCount(res.count);
//       setTotalPages(Math.ceil(res.count / 10));
//     }
//   };

//   const handleDelete = async () => {
//     if (deleteId !== null) {
//       const success = await deleteTaskService(deleteId);
//       if (success) {
//         setTasks((prev) => prev.filter((task) => task.id !== deleteId));
//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: "Task deleted successfully!",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Something went wrong!",
//         });
//       }
//       setDeleteId(null);
//     }
//   };

//   return (
//     <>
//       {/* Filters */}
//       <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-3 py-2 border rounded"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />

//         <select
//           className="px-3 py-2 border rounded"
//           value={priority}
//           onChange={(e) => {
//             setPriority(e.target.value as PriorityType | "");
//             setPage(1);
//           }}
//         >
//           <option value="">All Priorities</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//           <option value="urgent">Urgent</option>
//         </select>

//         <select
//           className="px-3 py-2 border rounded"
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value as StatusType | "");
//             setPage(1);
//           }}
//         >
//           <option value="">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="started">Started</option>
//           <option value="completed">Completed</option>
//           <option value="draft">Draft</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//         <div className="max-w-full overflow-x-auto">
//           <div className="min-w-[1600px]">
//             <Table>
//               <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//                 <TableRow>
//                   <TableCell isHeader>ID</TableCell>
//                   <TableCell isHeader>Title</TableCell>
//                   <TableCell isHeader>Status</TableCell>
//                   <TableCell isHeader>Priority</TableCell>
//                   <TableCell isHeader>Client ID</TableCell>
//                   <TableCell isHeader>Created At</TableCell>
//                   <TableCell isHeader>Actions</TableCell>
//                 </TableRow>
//               </TableHeader>
//               <TableBody className="text-center divide-y divide-gray-100 dark:divide-white/[0.05]">
//   {tasks.map((task) => (
//     <TableRow key={task.id}>
//       <TableCell className="text-center">{task.id}</TableCell>
//       <TableCell className="text-center">{task.title}</TableCell>
//       <TableCell className="text-center">{task.status}</TableCell>
//       <TableCell className="text-center">{task.priority}</TableCell>
//       <TableCell className="text-center">{task.client.id}</TableCell>
//       <TableCell className="text-center">{new Date(task.created_at).toLocaleDateString()}</TableCell>
//       <TableCell className="flex justify-center items-center">
//         <div className="space-x-4 text-lg text-gray-600 dark:text-white/70">
//           <button onClick={() => navigate(`/tasks/view/${task.id}`)} title="View">
//             <FiEye className="hover:text-blue-500" />
//           </button>
//           <button onClick={() => navigate(`/manage-task/${task.id}`)} title="Edit">
//             <FiEdit className="hover:text-green-500" />
//           </button>
//           <button onClick={() => setDeleteId(task.id)} title="Delete">
//             <FiTrash2 className="hover:text-red-500" />
//           </button>
//         </div>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

//             </Table>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       {totalCount > 10 && (
//         <div className="flex justify-center mt-4 space-x-2">
//           <button
//             disabled={page === 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2">
//             {page} / {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//             onClick={() => setPage((prev) => prev + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteId !== null && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
//               Delete Confirmation
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Are you sure you want to delete this task?
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded"
//                 onClick={() => setDeleteId(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 onClick={handleDelete}
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  deleteTaskService,
  getTaskListService,
} from "../../../services/restApi/task";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  client_id: number;
  created_at: string;
}

type PriorityType = "low" | "medium" | "high" | "urgent";
type StatusType = "pending" | "started" | "completed";

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<PriorityType | "">("");
  const [status, setStatus] = useState<StatusType | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [page, search, priority, status]);

  const fetchTasks = async () => {
    const res = await getTaskListService({
      page,
      page_size: 10,
      search,
      priority: priority || undefined,
      status: status || undefined,
    });

    if (res?.results) {
      setTasks(res.results);
      setTotalCount(res.count);
      setTotalPages(Math.ceil(res.count / 10));
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      const success = await deleteTaskService(deleteId);
      if (success) {
        setTasks((prev) => prev.filter((task) => task.id !== deleteId));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Task deleted successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
      }
      setDeleteId(null);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="px-3 py-2 border rounded"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value as PriorityType | "");
            setPage(1);
          }}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <select
          className="px-3 py-2 border rounded"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as StatusType | "");
            setPage(1);
          }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1600px]">
            <Table className="border-separate border-spacing-y-4">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700">
                  <TableCell isHeader>ID</TableCell>
                  <TableCell isHeader>Title</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Priority</TableCell>
                  <TableCell isHeader>Client ID</TableCell>
                  <TableCell isHeader>Created At</TableCell>
                  <TableCell isHeader>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition rounded-lg"
                  >
                    <TableCell className="text-center">{task.id}</TableCell>
                    <TableCell className="text-center">{task.title}</TableCell>
                    <TableCell className="text-center capitalize">{task.status}</TableCell>
                    <TableCell className="text-center capitalize">{task.priority}</TableCell>
                    <TableCell className="text-center">{task.client.id}</TableCell>
                    <TableCell className="text-center">
                      {new Date(task.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-4">
                      <button onClick={() => navigate(`/tasks/view/${task.id}`)} title="View">
                        <FiEye className="hover:text-blue-500 text-lg" />
                      </button>
                      <button onClick={() => navigate(`/manage-task/${task.id}`)} title="Edit">
                        <FiEdit className="hover:text-green-500 text-lg" />
                      </button>
                      <button onClick={() => setDeleteId(task.id)} title="Delete">
                        <FiTrash2 className="hover:text-red-500 text-lg" />
                      </button>
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
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Prev
          </button>
          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Delete Confirmation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

