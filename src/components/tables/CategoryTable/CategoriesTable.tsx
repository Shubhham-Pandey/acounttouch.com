import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  getCategoryListService,
  deleteCategoryService,
} from "../../../services/restApi/category";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from 'sweetalert2';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
}

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    fetchCategories();
  }, [page, search, ordering]);

  const fetchCategories = async () => {
    const res = await getCategoryListService({ page, search, ordering });
    if (res?.results) {
      setCategories(res.results);
      setTotalPages(Math.ceil(res.count / 10)); // assuming 10 per page
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      const success = await deleteCategoryService(deleteId);
      if (success) {
        setCategories(prev => prev.filter(cat => cat.id !== deleteId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Deleted Successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Deleted!',
          text: 'Somthing Wrong!',
        });
      }
      setDeleteId(null);
    }
  };


  return (
    <>
      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
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
        {/* <select
          className="px-3 py-2 border rounded"
          value={ordering}
          onChange={(e) => {
            setOrdering(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Order By</option>
          <option value="name">Name ↑</option>
          <option value="-name">Name ↓</option>
        </select> */}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[850px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader>Name</TableCell>
                  <TableCell isHeader>Description</TableCell>
                  <TableCell isHeader>Image</TableCell>
                  <TableCell isHeader>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.description || "-"}</TableCell>
                    <TableCell>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4 text-lg text-gray-600 dark:text-white/70">
                        <button onClick={() => navigate(`/categories/view/${cat.id}`)} title="View">
                          <FiEye className="hover:text-blue-500" />
                        </button>
                        <button onClick={() => navigate(`/manage-category/${cat.id}`)} title="Edit">
                          <FiEdit className="hover:text-green-500" />
                        </button>
                        <button onClick={() => setDeleteId(cat.id)} title="Delete">
                          <FiTrash2 className="hover:text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Prev
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Delete Confirmation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this category?
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
