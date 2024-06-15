import Home from '../src/pages/Home';
import SignUp from './pages/SignUp';
import Watchlist from '../src/pages/Watchlist';
import Login from './pages/Login';
import Navbar from '../src/components/Navbar';
import MoviePage from '../src/pages/MoviePage';
import TvPage from '../src/pages/TvPage';
import MovieHome from '../src/pages/MovieHome';
import TvHome from '../src/pages/TvHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Footer from '../src/components/Footer';
import ScrollToTop from './components/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App bg-[black] text-[white] bg-gradient-to-t from-slate-900 to-black">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/watchlist" element={<Watchlist />} />
          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/moviehome/:id" element={<MovieHome />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tvhome/:id" element={<TvHome />} />
          <Route path="/tv/:id" element={<TvPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
