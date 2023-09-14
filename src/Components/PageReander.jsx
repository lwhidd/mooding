import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Signin/Login'
import AllDirary from './Dirary/AllDirary';
import DiraryAdd from './Dirary/DiraryAdd';
import DiraryEdit from './Dirary/DiraryEdit';
import DiraryView from './Dirary/DiraryView';

const PageReander = () => {

  return (
    <div id='wrap'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/diraryAdd' element={<DiraryAdd />} />
          <Route path='/diraryEdit' element={<DiraryEdit />} />
          <Route path='/allDirary' element={<AllDirary />} />
          <Route path='/diraryView' element={<DiraryView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageReander;
