// react
import React from "react";

// application
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import PaymentFooter from "./PaymentFooter";
import LogisticsFooter from "./LogisticsFooter";
import ToTop from "./ToTop";
import googleplaystore from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.png";
import Logo from "../../assets/Emporia.png";
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
// data stubs
// import theme from "../../data/theme";

export default function Footer() {
  const informationLinks = [
    { title: "About MyEmporia", url: "/site/about-us" },
    // { title: "Afﬁliate Program", url: "/site/affiliate" },
    // { title: "Careers", url: "/site/careers" },
    { title: "Terms & Conditions", url: "/site/terms" },
    { title: "Privacy Policy", url: "/site/policy" },
    // { title: "Campaign Terms & Conditions", url: "/site/campaigncondition" },
    { title: "Contact Us", url: "/site/contact-us" },
    // { title: "Form", url: "/site/Form" },
  ];

  const otherInformationLinks = [
    { title: "Help Center", url: "/site/faq" },
    { title: "How to Buy", url: "/site/howtobuy" },
    { title: "Shipping & Delivery", url: "/site/shippingdelivery" },
    // { title: "International Product Policy", url: "" },
    // { title: "How to Return", url: "/site/howtoreturn" },
    { title: "Question?", url: "/site/faq" },
    // { title: "Contact Us", url: "/site/contact-us" },
  ];


  return (
    <div className="site-footer">
      <div className="container">
        <div className="site-footer__widgets">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-5 site-footer__widget footer-links">
              <h6 className='footer-links__title'>ABOUT US</h6>
              <Link to="/" onClick={() => window.scrollTo(0,0)}>
                <img
                  className="footer-logoImg"
                  src={Logo}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Logo;
                  }}
                />
              </Link>
              <Typography variant="body1" className="footer-links__list">MyEmporia is a virtual shopping mall where you can get your goods with QUALITY GUARANTEE and 99.99% Satisfaction Guarantee.</Typography>
            </div>
            <div className="col-12 col-md-3 col-lg-2">
              {/* <FooterContacts /> */}
              <FooterLinks title="MYEMPORIA" items={informationLinks} />
            </div>
            <div className="col-12 col-md-3 col-lg-2">
              <FooterLinks title="INFORMATION" items={otherInformationLinks} />
            </div>
            {/* <div className="col-12 col-md-3 col-lg-4">
              <PaymentFooter />
              <LogisticsFooter />
            </div> */}
            {/* <div className="lzd-footer-app-downloads">
              <div>
                <div className="title">Go where your heart beats</div>
                <div className="text">Download the App</div>
              </div>
              <div>
                <img width="200" src={googleplaystore} alt="Google Play Store"></img>
              </div>
              <div>
                <img width="200" src={appstore} alt="App Store"></img>
              </div>
            </div> */}
            <div className="col-12 col-md-3 col-lg-3">
              <FooterNewsletter />
            </div>
          </div>
          <hr width="100%" />
          <div className="row">
            <div className="col-12 col-md-4 col-lg-4">
              <Typography variant='caption'>© 2022 MyEmporia Sdn. Bhd. (1422486-P)</Typography>
            </div>
            <div className="col-12 col-md-3 col-lg-3">
              <LogisticsFooter />
            </div>
            <div className="col-12 col-md-5 col-lg-5">
              <PaymentFooter />
            </div>
          </div>
        </div>

        {/* <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            Powered by
            {' '}
            <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>
            {' '}
            — Design by
            {' '}
            <a href={theme.author.profile_url} target="_blank" rel="noopener noreferrer">
              {theme.author.name}
            </a>
          </div>
          <div className="site-footer__payments">
            <img src="images/payments.png" alt="" />
          </div>
        </div> */}
      </div>
      <ToTop />
    </div>
  );
}
