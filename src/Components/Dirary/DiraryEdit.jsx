import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import orange from './emoji-img/orange.png';
import lemon from './emoji-img/lemon.png';
import avocado from './emoji-img/avocado.png';
import tomato from './emoji-img/tomato.png';
import blueberry from './emoji-img/blueberry.png';

const emotionImages = {
  '행복': orange,
  '기쁨': lemon,
  '그럭저럭': avocado,
  '슬픔': blueberry,
  '짜증': tomato,
};

function DiraryEdit() {
  const [diary, setDiary] = useState({
    content: '',
    selectedEmotion: '',
    selectedImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 'selecteddirary' 데이터를 불러옵니다.
    const storedSelectedDirary = localStorage.getItem('selectedDirary');
    if (storedSelectedDirary) {
      const parsedSelectedDirary = JSON.parse(storedSelectedDirary);
      // 불러온 데이터를 사용하여 상태 변수를 업데이트합니다.
      setDiary({
        content: parsedSelectedDirary.content || '',
        selectedEmotion: parsedSelectedDirary.emotion || '',
        selectedImage: parsedSelectedDirary.selectedImage || null,
      });
    }
  }, []);

  const onClickSaveDirary = () => {
    if (!diary.content.trim()) {
      alert('일기 내용을 입력하세요.');
      return;
    }

    try {
      const existingData = JSON.parse(localStorage.getItem('diraryData')) || [];
      const updatedDiraryData = {
        ...diary,
      };

      // 로컬 스토리지에서 'selectedDirary' 데이터를 불러옵니다.
      const storedSelectedDirary = localStorage.getItem('selectedDirary');

      if (storedSelectedDirary) {
        const parsedSelectedDirary = JSON.parse(storedSelectedDirary);

        // 일기 데이터의 id를 확인합니다.
        const diaryId = parsedSelectedDirary.id;

        // 수정된 데이터를 반영합니다.
        const updatedData = existingData.map((diary) => {
          if (diary.id === diaryId) {
            return { ...diary, ...updatedDiraryData };
          }
          return diary;
        });

        // 수정된 데이터를 다시 로컬 스토리지에 저장합니다.
        localStorage.setItem('diraryData', JSON.stringify(updatedData));
      }

      // 수정 완료 후 AllDirary 페이지로 이동
      navigate('/AllDirary');
      alert('수정 완료');
    } catch (error) {
      console.error('일기 저장 오류:', error);
    }
  };

  const handleEmotionSelection = (emotion) => {
    setDiary((prevDiary) => ({
      ...prevDiary,
      selectedEmotion: prevDiary.emotion === emotion ? '' : emotion,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setDiary((prevDiary) => ({
          ...prevDiary,
          selectedImage: imageSrc,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="diraryAdd">
      <div className="container">
        <TodayEmotion
          selectedEmotion={diary.selectedEmotion}
          handleEmotionSelection={handleEmotionSelection}
        />
        <DiraryForm
          content={diary.content}
          setContent={(content) =>
            setDiary((prevDiary) => ({
              ...prevDiary,
              content,
            }))
          }
          onClickSaveDirary={onClickSaveDirary}
          selectedImage={diary.selectedImage}
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
  content,
  setContent,
  onClickSaveDirary,
  selectedImage,
  handleImageChange,
}) {
  return (
    <div className="dirary-add">
      <div className="title">
        <h1>오늘의 일기</h1>
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
        <button className="completed" onClick={onClickSaveDirary}>
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default DiraryEdit;
