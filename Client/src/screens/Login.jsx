import React, { useState } from 'react';
import '../css2.css';
import '../tailwind.min.css'; 
import Logo from '../logoo.png'

//import 'bootstrap/dist/css/bootstrap.min.css'


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
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };
  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
        toast.success(`Hey ${res.data.user.name}, Bienvenue!`);
    
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
        toast.error("Erreur de connexion avec google");
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
        toast.success(`Hey ${res.data.user.name}, Bienvenue!`);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
        toast.error("Erreur de connexion avec facebook");
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
      setFormData({ ...formData, textChange: 'En courrs...' });
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
              textChange: 'Valider'
            });
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private');
            toast.success(`Hey ${res.data.user.name}, Bienvenue!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Se connecter'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Vueillez remplir tous les champs');
    }
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" style={{boxShadow: '0 15px 30px -25px #000' }} data-spy="affix" data-offset-top="197">
    <div className="container">
       <a className="navbar-brand" href="/"><img src={Logo} width='200px' alt="logo"/></a>
      
             <Link  to='/register'> <span className="badge badge-primary p-2 display-2" style={{fontSize: '15px'}}>S'inscrire</span></Link>
           </div>
 </nav>
    <div style={{marginTop: '80px'}} className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
        
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div  className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div style={{ marginTop: '-50px'}} className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
        
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
               Se connecter
            </h1>
            <div className='w-full flex-1 mt-2 text-indigo-500'>
              <div className='flex flex-col items-center'>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                      style={{marginBottom: '-20px'}}
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Se connecter avec Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                      style={{marginBottom: '-20px'}}
                  >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Se connecter avec Facebook</span>
                    </button>
                  )}
                />

                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/register'
                  target='_self'
                  style={{marginBottom: '-20px'}}
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>S'inscrire</span>
                </a>
              </div>
              <div className='my-12 border-b text-center'   >
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  ou s'inscrire avec email
                </div>
              </div>
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  style={{marginBottom: '-60px'}}
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                  style={{marginBottom: '-80px'}}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Se conecter</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-1'
                >
                  Mot de passe oublié?
                </Link>
              </form>
            </div>
          </div>
          <footer style={{marginTop: '40px'}} className="page-footer font-small special-color-dark pt-4">
            <div className="container">
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
              <a href="bamasgalaxy.com/"> bamasgalaxy.com</a>
            </div>
            </div>
            </footer>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      
    </div></>
  );
};

export default Login;
