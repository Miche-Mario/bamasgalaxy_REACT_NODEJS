import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

const Admin = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Update',
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
    setFormData({ ...formData, textChange: 'Submitting' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/update`,
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
          toast.success('Profile Updated Successfully');
          setFormData({ ...formData, textChange: 'Update' }); 
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
         
  
       <div className="wrapper">
        <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
    
            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="http://www.creative-tim.com" className="simple-text">
                        Creative Tim
                    </a>
                </div>
                <ul className="nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="dashboard.html">
                            <i className="nc-icon nc-chart-pie-35"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./user.html">
                            <i className="nc-icon nc-circle-09"></i>
                            <p>User Profile</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./table.html">
                            <i className="nc-icon nc-notes"></i>
                            <p>Table List</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./typography.html">
                            <i className="nc-icon nc-paper-2"></i>
                            <p>Typography</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./icons.html">
                            <i className="nc-icon nc-atom"></i>
                            <p>Icons</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./maps.html">
                            <i className="nc-icon nc-pin-3"></i>
                            <p>Maps</p>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="./notifications.html">
                            <i className="nc-icon nc-bell-55"></i>
                            <p>Notifications</p>
                        </a>
                    </li>
                    <li className="nav-item active active-pro">
                        <a className="nav-link active" href="upgrade.html">
                            <i className="nc-icon nc-alien-33"></i>
                            <p>Upgrade to PRO</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="main-panel">
            
            <nav className="navbar navbar-expand-lg " color-on-scroll="500">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#pablo"> Dashboard </a>
                    <button href="" className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="nav navbar-nav mr-auto">
                            <li className="nav-item">
                                <a href="/" className="nav-link" data-toggle="dropdown">
                                    <i className="nc-icon nc-palette"></i>
                                    <span className="d-lg-none">Dashboard</span>
                                </a>
                            </li>
                            <li className="dropdown nav-item">
                                <a href="/" className="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <i className="nc-icon nc-planet"></i>
                                    <span className="notification">5</span>
                                    <span className="d-lg-none">Notification</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <a className="dropdown-item" href="/">Notification 1</a>
                                    <a className="dropdown-item" href="/">Notification 2</a>
                                    <a className="dropdown-item" href="/">Notification 3</a>
                                    <a className="dropdown-item" href="/">Notification 4</a>
                                    <a className="dropdown-item" href="/">Another notification</a>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link">
                                    <i className="nc-icon nc-zoom-split"></i>
                                    <span className="d-lg-block">&nbsp;Search</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#pablo">
                                    <span className="no-icon">Account</span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="no-icon">Dropdown</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="/">Action</a>
                                    <a className="dropdown-item" href="/">Another action</a>
                                    <a className="dropdown-item" href="/">Something</a>
                                    <a className="dropdown-item" href="/">Something else here</a>
                                    <div className="divider"></div>
                                    <a className="dropdown-item" href="/">Separated link</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#pablo">
                                    <span className="no-icon">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
      
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Email Statistics</h4>
                                    <p className="card-category">Last Campaign Performance</p>
                                </div>
                                <div className="card-body ">
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth"></div>
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Open
                                        <i className="fa fa-circle text-danger"></i> Bounce
                                        <i className="fa fa-circle text-warning"></i> Unsubscribe
                                    </div>
                                    <hr/>
                                    <div className="stats">
                                        <i className="fa fa-clock-o"></i> Campaign sent 2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Users Behavior</h4>
                                    <p className="card-category">24 Hours performance</p>
                                </div>
                                <div className="card-body ">
                                    <div id="chartHours" className="ct-chart"></div>
                                </div>
                                <div className="card-footer ">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Open
                                        <i className="fa fa-circle text-danger"></i> Click
                                        <i className="fa fa-circle text-warning"></i> Click Second Time
                                    </div>
                                    <hr/>
                                    <div className="stats">
                                        <i className="fa fa-history"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">2017 Sales</h4>
                                    <p className="card-category">All products including Taxes</p>
                                </div>
                                <div className="card-body ">
                                    <div id="chartActivity" className="ct-chart"></div>
                                </div>
                                <div className="card-footer ">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Tesla Model S
                                        <i className="fa fa-circle text-danger"></i> BMW 5 Series
                                    </div>
                                    <hr/>
                                    <div className="stats">
                                        <i className="fa fa-check"></i> Data information certified
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card  card-tasks">
                                <div className="card-header ">
                                    <h4 className="card-title">Tasks</h4>
                                    <p className="card-category">Backend development</p>
                                </div>
                                <div className="card-body ">
                                    <div className="table-full-width">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" value=""/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" value="" checked/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" value="" checked/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                                                    </td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" checked/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Create 4 Invisible User Experiences you Never Knew About</td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" value=""/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Read "Following makes Medium better"</td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="checkbox" value="" disabled/>
                                                                <span className="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Unfollow 5 enemies from twitter</td>
                                                    <td className="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-info btn-simple btn-link">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-link">
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer ">
                                    <hr/>
                                    <div className="stats">
                                        <i className="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="container-fluid">
                    <nav>
                        <ul className="footer-menu">
                            <li>
                                <a href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Blog
                                </a>
                            </li>
                        </ul>
                        <p className="copyright text-center">
                            ©2020
                            <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                        </p>
                    </nav>
                </div>
            </footer>
        </div>
    </div>
  );
};

export default Admin;
