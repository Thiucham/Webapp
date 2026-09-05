import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { registerSW } from "virtual:pwa-register";

import router from "./Router.jsx";

import "./styles/Variables.css";
import "./styles/Global.css";
import "./styles/Utilities.css";

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
