// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";
import  Typography from "@mui/material/Typography";


// application
import BlockHeader from "../shared/BlockHeader";
import tester from "../../assets/user.jpg";

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

// const Initiate_State = {
//   categoriesDummy : [
//     {ProductCategoryID: 1, ProductCategory: "Against Covid-19", ProductCategoryImage: "https://assets.technologynetworks.com/production/dynamic/images/content/338991/covid-19-drug-discovery-and-development-why-diverse-strategies-are-critical-338991-1280x720.jpg?cb=11420260"}, 
//     {ProductCategoryID: 2, ProductCategory: "Health Supplement", ProductCategoryImage: "https://www.nutraingredients-asia.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients-asia.com/news/regulation-policy/new-year-new-hope-natural-products-bill-could-follow-nz-s-revamped-therapeutic-products-legislation/8993841-1-eng-GB/New-year-new-hope-Natural-products-bill-could-follow-NZ-s-revamped-therapeutic-products-legislation.jpg"}, 
//     {ProductCategoryID: 3, ProductCategory: "Medical Supplies", ProductCategoryImage: "https://www.conveyco.com/wp-content/uploads/2016/03/Pharma-and-Medical-2.jpg"}, 
//     {ProductCategoryID: 4, ProductCategory: "Support & Rehabilitation", ProductCategoryImage: "https://rehabadviser.com/wp-content/uploads/2021/04/how-to-stop-drug-addiction-without-rehab-Is-it-safe.jpg"}, 
//     {ProductCategoryID: 5, ProductCategory: "Mom & Baby", ProductCategoryImage: "https://www.statnews.com/wp-content/uploads/2016/08/AP_5189498004.jpg"}, 
//     {ProductCategoryID: 6, ProductCategory: "Personal Care", ProductCategoryImage: "https://media.istockphoto.com/photos/toothbrush-white-tube-of-toothpaste-dental-floss-and-towel-on-pastel-picture-id1133876634?k=20&m=1133876634&s=612x612&w=0&h=Eoq7Y4WLiNARED3QGWzMi0lr61jB7rgEtF8w2jfTfcs="}, 
//     {ProductCategoryID: 7, ProductCategory: "Facial Skin Care", ProductCategoryImage: "https://thumbs.dreamstime.com/b/natural-herbal-skin-care-products-aloe-vera-products-top-view-natural-herbal-skin-care-products-aloe-vera-products-top-view-facial-201476472.jpg"}, 
//     {ProductCategoryID: 8, ProductCategory: "LifeStyle", ProductCategoryImage: "https://www.highwycombepharmacy.com.au/assets/blog/_680x460_crop_center-center_75_none/What-is-Diabetes-and-4-Steps-to-Avoid-It.jpg?v=1626242407"}, 
//   ]
// }
class BlockMainCategories extends Component {
  constructor(props) {
    super(props)
    // this.state = Initiate_State;
  }

  componentDidMount() {
    this.props.CallAllProductCategoryListing();
  }
  render() {
    /**
     * Styles
     */
    const categoryStyle = {
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: 'center',
      padding: "5px"
    }

    const categoryGrid = {
      paddingTop: "10px",
      textAlign: "center",
      cursor: "pointer",
      width: '80%',
      overflow:'auto',
    }


    return (
      <div className="container mb-5" >
        <BlockHeader
          title="Categories"
          showAll={"shop/AllProductCategory"}
        // groups={groups}
        // arrows
        // onNext={this.handleNextClick}
        // onPrev={this.handlePrevClick}
        // onGroupClick={onGroupClick}
        />
        {/* <h3 className="block-header__title mb-3">Categories</h3> */}
        {/* <div style={categoryStyle} className="row mb-4"> */}

      
        <div style={{display:'flex', flexDirection:'row', width:'99%', overflow:'auto', justifyContent:'center', alignItems:'center'}} >
        {this.props.productCategories.map((data, index) => (
              <div key={index}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Link to={url.productByCategory(data)} > 
                  <img src={data.ProductCategoryImage} 
                  alt={data.ProductCategory} 
                  width="80px" 
                  height="80px" 
                  onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://icons.veryicon.com/png/o/miscellaneous/fu-jia-intranet/product-29.png";
                  }}
                  />
                  </Link>

                  <br />
                  <Typography variant="caption" style={{textAlign:'center'}}>{data.ProductCategory}</Typography>
                </div>
              </div>
          ))}
        </div>
        
      </div>
    );
  }
}

BlockMainCategories.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

BlockMainCategories.defaultProps = {
  categories: [],
  layout: "classic",
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockMainCategories);