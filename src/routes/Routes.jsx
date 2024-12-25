import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "./../errorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import LogIn from "../pages/Register/Login";
import SignUp from "../pages/Register/Signup";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import UpdateFood from "../pages/ManageMyFoods/UpdateFood";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableFoods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch("http://localhost:5000/foods"),
      },
      {
        path: "/foodDetails/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/foods/${params.id}`),
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/manageMyFoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/foods/${params.id}`),
      },
      {
        path: "/myFoodRequest",
        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "/logIn",
        element: (
          <AuthRoute>
            <LogIn></LogIn>
          </AuthRoute>
        ),
      },
      {
        path: "/signUp",
        element: (
          <AuthRoute>
            <SignUp></SignUp>
          </AuthRoute>
        ),
      },
    ],
  },
]);

export default Routes;
