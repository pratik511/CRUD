import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './component/Form';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Register from './component/Register';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
