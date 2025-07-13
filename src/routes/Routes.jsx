import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import LockRoute from "./LockRoute";
import PrivateRoute from "./PrivateRoute";
import ContactUs from "../pages/ContactUs";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart/Cart";
import MyOrders from "../pages/MyOrders";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AddProduct from "../pages/admin/AddProduct";
import ProductList from "../pages/admin/ProductList";
import Orders from "../pages/admin/Orders";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/all-products/:category",
        element: <AllProducts />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/product/${params.id}`),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/admin",
        element: <AddProduct />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

export default Routes;
