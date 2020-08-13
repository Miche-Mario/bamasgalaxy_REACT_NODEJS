import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';


const Private = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Mis à jour',
    role: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { role, name, email } = res.data;
        setFormData({ ...formData, role, name, email });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  const { name, email, password1, textChange, role } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    const token = getCookie('token');
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: 'En cours' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          email,
          password: password1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        updateUser(res, () => {
          toast.success('Profil mis à jour avec succès');
          setFormData({ ...formData, textChange: 'Mise à jour' });
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div className="wrapper ">
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo">
        <a href="/private" className="simple-text logo-mini">
         
   
        </a>
        <a href="/private" className="simple-text logo-normal">
          <strong>Bamasgalaxy</strong>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="active ">
            <a href="./dashboard.html">
              <i className="nc-icon nc-bank"></i>
              <p>Tableau de bord</p>
            </a>
          </li>
          <li>
            <a href="/private">
              <i className="nc-icon nc-single-02"></i>
              <p>Profil</p>
            </a>
          </li>
         
          <li className="active-pro">
            <a  onClick={() => {
                    signout(() => {
                      toast.error('Déconnexion réussie');
                      history.push('/');
                    });
                  }}>
              <i style={{color: 'red'}} className="nc-icon nc-spaceship"></i>
              <p style={{color: 'red'}}><strong>Déconnexion</strong></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="main-panel">
      <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a className="navbar-brand" href="/private">Tableau de bord</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <form>
              <div className="input-group no-border">
                <input type="text" value="" className="form-control" placeholder="Search..."/>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="nc-icon nc-zoom-split"></i>
                  </div>
                </div>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link btn-magnify" href="javascript:;">
                  <i className="nc-icon nc-layout-11"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li>
              <li className="nav-item btn-rotate dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="nc-icon nc-bell-55"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/">Action</a>
                  <a className="dropdown-item" href="/">Another action</a>
                  <a className="dropdown-item" href="/">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-rotate" href="javascript:;">
                  <i className="nc-icon nc-settings-gear-65"></i>
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Connexion en cours</p>
                      <p style={{fontSize: '25ppx', fontWeight: 'bold'}} className="card-title">------- Mo</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr/>
                <div className="stats">
                  <i className="fa fa-refresh"></i>
                  Connecté
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Derniers abonnements</p>
                      <p className="card-title">------</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr/>
                <div className="stats">
                  <i className="fa fa-calendar-o"></i>
                  Aujourd'hui
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Factures</p>
                      <p className="card-title">-------</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr/>
                <div className="stats">
                  <i className="fa fa-clock-o"></i>
                  jj/mm/yyyy
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5 col-md-4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </div>
                  <div className="col-7 col-md-8">
                    <div className="numbers">
                      <p className="card-category">Bon de fidélité</p>
                      <p className="card-title">-------</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <hr/>
                <div className="stats">
                  <i className="fa fa-refresh"></i>
                  Utilisable ou Non
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card ">
              <div className="card-header ">
                <h5 className="card-title">Dernières actions</h5>
                <p className="card-category">24/7jr</p>
              </div>
              <div className="card-body ">
                <canvas id="chartHours" width="400" height="100"></canvas>
              </div>
              <div className="card-footer ">
                <hr/>
                <div className="stats">
                  <i className="fa fa-history"></i> Mise à jour il y a ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-black  footer-white ">
        <div className="container-fluid">
          <div className="row">
            <div className="credits ml-auto">
              <span className="copyright">
                ©2020 BAMASGALAXY
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default Private;
