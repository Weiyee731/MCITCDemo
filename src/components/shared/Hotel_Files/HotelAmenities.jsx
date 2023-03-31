// react
import React, {useEffect } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";


// application
import {Grid, Typography, Stack, Checkbox} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Check } from "@mui/icons-material";


function HotelAmenities(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const Amenities_List = 
    [
        {
            AmenitiesID:1,
            AmenitiesName:"Free Wifi",
        },
        {
            AmenitiesID:2,
            AmenitiesName:"Front Desk [24 Hours]",
        },
        {
            AmenitiesID:3,
            AmenitiesName:"Luggage Storage",
        },
        {
            AmenitiesID:4,
            AmenitiesName:"Restaurant",
        },
        {
            AmenitiesID:5,
            AmenitiesName:"Laundry Service",
        },
        {
            AmenitiesID:6,
            AmenitiesName:"Room Service",
        },
        {
            AmenitiesID:7,
            AmenitiesName:"Safety Deposit Boxes",
        },
      
    ]
   
    useEffect(() => {
    }, [props.addwishlist]);


   
    return (

      <Grid item container spacing={1} elevation={2} >
        <Grid item xs={12} sm={12} style={{marginLeft:'3%', marginRight:'3%'}}>
            <Typography variant="caption" style={{fontWeight:'bold'}}>Amenities</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{marginLeft:'3%', marginRight:'3%'}} >
            <Grid item container spacing={0} style={{backgroundColor:'white', padding:'2%', marginTop:'auto'}}>
                <Grid item xs={12} sm={12}></Grid>
            {Amenities_List.map((a)=>(
                <Grid item xs={6} sm={4}>
                    <Stack direction='row' spacing={1}>
                        <Check sx={{color:"#ffa31a"}}/> 
                        <Typography variant="subtitle2">{a.AmenitiesName}</Typography>
                    </Stack>
                </Grid>
            ))}
            </Grid>
        </Grid>
      </Grid>
      
    );
  
  
  }
  
  HotelAmenities.propTypes = {
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf([
      "grid-sm",
      "grid-nl",
      "grid-lg",
      "list",
      "horizontal",
    ]),
  };
  
  
  const mapStateToProps = (state) => ({
 
   
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelAmenities);