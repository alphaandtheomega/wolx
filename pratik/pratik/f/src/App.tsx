import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "@/context/auth-context";

import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import CariEkle2 from "./pages/Cari/CariEkle2";
import Login from "./pages/Login";
import { KullaniciEkle } from "./pages/Kullanicilar";

import ProtectedRoute from "./components/ProtectedRoute";
import Kitaplik from "./pages/Kitaplik";
import Ayarlar from "./pages/Ayarlar/Ayarlar";
import CariEkle from "./pages/Cari/CariEkle"; 
import CariHareketler from "./pages/Cari/CariHareketler";
import CariListe from "./pages/Cari/CariListe";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "cariekle", element: <CariEkle /> },
          { path: "cariliste", element: <CariListe /> },
          { path: "carihareketler", element: <CariHareketler /> },
          { path: "modulekle", element: <CariEkle2 /> },
          { path: "kullaniciekle", element: <KullaniciEkle /> },
          { path: "kitaplik", element: <Kitaplik /> },
          { path: "ayarlar", element: <Ayarlar /> },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
