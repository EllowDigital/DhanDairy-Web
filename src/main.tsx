import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

const preloader = document.getElementById("preloader");
if (preloader) {
  preloader.setAttribute("data-hide", "true");
  window.setTimeout(() => {
    preloader.remove();
  }, 260);
}
