// react
import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";


// application
import {Grid, Typography, Stack, Checkbox, Button, IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import _ from "lodash";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HotelModal(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const RoomImages = [
        {ImageID:0, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37434884.jpg'},
        {ImageID:1, ImageURL:'https://www.timing-design.com/food/ranee1.jpg'},
        {ImageID:2, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg'},
        {ImageID:3, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg'},
      ];

    const Facilities =[
        {
          AmenityID:0,
          AmenityName:'Bath/ Shower',
        },
        {
          AmenityID:1,
          AmenityName: 'Hairdryer',
        },
        {
          AmenityID:2,
          AmenityName:'Fan',
        },
        {
          AmenityID:3,
          AmenityName:'Towel',
        },
        {
          AmenityID:4,
          AmenityName:'Refrigerator',
        },
      ];

    const [showImage, setShowImage] = useState(RoomImages[0].ImageURL)

    const change_ShowImage = (img) => {

    }
    
    
    const Videos = ['']

    return (

      <Grid item container style={{ margin:'auto'}} elevation={2} spacing={2}>
        <Grid item xs={12} sm={8} >
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Grid item container spacing={0} style={{display:'flex', flexDirection:'row', alignItems:'center', backgroundImage:`url(${showImage})`, height:'400px', width:'100%', backgroundSize:'cover'}}>
                        <Grid item xs={6} sm={6} sx={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                        <IconButton sx={{position:'relative', zIndex:99, marginTop:'auto', marginBottom:'auto', backgroundColor:'rgb(242, 242, 242,0.7)', marginLeft:'2%'}}>
                            <ChevronLeftIcon fontSize="small"/>
                        </IconButton>
                        </Grid>
                      
                        <Grid item xs={6} sm={6} sx={{display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
                         <IconButton sx={{position:'relative', zIndex:99, marginTop:'auto', marginBottom:'auto', backgroundColor:'rgb(242, 242, 242,0.7)', marginRight:'2%'}}>
                            <ChevronRightIcon fontSize="small"/>
                        </IconButton>
                        </Grid>
                    </Grid>
                
                </Grid>
                <Grid item xs={12} sm={12}>
                <Grid item container spacing={1}>
                        {RoomImages.map((fac)=>(
                            <Grid item xs={3} sm={3} onClick={() => setShowImage(fac.ImageURL)}>
                                <img src={fac.ImageURL} alt="" style={{width:'100%', height:"100%"}}/>
                            </Grid>
                    ))}
                </Grid>
        </Grid>
            </Grid>
            
        </Grid>
    
        
        <Grid item xs={12} sm={4} >
            <Typography variant="h5">Standard Suite</Typography>
            <Grid item container spacing={2} style={{marginTop:'2%'}}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Facilities</Typography>
                    <Grid item container>
                    {Facilities.map((fac)=>(
                        <Grid item xs={4} sm={4}>
                            <Stack direction="row" spacing={1} style={{marginTop:'2%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <CheckIcon fontSize="small"/>
                                <Typography variant="body2">{fac.AmenityName}</Typography>
                            </Stack>
                        </Grid>
                ))}
                  </Grid> 
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Capacity</Typography>
                  
                  <Stack direction="row" spacing={2} style={{alignItems:'center'}}>
                  <Typography>Queen Bed</Typography>
                  
                  <Stack direction="row" spacing={2} style={{alignItems:'center'}}>
                    {_.times(2, (i) => (
                            <PersonIcon key={i} style={{color:"#ffa31a"}} fontSize="small"/>
                          ))}
                    </Stack>
                   
                  </Stack>
                 
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Meals</Typography>
                    <Stack direction="row" spacing={1}>
                        <CloseIcon fontSize="small" style={{color:'red'}}/>
                        <Typography variant="body2" style={{marginTop:'1px'}}>No breakfast added</Typography>
                    </Stack>
                   
                    <Stack direction="row" spacing={2} style={{alignItems:'center', marginTop:'2%'}}>
                        <Button variant="contained" color="primary" size="small">Add breakfast</Button>
                        <Typography variant="subtitle1" style={{marginTop:'auto', marginBottom:'auto'}}>RM 15.90</Typography>
                    </Stack>
                </Grid>
                
                <Grid item xs={12} sm={12} >
                    <Typography variant="h6">Rates</Typography>
                    <Typography variant="caption">
                        Starts from
                    </Typography>
                    <Stack direction='row' spacing={1} style={{padding:'3%', borderRadius:'2%', backgroundColor:'rgb(255, 153, 0, 0.5)', alignItems:'center', justifyContent:'center'}}>
                        <Typography variant="h6">RM</Typography>
                        <Typography variant="h4">380</Typography>
                        <Typography variant="caption">
                        per night
                        </Typography>
                    </Stack>
                   
                </Grid>
                <Grid item xs={12} sm={12} style={{marginTop:'4%'}}>
                   <Button variant="contained" color="success" fullWidth>Book Now</Button>
                   
                </Grid>
            </Grid>
        </Grid>
      
      </Grid>
     
    );
  
  
  }
  
  HotelModal.propTypes = {
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelModal);