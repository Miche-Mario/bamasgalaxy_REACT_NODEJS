import React, { Component } from 'react'

export default class Apropos extends Component {
    render() {
        return (
            <>
                 <section id="apropos" className="layout_padding gradiant_bg cross_layout">
         <div className="container">
            <div className="row">
               <div className="col-md-4">
                  <div className="information_blogs">
                     <div className="imf_icon"><img src="images/icon1.png" alt="#" /></div>
                     <div className="imf_head">
                        <h3>Votre fournisseur internet toujours près de vous</h3>
                     </div>
                     <div className="imf_cont">
                        <p>Avec BAMASGALAXY, plus de souci de connexion internet dans votre Entreprise.</p>
                     </div>
                    
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="information_blogs">
                     <div className="imf_icon"><img src="images/icon2.png" alt="#" /></div>
                     <div className="imf_head">
                        <h3>Meilleur qualité de service.</h3>
                     </div>
                     <div className="imf_cont">
                        <p>Nous mettons au service de notre clientèle notre savoir faire et notre expérience, afin de vous garantir une meilleure qualité de service.</p>
                     </div>
                     
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="information_blogs">
                     <div className="imf_icon"><img src="images/icon3.png" alt="#" /></div>
                     <div className="imf_head">
                        <h3>Connectez-vous en tout temps</h3>
                     </div>
                     <div className="imf_cont">
                        <p>Vous êtes particulier et avez besoin d'une connexion stable, rapide? Nous vous offrons Internet haut débit chez vous à moindre cout.</p>
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
