// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SitePageShippingDelivery() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Frequently Asked Questions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>
           
            <PageHeader header="Shipping n Delivery" breadcrumb={breadcrumb} />

            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Shipping Information</h3>
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
                            <h3>Delivery Information</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>How do i ensure i get my online purchases during the Conditional Movement Control Order(CMCO) and Targeted Enchanced MOvement Control Order(TEMCO)</u></h6>

                                        <p>
                                        As our courier partners are operating as usual during this period, they will do their best to ensure 
                                        your packages are delivered even if the Office address is in the CMCO/TEMCO area. In the event the courier
                                         fails to deliver the package to you or a trusted recipient (i.e. office receptionist or security), 
                                         the package will be marked as 
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6><u>I have a received a damaged / a defective / an incorrect item, what should i do</u></h6>

                                        
                                       <p><u>Damaged Item</u></p>
                                        <p>If your item is damaged, you may return it and it should be done as soon as possible in order to be refunded. 
                                            To return your damaged item, you may do so by submitting a form under certain conditions </p>
                                       <p> <u>Incorrect Item</u></p>
                                    <p>A product that does not match your order description falls under incorrect item category. 
                                        For example, you ordered a chocolate milk for 1L but you ended up receiving a strawberry milk for 1L. 
                                        Hence the next step would be return and refund request.</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageShippingDelivery;
