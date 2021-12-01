import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { GitAction } from "../../store/action/gitAction";
import { Card, CardText, CardBody } from 'reactstrap'
import { Accordion, AccordionItem } from 'react-bootstrap-accordion'
import 'react-bootstrap-accordion/dist/index.css'
import "../../app/App.scss";
import "react-table/react-table.css";


// Share components
import Pagination from "../../components/shared/Pagination";
import Rating from "../../components/shared/Rating";
import { url } from '../../services/utils';
import USER from "../../assets/user.jpg";
import Logo from "../../assets/Emporia.png";
import LoadingPanel from "../../components/shared/loadingPanel";



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

// data stubs

import { filter } from "rxjs/operator/filter";

function mapStateToProps(state) {
  return {
    productCategories: state.counterReducer["productCategories"],
    productInfo: state.counterReducer["productsByID"],
    reviews: state.counterReducer["reviews"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallProductDetail: (prodData) => dispatch(GitAction.CallProductDetail(prodData)),
    CallResetProductDetails: () => dispatch(GitAction.CallResetProductDetails()),

    CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
    CallProductReview: (propsData) => dispatch(GitAction.CallProductReview(propsData)),
  };
}

class ViewProductGeneralInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CategoryHierachyListing: [],
      CategoryHierachyID: [],
      categoryHierachy: 0,

      variationTypeList: [],
      variationTypeID: [],
      isVariationSet: false,

      productReview: [],
      isReviewSet: false,
      productRating: "",

      page: 1,
      rowsPerPage: 3,
      setRating: 0,
    };
    this.handleBack = this.handleBack.bind(this)
    this.getTagList = this.getTagList.bind(this)
    this.getCategoryListing = this.getCategoryListing.bind(this)
    this.getReviewList = this.getReviewList.bind(this)
    this.filterRating = this.filterRating.bind(this)
    this.ratingList = this.ratingList.bind(this)
  }

  handleBack() {
    this.props.CallResetProductDetails()
    this.props.backToList()
  }

  componentDidMount() {
    if (window.localStorage.getItem("id") !== undefined && this.props.match.params.productId !== undefined) {
      this.props.CallProductDetail({
        productId: this.props.match.params.productId,
        userId: window.localStorage.getItem("id"),
      })
      this.props.CallAllProductCategoryListing()
      this.props.CallProductReview({
        UserID: window.localStorage.getItem("id"),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.productCategories.length > 0 && this.props.productInfo.length > 0) {
      this.getCategoryListing(this.props.productInfo[0], this.props.productCategories)
      this.getVariationList(this.props.productInfo[0])
    }
    if (this.props.reviews.length > 0 && this.props.reviews.ReturnVal === undefined) {
      this.getReviewList(this.props.reviews)
    }
  }

  getTagList() {
    var tagList = "-";

    let ProductTag = this.props.productInfo.length > 0 && this.props.productInfo[0].ProductTag !== null ? JSON.parse(this.props.productInfo[0].ProductTag.replace(/\\/g, "")) : []
    ProductTag.map((tag) => {
      if (tagList == "") {
        tagList = tag.tag;
      }
      else {
        tagList = tagList + "," + tag.tag;
      }
    })
    return tagList
  }

  getCategoryListing(productInfo, categoryInfo) {
    let tempCategoryHierachy = 0
    this.state.CategoryHierachyListing.splice(0, this.state.CategoryHierachyListing.length)

    if (categoryInfo !== null && productInfo.ProductCategoryID !== null && this.state.categoryHierachy === 0) {
      categoryInfo.map((category) => {
        if (category.ProductCategoryID == productInfo.ProductCategoryID) {
          this.setState({ categoryHierachy: 1 })
          this.state.CategoryHierachyListing.push(category.ProductCategory)
          this.state.CategoryHierachyID.push(category.ProductCategoryID)
          tempCategoryHierachy = 1
        }
      })

      if (tempCategoryHierachy === 0 && tempCategoryHierachy !== 1) {
        categoryInfo.map((categoryList) => {
          categoryList.HierarchyItem !== null && categoryList.HierarchyItem !== undefined &&
            JSON.parse(categoryList.HierarchyItem).map((category) => {
              if (category.ProductCategoryID == productInfo.ProductCategoryID) {
                this.setState({ categoryHierachy: 2 })
                this.state.CategoryHierachyListing.push(categoryList.ProductCategory, category.ProductCategory)
                this.state.CategoryHierachyID.push(categoryList.ProductCategoryID, category.ProductCategoryID)
                tempCategoryHierachy = 2
              }
            })
        })
      }

      if (tempCategoryHierachy === 0 && tempCategoryHierachy !== 1 && tempCategoryHierachy !== 2) {
        categoryInfo.map((categoryListing) => {
          categoryListing.HierarchyItem !== null && categoryListing.HierarchyItem !== undefined &&
            JSON.parse(categoryListing.HierarchyItem).map((categoryList) => {
              categoryList.HierarchyItem !== null && categoryList.HierarchyItem !== undefined &&
                JSON.parse(categoryList.HierarchyItem).map((category) => {
                  if (category.ProductCategoryID == productInfo.ProductCategoryID) {
                    this.setState({ categoryHierachy: 3 })
                    this.state.CategoryHierachyListing.push(categoryListing.ProductCategory, categoryList.ProductCategory, category.ProductCategory)
                    this.state.CategoryHierachyID.push(categoryListing.ProductCategoryID, categoryList.ProductCategoryID, category.ProductCategoryID)
                    tempCategoryHierachy = 3
                  }
                })
            })
        })
      }

      if (tempCategoryHierachy === 0 && tempCategoryHierachy !== 1 && tempCategoryHierachy !== 2 && tempCategoryHierachy !== 4) {
        categoryInfo.map((mainCategory) => {
          mainCategory.HierarchyItem !== null && mainCategory.HierarchyItem !== undefined &&
            JSON.parse(mainCategory.HierarchyItem).map((categoryListing) => {
              categoryListing.HierarchyItem !== null && categoryListing.HierarchyItem !== undefined &&
                JSON.parse(categoryListing.HierarchyItem).map((categoryList) => {
                  categoryList.HierarchyItem !== null && categoryList.HierarchyItem !== undefined &&
                    JSON.parse(categoryListing.HierarchyItem).map((category) => {
                      if (categoryList.ProductCategoryID == productInfo.ProductCategoryID) {
                        this.setState({ categoryHierachy: 4 })

                        this.state.CategoryHierachyListing.push(mainCategory.ProductCategory, categoryListing.ProductCategory, categoryList.ProductCategory, category.ProductCategory)
                        this.state.CategoryHierachyID.push(mainCategory.ProductCategoryID, categoryListing.ProductCategoryID, categoryList.ProductCategoryID, category.ProductCategoryID)
                        tempCategoryHierachy = 4
                      }
                    })
                })
            })
        })
      }

    }
  }

  getVariationList(productInfo) {
    let variationList = []
    let variationType = []
    let variationTypeID = []

    if (productInfo.ProductVariation !== null && this.state.isVariationSet === false) {
      variationList = JSON.parse(productInfo.ProductVariation).filter((ele, ind) => ind === JSON.parse(productInfo.ProductVariation).findIndex(elem => elem.ProductVariationID === ele.ProductVariationID))
      variationList.map((x) => {
        variationType.push(x.ProductVariation)
        variationTypeID.push(x.ProductVariationID)
      })

      this.setState({ variationTypeList: variationType, variationTypeListID: variationTypeID, isVariationSet: true })
    }

  }

  getReviewList(reviewsData) {
    let reviewList = []
    let reviewData = []
    if (this.state.isReviewSet === false) {
      reviewList = reviewsData.filter((x) => x.ProductID === parseInt(this.props.match.params.productId))

      if (reviewList.length > 0 && reviewList[0].ProductReviewDetail !== null) {
        JSON.parse(reviewList[0].ProductReviewDetail).filter((x) => x.ParentProductReviewID === 0).map((x) => {
          reviewData.push(x)
        })

        this.setState({ productRating: reviewList[0].ProductAverageRating, productReview: reviewData, isReviewSet: true })
      }
    }
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  filterRating(value) {
    let ratingNum = 0
    ratingNum = this.state.productReview.filter((x) => x.ProductReviewRating === value)
    return ratingNum.length
  }

  ratingList(filterProductReview) {
    return (

      filterProductReview.length > 0 ?
        filterProductReview
          .slice((this.state.page - 1) * this.state.rowsPerPage, (this.state.page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
          .map((reviews) => {
            return (
              <Card style={{ width: '100%' }}>
                <CardBody style={{ padding: "0.5rem" }} >
                  <CardText>
                    <div className="row">
                      <div className="col-2">
                        <div id="review_avatar" className="review__avatar">
                          <img src={reviews.avatar ? reviews.avatar : USER} alt={reviews.avatar} onError={(e) => (e.target.src = USER)} />
                        </div>
                      </div>
                      <div className="col-10">
                        <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                          <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{reviews.Name}</div>
                          <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{reviews.CreatedDate}</div>

                          <div id="review_rating" className=" review__rating">
                            <Rating value={reviews.ProductReviewRating} />
                          </div>
                          <div id="review_text" className=" review__text" style={{ display: "flex", width: "100%", justifyContent: "space-between", fontSize: "12px" }}>
                            <div id="review_comment">{reviews.ProductReviewComment}</div>
                            <div id="comment" className="comment-reply">
                              <a className="comment-btn" onClick={() => console.log("HI")} >
                                <i className="fas fa-reply" />{" "}
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </CardText>
                </CardBody>
              </Card>
            )
          })
        :
        <div><label>Currently there is no review with this rating</label></div>
    )
  }

  render() {
    const productInfoLabelStyle = {
      fontSize: "14px",
      fontWeight: "bold",
    }
    const rating = [5, 4, 3, 2, 1]

    return (
      this.props.productInfo.length > 0 ?
        <div style={{ width: "100%" }}>
          <div style={{ margin: "1%" }}>
            <div>
              <h3>{typeof this.props.productInfo !== "undefined" ? this.props.productInfo[0].ProductName : "Product Information"}</h3>
            </div>
            <div style={{ display: "flex" }}>
              <Button onClick={() => typeof this.props.backToList === "function" && this.handleBack()}>
                <i className="fas fa-chevron-left"></i>
                <Link className="nav-link" to={"/viewProduct"}>
                  Back
                </Link>
              </Button>
            </div>

            <div style={{ margin: "2%" }}>
              <Card style={{ width: '100%' }}>
                <CardBody>
                  <CardText>
                    <div className="row">
                      <div className="col-lg-11">
                        <h6 style={{ textAlign: "left" }} >Product Information</h6>
                      </div>
                      <div className="col-lg-1" style={{ textAlign: "right" }}>
                        <Button variant="primary" ><Link to={url.inventoryProductDetails(this.props.match.params.productId)} className="cart-table__product-name">
                          Edit </Link></Button>
                      </div>
                    </div>

                    <div className="row">
                      <div key="ProductImages" className=" col-lg-2 ">
                        <img
                          width="150"
                          height="150"
                          src={this.props.productInfo[0].ProductImages !== null ? this.props.productInfo[0].ProductImages : Logo}
                          onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
                          alt=""
                        />
                      </div>
                      <div key="Brand" className="col-lg-10" style={{ textAlign: "left" }}>
                        <div className="row">
                          <div className="col-lg-2">
                            <label style={productInfoLabelStyle}>Product Brand :</label>
                          </div>
                          <div className="col-lg-10">
                            <label>{this.props.productInfo[0].Brand !== "" ? this.props.productInfo[0].Brand : "-"}</label>
                          </div>
                        </div>

                        <div key="Model" className="row">
                          <div className="col-lg-2">
                            <label style={productInfoLabelStyle}>Product Model :</label>
                          </div>
                          <div className="col-lg-10">
                            <label>{this.props.productInfo[0].Model !== "" ? this.props.productInfo[0].Model : "-"}</label>
                          </div>
                        </div>

                        <div key="Tags" className="row">
                          <div className="col-lg-2">
                            <label style={productInfoLabelStyle}>Product Tags :</label>
                          </div>
                          <div className="col-lg-10">
                            <label>{this.getTagList()}</label>
                          </div>
                        </div>

                        <div key="Tags" className="row">
                          <div className="col-lg-2">
                            <label style={productInfoLabelStyle}>Product Category :</label>
                          </div>
                          <div className="col-lg-10">
                            {this.state.CategoryHierachyListing.length > 0 && this.state.CategoryHierachyListing.map((category, i) => {
                              return (<label>{"  >  " + category}</label>)
                            })}
                          </div>
                        </div>

                        <div key="Description" className="row">
                          <div className="col-lg-2">
                            <label style={productInfoLabelStyle}>Product Description :</label>
                          </div>
                          <div className="col-lg-10" >
                            <label style={{ textAlign: "justify" }}>{this.props.productInfo[0].ProductDescription !== null ?
                              this.props.productInfo[0].ProductDescription.replace(/<[^>]+>/g, ' ').substring(0, 300) + " ... " : "-"}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardText>
                </CardBody>
              </Card>
            </div>

            {/* ---------------------------------------------------------------- STOCK LISTING ----------------------------------------------------------------------- */}

            <div style={{ margin: "2%" }}>
              <div className="row">
                <div className="col-4">
                  <Card style={{ width: '100%' }}>
                    <CardBody>
                      <CardText>

                        <div className="row">
                          <div className="col-lg-10">
                            <h6 style={{ textAlign: "left" }} >Product Stock</h6>
                          </div>
                          <div className="col-lg-1" style={{ textAlign: "right" }}>
                            <Button variant="primary" >
                              {/* <Link to={url.inventoryProductDetails(this.props.match.params.productId)} className="cart-table__product-name"> */}
                              Edit
                              {/* </Link> */}
                            </Button>
                          </div>
                        </div>

                        {
                          this.state.variationTypeList.length > 0 ? this.state.variationTypeList.map((variation, index) => {
                            return (
                              <Accordion title={variation}>
                                {this.props.productInfo[0].ProductVariation !== null && JSON.parse(this.props.productInfo[0].ProductVariation).filter((x) => x.ProductVariationID ===
                                  this.state.variationTypeListID[index]).map((details) => {
                                    return (
                                      <Card style={{ width: '100%' }}>
                                        <CardBody style={{ padding: "0.5rem" }}>
                                          <CardText>
                                            <div className="row">
                                              <div className="col-6" style={{ textAlign: "left" }}>
                                                <label>{details.ProductVariationValue} </label>
                                              </div>
                                              <div className="col-6">
                                                <label >{details.ProductStockAmount}</label>
                                              </div>
                                            </div>
                                          </CardText>
                                        </CardBody>
                                      </Card>
                                    )
                                  })}
                              </Accordion>
                            )
                          })
                            :
                            <div>
                              Temporarily there is no variation for this product
                            </div>
                        }
                      </CardText>
                    </CardBody>
                  </Card>
                </div>

                {/* ---------------------------------------------------------------- PRODUCT REVIEW ----------------------------------------------------------------------- */}

                <div className="col-8">
                  <Card style={{ width: '100%' }}>
                    <CardBody>
                      <CardText>

                        <div className="row">
                          <div className="col-lg-9">
                            <h6 style={{ textAlign: "left" }} >Product Review</h6>
                          </div>
                          <div className="col-lg-3" style={{ textAlign: "right" }}>
                            <Button variant="primary" >
                              {/* <Link to={url.inventoryProductDetails(this.props.match.params.productId)} className="cart-table__product-name"> */}
                              View All
                              {/* </Link> */}
                            </Button>
                          </div>
                        </div>

                        {
                          this.state.productReview.length > 0 &&
                          <div className="row" style={{ textAlign: "left", paddingBottom: "15px" }}>
                            <div className="col-lg-12">
                              <Button variant="outlinedPrimary" onClick={() => this.setState({ setRating: 0, page: 1 })}>All ({this.state.productReview.length})</Button>
                              {rating.map((x) => {
                                return (
                                  <Button variant="outlinedPrimary" onClick={() => this.setState({ setRating: x, page: 1 })}>{x} Star ({this.filterRating(x)})</Button>
                                )
                              })}
                            </div>
                          </div>
                        }

                        {this.ratingList(this.state.setRating === 0 ? this.state.productReview : this.state.productReview.filter((x) => x.ProductReviewRating === this.state.setRating))}
                        {this.state.productReview !== undefined && this.state.productReview.length > 0 ?
                          <div style={{ marginTop: "15px" }}>
                            <Pagination
                              current={this.state.page}

                              total={this.state.setRating === 0 ?
                                Math.ceil(this.state.productReview.length / this.state.rowsPerPage)
                                :
                                Math.ceil(this.filterRating(this.state.setRating) / this.state.rowsPerPage)
                              }
                              onPageChange={this.handlePageChange}
                            />
                          </div>
                          :
                          <div>
                            Temporarily there is no review for this product
                          </div>
                        }
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div >
        : <LoadingPanel />

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductGeneralInfo);
