// react
import React, { Component } from "react";

// application
import Pagination from "../shared/Pagination";
import Rating from "../shared/Rating";
import Box from "@material-ui/core/Box";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import USER from "../../assets/user.jpg";

// data stubs
import reviews from "../../data/shopProductReviews";
import ReviewRating from "@material-ui/lab/Rating";

class ProductTabReviews extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productReviewRating: "",
      productReviewComment: "",
      reply: "",
      replyid: ""

    }

    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSubmitReviewReply = this.onSubmitReviewReply.bind(this);
  }

  onSubmitReviewReply() {
    console.log("onSubmitReviewReply", this.state)
  }

  onSubmitReview() {
    console.log("onSubmitReview", this.state)
  }

  render() {
    if (this.props.product.ProductReview != null) {

      var reviewsList = JSON.parse(this.props.product.ProductReview).map(
        (review, index) => (
          <li key={index} className="reviews-list__item">
            {console.log("THIS IS THE REVIEW", review)}
            <div className="review">
              <div className="review__avatar">
                <img src={review.avatar ? review.avatar : USER} alt={review.avatar} onError={(e) => (e.target.src = USER)} />
              </div>
              <div
                className=" review__content"
                style={{
                  width: "100%",
                }}
              >
                <div className=" review__author">{review.Name}</div>
                <div className=" review__rating">
                  <Rating value={review.ProductReviewRating} />
                </div>
                <div className=" review__text">{review.ProductReviewComment}</div>
                <div className=" review__date" style={{ display: "flex", width: "100%", justifyContent: "space-between" }} >
                  {/* <div>{review.ProductReviewDuration}</div> */}
                  <div>{review.CreatedDate}</div>
                  <div className="comment-reply">
                    <a className="comment-btn" onClick={() => this.setState({ reply: true, replyid: review.ProductReviewID })} >
                      <i className="fas fa-reply" />{" "}
                      Reply
                    </a>
                  </div>
                </div>
                {
                  this.state.reply == true && review.ProductReviewID == this.state.replyid &&

                  <div className="pt-3">
                    <div className="pt-3">
                      <textarea className="form-control" placeholder="Tell us more about your comment on this review" id="review-reply-text" rows="6" onChange={({ target }) => { this.setState({ productReviewComment: target.value, productReviewRating: 0 }); }} required />
                    </div>
                    <div className="pt-3" style={{ textAlign: "center" }} onClick={() => this.onSubmitReviewReply()} >
                      <button className="btn btn-primary btn-lg">
                        Post Your Reply
                      </button>
                    </div>
                  </div>
                }

              </div>
            </div>
          </li >
        )
      );
    } else {
      var reviewsList = (
        <div
          className=" review__content"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          No Reviews Yet
        </div>
      );
    }

    return (
      <div className="reviews-view" id="reviews">
        <div className="reviews-view__list">
          <h3 className="reviews-view__header">Customer Reviews</h3>

          <div className="reviews-list">
            <ol className="reviews-list__content">{reviewsList}</ol>
            <div className="reviews-list__pagination">
              <Pagination
                current={1}
                siblings={3}
                total={
                  this.props.product.ProductReview != null
                    ? parseInt(JSON.parse(this.props.product.ProductReview).length / 3)
                    : 1
                }
              />
            </div>
          </div>
        </div>
        <h3 className="reviews-view__header">Write A Review</h3>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block" }}>
            <Box component="fieldset" mb={3} borderColor="transparent" >
              <ReviewRating
                size="large"
                
                emptyIcon={<StarBorderIcon fontSize="large" />}
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
          <div className="form-group">
            <textarea className="form-control" placeholder="Tell us more about your review on this product" id="review-text" rows="6" onChange={({ target }) => { this.setState({ productReviewComment: target.value, }); }} required />
          </div>
          <div className="form-group mb-0">
            <button className="btn btn-primary btn-lg" onClick={() => this.onSubmitReview()} >
              Post Your Review
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default ProductTabReviews;
