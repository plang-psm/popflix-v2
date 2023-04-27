import Home from "../src/pages/Home";
import About from "../src/pages/About";
import SignUp from "../src/pages/SignUp";
import Login from "../src/pages/Login";
import Navbar from "../src/components/Navbar"
import MoviePage from "../src/pages/MoviePage";
import TvPage from "../src/pages/TvPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Footer from "../src/components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App bg-[black] text-[white] ">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tv/:id" element={<TvPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
