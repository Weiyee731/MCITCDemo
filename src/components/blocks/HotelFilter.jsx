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
import {Grid, Typography, Checkbox, FormControlLabel, TextField, InputAdornment, IconButton, Stack, Box, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function HotelFilter(props) {

    //collapse -- will improve the code later 
    const [collapseRoom, setCollapseRoom] = React.useState(true);
    const [collapseProperty, setPropertyCollapse] = React.useState(true);
    const [collapseBed, setCollapseBed] = React.useState(true);
    const [selectedCollapse_Feature, setSelectedCollapse_Feature] = React.useState([]);

    //checkbox
    const [checked, setChecked] = React.useState(false);

    // call data & set them to state
    useEffect(() => {
      props.CallAllRoomType();
      props.CallAllPropertyType();
      props.CallAllBedType();
      props.CallFeature_List({ISROOM:0});

    }, []);

   const showAll_data = (collapseType, title) => {

    const handleClickButton = () => {
      if(collapseType === 'room'){
        setCollapseRoom(!collapseRoom);
      }
      else if(collapseType === 'property'){
        setPropertyCollapse(!collapseProperty);
      }
      else if(collapseType === 'bed'){
        setCollapseBed(!collapseBed);
      }
    };
    

    return(
      <Button color="primary" style={{textTransform:'none'}} onClick={()=>handleClickButton()}>{title}</Button>
    )

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

 
   const renderRoomType = (data) => {
    let datas = ""
    let title = ""
    switch(collapseRoom){
      case true:
        datas = data.slice(0,5);
        title = 'Show All ' + data.length
        break;
      case false:
        datas = data
        title = 'Show Less'
        break;
      default:
        break;
    }
    return(
        <Grid item xs={12} sm={12} style={{borderBottom:'1px solid #ECECEC', padding:'3%'}}>
               <FormControlLabel
               label={<Typography variant="subtitle2" fontWeight="bold">Room Type </Typography>}
               control={
                 <Checkbox
                   checked={checked[0] && checked[1]}
                   indeterminate={false}
                  //  onChange={handleChange1}
                 />
               }
             />
             
            {datas.map((x) => (
             <>
             {RoomType_children(x.RoomType, x.RoomTypeID)}
             </>
             ))}
             {data.length > 5 && showAll_data('room', title)}  
        </Grid>
        
    )
   }

   const renderPropertyType = (data) => {
    let datas = ""
    let title = ""
    switch(collapseProperty){
      case true:
        datas = data.slice(0,5);
        title = 'Show All ' + data.length
        break;
      case false:
        datas = data
        title = 'Show Less'
        break;
      default:
        break;
    }
        return(
            <Grid item xs={12} sm={12} style={{borderBottom:'1px solid #ECECEC', padding:'3%'}}>
              <FormControlLabel
              label={<Typography variant="subtitle2" fontWeight="bold">Property Type</Typography>}
              control={
                <Checkbox
                  checked={checked[0] && checked[1]}
                  indeterminate={false}
                //  onChange={handleChange1}
                />
              }
            />
          {datas.map((x)=>(
          <>
          {RoomType_children(x.PropertyType, x.PropertyTypeID)}
          </>
          ))}
          {data.length > 5 && showAll_data('property', title)}    
        </Grid>
    )
   }


   const renderBedType = (data) => {
    let datas = ""
    let title = ""
    switch(collapseBed){
      case true:
        datas = data.slice(0,5);
        title = 'Show All ' + data.length
        break;
      case false:
        datas = data
        title = 'Show Less'
        break;
      default:
        break;
    }
    return(
        <Grid item xs={12} sm={12} style={{borderBottom:'1px solid #ECECEC', padding:'3%'}} >
          <FormControlLabel
          label={<Typography variant="subtitle2" fontWeight="bold">Bed Type</Typography>}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={false}
            //  onChange={handleChange1}
            />
          }
        />
      {datas.map((x)=>(
      <>
        {RoomType_children(x.BedType, x.BedID)}
      </>
      ))}
        {data.length > 5 && showAll_data('bed', title)}  
    </Grid>
)
}


const handleExpand_Feature = (id) => {
  let checkExistence = selectedCollapse_Feature.indexOf(id);
  if(checkExistence === -1){
    setSelectedCollapse_Feature([...selectedCollapse_Feature, id])
  }
  else{
    setSelectedCollapse_Feature(selectedCollapse_Feature.filter(item => item !== id))
  }

}


const renderFeatures = (data) => {
  let datas = data
  let title = selectedCollapse_Feature.indexOf(data.FeatureTypeID) !== -1 ? "Show More" : "Show Less"

  let f_listing = (list) =>{
    let listData = list
    if(selectedCollapse_Feature.indexOf(listData[0].ParentFeatureTypeID) !== -1){
      return listData
    }
    else{
      return listData.slice(0,5)
    }
    
  }

  return(
    <Grid item xs={12} sm={12} >
    
      {datas.map((dat)=>(
        <Grid item xs={12} sm={12} style={{borderBottom:'1px solid #ECECEC', padding:'3%'}} >
          <FormControlLabel
          label={<Typography variant="subtitle2" fontWeight="bold">{dat.FeatureType}</Typography>}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={false}
              size="small"
            //  onChange={handleChange1}
            />
          }
        />
      
      
      {f_listing(JSON.parse(dat.FeatureListing)).map((feature, idx)=>(
        <>
        {RoomType_children(feature.FeatureType, feature.FeatureTypeID)}
        </> 
        ))}
        {JSON.parse(dat.FeatureListing).length > 5 && <Button color="primary" sx={{textTransform:'none'}} onClick={()=>handleExpand_Feature(dat.FeatureTypeID)}>{selectedCollapse_Feature.indexOf(dat.FeatureTypeID) !== -1 ? 'Show Less' : 'Show All ' + JSON.parse(dat.FeatureListing).length} </Button>}
      </Grid>
       ))}
     
    </Grid>
  )
}
   
  
  return (
    <Grid item container style={{backgroundColor:"white", padding:'4%'}} elevation={2}>
      {renderRoomType(props.roomTypeList)}
      {renderPropertyType(props.propertyTypeList)}
      {renderBedType(props.bedTypeList)}
      {renderFeatures(props.featureList)}
    </Grid>
  );
  
  
  }
  
  HotelFilter.propTypes = {
    product: PropTypes.object.isRequired,
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