// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link } from "react-router-dom";

// application
import languages from "../../i18n";
import StroykaSlick from "./StroykaSlick";
import { ZoomIn24Svg } from "../../svg";
import Logo from "../../assets/Emporia.png";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Chip from '@mui/material/Chip';

const slickSettingsFeatured = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const slickSettingsThumbnails = {
  standard: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 5 } },
      { breakpoint: 479, settings: { slidesToShow: 4 } },
      { breakpoint: 379, settings: { slidesToShow: 3 } },
    ],
  },
  sidebar: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 5 } },
      { breakpoint: 479, settings: { slidesToShow: 4 } },
      { breakpoint: 379, settings: { slidesToShow: 3 } },
    ],
  },
  columnar: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 5 } },
      { breakpoint: 479, settings: { slidesToShow: 4 } },
      { breakpoint: 379, settings: { slidesToShow: 3 } },
    ],
  },
  quickview: {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 767, settings: { slidesToShow: 5 } },
      { breakpoint: 479, settings: { slidesToShow: 4 } },
      { breakpoint: 379, settings: { slidesToShow: 3 } },
    ],
  },
};

class ProductGallery extends Component {
  gallery;

  /** @var {Promise} */
  createGallery = null;

  imagesRefs = [];

  unmounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      transition: false,
    };
  }

  componentDidMount() {
    this.createGallery = import("../../photoswipe").then(
      (module) => module.createGallery
    );

    // this is necessary to reset the transition state, because sometimes
    // react-slick does not trigger an afterChange event after a beforeChange event
    setTimeout(() => {
      this.setState(() => ({
        transition: false,
      }));
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const { locale: prevLocale } = prevProps;
    const { direction: prevDirection } = languages[prevLocale];
    const { locale: currLocale } = this.props;
    const { direction: currDirection } = languages[currLocale];

    if (currDirection !== prevDirection) {
      // this is necessary to reset the transition state,
      // because when the direction changes, the afterChange event does not fire
      setTimeout(() => {
        this.setState(() => ({
          transition: false,
        }));
      }, 0);
    }
  }

  componentWillUnmount() {
    if (this.gallery) {
      this.gallery.destroy();
    }

    this.unmounted = true;
  }

  getIndexDependOnDir(index) {
    const { images, locale } = this.props;
    const { direction } = languages[locale];

    // we need to invert index id direction === 'rtl' due to react-slick bug
    if (direction === "rtl") {
      return images.length - 1 - index;
    }

    return index;
  }

  handleFeaturedClick = (event, index) => {
    const { layout } = this.props;

    if (!this.createGallery || layout === "quickview") {
      return;
    }

    event.preventDefault();

    this.openPhotoswipe(index);
  };

  handleThumbnailClick = (index) => {
    const { transition } = this.state;

    if (transition) {
      return;
    }

    this.setState(() => ({ currentIndex: index }));

    if (this.slickFeaturedRef) {
      this.slickFeaturedRef.slickGoTo(this.getIndexDependOnDir(index));
    }
  };

  handleFeaturedBeforeChange = (oldIndex, newIndex) => {
    this.setState(() => ({
      currentIndex: this.getIndexDependOnDir(newIndex),
      transition: true,
    }));
  };

  handleFeaturedAfterChange = (index) => {
    this.setState(() => ({
      currentIndex: this.getIndexDependOnDir(index),
      transition: false,
    }));
  };

  handleZoomButtonClick = () => {
    const { currentIndex } = this.state;

    this.openPhotoswipe(currentIndex);
  };

  setSlickFeaturedRef = (ref) => {
    this.slickFeaturedRef = ref;
  };

  openPhotoswipe(index) {
    const { images, locale } = this.props;
    const { direction } = languages[locale];

    const items = this.imagesRefs.map((tag, index) => {
      const width = parseFloat(tag.dataset.width) || tag.naturalWidth;
      const height = parseFloat(tag.dataset.height) || tag.naturalHeight;

      return {
        src: images[index].ProductMediaUrl,
        msrc: images[index].ProductMediaUrl,
        w: width,
        h: height,
      };
    });

    if (direction === "rtl") {
      items.reverse();
    }

    // noinspection JSUnusedGlobalSymbols
    const options = {
      getThumbBoundsFn: (index) => {
        const dirDependentIndex = this.getIndexDependOnDir(index);

        if (!this.imagesRefs[dirDependentIndex]) {
          return null;
        }

        const tag = this.imagesRefs[dirDependentIndex];
        const width = tag.naturalWidth;
        const height = tag.naturalHeight;
        const rect = tag.getBoundingClientRect();
        const ration = Math.min(rect.width / width, rect.height / height);
        const fitWidth = width * ration;
        const fitHeight = height * ration;

        return {
          x: rect.left + (rect.width - fitWidth) / 2 + window.pageXOffset,
          y: rect.top + (rect.height - fitHeight) / 2 + window.pageYOffset,
          w: fitWidth,
        };
      },
      index: this.getIndexDependOnDir(index),
      bgOpacity: 0.9,
      history: false,
    };

    this.createGallery.then((createGallery) => {
      if (this.unmounted) {
        return;
      }

      this.gallery = createGallery(items, options);

      // this.gallery.loadAndOpen();
      this.gallery.listen("beforeChange", () => {
        if (this.gallery && this.slickFeaturedRef) {
          this.slickFeaturedRef.slickGoTo(this.gallery.getCurrentIndex(), true);
        }
      });
      // this.gallery.listen("destroy", () => {
      //   this.gallery = null;
      // });

      this.gallery.destroy();

      this.gallery.init();
    });
  }

  render() {
    const { layout, images } = this.props;
    const { currentIndex } = this.state;


    const checkReturn = () => {
      let data = false
      if (this.props.currentData !== undefined && this.props.currentData.isTimerEnd === true && this.props.currentData.isProductSet === true)
        data = true
      return data
    }

    const baseColor = this.props !== undefined && this.props.baseColor
    const highlightColor = this.props !== undefined && this.props.highlightColor

    const featured = () => {
     
      let promotionEnabled = false;
      let promotionDiscount = 0;
      if (this.props.product.ProductPromotion && JSON.parse(this.props.product.ProductPromotion).length > 0) {
        promotionEnabled = true;
        promotionDiscount= JSON.parse(this.props.product.ProductPromotion)[0].ProductDiscount
      }
     
      return (
        images.map((image, index) => (
          <div
            key={index}
            className="product-image product-image--location--gallery"
          >
            <Link
              to={`/${image.ProductMediaUrl}`}
              className="product-image__body"
              onClick={(event) => this.handleFeaturedClick(event, index)}
              target="_blank"
            >
              {/*
                    The data-width and data-height attributes must contain the size of a larger
                    version of the product image.

                    If you do not know the image size, you can remove the data-width and data-height
                    attribute, in which case the width and height will be obtained from the
                    naturalWidth and naturalHeight property of img.product-image__img.
                    */}
              <img
                className="product-image__img"
                src={image.ProductMediaUrl !== undefined ? image.ProductMediaUrl : image}
                alt=""
                ref={(element) => {
                  this.imagesRefs[index] = element;
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Logo;
                }}
                data-width="700"
                data-height="700"
              />
            </Link>
            {promotionEnabled&& <Chip variant="outlined" label={`${promotionDiscount} % OFF`} style={{ backgroundColor: "#d23f57", color: '#ffffff',borderRadius:'0px' }} />   }
          </div>
        )

        )
      )
    };


    

    const thumbnails = images.map((image, index) => {
      const classes = classNames(
        "product-gallery__carousel-item product-image",
        {
          "product-gallery__carousel-item--active": index === currentIndex,
        }
      );

      return (
        <button
          type="button"
          key={index}
          onClick={() => this.handleThumbnailClick(index)}
          className={classes}
        >
          <div className="product-image__body">
            <img
              className="product-image__img product-gallery__carousel-image"
              src={image.ProductMediaUrl !== undefined ? image.ProductMediaUrl : image}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = Logo;
              }}
            />
          </div>
        </button>
      );
    });
    return (
      <div className="product__gallery">
        <div className="product-gallery">
          <div className="product-gallery__featured">
            {layout !== "quickview" && (
              <button
                type="button"
                className="product-gallery__zoom"
                onClick={this.handleZoomButtonClick}
                disabled={checkReturn() ? false : true}
              >
                <ZoomIn24Svg />
              </button>
            )}
            <StroykaSlick
              ref={this.setSlickFeaturedRef}
              {...slickSettingsFeatured}
              beforeChange={this.handleFeaturedBeforeChange}
              afterChange={this.handleFeaturedAfterChange}
            >
              {checkReturn() ?
                featured()
                :
                <Skeleton height={350} baseColor={baseColor} highlightColor={highlightColor} />
              }
            </StroykaSlick>
          </div>
          <div className="product-gallery__carousel">
            <StroykaSlick {...slickSettingsThumbnails[layout]}>
              {checkReturn() ?
                thumbnails
                :
                <Skeleton height={50} width={50} baseColor={baseColor} highlightColor={highlightColor} />
              }
            </StroykaSlick>
          </div>
        </div>
      </div>
    );
  }
}

ProductGallery.propTypes = {
  images: PropTypes.array,
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
  /** current locale */
  locale: PropTypes.string,
};

ProductGallery.defaultProps = {
  images: [],
  layout: "standard",
};

const mapStateToProps = (state) => ({
  locale: state.locale,
});


const mapDispatchToProps = (dispatch) => {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductGallery);
