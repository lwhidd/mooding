import React from 'react';

const Login = () => {

  return (
    <div id='login'>
      <div className="container">
        <div className="logo-box">
          <h1>Mooding</h1>
        </div>
        <div className="login-box">
          <h1>로그인</h1>
          <div className="login-btn-box">
            <button type='button'>
              <span><img src="./img/google_login_logo.png" alt="google-login-logo" />구글 로그인</span>
            </button>
            <button type='button'>
              <span><img src="./img/kakao_login_logo.png" alt="kakao-login-logo" />카카오 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;