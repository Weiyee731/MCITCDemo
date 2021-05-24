// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

// application
import StroykaSlick from "../shared/StroykaSlick";

// data stubs
import theme from "../../data/theme";
import bg from "../../assets/bg.jpg";
// import logo from "../../assets/MCITC.png";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const slickSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 379,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SitePageAboutUs() {
  return (
    <div className="block about-us">
      <Helmet>
        <title>{`About Us — ${theme.name}`}</title>
      </Helmet>

      <div className="about-us__image">
        <img src={bg} alt="" style={{ width: "100%", height: "70%" }} />{" "}
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="about-us__body">
              <h1 className="about-us__title">About Us</h1>
              <div className="about-us__text typography">
                <p>
                  Founded in 2020, MCITC is first Malaysia eCommerce platform
                  which mainly connect to China region. Our focus is supply
                  hardware to other Southeast Asia country. This far-aparted
                  country is connected using our logistics and technology. We
                  aim to serve the customer from all around the world.
                </p>
              </div>
              <div className="about-us__team">
                <h2 className="about-us__team-title">Our main Services</h2>
                {/* <div className="about-us__team-subtitle text-muted">
                  Want to work in our friendly team?
                  <br />
                  <Link to="/site/contact-us">Contact us</Link> and we will
                  consider your candidacy.
                </div> */}
                <div className="about-us__teammates teammates">
                  <StroykaSlick {...slickSettings}>
                    <div className="teammates__item teammate">
                      <div className="teammate__avatar">
                        {/* <img src={logo}  alt="" />*/}
                        <LocalMallIcon/>
                      </div>
                      <div className="teammate__name">Virtual Shopping</div>
                      <div className="teammate__position text-muted">
                        Not even to put your feet on land 
                      </div>
                    </div>
                    <div className="teammates__item teammate">
                      <div className="teammate__avatar">
                        {/* <img src={logo}  alt="" /> */}
                        <DriveEtaIcon/>
                      </div>
                      <div className="teammate__name">Logistics</div>
                      <div className="teammate__position text-muted">
                        Reach your room
                      </div>
                    </div>
                    <div className="teammates__item teammate">
                      <div className="teammate__avatar">
                        {/* <img src={logo} alt="" /> */}
                        <AccountBalanceWalletIcon/>
                      </div>
                      <div className="teammate__name">E-Payment</div>
                      <div className="teammate__position text-muted">
                        Left your huge and heavy wallet behind
                      </div>
                    </div>
                  </StroykaSlick>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitePageAboutUs;
