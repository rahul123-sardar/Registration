import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import FormikPost from "./FormikPost";
import Edit from "./Edit";
import GetImage from "./GetImage";
import DeleteImage from "./DeleteImage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getImage" element={<GetImage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<FormikPost />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/delete/:id" element={<DeleteImage />} />
    </Routes>
  );
}

export default App;
