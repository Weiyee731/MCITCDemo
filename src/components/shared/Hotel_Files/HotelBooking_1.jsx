// react
import React, {useEffect } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";

// application
import {Grid, Typography, Stack, Divider, Checkbox, FormControlLabel, TextField, Autocomplete, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


function HotelBooking_1(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const steps = [
        'Accomodaton Selection',
        'Your Info',
        'Final Step',
      ];
      

    const dummyHotelRoom_data = [
        { RoomID:0,
          RoomName: 'Standard Suite',
          Price:280.00,
          HotelID:0,
          Bed:[{BedCategoryID:0, BedCat_Name:"Queen Bed"}],
          RoomImages:[
            {ImageID:0, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37434884.jpg'},
            {ImageID:1, ImageURL:'https://www.timing-design.com/food/ranee1.jpg'},
            {ImageID:2, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg'},
            {ImageID:3, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg'},
          ],
          FreeCancellation_Stat: true,
          Advance_Pay: true,
          Breakfast_Included: false,
          AvailableRoom_Qty: 2,
          Facilities:[
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
        ],
        Capacity:2,
        },
         
        { RoomID:1,
            RoomName: 'Deluxe Junior Suite',
            Price: 380.00,
            HotelID:2,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
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
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          },
  
          { RoomID:1,
            RoomName: 'Executive King Suite',
            Price: 380.00,
            HotelID:4,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
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
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          },
  
  
        { RoomID:1,
          RoomName: 'Deluxe King Suite',
          Price: 380.00,
          HotelID:1,
          Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
          RoomImages:[
            {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
            {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
            {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
            {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
          ],
          FreeCancellation_Stat: true,
          Advance_Pay: true,
          Breakfast_Included: false,
          AvailableRoom_Qty: 2,
          Facilities:[
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
            {
              AmenityID:5,
              AmenityName:'Wardrobe',
            },
            {
              AmenityID:6,
              AmenityName:'Bathtub',
            },
            {
              AmenityID:7,
              AmenityName:'Coffee Maker',
            },
          ],
        Capacity:2,
        },
         
        { RoomID:1,
            RoomName: 'Deluxe Queen Suite',
            Price: 380.00,
            HotelID:3,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
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
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          }
      ]
  
    return (

      <Grid item container style={{backgroundColor:"white", padding:'4%'}} elevation={2}>
        <Grid item xs={12} sm={12} style={{paddingLeft:'8%', paddingRight:'4%'}}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Grid>
   
        <Grid item xs={12} sm={12} style={{margin:'2%', paddingLeft:'8%', paddingRight:'4%'}}>
                <Grid item container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Grid item container spacing={1} style={{padding:"5%", border:'1px solid #E6E3DD', borderRadius:'2%'}}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h7" >Your booking summary</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                                    <div>
                                        <Typography variant="body2">Check In</Typography>
                                        <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Wednesday, 19 April 2023</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2">Check Out</Typography>
                                        <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Thursday, 20 April 2023</Typography>
                                    </div>
                                </Stack>
                                </Grid>
                           
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="body2">Stay Duration</Typography>
                                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>1 Night</Typography>
                                </Grid>
                               
                               <Grid item xs={12} sm={12}>
                                    <Typography variant="body2">You selected</Typography>
                                    <Typography variant="subtitle1" style={{fontWeight:"bold", marginBottom:"4%"}}>Deluxe King Room</Typography>
                                    <Link style={{textDecoration:"underline", color: 'blue'}}>Change Room</Link>
                               </Grid>

                               <Grid item xs={12} sm={12}>
                                    <Typography variant="h7" >Purchase Summary</Typography>
                                    <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                        <Typography>Deluxe King Room</Typography>
                                        <Typography variant="h6" style={{fontWeight:'bold'}}>MYR 380.00</Typography>
                                    </Stack>
                                    <Typography variant="subtitle2" style={{marginTop:"2%"}}>
                                    A tourism tax of RM 10 per room per night applies to all foreign guests. This tax isn't included in the room rate and must be paid upon check-in. Guests who are Malaysian nationals or permanent residents of Malaysia (hold a MyPR card) are exempted.
                                    </Typography>

                                    <Typography variant="body2" style={{marginTop:"3%"}}>Excluded charges</Typography>
                                    <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                        <Typography>VAT</Typography>
                                        <Typography variant="subtitle1" style={{fontWeight:'bold'}}>MYR 8.86</Typography>
                                    </Stack>

                               </Grid>

                               <Grid item xs={12} sm={12} style={{border:'1px solid #E6E3DD', padding:'2%'}}>
                                    <Typography variant="h7">How much it cost to cancel?</Typography>
                                    <Typography style={{color:'green'}}>Free cancellation until 23:59 on 18 Apr</Typography>
                                    <Stack direction="row" style={{display:"flex", flexDirection:'row', justifyContent:"space-between"}}>
                                        <Typography >From 00:00 on 18 Apr </Typography>
                                        <Typography >MYR 153</Typography>
                                    </Stack>
                                    
                               </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid item container spacing={1} style={{padding:"5%", border:'1px solid #E6E3DD', borderRadius:'9px'}}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h7" >Details</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
        </Grid>
        
        </Grid>
      
    );
  
  
  }
  
  HotelBooking_1.propTypes = {
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelBooking_1);