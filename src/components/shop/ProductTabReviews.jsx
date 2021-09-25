// react
import React, { Component } from "react";

// application
import Pagination from "../shared/Pagination";
import Rating from "../shared/Rating";
import Box from "@material-ui/core/Box";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import USER from "../../assets/user.jpg";
import ReactPaginate from 'react-paginate';
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// data stubs
import reviews from "../../data/shopProductReviews";
import ReviewRating from "@material-ui/lab/Rating";
import LoadingPanel from "../shared/loadingPanel";

function mapStateToProps(state) {
  return {
    reviews: state.counterReducer["reviews"],
    loading: state.counterReducer["loading"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddProductReview: (PropsData) => dispatch(GitAction.CallAddProductReview(PropsData)),
    CallProductReviewByProductID: (PropsData) => dispatch(GitAction.CallProductReviewByProductID(PropsData)),
  };
}

// const [currentPage, setCurrentPage] = useState(0);
// const [data, setData] = useState([]);

// const PER_PAGE = 10;
// const offset = currentPage * PER_PAGE;
// const currentPageData = data
//   .slice(offset, offset + PER_PAGE)
//   .map(({ thumburl }) => <img src={thumburl} />);
// const pageCount = Math.ceil(data.length / PER_PAGE);

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
      rowsPerPage: 5,
      edited: false,
    }
    console.log(this.props.product)
    this.props.CallProductReviewByProductID({ ProductID: this.props.product.ProductID, ParentProductReviewID: 0 })
    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSubmitReviewReply = this.onSubmitReviewReply.bind(this);
  }


  onSubmitReviewReply() {
    this.props.CallAddProductReview({
      parentProductReviewID: this.state.replyid,
      productID: this.props.product.ProductID,
      UserID: "1",
      productReviewRating: "0",
      productReviewComment: this.state.productReplyReviewComment
    })

    this.setState({ reply: false })
  }

  onSubmitReview() {
    this.props.CallAddProductReview({
      parentProductReviewID: this.state.parentProductReviewID,
      productID: this.props.product.ProductID,
      UserID: "1",
      productReviewRating: this.state.productReviewRating,
      productReviewComment: this.state.productReviewComment
    })

    this.setState({ productReviewComment: "", productReviewRating: 0 })
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  render() {
    const { page } = this.state;
    if (this.props.reviews != null) {
      var reviewsList = (this.props.reviews)
        .slice((page - 1) * this.state.rowsPerPage, (page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
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
                  <div id="review_author" className=" review__author">{review.Name}</div>
                  <div id="review_rating" className=" review__rating">
                    <Rating value={review.ProductReviewRating} />
                  </div>
                  <div id="review_text" className=" review__text">{review.ProductReviewComment}</div>
                  <div id="review_daterow" className=" review__date" style={{ display: "flex", width: "100%", justifyContent: "space-between" }} >
                    {/* <div>{review.ProductReviewDuration}</div> */}
                    <div id="review_dat">{review.CreatedDate}</div>
                    <div id="comment" className="comment-reply">
                      <a className="comment-btn" onClick={() => this.setState({ reply: true, replyid: review.ProductReviewID })} >
                        <i className="fas fa-reply" />{" "}
                        Reply
                      </a>
                    </div>
                  </div>
                  {
                    review.ProductReviewDetail != null ?
                      JSON.parse(review.ProductReviewDetail).map(
                        (reviewReply, index) => (
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
                              <div id="review_reply_author" className=" review__author">{reviewReply.Name}</div>
                              <div id="review_reply_text" className=" review__text">{reviewReply.ProductReviewComment}</div>
                              <div id="review_reply_date" className=" review__date" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                <div>{reviewReply.CreatedDate}</div>
                              </div>
                            </div>
                          </div>
                        )) : ""
                  }
                  {
                    this.state.reply == true && review.ProductReviewID == this.state.replyid &&

                    <div id="reply_content" className="pt-3">
                      <div id="reply_msg" className="pt-3">
                        <textarea className="form-control" placeholder="Tell us more about your comment on this review" id="review-reply-text" rows="6" value={this.state.productReplyReviewComment} onChange={({ target }) => { this.setState({ productReplyReviewComment: target.value, productReviewRating: 0 }); }} required />
                      </div>
                      <div id="reply_btn" className="pt-3" style={{ textAlign: "center" }} onClick={() => this.onSubmitReviewReply()} >
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
      this.props.loading === true ?
        <div div className="reviews-view" id="reviews" >
          <div className="reviews-view__list">
            <h3 className="reviews-view__header">Customer Reviews</h3>
            <div className="reviews-list">
              <ol className="reviews-list__content">{reviewsList}</ol>
              <div className="reviews-list__pagination">

                {console.log("this.props.product", this.props.product)}
                <Pagination
                  current={page}
                  total={
                    this.props.product.ProductReview != null
                      ?  Math.ceil(parseInt(JSON.parse(this.props.product.ProductReview).length)/this.state.rowsPerPage)
                      : 1
                  }
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
          <h3 className="reviews-view__header">Write A Review</h3>
          <div style={{ textAlign: "center" }} id="writeReviews">
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
              <textarea className="form-control" placeholder="Tell us more about your review on this product" id="review-text" rows="6" value={this.state.productReviewComment} onChange={({ target }) => { this.setState({ productReviewComment: target.value, }); }} required />
            </div>
            <div className="form-group mb-0">
              <button className="btn btn-primary btn-lg" onClick={() => this.onSubmitReview()} >
                Post Your Review
              </button>
            </div>
          </div>
        </div > : <LoadingPanel></LoadingPanel>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTabReviews);
