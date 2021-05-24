// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SitePagePolicy() {
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
                            <h1 className="document__title">Privacy Policy</h1>
                            <div className="document__subtitle">PLEASE READ THIS PRIVACY POLICY CAREFULLY. 
                                                                BY CLICKING OR CHECKING “SIGN UP”, “I AGREE 
                                                                TO MCITC’S PRIVACY POLICY”, “I AGREE AND CONSENT 
                                                                TO THE COLLECTION, USE, DISCLOSURE, STORAGE, TRANSFER 
                                                                AND/OR PROCESSING OF MY PERSONAL DATA FOR THE PURPOSE 
                                                                STATED IN, AND UNDER THE TERMS OF, MCITC’S PRIVACY POLICY” 
                                                                OR SIMILAR STATEMENTS AVAILABLE AT THE MCITC REGISTRATION 
                                                                PAGE OR IN THE COURSE OF PROVIDING YOU WITH THE SERVICES 
                                                                OR ACCESS TO THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE 
                                                                READ AND UNDERSTOOD THE TERMS OF THIS PRIVACY POLICY AND 
                                                                THAT YOU HAVE AGREED AND CONSENTED TO THE COLLECTION, USE, 
                                                                DISCLOSURE, STORAGE, TRANSFER AND/OR PROCESSING OF YOUR 
                                                                PERSONAL DATA AS DESCRIBED AND UNDER THE TERMS HEREIN.</div>
                        </div>
                        
                        <div className="document__content typography" style={{textalign:"left"}}>
                            <p>
                                <h5>1. Introduction to this Privacy Policy</h5>
                                <h6>
                                    <p>
                                        1.1. MCITC and its affiliates (collectively or individually, "MCITC", "we" or "us" take your privacy seriously. Depending on your location, the MCITC entity controlling your personal data will be MCITC South East Asia Pte. Ltd. and/or as follows,
                                        Malaysia: Malaysia-China International Trading Centre, Sejingkat, 93050 Kuching, Sarawak
                                        Where applicable, this Privacy Policy should be read in conjunction with the Country-Specific Riders for your jurisdiction as set out in Section 13 below.
                                    </p>
                                    <p>
                                        1.2. In the course of providing you with the Services or access to the Platform (as defined in the Terms of Use), we will be collecting, using, disclosing, storing and/or processing data, including your personal data. In this Privacy Policy, Platform shall also refer to the relevant seller platform(s).
                                    </p>
                                    <p>
                                        1.3. This Privacy Policy exists to keep you in the know about how we collect, use, disclose, store and/or process the data we collect and receive during the course of providing the Services or access to the Platform to you, our user, whether you are using our Platform as a buyer or a seller. We will only collect, use, disclose, store and/or process your personal data in accordance with this Privacy Policy.
                                    </p>
                                    <p>
                                        1.4. It is important that you read this Privacy Policy together with any other applicable notices we may provide on specific occasions when we are collecting, using, disclosing and/or processing personal data about you, so that you are fully aware of how and why we are using your personal data.
                                    </p>
                                    <p>
                                        1.5. We may update this Privacy Policy from time to time. Any changes we make to this Privacy Policy in the future will be reflected on this page and material changes will be notified to you. Where permissible under local laws, your continued use of the Services, access to the Platform or use of the Services, including placing Orders (as defined in the Terms of Use) on the Platform, or express consent thereto, shall constitute your acknowledgment and acceptance of the changes we make to this Privacy Policy. You agree that it is your responsibility to check back frequently to see any updates or changes to this Privacy Policy.
                                    </p>
                                    <p>
                                        1.6. This Privacy Policy applies in conjunction with other notices, contractual clauses and consent clauses that apply in relation to the collection, storage, use, disclosure and/or processing of your personal data by us and is not intended to override them unless we state expressly otherwise.
                                    </p>
                                    <p>
                                        1.7. All of these terms apply to MCITC's users, whether buyers or sellers, unless stated specifically to apply only to buyers or only to sellers.
                                    </p>
                                </h6>
                                <h5>2. The Personal Data We Collect From You</h5>
                                <h6>
                                <p>
                                    2.1. Personal data means any information about an individual, whether recorded in a material form or not and whether true or not, who can be identified from that data (whether directly or indirectly), or from that data and other data to which we have or are likely to have access.
                                </p>
                                <p>
                                    2.2. During the course of your use of the Platform and the provision of the Services, we may collect personal data about you, as follows:
                                </p>
                                <p>(a) Where you are a buyer:</p>
                                <ol style={{ listStyleType: "lower-roman" }}>
                                    <li>Identity data, such as your name, gender, profile picture, and date of birth;</li>
                                    <li>Contact data, such as billing address, delivery address, email address and phone numbers;</li>
                                    <li>Biometric data, such as voice files when you use our voice search function, and facial and other bodily features and voice of yourself and/or another person featured in your video when you upload videos onto the Platform;</li>
                                    <li>Account data, such as bank account details, bank statements, credit card details and payment details (such account data may also be collected directly by our affiliates and/or third party payment service providers);</li>
                                    <li>Transaction data, such as details about orders and payments, and other details of products and Services related to you;</li>
                                    <li>Technical data, such as Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, international mobile equipment identity, device identifier, IMEI, MAC address, cookies (where applicable) and other information and technology on the devices you use to access the Platform;</li>
                                    <li>Profile data, such as your username and password, orders related to you, your interests, preferences, feedback and survey responses;</li>
                                    <li>Usage data, such as information on how you use the Platform, products and Services or view any content on the Platform, including the time spent on the Platform, items and data searched for on the Platform, access times and dates, as well as websites you were visiting before you came to the Platform and other similar statistics;</li>
                                    <li>Location data, such as when you capture and share your location with us in the form of photographs or videos and upload such content to the Platform;</li>
                                    <li>Marketing and communications data, such as your preferences in receiving marketing from us and our third parties, your communication preferences and your chat, email or call history on the Platform or with third party customer service providers; and</li>
                                    <li>Additional information we may request you to submit for due diligence checks as required for identity verification (such as copies of government issued identification, e.g. passport, ID cards, etc.) or if we believe you are violating our Privacy Policy or our Terms of Use.</li>
                                </ol>
                                <p>(b) Where you are a seller:</p>
                                <ol style={{ listStyleType: "lower-roman" }}>
                                    <li>Identity and contact data, such as your name, date of birth or incorporation, company name, address, email address, phone number and other business-related information (e.g. company registration number, business licence, tax information, shareholder and director information, etc.);</li>
                                    <li>Account data, such as bank account details, bank statements, credit card details and payment details (such account data may also be collected directly by our affiliates and/or third party payment service providers);</li>
                                    <li>Transaction data, such as details about orders and payments, and other details of products and Services related to you;</li>
                                    <li>Technical data, such as Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, international mobile equipment identity, device identifier, IMEI, MAC address, cookies (where applicable) and other information and technology on the devices you use to access the Platform;</li>
                                    <li>Profile data, such as your username and password, orders related to you, your interests, preferences, feedback and survey responses;</li>
                                    <li>Usage data, such as information on how you use the Platform, products and Services or view any content on the Platform, including the time spent on the Platform, items and data searched for on the Platform, access times and dates, as well as websites you were visiting before you came to the Platform and other similar statistics;</li>
                                    <li>Location data, such as when you capture and share your location with us in the form of photographs or videos and upload such content to the Platform;</li>
                                    <li>Marketing and communications data, such as your preferences in receiving marketing from us and our third parties and your communication preferences and your chat, email or call history on the Platform or with our third party seller service providers; and</li>
                                    <li>Additional information we may request you to submit for authentication (such as copies of government issued identification, e.g. passport, ID cards, etc.) or if we believe you are violating our Privacy Policy or our Terms of Use.</li> 
                                </ol>
                                <p>How we receive your personal data</p>
                                <p>2.3. During the course of your use of the Platform and our provision of the Services, we may receive personal data from you in the situations, as follows:</p>
                                <ol style={{ listStyleType: "lower-alpha" }}>
                                    <li>When you browse our website (both mobile and web versions);</li>
                                    <li>When you create an account with us (as buyer or seller);</li>
                                    <li>When, as a seller, you list products and/or services for sale on the Platform and conduct transactions with buyers in respect of the sale and purchase of those products and/or services through the Platform;</li>
                                    <li>When you apply for, subscribe to or otherwise use any of the Services;</li>
                                    <li>When you make a transaction regarding the products available on the Platform;</li>
                                    <li>When you activate or use any payment-related functions available on the Platform or provided by our third party service providers;</li>
                                    <li>When you use any of the features, functions, or mini-apps available on the Platform or Services;</li>
                                    <li>When you record any user-generated content which is uploaded on the Platform;</li>
                                    <li>When you use the chat function on the Platform;</li>
                                    <li>When you subscribe to our publications or marketing collaterals;</li>
                                    <li>When you enter a competition, promotion or survey;</li>
                                    <li>When you participate in any activity or campaign on the Platform;</li>
                                    <li>When you log in to your account on the Platform or otherwise interact with us via an external service or application, such as Facebook or Google;</li>
                                    <li>When any other user of the Platform posts any comments on the content you have uploaded on the Platform or when you post any comments on other users’ content uploaded to the Platform;</li>
                                    <li>When a third party lodges a complaint against you or the content you have posted on the Platform; and</li>
                                    <li>When you interact with us offline, including when you interact with our outsourced customer service agents.</li>
                                </ol> 
                                <p>
                                    2.4. We may collect personal data from you, third parties (including but not limited to agents, vendors, contractors, partners and any others who provide services to us, who collect your personal information and/or perform functions on our behalf, or with whom we collaborate, including but not limited to payment service providers, government sources of data, financial providers, credit bureaus, delivery, marketing and other service partners), our affiliates, or such data may be collected automatically when you use the Platform or the Services, as set out in this section. See also section 10 below on the collection of computer data.
                                </p>
                                <p>
                                    2.5. Where we collect personal data from third parties and/or our affiliates, we will only collect your personal data, where permitted by law, for or in connection with the purposes for which those third parties or our affiliates are engaged, for the purposes of our collaboration with the third parties or affiliates, or for the requirement to carry out verification or due diligence checks. During the course of your use of the Platform and our provision of the Services, you agree that you have provided your consent (whether to us, the third party or our affiliates) to the transfer of your personal data from third parties and/or our affiliates to MCITC for the purposes set out in this Privacy Policy or any other terms.
                                </p>
                                <p>
                                    2.6. You must only submit personal data which is accurate and not misleading and you must keep it up to date and inform us of any changes to the personal data you have provided to us. We shall have the right to request for documentation and carry out the necessary checks to verify the personal data provided by you as part of our user verification processes or as required under law.
                                </p>
                                <p>
                                    2.7. We will only be able to collect certain categories of personal data if you voluntarily provide the personal data to us or as otherwise provided for under this Privacy Policy. If you choose not to provide your personal data to us or subsequently withdraw your consent to our use of your personal data, we may not be able to provide you with certain features or functionality on the Services or access to the Platform.
                                </p>
                                <p>
                                    2.8. If you provide personal data of any third party to us, you represent and warrant that you have obtained the necessary consent, license and permissions from that third party to share and transfer his/her personal data to us, and for us to collect, store, use and disclose that data in accordance with this Privacy Policy.
                                </p>
                                <p>
                                    2.9. If you sign up to be a user on our Platform using your social media account or link your MCITC account to your social media account or use certain other MCITC social media features, we may access personal data about you which you have voluntarily provided to your social media provider in accordance with the provider's policies and we will manage your personal data in accordance with this Privacy Policy.
                                </p>
                                </h6>

                                <h5>3. Use and Disclosure of Your Personal Data</h5>
                                <h6>
                                <p>Purpose of Use</p>
                                <p>3.1. The personal data we collect from you or via third parties may be used for certain purposes, as follows:
                                </p>
                                <p>(a) Where you are a buyer:
                                </p>
                                <p>(i) Processing your order for products (whether sold by us or a third party seller)
                                </p>
                                <ul>
                                    <li>To process orders you submit through the Platform;</li>
                                    <li>To deliver the products you have purchased through the Platform. We may pass your personal information on to a third party (e.g. our logistics partner) or relevant regulatory authority (e.g. customs) in order to make delivery of the product to you;</li>
                                    <li>To update you on the delivery of the products;</li>
                                    <li>To provide customer support for your orders; and</li>
                                    <li>To verify and carry out payment transactions (including any credit card payments, bank transfers, offline payments, remittances, or e-wallet transactions) in relation to payments related to you and/or Services used by you. In order to verify and carry out such payment transactions, payment information, which may include personal data, will be transferred to third parties such as our payment service providers.</li>
                                </ul>
                                <p>(ii) Providing Services
                                </p>
                                <ul>
                                    <li>To facilitate your use of the Services or access to the Platform;</li>
                                    <li>To administer your account (if any) with us;</li>
                                    <li>To display your name, username or profile on the Platform (including on any reviews you may post);</li>
                                    <li>To facilitate the use of the mini-apps available on the Platform and purchases made via these mini-apps;</li>
                                    <li>To respond to your queries, feedback, claims or disputes, whether directly or through our third party service providers;</li>
                                    <li>To allow other users to identify you (via the "Find my friends" or any other similar function) as a user of the Service, to allow you to find other users and to connect with them on the Platform, and to support the socialising function of the Services (where applicable);</li>
                                    <li>To assess your application for loan facilities and/or to perform credit risk assessments in relation to application for financing services (where applicable); and</li>
                                    <li>To facilitate the integration of third party’s loyalty membership programmes (including those supported by sellers or brands) with our Platform.</li>
                                </ul>
                                <p>(iii) Marketing and advertising
                                </p>
                                <ul>
                                    <li>To provide you with information we think you may find useful or which you have requested from us (provided you have opted to receive such information);</li>
                                    <li>To send you marketing or promotional information about our or third-party sellers’ products and services on our Platform from time to time (provided you have opted to receive such information);</li>
                                    <li>To help us conduct marketing and advertising; and</li>
                                    <li>To promote the Services and use information that you give to us, such as user-generated content (including video content) that you can choose to upload or broadcast on our Platform and will be accessible on the Internet and may be shared by the public (the latter of which is not within our control), as part of our advertising and marketing campaigns to promote the Platform.</li>
                                </ul>
                                <p>(iv) Legal and operational purposes</p>
                                <ul>
                                    <li>To ascertain your identity in connection with fraud detection purposes;</li>
                                    <li>To compare information, and verify with third parties in order to ensure that the information is accurate;</li>
                                    <li>To process any complaints, feedback, enforcement action and take-down requests in relation to any content you have uploaded to the Platform;</li>
                                    <li>To produce statistics and research for internal and statutory reporting and/or record-keeping requirements;</li>
                                    <li>To store, host, back up your personal data;</li>
                                    <li>To prevent or investigate any actual or suspected violations of our Terms of Use, Privacy Policy, fraud, unlawful activity, omission or misconduct, whether relating to your use of our Services or any other matter arising from your relationship with us;</li>
                                    <li>To perform due diligence checks;</li>
                                    <li>To comply with legal and regulatory requirements (including, where applicable, the display of your name, contact details and company details), including any law enforcement requests, in connection with any legal proceedings, or otherwise deemed necessary by us; and</li>
                                    <li>Where necessary to prevent a threat to life, health or safety.</li>
                                </ul>
                                <p>(v) Analytics, research, business and development
                                </p>
                                <ul>
                                    <li>To understand your user experience with the Services and the Platform;</li>
                                    <li>To improve the layout or content of the pages of the Platform and customise them for users;</li>
                                    <li>To identify visitors on the Platform;</li>
                                    <li>To conduct surveys, including carrying out research on our users’ demographics and behaviour;</li>
                                    <li>To improve our current technology (e.g. voice recognition tech, etc) via machine learning or other means;</li>
                                    <li>To derive further attributes relating to you based on personal data provided by you (whether to us or third parties), in order to provide you with more targeted and/or relevant information;</li>
                                    <li>To conduct data analysis, testing and research, monitoring and analysing usage and activity trends;</li>
                                    <li>To further develop our products and services; and</li>
                                    <li>To know our buyers better.</li>
                                </ul>
                                <p>(vi) Other</p>
                                <ul>
                                    <li>Any other purpose to which your consent has been obtained; and</li>
                                    <li>To conduct automated decision-making processes in accordance with any of the above purposes.</li>
                                </ul>
                                <p>(b) Where you are a seller:
                                </p>
                                <p>(i) Providing Services
                                </p>
                                <ul>
                                    <li>To facilitate your use of the Services or access to the Platform;</li>
                                    <li>To ship or deliver the products you have listed or sold through the Platform. We may pass your personal information on to a third party (e.g. our logistics partners) or relevant regulatory authority (e.g. customs) in order to carry out shipping or delivery of the products listed or sold by you;</li>
                                    <li>To respond to your queries, feedback, claims or disputes, whether directly or through our third party service agents;</li>
                                    <li>To verify your documentation submitted to us facilitate your onboarding with us as a seller on the Platform, including the testing of technologies to enable faster and more efficient onboarding;</li>
                                    <li>To administer your account (if any) with us;</li>
                                    <li>To display your name, username or profile on the Platform;</li>
                                    <li>To verify and carry out financial transactions (including any credit card payments, bank transfers, offline payments, remittances, or e-wallet transactions) in relation to payments related to you and/or Services used by you. In order to verify and carry out such payment transactions, payment information, which may include personal data, will be transferred to third parties such as our payment service providers;</li>
                                    <li>To assess your application for loan facilities and/or to perform credit risk assessments in relation to your application for seller financing (where applicable);</li>
                                    <li>To provide you with ancillary logistics services to protect against risks of failed deliveries or customer returns; and</li>
                                    <li>To facilitate the return of products to you (which may be through our logistics partner).</li>
                                </ul> 
                                <p>(ii) Marketing and advertising
                                </p>
                                <ul>
                                    <li>To send you marketing or promotional materials about our or third-party sellers’ products and services on our Platform from time to time (provided you have opted to receive such information); and</li>
                                    <li>To help us conduct marketing and advertising.</li>
                                </ul>
                                <p>(iii) Legal and operational purposes
                                </p>
                                <ul>
                                    <li>To produce statistics and research for internal and statutory reporting and/or record-keeping requirements;</li>
                                    <li>To store, host, back up your personal data;</li>
                                    <li>To prevent or investigate any actual or suspected violations of our Terms of Use, Privacy Policy, fraud, unlawful activity, omission or misconduct, whether relating to your use of our Services or any other matter arising from your relationship with us;</li>
                                    <li>To comply with legal and regulatory requirements (including, where applicable, the display of your name, contact details and company details), including any law enforcement requests, in connection with any legal proceedings or otherwise deemed necessary by us;</li>
                                    <li>Where necessary to prevent a threat to life, health or safety;</li>
                                    <li>To process any complaints, feedback, enforcement action and take-down requests in relation to any content you have uploaded to the Platform;</li>
                                    <li>To compare information, and verify with third parties in order to ensure that the information is accurate;</li>
                                    <li>To ascertain your identity in connection with fraud detection purposes; and</li>
                                    <li>To facilitate the takedown of prohibited and controlled items from our Platform.</li>
                                </ul>
                                <p>(iv) Analytics, research, business and development
                                </p>
                                <ul>
                                    <li>To audit the downloading of data from the Platform;</li>
                                    <li>To understand the user experience with the Services and the Platform;</li>
                                    <li>To improve the layout or content of the pages of the Platform and customise them for users;</li>
                                    <li>To conduct surveys, including carrying out research on our users’ demographics and behaviour to improve our current technology (e.g. voice recognition tech, etc) via machine learning or other means;</li>
                                    <li>To derive further attributes relating to you based on personal data provided by you (whether to us or third parties), in order to provide you with more targeted and/or relevant information;</li>
                                    <li>To conduct data analysis, testing and research, monitoring and analysing usage and activity trends;</li>
                                    <li>To further develop our products and services; and</li>
                                    <li>To know our sellers better.</li>
                                </ul>
                                <p>(v) Other
                                </p>
                                <ul>
                                    <li>Any other purpose to which your consent has been obtained; and</li>
                                    <li>To conduct automated decision-making processes in accordance with any of these purposes.</li>
                                </ul>
                                <p>Who we disclose your personal data to
                                </p>
                                <p>3.2. We may share (or permit the sharing of) your personal data with and/or transfer your personal data to third parties and/or our affiliates for the above-mentioned purposes. These third parties and affiliates, which may be located inside or outside your jurisdiction, include but are not limited to:
                                </p>
                                <ol style={{ listStyleType: "lower-roman" }}>
                                    <li>Service providers (such as agents, vendors, contractors and partners) in areas such as payment services, logistics and shipping, marketing, data analytics, market or consumer research, survey, social media, customer service, installation services, information technology and website hosting;</li>
                                    <li>Their service providers and related companies; and</li>
                                    <li>Other users of the Platform or Services.</li>
                                </ol>
                                <p>3.3. In disclosing your personal data to them, we endeavour to ensure that the third parties and our affiliates keep your personal data secure from unauthorised access, collection, use, disclosure, processing or similar risks and retain your personal data only for as long as your personal data is needed to achieve the above-mentioned purposes.
                                </p>
                                <p>3.4. We may also share personal data in connection with any proposed purchase, merger or acquisition of any part of our business, provided that we satisfy the requirements of applicable data protection law when disclosing your personal data.
                                International data transfer
                                </p>
                                <p>3.5. We may transfer or permit the transfer of your personal data outside of your jurisdiction for any of the purposes set out in this Privacy Policy. However, we will not transfer or permit any of your personal data to be transferred outside of such jurisdiction unless the transfer is in compliance with applicable laws.
                                Third party services
                                </p>
                                <p>3.6. We may share your personal data with our third party service providers or affiliates (e.g. payment service providers) in order for them to offer services to you other than those related to your use of the Platform or our Services. Your acceptance and use of the third party service provider’s or our affiliate’s services shall be subject to terms and conditions as may be agreed between you and the third party service provider or our affiliate. Upon your acceptance of the third party service provider’s or our affiliate’s service offering, the collection, use, disclosure, storage, transfer and processing of your data (including your personal data and any data disclosed by us to such third party service provider or affiliate) shall be subject to the applicable privacy policy of the third party service provider or our affiliate, which shall be the data controller of such data. You agree that any queries or complaints relating to your acceptance or use of the third party service provider’s or our affiliate’s services shall be directed to the party named in the applicable privacy policy.
                                </p>
                                </h6>
                                <h5>4. Withdrawal of Consent to Continued Use, Disclosure, Storing and/or Processing of Personal Data</h5>
                                <h6>
                                <p>4.1. You may communicate the withdrawal of your consent to the continued use, disclosure, storing and/or processing of your personal data by contacting us using the contact details below, subject to the conditions and/or limitations imposed by applicable laws or regulations.
                                </p>
                                <p>4.2. Please note that if you communicate your withdrawal of your consent to our use, disclosure, storing or processing of your personal data for the purposes and in the manner as stated above or exercise your other rights as available under applicable local laws, we may not be in a position to continue to provide the Services to you or perform any contract we have with you, and we will not be liable in the event that we do not continue to provide the Services to, or perform our contract with you. Our legal rights and remedies are expressly reserved in such an event.
                                Marketing information
                                </p>
                                <p>4.3. You may unsubscribe from receiving marketing information at any time in our mobile application settings or by using the unsubscribe function within the electronic marketing material. We may use your contact information to send newsletters from us and from our related companies.
                                </p>
                                </h6>
                                <h5>5. Updating Your Personal Data</h5>
                                <h6>
                                <p>5.1. It is important that the personal data you provide to us is accurate and complete for you to continue using the Platform and for us to provide the Services. You are responsible for informing us of changes to your personal data, or in the event you believe that the personal data we have about you is inaccurate, incomplete, misleading or out of date.
                                </p>
                                <p>5.2. You can update your personal data anytime by accessing your account on the Platform.
                                </p>
                                <p>5.3. We take steps to share the updates to your personal data with third parties and our affiliates with whom we have shared your personal data if your personal data is still necessary for the above-stated purposes.
                                </p>
                                </h6>
                                <h5>6. Accessing and Correcting Your Personal Data</h5>
                                <h6>
                                <p>6.1. You may request information about your personal data which we have collected, or enquire about the ways in which your personal data may have been used, disclosed, stored or processed by us via the personal account information setting on our Platform or by contacting us using the contact details below. You may also request correction of any error or omission in your personal data which we have collected in the same way. In order to facilitate processing of your request, it may be necessary for us to request further information relating to your request. Where permissible under law, we may refuse such correction requests if deemed vexatious or unreasonable.
                                </p>
                                <p>6.2. Where permitted by applicable data protection laws, we reserve the right to charge a reasonable administrative fee for retrieving your personal data records. If so, we will inform you of the fee before processing your request.
                                </p>
                                </h6>
                                <h5>7. Security of Your Personal Data</h5>
                                <h6>
                                <p>7.1. To safeguard your personal data from unauthorised access, collection, use, disclosure, processing, copying, modification, disposal, loss, misuse, modification or similar risks, we have introduced appropriate administrative, physical and technical measures such as:
                                </p>
                                <ol style={{ listStyleType: "lower-alpha" }}>
                                    <li>Restricting access to personal data to individuals who require access;</li>
                                    <li>Maintaining technology products to prevent unauthorised computer access;</li>
                                    <li>Using 128-bit SSL (secure sockets layer) encryption technology when processing your financial details; and/or</li>
                                    <li>Implementing other security measures as required by applicable law.</li>
                                </ol> 
                                <p>7.2. You should be aware, however, that no method of transmission over the Internet or method of electronic storage is completely secure. While security cannot be guaranteed, we strive to protect the security of your information and are constantly reviewing and enhancing our information security measures.
                                </p>
                                </h6>
                                <h5>8. Retention of Personal Data</h5>
                                <h6>
                                8.1. We will only retain your personal data for as long as we are either required or permitted to by law or as relevant for the purposes for which it was collected.
                                8.2. We will cease to retain your personal data, or remove the means by which the data can be associated with you, as soon as it is reasonable to assume that such retention no longer serves the purposes for which the personal data was collected, and is no longer necessary for any legal or business purpose.
                                </h6>
                                <h5>9. Minors</h5>
                                <h6>
                                <p>9.1. MCITC does not sell products to minors (which is to be determined based on the applicable law), nor does it intend to provide any of the Services or the use of the Platform to minors. We do not knowingly collect any personal data relating to minors.
                                </p>
                                <p>9.2. You hereby confirm and warrant that you are above the age of minority and you are capable of understanding and accepting the terms of this Privacy Policy. If you are a minor, you may use our Platform only with the involvement of a parent or legal guardian.
                                </p>
                                <p>9.3. As a parent or legal guardian, please do not allow minors under your care to submit personal data to MCITC. In the event that such personal data of a minor is disclosed to MCITC, you hereby consent to the processing of the minor’s personal data and accept and agree to be bound by this Privacy Policy and take responsibility for his or her actions.
                                </p>
                                <p>9.4. We will not be responsible for any unauthorised use of the Services on the Platform by yourself, users who act on your behalf or any unauthorised users. It is your responsibility to make your own informed decisions about the use of the Services on the Platform and take necessary steps to prevent any misuse of the Services on the Platform.
                                </p>
                                </h6>
                                <h5>10. Collection of Computer Data</h5>
                                <h6>
                                <p>10.1. We or our authorised service providers may use cookies, web beacons, and other similar technologies in connection with your use of the Services or access of the Platform.
                                </p>
                                <p>10.2. When you visit the Platform through your computer, mobile device, or any other device with Internet connectivity, our company servers will automatically record data that your browser sends whenever you visit a website, such as the technical data and usage data outlined in Section 2 above.
                                </p>
                                <p>10.3. This data is collected for analysis and evaluation in order to help us improve our website and the services and products we provide, as well as to help us to personalise the content to match your preferred interests more quickly. The data is also collected to make the Services and the Platform more convenient and useful to you, and to provide more relevant advertising related to market products, services and features to you.
                                </p>
                                <p>10.4. Cookies are small text files (typically made up of letters and numbers) placed in the memory of your browser or device when you visit a website or view a message. They allow us to recognise a particular device or browser. Web beacons are small graphic images that may be included on our Services and the Platform. They allow us to count users who have viewed these pages so that we can better understand your preference and interests.
                                </p>
                                <p>10.5. You may be able to manage and delete cookies through your browser or device settings. However, certain cookies are required to enable core functionality (such as adding items to your shopping basket), so please note that changing and deleting cookies may affect the functionality available on the Platform or through our Services.
                                </p>
                                </h6>
                                <h5>11. Third Party Sites</h5>
                                <h6>
                                <p>11.1. The Platform may contain links to other websites operated by other parties, such as our business affiliates, merchants or payment gateways. We are not responsible for the privacy practices of websites operated by these other parties. You are advised to check on the applicable privacy policies of those websites to determine how they will handle any information they collect from you.
                                </p>
                                </h6>
                                <h5>12. Questions, Feedback, Concerns, Suggestions or Complaints</h5>
                                <h6>
                                <p>12.1. If you have any questions on personal data protection or data privacy, please refer to our list of frequently asked questions on data protection / privacy.
                                </p>
                                <p>12.2. If your queries are not covered in our FAQs, or if you have any queries or complaints about this Privacy Policy or how we handle your personal data, please feel free to contact us via our online chat service or as follows,
                                Malaysia
                                Tel: (60) 12-850 9198
                                </p>
                                </h6>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePagePolicy;
