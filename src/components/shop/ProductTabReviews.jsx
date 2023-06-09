// react
import React, { Component } from "react";

// application
import Pagination from "../shared/Pagination";
import Rating from "../shared/Rating";
import Box from "@mui/material/Box";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import USER from "../../assets/user.jpg";

import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// data stubs
import reviews from "../../data/shopProductReviews";
import ReviewRating from "@mui/lab/Rating";
import LoadingPanel from "../shared/loadingPanel";
import { browserHistory } from "react-router";

import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { Card, CardText, CardBody } from 'reactstrap'
import { Button, Typography } from "@mui/material";


function mapStateToProps(state) {
  return {
    reviews: state.counterReducer["reviews"],
    reviewReturn: state.counterReducer["reviewReturn"],
    loading: state.counterReducer["loading"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddProductReview: (PropsData) => dispatch(GitAction.CallAddProductReview(PropsData)),
    CallEmptyProductReview: () => dispatch(GitAction.CallEmptyProductReview()),
    CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData))
  };
}

class ProductTabReviews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productReviewRating: 0,
      productReviewComment: "",
      productReplyReviewComment: "",
      productID: "",
      userID: "",
      parentProductReviewID: 0,
      reply: "",
      replyid: "",
      page: 1,
      rowsPerPage: 3,
      setReview: false,
      isReviewSet: true,
      addReview: false,
      isdbReviews: false,
    }

    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.login = this.login.bind(this);
    this.onSubmitReviewReply = this.onSubmitReviewReply.bind(this);
    this.reviewsList = this.reviewsList.bind(this);
  }

  login() {
    this.props.history.push("/login");
  }

  onSubmitReviewReply() {
    this.props.CallAddProductReview({
      parentProductReviewID: this.state.replyid,
      productID: this.props.product.ProductID,
      UserID: localStorage.getItem("id"),
      productReviewRating: "0",
      productReviewComment: this.state.productReplyReviewComment,
      replyParentID: 0
    })

    this.setState({ reply: false, isReviewSet: false })
  }

  onSubmitReview() {
    this.props.CallAddProductReview({
      parentProductReviewID: this.state.parentProductReviewID,
      productID: this.props.product.ProductID,
      UserID: localStorage.getItem("id"),
      productReviewRating: this.state.productReviewRating,
      productReviewComment: this.state.productReviewComment,
      replyParentID: 0
    })

    this.setState({ productReviewComment: "", productReviewRating: 0, isReviewSet: false })
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  reviewListing = (reviewData) => {
    return (
      <div className="row">
        <div className="col-2">
          <div id="review_avatar" className="review__avatar">
            <img width="50px" height="65px" src={reviewData.avatar ? reviewData.avatar : USER} alt={reviewData.avatar} onError={(e) => (e.target.src = USER)} />
          </div>
        </div>
        <div className="col-10">
          <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
            <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{reviewData.Name}</div>
            <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{reviewData.CreatedDate}</div>
            <div id="review_comment" style={{ fontSize: "12px" }}>{reviewData.ProductReviewComment}</div>
          </div>
        </div>
      </div>
    )
  }

  ReplyReviewFormat = (reviewItem, index) => {
    //backgroundColor: "#778899" 
    return (
      <ListItem key={index} button style={{ display: "inline-block" }} >
        <div style={{ width: '80%', display: "block", float: "right", backgroundColor: "#D8D8D8", padding: "0.2rem" }}>
          {/* <CardBody style={{ padding: "0.5rem" }}>
            <CardText> */}
          {this.reviewListing(reviewItem)}
          {/* </CardText>
          </CardBody> */}
        </div>
      </ListItem>
    )
  }


  reviewsList = (reviewData, page) => {
    if (reviewData !== null) {
      return (
        reviewData.length > 0 && reviewData
          .slice((page - 1) * this.state.rowsPerPage, (page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
          .filter((x) => x.ParentProductReviewID === 0)
          .map(
            (review, index) => (
              <li key={index} className="reviews-list__item">
                <div id="review" className="review">
                  <div id="review_avatar" className="review__avatar">
                    <img src={review.avatar ? review.avatar : USER} alt={review.avatar} onError={(e) => (e.target.src = USER)} />
                  </div>
                  <div
                    id="review_content"
                    className=" review__content"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{review.Name}</div>
                    <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{review.CreatedDate}</div>
                    <div id="review_rating" className=" review__rating">
                      <Rating value={review.ProductReviewRating} />
                    </div>
                    <div id="review_text" className=" review__text" style={{ display: "flex", width: "100%", justifyContent: "space-between", fontSize: "13px" }}>
                      <div id="review_comment">{review.ProductReviewComment}</div>
                      {/* <div id="comment" className="comment-reply" style={{ cursor: "pointer" }}>
                        <a className="comment-btn" onClick={() => localStorage.getItem("isLogin") === "false" ? this.login() : this.setState({ reply: !this.state.reply, replyid: review.ProductReviewID })} >
                          <i className="fas fa-reply" />{" "}
                          Reply
                        </a>
                      </div> */}
                    </div>
                    {review.ProductReviewDetail !== null && review.ProductReviewDetail !== undefined &&
                      JSON.parse(review.ProductReviewDetail).map((reviewItem, index) => {
                        return (
                          reviewItem.replyParentID === review.ProductReviewID &&
                          this.ReplyReviewFormat(reviewItem, index)
                        )
                      })
                    }
                    {
                      review.ProductReviewDetail != null ?
                        JSON.parse(review.ProductReviewDetail).map(
                          (reviewReply, index) => (
                            <>
                              {
                                reviewReply.replyParentID === 0 &&
                                <div id="review_reply" className="review" style={{ paddingTop: "15pt" }}>
                                  <div id="review_reply_avatar" className="review__avatar">
                                    <img src={reviewReply.avatar ? reviewReply.avatar : USER} alt={reviewReply.avatar} onError={(e) => (e.target.src = USER)} />
                                  </div>
                                  <div
                                    id="review_reply_content"
                                    className=" review__content"
                                    style={{
                                      width: "100%",
                                    }}
                                  >
                                    <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{reviewReply.Name}</div>
                                    <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{reviewReply.CreatedDate}</div>
                                    <div id="review_text" className=" review__text" style={{ display: "flex", width: "100%", justifyContent: "space-between", fontSize: "13px" }}>
                                      <div id="review_comment">{reviewReply.ProductReviewComment}</div>
                                    </div>
                                  </div>
                                </div>
                              }
                              {
                                JSON.parse(review.ProductReviewDetail).filter((x) => x.replyParentID === reviewReply.ProductReviewID).length > 0 &&
                                JSON.parse(review.ProductReviewDetail).filter((x) => x.replyParentID === reviewReply.ProductReviewID).map((data) => {
                                  return (this.ReplyReviewFormat(data, 0))
                                })
                              }
                            </>
                          )) : ""
                    }
                    {
                      this.state.reply == true && review.ProductReviewID == this.state.replyid &&
                      <div id="reply_content" className="pt-3 row">
                        <div id="reply_msg" className="pt-3 col-9">
                          <textarea className="form-control" placeholder="Tell us more about your comment on this review" id="review-text" rows="6"
                            style={{ height: "70px" }}
                            value={this.state.productReplyReviewComment}
                            onChange={({ target }) => { this.setState({ productReplyReviewComment: target.value, productReviewRating: 0 }); }} required />
                        </div>
                        <div id="reply_btn" className="pt-3 col-3 reply_btn" onClick={() => localStorage.getItem("isLogin") !== "true" ? this.login() : this.onSubmitReviewReply()} >
                          <button style={{ borderRadius: "5px" }} className="btn btn-primary btn-md">
                            Post Your Reply
                          </button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </li >
            )
          )
      )
    }
    else {
      return (
        <div
          className=" review__content"
          style={{
            width: "100%",
            font: "14px",
            color: "gray",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          No Reviews Yet
        </div>
      )
    }
  }


  render() {
    const { page } = this.state;
    const reviewsByProduct = JSON.parse(this.props.product.ProductReview).filter((x) => x.ProductID === this.props.product.ProductID).map((y) => y)
    return (
      this.props.loading === false && this.state.isReviewSet === true ?
        reviewsByProduct.length > 0 ?
          <div className="reviews-view" id="reviews" >
            <div className="reviews-view__list">
              <div className="reviews-view__header"> Customer Reviews </div>
              <div className="reviews-list">
                <ol className="reviews-list__content">
                  {reviewsByProduct.length > 0 && reviewsByProduct[0].ProductID !== undefined
                    && this.reviewsList(reviewsByProduct, page)}
                </ol>
                <div className="reviews-list__pagination">
                  <Pagination
                    current={page}
                    total={
                      reviewsByProduct.length > 0 && reviewsByProduct[0].ReturnVal === undefined ?
                        Math.ceil(Math.ceil(reviewsByProduct.length) / this.state.rowsPerPage)
                        : 0
                    }
                    onPageChange={this.handlePageChange}
                  />
                </div>
                {/* <div className="reviews-list__addReviewbtn">
                  <button style={{ borderRadius: "5px" }} className="btn btn-primary btn-md" onClick={() => this.setState({ addReview: !this.state.addReview })}>Add a Review</button>
                </div> */}
              </div>
            </div>
            {
              this.state.addReview === true ?
                <>
                  <div className="reviews-view__header" >Write A Review</div>
                  <div className="row">
                    <div id="review_avatar" className="review__avatar">
                      <img src={USER} alt="avatar" onError={(e) => (e.target.src = USER)} />
                    </div>
                    <div className="review__content col-10" style={{}} id="writeReviews">
                      <div style={{ display: "inline-block" }}>
                        <Box component="fieldset" mb={1} borderColor="transparent" >
                          <ReviewRating
                            size="medium"
                            emptyIcon={<StarBorderIcon fontSize="medium" />}
                            name="customized-empty"
                            value={this.state.productReviewRating}
                            onChange={({ target }) => {
                              this.setState({
                                productReviewRating: target.value,
                              });
                            }}
                            required
                          />
                        </Box>
                      </div>
                      <div className="form-group mb-2">
                        <textarea className="form-control" style={{ height: "80px" }} placeholder="Tell us more about your review on this product" id="review-text" rows="6" value={this.state.productReviewComment} onChange={({ target }) => { this.setState({ productReviewComment: target.value, }); }} required />
                      </div>
                      <div className="form-group mb-0">
                        <button style={{ borderRadius: "5px" }} className="btn btn-primary btn-md" onClick={() => localStorage.getItem("isLogin") === "false" ? this.login() : this.onSubmitReview()} >
                          Post Your Review
                        </button>
                      </div>
                    </div>
                  </div>
                </>
                :
                ""
            }
          </div>
          :
          <Typography variant="subtitle1" style={{ display: "flex", justifyContent: "center" }}>This item doesn't have review yet!</Typography>
        :
        <LoadingPanel></LoadingPanel>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTabReviews);
