import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/global/navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';

// Redux
import { useSelector } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<Rooms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Guest route is also a route component all route checks will be implemented here
const GuestRoute = () => {
  const {isAuth} = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />
}

const SemiProtectedRoute = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? <Navigate to="/" /> : (isAuth && !user.activated) ? <Outlet /> : <Navigate to="/rooms" />;
}

const ProtectedRoute = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? <Navigate to="/" /> : (isAuth && !user.activated) ? <Navigate to="/activate" /> : <Outlet />;
}

export default App;