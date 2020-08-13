import React, { Component } from 'react';
import Header from './screens/myAppScreen/Header';
import Apropos from './screens/myAppScreen/Apropos'
import Services from './screens/myAppScreen/Services'
import NosOffres from './screens/myAppScreen/NosOffres'
import Contact from './screens/myAppScreen/Contacts'

 
 
class myApp extends Component {

    render() {

        return(

   <div  id="default_theme" className="home_page1">
      <Header />
      <Apropos />
      <Services />
      <NosOffres/>
      <Contact />

      {/* footer */}
 
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <img src="images/logoo.png" alt="logo"/>
            <iframe
       style={{
          
             marginTop: '-40px',
             width: "100%",
             height: "200px"
             }}
        src={'images/5187402041_dfc1969988_b-e1465239658899_1.mp4'}
        frameBorder="0"
            />          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Contact</h6>
            <ul className="footer-links">
              <li><i className="flaticon-mail"> bamasgalaxy@contact.com</i></li>
              <li><i className="fa fa-phone"> +257 2525252525 / +1 587 25447856</i></li>
              <li><i className="fa fa-location-arrow"> Representative-Team <br/><br/> ABIDJAN (CȎTE-D'IVOIRE) <br/> <br/>Head Office <br/><br/> Bamas Galaxy : CANADA<br/> <br/>BAMAS GALAXY TECHNOLOGY <br/> SOLUTION : DUBAI</i></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#apropos">A propos</a></li>
              <li><a href="#nosservices">Nos services</a></li>
              <li><a href="#nosoffres">Nos offres</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
         <a href="/"> bamasgalaxy</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="/"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="/"><i className="fa fa-twitter"></i></a></li>
              <li><a className="dribbble" href="/"><i className="fa fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="/"><i className="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
      {/* Footer */}
      </div>

        );
    }
}
export default myApp;