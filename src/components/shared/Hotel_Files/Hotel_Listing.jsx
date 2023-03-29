// react
import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";


// application
import {Grid, Typography, Stack, Checkbox, Button, IconButton,Card} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import _ from "lodash";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HotelFilter from "../../blocks/HotelFilter";
import Divider from '@mui/material/Divider';

function Hotel_Listing(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const dummyHotel_Data = [
        {
          HotelID: 0,
          HotelImage: 'https://media-cdn.tripadvisor.com/media/photo-s/12/a9/df/17/hilton-night-view-from.jpg',
          HotelName:'Hilton',
          StartPrice: 180.00,
          HotelRating: 4.0,
          HotelState: 'Kuching',
          ProductPromotion: null,
          ReviewCount: 145,
        
        },
        {
          HotelID: 1,
          HotelImage: 'https://pix10.agoda.net/hotelImages/44583/-1/8742bb65e5a6b3f370d3e94212bb8a76.jpg?ca=23&ce=0&s=1024x768',
          HotelName:'Grand Magherita',
          StartPrice: 185.00,
          HotelRating: 4.1,
          HotelState: 'Kota Samarahan',
          ProductPromotion: null,
          ReviewCount: 205,
        },
        {
          HotelID: 2,
          HotelImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/124344871.jpg?k=82daced0f7392440064c6ec25622e0d0154f02c62a2c885d96103c320273befe&o=&hp=1',
          HotelName:'Tune Hotel',
          StartPrice: 90.00,
          HotelRating: 3.9,
          HotelState: 'Kota Samarahan',
          ProductPromotion: null,
          ReviewCount: 125,
        }, 
        {
          HotelID: 3,
          HotelImage: 'https://borneo.com.au/wp-content/uploads/2020/08/Pullman-Kuching-Hotel.jpg',
          HotelName:'Pullman',
          StartPrice: 240.00,
          HotelRating: 4.2,
          HotelState: 'Kuching',
          ProductPromotion: null,
          ReviewCount: 166,
        },
        {
          HotelID: 4,
          HotelImage: 'https://ak-d.tripcdn.com/images/220u1d000001ede0c1F72_R_960_660_R5_D.jpg',
          HotelName:'Waterfront Hotel',
          StartPrice: 245.00,
          HotelRating: 4.5,
          HotelState: 'Kuching',
          ProductPromotion: null,
          ReviewCount: 195,
        }
      ]

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
      
    const searchResult = () => {
        
        let data = []
        data = dummyHotel_Data.filter((x)=> x.HotelState === props.searchValue || x.HotelName === props.searchValue)

        return (

            data.map((x)=>(
            <Card style={{marginBottom:'2%'}}>
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={4} style={{padding:'4%'}}>
                        <img src={x.HotelImage} alt="" style={{width:'100%', height:'215px'}}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={{padding:'4%'}}>
                            <Stack direction="row" spacing={2} style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
                                <Typography variant="h6" >{x.HotelName}</Typography>

                                <Stack direction='row' spacing={2}>
                                <Typography style={{marginLeft:'4%'}} variant="body2">{x.ReviewCount} Reviews</Typography>
                                    <Grid item xs={8} sm={8} style={{backgroundColor:'rgb(40,136,37)', borderRadius:'8px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <Typography style={{color:'white'}} variant="subtitle2">{x.HotelRating.toFixed(1)}</Typography>
                                    </Grid>
                                </Stack>
                            </Stack>
                            
                            <Stack direction="row" spacing={1} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography variant="body1">{x.HotelState}</Typography>
                                <Button color="primary" size="small" style={{textTransform:'none'}}>Show Map</Button>
                            </Stack>
                            
                            {dummyHotelRoom_data.filter(fil=> fil.HotelID === x.HotelID).map((y) =>(
                            <Grid item container spacing={2} >
                                <Grid item xs={12} sm={7} >
                                    <Typography style={{fontWeight:"bold"}} variant="subtitle2">{y.RoomName}</Typography>
                                    {y.Bed.map((b)=>(
                                    <Typography variant="body1">{b.BedCat_Name}</Typography>
                                    ))}
                                    <Stack direction='row' spacing={2}>
                                        {y.FreeCancellation_Stat === true && 
                                        <div>
                                            <Typography>Free Cancellation</Typography>
                                        </div>
                                    
                                        }
                                        {y.Advance_Pay === true && 
                                        <div>
                                            <Typography> - No Prepayment Needed</Typography>
                                        </div>
                                        }
                                    </Stack>
                                  
                                </Grid>
                                <Grid item xs={12} sm={5} style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end'}}>
                                    <Grid item container spacing={2}>
                                        <Grid item xs={6} sm={12}>
                                            <Typography style={{fontWeight:"bold"}} variant="h5">MYR {y.Price}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={12}>
                                            <Typography variant="body1">+ MYR {y.Price * 0.06} Taxes and charges</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={12}>
                                            <Typography variant="body1">1 Night {y.Capacity} Adult</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={12}>
                                            <Button variant="contained" color="primary" fullWidth component={Link} to={url.product(x)}>Pick Room</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            ))}
                        </div>
                       
                    </Grid>
                
                
                </Grid>
            </Card>
            ))
        )   
        
    }
    
    return (

      <Grid item container spacing={2} style={{display:'flex', flexDirection:"row", justifyContent:'center', alignItem:'center', padding:"4%"}}>
            <Grid item xs={12} sm={9}>
                <Grid item container spacing={4}>
                    <Grid item xs={12} sm={3}>
                        <HotelFilter/>
                    </Grid>
                   
                    <Grid item xs={12} sm={9} >
                        {searchResult()}
                    </Grid>
                </Grid>
            </Grid>
    </Grid>
     
    );
  
  
  }
  
  Hotel_Listing.propTypes = {
    /**
     * product object
     */

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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Hotel_Listing);