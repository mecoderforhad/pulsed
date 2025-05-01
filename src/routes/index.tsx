import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../provider/useAuth";
import Home from "../pages/home";
import Layout from "../components/layout/Layout";
import Payment from "../pages/payment";
import AddProduct from "../pages/AddProduct";
import ProductsTable from "../pages/ProductsTable";
import AdminProtectedRoute from "./AdminProtectedRoute";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/settings",
      element: <div>Service Page</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/payment",
      element: (
        <ProtectedRoute>
          <Layout>
            <Payment />
          </Layout>
        </ProtectedRoute>
      ),
    },
  ];

  // Define routes that require ADMIN role
  const routesForAdminOnly = [
    {
      path: "/add-product",
      element: (
        <AdminProtectedRoute>
          <Layout>
            <AddProduct />
          </Layout>
        </AdminProtectedRoute>
      ),
    },
    {
      path: "/product-list",
      element: (
        <AdminProtectedRoute>
          <Layout>
            <ProductsTable />
          </Layout>
        </AdminProtectedRoute>
      ),
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...routesForAdminOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
