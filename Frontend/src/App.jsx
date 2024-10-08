import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';
import Algorithm from './pages/Algorithm/Algorithm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<CategoryWrapper />} />
        <Route path="/categories/:category/:algorithm" element={<Algorithm />} />
      </Routes>
    </BrowserRouter>
  );
}

function CategoryWrapper() {
  const { category } = useParams();
  return <Category subCategory={category} />;
}

export default App;