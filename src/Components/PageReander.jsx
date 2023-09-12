import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
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
          <Route path='/' element={<Home />}></Route>
          <Route path='/diraryAdd' element={<DiraryAdd />}></Route>
          <Route path='/diraryEdit' element={<DiraryEdit />}></Route>
          <Route path='/allDirary' element={<AllDirary />}></Route>
          <Route path='/diraryView' element={<DiraryView />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageReander;