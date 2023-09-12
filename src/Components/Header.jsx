import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id='header'>
      <div className="row1-container">
        <ul>
          <li>
            <Link to='/'>Modding- 하루의 감정을 기록하다.</Link>
          </li>
          <li>
            <Link to='alldirary'>모든 일기 보기</Link>
          </li>
        </ul>
      </div>

    </header>
  );
};

export default Header;