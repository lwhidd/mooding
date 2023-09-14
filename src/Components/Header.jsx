import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id='header'>
      <div className="row1-container">
        <ul>
          <li>
            <Link to='/'>Mooding- 하루의 감정을 기록하다.</Link>
          </li>
          <li>
            <Link to='alldirary'>작성한 일기 모아보기</Link>
          </li>
        </ul>
      </div>

    </header>
  );
};

export default Header;