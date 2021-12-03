// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import BlockHeader from "../shared/BlockHeader";
import ProductCard from "../shared/ProductCard";
import MerchantCard from "../shared/MerchantCard";
import StroykaSlick from "../shared/StroykaSlick";

const slickSettings = {
    "grid-3": {
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 1000,
        centerPadding: '60px',
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
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
    "grid-4": {
        centerMode: true,
        centerPadding: '60px',
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
        centerMode: true,
        centerPadding: '60px',
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

export default class BlockMerchant extends Component {
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
        let { merchants } = this.props;
        if (rows > 0) {
            merchants = merchants.slice();

            while (merchants.length > 0) {
                columns.push(merchants.splice(0, rows));
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
        } = this.props;

        const columns = this.productsColumns().map((column, index) => {
            const merchants = column.map((merchant, index) => (
                <div className="block-products-carousel__cell" key={index}>
                    <MerchantCard merchant={merchant} key={index} />
                </div>
            ));

            return (

                <div key={index} className="block-products-carousel__column">
                    {merchants}
                </div>
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
            <div className={blockClasses} data-layout={layout} style={{ marginTop:"10px" }} >
                {
                    this.props.merchants.length === 0 ?
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
                                    groups={groups}
                                    arrows
                                    onNext={this.handleNextClick}
                                    onPrev={this.handlePrevClick}
                                    onGroupClick={onGroupClick}
                                />

                                <div className="block-products-carousel__slider">
                                    <div className="block-products-carousel__preloader" />
                                    <StroykaSlick ref={this.setSlickRef} {...slickSettings[layout]}>
                                        {columns}
                                    </StroykaSlick>
                                </div>
                            </div>
                        )
                }

            </ div>
        );
    }
}

BlockMerchant.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(["grid-3", "grid-4", "grid-4-sm", "grid-5", "horizontal"]),
    rows: PropTypes.number,
    merchants: PropTypes.array,
    groups: PropTypes.array,
    withSidebar: PropTypes.bool,
    loading: PropTypes.bool,
    onGroupClick: PropTypes.func,
};

BlockMerchant.defaultProps = {
    layout: "grid-4",
    rows: 1,
    merchants: [],
    groups: [],
    withSidebar: false,
    loading: false,
    onGroupClick: undefined,
};
