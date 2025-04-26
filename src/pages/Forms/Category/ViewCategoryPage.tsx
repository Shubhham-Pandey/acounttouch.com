import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryDetailsService } from "../../../services/restApi/category";

export default function ViewCategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getCategoryDetailsService(id);
        setCategory(data);
      }
    })();
  }, [id]);

  if (!category) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-8 shadow">
      <h1 className="text-2xl font-semibold mb-4">Category Details</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-medium text-gray-700 dark:text-gray-300">Name</h2>
          <p className="text-gray-900 dark:text-white">{category.name}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700 dark:text-gray-300">Description</h2>
          <p className="text-gray-800 dark:text-gray-300">
            {category.description || "-"}
          </p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700 dark:text-gray-300">Image</h2>
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-48 h-48 object-cover rounded border"
            />
          ) : (
            <p className="text-gray-500">No image</p>
          )}
        </div>
      </div>
    </div>
  );
}
