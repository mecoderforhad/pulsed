import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import axios from "axios";

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  categoryId: number;
  status: string;
  images: FileList;
};

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // Get token from localStorage
  const siteInfo = localStorage.getItem("site");
  const siteData = JSON.parse(siteInfo)

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("discount", data.discount.toString());
      formData.append("stock", data.stock.toString());
      formData.append("sku", data.sku);
      formData.append("categoryId", data.categoryId.toString());
      formData.append("status", data.status);

      // Append each image file
      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }
      if (!siteData?.token) {
        throw new Error("No authentication token found");
      }

      // Show loading alert
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we create your product.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/products/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${siteData?.token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      // Success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product created successfully!",
        confirmButtonText: "OK",
      });

      // Optional: Reset form or redirect
      // resetForm();
      navigate("/");
    } catch (error) {
      // Error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
        confirmButtonText: "Try Again",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#0e1b2a] min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-[#1a2a3a] rounded-lg shadow-lg p-8  mt-5">
        <h1 className="text-2xl font-bold text-white mb-6">
          Create New Product
        </h1>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Title*
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Golden Retriever Puppy"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                SKU*
              </label>
              <input
                id="sku"
                type="text"
                {...register("sku", { required: "SKU is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="DOG-GR-001"
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.sku.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Description*
              </label>
              <textarea
                id="description"
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Adorable 8-week-old Golden Retriever puppy with excellent pedigree..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Price*
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="899.99"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Discount */}
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Discount
              </label>
              <input
                id="discount"
                type="number"
                step="0.01"
                {...register("discount")}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Stock*
              </label>
              <input
                id="stock"
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: 0,
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Category*
              </label>
              <select
                id="categoryId"
                {...register("categoryId", {
                  required: "Category is required",
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="1">Dogs</option>
                <option value="2">Cats</option>
                <option value="3">Birds</option>
                <option value="4">Fish</option>
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Status*
              </label>
              <select
                id="status"
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Product Images
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400">
                      {`${"Upload product images"} ${"(multiple allowed)"}`}
                    </p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    multiple
                    {...register("images")}
                    className="opacity-0"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
