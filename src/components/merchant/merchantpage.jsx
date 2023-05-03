// react
import React, { useState, useEffect } from 'react';

// third-party
import classNames from "classnames";

// shared
import PageHeader from "../shared/PageHeader";
import { url } from "../../services/utils";

// application
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link } from 'react-router-dom';

// blocks
import BlockProducts from '../blocks/BlockProducts';
import BlockSlideShow from '../blocks/BlockSlideShow';
import BlockMoreButton from '../blocks/BlockMoreButton';
import LoadingPanel from "../shared/loadingPanel";
import Rating from '@mui/material/Rating';

// data stubs
import Logo from "../../assets/logo.png";
import shopCover from "../../assets/shopCover.png";
import "./merchantpage.css";
import MerchantSocialLinks from './MerchantSocialLinks';
import ReactRoundedImage from "react-rounded-image"
import SocialLinks from '../shared/SocialLinks';

import {
    Card,
    CardMedia,
    CardContent,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import { isArrayNotEmpty } from '../../Utilities/UtilRepo';

function mapStateToProps(state) {
    return {
        loading: state.counterReducer["loading"],
        productsListing: state.counterReducer["productsListing"],
        merchant: state.counterReducer["merchant"],
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
        width,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallMerchants: (propData) => dispatch(GitAction.CallMerchants(propData)),
        CallGetMoreProductEmpty: () => dispatch(GitAction.CallGetMoreProductEmpty()),
        CallAllProductsListing: (propsData) => dispatch(GitAction.CallAllProductsListing(propsData)),
    };
}

function MerchantPage(props) {

    let profileimage;
    const { width } = useWindowDimensions();
    const socialLinks = [
        { type: 'facebook', url: "", icon: 'fab fa-facebook-f' },
        { type: 'facebook', url: "", icon: 'fab fa-instagram' }
    ]
    const merchantDetails = props.merchant.length > 0 &&
        props.merchant[0].ReturnVal === undefined && props.merchant[0];

    profileimage = (
        <div className="imagecontainer">
            <CardMedia
                component="img"
                alt="Profile Picture"
                height="100"
                image={merchantDetails.ShopCoverImage && merchantDetails.ShopCoverImage.length ? Logo + merchantDetails.ShopCoverImage : Logo}
                onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                style={{
                    height: "100%",
                    width: "auto",
                }}
            />
        </div>
    )

    // const { layout } = props;

    // const containerClasses = classNames("product-card", {
    //     "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    //     "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    //     "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    //     "product-card--layout--list": layout === "list",
    //     "product-card--layout--horizontal": layout === "horizontal",
    // });

    const Userprofile = (
        // <Card className='p-4 mb-4'>
        <>
            {width > 768 &&
                <Card elevation={3} className='' style={{ borderRadius: "0.5vw", padding: "0px" }}>
                    <CardContent style={{ padding: "0px" }}>
                        <CardMedia
                            className='merchant-profile-background-img'
                            image={merchantDetails.ShopCoverImage !== null ? merchantDetails.ShopCoverImage : shopCover}
                            // image={merchantDetails.ShopCoverImage !== null ? merchantDetails.ShopCoverImage : Logo}
                            title="green iguana"
                        />
                        <div>
                            <CardContent className='merchant-profile-card-content' sx={{ height: "10vw" }}>
                                <div className='row m-1 merchant-profile'>
                                    <div className={width >= 768 && width <= 1440 ? 'col-12' : width > 1440 && 'col-8'}>
                                        <div className='row' style={{ display: "flex", alignItems: "center" }}>
                                            <div className='col-3 merchant-profile-img'>
                                                <ReactRoundedImage image={merchantDetails.ShopImage !== null ? merchantDetails.ShopImage : Logo} roundedSize="10" roundedColor="white" imageWidth="180" imageHeight="180" />
                                            </div>
                                            <div className='col-9 merchantDescription' style={{ marginTop: "2.5vw" }}>
                                                <div style={{
                                                    height: "max-content", paddingLeft: "0.5vw", paddingRight: "0.5vw", backgroundColor: "#2b535e", borderRadius: "0.2vw",
                                                    color: "white", opacity: 1, width: "max-content"
                                                }}>
                                                    <Typography variant='h5'>
                                                        {merchantDetails.ShopName}
                                                    </Typography>
                                                </div>
                                                <div className='mt-3' style={{ paddingTop: width >= 2560 ? "25px" : "0px" }}>
                                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                                        <Box>
                                                            <div className='row'>
                                                                <div className='' style={{ display: "flex" }}>
                                                                    <Rating name="read-only" value={merchantDetails.ShopRating !== null ? parseInt(merchantDetails.ShopRating) : 1} readOnly />
                                                                    <Typography className='m-1'>({merchantDetails.ShopReviewCount !== null ? merchantDetails.ShopReviewCount : 0} Rating)</Typography>
                                                                </div>

                                                            </div>
                                                        </Box>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                                        <Typography className='m-2'>Description: {merchantDetails.ShopDescription !== null ? merchantDetails.ShopDescription : "No Description"}</Typography>
                                                        <Typography className='m-2'>Products : {merchantDetails.MerchantTotalProduct !== null ? merchantDetails.MerchantTotalProduct : 0}</Typography>
                                                        <Typography className='m-2'>Origin : {merchantDetails.ShopCity !== null ? merchantDetails.ShopCity : ""}</Typography>
                                                        <Typography className='m-2'>Joined : {merchantDetails.LastJoined !== null ? merchantDetails.LastJoined : ""}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* className={width >= 768 && width <= 1440 ? 'col-12' : width > 1440 && 'col-8'} */}
                                    {/* <div className={width >= 768 && width <= 1440 ? 'col-12 social-links-web' : width > 1440 && 'col-4 social-links-web'} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                        <div className="topbar__item">
                                            <MerchantSocialLinks className="footer-newsletter__social-links" shape="circle"></MerchantSocialLinks>
                                        </div>
                                    </div> */}
                                </div>
                            </CardContent>
                        </div>
                    </CardContent>
                </Card>}

            {width <= 768 &&
                <Card className='' style={{ borderRadius: "2.5vw", padding: "0px" }}>
                    <CardContent style={{ padding: "0px" }}>
                        <CardMedia
                            className='merchant-profile-background-img-phone'
                            image={merchantDetails.ShopCoverImage !== null ? merchantDetails.ShopCoverImage : shopCover}
                            // image={merchantDetails.ShopCoverImage !== null ? merchantDetails.ShopCoverImage : Logo}
                            title="green iguana"
                        />
                        <div className='row' style={{ display: "flex", alignItems: "center", flexDirection: "column", position: "relative", bottom: "31vw" }}>
                            <ReactRoundedImage image={merchantDetails.ShopImage !== null ? merchantDetails.ShopImage : Logo} roundedSize="10" roundedColor="white" />
                            <div style={{
                                height: "max-content", padding: "0.3vw", backgroundColor: "#2b535e", borderRadius: "0.5vw",
                                color: "white", opacity: 0.8, width: "max-content"
                            }}>
                                <Typography variant='h5'>
                                    {merchantDetails.ShopName}
                                </Typography>
                            </div>
                        </div>
                        {/* <div className='col-12 social-media-phone' style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="topbar__item">
                                <MerchantSocialLinks className="footer-newsletter__social-links" shape="circle"></MerchantSocialLinks>
                            </div>
                        </div> */}
                        <div style={{ padding: "10px" }}>
                            <CardContent>
                                <div className='row merchant-profile-card-content-phone' style={{ position: "relative" }}>
                                    <div className="col-lg-8 col-md-8 col-sm-12 merchant-description-phone">
                                        <div className='mt-2 col-12 '>
                                            <Box>
                                                <div className='row'>
                                                    <div className='' style={{ display: "flex" }}>
                                                        <Rating name="read-only" value={merchantDetails.ShopRating !== null ? parseInt(merchantDetails.ShopRating) : 1} readOnly />
                                                        <Typography className='m-1'>({merchantDetails.ShopReviewCount !== null ? merchantDetails.ShopReviewCount : 0} Rating)</Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </div>
                                        <Typography className='m-2'>Description: {merchantDetails.ShopDescription !== null ? merchantDetails.ShopDescription : "No Description"}</Typography>
                                        <Typography className='m-2'>Products : {merchantDetails.MerchantTotalProduct !== null ? merchantDetails.MerchantTotalProduct : 0}</Typography>
                                        <Typography className='m-2'>Origin : {merchantDetails.ShopCity !== null ? merchantDetails.ShopCity : ""}</Typography>
                                        <Typography className='m-2'>Joined : {merchantDetails.LastJoined !== null ? merchantDetails.LastJoined : ""}</Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </CardContent>
                </Card>}
        </>


    )

    const [postsToShow, setPostsToShow] = useState([]);
    let tempArray = []
    const [page, setPage] = useState(1);
    const [previousPage, setPrevious] = useState(0);

    const loopWithSlice = () => {
        if (isArrayNotEmpty(props.productsListing)) {

            let listingArray = props.productsListing.filter((x) => x.MerchantID === parseInt(props.merchantID))
            tempArray = [...postsToShow, ...listingArray];
            const filterList = tempArray.filter((ele, ind) => ind === tempArray.findIndex(elem => elem.ProductID === ele.ProductID))
            setPostsToShow(filterList)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        props.CallMerchants({
            type: "MerchantProfile",
            typeValue: props.merchantID !== null && props.merchantID !== undefined ? props.merchantID : 0,
            USERID: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
            userRoleID: localStorage.getItem("isLogin") === true ? localStorage.getItem("roleid") : 0,
            productPage: 999,
            page: 1,
        })
    }, [])



    useEffect(() => {
        props.CallAllProductsListing({
            type: "Merchant",
            typeValue: props.merchantID !== null && props.merchantID !== undefined ? props.merchantID : 0,
            userId: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
            productPage: 10,
            page: page,
        })
    }, [])

    useEffect(() => {
        let didCancel = false
        props.CallAllProductsListing({
            type: "Merchant",
            typeValue: 0,
            userId: 0,
            productPage: 20,
            page: page,
        })
        loopWithSlice()
        return () => {
            didCancel = true;
        }
    }, [page])

    const handleShowMorePosts = () => {
        setPage(page + 1)
        setPrevious(page)
    };

    const breadcrumb = [
        { title: "Home", url: url.home() },
        { title: merchantDetails.ShopName, url: "" },
    ];

    if (page === 1 && isArrayNotEmpty(props.productsListing) && postsToShow.length === 0)
        loopWithSlice()

    return (
        <React.Fragment>
            <PageHeader header="My Account" breadcrumb={breadcrumb} />
            <div className="block--margin-top">
                <div className="container">
                    {Userprofile}
                    {/* <Card className='mb-4 mt-4'>
                        <CardContent>
                            <div className="block-header__title"
                                style={{
                                    paddingLeft: "15px",
                                    paddingRight: "15px",
                                    fontFamily: "Fira Sans,sans-serif",
                                    color: "#363537",
                                    fontWeight: "700"
                                }}
                            >
                                About Shop
                            </div>
                            <BlockSlideShow merchantDetails={merchantDetails} />
                        </CardContent>
                    </Card> */}
                </div>
                {
                    // props.loading === false ?
                    <div className='m-3'>
                        <BlockProducts
                            title="Featured Products"
                            layout="large-first"
                            products={postsToShow}
                            rows={2}
                        />
                        {
                            postsToShow.length > 0 ?
                                (
                                    <div className="my-4">
                                        <BlockMoreButton viewMore={handleShowMorePosts} />
                                    </div>
                                ) :
                                (
                                    <>
                                        <div className="my-4" style={{ textAlign: "center", fontWeight: "BOLD" }}>
                                            Merchant does not have any products
                                        </div>
                                        <div className="my-4" style={{ textAlign: "center" }}>
                                            <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                                        </div>
                                    </>
                                )
                        }
                    </div>
                    // : <LoadingPanel />
                }
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantPage);
