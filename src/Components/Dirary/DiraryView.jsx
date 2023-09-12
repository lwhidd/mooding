import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// 감정 이미지를 가져오기 위한 import 문
import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

const DiraryView = () => {
  const [selectedDiary, setSelectedDiary] = useState(null);
  const navigate = useNavigate();

  // 감정 이미지와 감정을 연결하는 객체
  const emotionImages = {
    '행복': orange,
    '기쁨': lemon,
    '그럭저럭': avocado,
    '슬픔': blueberry,
    '짜증': tomato,
  };

  useEffect(() => {
    // 로컬 스토리지에서 선택한 다이어리 데이터 가져오기
    const storedSelectedDiary = localStorage.getItem('selecteddirary');
    if (storedSelectedDiary) {
      const parsedSelectedDiary = JSON.parse(storedSelectedDiary);
      setSelectedDiary(parsedSelectedDiary);
    }
  }, []);

  return (
    <div id='diraryView'>
      <div className="container">

        {selectedDiary && (
          <>
            <div className="dirary-view-header">
              <button onClick={() => navigate(-1)} className="back-btn">뒤로가기</button>
              <h2>{selectedDiary.date}</h2>
              <button className='edit-btn'>
                <Link to='/diraryEdit'>
                  수정하기
                </Link>
              </button>
            </div>
            <div className='dirary-detail'>
              <div className='dirary-emotion'>
                <img src={emotionImages[selectedDiary.emotion]} alt={selectedDiary.emotion} />
                <h2>&lt; {selectedDiary.emotion} &gt;</h2>
              </div>
              <div className="dirary-content">
                <h2>오늘의 일기</h2>
                <p>{selectedDiary.content}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DiraryView;
