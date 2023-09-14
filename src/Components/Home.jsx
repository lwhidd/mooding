import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Signin/Login';

const Home = () => {
  // 현재 날짜와 선택된 날짜를 관리하는 상태 변수
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태를 저장하는 상태 변수
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [IsErrorMsg, setIsErrorMsg] = useState(false);


  const onChangeId = (e) => {
    setUserId(e.target.value);
    setIsErrorMsg('');
  }
  const onChangePw = (e) => {
    setUserPw(e.target.value);
    setIsErrorMsg('');
  }

  const onClickLogin = () => {
    if (userId === '1234' && userPw === '0000') {
      setIsErrorMsg('로그인이 되었습니다.');
      setIsLogin(true);
    } else {
      setIsErrorMsg('ID 또는 비밀번호를 다시 입력해주세요.');
      setIsLogin(false);
    }
  };

  // 이전 달로 이동하는 함수
  const onClickPreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // 다음 달로 이동하는 함수
  const onClickNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // 날짜를 클릭할 때 선택된 날짜를 업데이트하는 함수
  const handleDateClick = (date) => {
    setSelectedDate((prevSelectedDate) => (prevSelectedDate === date ? null : date));
  };

  // 달력을 렌더링하는 함수
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date(); today.setDate(today.getDate() - 1);
    const startDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + (6 - lastDay.getDay()));

    const calendar = [];
    let dateIterator = startDate;

    while (dateIterator <= endDate) {
      const formattedDate = dateIterator.toISOString().slice(0, 10);
      const sunday = dateIterator.getDay() === 0;
      const monday = dateIterator.getDay() === 1;
      const tuesday = dateIterator.getDay() === 2;
      const wednesday = dateIterator.getDay() === 3;
      const thursday = dateIterator.getDay() === 4;
      const friday = dateIterator.getDay() === 5;
      const saturday = dateIterator.getDay() === 6;

      const isCurrentDate = today.toISOString().slice(0, 10) === formattedDate;

      calendar.push(
        <div
          key={formattedDate}
          className={`calendar-date ${dateIterator.getMonth() !== month ? 'other-month' : ''} ${sunday ? 'sun' : ''} ${saturday ? 'sat' : ''} ${monday || tuesday || wednesday || thursday || friday ? 'weekday' : ''} ${isCurrentDate ? 'selected' : ''}`}
          onClick={() => handleDateClick(formattedDate)}
        >
          <span>{dateIterator.getDate()}</span>
        </div>
      );

      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    return calendar;
  };

  return (
    <>
      <main id='main'>
        <div className="container">
          <div className="title">
            <h1 className='main-title'>Mooding</h1>
            <h1 className='sub-title'>- 하루의 감정을 기록하세요</h1>
          </div>
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={onClickPreviousMonth}><img src="./img/arrow.png" alt="" className='arrow-rotate' /></button>
              <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={onClickNextMonth}><img src="./img/arrow.png" alt="" className='arrow' /></button>
            </div>
            <div className="calendar-body">
              <div className="calendar-grid">
                <div className="calendar-date common-date sun"><span>일</span></div>
                <div className="calendar-date common-date mon"><span>월</span></div>
                <div className="calendar-date common-date tue"><span>화</span></div>
                <div className="calendar-date common-date wed"><span>수</span></div>
                <div className="calendar-date common-date thu"><span>목</span></div>
                <div className="calendar-date common-date fri"><span>금</span></div>
                <div className="calendar-date common-date sat"><span>토</span></div>
                {renderCalendar()}
              </div>
            </div>
            <div className="dirary-add">
              <Link to='diraryAdd'>
                <span>
                  오늘 하루 감정 기록하러 가기
                  <img src="./img/arrow.png" alt="" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* 로그인 기능을 구현하지 못해 주석처리 */}
      {/* isLogin ? ( */
        // <main id='main'>
        //   <div className="container">
        //     <div className="title">
        //       <h1 className='main-title'>Mooding</h1>
        //       <h1 className='sub-title'>- 하루의 감정을 기록하세요</h1>
        //     </div>
        //     <div className="calendar">
        //       <div className="calendar-header">
        //         <button onClick={onClickPreviousMonth}><img src="./img/arrow.png" alt="" className='arrow-rotate' /></button>
        //         <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        //         <button onClick={onClickNextMonth}><img src="./img/arrow.png" alt="" className='arrow' /></button>
        //       </div>
        //       <div className="calendar-body">
        //         <div className="calendar-grid">
        //           <div className="calendar-date common-date sun"><span>일</span></div>
        //           <div className="calendar-date common-date mon"><span>월</span></div>
        //           <div className="calendar-date common-date tue"><span>화</span></div>
        //           <div className="calendar-date common-date wed"><span>수</span></div>
        //           <div className="calendar-date common-date thu"><span>목</span></div>
        //           <div className="calendar-date common-date fri"><span>금</span></div>
        //           <div className="calendar-date common-date sat"><span>토</span></div>
        //           {renderCalendar()}
        //         </div>
        //       </div>
        //       <div className="dirary-add">
        //         <Link to='diraryAdd'>
        //           <span>
        //             오늘 하루 감정 기록하러 가기
        //             <img src="./img/arrow.png" alt="" />
        //           </span>
        //         </Link>
        //       </div>
        //     </div>
        //   </div>
        // </main>
      // ) : (
        // <div id='login'>
        //   <div className="container">
        //     <div className="logo-box">
        //       <h1>Mooding</h1>
        //     </div>
        //     <div className="login-box">
        //       <h1>로그인</h1>
        //       {/* <div className="login-btn-box">
        //         <button type='button'>
        //           <span><img src="./img/google_login_logo.png" alt="google-login-logo" />구글 로그인</span>
        //         </button>
        //         <button type='button'>
        //           <span><img src="./img/kakao_login_logo.png" alt="kakao-login-logo" />카카오 로그인</span>
        //         </button>
        //       </div> */}
        //       <ul>
        //         <li>
        //           <input
        //             type="text"
        //             placeholder='아이디 : 1234'
        //             value={userId}
        //             onChange={onChangeId}
        //           />
        //         </li>
        //         <li>
        //           <input
        //             type="password"
        //             placeholder='비밀번호 : 0000'
        //             value={userPw}
        //             onChange={onChangePw}
        //           />
        //         </li>
        //         {IsErrorMsg && (
        //           <li className='errmsg'>{IsErrorMsg}</li>
        //         )
        //         }
        //         <li>
        //           <button
        //             type='submit'
        //             className='login-btn'
        //             onClick={onClickLogin}
        //           >
        //             로그인
        //           </button>
        //         </li>
        //         <li>
        //           <button type='button' className='sign-up-btn'>
        //             회원가입
        //           </button>
        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </div>
       /* ) */}
    </>
  );
};

export default Home;
