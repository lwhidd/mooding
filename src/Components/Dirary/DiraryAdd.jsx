import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 감정 이미지를 가져오기 위한 import 문
import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

// 감정 이미지와 감정을 연결하는 객체
const emotionImages = {
  '완전 좋음': orange,
  '좋음': lemon,
  '그럭저럭': avocado,
  '힘듦': blueberry,
  '매우 힘듦': tomato,
};

function DiraryAdd(props) {
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // React Router의 `useNavigate` 훅을 사용하여 페이지 간 이동을 관리
  const navigate = useNavigate();

  useEffect(() => {
    const { diaryId } = props;
    if (diaryId) {
      loadDiary(diaryId);
    }
  }, [props.diaryId]);

  // 서버에서 일기 데이터를 가져오는 함수
  const loadDiary = async (diaryId) => {
    try {
      const response = await axios.get(`/api/diaries/${diaryId}`);
      setContent(response.data.content);
      setSelectedEmotion(response.data.emotion); // 수정 시 감정 선택 상태 초기화
      setIsEditMode(true);
    } catch (error) {
      console.error('일기 불러오기 오류:', error);
    }
  };

  // 로컬 스토리지에 일기 데이터 저장
  const saveDiaryToLocalStorage = (diaryData) => {
    const existingData = JSON.parse(localStorage.getItem('diaryData')) || [];
    const newData = [...existingData, diaryData];
    localStorage.setItem('diaryData', JSON.stringify(newData));
  };

  // 일기 작성 완료 및 저장 처리
  const handleSaveDiary = async () => {
    if (!selectedEmotion) {
      alert('감정을 선택하세요.');
      return;
    }

    else if (!content.trim()) {
      alert('일기 내용을 입력하세요.');
      return;
    }

    try {
      const newDiaryData = {
        content,
        emotion: selectedEmotion,
        date: formattedDate,
        // 필요한 다른 데이터를 추가하세요.
      };

      // 로컬 스토리지에 일기 데이터 저장
      saveDiaryToLocalStorage(newDiaryData);
      navigate(`/allDirary?content=${encodeURIComponent(content)}`);
      alert('작성 완료');
      setContent('');
      setSelectedEmotion('');
    } catch (error) {
      console.error('일기 저장 오류:', error);
    }
  };

  // 감정 선택 처리
  const handleEmotionSelection = (emotion) => {
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotion ? '' : emotion));
  };

  return (
    <div id="diraryAdd">
      <div className="container">
        {/* 오늘의 감정을 선택하는 컴포넌트 */}
        <TodayEmotion
          selectedEmotion={selectedEmotion}
          handleEmotionSelection={handleEmotionSelection}
        />
        {/* 일기 내용 입력 및 저장 컴포넌트 */}
        <DiraryForm
          isEditMode={isEditMode}
          content={content}
          setContent={setContent}
          handleSaveDiary={handleSaveDiary}
        />
      </div>
    </div>
  );
}

// 오늘의 감정을 선택하는 컴포넌트
function TodayEmotion({ selectedEmotion, handleEmotionSelection }) {
  return (
    <div className="today-emotion">
      <div className="title">
        <h2>오늘의 감정</h2>
      </div>
      <div className="select-emotion">
        {/* 감정 선택 버튼을 생성하는 컴포넌트 */}
        {Object.keys(emotionImages).map((emotion) => (
          <EmotionButton
            key={emotion}
            emotion={emotion}
            selectedEmotion={selectedEmotion}
            handleEmotionSelection={handleEmotionSelection}
          />
        ))}
      </div>
    </div>
  );
}

// 감정 선택 버튼을 생성하는 컴포넌트
function EmotionButton({ emotion, selectedEmotion, handleEmotionSelection }) {
  return (
    <button
      className={selectedEmotion === emotion ? 'select' : ''}
      onClick={() => handleEmotionSelection(emotion)}
    >
      <img src={emotionImages[emotion]} alt={emotion} />
      <span>{emotion}</span>
    </button>
  );
}

// 일기 내용 입력 및 저장 컴포넌트
function DiraryForm({
  isEditMode,
  content,
  setContent,
  handleSaveDiary,
  selectedImage,
  handleImageChange,
}) {
  return (
    <div className={isEditMode ? 'dirary-edit' : 'dirary-add'}>
      <div className="title">
        <h1>{isEditMode ? '일기 수정' : '오늘의 일기'}</h1>
      </div>
      <div className="dirary-input">
        <textarea
          placeholder="오늘은 어땠나요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="addinput-box">
        <div className="img-add-box">
          <h2>오늘 하루를 표현할 사진을 선택하세요 :</h2>
          <label htmlFor="select-img-input" className="custom-file">
            <img src="./img/select_input.png" alt="" />
          </label>
          <input
            type="file"
            id="select-img-input"
            name="select-img"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
        </div>
        <button className="completed" onClick={handleSaveDiary}>
          {isEditMode ? '수정하기' : '작성 완료'} {/* 수정 모드인 경우 버튼 텍스트 변경 */}
        </button>
      </div>
    </div>
  );
}

export default DiraryAdd;