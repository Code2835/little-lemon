import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './blocks/Header';
import Footer from './blocks/Footer';
import Home from "./pages/Home";
import About from './pages/About';
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
                    <Route path="/about" element={<About />} />
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
