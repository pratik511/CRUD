import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './component/Form';
import Home from './component/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
