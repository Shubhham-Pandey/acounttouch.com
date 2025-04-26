import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

interface CategoryFormProps {
  category: {
    name: string;
    description?: string;
    image?: File | null;
    imageUrl?: string; // ✅ for preview
  };
  setCategory: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  editMode?: boolean;
}

const CategoryForm = ({ category, setCategory, onSubmit, editMode = false }: CategoryFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // If image is selected by user, create a preview
    if (category.image) {
      const filePreview = URL.createObjectURL(category.image);
      setPreview(filePreview);

      // Clean up URL.createObjectURL when component unmounts or image changes
      return () => URL.revokeObjectURL(filePreview);
    } else if (category.imageUrl) {
      // If editing and image URL exists
      setPreview(category.imageUrl);
    } else {
      setPreview(null);
    }
  }, [category.image, category.imageUrl]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <ComponentCard title={editMode ? "Edit Category" : "Add New Category"}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label htmlFor="name">Name</Label>
            <Input
              value={category.name}
              type="text"
              id="name"
              onChange={(e) =>
                setCategory((prev: any) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-6">
            <Label htmlFor="description">Description</Label>
            <Input
              value={category.description}
              type="text"
              id="description"
              onChange={(e) =>
                setCategory((prev: any) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-6 col-span-2">
            <Label htmlFor="image">Image</Label>

            {/* ✅ Image preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            )}

            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setCategory((prev: any) => ({
                  ...prev,
                  image: file,
                }));
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editMode ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </ComponentCard>
    </form>
  );
};

export default CategoryForm;
