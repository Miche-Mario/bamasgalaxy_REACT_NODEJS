import React, { Component } from 'react'
import { Link } from 'react-router-dom';



export default class Header extends Component {

    render() {
        return (
                
         
        <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" style={{boxShadow: '0 15px 30px -25px #000' }} data-spy="affix" data-offset-top="197">
            <div className="container">
               <Link className="navbar-brand" to="/"><img src="images/logoo.png" width="200px" alt="logo"/></Link>
               <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span style={{marginLeft: '-7px', marginTop: '-5px'}} className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto" >
                     <li className="nav-item active">
                     <a style={{color:'#20A6BA'}} className="nav-link" href="#accueil">Accueil <span className="sr-only">(current)</span></a>
                     </li>
                     <li className="nav-item">
                     <a className="nav-link" href="#apropos">A propos</a>
                     </li>
                     <li className="nav-item">
                     <a className="nav-link" href="#nosservices">Nos services</a>
                     </li>
                     <li className="nav-item">
                     <a className="nav-link" href="#nosoffres">Nos offres</a>
                     </li>
                     <li className="nav-item">
                     <a className="nav-link" href="#contact">Contact</a>
                     </li>
                     <li className="nav-item" >
                     <Link  to='/login' className="nav-link" > <span className="badge badge-primary p-2 display-2" style={{fontSize: '15px'}}>Connexion</span></Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
    
         <div id="accueil" style={{marginBottom: '25px'}}></div>
         <section  id="banner_parallax" className="slide_banner1">
            <div className="container">
               <div className="row" >
                  <div className="col-md-6">
                     <div className="full">
                        <div className="slide_cont">
                           <h2>Obtenez le wifi public à travers tout le pays</h2>
                           <p>obtenez le wifi super rapide gratuit. Et ce n'est que le début !!!</p>
                           <div className="full slide_bt"> <a className="white_bt bt_main" href="#nosoffres">Nos offres</a> </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div style={{width: '200%',float: 'left',margin: '0',padding: '0'}}>
                        <div className="slide_pc_img wow fadeInRight" data-wow-delay="1s" data-wow-duration="2s"> <img  src="images/pc-banner.png" alt="#" /> </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         
          </div>  
        )
    }
}
