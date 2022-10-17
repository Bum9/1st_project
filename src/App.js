import logo from "./logo.svg";
import "./App.css";
import Main from "./pages/movie/main";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Test from "./pages/movie/test";
import "./pages/movie/main.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/1" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
