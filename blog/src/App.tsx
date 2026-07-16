import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
