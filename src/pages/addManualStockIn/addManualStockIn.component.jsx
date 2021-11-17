import React, { Component } from "react";
import { connect } from "react-redux";

import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";

import MainTable from "./Components/TableView.component";
import { Card, CardContent } from "@material-ui/core";
import GoogleMaps from "../../components/googleMaps/googleMaps";

import Button from "@material-ui/core/Button";

function mapStateToProps(state) {
  return {
    products: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateProductStockIn: (prodData) => dispatch(GitAction.CallUpdateProductStockIn(prodData)),
    CallAllProducts: (prodData) => dispatch(GitAction.CallAllProducts(prodData)),

  };
}
class AddManualStockInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedProductID: [],
      SelectedProductStock: [],
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
    };

    this.props.CallAllProducts({
      type: "Merchant",
      typeValue: 0,
      userId: 0,
      productPage: 999,
      page: 1
    })
  }

  handleInputChange = (event, index) => {
    let newSelected = this.state.SelectedProductStock;
    newSelected[index] = Number(event.target.value);
    newSelected = newSelected.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductStock: newSelected });
    let newSelectedProductID = this.state.SelectedProductID;
    newSelectedProductID[index] = this.props.products[index].ProductID;
    newSelectedProductID = newSelectedProductID.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductID: newSelectedProductID });
  };

  handleBlur = () => { };

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
      </div>
    );
  };

  updateProduct = () => {
    this.props.CallUpdateProductStockIn(this.state);
  };

  render() {
    let allStocksData = this.props.products
      ? Object.keys(this.props.products).map((key) => {
        return this.props.products[key];
      })
      : {};

    var FilterList = [
      "ProductName",
      "Model",
      "ProductStockStatus",
      "ProductTag",
    ];

    var ListedAttributes = [
      { name: "ProductImage", isNum: false, displayName: "Product Image" },
      { name: "ProductName", isNum: false, displayName: "Product Name" },
      {
        name: "ProductStockAmountInital",
        isNum: true,
        displayName: "Current Stock",
      },
      {
        name: "ProductStockAmount",
        isNum: true,
        displayName: "Awaiting Approval",
      },
      // { name: "ProductStockStatus", isNum: false, displayName: "Stock Status" },
    ];

    return (
      <div className="MainContainer">
        <h1>Product Stock In</h1>
        <Card className="MainCard">
          <CardContent className="MainContent">
            <MainTable
              CallUpdateProductStock={this.props.CallUpdateProductStockIn}
              ListedAttributes={ListedAttributes}
              Data={allStocksData}
              filterList={FilterList}
              changeValue={this.updateList}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddManualStockInComponent);
