// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GitAction } from "../../store/action/gitAction";
// application
import departmentsAria from "../../services/departmentsArea";
import languages from "../../i18n";
import StroykaSlick from "../shared/StroykaSlick";
import banner1 from "../../assets/banner1.jpeg";
import { isArrayNotEmpty } from "../../Utilities/UtilRepo";

const slickSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class BlockSlideShow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      slides: [],
      isBannerSet: false
    };
  }

  departmentsAreaRef = null;

  media = window.matchMedia("(min-width: 992px)");

  // slides = [
  // {
  //   // title: "11.11<br>Hardware products Sale",
  //   // text: "11.11 Big Show will also be held during the big sale.",
  //   image_classic: {
  //     ltr: "images/slides/slide_1.jpg",
  //     rtl: "images/slides/slide_1.jpg",
  //     // ltr: "images/slides/pharmacy1.jpg",
  //     // rtl: "images/slides/pharmacy1.jpg",
  //   },
  //   image_full: {
  //     // ltr: "images/slides/slide_1_full.jpg",
  //     // rtl: "images/slides/slide_1_full.jpg",
  //     ltr: "images/slides/pharmacy2.png",
  //     rtl: "images/slides/pharmacy2.png",
  //   },
  //   image_mobile: {
  //     ltr: "images/slides/slide_1_mobile.jpg",
  //     rtl: "images/slides/slide_1_mobile.jpg",
  //   },
  // },
  //   {
  //     title: "Furniture<br>MEGA SALES",
  //     text:
  //       "Enjoy huge savings on home furnishing products. While stocks last. Hurry shop now! Delivery To Your Home. 0% Instalment Plan. 365 Days Return Policy",
  //     image_classic: {
  //       ltr: "images/slides/slide_2.jpg",
  //       rtl: "images/slides/slide_2.jpg",
  //     },
  //     image_full: {
  //       ltr: "images/slides/slide_2_full.jpg",
  //       rtl: "images/slides/slide_2_full.jpg",
  //     },
  //     image_mobile: {
  //       ltr: "images/slides/slide_2_mobile.jpg",
  //       rtl: "images/slides/slide_2_mobile.jpg",
  //     },
  //   },
  //   {
  //     title: 'One more<br>Unique header',
  //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
  //     image_classic: {
  //       ltr: 'images/slides/slide_3.jpg',
  //       rtl: 'images/slides/slide_3.jpg',
  //     },
  //     image_full: {
  //       ltr: 'images/slides/slide_3_full.jpg',
  //       rtl: 'images/slides/slide_3_full.jpg',
  //     },
  //     image_mobile: {
  //       ltr: 'images/slides/slide_3_mobile.jpg',
  //       rtl: 'images/slides/slide_3_mobile.jpg',
  //     },
  //   },
  // ];

  // slides = [
  //   {
  //     title: "",
  //     text: "",
  //     image_classic: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //     },
  //     image_full: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //       // ltr: banner1,
  //       // rtl: banner1,
  //     },
  //     image_mobile: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_1.png",
  //     },
  //   },
  //   {
  //     title: "",
  //     text: "",
  //     image_classic: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //     },
  //     image_full: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //       // ltr: banner1,
  //       // rtl: banner1,
  //     },
  //     image_mobile: {
  //       ltr: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //       rtl: "https://myemporia.my/images/slides/Slider_20230214_2.png",
  //     },
  //   },
  //   // {
  //   //   title: "",
  //   //   text:
  //   //     "",
  //   //   image_classic: {
  //   //     ltr: "images/slides/slide_2.jpg",
  //   //     rtl: "images/slides/slide_2.jpg",
  //   //   },
  //   //   image_full: {
  //   //     ltr: "images/slides/slide_2_full.jpg",
  //   //     rtl: "images/slides/slide_2_full.jpg",
  //   //   },
  //   //   image_mobile: {
  //   //     ltr: "images/slides/slide_2_mobile.jpg",
  //   //     rtl: "images/slides/slide_2_mobile.jpg",
  //   //   },
  //   // },
  //   // {
  //   //   title: '',
  //   //   text: '',
  //   //   image_classic: {
  //   //     ltr: 'images/slides/slide_3.jpg',
  //   //     rtl: 'images/slides/slide_3.jpg',
  //   //   },
  //   //   image_full: {
  //   //     ltr: 'images/slides/slide_3_full.jpg',
  //   //     rtl: 'images/slides/slide_3_full.jpg',
  //   //   },
  //   //   image_mobile: {
  //   //     ltr: 'images/slides/slide_3_mobile.jpg',
  //   //     rtl: 'images/slides/slide_3_mobile.jpg',
  //   //   },
  //   // },
  // ];

  componentDidMount() {
    if (this.media.addEventListener) {
      this.media.addEventListener("change", this.onChangeMedia);
    } else {
      // noinspection JSDeprecatedSymbols
      this.media.addListener(this.onChangeMedia);
    }
    this.props.CallBanner()
  }

  componentWillUnmount() {
    departmentsAria.area = null;

    if (this.media.removeEventListener) {
      this.media.removeEventListener("change", this.onChangeMedia);
    } else {
      // noinspection JSDeprecatedSymbols
      this.media.removeListener(this.onChangeMedia);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.banner !== this.props.banner && this.state.isBannerSet === false && isArrayNotEmpty(this.props.banner)) {
      let listing = []
      this.props.banner.map((x) => {
        listing.push({
          title: "",
          text: "",
          image_classic: {
            ltr: x.ProductMediaUrl,
            rtl: x.ProductMediaUrl,
          },
          image_full: {
            ltr: x.ProductMediaUrl,
            rtl: x.ProductMediaUrl,
          },
          image_mobile: {
            ltr: x.ProductMediaUrl,
            rtl: x.ProductMediaUrl,
          },
        })
      })
      this.setState({ slides: listing, isBannerSet: true })
    }
  }


  onChangeMedia = () => {
    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef;
    }
  };

  setDepartmentsAreaRef = (ref) => {
    this.departmentsAreaRef = ref;

    if (this.media.matches) {
      departmentsAria.area = this.departmentsAreaRef;
    }
  };

  render() {
    const { locale, withDepartments } = this.props;
    const { direction } = languages[locale];

    const blockClasses = classNames("block-slideshow block", {
      "block-slideshow--layout--full": !withDepartments,
      "block-slideshow--layout--with-departments": withDepartments,
    });

    const layoutClasses = classNames("col-12", {
      "col-lg-12": !withDepartments,
      "col-lg-9": withDepartments, // col for the banner-part
    });

    const slides = isArrayNotEmpty(this.state.slides) && this.state.slides.map((slide, index) => {
      const image = (withDepartments ? slide.image_classic : slide.image_full)[
        direction
      ];

      return (

        <div key={index} className="block-slideshow__slide">
          {/* <div
            className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
            style={{
              backgroundImage: `url(${image})`,
            }}
          /> */}
          <img
            className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
            // style={{
            //   width: '100vw',
            //   position: 'relative',
            //   left: '50%',
            //   right: '50%',
            //   marginLeft: '-50vw',
            //   marginRight: '-50vw'
            // }}
            src={image}
            width={"100%"}
            height={"auto"}
          />
          <div
            className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
            style={{
              backgroundImage: `url(${slide.image_mobile[direction]})`,
            }}
          />
          <div className="block-slideshow__slide-content">
            <div
              className="block-slideshow__slide-title"
              dangerouslySetInnerHTML={{ __html: slide.title }}
            />
            <div
              className="block-slideshow__slide-text"
              dangerouslySetInnerHTML={{ __html: slide.text }}
            />
          </div>
          <div className="block-slideshow__slide-button">
            <Link to={"/shop/ProductListing/type:Merchant&typevalue:" + 0} className="btn btn-primary btn-lg" style={{ borderRadius: "5px" }}>
              Shop Now
            </Link>
          </div>
        </div>

      );
    });

    return (
      <div className={blockClasses}>
        <div className="">
          <div className="row no-gutters">
            {/* col for the side-panel */}
            {withDepartments && (
              <div
                className="col-3 d-lg-block d-none"
                ref={this.setDepartmentsAreaRef}
              />
            )}

            <div className={layoutClasses}>
              <div className="block-slideshow__body">
                <StroykaSlick {...slickSettings}>{slides}</StroykaSlick>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlockSlideShow.propTypes = {
  withDepartments: PropTypes.bool,
  /** current locale */
  locale: PropTypes.string,
};

BlockSlideShow.defaultProps = {
  withDepartments: false,
};

// const mapStateToProps = (state) => ({
//   locale: state.locale,
// });

function mapStateToProps(state) {
  return {
    banner: state.counterReducer["banner"],
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallBanner: (credentials) => dispatch(GitAction.CallBanner(credentials)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BlockSlideShow);
