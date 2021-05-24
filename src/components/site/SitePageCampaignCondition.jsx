// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SitePageCampaignCondition() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Terms And Conditions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Terms And Conditions — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">Campaign & Mechanics Terms & Conditions</h1>
                            <div className="document__subtitle">Offline to Online (“O2O”) Terms & Conditions</div>
                        </div>
                        
                        <div className="document__content typography" style={{textalign:"left"}}>
                            <p>
                                <h5>1. Interpretation
                                </h5>
                                <h6>
                                <p>1.1 In these Conditions:
                                </p>
                                <p>"Buyer" or “Customer” means the person who purchases Goods using an O2O arrangement as detailed in Clause 2.1 herein;
                                </p>
                                <p>"Conditions" mean these Terms and Conditions of Offline to Online (“O2O”) Arrangement;
                                </p>
                                <p>"Contract" means the contract formed when Seller accepted the order placed by Buyer for the purchase of Goods and/or services sold by Seller under an O2O Arrangement;
                                </p>
                                <p>“Goods” means the goods made available for sale by Seller via the O2O Arrangement;
                                </p>
                                <p>“MCITC” means Malaysia-China International Trading Centre, a company incorporated in Malaysia and having its registered address at Malaysia-China International Trading Centre, Sejingkat, 93050 Kuching, Sarawak;
                                </p>
                                <p>“MCITC Terms and Conditions” means these Conditions and all other terms and conditions and policies pertaining to the use of the Platform and/or the Services;
                                </p>
                                <p>“Platform” means the MCITC website and/or the MCITC mobile app;
                                </p>
                                <p>“Seller” means a third party seller which sells Goods and/or services to Buyer under an O2O Arrangement;
                                </p>
                                <p>“Services” means the use of any services, information and functions made available by MCITC at the Platform;
                                </p>
                                <p>“Writing” includes electronic mail, facsimile transmission and any comparable means of communication.
                                </p>
                                <p>1.2 The headings in these Conditions are for convenience only and shall not affect the interpretation of any parties.
                                </p>
                                </h6>
                                <h5>2. Basis of the Contract</h5>
                                <h6>
                                <p>2.1 O2O arrangement: The O2O arrangement enables Customers to visit any of the participating physical stores managed by a Seller, scan a QR code, make a purchase and pay for the purchase using MCITC mobile app and MCITC electronic wallet (“e-wallet”) operated by Alipay Malaysia Sdn. Bhd. (“MCITC Wallet”). Customers will then collect the Goods and/or consume services from the Sellers at the participating physical stores.
                                </p>
                                <p>2.2 The sales and purchase contract (“Contract”) is entered into directly between the Buyer and Seller. MCITC is not a party to any Contract between the Buyer and Seller, and accepts no obligations in connection with any such Contract.
                                </p>
                                <p>2.3 Seller shall be fully responsible for Goods and/or services offered and/or sold to Customers and related enquiries, complaints and liability. MCITC shall not be liable to Customers for any claim that Goods and/or service is not collected or delivered, or is otherwise defective, unsatisfactory, or does not meet legal or other requirements.
                                </p>
                                </h6>
                                <h5>3. Orders</h5>
                                <h6>
                                <p>3.1 All orders shall be subject to Seller’s acceptance in their sole discretion and each order accepted by the Seller shall constitute a separate Contract. The Buyer shall be responsible for ensuring the accuracy of the price entered on the Platform.
                                </p>
                                </h6>
                                <h5>4. Price and Payment</h5>
                                <h6>
                                <p>4.1 The price of the Goods and/or services to be charged by Seller shall be the price stated in the physical store at the time which the Buyer completes the payment process on the Platform. Buyer shall ensure that the right price (including all applicable consumption tax e.g. Sales and Services Tax) is keyed onto the Platform.
                                </p>
                                <p>4.2 Under an O2O Arrangement, a Buyer shall make payment for the Goods and/or services using MCITC Wallet on the Platform upon Seller’s acceptance of Buyer’s order and the formation of a Contract. All payments shall be made to MCITC, as Seller’s agent. Buyer acknowledges that MCITC is entitled to collect payments from Buyer on behalf of Seller.
                                </p>
                                <p>4.3 The terms and conditions applicable to payment via MCITC Wallet, as prescribed by MCITC on the Platform, shall be applicable.
                                </p>
                                </h6>
                                <h5>5. Delivery</h5>
                                <h6>
                                <p>5.1 Delivery of the Goods and/or services shall be made by the Seller to the Buyer.
                                </p>
                                <p>5.2 Seller shall be fully responsible for the Goods and/or services offered and/or sold to Customers and related enquiries, complaints and liabilities, including in relation to delivery of Goods and/or services.
                                </p>
                                </h6>
                                <h5>6. Return, Refund and Replacement of Goods and/or Services</h5>
                                <h6>
                                <p>6.1 Seller shall deal directly with, and be responsible to, Customers on matters relating to return, refund, replacement and cancellation of Goods and/or services. The return and/or exchange of any damaged or defective Goods and/or services (where applicable) shall be managed according to the Seller’s store policy in force from time to time.
                                </p>
                                <p>6.2 Except as stated in clauses 6.3 and 7.1, MCITC will not be required to process any refund to Customers, and such refund requirements shall be settled between Seller and Customers;
                                </p>
                                <p>6.3 If a Customer had made excess payment via MCITC Wallet and notifies MCITC within two (2) days of such payment, MCITC shall process the refund of excess payment to such Customer. In the event of shortfall in payment, Customer shall make another payment via MCITC Wallet to pay for the shortfall.
                                </p>
                                </h6>
                                <h5>7. E-coupon</h5>
                                <h6>
                                    7.1 A Seller may offer e-coupon (also known as e-discount coupon) for sale via its online store at MCITC platform; such e-coupon may be used by Customers in conjunction with a purchase via O2O arrangement, to reduce the selling price of the Goods and/or services. Customers may get a refund for the purchase of such e-coupon if such purchase is cancelled before the e-coupon is redeemed and/or expired. The expiry date of such e-coupon is set by MCITC and Seller, and shall not be disputed by Customers.
                                </h6>
                                <h5>8. Risk and property of the Goods and/or services</h5>
                                <h6>
                                <p>8.1 Risk of damage to or loss of the Goods and/or services shall pass to the Buyer at the time of delivery.
                                </p>
                                <p>8.2 Notwithstanding delivery and the passing of risk in the Goods any other provision of these Conditions, the property in the Goods shall not pass to the Buyer until MCITC has received payment in full.
                                </p>
                                <p>8.3 Until such time as the property in the Goods passes to the Buyer, the Buyer shall hold the Goods as MCITC’s fiduciary agent and bailee and shall keep the Goods separate from those of the Buyer.
                                </p>
                                </h6>
                                <h5>9. Warranties and Liabilities</h5>
                                <h6>
                                <p>9.1 Subject as expressly provided in these Conditions, all other warranties, conditions or terms, including those implied by statute or common law, are excluded to the fullest extent permitted by law.
                                </p>
                                <p>9.2 MCITC is not liable for any loss, damage or liability of any kind suffered by Buyer or any third party directly or indirectly caused by the Goods and/or services, and the Buyer shall indemnify MCITC against each loss, liability and cost arising out of such claims.
                                </p>
                                <p>9.3 In no event shall MCITC be liable for loss of profit or goodwill, loss of production or revenue or any type of special indirect or consequential loss whatsoever (including loss or damage suffered by the Buyer as a result of an action brought by a third party) even if such loss were reasonably foreseeable or if MCITC had been advised by the Buyer of the possibility of incurring the same.
                                </p>
                                </h6>
                                <h5>10. General</h5>
                                <h6>
                                <p>10.1 Neither MCITC nor Seller shall be liable for non-performance, error, interruption or delay in the performance of its obligations under these Conditions (or any part thereof) or for any inaccuracy, unreliability or unsuitability of the Platform’s and/or Services’ contents if this is due, in whole or in part, directly or indirectly to an event or failure which is beyond MCITC’s or Seller’s reasonable control.
                                </p>
                                <p>10.2 Any notice required or permitted to be given by either party to the other under these Conditions shall be in writing addressed, if to MCITC, to its registered office or principal place of business and if to the Buyer, to the address stipulated in the Customer account information with MCITC.
                                </p>
                                <p>10.3 No waiver by MCITC of any breach of the Contract by the Buyer shall be considered as a waiver of any subsequent breach of the same or any other provision. Further, MCITC’s failure to enforce these Conditions shall not constitute a waiver of these terms, and such failure shall not affect the right later to enforce these Conditions.
                                </p>
                                <p>10.4 If any provision of these Conditions is held by any competent authority to be illegal, invalid or unenforceable in whole or in part the validity of the other provisions of these Conditions and the remainder of the provision in question shall not be affected thereby.
                                </p>
                                <p>10.5 The Conditions shall be governed by the laws of Malaysia.
                                </p>
                                <p>10.6 Buyer must exhaust all legal avenues against Seller should any dispute, controversy or claim arises out of or relates to the Contract, or the breach, termination or invalidity thereof, prior to bringing a claim against MCITC. Any such actions brought against MCITC for any dispute, controversy or claim arising out of or relating to the Contract, or the breach, termination or invalidity thereof shall be settled by arbitration in accordance with the Rules for Arbitration of the Asian International Arbitration Centre (AIAC). The arbitral tribunal shall consist of a sole arbitrator, to be appointed by the Chairman of the AIAC. The place of arbitration shall be Kuala Lumpur. Any award by the arbitration tribunal shall be final and binding upon the parties. Notwithstanding the above, MCITC shall be entitled to commence court legal proceedings for the purposes of protecting its intellectual property rights and confidential information or for a breach or non-performance by means of injunctive or other equitable relief.
                                </p>
                                <p>10.7 MCITC may, through the Platform or by such other method of notification as MCITC may designate, vary the terms and conditions of these Conditions, such variation to take effect on the date MCITC specifies through the above means. If Buyer uses the Platform after such date, Buyer is deemed to have accepted such variation. If Buyer do not accept the variation, Buyer must stop access or using the Platform and terminate these Conditions.
                                </p>
                                <p>10.8 These Conditions, and MCITC Terms and Conditions, shall constitute the entire agreement between Buyer and MCITC relating to the subject matter hereof and supersedes and replaces in full all prior understandings, communications and agreements with respect to the subject matter hereof.
                                </p>
                                <p>10.9 MCITC reserves the right to delegate or subcontract the performance of any of its functions in connection with the performance of its obligations under these Conditions and reserves the right to use any service providers, subcontractors and/or agents on such terms as MCITC deems appropriate.
                                </p>
                                <div className="document__subtitle">Platform Engagement Tools Terms & Conditions</div>
                                </h6>
                                <h5>Acceptance of Terms and Conditions</h5>
                                <h6>
                                <ul>
                                    <li>The following Platform Engagement Tools Terms & Conditions (the “Platform Terms”) govern the use of the platform engagement tools and other related services (collectively, the “Tools” and, each a “Tool”) provided by Ecart Services Malaysia Sdn. Bhd. (“MCITC”) on MCITC’s websites and/or mobile applications (the “Platform”).</li>
                                    <li>By using any of the Tools, you are agreeing to be bound by these Platform Terms as a User (as defined below). These Platform Terms are in addition to the Terms of Use and the Terms & Conditions of Sale, which shall continue to govern your use of the Platform and which are hereby incorporated by reference into these Platform Terms. Unless otherwise defined, the definitions and provisions in respect of interpretation in the Terms of Use will apply to these Platform Terms.</li>
                                    <li>The use of the Tools may be subject to additional terms (“Additional Terms”) that MCITC may prescribe from time to time. In relation to any Tool, the Additional Terms that govern the use of such Tool shall be made accessible via such Tool. If you do not agree to any of the Additional Terms, you should discontinue your use of the Tools that are subject to those Additional Terms.</li>
                                    <li>In the case of any inconsistency or conflict between any documents referred to in these Platform Terms that is not expressly resolved in those documents, such inconsistency or conflict will be resolved in the following order of descending priority: the relevant Additional Terms, the Platform Terms, the Terms of Use and the Terms & Conditions of Sale.</li>
                                </ul>
                                <h5>Tools Conditions</h5>
                                <ul>
                                    <li>The Tools are offered solely for the purpose of a User’s personal entertainment and benefit. The use of the Tools for business or commercial purposes is strictly prohibited.</li>
                                    <li>MCITC may, from time to time and without giving any reason or prior notice, upgrade, modify, suspend, discontinue the provision of, or remove any of the Tools, and MCITC shall not be liable if any such upgrade, modification, suspension, discontinuation or removal affects your use of the Platform or prevents you from accessing any of the Tools.</li>
                                    <li>A “User” means a Customer who has installed the MCITC mobile app and registered for a customer account on the Platform. The use of certain Tools may be subject to additional terms of eligibility, which shall be prescribed by MCITC in its sole discretion; such additional terms of eligibility would be set out in the relevant Additional Terms.</li>
                                    <li>Users shall be prohibited from running the Tools (including all individual mobile application page interfaces) with programs other than the relevant MCITC client program provided by MCITC. Examples of prohibited programs include, without limitation, automated bots and other tools meant to replace or supplement the relevant MCITC client program provided by MCITC, as well as scripts and completely or partially automated programs that provide any User with any advantage over other Users by enabling, for example, auto-refresh functions and other integrated browser mechanisms that use or concern automated procedures for using the Tools.</li>
                                    <li>Users are, under no circumstances, permitted to do any of the following:</li>
                                    <li>create, exploit or use bugs, cheats, mods and/or hacks, or any other third party software products that may change the result, function or gameplay of the Tools;</li>
                                    <li>use software that allows the mining or scraping of data or otherwise intercepts or collects information in connection with the Tools;</li>
                                    <li>use any rewards (including, without limitation, virtual items such as deal, platform or brands vouchers) acquired via the Tools for any purpose other than the purchase of Products on the Platform; and</li>
                                    <li>sell, buy or trade customer accounts on the Platform, and the foregoing shall include all circumventions, similar actions or actions that produce an effect that matches the aforementioned prohibitions.</li>
                                </ul>
                                </h6>
                                <h5>Warranties and Liability</h5>
                                <h6>
                                <ul>
                                    <li>MCITC offers the Tools within the context of its technical and operational capabilities.</li>
                                    <li>Unless expressly set out in these Platform Terms or the relevant Additional Terms, to the fullest extent permitted by law, neither MCITC nor any of its service providers or affiliates makes any warranty (whether express or implied), representation or undertaking about the Tools (including, without limitation, their accuracy, availability and reliability), any software or hardware used with the Tools, any application or feature accessed by a User using the Tools, or the reliability or quality of the underlying telecommunications network accessed by such User using the Tools.</li>
                                    <li>The Tools are provided on an ‘as is’ and ‘as available’ basis, and their availability is subject to the availability, functionality and reliability of resources used to provide the Tools (including, without limitation, the Platform, MCITC’s systems and the relevant third party tools), downtime and lack of availability (whether for technical reasons, required maintenance work, or otherwise), as well as events, circumstances or causes beyond MCITC's reasonable control.</li>
                                    <li>To the fullest extent permitted by law, MCITC shall not be responsible to any User for any loss, damage, fine, regulatory action, claim or compensation of whatever nature arising from or relating to such User's use of, or inability to use, the Tools (collectively, the “Liabilities”) including but not limited to (i) such User’s breach of these Platform Terms, (ii) any alleged unauthorised transactions, disruptions, errors, defects or unavailability of the Tools, and (iii) any loss of data or damage to any software or hardware used by such User to access the Tools.</li>
                                    <li>In the event that any Liabilities are not excluded under clause 4 of these Platform Terms, to the fullest extent permitted by law, MCITC’s maximum aggregate liability to any User in respect of such Liabilities, whether under all applicable laws of contract, tort or otherwise, shall be limited to RM150.</li>
                                </ul>
                                <h5>Content Restrictions</h5>
                                <ul>
                                    <li>The Tools include various content, imagery, media and graphics that are protected by trademarks, copyrights or other means for the benefit of MCITC or third parties. Unless explicitly permitted by these Platform Terms, or otherwise agreed in writing by MCITC, no User or any third party may edit, copy, distribute, publicly reproduce or use any Tool for any purpose other than the purpose set out in clause 1 of these Platform Terms. Copyright information and brand names may not be changed, hidden or removed. The term “content” includes all and any data, images, text, graphics, music, sounds, sound sequences, videos, software programs and codes, and any other information provided or developed by MCITC, and any such services available for download.</li>
                                    <li>Users are obliged to abstain from any measure which may compromise or interrupt the proper functioning of the Platform, the Tools or any individual services or functions on the Platform. Users are also required to abstain from any measure which may allow unauthorised access to data.</li>
                                </ul>
                                </h6>
                                <h5>User’s Obligations</h5>
                                <h6>
                                <ul>
                                    <li>Each User acknowledges and agrees:</li>
                                    <li>to comply with all applicable laws and regulations when using the Tools;</li>
                                    <li>to comply with all third party terms (including, without limitation, any applicable terms of use, policies and guidelines, as well as third party terms of sharing channels that a User may use to invite others to use the Tools) that apply to the use of the Tools used by such User;</li>
                                    <li>to be responsible for all information that is communicated, submitted or transmitted, whether to MCITC or third parties, from such User's account or device in the course of such User’s use of the Tools;</li>
                                    <li>not to use the Tools or permit the use of the Tools in any manner which may adversely affect other Customers' or Users’ use of the Tools or the goodwill or reputation of MCITC or the MCITC group of companies; and</li>
                                    <li>to be responsible for complying with these Platform Terms.</li>
                                    <li>Where MCITC, in its sole discretion, discovers or suspects that a User has breached any of these Platform Terms or the relevant Additional Terms, MCITC may take all such steps and remedies as it deems appropriate. Such steps include, without limitation:</li>
                                    <li>to investigate such User's account;</li>
                                    <li>to prevent, restrict or suspend the access of such User to the Tools (or any part thereof) or the Platform;</li>
                                    <li>to report any activity it suspects to be in violation of any applicable law, statute or regulation to the appropriate authorities and to co-operate with such authorities;</li>
                                    <li>to forfeit any rewards which a User may have received due to the User’s use of the Tools; and</li>
                                    <li>to cancel any Orders placed during a User’s use of the Tools.</li>
                                </ul>
                                </h6>
                                <h5>Data Collected by MCITC</h5>
                                <h6>
                                <ul>
                                    <li>
                                        MCITC may collect information from the Users in the course of their use of the Tools. Such information may include personal information such as photographs, names and usernames that a User may upload, provide or use.
                                    </li>
                                    <li>
                                        Any personal information that MCITC collects may be used by it, or shared with or transferred to third parties (including related companies, third party service providers, and other Users), for any or all of the following purposes:
                                    </li>
                                    <li>
                                        to display on scoreboards on the Platform (as defined in the Terms of Use) in relation to the Tools;
                                    </li>
                                    <li>
                                        to facilitate the administration of the Tools and any rewards associated with the Tools; and
                                    </li>
                                    <li>
                                        to otherwise facilitate the use of the Tools.
                                    </li>
                                    <li>
                                        For the avoidance of doubt, the Privacy Policy (and the notification of the purposes of data collection therein) as referred to in the Terms of Use shall apply to all personal information referred to under these Platform Terms.
                                    </li>
                                </ul>
                                </h6>
                                <h5>Miscellaneous</h5>
                                <h6>
                                <ul>
                                    <li>If at any time any provision of these Platform Terms or any Additional Terms shall be held to be illegal, invalid, or unenforceable, in whole or in part, the provision shall apply with whatever deletion or modification is necessary so that the provision is legal, valid and enforceable and gives effect to the commercial intention of MCITC. To the extent it is not possible to delete or modify the provision, in whole or in part, under this clause, then such provision or part of it shall, to the extent that it is illegal, invalid or unenforceable, be deemed not to form part of these Platform Terms or the relevant Additional Terms, as the case may be, and the legality, validity and enforceability of the remainder of these Platform Terms or the Additional Terms (as the case may be) shall, subject to any deletion or modification made under this clause, not be affected.</li>
                                    <li>MCITC reserves the sole right to alter, modify, add to or otherwise vary these Platform Terms at any time and from time to time, and in such manner as MCITC deems appropriate at its absolute discretion. In the event of variation of these Platform Terms, if you continue to use the Tools thereafter, you shall be bound by the Platform Terms as so amended and shall be deemed to have accepted the Platform Terms as so amended.</li>
                                    <li>The laws of Malaysia shall apply to and govern these Platform Terms. Any dispute arising out of or relating to these Platform Terms, including the existence, validity, interpretation, performance, breach or termination thereof or any dispute regarding non-contractual obligations arising out of or relating to it shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre under the SIAC Administered Arbitration Rules in force when the notice of arbitration is submitted. The seat of arbitration shall be Singapore. The number of arbitrators shall be one. The arbitration proceedings shall be conducted in English.</li>
                                </ul>
                                </h6>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageCampaignCondition;
