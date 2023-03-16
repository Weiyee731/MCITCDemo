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
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import bag from "./bag.gif";
import { Card } from "react-bootstrap";
import { borderRadius } from "@mui/system";
import aboutUsImage from "./aboutUsImage.jpg";
import commitment from "./commitment.jpg";
import whoWeAre from "./whoWeAre.jpg";
import products from "./products.jpg";
import PageHeader from "../shared/PageHeader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import PropTypes from "prop-types";
import "./AboutUs.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/css/autoplay'
import { Typography } from "@mui/material";
import bestPrice from "./bestPrice.png";
import choice from "./choice.png";
import customerSupport from "./customerSupport.png";
import promotion from "./promotion.png";
import process from "./process.png";
import takeAway from "./takeAway.png";
import startBusiness from "./startBusiness.png"
import shopOnline from "./shopOnline.png"
import hotelBooking from "./hotelBooking.png"


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
  const [Animation1, setAnimation1] = useState()
  const [Animation2, setAnimation2] = useState()
  const [Animation3, setAnimation3] = useState()
  const [Animation4, setAnimation4] = useState()
  const [Animation5, setAnimation5] = useState()
  const [Animation6, setAnimation6] = useState()

  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'About Us', url: '' },
  ];

  const onScroll = () => {


    if (window.pageYOffset === 100) {
      setAnimation1("w3-animate-right")
    }
    if (window.pageYOffset === 300) {
      setAnimation2("w3-animate-left")
      setAnimation3("w3-animate-right")
    }
    if (window.pageYOffset === 600) {
      setAnimation4("w3-animate-bottom")
    }
    if (window.pageYOffset === 900) {
      setAnimation5("w3-animate-left")
      setAnimation6("w3-animate-right")
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  useEffect(() => {
  }, [])


  return (
    <React.Fragment>
      <div className="block about-us">
        <Helmet>
          <title>{`About Us — ${theme.name}`}</title>
        </Helmet>
        <PageHeader header="About Us" breadcrumb={breadcrumb} />

        <div className="about-us__image w3-animate-top" style={{ width: "100%", height: "auto", display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "-webkit-fill-available" }}
            src={aboutUsImage}
            alt=""
          />{" "}
          <div className="about-us__title_container">
            <h1 className="about-us__title container w3-animate-top" >About Us</h1>
          </div>
        </div>
        <div className="container mt-4">
          <div id="content">
            <div className="container heading mt-3">
              <div className="w3-animate-right" style={{ textAlign: "justify" }}>
                <h2>MyEmporia</h2>
                <p>Founded in 2020, MyEmporia is an online platform that provided
                  a variety of services in Kuching, Sarawak, Malaysia. Our platform services are not
                  only helping users to shop online but also helping sellers to start their
                  E-business. We had provided a platform for buyers to purchase products online
                  besides E-commerce management system for sellers to sell their products.
                  Our company are dedicated to provide the sellers a sustainable business model online
                  with long term meaningful relationships in Sarawak. With
                  our great experience in providing retail services on our top
                  quality of hardwares and tools around the whole Sarawak, and we
                  are proud to announcing our online platform to serve better.</p>
              </div>
            </div>
            <div className="container heading">
              <div className="row" id="content" style={{ textAlign: "justify" }}>
                <div className="col-12 col-lg-6">
                  <div className={Animation2}>
                    <h2>VISION</h2>
                    <p>
                      To be the most customer-friendly commerce
                      platform in world-wide where the customer can discover
                      anything they desired online.<br />
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className={Animation3}>
                    <h2>MISSION</h2>
                    <p>
                      We strive to provide our customer the best selection option with the lowest possible price,
                      create a seamless shopping experience, provide the most convenience  and
                      quality services for customers.
                      Our primary goals are focus and fulfill customer need with quality products and best service. We are
                      determined to be the most reliable and innovative distributor in Malaysia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="content" className="mt-4">
            <div className={Animation4}>
              <h2 style={{ color: "#2b535e" }}>Why MyEmporia?</h2>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-direction-row why-us-content">
                    <img alt="" src={choice} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Wide Selection of Choices</Typography>
                      <p>Enjoy your shopping experience with millions of favorable products</p>
                    </div>
                  </div>
                  <div className="d-flex flex-direction-column why-us-content">
                    <img alt="" src={process} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Simplify Booking Process</Typography>
                      <p>Feel the simplicity of booking and shopping process</p>
                    </div>
                  </div>
                  <div className="d-flex flex-direction-column why-us-content">
                    <img alt="" src={customerSupport} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Outstanding Customer Support</Typography>
                      <p>Give the best support and assistance with various languages</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-direction-column why-us-content">
                    <img alt="" src={takeAway} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Fast Delivery</Typography>
                      <p>Provide door to door delivery services with just one click of button</p>
                    </div>
                  </div>
                  <div className="d-flex flex-direction-column why-us-content">
                    <img alt="" src={promotion} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Exclusive Promotion</Typography>
                      <p>Ultimate promotion with competitive price for all buyers</p>
                    </div>
                  </div>
                  <div className="d-flex flex-direction-column why-us-content">
                    <img alt="" src={bestPrice} width="10%" height="10%" />
                    <div className="why-us-descp">
                      <Typography variant="h6" className="why-us-title">Fair Price </Typography>
                      <p>Provide the lowest price with highest product quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="container mt-4">
          <div id="content" className="mt-4" style={{ marginRight: "0.5vw" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <h2 style={{ color: "#2b535e" }}>What We Provide</h2>
            </div>
            <div className="d-flex align-items-center" style={{ flexDirection: "column" }}>
              <div className="row">
                <div className={`col-12 col-lg-5 ${Animation5}`} style={{ display: "flex", justifyContent: "center" }}>
                  <img alt="" src={shopOnline} width="60%"></img>
                </div>
                <div className={`col-12 col-lg-7 ${Animation6}`}>
                  <div className="m-4">
                    <Typography variant="h6">Virtual Shopping</Typography>
                    <p>Shop through multifunctional online shop website. Give you a professional team accompany you to transform online.</p>
                    <button
                      type="button"
                      onClick={() => this.props.history.push("/")}
                      className="btn btn-primary product-card__addtocart"
                      style={{ borderRadius: "5px", zIndex: "999" }}
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              </div>
              <div className={Animation6}>
                <div className="row" style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <div className={`col-12 col-lg-5 ${Animation6}`} style={{ display: "flex", justifyContent: "center" }}>
                    <img alt="" src={hotelBooking} width="60%"></img>
                  </div>

                  <div className={`col-12 col-lg-7 ${Animation5}`}>
                    <div className="m-4">
                      <Typography variant="h6">Hotel Booking</Typography>
                      <p>Make hotel booking with unlimited promotion and wide selection of choice. Get the latest and first hand promotion to book with lowest price.</p>
                      <button
                        type="button"
                        onClick={() => this.props.history.push("/")}
                        className="btn btn-primary product-card__addtocart"
                        style={{ borderRadius: "5px", zIndex: "999" }}
                      >
                        Book Hotel
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row">
                <div className={`col-12 col-lg-5 ${Animation5}`} style={{ display: "flex", justifyContent: "center" }}>
                  <img alt="" src={startBusiness} width="60%"></img>
                </div>
                <div className={`col-12 col-lg-7 ${Animation6}`}>
                  <div className="m-4">
                    <Typography variant="h6">Manage Your Business</Typography>
                    <p>Allows you to easily manage your hotel business and sell products online with advanced features. Get start your business easily online.</p>
                    <button
                      type="button"
                      onClick={() => this.props.history.push("/")}
                      className="btn btn-primary product-card__addtocart"
                      style={{ borderRadius: "5px", zIndex: "999" }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container mt-4">
          <div id="content" className="d-flex justify-content-center">
            <h2>Our Partners</h2>
          </div>
          <div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{
                delay: 2500,
              }}
              spaceBetween={50}
              slidesPerView={2}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
            >
              <SwiperSlide style={{marginLeft: "55px"}}>Slide 1</SwiperSlide>
              <SwiperSlide><img alt="" src={}></img></SwiperSlide>
              <div className="btnBox swiper-button-prev"></div>
              <div className="btnBox swiper-button-next"></div>
            </Swiper>
          </div>
        </div> */}
      </div>
    </React.Fragment>

  );
}

export default SitePageAboutUs;

SitePageAboutUs.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(["grid-4", "grid-4-sm", "grid-5", "horizontal"]),
  rows: PropTypes.number,
  products: PropTypes.any,
  groups: PropTypes.array,
  withSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
};

SitePageAboutUs.defaultProps = {
  layout: "grid-4",
  rows: 1,
  products: [],
  groups: [],
  withSidebar: false,
  loading: false,
  onGroupClick: undefined,
};
