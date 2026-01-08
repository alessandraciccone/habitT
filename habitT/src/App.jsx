
import Navbar from "./components/Navbar";
import Registrazione from "./components/Registrazione";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-green-100"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Registrazione />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
