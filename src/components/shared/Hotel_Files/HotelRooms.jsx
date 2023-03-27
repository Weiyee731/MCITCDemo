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
import { Cross20Svg } from "../../../svg";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import _ from "lodash";
import { Modal } from 'reactstrap';
import HotelModal from "./HotelModal";

function HotelRooms(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const [openModal, setOpenModal] = useState(false)
    const dummyHotelRoom_data = [
      { RoomID:0,
        RoomName: 'Standard Suite',
        Price:280.00,
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
        RoomName: 'Deluxe Suite',
        Price: 380.00,
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

      <Grid item container spacing={2} style={{ marginLeft:'3%', marginRight:'3%'}} elevation={2}>
        <Grid item xs={12} sm={12}>
            <Typography variant="caption" style={{fontWeight:'bold'}}>Select Your Room</Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{backgroundColor:'white', padding:"2%", margin:'1.5%'}}>


{dummyHotelRoom_data.map((room)=>
            <Grid item container 
              spacing={2} style={{ paddingTop:'2%', paddingBottom:'2%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'white'}}
              elevation={2}>
              <Grid item xs={12} sm={10} >
                <Grid item container spacing={1} style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Grid item xs={12} sm={3} style={{paddingLeft:'2%',paddingRight:'2%'}} >
                        <div style={{fontSize:15, marginTop:'1%'}}>{room.RoomName}</div>
                    
                        <Grid item container >
                          <Grid item xs={12} sm={12}>
                            <img src={room.RoomImages[0].ImageURL} alt={room.RoomImages[0].ImageID} style={{width:'100%', height:'auto'}}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <img src={room.RoomImages[1].ImageURL} alt={room.RoomImages[1].ImageID} style={{width:'100%', height:'auto'}}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <img src={room.RoomImages[2].ImageURL} alt={room.RoomImages[2].ImageID} style={{width:'100%', height:'auto'}}/>
                          </Grid>
                        </Grid>
                     
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <div>
                      <button style={{border:'none', backgroundColor:'transparent', padding:0}} onClick={() => setOpenModal(!openModal)}><Typography color="primary" sx={{textDecoration:"underline"}}>View room</Typography></button>
                      </div>
                  
                      <Typography variant="caption">Capacity</Typography>
                   
                      <Stack direction="row" spacing={0}>
                        {_.times(room.Capacity, (i) => (
                            <PersonIcon key={i} style={{color:"#ffa31a"}} fontSize="small"/>
                          ))}
                      </Stack>
                    </Grid>
                    <Grid item xs={9} sm={2}>
                      <Stack direction='row' spacing={1}>
                          <Typography variant="caption">RM</Typography>
                          <Typography variant="h5" color="#288825">{room.Price}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Stack direction ="row" spacing={2}>
                        <RestaurantIcon fontSize="small" style={{color:"#ffa31a"}}/>
                        <Typography variant="caption">{room.Breakfast_Included === true ? 'Breakfast included' : 'No breakfast included'}</Typography>
                      </Stack>
                      
                    </Grid>
                    <Grid item xs={12} sm={2} >
                      <Stack direction='row' spacing={2}>
                          <div>+</div>
                          <div style={{minHeight:'20px', minWidth:'20px'}}>0</div>
                          <div>-</div>
                      </Stack>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={2}>
                  <Button variant="contained" color="primary" size="small">Reserve</Button>
              </Grid>
            </Grid>
)}

      <Modal isOpen={openModal} toggle={() => setOpenModal(!openModal)} centered size="xl">
          <div className="quickview">
            <button className="quickview__close" type="button" onClick={() => setOpenModal(!openModal)}>
              <Cross20Svg />
            </button>
            <HotelModal/>
          </div>
        </Modal>
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