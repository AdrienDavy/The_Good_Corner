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
import AuthComponent from "./components/AuthComponent.tsx";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
enum AuthStates {
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
}

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
        element: (
          <AuthComponent authStates={[AuthStates.LOGGED_IN]}>
            <Create />
          </AuthComponent>
        ),
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
        element: (
          <AuthComponent
            authStates={[AuthStates.LOGGED_OUT, AuthStates.LOGGED_IN]}
          >
            <Category />
          </AuthComponent>
        ),
      },
      {
        path: "/ads/:id",
        element: (
          <AuthComponent
            authStates={[AuthStates.LOGGED_OUT, AuthStates.LOGGED_IN]}
          >
            <AdDetails />
          </AuthComponent>
        ),
      },
      {
        path: "/ads/new",
        element: (
          <AuthComponent authStates={[AuthStates.LOGGED_IN]}>
            <AdEditor />
          </AuthComponent>
        ),
      },
      {
        path: `ads/:id/edit`,
        element: (
          <AuthComponent authStates={[AuthStates.LOGGED_IN]}>
            <AdEditor />
          </AuthComponent>
        ),
      },
      {
        path: `/signin`,
        element: (
          <AuthComponent authStates={[AuthStates.LOGGED_OUT]}>
            <Signin />
          </AuthComponent>
        ),
      },
      {
        path: `/signup`,
        element: (
          <AuthComponent authStates={[AuthStates.LOGGED_OUT]}>
            <Signup />
          </AuthComponent>
        ),
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
