import DataTable from "../components/ui/DataTable";

// Example usage with product data
type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
  };
  
  const productColumns: ColumnDefinition<Product>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: 'w-16',
    },
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
      render: (product) => (
        <span className="font-medium text-blue-600 dark:text-blue-500">
          {product.name}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (product) => `$${product.price.toFixed(2)}`,
    },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
      render: (product) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            product.stock > 0
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
        </span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
  ];
  
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 15, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, stock: 0, category: 'Electronics' },
    // ... more products
  ];
  
  export default function ProductsTable() {
    return (
      <div className="p-6 bg-[#0e1b2a] min-h-screen mt-5">
        <DataTable
          columns={productColumns}
          data={products}
          pageSize={5}
          className="bg-[#1a2a3a] p-4 rounded-lg"
          onRowClick={(product) => console.log('Clicked:', product)}
        />
      </div>
    );
  }