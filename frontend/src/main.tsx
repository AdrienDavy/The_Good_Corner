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
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Create from "./pages/Create.tsx";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
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
      {
        path: `/signin`,
        element: <Signin />,
      },
      {
        path: `/signup`,
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
