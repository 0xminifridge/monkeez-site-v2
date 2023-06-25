import Home from "./Home/Home";
import { createBrowserRouter, Outlet } from "react-router-dom";
import PageNotFound from "./404";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import Collections from "./Collections";
import ZungleNav from "./Zungle/ZungleNav";
import MonkeezPage from "./pages/monkeez/MonkeezPage";
import ZoogzPage from "./pages/zoogz/ZoogzPage";
import ShopCart from "./ShoppingCart";
import Alert from "./Alert";

function Root() {
  return (
    <main class="bg-mnkz-blue h-100 home-bg">
      <Navbar />
      <div class="mx-auto">
        <Outlet />
        <ShopCart />
        <Alert />
      </div>
      <Footer />
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound title="404 | MONKEEZ" />,
    children: [
      {
        path: "/home",
        element: <Home title="HOME | MONKEEZ" />,
      },
      {
        path: "/collections",
        element: <Collections title="NFTS | MONKEEZ" />,
      },
      {
        path: "/monkeez/:id",
        element: <MonkeezPage />,
      },
      {
        path: "/zoogz/:id",
        element: <ZoogzPage />,
      },
      {
        path: "/zungle",
        element: <ZungleNav title="ZUNGLE | MONKEEZ" />,
      },
    ],
  },
]);
