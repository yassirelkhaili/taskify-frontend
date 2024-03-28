import ReactDOM from "react-dom/client";
import "./globals.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { UiProvider } from "./providers/UiProvider";
import { Toaster } from "sonner";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <AuthProvider>
      <UiProvider>
        <Toaster richColors position="bottom-right" />
        <App />
      </UiProvider>
    </AuthProvider>
  </Router>
);
