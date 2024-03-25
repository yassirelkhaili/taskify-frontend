import ReactDOM from 'react-dom/client';
import "./globals.css";
import Home from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Home />);
