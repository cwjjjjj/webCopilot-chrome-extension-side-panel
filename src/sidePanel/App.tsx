import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];

export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/home"],
  initialIndex: 1,
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
