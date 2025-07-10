import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './sections/Header';
import Footer from './sections/Footer';
import Home from "./pages/Home";
import AboutUs from './pages/AboutUs';
import Menu from './pages/Menu';
import Reservations from "./pages/Reservations";
import Order from "./pages/Order";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
        <div className='App'>
          <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
