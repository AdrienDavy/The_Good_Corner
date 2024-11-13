import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import AdDetails from "./pages/AdDetails.tsx";
import Page404 from "./pages/Page404.tsx";
import Category from "./pages/Category.tsx";
import AdEditor from "./pages/AdEditor.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "*",
      //   element: <Page404 />,
      // },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/categories/:id",
        element: <Category />,
      },
      {
        path: "/ads/:id",
        element: <AdDetails />,
      },
      {
        path: "/ads/new",
        element: <AdEditor />,
      },
      {
        path: `ads/:id/edit`,
        element: <AdEditor />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
