import React, { useState } from 'react';
//import '../css2.css';
//import '../tailwind.min.css';

import authSvg from '../assests/login.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
        toast.error("google login error");
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
<div class="container-login100" style="background-image: url('images/bg-01.jpg');">      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<form onSubmit={handleSubmit} class="login100-form validate-form">
				<span class="login100-form-title p-b-37">
					Sign In
				</span>

				<div class="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
					<input class="input100" type="text" name="username" placeholder="username or email"
					type='email'
					placeholder='Email'
					onChange={handleChange('email')}
					value={email}
				  />
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
					<input class="input100" type="password" name="pass" placeholder="password"
					type='password'
					placeholder='Password'
					onChange={handleChange('password1')}
					value={password1}/>
					<span class="focus-input100"></span>
				</div>
				<Link
				to='/users/password/forget'
				className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
			  >
				Forget password?
			  </Link>

				<div class="container-login100-form-btn">
					<button type='submit' class="login100-form-btn">
						Sign In
					</button>
				</div>

				<div class="text-center p-t-57 p-b-20">
					<span class="txt1">
						Or login with
					</span>
				</div>

				<div class="flex-c p-b-112">
					<GoogleLogin
						clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
						render={renderProps => (
						<a  onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							class="login100-social-item">
							<i class="fa fa-facebook-f"></i>
						</a>
					)}
					></GoogleLogin>
					<FacebookLogin
					appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
					autoLoad={false}
					callback={responseFacebook}
					render={renderProps => (

					<a  onClick={renderProps.onClick}
						 class="login100-social-item">
						<img src="images/icons/icon-google.png" alt="GOOGLE"/>
					</a>
           )}
           />
				</div>

				<div class="text-center">
					<a href='/register' target='_self' class="txt2 hov1">
						Sign Up
					</a>
				</div>
			</form>

			
		</div>
	
	
	

	<div id="dropDownSelect1"></div>
	
      ;
    </div>
  );
};

export default Login;
