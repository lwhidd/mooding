import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 감정 이미지를 가져오기 위한 import 문
import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

const AllDiary = () => {
  const [loadedDiaries, setLoadedDiaries] = useState([]);
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 방법 상태
  const [emotionFilter, setEmotionFilter] = useState('모든 감정'); // 감정 필터 상태

  // 감정 이미지와 감정을 연결하는 객체
  const emotionImages = {
    '완전 좋음': orange,
    '좋음': lemon,
    '그럭저럭': avocado,
    '힘듦': blueberry,
    '매우 힘듦': tomato,
  };

  // 로컬 스토리지에서 일기 데이터를 불러오기 위한 훅
  useEffect(() => {
    const storedDiaries = localStorage.getItem('diaryData');
    if (storedDiaries) {
      const parsedDiaries = JSON.parse(storedDiaries);
      // 데이터를 불러온 후에 감정 필터링을 수행합니다.
      const filteredDiaries = filterDiariesByEmotion(parsedDiaries);
      setLoadedDiaries(filteredDiaries);
    }
  }, [emotionFilter]); // 감정 필터 상태가 변경될 때마다 실행됩니다.

  // 일기 데이터를 화면에 표시하는 함수
  // const renderDiaries = () => {
  //   return loadedDiaries.map((diary, index) => (
  //     <div key={index} className="dirary-info">
  //       <div className="emotion-img-box">
  //         {/* 감정 이미지를 표시합니다. */}
  //         <img src={emotionImages[diary.emotion]} alt={diary.emotion} />
  //       </div>
  //       <div className='info-box' onClick={() => handleViewButtonClick(diary)}>
  //         <div className='dirary-date' onClick={() => handleViewButtonClick(diary)}>{diary.date}</div>
  //         <div className='dirary-content' onClick={() => handleViewButtonClick(diary)} >{diary.content}</div>
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
      return diaries.filter((diary) => diary.emotion === emotionFilter);
    }
  };

  const handleViewButtonClick = (diary) => {
    // 선택한 다이어리 데이터를 다른 페이지로 전달
    localStorage.setItem('selectedDiary', JSON.stringify(diary));
    // 이후 페이지 이동
    window.location.href = '/DiraryView'; // 또는 원하는 경로로 이동
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
            <option value="완전 좋음" className="select orange">🍊완전 좋음</option>
            <option value="좋음" className="select lemon">🍋좋음</option>
            <option value="그럭저럭" className="select avocado">🥑그럭저럭</option>
            <option value="힘듦" className="select blueberry">🍇힘듦</option>
            <option value="매우 힘듦" className="select tomato">🍅매우 힘듦</option>
          </select>
          <div className='dirary-write'>
            {/* "새 일기 쓰기" 버튼을 추가하고, 클릭 시 일기 작성 페이지로 이동합니다. */}
            <Link to='/DiraryAdd'>새 일기 쓰기</Link>
          </div>
        </div>
        <div className='dirary-list'>
          {loadedDiaries.map((diary, index) => (
            <Link
              to='/diraryView'
              className='dirary-info'
              key={index}
            >
              <div className="emotion-img-box">
                {/* 감정 이미지를 표시합니다. */}
                <img src={emotionImages[diary.emotion]} alt={diary.emotion} />
              </div>
              <div className='info-box'>
                <div className='dirary-date'>{diary.date}</div>
                <div className='dirary-content'>{diary.content.slice(0, 50)}···</div>
              </div>
              <Link to='/DiraryEdit' className='dirary-edit-btn'>수정하기</Link>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDiary;