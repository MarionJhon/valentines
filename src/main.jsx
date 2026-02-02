import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./style/index.css";
import App from "./pages/App.jsx";
import Content from "./pages/Content.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/content", element: <Content /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
