import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Cart from './components/Cart';
import { useState } from 'react';

const App = () => {
  const [cart] = useState<any[]>([]);

  return (
    <Router basename="/demo-project"> {/* Add basename here */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
};

export default App;
