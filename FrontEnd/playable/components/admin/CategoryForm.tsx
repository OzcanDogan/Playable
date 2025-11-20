"use client";

import { useState } from "react";
import { createCategory } from "@/lib/api";
import { CategoryPayload } from "@/types/category";

interface CategoryFormProps {
  onSuccess?: () => void; // create sonrası yönlendirme veya liste update için
}

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryPayload>({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // Input değişimleri için genel handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // name="description" → { description: value }
    });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await createCategory(formData);

    if (res.category) {
      setMessage("Category created successfully!");
      setFormData({ name: "", description: "" });

      if (onSuccess) onSuccess();
    } else {
      setMessage(res.message || "Failed to create category");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      {message && (
        <p className="mb-4 text-blue-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* CATEGORY NAME */}
        <div>
          <label className="block font-semibold mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Enter category description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
