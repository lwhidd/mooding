import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory를 추가

const DiraryView = () => {
  const [selectedDiary, setSelectedDiary] = useState(null);
  const navigate = useNavigate(); // useHistory 훅을 사용하여 history 객체 생성

  useEffect(() => {
    // 로컬 스토리지에서 선택한 다이어리 데이터 가져오기
    const storedSelectedDiary = localStorage.getItem('selectedDiary');
    if (storedSelectedDiary) {
      const parsedSelectedDiary = JSON.parse(storedSelectedDiary);
      setSelectedDiary(parsedSelectedDiary);
    }
  }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)}> 뒤로가기</button>
      {
        selectedDiary ? (
          <div>
            <h2>{selectedDiary.date}</h2>
            <p>{selectedDiary.content}</p>
          </div>
        ) : (
          <div>
            <h2>{selectedDiary ? selectedDiary.date : '날짜 없음'}</h2>
            <p>{selectedDiary ? selectedDiary.content : '내용 없음'}</p>
          </div>
        )
      }
    </div >
  );
};

export default DiraryView;
