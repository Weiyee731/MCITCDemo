import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
function mapStateToProps(state) {
  return {
    allgridstorages: state.counterReducer["gridstorage"],
    shoplots: state.counterReducer["shoplots"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllShoplots: () => dispatch(GitAction.CallAllShoplots()),
    CallUpdateGridStorages: (prodData) =>
      dispatch(GitAction.CallUpdateGridStorages(prodData)),
  };
}

class GridStorageDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllShoplots();
    this.state = this.props.data;
  }

  handleChange(data, e) {
    if (data == "GridStorageCode") {
      this.setState({
        GridStorageCode: e.target.value,
      });
    } else if (data == "RentalPricePerMonth") {
      this.setState({
        RentalPricePerMonth: e.target.value,
      });
    } else if (data == "ShoplotID") {
      this.setState({
        ShoplotID: e.target.value,
      });
    } else if (data == "MaximumStock") {
      this.setState({
        MaximumStock: e.target.value,
      });
    } else if (data == "RestockQuantity") {
      this.setState({
        RestockQuantity: e.target.value,
      });
    } else if (data == "RestockDate") {
      this.setState({
        RestockDate: e.target.value,
      });
    } else if (data == "RestockStatus") {
      this.setState({
        RestockStatus: e.target.value,
      });
    } else {
    }
  }

  addGridstorageForm() {
    this.props.CallUpdateGridStorages(this.state);
  }

  render() {
    const edit = (e) => {
      this.setState((prevState, props) => {
        return { toBeEdited: !prevState.toBeEdited };
      });
    };

    let allshoplotsData = this.props.shoplots
      ? Object.keys(this.props.shoplots).map((key) => {
          return this.props.shoplots[key];
        })
      : {};

    if (allshoplotsData.length > 0) {
      var NotEmpty = true;
      var createMenusForDropDownShoplots = allshoplotsData.map((d, i) => {
        return <option value={d.ShoplotID}>{d.ShoplotName}</option>;
      });
    } else {
      var NotEmpty = false;
    }

    const Shoplots = () => (
      <Select
        value={this.state.productShoplot}
        onChange={this.handleChange.bind(this, "Shoplot")}
        inputProps={{
          name: "Product Shoplot",
          id: "productShoplot",
        }}
        style={{ width: "100%" }}
      >
        <option aria-label="None" value="" />
        {createMenusForDropDownShoplots}
      </Select>
    );
    const back = () => {
      window.location.reload(false);
    };
    const cardStyle = { width: "80%", margin: "1% auto" };
    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1>Grid Storage Detail</h1>
        </div>
        <Button onClick={back}>
          <Link className="nav-link" to={"/viewGridStorages"}>
            Back
          </Link>
        </Button>
        {this.state.toBeEdited ? (
          <div>
            <Card style={cardStyle}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>
                <TextField
                  id="text-field-controlled"
                  helperText="Grid Storage Code"
                  value={this.state.GridStorageCode}
                  onChange={this.handleChange.bind(this, "GridStorageCode")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Rental Price Per Month (RM) "
                  value={this.state.RentalPricePerMonth}
                  onChange={this.handleChange.bind(this, "RentalPricePerMonth")}
                  type="number"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    // alignContent: "stretch",
                  }}
                >
                  <div style={{ width: "100%", marginRight: "5px" }}>
                    {NotEmpty ? <Shoplots /> : null}
                    {NotEmpty ? <FormHelperText>Shoplot</FormHelperText> : null}
                  </div>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormHelperText>Stock: </FormHelperText>
                  <br />
                  <TextField
                    id="text-field-controlled"
                    helperText="Stock Amount"
                    value={this.state.StockAmount}
                    onChange={this.handleChange.bind(this, "StockAmount")}
                    type="number"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  {/*  */}
                  <TextField
                    id="text-field-controlled"
                    helperText="Maximum Stock"
                    value={this.state.MaximumStock}
                    onChange={this.handleChange.bind(this, "MaximumStock")}
                    type="text"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormHelperText>Restock: </FormHelperText>
                  <br />
                  <TextField
                    id="text-field-controlled"
                    helperText="RestockQuantity"
                    value={this.state.RestockQuantity}
                    onChange={this.handleChange.bind(this, "RestockQuantity")}
                    type="number"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  <TextField
                    id="text-field-controlled"
                    helperText="RestockDate"
                    value={this.state.RestockDate}
                    onChange={this.handleChange.bind(this, "RestockDate")}
                    type="Date"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  <TextField
                    id="text-field-controlled"
                    helperText="Restock Status"
                    value={this.state.RestockStatus}
                    onChange={this.handleChange.bind(this, "RestockStatus")}
                    type="text"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <Card style={cardStyle}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>
                <TextField
                  id="text-field-controlled"
                  helperText="Grid Storage Code"
                  value={this.state.GridStorageCode}
                  // onChange={this.handleChange.bind(this, "GridStorageCode")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Rental Price Per Month (RM) "
                  value={this.state.RentalPricePerMonth}
                  // onChange={this.handleChange.bind(this, "RentalPricePerMonth")}
                  type="number"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    // alignContent: "stretch",
                  }}
                >
                  <div style={{ width: "100%", marginRight: "5px" }}>
                    {NotEmpty ? <Shoplots /> : null}
                    {NotEmpty ? <FormHelperText>Shoplot</FormHelperText> : null}
                  </div>
                </div>
                <br />
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormHelperText>Stock: </FormHelperText>
                  <br />
                  <TextField
                    id="text-field-controlled"
                    helperText="Stock Amount"
                    value={this.state.StockAmount}
                    type="number"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  
                  <TextField
                    id="text-field-controlled"
                    helperText="Maximum Stock"
                    value={this.state.MaximumStock}
                    type="text"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormHelperText>Restock: </FormHelperText>
                  <br />
                  <TextField
                    id="text-field-controlled"
                    helperText="RestockQuantity"
                    value={this.state.RestockQuantity}
                    type="number"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  <TextField
                    id="text-field-controlled"
                    helperText="RestockDate"
                    value={this.state.RestockDate}
                    type="Date"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                  <TextField
                    id="text-field-controlled"
                    helperText="Restock Status"
                    value={this.state.RestockStatus}
                    type="text"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                </div> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addGridstorageForm}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridStorageDetailComponent);
