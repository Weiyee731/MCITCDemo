// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import BlockHeader from "../shared/BlockHeader";
import ProductCard from "../shared/ProductCard";
import StroykaSlick from "../shared/StroykaSlick";
import { Button } from "@mui/material";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Card, } from "@mui/material";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const slickSettings = {
  "grid-4": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  "grid-4-sm": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 474,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  "grid-5": {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  horizontal: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};

export default class BlockProductsCarousel extends Component {
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
    const {
      layout,
      title,
      withSidebar,
      onGroupClick,
      groups,
      loading,
      products,
      props,
      QuickViewIndicator,
    } = this.props;
    const columns = this.productsColumns().map((column, index) => {
      const products = column.map((product) => (
        // <div key={product.id} className="block-products-carousel__cell">
        
        <SwiperSlide key={product.ProductID}>
          <ProductCard {...props} product={product} quickViewIndicator={QuickViewIndicator} currentData={this.props.currentData} highlightColor={this.props.highlightColor} baseColor={this.props.baseColor} />
        </SwiperSlide>
        // </div>
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
                  // groups={groups}
                  // arrows
                  // onNext={this.handleNextClick}
                  // onPrev={this.handlePrevClick}
                  // onGroupClick={onGroupClick}
                  showAll={"/shop/ProductListing/type:Merchant&typevalue:" + 0}
                />
                {/* <div className="block-products-carousel__slider">
                  <div className="block-products-carousel__preloader" />
                  <StroykaSlick ref={this.setSlickRef} {...slickSettings[layout]}>
                    {columns}
                  </StroykaSlick>
                </div> */}
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

BlockProductsCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(["grid-4", "grid-4-sm", "grid-5", "horizontal"]),
  rows: PropTypes.number,
  products: PropTypes.any,
  groups: PropTypes.array,
  withSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
};

BlockProductsCarousel.defaultProps = {
  layout: "grid-4",
  rows: 1,
  products: [],
  groups: [],
  withSidebar: false,
  loading: false,
  onGroupClick: undefined,
};
