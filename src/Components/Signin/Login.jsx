import React, { useState } from 'react';

const Login = () => {

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
    } else {
      setIsErrorMsg('ID 또는 비밀번호를 다시 입력해주세요.');
    }
  };

  return (
    <div id='login'>
      <div className="container">
        <div className="logo-box">
          <h1>Mooding</h1>
        </div>
        <div className="login-box">
          <h1>로그인</h1>
          {/* <div className="login-btn-box">
            <button type='button'>
              <span><img src="./img/google_login_logo.png" alt="google-login-logo" />구글 로그인</span>
            </button>
            <button type='button'>
              <span><img src="./img/kakao_login_logo.png" alt="kakao-login-logo" />카카오 로그인</span>
            </button>
          </div> */}
          <ul>
            <li>
              <input
                type="text"
                placeholder='아이디 : 1234'
                value={userId}
                onChange={onChangeId}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder='비밀번호 : 0000'
                value={userPw}
                onChange={onChangePw}
              />
            </li>
            {IsErrorMsg && (
              <li className='errMsg'>{IsErrorMsg}</li>
            )
            }
            <li>
              <button
                type='submit'
                className='login-btn'
                onClick={onClickLogin}
              >
                로그인
              </button>
            </li>
            <li>
              <button type='button' className='sign-up-btn'>
                회원가입
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;