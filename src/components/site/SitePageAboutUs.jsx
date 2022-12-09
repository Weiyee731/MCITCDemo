// react
import React, { useRef, useEffect } from "react";
import { useState } from "react";
// third-party
import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

// application
import StroykaSlick from "../shared/StroykaSlick";

// data stubs
import theme from "../../data/theme";
import bg from "../../assets/bg.jpg";
// import logo from "../../assets/Emporia.png";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import bag from "./bag.gif";
import { Card } from "react-bootstrap";
import { CardContent, Fab } from "@material-ui/core";
import { borderRadius } from "@mui/system";
import aboutUsImage from "./aboutUsImage.jpg";
import commitment from "./commitment.jpg";
import whoWeAre from "./whoWeAre.jpg";
import products from "./products.jpg";

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
  // const [width,setWidth] = useState(window.innerWidth)

  // useEffect(() => {
  //   window.addEventListener('resize', setWidth(window.innerWidth))

  //   return () => {
  //     window.removeEventListener('resize', setWidth(window.innerWidth))
  //   }
  // }, [width])

  return (
    <div className="block about-us">
      <Helmet>
        <title>{`About Us — ${theme.name}`}</title>
      </Helmet>

      <div className="about-us__image">
        <img
          src={aboutUsImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />{" "}
        <div className="about-us__title_container">
          <h1 className="about-us__title container">About Us</h1>
        </div>
      </div>
      <div></div>
      {/* <div className="about-us__text typography row container"> */}
      <div className="container mt-4" style={{ lineHeight: "2.5vw" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-5 mt-5">
            <div className="d-flex justify-content-center">
              <h2>
                Who<span className="about-us-text-title"> We</span> Are
              </h2>
            </div>
            <hr className="about-us__line "></hr>
            <p className="about-us__text">
              Founded in 2020, MyEmporia is an online platform that focusing on
              retails in hardwares and tools in Kuching, Sarawak, Malaysia. With
              our great experience in providing retail services on our top
              quality of hardwares and tools around the whole Sarawak, and we
              are proud to announcing our online platform to serve better.
            </p>
          </div>
          <div className="col-12 col-xl-5 d-flex justify-content-center">
            <img src={whoWeAre} alt="whoWeAre" width="70%"></img>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-xl-5 d-flex justify-content-center">
            <img src={commitment} alt="commitment" width="90%"></img>
          </div>
          <div className="col-12 col-xl-5">
            <div className="d-flex justify-content-center">
              <h2>
                Our <span className="about-us-text-title">Commitment</span>
              </h2>
            </div>
            <hr className="about-us__line "></hr>
            <p className="about-us__text">
              We provided a large variety of choices of truested brand online
              and fast delivery servies from door to door.
            </p>
          </div>
          {/* {width > 1200 ? (
            <>
              <div className="col-5 d-flex justify-content-center">
                <img src={commitment} alt="commitment" width="90%"></img>
              </div>
              <div className="col-5">
                <div className="d-flex justify-content-center">
                  <h2>
                    Our <span className="about-us-text-title">Commitment</span>
                  </h2>
                </div>
                <hr className="about-us__line "></hr>
                <p className="about-us__text">
                  We provided a large variety of choices of truested brand
                  online and fast delivery servies from door to door.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <h2>
                    Our <span className="about-us-text-title">Commitment</span>
                  </h2>
                </div>
                <hr className="about-us__line "></hr>
                <p className="about-us__text">
                  We provided a large variety of choices of truested brand
                  online and fast delivery servies from door to door.
                </p>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <img src={commitment} alt="commitment" width="90%"></img>
              </div>
            </>
          )} */}
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-xl-5">
            <div className="d-flex justify-content-center">
              <h2>
                Our <span className="about-us-text-title">Product</span>
              </h2>
            </div>
            <hr className="about-us__line "></hr>
            <p className="about-us__text">
              MyEmporia delivers high-quality hardware tools product. We are so
              confident you will like the products we offered.
            </p>
          </div>
          <div className="col-12 col-xl-5 d-flex justify-content-center">
            <img src={products} alt="products" width="90%"></img>
          </div>
        </div>
      </div>
      <div
        className="mt-5 d-flex justify-content-center"
        style={{ backgroundColor: "#d1e8e3" }}
      >
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="d-flex justify-content-center">
                <h2 className="about-us__team-title">Our main Services</h2>
              </div>
              <div className="about-us__body">
                <div className="about-us__team">
                  {/* <h2 className="about-us__team-title">Our main Services</h2> */}
                  {/* <h2 className="about-us__team-title">Our main Services</h2> */}
                  {/* <div className="about-us__team-subtitle text-muted">
                  Want to work in our friendly team?
                  <br />
                  <Link to="/site/contact-us">Contact us</Link> and we will
                  consider your candidacy.
                </div> */}
                  <img src={bag} width="200" height="200" />

                  <div className="about-us__teammates teammates">
                    <StroykaSlick {...slickSettings}>
                      <div className="teammates__item teammate">
                        <div className="teammate__name">Virtual Shopping</div>
                        <div className="teammate__avatar">
                          {/* <img src={logo}  alt="" />*/}
                          <LocalMallIcon />
                        </div>
                        <div className="teammate__position text-muted">
                          Not even to put your feet on land
                        </div>
                      </div>
                      <div className="teammates__item teammate">
                        <div className="teammate__name">Logistics</div>
                        <div className="teammate__avatar">
                          {/* <img src={logo}  alt="" /> */}
                          <DriveEtaIcon />
                        </div>
                        <div className="teammate__position text-muted">
                          Reach your room
                        </div>
                      </div>
                      <div className="teammates__item teammate">
                        <div className="teammate__name">E-Payment</div>
                        <div className="teammate__avatar">
                          {/* <img src={logo} alt="" /> */}
                          <AccountBalanceWalletIcon />
                        </div>

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
    </div>
  );
}

export default SitePageAboutUs;
