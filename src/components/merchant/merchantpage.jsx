// react
import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import classNames from "classnames";

// application
import shopApi from '../../api/shop';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { toast } from "react-toastify";

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockMerchant from '../blocks/BlockMerchant';
import BlockSlideShow from '../blocks/BlockSlideShow';
import BlockMainCategories from '../blocks/BlockMainCategories';
import BlockMoreButton from '../blocks/BlockMoreButton';
import LoadingPanel from "../shared/loadingPanel";

// data stubs
import categories from '../../data/shopBlockCategories';
import posts from '../../data/blogPosts';
import theme from '../../data/theme';
import Logo from "../../assets/Emporia.png";
import {
    Card,
    CardMedia,
    TableHead,
    Typography,
    Divider,
    CardContent,
} from "@material-ui/core";
function mapStateToProps(state) {
    return {
        loading: state.counterReducer["loading"],
        // viewMoreProducts: state.counterReducer["viewMoreProducts"],
        productsListing: state.counterReducer["productsListing"],
        merchant: state.counterReducer["merchant"],

    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallMerchants: (propData) => dispatch(GitAction.CallMerchants(propData)),
        // CallViewMoreFunctionProduct: (propsData) => dispatch(GitAction.CallViewMoreFunctionProduct(propsData)),
        CallGetMoreProductEmpty: () => dispatch(GitAction.CallGetMoreProductEmpty()),
        CallAllProductsListing: (propsData) => dispatch(GitAction.CallAllProductsListing(propsData)),

        // CallGetProductByMerchantID: (propsData) => dispatch(GitAction.CallGetProductByMerchantID(propsData)),
    };
}



