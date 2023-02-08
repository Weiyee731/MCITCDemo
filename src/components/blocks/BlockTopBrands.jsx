// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";


// application
import BlockHeader from "../shared/BlockHeader";
import tester from "../../assets/user.jpg";
import NFK from "../../assets/NFK.png";
import PNL from "../../assets/PNL_Tec.png";
import ThreeM from "../../assets/3M.png";
import Mostaz from "../../assets/Mostaz.png";
import { Card } from "@mui/material";

function mapStateToProps(state) {
  return {
    productCategories: state.counterReducer["productCategories"], // with sub hierarchy item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategoryListing: () =>
      dispatch(GitAction.CallAllProductCategoryListing()),
  };
}

const Initiate_State = {
  productCategories: [
    { ProductCategoryID: 1, width:"45%", ProductCategory: "NFK", ProductCategoryImage: NFK },
    { ProductCategoryID: 2, width:"70%", ProductCategory: "Blimax", ProductCategoryImage: "https://www.blimax.com.my/wp-content/uploads/2018/08/blimax-website-logo-regiular.png" },
    { ProductCategoryID: 3, width:"70%", ProductCategory: "Daewoo", ProductCategoryImage: "https://static.wixstatic.com/media/aa6e3e_9e82d6e5338e40069d0df4a4984b4d1a~mv2.jpg/v1/fill/w_438,h_100,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/619783627.jpg" },
    { ProductCategoryID: 4, width:"60%", ProductCategory: "PNL-Tec", ProductCategoryImage: PNL },
    { ProductCategoryID: 5, width:"45%", ProductCategory: "Mostaz", ProductCategoryImage: Mostaz },
    // { ProductCategoryID: 5, width:"60%", ProductCategory: "Mostaz", ProductCategoryImage: "https://www.skhardware.com.my/image/skhardware/image/data/Brands/Brands%202.0%20Sitegiant-13.png" },
    { ProductCategoryID: 6, width:"30%", ProductCategory: "3M", ProductCategoryImage: ThreeM },
    // {ProductCategoryID: 7, ProductCategory: "Facial Skin Care", ProductCategoryImage: "https://thumbs.dreamstime.com/b/natural-herbal-skin-care-products-aloe-vera-products-top-view-natural-herbal-skin-care-products-aloe-vera-products-top-view-facial-201476472.jpg"}, 
    // {ProductCategoryID: 8, ProductCategory: "LifeStyle", ProductCategoryImage: "https://www.highwycombepharmacy.com.au/assets/blog/_680x460_crop_center-center_75_none/What-is-Diabetes-and-4-Steps-to-Avoid-It.jpg?v=1626242407"}, 
  ]
}
class BlockTopBrands extends Component {
  constructor(props) {
    super(props)
    this.state = Initiate_State;
  }

  componentDidMount() {
    // this.props.CallAllProductCategoryListing();
  }
  render() {
    /**
     * Styles
     */
    const categoryStyle = {
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: 'center',
      padding: "5px",
      alignItems: "center",
      flexDirection: "row",
    }

    const categoryGrid = {
      paddingTop: "10px",
      textAlign: "center",
      cursor: "pointer",
      width: "100%",
      marginBottom: "10px"
    }

    const divStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }


    return (
      <div className="container mb-5">
        <BlockHeader
          title="Top Brands"
        // showAll={"shop/AllProductCategory"}
        // groups={groups}
        // arrows
        // onNext={this.handleNextClick}
        // onPrev={this.handlePrevClick}
        // onGroupClick={onGroupClick}
        />
        {/* <h3 className="block-header__title mb-3">Categories</h3> */}
        {/* <div style={categoryStyle} className="row mb-4"> */}

        <Card elevation={2} style={categoryStyle}>
          {this.state.productCategories.map((data, index) => {
            // {this.state.categoriesDummy.map((data, index) => {
            return (
              // <div key={index} style={categoryGrid} className="col-2 col-xs-2 p-3"
              // className="col-2p-3"
              <div className="col-2" style={divStyle} key={index}>
                <div style={categoryGrid} >
                  <div>
                    {/* <Link to={url.productByCategory(data)}> <img src={data.ProductCategoryImage} alt={data.ProductCategory} width="50%" height="50%" /></Link> */}
                    <Link to={'/'}> <img src={data.ProductCategoryImage} alt={data.ProductCategory} style={{width: data.width}} /></Link>
                    {/* <label style={{ fontSize: "13px" }}>{data.ProductCategory}</label> */}
                  </div>
                </div>
                <div><label style={{ fontSize: "13px" }}>{data.ProductCategory}</label></div>
              </div>
            )
          })}
        </Card>
      </div>
    );
  }
}

BlockTopBrands.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

BlockTopBrands.defaultProps = {
  categories: [],
  layout: "classic",
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTopBrands);