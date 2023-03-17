// react
import React, { Component, memo } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { url } from "../../services/utils";

// application
import Grid from "@mui/material/Grid";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
import { HashLink } from "react-router-hash-link";
import { GitAction } from "../../store/action/gitAction";
import Logo from "../../assets/Emporia.png"
import ProductSkeleton from "./ProductSkeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Typography, Card, } from "@mui/material";
import Chip from '@mui/material/Chip';
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import LoginComponent from "../../pages/login/login.component";


class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
          
        };

    }

    componentWillUnmount() {
  
    }

    componentDidMount() {
       
    }

    componentDidUpdate(props) {
       
    }

    render() {

        const {product} = this.props

        return(
            <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img src={product.HotelImage} alt={product.HotelName} style={{width:"70%"}}/>
                </Grid>
            </Grid>
        )
    }
      
}

HotelDetails.propTypes = {
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

HotelDetails.defaultProps = {
    layout: "standard",
};

const mapStateToProps = (state) => ({
  
});


const mapDispatchToProps = (dispatch) => {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelDetails));