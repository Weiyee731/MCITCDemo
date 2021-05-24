// react
import React from "react";

// application
import Pagination from "../shared/Pagination";
import Rating from "../shared/Rating";

// data stubs
import reviews from "../../data/shopProductReviews";

function ProductTabReviews(props) {
  if (props.product.ProductReview != null) {
    var reviewsList = JSON.parse(props.product.ProductReview).map(
      (review, index) => (
        <li key={index} className="reviews-list__item">
          <div className="review">
            <div className="review__avatar">
              <img src={review.avatar} alt="" />
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
              <div
                className=" review__date"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>{review.ProductReviewDuration}</div>
                <div>{review.CreatedDate}</div>
              </div>
            </div>
          </div>
        </li>
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
                props.product.ProductReview != null
                  ? parseInt(JSON.parse(props.product.ProductReview).length / 3)
                  : 1
              }
            />
          </div>
        </div>
      </div>

      <form className="reviews-view__form" id="writeReviews">
        <h3 className="reviews-view__header">Write A Review</h3>
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="review-stars">Review Stars</label>
                <select id="review-stars" className="form-control">
                  <option>5 Stars Rating</option>
                  <option>4 Stars Rating</option>
                  <option>3 Stars Rating</option>
                  <option>2 Stars Rating</option>
                  <option>1 Stars Rating</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="review-author">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="review-author"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="review-email">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="review-email"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="review-text">Your Review</label>
              <textarea className="form-control" id="review-text" rows="6" />
            </div>
            <div className="form-group mb-0">
              <button type="submit" className="btn btn-primary btn-lg">
                Post Your Review
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductTabReviews;
