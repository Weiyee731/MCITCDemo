import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function mapStateToProps(state) {
  return {
    allstocks: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callAllProducts: () => dispatch(GitAction.CallAllProducts()),
    CallDeleteProduct: (prodData) =>
      dispatch(GitAction.CallDeleteProduct(prodData)),
  };
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

class ProductStockInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Not Found",
    };
  }

  SetDataState = (value) => {
    this.setState({
      data: value,
    });
  };

  render() {
    const { height, width } = getWindowDimensions();

    const back = () => {
      window.location.reload(false);
    };

    return (
      <>
        <BarcodeScannerComponent
          width={width}
          height={height}
          onUpdate={(err, result) => {
            if (result) this.SetDataState(result.text);
            else this.SetDataState("Not Found");
          }}
        />
        <Card
          style={{
            minWidth: "275",
            minHeight: "150",
          }}
        >
          <CardContent>
            <Typography>{this.state.data}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={back}>
              <Link
                className="nav-link"
                to={{
                  pathname: "/addProduct?" + "barcode=" + this.state.data,
                }}
              >
                Done Scan
              </Link>
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductStockInComponent);
