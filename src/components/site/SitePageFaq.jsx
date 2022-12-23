// react
import React from 'react';
// import React, { useEffect, useState } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import Fab from '@mui/material/Fab';
// import Popup from 'reactjs-popup';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { Typography } from '@mui/material';

  const FAB = () => (
    <></>
    // <Popup 
    //     trigger={
    //     <Fab className="button" ><span class="material-icons">contact_support</span></Fab>
    //     }
    //     position="top center"
    //     on="hover"
    //     closeOnDocumentClick
    // >
    //     <Link to="/site/contact-us">
    //     <button class="fabbtn1">
    //         <span class="material-icons">call</span>
    //     </button>
    //     </Link>
    //     <Link to="/">
    //     <button class="fabbtn2">
    //         <span class="material-icons">confirmation_number</span>
    //     </button>
    //     </Link>
    //     <a href="http://mail.google.com" target="_blank">
    //     <button class="fabbtn3">
    //         <span class="material-icons">email</span>
    //     </button>
    //     </a>
    // </Popup>
    );

function SitePageFaq() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Frequently Asked Questions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>
           
            <PageHeader header="Frequently Asked Questions" breadcrumb={breadcrumb} />

            
            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                            <Typography variant='h6' style={{ fontSize: "28px", fontWeight:700 }} >Shipping Information</Typography>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>How Do I Claim For Lost and Damaged Under Certain Express?</u></h6>
                                      
                                        <p>
                                        For lost or damaged parcels,All Express will compensate the parcel's value amount
                                        <br />
                                        i) <u>Lost Parcel Claims Process</u>
                                        <ul>
                                            <li>Ensure parcel does not exceed 30 calendar days from the date that the Express has accepted the shipment.</li>
                                            <li>Provide supporting documents such as pick up receipt or manifest as proof of shipment.</li>
                                            <li>Send the supporting documnts to MCITC Customer Service</li>
                                        </ul>
                                        <br />
                                        ii) <u>Damaged parcel claims process</u>
                                        <ul>
                                            <li>Must raise the claim within 5 calendar days from the date of parcel received.</li>
                                            <li>Provide supporting document (Order details page) as a proof and image of damaged parcel.</li>
                                            <li>Send the supporting documents to MCITC Customer Service</li>
                                        </ul>


                                    
                                        </p>

                                        <h6><u>How To Check Where Is My Order? What Is My Order's Shipping Status Mean?</u></h6>

                                        <p>
                                        You can check your parcel detail at profile tab and check for the order history
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>What shipping methods are available?</u></h6>

                                        <p>
                                            We are provided these shipping methods
                                            <ul>
                                                <li>AIR (Air Freight)</li>
                                                <li>POS </li>
                                            </ul>
                                        </p>

                                        <h6><u>How Long Will It Take To Deliver My Parcel Using different Express?</u></h6>
                                            


                                        <p>
                                        MCITC will deliver your parcels within 3 working days adter the parcel is shipped by the seller. 
                                        Please allow some time for the tracking status to be updated throught Express website
                                        <br />
                                        You may check with MCITC Customer Service for redelivery if your parcel experienced failed delivery. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Payment Information</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>What Payment Methods Are Available?</u></h6>

                                        <p>
                                        We are provided these payment methods
                                            <ul>
                                                <li>E-Wallet</li>
                                                <li>Credit / Debit Card</li>
                                                <li>Online Banking</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>What should I do if I made double payment?</u></h6>

                                        <p>
                                        In the event you have been issued double payment for a single amount owed, you may refer to the steps below in resolving this issue for the following payment methods: 
                                        <br />
                                        <u>Credit / Debit Card</u>
                                        <br />
                                        your payment will be released as credit note in 7-14 working days. *TnC apply
                                         
                                    
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Refunds and Returns</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>When Will I Receive My Refund?</u></h6>

                                        <p>
                                        If you pay for your order using one of the following methods, your payment will be released as credit note in 7-14 working days. *TnC apply
                                        </p>
                                        <p>1)Online Banking<br/>
                                        2)Credit Card<br/>
                                        3)Debit card</p>


                                        
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>When And How Can I Apply For A Refund and Return?</u></h6>
                                        If your order is still under "To Receive" tab, please proceed to request for return/refund if you:
                                        <p>
                                        <ul>
                                       <li> 1) Did not receive the order</li> 
                                       <li> 2) Received an incomplete product (missing quantity or accessories)</li> 
                                       <li> 3) Received the wrong product(s) (e.g. wrong size, wrong colour, different product)</li> 
                                       <li> 4) Received a product with physical damage (e.g. dented, scratched, broken)</li> 
                                       <li> 5) Received a faulty product (e.g. malfunction, does not work as intended)</li> 
                                        </ul>

                                        Send the supporting documents to MCITC Customer Service
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floatfab">
                <FAB></FAB>
            </div>
            
        </React.Fragment>
        
    );
}

export default SitePageFaq;
