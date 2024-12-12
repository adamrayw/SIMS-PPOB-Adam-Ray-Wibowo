import Login from "./modules/auth/components/Login";
import Register from "./modules/auth/components/Register";
import Dashboard from "./modules/dashboard/components/Dashboard";
import DashboardLayout from "./modules/dashboard/components/Layouts/DashboardLayout";
import Pembayaran from "./modules/dashboard/components/Pembayaran/Pembayaran";
import TopUp from "./modules/core/components/TopUp";
import Transaction from "./modules/core/components/Transaction";
import Akun from "./modules/akun/components/Akun";
import PrivateRoute from "./modules/core/components/PrivateRoute";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <PrivateRoute><Dashboard /></PrivateRoute>, // Protect Dashboard
      },
      {
        path: "/topup",
        element: <PrivateRoute><TopUp /></PrivateRoute>, // Protect TopUp
      },
      {
        path: "/pembayaran",
        element: <PrivateRoute><Pembayaran /></PrivateRoute>, // Protect Pembayaran
      },
      {
        path: "/transaction",
        element: <PrivateRoute><Transaction /></PrivateRoute>, // Protect Transaction
      },
    ],
  },
  {
    path: "/akun",
    element: <PrivateRoute><Akun /></PrivateRoute>,
  },
];

export default routes;
