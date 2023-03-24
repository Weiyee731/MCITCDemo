// react
import React, { useEffect, useState } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import Currency from "./Currency";
import Rating from "./Rating";
import { Wishlist16Svg} from "../../svg";
import Grid from "@mui/material/Grid";
import { url } from "../../services/utils";
import Logo from "../../assets/Emporia.png"
import { GitAction } from "../../store/action/gitAction";

// application
import { Typography } from "@mui/material/Typography";

function selectedHotelDetail(props) {
//   const {
//     product,
//     layout
//   } = props;


  return (
    <Grid item container spacing={2}>
        <Grid item xs={12} sm={12}>
            <Typography></Typography>
        </Grid>
    </Grid>
  );


}

selectedHotelDetail.propTypes = {
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

};


export default connect(mapStateToProps, mapDispatchToProps)(selectedHotelDetail);
