// react
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";
import Product from "../shared/Product";
import ProductTabs from "./ProductTabs";
import SitePageNotFound from "../site/SitePageNotFound";
import { url } from "../../services/utils";
import { GitAction } from "../../store/action/gitAction";

// blocks
import BlockLoader from "../blocks/BlockLoader";
import BlockProductsCarousel from "../blocks/BlockProductsCarousel";

// widgets
import WidgetCategories from "../widgets/WidgetCategories";
import WidgetProducts from "../widgets/WidgetProducts";

// data stubs
import categories from "../../data/shopWidgetCategories";
import theme from "../../data/theme";
import { connect } from "react-redux";
import { Stack } from "@mui/material";
import HotelDetail from "../shared/Hotel_Files/HotelDetail";
import Grid from "@mui/material/Grid";
import HotelSearchForm from "../blocks/HotelSearchForm";
import HotelAmenities from "../shared/Hotel_Files/HotelAmenities";
import HotelRooms from "../shared/Hotel_Files/HotelRooms";

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    product: state.counterReducer["productsByID"],
    reviews: state.counterReducer["reviews"],
    products: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (propData) => dispatch(GitAction.CallAllProducts(propData)),
    CallProductDetail: (propData) => dispatch(GitAction.CallProductDetail(propData)),
    // CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData))
  };
}

function ShopPageProduct(props) {
  const { productId, layout, sidebarPosition } = props;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [sticky, setSticky] = useState(true);

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
    window.addEventListener("scroll", isSticky);
    props.CallAllProducts({
      type: "Merchant",
      typeValue: 0,
      userId: 0,
      productPage: 20,
      page: page,
    })
    props.CallProductDetail({ productId: productId, userId: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id") })
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? true : false;
    setSticky(stickyClass);
    
  };


  let content;
  let breadcrumb;

  let product = props.product[0]

  console.log('pppppp', product)

  if (!props.loading && product !== undefined) {
    breadcrumb = [
      { title: "Home", url: url.home() },
      { title: product.ProductName, url: url.product(product) },
    ];
  }

  if (layout === "sidebar") {
    const sidebar = (
      <div className="shop-layout__sidebar">
        <div className="block block-sidebar">
          <div className="block-sidebar__item">
            <WidgetCategories categories={categories} location="shop" />
          </div>
          <div className="block-sidebar__item d-none d-lg-block">
            <WidgetProducts title="Latest Products" products={latestProducts} />
          </div>
        </div>
      </div>
    );

    content = (
      <div className="container">
        <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
          {sidebarPosition === "start" && sidebar}
          <div className=" shop-layout__content">
            <div className=" block">
              <Product {...props} product={product} layout={layout} version="1" />
              {/* <ProductTabs withSidebar /> */}
            </div>
            {/* 
            {relatedProducts.length > 0 && (
              <BlockProductsCarousel
                title="Related Products"
                layout="grid-4-sm"
                products={relatedProducts}
                withSidebar
              />
            )} */}
          </div>
          {sidebarPosition === "end" && sidebar}
        </div>
      </div>
    );
  } else {
    content = (
      <React.Fragment>
        <div className="block">
          <div className="container">
            <Product product={product} layout={layout} version="2" />
            {/* <ProductTabs product={product} /> */}
          </div>
        </div>

        {/* {relatedProducts.length > 0 && (
          <BlockProductsCarousel
            title="Related Products"
            layout="grid-5"
            products={relatedProducts}
          />
        )} */}
      </React.Fragment>
    );
  }




  const render_Details = () => {

    let session = sessionStorage.getItem('saleType')

    if (session === 'Hardware'){
      return(
       props.product.length > 0 ?
        <div>
        <Helmet>
          <title>{`${product.ProductName} — ${theme.name}`}</title>
        </Helmet>

        <PageHeader breadcrumb={breadcrumb} />

        {content}
      </div>
      :
        <SitePageNotFound/>
     
      )
    }

    else if(session === 'Hotel'){
      let data = dummyHotel_Data.filter(x => x.HotelID === Number(productId))
      return(
        dummyHotel_Data.length > 0 ?
        <>
        <Grid item container style={{position: sticky ? 'fixed' : 'relative', zIndex:  sticky ? 99 : 0, backgroundColor: 'white'}} >
        <HotelSearchForm />
      </Grid>
              <Grid item container spacing={1} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                 

                <Grid item container xs={12} sm={10} style={{padding:'4%', justifyContent:'center'}} >
                  <Grid item xs={12} sm={9}>
                    <Stack direction="column" spacing={1}>
                      <HotelDetail product={data[0]} />
                      <HotelAmenities/>
                      <HotelRooms />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              </>
        :
        <SitePageNotFound/>
      )
    }
  }

  return (
    <React.Fragment>
 
      {props.loading === true ? <BlockLoader />
        :
       <>
{sessionStorage.getItem('saleType') === 'hotel' &&
        <Grid item container style={{position: sticky ? 'fixed' : 'relative', zIndex:  sticky ? 99 : 0, backgroundColor: 'white'}} >
          <HotelSearchForm />
        </Grid>
}

        <Grid style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <Grid item xs={12} sm={12}>
              {render_Details()}
            </Grid>
        </Grid>
        </>
      }
    </React.Fragment>
  );
}

ShopPageProduct.propTypes = {
  /** Product slug. */
  productId: PropTypes.string,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
  /**
   * sidebar position (default: 'start')
   * one of ['start', 'end']
   * for LTR scripts "start" is "left" and "end" is "right"
   */
  sidebarPosition: PropTypes.oneOf(["start", "end"]),
};

ShopPageProduct.defaultProps = {
  layout: "standard",
  sidebarPosition: "start",
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageProduct);
