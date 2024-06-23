import ReactDOM from "react-dom/client";
import App from "./App";
import AppProviders from "./contexts/AppProviders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
