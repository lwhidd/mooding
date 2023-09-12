import React, { useState } from 'react';

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
    // <section id="signIn">
    //   <div className="container">
    //     <div className="title">
    //       <h2>로그인</h2>
    //     </div>
    //     <div className="content">
    //       <ul>
    //         <li>
    //           <input
    //             type="text"
    //             placeholder='아이디를 입력해주세요'
    //             value={userId}
    //             onChange={onChangeId}
    //             onKeyPress={onKeyPress}
    //           />
    //         </li>
    //         <li>
    //           <input
    //             type="password"
    //             placeholder='비밀번호를 입력해주세요'
    //             value={userPw}
    //             onChange={onChangePw}
    //             onKeyPress={onKeyPress}
    //           />
    //         </li>
    //         {IsErrorMsg && (
    //           <li className='errMsg'>{IsErrorMsg}</li>
    //         )
    //         }
    //         <li>
    //           <a href="!#">아이디 : 1234</a>
    //           <i>|</i>
    //           <a href="!#">비밀번호 : 0000</a>
    //         </li>
    //         <li>
    //           <button
    //             type='submit'
    //             className='login-btn'
    //             onClick={onClickLogin}
    //           >
    //             로그인
    //           </button>
    //         </li>
    //         <li>
    //           <button type='button' className='sign-up-btn'>
    //             회원가입
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Login;