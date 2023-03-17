// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import BlockHeader from "../shared/BlockHeader";
import ProductCard from "../shared/ProductCard";
import HotelCard from "../shared/HotelCard";
import 'react-loading-skeleton/dist/skeleton.css'
import { Card, } from "@mui/material";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


export default class BlockHotelSuggestion extends Component {
  handleNextClick = () => {
    if (this.slickRef) {
      this.slickRef.slickNext();
    }
  };

  handlePrevClick = () => {
    if (this.slickRef) {
      this.slickRef.slickPrev();
    }
  };

  setSlickRef = (ref) => {
    this.slickRef = ref;

  };


  productsColumns() {
    const columns = [];
    const { rows } = this.props;
    let { products } = this.props;

    if (rows > 0) {
      products = products.slice();

      while (products.length > 0) {
        columns.push(products.splice(0, rows));
      }
    }
    return columns;
  }

  render() {
    

    const dummyHotel_Data = [
      {
        HotelID: 0,
        HotelImage: 'https://media-cdn.tripadvisor.com/media/photo-s/12/a9/df/17/hilton-night-view-from.jpg',
        HotelName:'Hilton',
        StartPrice: 180.00,
        HotelRating: 4.0,
        HotelState: 'Kuching',
        ProductPromotion: null,
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

    const {
      layout,
      title,
      withSidebar,
      loading,
      products,
      props,
      QuickViewIndicator,
    } = this.props;
      
    console.log('column', this.productsColumns())
    const columns = this.productsColumns().map((column, index) => {
      const products = column.map((product) => (
       
        <SwiperSlide key={product.ProductID}>
          {
            sessionStorage.getItem("saleType") === 'Hotel' ? 

              <HotelCard {...props} product={product} quickViewIndicator={QuickViewIndicator} currentData={this.props.currentData} highlightColor={this.props.highlightColor} baseColor={this.props.baseColor} />
            
            : 
              <ProductCard {...props} product={product} quickViewIndicator={QuickViewIndicator} currentData={this.props.currentData} highlightColor={this.props.highlightColor} baseColor={this.props.baseColor} />
          }
         
        </SwiperSlide>
   
      ));

      return (
        <Card elevation={2} key={index} className="block-products-carousel__column">
          {products}
        </Card>
      );
    });

    const blockClasses = classNames("block block-products-carousel", {
      "block-products-carousel--loading": loading,
      "block-products-carousel--has-items": columns.length > 0,
    });

    const containerClasses = classNames({
      container: !withSidebar,
    });

    return (
      <div className={blockClasses} data-layout={layout}>
        {
          typeof products.ReturnVal !== 'undefined' && products.ReturnVal !== 1 ?
            (
              <div className={containerClasses} style={{ textAlign: "center" }}>
                <label>Connection Has Times Out, Try Again Later</label>
                <div className="form-group mb-0 text-center my-4">
                  <button className="btn btn-primary btn-lg" onClick={() => window.location.reload(false)} >
                    Try Again
                  </button>
                </div>
              </div>
            ) :
            (
              <div className={containerClasses}>

                <BlockHeader
                  title={title}
                  showAll={"/shop/ProductListing/type:Merchant&typevalue:" + 0}
                />
              
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  slidesPerView={4}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                >
                  {columns}
                  <div className="btnBox swiper-button-prev"></div>
                  <div className="btnBox swiper-button-next"></div>
                </Swiper>
              </div>
            )
        }
      </div>
    );
  }
}

BlockHotelSuggestion.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(["grid-4", "grid-4-sm", "grid-5", "horizontal"]),
  rows: PropTypes.number,
  products: PropTypes.any,
  groups: PropTypes.array,
  withSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
};

BlockHotelSuggestion.defaultProps = {
  layout: "grid-4",
  rows: 1,
  products: [],
  groups: [],
  withSidebar: false,
  loading: false,
  onGroupClick: undefined,
};
