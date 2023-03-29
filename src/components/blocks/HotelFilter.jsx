// react
import React, {useEffect } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../services/utils";
import "./styles/BlockTopBrands.css";

// application
import {Grid, Typography, Checkbox, FormControlLabel, TextField, Autocomplete, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



function HotelFilter(props) {
    // const {
    //   product,
    //   layout
    // } = props;

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
    }, [props.addwishlist]);


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
   
  
    return (

      <Grid item container style={{backgroundColor:"white", padding:'4%'}} elevation={2}>
        <Grid item xs={12} sm={12} style={{padding:'2%'}}>
            <Autocomplete
              multiple
              id="multiple-tags"
              options={filterFeature}
              getOptionLabel={(option) => option.FilterName}
              renderInput={(params) => (
                <TextField {...params} label="Filter" placeholder="Filter Type"    
                InputProps={{
                  startAdornment: <IconButton><SearchIcon/></IconButton>,
                }}/>
              )}
              fullWidth
            />
        </Grid>
     
        {render_Filter(filterFeature)}

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
 
   
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelFilter);