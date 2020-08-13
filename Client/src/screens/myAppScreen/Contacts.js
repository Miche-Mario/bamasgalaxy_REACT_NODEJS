import React, { Component } from 'react'

export default class Contacts extends Component {
    render() {
        return (
            <>
                <div id="contact" style={{marginBottom: '25px'}}></div>

                <section  className="contact_section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6" style={{padding:'0'}}>
                                <div className="full">
                                <div className="contener_slideshow">
                                    <div className="contener_slide">
                                        <div className="slid_1"><img className="im" src="images/im1.jpg"/></div>
                                        <div className="slid_2"><img className="im" src="images/im2.png"/></div>
                                        <div className="slid_3"><img className="im" src="images/im3.png"/></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6" style={{padding:'0'}}>
                                <div className="full">
                                <div className="contact_form white_heading_border">
                                    <div className="contact_form_inner">
                                        <div className="full_heading white_fonts heading_main heading_style_1">
                                            <h2 style={{fontSize: '54px', fontWeight: '500',letterSpacing: '-2px'}}>Contact <span>us</span></h2>
                                        </div>
                                        <p>Bamasgalaxy est votre fournisseur internet ultra rapide qui vous donne accès à une connexion internet sur votre smartphone
                                            via au périphérique WIFI de votre smartphone et au WIFI de votre PC etc ...</p>
                                        <div className="form_contact">
                                            {/* form */}
                                            <form action="index.html">
                                            <fieldset>
                                                <div className="field">
                                                    <input type="text" name="name" placeholder="Your name" required=""/>
                                                </div>
                                                <div className="field">
                                                    <input type="text" name="name" placeholder="Your phone" required=""/>
                                                </div>
                                                <div className="field">
                                                    <input type="email" name="email" placeholder="Email" required=""/>
                                                </div>
                                                <div className="field">
                                                    <textarea name="messager" placeholder="Messager" required=""></textarea>
                                                </div>
                                                <div className="field">
                                                    <button className="field_bt">Send</button>
                                                </div>
                                            </fieldset>
                                            </form>
                                            {/* end form */}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
               {/*end section   */}
            </>
        )
    }
}
