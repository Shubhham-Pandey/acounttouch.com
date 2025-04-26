import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { addCategoryService, updateCategoryService, getCategoryDetailsService } from "../../../services/restApi/category";

export default function AddOrEditCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null as File | null,
    imageUrl: "", // ✅ used for preview in edit mode
  });

  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const data = await getCategoryDetailsService(id as string);
        setCategory({
          name: data.name || "",
          description: data.description || "",
          image: null, // don't prefill file input
          imageUrl: data.image || "", // ✅ image preview URL
        });
      })();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!category.name.trim()) {
      alert("Category name is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description || "");
    if (category.image) {
      formData.append("image", category.image);
    }

    const result = isEdit
    ? await updateCategoryService(id as string, formData) // ✅ CORRECT ORDER
    : await addCategoryService(formData);

    if (result?.id) {
      alert(`Category ${isEdit ? "updated" : "added"} successfully!`);
      navigate("/category-list"); // ✅ your categories list route
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <CategoryForm
      category={category}
      setCategory={setCategory}
      onSubmit={handleSubmit}
      editMode={isEdit}
    />
  );
}
