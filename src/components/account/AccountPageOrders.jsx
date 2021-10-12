// react
import React, { Component } from "react";

// third-party
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// application
import Pagination from "../shared/Pagination";

// data stubs
import dataOrders from "../../data/accountOrders";
import theme from "../../data/theme";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";


//Tab
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@mui/material/TextField';


//DatePicker
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

function mapStateToProps(state) {
  return {
    allmerchantorders: state.counterReducer["merchantOrders"],
    alltransactionstatus: state.counterReducer["transactionStatus"],
    addresses: state.counterReducer["addresses"],
    creditcard: state.counterReducer["creditcards"],
    transaction: state.counterReducer["transaction"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetMerchantsOrders: (propsData) =>
      dispatch(GitAction.CallGetMerchantsOrders(propsData)),

    CallGetTransactionStatus: () =>
      dispatch(GitAction.CallGetTransactionStatus()),

    CallAllAddress: (prodData) => dispatch(GitAction.CallAllAddress(prodData)),

    CallAllCreditCard: (prodData) =>
      dispatch(GitAction.CallAllCreditCard(prodData)),
  };
}

//Tab Function

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


class AccountPageOrders extends Component {
  constructor(props) {
    super(props);
    this.props.CallGetTransactionStatus();
    this.props.CallGetMerchantsOrders({
      trackingStatus: 2,
      UserID: window.localStorage.getItem("id")
    });
    this.props.CallAllAddress({ USERID: window.localStorage.getItem("id") });

    this.props.CallAllCreditCard(window.localStorage.getItem("id"));
    this.state = {
      page: 1,
      rowsPerPage: 10,
      shipping: 25,
      tax: 0,
      value: 0,
      TrackingStatus: '-',
      selectedDate: null,
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeTabIndex = this.handleChangeTabIndex.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  //Change Tab
  handleChangeTab = (event, value) => {
    switch (value) {
      case 0:
        this.setState({
          value: value,
          TrackingStatus: "-",
        })
        this.handlePageChange(1)
        break;

      case 1:
        this.setState({
          value: value,
          TrackingStatus: "In Cart",
        })
        this.handlePageChange(1)
        break;
      case 2:
        this.setState({
          value: value,
          TrackingStatus: "In Purchasing",
        })
        this.handlePageChange(1)
        break;
      case 3:
        this.setState({
          value: value,
          TrackingStatus: "In Shipping",
        })
        this.handlePageChange(1)
        break;

      default:
        this.setState({
          value: value,
          TrackingStatus: "-",
        })
        this.handlePageChange(1)
        break;
    }
  };


  handleChangeTabIndex = (index) => {
    this.setState({ value: index })
  };

  // Date
  handleDateChange = (selectedDate) => {
    this.setState({ selectedDate: new Date() })
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  render() {

    console.log("this.props.allmerchantorders", this.props.allmerchantorders)
    const { page } = this.state;
    let ordersList;
    if (this.props.allmerchantorders.length > 0 && this.props.allmerchantorders[0].ReturnVal !== 0 && this.props.allmerchantorders[0].ReturnVal === undefined) {
      ordersList = this.props.allmerchantorders
        .slice((page - 1) * this.state.rowsPerPage, (page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
        .map((order) => {
          const quantity = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
            (orders) => orders.ProductQuantity
          ) : "";
          const price = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
            (orders) => orders.ProductSellingPrice
          ) : "";

          const subtotal = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
            (orders) => orders.ProductSellingPrice * orders.ProductQuantity
          ) : "";

          var totalQuantity = 0;
          var totalPrice = 0;
          var subtotalPrice = 0;
          var totalOverall = 0;

          if (price.length > 0) {
            totalPrice = price.reduce((previous, current) => previous + current, 0);
          } else {
            totalPrice = price;
          }

          if (quantity.length > 0) {
            totalQuantity = quantity.reduce(
              (previous, current) => previous + current,
              0
            );
          } else {
            totalQuantity = 0;
          }

          if (subtotal.length > 0) {
            subtotalPrice = subtotal.reduce((previous, current) => previous + current, 0);
          } else {
            subtotalPrice = subtotal;
          }

          if (price.length > 0 && subtotal.length > 0) {
            totalOverall = subtotalPrice + parseInt(this.state.shipping + this.state.tax)
          }

          return (
            <>
              {console.log("this.state.TrackingStatus", this.state.TrackingStatus)}
              {this.state.TrackingStatus !== "-" ?
                order.TrackingStatus === this.state.TrackingStatus ?
                  <tr key={order.OrderID}>
                    <td>
                      <Link
                        to={{
                          pathname: "/account/orders/" + order.OrderID,
                          orderdetails: order,
                          orderprice: totalPrice,
                          address: this.props.addresses,
                          creditcards: this.props.creditcard,
                        }}
                      >{`#${order.OrderID}`}</Link>
                    </td>

                    <td>{order.CreatedDate}</td>
                    <td>{order.TrackingStatus}</td>
                    <td>{totalQuantity + " items ," + " RM " + totalOverall}</td>
                  </tr>
                  : null
                :
                <tr key={order.OrderID}>
                  <td>
                    <Link
                      to={{
                        pathname: "/account/orders/" + order.OrderID,
                        orderdetails: order,
                        orderprice: totalPrice,
                        address: this.props.addresses,
                        creditcards: this.props.creditcard,
                      }}
                    >{`#${order.OrderID}`}</Link>
                  </td>

                  <td>{order.CreatedDate}</td>
                  <td>{order.TrackingStatus}</td>
                  <td>{totalQuantity + " items ," + " RM " + totalOverall}</td>
                </tr>
              }
            </>
          );
        });
    }

    return (
      <div className="card" >
        <Helmet>
          <title>{`Order History — ${theme.name}`}</title>
        </Helmet>
        <div className="row">
          <div className="card-header col-6">
            <h5>Order History</h5>
          </div>
          <div className="card-header col-6">
            <div style={{ marginBottom: '2%', display: 'flex', flexDirection: 'row' }}>
              <div className="col-6">
                <TextField
                  id="standard-helperText"
                  label="Tracking Number"
                  // defaultValue="Default Value"
                  // helperText="Tracking Order"
                  variant="standard"
                />
              </div>
              <div className="col-6">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div style={{ marginBottom: '2%' }}>
                    <KeyboardDatePicker
                      disableToolbar
                      // helperText="Filter Order"
                      variant="inline"
                      format="dd/MM/yyyy"
                      id="date-picker-inline"
                      label="Select Date"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange.bind(this, "selectedDate")}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    // style={{ width: "60%" }}
                    />
                  </div>
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: 'auto' }}>
          <Box sx={{ bgcolor: 'background.paper', width: 820 }}>
            <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChangeTab}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="In Cart" {...a11yProps(1)} />
                <Tab label="In Purchasing" {...a11yProps(2)} />
                <Tab label="In Shipping" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeTabIndex}
            >
              {/* ---------------------------------------------------- All ----------------------------------------------------- */}
              <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                {/* <div className="card-divider" /> */}
                <div className="card-table" style={{ width: '85%', margin: 'auto' }}>
                  <div className="table-responsive-sm">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Order</th>
                          <th style={{ textAlign: 'center' }}>Date</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>{ordersList !== undefined && ordersList.length > 0 ? ordersList : ""}</tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="card-divider" /> */}
                <div className="card-footer">
                  {
                    ordersList !== undefined && ordersList.length > 0 ?
                      <Pagination
                        current={page}
                        total={
                          ordersList != null
                            ? Math.ceil(ordersList.length / this.state.rowsPerPage)
                            : 1
                        }
                        onPageChange={this.handlePageChange}
                      /> :
                      <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div style={{ marginBottom: "20px" }}>
                          Seem like you haven purchase anything yet
                        </div>
                        <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                      </div>
                  }
                </div>
              </TabPanel>
              {/* ---------------------------------------------------- In Cart ----------------------------------------------------- */}
              <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                {/* <div className="card-divider" /> */}
                <div className="card-table" style={{ width: '85%', margin: 'auto' }}>
                  <div className="table-responsive-sm">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Order</th>
                          <th style={{ textAlign: 'center' }}>Date</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>{ordersList !== undefined && ordersList.length > 0 ? ordersList : ""}</tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="card-divider" /> */}
                <div className="card-footer">
                  {
                    ordersList !== undefined && ordersList.length > 0 ?
                      <Pagination
                        current={page}
                        total={
                          ordersList != null
                            ? Math.ceil(ordersList.length / this.state.rowsPerPage)
                            : 1
                        }
                        onPageChange={this.handlePageChange}
                      /> :
                      <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div style={{ marginBottom: "20px" }}>
                          Seem like you haven purchase anything yet
                        </div>
                        <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                      </div>
                  }
                </div>
              </TabPanel>

              {/* ----------------------------------------- In Purchasing ----------------------------------------------------------- */}
              <TabPanel value={this.state.value} index={2} dir={theme.direction}>
                {/* <div className="card-divider" /> */}
                <div className="card-table" style={{ width: '85%', margin: 'auto' }}>
                  <div className="table-responsive-sm">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Order</th>
                          <th style={{ textAlign: 'center' }}>Date</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>{ordersList !== undefined && ordersList.length > 0 ? ordersList : ""}</tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="card-divider" /> */}
                <div className="card-footer">
                  {
                    ordersList !== undefined && ordersList.length > 0 ?
                      <Pagination
                        current={page}
                        total={
                          ordersList != null
                            ? Math.ceil(ordersList.length / this.state.rowsPerPage)
                            : 1
                        }
                        onPageChange={this.handlePageChange}
                      /> :
                      <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div style={{ marginBottom: "20px" }}>
                          Seem like you haven purchase anything yet
                        </div>
                        <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                      </div>
                  }
                </div>
              </TabPanel>

              {/* -------------------------------------------- In Shipping -------------------------------------------------------- */}
              <TabPanel value={this.state.value} index={3} dir={theme.direction}>
                {/* <div className="card-divider" /> */}
                <div className="card-table" style={{ width: '85%', margin: 'auto' }}>
                  <div className="table-responsive-sm">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Order</th>
                          <th style={{ textAlign: 'center' }}>Date</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>{ordersList !== undefined && ordersList.length > 0 ? ordersList : ""}</tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="card-divider" /> */}
                <div className="card-footer">
                  {
                    ordersList !== undefined && ordersList.length > 0 ?
                      <Pagination
                        current={page}
                        total={
                          ordersList != null
                            ? Math.ceil(ordersList.length / this.state.rowsPerPage)
                            : 1
                        }
                        onPageChange={this.handlePageChange}
                      /> :
                      <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div style={{ marginBottom: "20px" }}>
                          Seem like you haven purchase anything yet
                        </div>
                        <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
                      </div>
                  }
                </div>
              </TabPanel>

            </SwipeableViews>
          </Box>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageOrders);
