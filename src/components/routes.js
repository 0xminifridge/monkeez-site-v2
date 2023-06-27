import Home from "./Home/Home";
import { createBrowserRouter, Outlet } from "react-router-dom";
import PageNotFound from "./404";
import { SiteNavbar } from "./Navbar";
import Footer from "./Footer";
import Collections from "./Collections";
import ZungleNav from "./Zungle/ZungleNav";
import MonkeezPage from "./pages/monkeez/MonkeezPage";
import ZoogzPage from "./pages/zoogz/ZoogzPage";
import ShopCart from "./ShoppingCart";
import Alert from "./Alert";
import Landing from "./Landing";
import ProfilePage from "./pages/profile/ProfilePage";

function Root() {
  return (
    <main class="bg-mnkz-blue h-100 home-bg ">
      {window.location.pathname !== "/" && <SiteNavbar />}
      <div class="mx-auto">
        <Outlet />
        <ShopCart />
        <Alert />
      </div>
      {window.location.pathname !== "/" && <Footer />}
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
        path: "/",
        element: <Landing />,
      },
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
        path: "/accounts/:profile",
        element: <ProfilePage />,
      },
      {
        path: "/zungle",
        element: <ZungleNav title="ZUNGLE | MONKEEZ" />,
      },
    ],
  },
]);
