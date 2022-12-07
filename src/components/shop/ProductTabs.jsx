// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import ProductTabDescription from "./ProductTabDescription";
import ProductTabSpecification from "./ProductTabSpecification";
import ProductTabReviews from "./ProductTabReviews";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Card,  } from "@mui/material";


class ProductTabs extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentTab;
  }

  setTab = (newTab) => {
    this.setState(() => ({ currentTab: newTab }));
  };

  render() {

    const { withSidebar } = this.props;
    let { product } = this.props;
    const baseColor = this.props.currentTab !== undefined && this.props.currentTab.baseColor
    const highlightColor = this.props.currentTab !== undefined && this.props.currentTab.highlightColor


    const classes = classNames("product-tabs", {
      "product-tabs--layout--sidebar": withSidebar,
    });

    window.addEventListener("lnk", (e) => window.location.href);
    const tabs = [
      {
        key: "description",
        title: "Description",
        content: <ProductTabDescription product={product} />,
      },
      {
        key: "specification",
        title: "Specification",
        content: <ProductTabSpecification product={product} />,
      },
      {
        key: "reviews",
        title: "Reviews",
        content: <ProductTabReviews product={product} />,
      },
    ];


    const tabsButtons = tabs.map((tab) => {
      const classes = classNames("product-tabs__item", {
        "product-tabs__item--active":
          this.props.currentTab.currentTab === tab.key,
      });

      return (
        <button
          key={tab.key}
          type="button"
          //   onClick={() => this.setTab(tab.key)}
          onClick={() => this.props.setCurrentTab(tab.key)}
          className={classes}
        >
          {this.props.currentTab !== undefined && this.props.currentTab.isTimerEnd === true && this.props.currentTab.isProductSet === true &&
            tab.title
          }
        </button>

      );
    });

    const tabsContent = tabs.map((tab) => {
      const classes = classNames("product-tabs__pane", {
        "product-tabs__pane--active":
          this.props.currentTab.currentTab === tab.key,
      });

      return (
        <div key={tab.key} className={classes}>
          {
            this.props.currentTab !== undefined && this.props.currentTab.isTimerEnd === true && this.props.currentTab.isProductSet === true ?
              tab.content :
              <Skeleton height={20} count={5} baseColor={baseColor} highlightColor={highlightColor} />
          }
        </div>
      );
    });

    return (
      <Card elevation={2} className={classes}>
        <div className="product-tabs__list">{tabsButtons}</div>
        <div className="product-tabs__content">{tabsContent}</div>
      </Card>
    );
  }
}

ProductTabs.propTypes = {
  withSidebar: PropTypes.bool,
};

ProductTabs.defaultProps = {
  withSidebar: false,
};

export default ProductTabs;
