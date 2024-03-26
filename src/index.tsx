import ReactDOM from 'react-dom/client';
import "./globals.css";
import App from './App';
import { BrowserRouter as Router} from "react-router-dom"
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
