import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 감정 이미지를 가져오기 위한 import 문
import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

const Alldirary = () => {
  const [loadedDiraries, setLoadedDiraries] = useState([]);
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 방법 상태
  const [emotionFilter, setEmotionFilter] = useState('모든 감정'); // 감정 필터 상태

  // 감정 이미지와 감정을 연결하는 객체
  const emotionImages = {
    '행복': orange,
    '기쁨': lemon,
    '그럭저럭': avocado,
    '슬픔': blueberry,
    '짜증': tomato,
  };

  // 로컬 스토리지에서 일기 데이터를 불러오기 위한 훅
  useEffect(() => {
    const loadedDiraries = localStorage.getItem('diraryData');
    if (loadedDiraries) {
      const parsedDiaries = JSON.parse(loadedDiraries);
      // 데이터를 불러온 후에 감정 필터링을 수행합니다.
      const filteredDiaries = filterDiariesByEmotion(parsedDiaries);
      setLoadedDiraries(filteredDiaries);
    }
  }, [emotionFilter]); // 감정 필터 상태가 변경될 때마다 실행됩니다.

  // 일기 데이터를 화면에 표시하는 함수
  // const renderDiaries = () => {
  //   return loadedDiraries.map((dirary, index) => (
  //     <div key={index} className="dirary-info">
  //       <div className="emotion-img-box">
  //         {/* 감정 이미지를 표시합니다. */}
  //         <img src={emotionImages[dirary.emotion]} alt={dirary.emotion} />
  //       </div>
  //       <div className='info-box' onClick={() => handleViewButtonClick(dirary)}>
  //         <div className='dirary-date' onClick={() => handleViewButtonClick(dirary)}>{dirary.date}</div>
  //         <div className='dirary-content' onClick={() => handleViewButtonClick(dirary)} >{dirary.content}</div>
  //       </div>
  //       {/* 수정하기 버튼을 추가하고, 클릭 시 수정 페이지로 이동합니다. */}
  //       <Link to='/DiraryEdit' className='dirary-edit-btn'>수정하기</Link>
  //     </div>
  //   ));
  // };

  // 최신순, 오래된순 정렬 함수
  const sortDiaries = (diaries) => {
    if (sortOrder === '최신순') {
      return diaries.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === '오래된순') {
      return diaries.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return diaries;
  };

  // 정렬 방법 변경 시 호출되는 함수
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };


  // 감정 필터 변경 시 호출되는 함수
  const handleEmotionFilterChange = (event) => {
    setEmotionFilter(event.target.value);
  };

  // 감정 필터링 함수
  const filterDiariesByEmotion = (diaries) => {
    if (emotionFilter === '모든 감정') {
      return diaries; // 모든 감정 데이터 표시
    } else {
      return diaries.filter((dirary) => dirary.emotion === emotionFilter);
    }
  };

  const handleViewButtonClick = (dirary) => {
    // 선택한 다이어리 데이터를 다른 페이지로 전달
    localStorage.setItem('selecteddirary', JSON.stringify(dirary));
  };

  return (
    <div id='allDirary'>
      <div className="container">
        <div className='title'>
          <h1>일기장 모아보기</h1>
        </div>
        <div className='sort-emotion'>
          <select className='sort-menu' onChange={handleSortChange}>
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
          </select>
          <select className='sort-menu' onChange={handleEmotionFilterChange} >
            <option value="모든 감정">모든 감정</option>
            {/* 감정 종류 및 감정 이미지를 선택하는 옵션을 제공합니다. */}
            <option value="행복" className="select orange">🍊행복</option>
            <option value="기쁨" className="select lemon">🍋기쁨</option>
            <option value="그럭저럭" className="select avocado">🥑그럭저럭</option>
            <option value="슬픔" className="select blueberry">🍇슬픔</option>
            <option value="짜증" className="select tomato">🍅짜증</option>
          </select>
          <div className='dirary-write'>
            {/* "새 일기 쓰기" 버튼을 추가하고, 클릭 시 일기 작성 페이지로 이동합니다. */}
            <Link to='/DiraryAdd'>새 일기 쓰기</Link>
          </div>
        </div>
        <div className='dirary-list'>
          {loadedDiraries.map((dirary, index) => (
            <div className='dirary-info'>
              <Link
                to='/diraryView'
                className='dirary-view-link'
                key={index}
                onClick={() => handleViewButtonClick(dirary)} // 클릭 시 데이터 전달
              >
                <div className="emotion-img-box">
                  {/* 감정 이미지를 표시합니다. */}
                  <img src={emotionImages[dirary.emotion]} alt={dirary.emotion} />
                  <h2>&lt; {dirary.emotion} &gt;</h2>
                </div>
                <div className='info-box'>
                  <div className='dirary-date'>{dirary.date}</div>
                  <div className='dirary-content'>{dirary.content.slice(0, 50)}&nbsp;···</div>
                </div>
              </Link>
              <div className="edit-delete-btn-box">
                <button className='dirary-edit-btn'>
                  <Link to={`/diraryEdit/${dirary.diaryId}`} >수정하기</Link>
                </button>
                <button className='dirary-delete-btn'>삭제하기</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div >
  );
};

export default Alldirary;