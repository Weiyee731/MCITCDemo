import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import MaterialTable from "material-table";
import GoogleMaps from "../../components/googleMaps/googleMaps";
import Button from "@material-ui/core/Button";

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

class AddManualStockInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedProductID: [],
      SelectedProductStock: [],
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
      searchFilter:"",
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
      </div>
    );
  };

  updateProduct = () => {
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
          <Button
            onClick={this.updateProduct}
            variant="outlined"
            className="AddButton"
          >
            Request Stock
          </Button>
        </div>
      );
    });

    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      marginTop: "15px",
    };

    var filteredProduct = [];

    return (
      <div style={{ width: "100%" }}>
        <div style={{ margin: "2%" }}>
          <div>
            <h1>Product Stock In</h1>
            <div style={{ margin: "1%" }}>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
            
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            {this.props.allstocks.filter((searchedItem) =>
              searchedItem.ProductName.toLowerCase().includes(
                this.state.searchFilter.toLowerCase()
              )
            ).map((filteredItem) => {
              filteredProduct.push(filteredItem);
            })}
              <MaterialTable
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
                    title: "",
                    field: "ProductComponentOf",
                  },
                ]}
                data = {filteredProduct}
                options={{
                  paging: true,
                  search: false,
                  toolbar: false,
                }}
              ></MaterialTable>
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
