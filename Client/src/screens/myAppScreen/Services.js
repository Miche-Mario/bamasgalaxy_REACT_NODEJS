import React, { Component } from 'react'

export default class Services extends Component {
    render() {
        return (
            <>
                
      <div id="nosservices" style={{marginBottom: '25px'}}></div>
      <section  className="layout_padding layer_style">
         <div className="container">
            <div className="row">
               <div className="col-sm-12">
                  <div className="full text_align_center">
                     <div className="heading_main center_head_border heading_style_1">
                        <h2 style={{fontSize: '54px', fontWeight: '500',letterSpacing: '-2px'}}>Pourquoi souscrire à <span>Bamasgalaxy</span>?</h2>
                     </div>
                  </div>
               </div>
            </div>
            <div  className="row app-features">
               <div className="col-md-4 col-sm-6 col-xs-12">
                  <ul className="features-left">
                     <li>
                        <i className="flaticon-world-wide-web"></i>
                        <div className="fl-inner">
                           <h4>Téléchargement haut débit</h4>
                           <p>Profitez d'un accès Internet à grande vitesse de téléchargement. </p>
                        </div>
                     </li>
                     <li>
                        <i className="flaticon-cloud-computing"></i>
                        <div className="fl-inner">
                           <h4>Partage de données</h4>
                           <p>Charger et télécharger des fichiers multimédias. </p>
                        </div>
                     </li>
                     <li>
                        <i className="flaticon-android"></i>
                        <div className="fl-inner">
                           <h4>Réseaux sociaux</h4>
                           <p>Connectez-vous sur vos applications de médias sociaux préférées. </p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="col-md-4 col-sm-6 col-xs-12">
                  <ul className="features-right">
                  <li>
                        <i className="flaticon-mail"></i>
                        <div className="fr-inner">
                           <h4>Email</h4>
                           <p>Envoie de mail simple et rapide. </p>
                        </div>
                     </li>
                     <li>
                        <i className="flaticon-play-button"></i>
                        <div className="fr-inner">
                           <h4>Streaming</h4>
                           <p>Profitez d'un accès transparent au streaming vidéo. </p>
                        </div>
                     </li>
                     <li>
                        <i className="flaticon-line-graph"></i>
                        <div className="fr-inner">
                           <h4>Jeux vidéo</h4>
                           <p>Jouez à vos jeux vidéo favoris en ligne, avec vos amis comme si ils étaient juste à coté. </p>
                        </div>
                     </li>
                     
                  </ul>
               </div>
               <div className="col-md-4 wow fadeInRight" data-wow-delay="0.5" data-wow-duration="1s">
                  <div className="full">
                     <div className="center">
                        <img src="images/application_screen.png" alt="#" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      {/* end section */}
      {/* section */}
      <section className="layout_padding gradiant_bg cross_layout">
         <div className="container">
            <div className="row">
               <div className="col-sm-12">
                  <div className="full text_align_center white_fonts">
                     <div className="heading_main center_head_border heading_style_1">
                        <h2 style={{fontSize: '54px', fontWeight: '500',letterSpacing: '-2px'}}>Comment se <span>Connecter</span> ?</h2>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row step_section">
               <div className="offset-xl-1 col-xl-10 col-md-12">
                  <div className="row">
                     <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="step_blog arrow_right_step">
                           <div className="step_inner">
                              <i className="fa fa-wifi"></i><br/>
                              <p>Cliquer sur la touche wifi de votre appareil</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="step_blog">
                           <div className="step_inner">
                              <i className="fa fa-search-plus"></i><br/>
                              <p>Dans la liste des réseaux WIFI connectés rechercher "Bamasgalaxy-Connect".</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="step_blog">
                           <div className="step_inner">
                              <i className="fa fa-unlock"></i><br/>
                              <p>Tapez le mot de Passe : ******</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="step_blog">
                           <div className="step_inner">
                              <i className="fa fa-signal"></i><br/>
                              <p>Connectez-Vous à Bamasgalaxy. Surfez 24h/7 à Internet Haut débit et illimitée</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      {/* end section */}
      {/* section */}
            </>
        )
    }
}
