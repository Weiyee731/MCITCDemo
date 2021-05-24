import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import MaterialTable from "material-table";
import Rating from "@material-ui/lab/Rating";
import Logo from "../../assets/myshops.png";
import SearchBox from "../../components/SearchBox/SearchBox";

function mapStateToProps(state) {
  return {
    reviews: state.counterReducer["reviews"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallProductReview: (propsData) =>
      dispatch(GitAction.CallProductReview(propsData)),
  };
}

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

class ViewReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallProductReview({
      UserID: window.localStorage.getItem("id"),
    });
    this.state = {
      ProductID: 0,
      ParentProductReviewID: 0,
      reviews: [],
      ProductReviewDetail: [],
      searchFilter: "",
    };
  }

  render() {
    this.state.reviews = this.props.reviews;

    this.state.reviews.map((d, i) => {
      const Picture = d.ProductMediaUrl;
      d.ProductMediaUrl = (
        <div>
          <img height={50} src={Picture} />
        </div>
      );

      const RatingReview = d.ProductAverageRating;
      d.ProductAverageRating = (
        <div>
          <Rating
            name="productAverageReviewRating"
            value={RatingReview}
            precision={0.5}
            readOnly
          />
        </div>
      );
    });

    this.state.ProductReviewDetail = this.state.reviews;
    const ReviewData = this.state.reviews;
    const filteredProduct = [];

    const commentPanel = {
      padding: "2%",
    };

    const commentDetail = {
      overflow: "hidden",
    };

    const userProfilePic = {
      float: "left",
      width: "50px",
      height: "50px",
      marginRight: "20px",
      borderRadius: "25px",
    };

    const duration = {
      fontWeight: "normal",
      color: "grey",
      fontSize: "13px",
      float: "right",
    };

    const divStyle = {
      width: "100%",
      margin: "auto",
      marginTop: "15px",
    };

    return (
      <div className="App" style={{ margin: "2%" }}>
        <h1>Customer Reviews</h1>
        <SearchBox
          style={divStyle}
          placeholder="Search..."
          onChange={(e) => this.setState({ searchFilter: e.target.value })}
        />
        {ReviewData.filter((searchedItem) =>
          searchedItem.ProductName.toLowerCase().includes(
            this.state.searchFilter
          )
        ).map((filteredItem) => {
          filteredProduct.push(filteredItem);
        })}
        {filteredProduct.length > 0 ? (
          <MaterialTable
            style={divStyle}
            title="Reviews"
            columns={[
              {
                title: "Product Image",
                field: "ProductMediaUrl",
              },
              {
                title: "Product Name",
                field: "ProductName",
              },
              {
                title: "Product Average Rating",
                field: "ProductAverageRating",
              },
            ]}
            data={filteredProduct}
            options={{
              paging: true,
              search: false,
            }}
            detailPanel={(rowData) => {
              const row = JSON.parse(rowData.ProductReviewDetail);
              return row.map((row) => (
                <div style={commentPanel}>
                  <img
                    style={userProfilePic}
                    src={row.Picture}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Logo;
                    }}
                  ></img>
                  <div style={commentDetail}>
                    <p style={{ fontWeight: "bold" }}>
                      {row.Name}
                      <span style={duration}>{row.ProductReviewDuration}</span>
                    </p>
                    <p>
                      <Rating
                        name="productReviewRating"
                        value={row.ProductReviewRating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </p>
                    <p>{row.ProductReviewComment}</p>
                    <p style={{ color: "grey" }}>{row.CreatedDate}</p>
                    <div
                      style={{
                        border: "1px solid lightgrey",
                      }}
                    />
                  </div>
                </div>
              ));
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReviewComponent);
