import React, { useState } from 'react';
import authSvg from '../assests/forget.svg';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../logoo.png'

const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Valider'
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'En cours...' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Vueillez vérifier vos mails`);
          
        })
        .catch(err => {
        console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Vueillez remplir tous les champs');
    }
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" style={{boxShadow: '0 15px 30px -25px #000' }} data-spy="affix" data-offset-top="197">
    <div className="container">
       <a className="navbar-brand" href="/"><img src={Logo} width='200px' alt="logo"/></a>
      
             <Link  to='/login'> <span className="badge badge-primary p-2 display-2" style={{fontSize: '15px'}}>Se connecter</span></Link>
           </div>
 </nav>
<div style={{marginTop: '40px'}} className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
          
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Mot de passe oublié
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Mot de passe oublié ?</strong> Pour réinitialiser votre mot de passe, entrez votre e-mail ci-dessous et soumettez. Un e-mail vous sera envoyé avec des instructions sur la façon de terminer le processus.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <button
                  type='submit'
                  className='mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Valider</span>
                </button>
                <Link
                  to='/login'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                 <span> Retour</span> 
                </Link>
              </form>
            </div>
          </div>
          <footer style={{marginTop: '200px'}} className="page-footer font-small special-color-dark pt-4">
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

    </div>
</>  );
};

export default ForgetPassword;
