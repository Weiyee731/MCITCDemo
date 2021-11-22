// react
import React, { Component, useState } from "react";

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
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

//Filtering
import DatePicker from 'react-date-picker'
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Button from "@material-ui/core/Button";
import SearchIcon from '@mui/icons-material/Search';
import { ThirteenMp } from "@mui/icons-material";

// import DateFnsUtils from "@date-io/date-fns";

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
      rowsPerPage: 5,
      shipping: 25,
      tax: 0,
      value: 0,
      TrackingStatus: '-',
      isFiltered: false,
      filteredList: [],

      trackingNumber: "",
      selectedDate: new Date(),
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeTabIndex = this.handleChangeTabIndex.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
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
          TrackingStatus: "Payment Confirm",
        })
        this.handlePageChange(1)
        break;
      case 2:
        this.setState({
          value: value,
          TrackingStatus: "In Shipping",
        })
        this.handlePageChange(1)
        break;
      case 3:
        this.setState({
          value: value,
          TrackingStatus: "To Receive",
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

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
    this.searchFilter(this.state.trackingNumber, date)
  }

  handleTrackingNoChange = (value) => {
    this.setState({ trackingNumber: value })
    this.searchFilter(value, this.state.selectedDate)
  }

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  searchFilter = (value, date) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    this.state.filteredList.splice(0, this.state.filteredList.length)
    this.props.allmerchantorders.filter(searchedItem =>
      format.test(value) === false
      // && searchedItem.trackingNumber.toLowerCase().trim().includes(value)
      && moment(searchedItem.CreatedDate, "DD/MM/YYYY").format("YYYYMMDD").includes(moment(date, "DD/MM/YYYY").format("YYYYMMDD"))
    )
      .map(filteredItem => {
        this.state.filteredList.push(filteredItem);
      });

    this.setState({ isFiltered: true })
  }

  clearFilter = () => {
    this.setState({
      isFiltered: false,
      selectedDate: new Date(),
      trackingNumber: ""
    })
  }

  render() {
    const { page } = this.state;
    let ordersList;

    let orderDetailListing = (listing) => (
      <>
        {
          listing.length > 0 ?
            ordersList =
            listing
              .slice((page - 1) * this.state.rowsPerPage, (page - 1) * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((order) => {
                const quantity = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
                  (orders) => orders.ProductQuantity
                ) : "";

                const price = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
                  (orders) => orders.ProductVariationPrice
                ) : "";

                const overallPrice = order.totalAmount !== null ? order.totalAmount : 0

                const subtotal = order.OrderProductDetail !== null ? JSON.parse(order.OrderProductDetail).map(
                  (orders) => orders.ProductVariationPrice * orders.ProductQuantity
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

                const pageItem = {
                  pathname: "/account/orders/" + order.OrderID,
                  orderdetails: order,
                  orderprice: totalPrice,
                  address: this.props.addresses,
                  creditcards: this.props.creditcard,
                }
                let TrackingList = (
                  <tr key={order.OrderID} >
                    <td>  <Link to={pageItem} >{`#${order.OrderID}`}</Link> </td>
                    <td><Link to={pageItem} >{order.CreatedDate}</Link> </td>
                    <td><Link to={pageItem} >{order.TrackingStatus}</Link> </td>
                    <td><Link to={pageItem} >{totalQuantity + " items ," + " RM " + totalOverall}</Link> </td>
                  </tr>
                )

                return (
                  <>
                    {
                      this.state.TrackingStatus !== "-" ?
                        order.TrackingStatus === this.state.TrackingStatus ?
                          <>{TrackingList}</>
                          : null
                        :
                        <>{TrackingList}</>
                    }
                  </>
                );
              })
            : ""
        }
      </>
    )

    let orders = []
    let orderListing = (index) => (
      <div id={index}>
        <div id={"cardTable" + index} className="card-table">
          <div id={"table" + index} className="table-responsive-sm">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.allmerchantorders.length > 0 && this.props.allmerchantorders[0].ReturnVal !== 0 && this.props.allmerchantorders[0].ReturnVal === undefined ?
                  this.state.isFiltered === false ?
                    this.props.allmerchantorders.filter((x) => x.TrackingStatus === this.state.TrackingStatus).map((a) => {
                      orders.push(a)
                    })
                    : this.state.filteredList.filter((x) => x.TrackingStatus === this.state.TrackingStatus).map((a) => {
                      orders.push(a)
                    })
                  : ""
                }
                {console.log("THIS IS ORDER11", orders)}
                {
                  this.props.allmerchantorders.length > 0 && this.props.allmerchantorders[0].ReturnVal !== 0 && this.props.allmerchantorders[0].ReturnVal === undefined ?
                    this.state.TrackingStatus === "-" ?
                      this.state.isFiltered === false ?
                        orderDetailListing(this.props.allmerchantorders)
                        : orderDetailListing(this.state.filteredList)
                      : orderDetailListing(orders) : ""
                }
              </tbody>
            </table>
          </div>
        </div>
        <div id={"footer" + index} className="card-footer">
          {
            this.props.allmerchantorders.length > 0 && this.props.allmerchantorders[0].ReturnVal !== 0 && this.props.allmerchantorders[0].ReturnVal === undefined ?

              <Pagination
                current={page}
                total={
                  this.state.TrackingStatus === "-" ?
                    this.state.isFiltered === false ?
                      Math.ceil(this.props.allmerchantorders.length / this.state.rowsPerPage)
                      : Math.ceil(this.state.filteredList.length / this.state.rowsPerPage)
                    :
                    Math.ceil(orders.length / this.state.rowsPerPage)
                }
                onPageChange={this.handlePageChange}
              />
              :
              <div style={{ textAlign: "center", marginBottom: "20px" }} >
                <div style={{ marginBottom: "20px" }}>
                  Seem like you haven purchase anything yet
                </div>
                <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
              </div >
          }
        </div>
      </div>
    );

    return (
      <div className="card p-3">
        <Helmet>
          <title>{`Order History — ${theme.name}`}</title>
        </Helmet>
        <h5>Order History</h5>
        <div className="row text-center">
          <div className="col-lg-5 col-md-5 col-sm-12 mb-2">
            <TextField
              id="standard-helperText"
              label="Tracking Number"
              variant="standard"
              onChange={(x) => this.handleTrackingNoChange(x.target.value)}
              style={{
                width: '100%'
              }}
            />
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 mb-2">
            <DatePicker
              size="small"
              placeholderText="Select Date"
              onChange={(e) => this.handleDateChange(e)}
              value={this.state.selectedDate}
              className={`w-100`}
            />
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12 mb-2">
            <Button
              onClick={() => this.clearFilter()}
            >
              Clear
            </Button>
          </div>
        </div>
        <div>
          <Box sx={{ bgcolor: 'background.paper', width: "100%" }}>
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
                <Tab label="Confirm Payment" {...a11yProps(1)} />
                <Tab label="In Shipping" {...a11yProps(2)} />
                <Tab label="To Receive" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeTabIndex}
            >
              {/* ---------------------------------------------------- All ----------------------------------------------------- */}
              <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                {this.state.value === 0 && orderListing(0)}
              </TabPanel>
              {/* ---------------------------------------------------- In Cart ----------------------------------------------------- */}
              <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                {this.state.value === 1 && orderListing(1)}
              </TabPanel>

              {/* ----------------------------------------- In Purchasing ----------------------------------------------------------- */}
              <TabPanel value={this.state.value} index={2} dir={theme.direction}>
                {this.state.value === 2 && orderListing(2)}
              </TabPanel>

              {/* -------------------------------------------- In Shipping -------------------------------------------------------- */}
              <TabPanel value={this.state.value} index={3} dir={theme.direction}>
                {this.state.value === 3 && orderListing(3)}
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageOrders);
