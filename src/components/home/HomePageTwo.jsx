// react
import React, { useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// blocks
import BlockFeatures from '../blocks/BlockFeatures';
import BlockMerchant from '../blocks/BlockMerchant';
import BlockProducts from '../blocks/BlockProducts';
import BlockSlideShow from '../blocks/BlockSlideShow';
import BlockMainCategories from '../blocks/BlockMainCategories';
import BlockMoreButton from '../blocks/BlockMoreButton';

// data stubs
import theme from '../../data/theme';


function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    products: state.counterReducer["products"],
    merchant: state.counterReducer["merchant"],
    productcart: state.counterReducer["productcart"],
    wishlist: state.counterReducer["wishlist"],
    currentUser: state.counterReducer["currentUser"]
    // viewMoreProducts: state.counterReducer["viewMoreProducts"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallMerchants: (propData) => dispatch(GitAction.CallMerchants(propData)),
    CallAllProducts: (propData) => dispatch(GitAction.CallAllProducts(propData)),
    CallViewProductCart: (credentials) => dispatch(GitAction.CallViewProductCart(credentials)),
    CallViewProductWishlist: (credentials) => dispatch(GitAction.CallViewProductWishlist(credentials)),
    // CallViewMoreFunctionProduct: (propData) => dispatch(GitAction.CallViewMoreFunctionProduct(propData)),
  };
}

function HomePageTwo(props) {
  const [postsToShow, setPostsToShow] = useState([]);
  const [page, setPage] = useState(1);
  let productPerPage = 20
  let tempArray = []

  const loopWithSlice = () => {
    console.log("props.products", props.products)
    console.log("postsToShow", postsToShow)
    tempArray = [...postsToShow, ...props.products];
    setPostsToShow(tempArray)
  };

  const handleShowMorePosts = () => {
    setPage(page + 1)
  };



  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      props.CallViewProductCart({
        userID: localStorage.getItem("id")
      })
      props.CallViewProductWishlist({
        userID: localStorage.getItem("id")
      })
    }
  }, [])


  useEffect(() => {
    let didCancel = false
    props.CallAllProducts({
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

  useEffect(() => {
    let didCancel = false
    props.CallAllProducts({
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
  }, [])

  useEffect(() => {
    props.CallMerchants({
      type: "Status",
      typeValue: "Endorsed",
      userID: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
      userRoleID: localStorage.getItem("isLogin") === true ? localStorage.getItem("roleid") : 0,
      productPage: 999,
      page: 1,
    })
  }, [])

  useEffect(() => {
    props.CallMerchants({
      type: "Status",
      typeValue: "Endorsed",
      userID: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
      userRoleID: localStorage.getItem("isLogin") === true ? localStorage.getItem("roleid") : 0,
      productPage: 999,
      page: 1,
    })
  }, [])

  return (
    <React.Fragment>
      <div className="block--margin-top">
        <Helmet>
          <title>{theme.name}</title>
        </Helmet>
        <BlockSlideShow />

        <BlockMainCategories />

        <BlockMerchant
          title="Top Merchants this week"
          layout="grid-4"
          rows={1}
          merchants={props.merchant}
        // onGroupClick={testing}
        />

        <BlockFeatures layout="boxed" />
        {/* <BlockProductsCarousel
          title="New Arrivals"
          layout="grid-4"
          rows={2}
          products={props.products.length > 0 ? props.products : []}
        /> */}
        <BlockProducts
          title="Featured Products"
          layout="large-first"
          products={postsToShow.length > 0 ? postsToShow : []}
          rows={2}
        />
        {
          typeof props.products.ReturnVal !== 'undefined' && props.products.ReturnVal !== 1 ? "" :
            (
              <div className="my-4">
                <BlockMoreButton viewMore={handleShowMorePosts} />
              </div>
            )
        }

      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageTwo);
