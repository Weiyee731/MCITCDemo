// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import Picture4 from '../../components/site/Picture4.png'
import Picture5 from '../../components/site/Picture5.png'
import Picture6 from '../../components/site/Picture6.png'
import Picture7 from '../../components/site/Picture7.png'
function SitePageHowToReturn() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Frequently Asked Questions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="How To Refund n Return" breadcrumb={breadcrumb} />

            <div className="block faq">
                <div className="container">
                    

                    <div className="faq__section">
                        <div className="faq__section-title">
                        <i class="fa fa-truck fa-5x" aria-hidden="true" ></i>
                            <h3>Refund n Return Information</h3>
                        </div>
                        <div>
                            <b><u>When can I apply for a Return / Refund</u></b>
                            <br/>
                            If your order is still under "To Receive" tab, please proceed to request for return/refund if you:
                            <ul>
                                <li>1) Did not receive the order</li>
                                <li>2) Received an incomplete product (missing quantity or accessories)</li>
                                <li>3) Received the wrong product(s) (e.g. wrong size, wrong colour, different product)</li>
                                <li>4) Received a product with physical damage (e.g. dented, scratched, broken)</li>
                                <li>5) Received a faulty product (e.g. malfunction, does not work as intended)</li>
                            </ul>

                            <b><u>How do I request for Return / Refund ? </u></b>
                            <ul>
                                <li>Step 1 : Click on the Profile icon </li>
                                <img
                                style={{width: 1200, height: 400 , justifyContent:"center"}} 
                                src={Picture4} />
                                <li>Step 2: Click on your history order</li>
                                <img
                                style={{width: 500, height: 500 , justifyContent:"center"}} 
                                src={Picture5} />
                                <li>Step 3: click the "Request for Return / Refund" button at the bottom of the page.</li>
                                <img
                                style={{width: 1600, height: 500 , justifyContent:"center"}} 
                                src={Picture6} />
                                <li>Step 5: click submit and the seller will be notified instantly regarding your refund request. .</li>
                                <img
                                style={{width: 1600, height: 500 , justifyContent:"center"}} 
                                src={Picture7} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageHowToReturn;
