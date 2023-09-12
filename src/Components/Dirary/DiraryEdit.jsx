import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

const emotionImages = {
  '완전 좋음': lemon,
  '좋음': orange,
  '그럭저럭': avocado,
  '힘듬': blueberry,
  '매우 힘듬': tomato,
};

function DiraryAdd(props) {
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // 날짜를 생성 (현재 날짜를 사용하거나 다른 날짜를 선택할 수 있습니다)
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const navigate = useNavigate();

  useEffect(() => {
    const { diaryId } = props;
    if (diaryId) {
      loadDiary(diaryId);
    }
    CurrentDate();
  }, [props.diaryId]);

  const loadDiary = async (diaryId) => {
    try {
      const response = await axios.get(`/api/diaries/${diaryId}`);
      setContent(response.data.content);
      setIsEditMode(true);
    } catch (error) {
      console.error('일기 불러오기 오류:', error);
    }
  };

  const CurrentDate = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setCurrentDate(formattedDate);
  };

  const saveDiaryToLocalStorage = (diaryData) => {
    const existingData = JSON.parse(localStorage.getItem('diaryData')) || [];
    const newData = [...existingData, diaryData];
    localStorage.setItem('diaryData', JSON.stringify(newData));
  };

  const handleSaveDiary = async () => {
    if (!content.trim()) {
      alert('일기 내용을 입력하세요.');
      return;
    }

    try {
      const newDiaryData = {
        content,
        emotion: selectedEmotion,
        selectedImage: selectedImage,
        date: formattedDate
        // 필요한 다른 데이터를 추가하세요.
      };

      // setNewData((prevData) => [...prevData, newDiaryData]);
      saveDiaryToLocalStorage(newDiaryData);
      navigate(`/allDirary?content=${encodeURIComponent(content)}`);
      alert('수정 완료');
      setContent('');
      setSelectedEmotion('');
    } catch (error) {
      console.error('일기 저장 오류:', error);
    }
  };

  const handleEmotionSelection = (emotion) => {
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotion ? '' : emotion));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setSelectedImage(imageSrc);

        // 이미지 경로를 로컬 스토리지에 저장
        localStorage.setItem('selectedImage', imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="diraryAdd">
      <div className="container">
        <TodayEmotion
          selectedEmotion={selectedEmotion}
          handleEmotionSelection={handleEmotionSelection}
        />
        <DiraryForm
          isEditMode={isEditMode}
          content={content}
          setContent={setContent}
          handleSaveDiary={handleSaveDiary}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
}

function TodayEmotion({ selectedEmotion, handleEmotionSelection }) {
  return (
    <div className="today-emotion">
      <div className="title">
        <h2>오늘의 감정</h2>
      </div>
      <div className="select-emotion">
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
          style={{ marginBottom: '30px' }}
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="선택한 이미지 미리보기"
            className="preview-image"
            style={{ width: '300px', height: '400px', borderRadius: '10%' }}
          />
        )}
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
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default DiraryAdd;
