import ReactDOM from "react-dom/client";
import Routers from "router/Routers";
import "./style/css/style.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Fail to find the root element.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
  <Routers />
  // </React.StrictMode>
);
