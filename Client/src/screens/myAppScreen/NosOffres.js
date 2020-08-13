import React, { Component } from 'react'

export default class NosOffres extends Component {
    render() {
        return (
            <>
                <div id="nosoffres" style={{marginBottom: '25px'}}></div>
      <section  className="layout_padding">
         <div className="container">
            <div className="row">
               <div className="full">
                  <div className="row">
                     <div className="col-sm-12">
                        <div className="full text_align_center">
                           <div className="heading_main center_head_border heading_style_1">
                              <h2 style={{fontSize: '54px', fontWeight: '500',letterSpacing: '-2px'}}>Nos Offres</h2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-sm-12">
                  <div className="full" style={{marginTop:'10px'}}>
                     <div className="row">
                        <div className="col-sm-12 col-md-4">
                           <div className="table_price text_align_center">
                              <div className="table_price_head">
                                 <h5>Internet Bronze</h5>
                              </div>
                              <div className="table_price_cont">
                                 <div className="table_price_per">
                                    <p>3 jours<br/>
                                       <small></small>
                                    </p>
                                 </div>
                                 <div className="table_price_cont_bottm">
                                    <ul>
                                       <li>100 MB/s</li>
                                    </ul>
                                 </div>
                              </div>
                              <div className="table_price_bottm"> <a className="bt_main" href="index.html">Acheter maintenant</a> </div>
                           </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                           <div className="active_price table_price text_align_center">
                              <div className="table_price_head">
                                 <h5>Internet Or</h5>
                              </div>
                              <div className="table_price_cont">
                                 <div className="table_price_per">
                                    <p>7 jours<br/>
                                       <small></small>
                                    </p>
                                 </div>
                                 <div className="table_price_cont_bottm">
                                    <ul>
                                       <li>200 Mb/s - 700 Mb/s</li>
                                      
                                    </ul>
                                 </div>
                              </div>
                              <div className="table_price_bottm"> <a className="reverse_bt bt_main" href="index.html">Acheter maintenant</a> </div>
                           </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                           <div className="table_price text_align_center">
                              <div className="table_price_head">
                                 <h5>Internet Dimamant</h5>
                              </div>
                              <div className="table_price_cont">
                                 <div className="table_price_per">
                                    <p>1 mois<br/>
                                       <small></small>
                                    </p>
                                 </div>
                                 <div className="table_price_cont_bottm">
                                    <ul>
                                       <li>2G - 24G</li>
                                    </ul>
                                 </div>
                              </div>
                              <div className="table_price_bottm"> <a className="bt_main" href="index.html">Acheter maintenant</a> </div>
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
