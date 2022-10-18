import logo from "./logo.svg";
import "./App.css";
import Main from "./pages/movie/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/movie/test";
import "./pages/movie/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Main />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
