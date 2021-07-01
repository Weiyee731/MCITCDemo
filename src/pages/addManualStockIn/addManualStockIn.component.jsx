import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import ProductDetailsComponent from "../../pages/productDetails/productDetails.component";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import GoogleMaps from "../../components/googleMaps/googleMaps";
function mapStateToProps(state) {
  return {
    allstocks: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductsByProductStatus: (prodData) =>
      dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallUpdateProductStock: (prodData) =>
      dispatch(GitAction.CallUpdateProductStock(prodData)),
  };
}

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// //show main map
// function ShowMainMap(props) {
//   const polypath = [
//     {
//       block: "A",
//       Color: "#008000",
//       ShoplotCoordinate: [
//         { lat: 1.5921641925052, lng: 110.431633074988 },
//         { lat: 1.59115338985581, lng: 110.429951329936 },
//         { lat: 1.59001492677904, lng: 110.430582476623 },
//         { lat: 1.59102304881136, lng: 110.432309819229 },
//         { lat: 1.5921641925052, lng: 110.431633074988 },
//       ],
//     },
//     {
//       block: "B",
//       Color: "#FFFF00",
//       ShoplotCoordinate: [
//         { lat: 1.59219311478493, lng: 110.431658803505 },
//         { lat: 1.59105065831252, lng: 110.432325065247 },
//         { lat: 1.59264758826223, lng: 110.434993215471 },
//         { lat: 1.59378358792204, lng: 110.43431969478 },
//         { lat: 1.59219311478493, lng: 110.431658803505 },
//       ],
//     },
//     {
//       block: "C",
//       Color: "#FF0000",
//       ShoplotCoordinate: [
//         { lat: 1.5939685198604472, lng: 110.43665361977425 },
//         { lat: 1.5936590240065396, lng: 110.43611937906833 },
//         { lat: 1.5945346343454787, lng: 110.43560473453614 },
//         { lat: 1.5937790950076558, lng: 110.43433013423987 },
//         { lat: 1.592637929429218, lng: 110.43500991320931 },
//         { lat: 1.593685862577975, lng: 110.43677943664157 },
//         { lat: 1.5939685198604472, lng: 110.43665361977425 },
//       ],
//     },
//   ];

//   return <GoogleMaps polypath={polypath} zoom={18} />;
// }

class AddManualStockInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedProductID: [],
      SelectedProductStock: [],
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
    };
    this.props.CallAllProductsByProductStatus(this.state);
  }

  handleInputChange = (event, index) => {
    let newSelected = this.state.SelectedProductStock;
    newSelected[index] = Number(event.target.value);
    newSelected = newSelected.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductStock: newSelected });
    let newSelectedProductID = this.state.SelectedProductID;
    newSelectedProductID[index] = this.props.allstocks[index].ProductID;
    newSelectedProductID = newSelectedProductID.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductID: newSelectedProductID });
  };

  handleBlur = () => {};

  bindSubCategory = (row) => {
    let shoplotlocation = JSON.parse(row.ProductShoplocation);
    let placeDetail = {
      lng: JSON.parse(shoplotlocation[0].ShoplotCoordinate)[0].lng,
      lat: JSON.parse(shoplotlocation[0].ShoplotCoordinate)[0].lat,
      Color: "#FF0000",
      ShoplotCoordinate: JSON.parse(shoplotlocation[0].ShoplotCoordinate),
      shopName: "MCITC" + shoplotlocation[0].ShoplotBlock,
    };

    return (
      <div style={{ padding: "2%" }}>
        <div style={{ width: "100%", height: "40vh" }}>
          <GoogleMaps
            longitude={JSON.parse(shoplotlocation[0].ShoplotCoordinate)[0].lng}
            latitude={JSON.parse(shoplotlocation[0].ShoplotCoordinate)[0].lat}
            polypath={[placeDetail]}
            markerLabel={"MCITC" + shoplotlocation[0].ShoplotBlock}
            zoom={18}
          />
        </div>
        {/* <SimpleDialog
          open={this.state.openMap}
          onClose={this.closeMap}
          polypath123={JSON.parse(
            JSON.parse(row.ProductShoplocation)[0].ShoplotCoordinate
          )}
          longitude={this.state.longitude}
          latitude={this.state.latitude}
          shopName={this.state.shopName}
        /> */}
      </div>
    );
  };

  updateProduct = () => {
    // console.log(this.state);
    this.props.CallUpdateProductStock(this.state);
  };

  render() {
    console.log(this.props.allstocks);
    this.props.allstocks.map((d, i) => {
      d.ProductImage = (
        <div>
          <img height={50} src={d.ProductImage} />
        </div>
      );
      d.ProductComponentOf = (
        <div>
          <button
            onClick={this.updateProduct}
            style={{
              background: "#000",
              borderRadius: "5px",
              padding: "10px",
              width: "80px",
              height: "auto",
              color: "white",
              borderColor: "#000",
              borderWidth: "2px",
              fontWeight: "bold",
            }}
          >
            Update
          </button>
        </div>
      );

      d.ProductTag = (
        <div style={{ padding: "2%" }}>
          <Input
            style={{ zIndex: 1 }}
            value={this.state.SelectedProductStock[i]}
            margin="dense"
            // {...getInputProps()}
            onChange={(event) => this.handleInputChange(event, i)}
            onBlur={this.handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </div>
      );
    });

    return (
      <div style={{ width: "100%" }}>
        <div style={{ margin: "2%" }}>
          <div>
            <h1>Product Stock In</h1>
            <div style={{ margin: "1%" }}>
              <MaterialTable
                title="Product Stock In"
                columns={[
                  {
                    title: "Product Image",
                    field: "ProductImage",
                  },
                  {
                    title: "Product Name",
                    field: "ProductName",
                  },
                  {
                    title: "Current Stock",
                    field: "ProductStockAmountInital",
                  },
                  {
                    title: "Waiting to Approved Stock",
                    field: "ProductStockAmount",
                  },
                  {
                    title: "Status",
                    field: "ProductStockStatus",
                  },
                  {
                    title: "Adding Stock",
                    field: "ProductTag",
                  },
                  {
                    title: "Submit",
                    field: "ProductComponentOf",
                  },
                ]}
                data={this.props.allstocks}
                options={{
                  paging: true,
                  search: false,
                }}
                detailPanel={(rowData) => {
                  return this.bindSubCategory(rowData);
                }}
              ></MaterialTable>
              {/* <button
                onClick={this.updateProduct}
                style={{
                  background: "#000",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "80px",
                  height: "auto",
                  color: "white",
                  borderColor: "#000",
                  borderWidth: "2px",
                  fontWeight: "bold",
                }}
              >
                Update
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddManualStockInComponent);
