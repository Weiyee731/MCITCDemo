// react
import React, {useEffect } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";


// application
import {Grid, Typography, Stack, Checkbox, Button} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Check } from "@mui/icons-material";


function HotelRooms(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    
    useEffect(() => {
    }, [props.addwishlist]);

   
    return (

   
      <Grid item container spacing={2} style={{ marginLeft:'3%', marginRight:'3%'}} elevation={2}>
        <Grid item xs={12} sm={12}>
            <Typography variant="caption" style={{fontWeight:'bold'}}>Select Your Room</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{backgroundColor:'white', padding:"2%", margin:'1.5%'}}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={10}>

                <Grid item container spacing={1}>
                  <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1">Room Type</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Capacity</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Price</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1">Your choices</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Qty</Typography>
                    </Grid>
                </Grid>
             
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" color="primary">Reserve</Button>
              </Grid>

               
            </Grid>
        </Grid>
       
      </Grid>
     
      
    );
  
  
  }
  
  HotelRooms.propTypes = {
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelRooms);