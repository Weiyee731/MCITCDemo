// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";
import "./styles/BlockTopBrands.css";

// application
import tester from "../../assets/user.jpg";
import NFK from "../../assets/NFK.png";
import PNL from "../../assets/PNL_Tec.png";
import ThreeM from "../../assets/3M.png";
import Mostaz from "../../assets/Mostaz.png";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import PlaceIcon from '@mui/icons-material/Place';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


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
class HotelSearchForm extends Component {
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
      overflowX: 'auto', 
      width:'100%', 
      
    }

    const categoryGrid = {
      paddingTop: "10px",
      textAlign: "center",
      cursor: "pointer",
      width: "120px",
      marginBottom: "10px"
    }

    const divStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   
    }


    return (
        <Grid item container style={{ display:'flex', flexDirection:'row', justifyContent:'center'}} spacing={2} >
          <Grid item container xs={12} sm={8} spacing={2} style={{padding:'3%', backgroundColor:'white', margin:'3%'}}>
            <Grid item xs={12} sm={12}>
                <TextField id="outlined-basic" 
                    label="Destination or Property" 
                    variant="outlined" 
                    fullWidth
                    placeholder="Search destination or property"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PlaceIcon sx={{ color: "#288825" }}/>
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item container style={{display:'flex', flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}} spacing={2}>
            <Grid item xs={12} sm={4} >
                <TextField id="outlined-basic" 
                    label="Check In" 
                    variant="outlined" 
                    placeholder="Select check in date"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <DateRangeIcon sx={{ color: "#288825" }}/>
                        </InputAdornment>
                        ),
                    }}
                    />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField id="outlined-basic" 
                    label="Check Out" 
                    variant="outlined" 
                    placeholder="Select check out date"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <DateRangeIcon sx={{ color: "#288825" }}/>
                        </InputAdornment>
                        ),
                    }}
                    />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField id="outlined-basic"
                    label="Guest No" 
                    variant="outlined" 
                    fullWidth
                    placeholder="Min 1"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonOutlineIcon sx={{ color: "#288825" }}/>
                        </InputAdornment>
                        ),
                    }}
                    />
            </Grid>
            <Grid item xs={12} sm={2} >
                <Button variant="contained" fullWidth sx={{ backgroundColor: "#288825" }}> Search</Button>
            </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
  }
}

HotelSearchForm.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

HotelSearchForm.defaultProps = {
  categories: [],
  layout: "classic",
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchForm);