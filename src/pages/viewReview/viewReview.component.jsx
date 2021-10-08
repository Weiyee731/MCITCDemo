import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import MaterialTable from "material-table";
import Rating from "@material-ui/lab/Rating";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';


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



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class ViewReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductID: 0,
      ParentProductReviewID: 0,
      reviews: [],
      ProductReviewDetail: [],
      searchFilter: "",
      displayDialogOpen: false,
      selectedProduct: {},
      selectedProductReviews: [],
      selectedComment: "",

    };

    this.handleDisplayAllComments = this.handleDisplayAllComments.bind(this)
  }

  componentDidMount() {
    this.props.CallProductReview({
      UserID: window.localStorage.getItem("id"),
    });
    // if (this.props.reviews && this.props.reviews !== undefined) {
    //   this.setState({ reviews: this.props.reviews })
    // }
  }

  handleDisplayAllComments = (value) => {
    this.setState({
      displayDialogOpen: value,
    })
  }


  render() {

    // this.state.reviews = this.props.reviews;

    this.state.reviews.map((d, i) => {
      const Picture = d.ProductMediaUrl;
      d.ProductMediaUrl = (
        <div key={i}>
          <img height={50} src={Picture} alt={d.Name} />
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

    // const commentDetail = {
    //   overflow: "hidden",
    // };

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

    ReviewData.filter((searchedItem) => typeof searchedItem !== 'undefined' && searchedItem.ProductName.toLowerCase().includes(this.state.searchFilter))
      .map((filteredItem) => { filteredProduct.push(filteredItem); })

    return (
      <div className="App" style={{ padding: "50px 50px 0px" }}>
        <h1>Customer Reviews</h1>

        {/* <div>
          <ReviewDetails></ReviewDetails>
        </div> */}

        <SearchBox style={divStyle} placeholder="Search..." onChange={(e) => this.setState({ searchFilter: e.target.value })} />

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
          onRowClick={(e, item) => {
            const row = JSON.parse(item.ProductReviewDetail);
            this.setState({ selectedProduct: item, selectedProductReviews: row, selectedComment: "", })
            this.handleDisplayAllComments(true)
          }}

          data={filteredProduct.length > 0 ? filteredProduct : []}
          options={{
            paging: true,
            search: false,
          }}
        // detailPanel={(rowData) => {
        //   const row = JSON.parse(rowData.ProductReviewDetail);
        //   return row.map((row) => (
        //     <div key={row.ProductID} style={commentPanel} onClick={(e) => console.log(e)}>
        //       <img
        //         style={userProfilePic}
        //         src={row.Picture}
        //         alt={row.name}
        //         onError={(e) => {
        //           e.target.onerror = null;
        //           e.target.src = Logo;
        //         }}
        //       >
        //       </img>
        //       <div style={commentDetail}>
        //         <p style={{ fontWeight: "bold" }}>
        //           {row.Name}
        //           <span style={duration}>{row.ProductReviewDuration}</span>
        //         </p>
        //         <p>
        //           <Rating
        //             name="productReviewRating"
        //             value={row.ProductReviewRating}
        //             precision={0.5}
        //             readOnly
        //             size="small"
        //           />
        //         </p>
        //         <p>{row.ProductReviewComment}</p>
        //         <p style={{ color: "grey" }}>{row.CreatedDate}</p>
        //         <div style={{ border: "1px solid lightgrey", }}> </div>
        //       </div>
        //     </div>
        //   ));
        // }}
        />

        <Dialog fullScreen open={this.state.displayDialogOpen} onClose={e => this.handleDisplayAllComments(false)} TransitionComponent={Transition} >
          <AppBar style={{ position: 'sticky', top: 0, backgroundColor: "#2b2b2b" }}>
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" onClick={e => this.handleDisplayAllComments(false)} aria-label="close">
                <CloseIcon />
              </IconButton> */}
              <Typography variant="h6" style={{ marginLeft: 2, flex: 1, }}>
                {
                  this.state.selectedProduct !== {}
                    ? this.state.selectedProduct.ProductName + "  [" + this.state.selectedProductReviews.length + " Comments]"
                    : " - "}
              </Typography>
              <IconButton color="inherit" onClick={e => this.handleDisplayAllComments(false)}> <CloseIcon /></IconButton>
            </Toolbar>
          </AppBar>
          <List style={{ height: '100vh', overflowY: 'auto' }}>
            {
              this.state.selectedProductReviews.length > 0 ?
                this.state.selectedProductReviews.map((el, idx) => {
                  return (
                    <ListItem key={idx} button style={{ borderBottom: '1px solid rgba(33, 33, 33, 0.3)' }} onClick={() => { this.setState({ selectedComment: el }) }}>
                      <div>
                        <div style={{ fontSize: '14pt' }}>
                          <b>{this.state.selectedComment.Name}</b> {"  "}
                          <Rating
                            name="productAverageReviewRating"
                            value={this.state.selectedComment.ProductReviewRating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <div style={{ fontSize: '9pt' }}>{el.ProductReviewDuration}</div>
                        <div style={{ fontSize: '11pt' }}>{el.ProductReviewComment}</div>
                      </div>
                    </ListItem>
                  )
                })
                :
                <ListItem button>
                  <ListItemText primary="<i>No comments</i>" />
                </ListItem>
            }
          </List>
          <div className="container-fluid" style={{ position: 'sticky', bottom: 0, zIndex: 100, backgroundColor: '#2b2b2b', }}>

            <div className="row" style={{ padding: '10px 2px' }}>
              {
                this.state.selectedComment !== "" &&
                <div className='col-12' style={{ marginBottom: '10px' }}>
                  <div style={{ backgroundColor: "#fff", color: 'black', borderRadius: '3px', width: '98%', margin: 'auto', padding: "10px 15px" }}>
                    <div className='clearfix'>
                      <div className="float-left" style={{ fontSize: '14pt' }}>
                        Reply To:
                      </div>
                      <div className='float-right'>
                        <IconButton color="#ffffff" style={{ marginLeft: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.95)' }} onClick={() => { this.setState({ selectedComment: '' }) }}> <CloseIcon /></IconButton>
                      </div>
                    </div>
                    <div style={{ fontSize: '14pt' }}>
                      <b>{this.state.selectedComment.Name}</b> {"  "}
                      <Rating
                        name="productAverageReviewRating"
                        value={this.state.selectedComment.ProductReviewRating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div style={{ fontSize: '9pt' }}>{this.state.selectedComment.ProductReviewDuration}</div>
                    <div style={{ fontSize: '11pt' }}>{this.state.selectedComment.ProductReviewComment}</div>
                  </div>
                </div>
              }
              <div className="col-11">
                <TextField
                  id="filled-textarea"
                  label="Multiline Placeholder"
                  placeholder="Placeholder"
                  multiline
                  variant="filled"
                  className="w-100"
                  style={{
                    background: '#fff',
                    borderRadius: '25px',
                    marginLeft: '15px',
                    padding: '6 px 8px'
                  }}
                />
              </div>
              <div className="col-1">
                <IconButton color="#ffffff" style={{ marginLeft: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.95)' }} onClick={e => { console.log('send message') }}> <SendIcon /></IconButton>
              </div>
            </div>
          </div>
        </Dialog>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewReviewComponent);
