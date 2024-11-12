import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { App } from "./pages/App";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App /> },
  {
    path: "/useReducer",
    element: <useReducer />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
