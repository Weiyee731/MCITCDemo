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

// data stubs
import Logo from "../../assets/Emporia.png";
import {
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";

function mapStateToProps(state) {
    return {
        loading: state.counterReducer["loading"],
        productsListing: state.counterReducer["productsListing"],
        merchant: state.counterReducer["merchant"],
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

    const merchantDetails = props.merchant.length > 0 &&
        props.merchant[0].ReturnVal === undefined && props.merchant[0];

    profileimage = (
        <div className="imagecontainer">
            <CardMedia
                component="img"
                alt="Profile Picture"
                height="100"
                image={merchantDetails.ShopImage && merchantDetails.ShopImage.length ? Logo + merchantDetails.ShopImage : Logo}
                onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                style={{
                    height: "100%",
                    width: "auto",
                }}
            />
        </div>
    )

    const { layout } = props;

    const containerClasses = classNames("product-card", {
        "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
        "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
        "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
        "product-card--layout--list": layout === "list",
        "product-card--layout--horizontal": layout === "horizontal",
    });

    const Userprofile = (
        <Card className='p-4 mb-4'>
            <CardContent>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className={containerClasses}>
                            {
                                merchantDetails.ShopCoverImage !== null &&
                                <img
                                    className="product-image__img"
                                    src={merchantDetails.ShopCoverImage}
                                    onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                                    alt=""
                                />
                            }
                            <div className="product-card__info">
                                <div className="product-card__name text-center">
                                    {profileimage}
                                    {merchantDetails.ShopName}
                                    {merchantDetails.UserFullName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className='row'>
                            <div className='col-6'>
                                <div className='m-2'>Products : {merchantDetails.MerchantTotalProduct !== null ? merchantDetails.MerchantTotalProduct : 0}</div>
                            </div>
                            <div className='col-6'>
                                <div className='m-2'>Origin : {merchantDetails.ShopCity !== null ? merchantDetails.ShopCity : ""}</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='m-2'>Rating : {merchantDetails.ShopRating !== null ? merchantDetails.ShopRating : 0} ({merchantDetails.ShopReviewCount !== null ? merchantDetails.ShopReviewCount : 0} Rating)</div>
                            </div>
                            <div className='col-6'>
                                <div className='m-2'>Joined : {merchantDetails.LastJoined !== null ? merchantDetails.LastJoined : ""}</div>
                            </div>
                        </div>
                        <div className='m-2'>Description：{merchantDetails.ShopDescription !== null ? merchantDetails.ShopDescription : "No Description"}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const [postsToShow, setPostsToShow] = useState([]);
    let tempArray = []
    const [page, setPage] = useState(1);

    const loopWithSlice = () => {
        if (props.productsListing.length > 0 && JSON.parse(props.productsListing)[0] !== undefined && JSON.parse(props.productsListing)[0].ReturnVal !== '0') {

            let listingArray = JSON.parse(props.productsListing).filter((x) => x.MerchantID === parseInt(props.merchantID))
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
        loopWithSlice()
    }, [])

    useEffect(() => {
        props.CallAllProductsListing({
            type: "Merchant",
            typeValue: props.merchantID !== null && props.merchantID !== undefined ? props.merchantID : 0,
            userId: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
            productPage: 10,
            page: page,
        })
        loopWithSlice()
    }, [props.productsListing, page])

    const handleShowMorePosts = () => {
        setPage(page + 1)
    };

    const breadcrumb = [
        { title: "Home", url: url.home() },
        { title: merchantDetails.ShopName, url: "" },
    ];

    return (
        <React.Fragment>
            <PageHeader header="My Account" breadcrumb={breadcrumb} />
            <div className="block--margin-top">
                <div className="container">
                    {Userprofile}
                    <Card className='mb-4'>
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
                    </Card>
                </div>
                {
                    props.loading === false ?
                        <>
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
                                            <div className="my-4" style={{textAlign: "center"}}>
                                                <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                                            </div>
                                        </>
                                    )
                            }
                        </>
                        : <LoadingPanel />
                }
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantPage);
