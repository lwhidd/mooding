import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Login from './Signin/Login';
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
          <Route path='/diraryAdd' element={<DiraryAdd />} />
          <Route path='/diraryEdit/:diaryId' element={<DiraryEdit />} /> {/* 동적 경로 파라미터 추가 */}
          <Route path='/allDirary' element={<AllDirary />} />
          <Route path='/diraryView/:diaryId' element={<DiraryView />} /> {/* 동적 경로 파라미터 추가 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PageReander;
