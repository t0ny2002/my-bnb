import './App.css';
import './theme-light.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './utility/ScrollToTop';

export default function App() {
  return (
    <>
      <NavBar></NavBar>
    </>
  );
}
