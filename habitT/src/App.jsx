import Navbar from "./components/Navbar";
import Registrazione from "./components/Registrazione";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex flex-col bg-green-100"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Registrazione />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
