import { useEffect, useState } from "react";
import DataTable from "../components/ui/DataTable";
import { useAuth } from "../provider/useAuth";
import Swal from "sweetalert2";
import { ColumnDefinition } from "../types";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  parentId?: number; // Added based on error message
  createdAt?: string; // Added based on error message
  updatedAt?: string; // Added based on error message
};

export default function ProductsTable() {
  const authUser = useAuth();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("data->", data);

  const productColumns: ColumnDefinition<Product>[] = [
    {
      key: "name",
      header: "Product Name",
      sortable: true,
      render: (data) => (
        <span className="font-medium text-blue-600 dark:text-blue-500">
          {data.title}
        </span>
      ),
    },
    {
      key: "images",
      header: "Product Images",
      sortable: false, // Typically we don't sort by images
      render: (product) => (
        <div className="flex space-x-2">
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <img
                key={index}
                src={image.url} // or whatever property contains the image URL
                alt={`Product ${product.name} image ${index + 1}`}
                className="w-10 h-10 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/path-to-fallback-image.png";
                }}
              />
            ))
          ) : (
            <span className="text-gray-400">No images</span>
          )}
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (data) => `$${data.price.toFixed(2)}`,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (data) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            data.stock > 0
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {data.stock > 0 ? `${data.stock} available` : "Out of stock"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!authUser?.token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const responseData = await response.json();

        // Handle both array and object responses
        let products: Product[] = [];
        if (Array.isArray(responseData)) {
          products = responseData;
        } else if (typeof responseData === "object" && responseData !== null) {
          // If the response is an object, check if it has a data property
          if (Array.isArray(responseData.data)) {
            products = responseData.data;
          } else {
            // If it's a single product object, wrap it in an array
            products = [responseData];
          }
        }

        setData(products);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Swal.fire("Error", errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authUser?.token]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (data.length === 0) return <div className="p-6">No products found</div>;

  return (
    <div className="p-6 bg-[#0e1b2a] min-h-screen mt-5">
      <DataTable
        columns={productColumns}
        data={data}
        pageSize={5}
        className="bg-[#1a2a3a] p-4 rounded-lg"
        onRowClick={(product) => console.log("Clicked:", product)}
      />
    </div>
  );
}
