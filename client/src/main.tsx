import ReactDOM from "react-dom/client";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./firebase/config.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
