import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "./locales/i18n.jsx";

import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
