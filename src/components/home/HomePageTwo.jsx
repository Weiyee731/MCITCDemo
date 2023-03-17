// react
import React, { useState, useEffect } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { withRouter } from "react-router-dom";

// blocks
import BlockFeatures from '../blocks/BlockFeatures';
import BlockMerchant from '../blocks/BlockMerchant';
import BlockProducts from '../blocks/BlockProducts';
import BlockSlideShow from '../blocks/BlockSlideShow';
import BlockMainCategories from '../blocks/BlockMainCategories';
import BlockMoreButton from '../blocks/BlockMoreButton';
import BlockProductsCarousel from "../blocks/BlockProductsCarousel";
import BlockTopBrands from "../blocks/BlockTopBrands";
import HotelSearchForm from '../blocks/HotelSearchForm';
import BlockHotelSuggestion from '../blocks/BlockHotelSuggestion';

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
    if (props.products.length > 0 && props.products[0].ReturnVal !== '0') {
      tempArray = [...postsToShow, ...props.products];
      setPostsToShow(tempArray)
    }
  };

  const handleShowMorePosts = () => {
    setPage(page + 1)
  };

  const dummyHotel_Data = [
    {
      HotelID: 0,
      HotelImage: 'https://media-cdn.tripadvisor.com/media/photo-s/12/a9/df/17/hilton-night-view-from.jpg',
      HotelName:'Hilton',
      StartPrice: 180.00,
      HotelRating: 4.0,
      HotelState: 'Kuching',
      ProductPromotion: null,
      RoomImages:[
        {RoomImgID:0,
         RoomName: "King Hilton Guestroom",
         RoomImages:[
          {
            ImageDetailID:0,
            ImageURL:"https://www.hilton.com/im/en/KUCHITW/3073451/kuchi-king-hilton-guestroom-3.jpg?impolicy=crop&cw=4499&ch=2692&gravity=NorthWest&xposition=0&yposition=153&rw=713&rh=427",
            Amenities:[]
          },
          {
            ImageDetailID:1,
            ImageURL:"",
            Amenities:[]
          },
          {
            ImageDetailID:2,
            ImageURL:"",
            Amenities:[]
          }
        ]
        },
        {RoomImgID:"",
        RoomName: "",
        RoomImages:[
         {
           ImageDetailID:"",
           ImageURL:"",
           Amenities:[]
         }
       ]
       },
       {RoomImgID:"",
       RoomName: "",
       RoomImages:[
        {
          ImageDetailID:"",
          ImageURL:"",
          Amenities:[]
        }
      ]
      }
      ]
    },
    {
      HotelID: 1,
      HotelImage: 'https://pix10.agoda.net/hotelImages/44583/-1/8742bb65e5a6b3f370d3e94212bb8a76.jpg?ca=23&ce=0&s=1024x768',
      HotelName:'Grand Magherita',
      StartPrice: 185.00,
      HotelRating: 4.1,
      HotelState: 'Kota Samarahan',
      ProductPromotion: null,
    },
    {
      HotelID: 2,
      HotelImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/124344871.jpg?k=82daced0f7392440064c6ec25622e0d0154f02c62a2c885d96103c320273befe&o=&hp=1',
      HotelName:'Tune Hotel',
      StartPrice: 90.00,
      HotelRating: 3.9,
      HotelState: 'Kuching',
      ProductPromotion: null,
    }, 
    {
      HotelID: 3,
      HotelImage: 'https://borneo.com.au/wp-content/uploads/2020/08/Pullman-Kuching-Hotel.jpg',
      HotelName:'Pullman',
      StartPrice: 240.00,
      HotelRating: 4.2,
      HotelState: 'Kuching',
      ProductPromotion: null,
    },
    {
      HotelID: 4,
      HotelImage: 'https://ak-d.tripcdn.com/images/220u1d000001ede0c1F72_R_960_660_R5_D.jpg',
      HotelName:'Waterfront Hotel',
      StartPrice: 245.00,
      HotelRating: 4.5,
      HotelState: 'Kuching',
      ProductPromotion: null,
    }
  ]
 

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true" && localStorage.getItem("id") !== undefined) {
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

  // useEffect(() => {
  //   props.CallMerchants({
  //     type: "Status",
  //     typeValue: "Endorsed",
  //     USERID: localStorage.getItem("isLogin") === true && localStorage.getItem("id") !== undefined ? localStorage.getItem("id") : 0,
  //     userRoleID: localStorage.getItem("isLogin") === true && localStorage.getItem("id") !== undefined ? localStorage.getItem("roleid") : 0,
  //     productPage: 999,
  //     page: 1,
  //   })
  // }, [])

  // useEffect(() => {
  //   props.CallMerchants({
  //     type: "Status",
  //     typeValue: "Endorsed",
  //     USERID: localStorage.getItem("isLogin") === true && localStorage.getItem("id") !== undefined ? localStorage.getItem("id") : 0,
  //     userRoleID: localStorage.getItem("isLogin") === true && localStorage.getItem("id") !== undefined ? localStorage.getItem("roleid") : 0,
  //     productPage: 999,
  //     page: 1,
  //   })
  // }, [])

  
  return (
    <React.Fragment>
      <div className="block--margin-top">
        <Helmet>
          <title>{theme.name}</title>
        </Helmet>

        <BlockSlideShow />

        { sessionStorage.getItem('saleType') === 'Hotel' ? 
          <>
            <HotelSearchForm /> 

            <BlockHotelSuggestion
              title = "Accomodation Recommendation"
              {...props}
              products={dummyHotel_Data.length > 0 ? dummyHotel_Data : null}
            />
            
            {console.log('aaa', props.products)}
          </>
          


          :
          <>
            <BlockMainCategories /> 
              
              <BlockProductsCarousel
              title="New Arrivals"
              {...props}
              // layout="grid-4"
              // rows={2}
              products={postsToShow.length === 0 ? props.products.length > 0 && props.products[0].ReturnVal !== '0' ? props.products : [] : postsToShow}
            />
          </>
        }

        {/* <BlockMerchant
          title="Top Merchants"
          // title="Best Sellers"
          layout="grid-4"
          rows={1}
          merchants={props.merchant}
        // onGroupClick={testing}
        /> */}

        {/* <BlockFeatures layout="boxed" /> */}
   
        <BlockProducts
          {...props}
          title="Featured Products"
          layout='large-first'
          products={postsToShow.length > 0 ? postsToShow : props.products.length > 0 && props.products[0].ReturnVal !== '0' ? props.products : []}
          rows={2}
        />
        {
          props.products.length > 0 && props.products[0].ReturnVal !== '0' ?
            <div className="my-4">
              <BlockMoreButton viewMore={handleShowMorePosts} />
            </div>
            :
            <div className="my-4">
              {/* // <h2 style={{ */}
              {/* //   width: "100%",
              //   textalign: "center",
              //   borderbottom: "1px solid #000",
              //   lineheight: "0.1em",
              //   margin: "10px 0 20px",
              // }}><span style={{ background: "#fff", padding: "0 10px" }}>There is no more products</span></h2> */}
            </div>

        }
        {/* {
          typeof props.products.ReturnVal !== 'undefined' && props.products.ReturnVal !== 1 ? "" :
            (
              <div className="my-4">
                <BlockMoreButton viewMore={handleShowMorePosts} />
              </div>
            )
        } */}

      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePageTwo));