function MerchantPage(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
        props.CallMerchants({
            type: "MerchantProfile",
            typeValue: props.merchantID !== null && props.merchantID !== undefined ? props.merchantID : 0,
            userID: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
            userRoleID: localStorage.getItem("isLogin") === true ? localStorage.getItem("roleid") : 0,
            productPage: 999,
            page: 1,
        })


    }, [])

    let profileimage;
    let coverimage;
    // console.log("merchan in merchant page", props.merchantID)
    // console.log("merchant props", props.merchant)

    // console.log("merchant product listing", props.productsListing)
    // const picUrl = "http://tourism.denoo.my/UnimasMarketplaceImage/userprofile/";
    // const UserId = props.location.state.id;

    const merchantDetails = props.merchant.length > 0 &&
        props.merchant[0].ReturnVal === undefined && props.merchant[0];
    if (merchantDetails.ShopImage && merchantDetails.ShopImage.length > 0) {
        profileimage = (<div className="imagecontainer">
            <CardMedia
                component="img"
                alt="Profile Picture"
                height="100"
                image={Logo + merchantDetails.ShopImage}
                onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                style={{
                    display: "inline",
                    margin: "0 auto",
                    marginLeft: "-25%", //centers the image
                    height: "100%",
                    width: "auto",
                    cursor: "pointer",
                }}
            />
        </div>)
    } else {
        profileimage = (<div className="imagecontainer">
            <CardMedia
                component="img"
                alt="Profile Picture"
                height="100"
                image={Logo}
                onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                style={{
                    display: "inline",
                    margin: "0 auto",
                    marginLeft: "-25%", //centers the image
                    height: "100%",
                    width: "auto",
                    cursor: "pointer",
                }}
            /> </div>)
    }
    const {
        layout,
    } = props;

    const containerClasses = classNames("product-card", {
        "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
        "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
        "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
        "product-card--layout--list": layout === "list",
        "product-card--layout--horizontal": layout === "horizontal",
    });

    const Userprofile = (
        <div style={{ paddingBottom: "1.2rem" }}>
            <Card>
                <CardContent>
                    <div className="row" style={{ margin: "10px" }}>
                        <div className="col-12 col-lg-5 col-xl-4 col-md-4 ">
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
                                    <div className="product-card__name">
                                        <div className="row" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <div className="col-6">
                                                {profileimage}
                                            </div>
                                            <div className="col-6" style={{ fontWeight: "bold" }}>
                                                <div className=" block-header__title">
                                                    {merchantDetails.ShopName}
                                                    {/* {merchantDetails.ShopName} */}
                                                </div>
                                                {/* <div style={{ paddingTop: "20px" }}>
                                                    
                                                    {merchantDetails.UserFullName}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-12 col-lg-2 col-xl-2 col-md-6 align-middle block-header__title">
                            <div className="mt-4 mb-2 word-color"> {merchantDetails.ShopName}</div>
                            <div className="word-color"> {merchantDetails.UserFullName}</div>
                        </div> */}
                        <div className="col-10 col-lg-7 col-xl-7 " style={{ padding: "20px" }}>
                            <div className="row" style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <div className="col-6">
                                    <div className="row"  >
                                        <div className="col-4">
                                            <div className="row"  >
                                                <label style={{ fontSize: "18px" }}>Products :</label>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row"  >
                                                <label style={{ color: "#ff0000", fontSize: "18px" }}>{merchantDetails.MerchantTotalProduct !== null ? merchantDetails.MerchantTotalProduct : 0}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-3">
                                            <div className="row"  >
                                                <label style={{ fontSize: "18px" }}>Origin :</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="row"  >
                                                <label style={{ color: "#ff0000", fontSize: "18px" }}>{merchantDetails.ShopCity !== null ? merchantDetails.ShopCity : ""}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-3">
                                            <div className="row"  >
                                                <label style={{ fontSize: "18px" }}>Rating :</label>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="row"  >
                                                <label style={{ color: "#ff0000", fontSize: "18px" }}>{merchantDetails.ShopRating !== null ? merchantDetails.ShopRating : 0} ({merchantDetails.ShopReviewCount !== null ? merchantDetails.ShopReviewCount : 0} Rating)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-3">
                                            <div className="row"  >
                                                <label style={{ fontSize: "18px" }}>Joined :</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="row"  >
                                                <label style={{ color: "#ff0000", fontSize: "18px" }}>{merchantDetails.LastJoined !== null ? merchantDetails.LastJoined : ""}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <div className="row">
                                        <label style={{ fontSize: "18px" }}>Description：</label>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <label style={{ color: "#ff0000", fontSize: "18px" }}>{merchantDetails.ShopDescription !== null ? merchantDetails.ShopDescription : "No Description"}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div>
            </div>
        </div>
    )

    const [postsToShow, setPostsToShow] = useState([]);
    let tempArray = []
    const [page, setPage] = useState(1);
    // let productPerPage = 4

    const loopWithSlice = () => {
        if (props.productsListing.length > 0 && JSON.parse(props.productsListing)[0].ReturnVal !== undefined) {
            toast.warning("There is no more product for the shop")
        }
        else {

            tempArray = [...postsToShow, ...JSON.parse(props.productsListing)];

            const filterList = tempArray.filter((val, id, array) => {
                return array.indexOf(val) == id;
            });

            // console.log("tempArray", tempArray)
            // console.log("postsToShow", postsToShow)
            // console.log("postsToShow", JSON.parse(props.productsListing))
            setPostsToShow(filterList)
            // console.log("postsToShow BEHIND", postsToShow)
        }
    };

    useEffect(() => {
        let didCancel = false
        props.CallAllProductsListing({
            type: "Merchant",
            typeValue: props.merchantID !== null && props.merchantID !== undefined ? props.merchantID : 0,
            userId: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
            productPage: 999,
            page: page,
        })
        loopWithSlice()
        return () => {
            didCancel = true;
        }
    }, [page])

    const handleShowMorePosts = () => {
        setPage(page + 1)
    };

    return (
        <React.Fragment>
            <div className="block--margin-top">
                <Helmet>
                    <title>{theme.name}</title>
                </Helmet>
                <div className="container" style={{ padding: "0.5rem" }}>
                    {Userprofile}
                    <div style={{ paddingBottom: "1.2rem" }}>
                        <Card >
                            <CardContent>
                                <div className="block-header__title" style={{ paddingLeft: "15px", paddingRight: "15px", fontFamily: "Fira Sans,sans-serif", color: "#363537", fontWeight: "700" }}>
                                    About Shop
                                </div>
                                {useMemo(() => <BlockSlideShow merchantDetails={merchantDetails} />, [])}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {
                    props.loading === false ?
                        <>
                            <BlockProducts
                                title="Featured Products"
                                layout="large-first"
                                products={postsToShow.length > 0 ? postsToShow : []}
                                rows={2}
                            />
                            {/* {
                                postsToShow.length > 0 ?
                                    (
                                        <div className="my-4">
                                            <BlockMoreButton viewMore={handleShowMorePosts} />
                                        </div>
                                    ) : ""
                            } */}
                        </>
                        : <LoadingPanel></LoadingPanel>
                }

            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantPage);
