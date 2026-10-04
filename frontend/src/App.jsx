// App: layout + React Router routes. Exactly 3 main pages.
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import AddBook from "./pages/AddBook.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          {/* Fallback for unknown URLs (not a main page) */}
          <Route
            path="*"
            element={
              <p className="message">
                Page not found. <Link to="/">Go back to books</Link>
              </p>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
