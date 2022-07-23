import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from './pages/login/LogIn'
import Home from './pages/home/Home';
import AddBook from './pages/addBook/AddBook';
import AddCategory from "./pages/addCategory/addCategory";
import Book from "./pages/bookDisplay/Book";

export default function App() {
  const[state, setState] = useState(false);
  const isSuccess = (x) => {
    setState(x)
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/addbook" element={<AddBook logState = {state} />} />
        <Route path="/home" element={<Home logState = {state} />} />
        <Route path="/" element={<LogIn isSuccess={isSuccess} />} />
        <Route path="/addcategory" element={<AddCategory logState = {state} />} />
        <Route path="/book" element={<Book logState = {state} />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}
