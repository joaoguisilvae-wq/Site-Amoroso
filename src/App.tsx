import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeartEffect from "./Components/HeartEffect";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <HeartEffect />
    </div>
  );
}

export default App;
