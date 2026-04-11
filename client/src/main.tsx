import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router/lazy";

import "./tailwind.css";

createRoot(document.getElementById("root")!).render(<Routes />);
