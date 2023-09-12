import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Signin/Login';

const Home = () => {
  // 현재 날짜와 선택된 날짜를 관리하는 상태 변수
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태를 저장하는 상태 변수

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
      {isLogin ? (
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
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
