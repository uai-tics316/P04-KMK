import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import AddCard from "./pages/AddCard";
import Scanner from "./pages/Scanner";
import Trade from "./pages/Trade";
import Stats from "./pages/Stats";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/add-card" element={<AddCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;