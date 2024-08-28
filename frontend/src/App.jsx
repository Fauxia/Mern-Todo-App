import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Create";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
