// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import picture1 from '../../components/site/Picture2_1.png'
import picture2 from '../../components/site/Picture2_2.png'
import picture3 from '../../components/site/Picture2_3.png'
import { Typography } from '@mui/material';

function SitePageHowToBuy() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'How To Buy', url: '' },
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
                            <Typography variant='h1' style={{ fontSize: "36px", display: 'flex', justifyContent: "center" }} >Payment Information</Typography>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    {/* <div className="typography"> */}
                                    <h6><u>What Payment Methods Are Available?</u></h6>
                                    <Typography variant='subtitle1'>
                                        We are provided these payment methods
                                        <ul style={{listStyleType: "lower-roman"}}>
                                            {/* <li>E-Wallet</li> */}
                                            <li>Credit / Debit Card</li>
                                            <li>Online Banking</li>
                                        </ul>
                                    </Typography>
                                    {/* </div> */}
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    {/* <div className="typography"> */}
                                    <h6><u>What should I do if I made double payment?</u></h6>
                                    <Typography variant='subtitle1'>
                                        In the event you have been issued double payment for a single amount owed, you may refer to the steps below in resolving this issue for the following payment methods:
                                        <br />
                                        <u>Credit / Debit Card</u>
                                        <br />
                                        your payment will be released as credit note in 7-14 working days. *TnC apply
                                    </Typography>
                                    {/* </div> */}
                                </div>
                            </div>
                            <br />
                            <Typography variant='subtitle1'>
                                Welcome to MyEmporia. Here we strive to provide buyers the best deals in town to bring more value for the price you pay. Have a look at below to know how to buy on Emporia.
                                <br /><br />
                                <u> <b> Add To Cart </b> </u>
                                <br />
                                Browse throught our various categories or use the search bar to find what your favourite product.On the product page, you can click on  "<b>Add To Cart</b>" to place in your cart first.
                                <br /><br />
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <img style={{ width: "80%" }} src={picture1} />
                                </div>
                                <br /><br />
                                <u> <b> Shopping Cart </b> </u>
                                <ul style={{listStyleType: "lower-alpha"}}>
                                    <li>After you successful adding the product to your cart, the shopping cart button will show a notification badge with how many product in your Cart</li>
                                    <br />
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "80%" }} src={picture2} />
                                    </div>
                                    <br /><br />
                                    <li>Select the products you want and "<b>Check out</b>"</li>
                                    <li>On the checkout page, check that your delivery address is complete and correct to avoid lost parcel.</li>
                                    <li>Select your preferred payment method and tap on "Proceed" to proceed with payment! </li>
                                    <br /><br />
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "80%" }} src={picture3} />
                                    </div>
                                    <br /><br />
                                </ul>
                                Have other queries? Tell us more using the Chat bot.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageHowToBuy;
