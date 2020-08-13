import React, { useState } from 'react';
import authSvg from '../assests/auth.svg';
import '../css2.css';
import '../tailwind.min.css'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../logoo.png'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'S\'inscrire'
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'En cours...' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Valider'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'S\'inscrire'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Les mots de passe ne correspondent pas");
      }
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" style={{boxShadow: '0 15px 30px -25px #000' }} data-spy="affix" data-offset-top="197">
    <div className="container">
       <a className="navbar-brand" href="/"><img src={Logo} width='200px' alt="logo"/></a>
      
             <Link  to='/login'> <span className="badge badge-primary p-2 display-2" style={{fontSize: '15px'}}>Se connecter</span></Link>
           </div>
 </nav>
    <div style={{marginTop: '40px'}} className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              S'inscrire
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Nom'
                  onChange={handleChange('name')}
                  value={name}
                  style={{marginBottom: '-20px'}}

                />
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                  style={{marginBottom: '-20px'}}

                />
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Mot de passe'
                  onChange={handleChange('password1')}
                  value={password1}
                  style={{marginBottom: '-20px'}}

                />
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Confirmer mot de passe'
                  onChange={handleChange('password2')}
                  value={password2}
                  style={{marginBottom: '-20px'}}

                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  style={{marginBottom: '-20px'}}

                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
              </div>
              <div  style={{marginBottom: '-20px'}} className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Ou se connecter avec email
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Se connecter</span>
                </a>
              </div>
            </form>
          </div>
          <footer className="page-footer font-small special-color-dark pt-4">
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

export default Register;
