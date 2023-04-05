// react
import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";
import "./styles/BlockTopBrands.css";

// application
import {Grid, Typography, Checkbox, FormControlLabel, TextField, InputAdornment, IconButton, Stack, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



function HotelFilter(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const [RoomType, setRoomType_List] = useState('');
    const [searchRoomType, setSearchRoomType] = React.useState('');
    const [checked, setChecked] = React.useState('');

    const filterFeature = [
      { FilterID:0, 
        FilterName:'Budget Per Night' , 
        FilterType: 'Price',
        FilterTypeID: 0,
        FilterVariants:
        [
          {FilterVariantID:0, VariantType:[{VariantTypeValue:0}, {VariantTypeValue:100}]},
          {FilterVariantID:1, VariantType:[{VariantTypeValue:100}, {VariantTypeValue:200}]},
          {FilterVariantID:2, VariantType:[{VariantTypeValue:200}, {VariantTypeValue:400}]},
          {FilterVariantID:3, VariantType:[{VariantTypeValue:400}, {VariantTypeValue:600}]},
          {FilterVariantID:4, VariantType:[{VariantTypeValue:800}, {VariantTypeValue:null}]},
        ],
      },
      { FilterID:1, 
        FilterName:'Cancellation Policy', 
        FilterType: 'Regular',
        FilterTypeID: 2,
        FilterVariants:
        [
          {FilterVariantID:5, VariantType:[{VariantTypeValue:'No prepayment'}]},
          {FilterVariantID:6, VariantType:[{VariantTypeValue:'Free Cancellation'}]},
        ],
      },
      { FilterID:2, 
        FilterName:'Property Rating', 
        FilterType: 'Regular',
        FilterTypeID: 2,
        FilterVariants:
        [
          {FilterVariantID:7, VariantType:[{VariantTypeValue:'5 Star'}]},
          {FilterVariantID:8, VariantType:[{VariantTypeValue:'4 Star'}]},
          {FilterVariantID:9, VariantType:[{VariantTypeValue:'3 Star'}]},
          {FilterVariantID:10, VariantType:[{VariantTypeValue:'2 Star'}]},
          {FilterVariantID:11, VariantType:[{VariantTypeValue:'1 Star'}]},
          {FilterVariantID:12, VariantType:[{VariantTypeValue:'Unrated'}]}
        ],
      },
      { FilterID:3, 
        FilterName:'Meals', 
        FilterType: 'Regular',
        FilterTypeID: 2,
        FilterVariants:
        [
          {FilterVariantID:13, VariantType:[{VariantTypeValue:'Kitchen Provided'}]},
          {FilterVariantID:14, VariantType:[{VariantTypeValue:'Breakfast Included'}]},
        ],
      },
      { FilterID:4, 
        FilterName:'Room Facilities', 
        FilterType: 'Regular',
        FilterTypeID: 2,
        FilterVariants:
        [
          {FilterVariantID:15, VariantType:[{VariantTypeValue:'Balcony'}]},
          {FilterVariantID:16, VariantType:[{VariantTypeValue:'Bathtub'}]},
          {FilterVariantID:17, VariantType:[{VariantTypeValue:'Private Bathroom'}]},
        ],
      },
      
  ]
  
   
    useEffect(() => {
      props.CallAllRoomType();
      props.CallAllPropertyType();
      props.CallAllBedType();
      props.CallFeature_List({ISROOM:0})
      setRoomType_List(props.roomTypeList)
    }, []);


   const render_Filter = (datas) => {

    return(
    
      datas.map((data)=>(
      <Grid item container spacing={2}>

        <Grid item xs={12} sm={12}>
          <Typography style={{fontWeight:'bold',color:'#476E56'}}>{data.FilterName}</Typography>
          </Grid>
      
          {data.FilterTypeID === 0? 
            data.FilterVariants.map((y)=>(
              
            <Grid item xs={12} sm={12}>
                <FormControlLabel
                label={<Typography>MYR {y.VariantType[0].VariantTypeValue} 
                {y.VariantType[1].VariantTypeValue !== null ? ' - ' + y.VariantType[1].VariantTypeValue : ' + '}
                </Typography>}
                control={<Checkbox checked={false} 
                // onChange={handleChange2} 
                />}
                />
                
            </Grid>
            
            ))
           
            : 

            data.FilterVariants.map((y)=>(
              
            <Grid item xs={12} sm={12}>
              {y.VariantType.map((v)=>(
              <FormControlLabel
              label={<Typography>{v.VariantTypeValue}</Typography>}
              control={<Checkbox checked={false} 
              // onChange={handleChange2} 
              />}
              />
              ))}
          </Grid>
            ))}
           
           </Grid>
      )))

   }

   const RoomType_children = (label, label_id) => {

    return(
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
          label={label}
          control={<Checkbox checked={checked[0]} 
          // onChange={handleChange2} 
          />}
        />
      </Box>
    )
};

console.log('feature', props.featureList)

   const renderRoomType = (data) => {
    return(
        <Grid item xs={12} sm={12} style={{height:'300px', overflowY:'auto'}} >
               <FormControlLabel
               label={<Typography variant="subtitle2" fontWeight="bold">Room Type ({data.length})</Typography>}
               control={
                 <Checkbox
                   checked={checked[0] && checked[1]}
                   indeterminate={true}
                  //  onChange={handleChange1}
                 />
               }
             />
            {data.map((x)=>(
              <>
             {RoomType_children(x.RoomType, x.RoomTypeID)}
             </>
             ))}
        </Grid>
        
    )
   }

   const renderPropertyType = (data) => {
        return(
            <Grid item xs={12} sm={12} style={{height:'300px', overflowY:'auto'}} >
              <FormControlLabel
              label={<Typography variant="subtitle2" fontWeight="bold">Property Type ({data.length})</Typography>}
              control={
                <Checkbox
                  checked={checked[0] && checked[1]}
                  indeterminate={true}
                //  onChange={handleChange1}
                />
              }
            />
          {data.map((x)=>(
                  <>
          {RoomType_children(x.PropertyType, x.PropertyTypeID)}
          </>
          ))}
              
        </Grid>
    )
   }


   const renderBedType = (data) => {
    
    return(
        <Grid item xs={12} sm={12} style={{height:'300px', overflowY:'auto'}} >
          <FormControlLabel
          label={<Typography variant="subtitle2" fontWeight="bold">Bed Type ({data.length})</Typography>}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={true}
            //  onChange={handleChange1}
            />
          }
        />
      {data.map((x)=>(
              <>
      {RoomType_children(x.BedType, x.BedID)}
      </>
      ))}
          
    </Grid>
)
}
   
  
    return (

      <Grid item container style={{backgroundColor:"white", padding:'4%'}} elevation={2}>

        {renderRoomType(props.roomTypeList)}
        {renderPropertyType(props.propertyTypeList)}
        {renderBedType(props.bedTypeList)}

      </Grid>
      
    );
  
  
  }
  
  HotelFilter.propTypes = {
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
    roomTypeList: state.counterReducer.roomTypeList,
    propertyTypeList: state.counterReducer.propertyTypeList,
    bedTypeList: state.counterReducer.bedTypeList,
    featureList: state.counterReducer.featureList,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      CallAllRoomType: (prodData) => dispatch(GitAction.CallAllRoomType()),
      CallAllPropertyType: (prodData) => dispatch(GitAction.CallAllPropertyType()),
      CallAllBedType: (prodData) => dispatch(GitAction.CallAllBedType()),
      CallFeature_List: (prodData) => dispatch(GitAction.CallFeature_List(prodData)),
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelFilter);