// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import picture1 from  '../../components/site/Picture1.png'
import picture2 from  '../../components/site/Picture2.png'
import picture3 from  '../../components/site/Picture3.png'
function SitePageHowToBuy() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Frequently Asked Questions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="How To Buy" breadcrumb={breadcrumb} />

            <div className="block faq">
                <div className="container">
                    

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3 class="fa fa-credit-card" style={{fontSize:"36px"}} >Payment Information</h3>
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
                            <div>
                            Welcome to MCITC. Here we strive to provide buyers the best deals in town to bring more value for the price you pay. Have a look at below to know how to buy on MCTIC.
                            <br />
                            <u> <b> Add To Cart </b> </u>
                            <br />
                            Browse throught our various categories or use the search bar to find what your favourite product.On the product page, you can click on  "<b>Add To Cart</b>" to place in your cart first.
                            <br />
                            <img
                            style={{width: 1800, height: 650 , justifyContent:"center"}} 
                            src={picture1} />
                            <br />
                            <u> <b> Shopping Cart </b> </u>
                            <ul>
                            <li>1) After you successful adding the product to your cart, the shopping cart button will show a red notification badge with how many product in your Cart</li>
                            <img
                            style={{width: 1600, height: 500 , justifyContent:"center"}} 
                            src={picture2} />
                            <li>2) Select the products you want and "<b>Check out</b>"</li>
                            <li>3) On the checkout page, check that your delivery address is complete and correct to avoid lost parcel.</li>
                            <li>4. Select your preferred payment method and tap on "Place Order" to proceed with payment! </li>
                            <img
                            style={{width: 1800, height: 650 , justifyContent:"center"}} 
                            src={picture3} />
                            </ul>
                            Have other queries? Tell us more using the Chat bot.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageHowToBuy;
