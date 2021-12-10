import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Card, CardContent, CardActions } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "date-fns";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

function mapStateToProps(state) {
  return {
    allpromos: state.counterReducer["promos"],
    allproducts: state.counterReducer["products"],
    PromoCodes: state.counterReducer["addPromoCodes"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callGetPromos: () => dispatch(GitAction.CallGetPromo()),
    // CallAllProductsByProductStatus: (prodData) =>
    //   dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallAddPromoCode: (promoCodeData) =>
      dispatch(GitAction.CallAddPromoCode(promoCodeData)),
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(
    props.allProducts.map((product) => product.ProductName)
  );
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const updateSearch = (title, e) => {
    if (title == "Products Left") {
      props.setSearchValue(e.target.value, "add");
    } else if (title == "Chosen Products") {
      props.setSearchValue(e.target.value, "remove");
    }
  };

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.search("add"), 0);
    return () => clearTimeout(timeOutId);
  }, [props.searchWordAdd]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.search("remove"), 0);
    return () => clearTimeout(timeOutId);
  }, [props.searchWordRemove]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.setChosenProducts(right, left), 0);
    return () => clearTimeout(timeOutId);
  }, [right]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () => setLeft(props.allProducts.map((product) => product.ProductName)),
      0
    );
    return () => clearTimeout(timeOutId);
  }, [props.allProducts]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setRight(
          props.fullChosenProducts.map((product) => product.ProductName)
        ),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [props.fullChosenProducts]);

  const customList = (title, items, valueToBeUsed, allItems) => (
    <Card>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Input
          style={{ width: "80%", marginBottom: "5px" }}
          id="input-with-icon-adornment"
          value={valueToBeUsed}
          onChange={updateSearch.bind(this, title)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />

      <Divider />

      <List className={classes.list} dense component="div" role="list">
        {items.map((value, i) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
                <img
                  style={{ margin: "10px" }}
                  height={50}
                  //   src={JSON.parse(allItems[i].ProductImages)[0].ProductMediaUrl}
                  src={allItems[i]}
                />
              </ListItemIcon>

              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        {customList(
          "Products Left",
          left,
          props.searchWordAdd,
          props.imagesLeft
        )}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {customList(
          "Chosen Products",
          right,
          props.searchWordRemove,
          props.imagesChosen
        )}
      </Grid>
    </Grid>
  );
}
class AddProductVoucherComponent extends Component {
  constructor(props) {
    super(props);
    this.props.callGetPromos();
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: "Endorsed",
    //   UserID: window.localStorage.getItem("id"),
    // });
  }

  state = {
    promo: "", //promotion selected
    promoCode: "", // the promo code to be sent if included
    productsDisplayed: [],
    searchWordAdd: "",
    searchWordRemove: "",
    chosenProducts: [],
    chosenProductsNames: [],
    fullChosenProducts: [],
    fullChosenProductsBackup: [], //final products chosen to be sent
    productsLeft: [],
    promoNotSelected: false,
    productsAreNotChosen: false,
    startDateNotSet: false,
    endDateNotSet: false,
    promoStart: new Date().toLocaleString(),
    promoEnd: new Date().toLocaleString(),
    startDateForTextView: new Date(),
    endDateForTextView: new Date(),
    startDateInvalid: false,
    endDateInvalid: false,
    imagesChosen: [],
    imagesLeft: [],
  };

  handleChange = (data, e) => {
    if (data == "promotion") {
      this.setState({
        promo: e.target.value,
      });
      setTimeout(
        function () {
          this.checkPromoChosen();
        }.bind(this),
        200
      );
    } else if (data == "promoCode") {
      this.setState({
        promoCode: e.target.value,
      });
    } else if (data == "startDate") {
      if (e != null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var startDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            e.getDate();

          this.setState({
            startDateForTextView: e,
            promoStart: startDate,
          });
        } else {
          this.setState({
            startDateForTextView: e,
            promoStart: "",
          });
        }
      } else {
        this.setState({
          promoStart: "",
        });
      }

      setTimeout(
        function () {
          this.checkStartDate();
        }.bind(this),
        200
      );
      setTimeout(
        function () {
          this.checkEndDate();
        }.bind(this),
        200
      );
    } else if (data == "endDate") {
      if (e != null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var endDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            e.getDate();

          this.setState({
            endDateForTextView: e,
            promoEnd: endDate,
          });
        } else {
          this.setState({
            endDateForTextView: e,
            promoEnd: "",
          });
        }
      } else {
        this.setState({
          promoEnd: "",
        });
      }

      setTimeout(
        function () {
          this.checkEndDate();
        }.bind(this),
        200
      );
      setTimeout(
        function () {
          this.checkStartDate();
        }.bind(this),
        200
      );
    }
  };

  checkPromoChosen = () => {
    if (this.state.promo == "") {
      this.setState({
        promoNotSelected: true,
      });
    } else {
      this.setState({
        promoNotSelected: false,
      });
    }
  };

  checkStartDate = () => {
    if (
      this.state.startDateForTextView == "" ||
      this.state.startDateForTextView == null
    ) {
      this.setState({
        startDateNotSet: true,
      });
    } else {
      this.setState({
        startDateNotSet: false,
      });
    }

    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = parseInt(currentDate.getMonth() + 1);

    var currentYear = currentDate.getFullYear();

    if (currentYear > this.state.startDateForTextView.getFullYear()) {
      this.setState({
        startDateInvalid: true,
      });
    } else if (currentYear == this.state.startDateForTextView.getFullYear()) {
      if (currentMonth > this.state.startDateForTextView.getMonth() + 1) {
        this.setState({
          startDateInvalid: true,
        });
      } else if (
        currentMonth ==
        this.state.startDateForTextView.getMonth() + 1
      ) {
        if (currentDay > this.state.startDateForTextView.getDate()) {
          this.setState({
            startDateInvalid: true,
          });
        } else {
          this.setState({
            startDateInvalid: false,
          });
        }
      } else {
        this.setState({
          startDateInvalid: false,
        });
      }
    } else {
      this.setState({
        startDateInvalid: false,
      });
    }
  };

  checkEndDate = () => {
    if (
      this.state.endDateForTextView == "" ||
      this.state.endDateForTextView == null
    ) {
      this.setState({
        endDateNotSet: true,
      });
    } else {
      this.setState({
        endDateNotSet: false,
      });
    }

    var startDay = this.state.startDateForTextView.getDate();
    var startMonth = parseInt(this.state.startDateForTextView.getMonth() + 1);

    var startYear = this.state.startDateForTextView.getFullYear();

    if (startYear > this.state.endDateForTextView.getFullYear()) {
      this.setState({
        endDateInvalid: true,
      });
    } else if (startYear == this.state.endDateForTextView.getFullYear()) {
      if (startMonth > this.state.endDateForTextView.getMonth() + 1) {
        this.setState({
          endDateInvalid: true,
        });
      } else if (startMonth == this.state.endDateForTextView.getMonth() + 1) {
        if (startDay > this.state.endDateForTextView.getDate()) {
          this.setState({
            endDateInvalid: true,
          });
        } else {
          this.setState({
            endDateInvalid: false,
          });
        }
      } else {
        this.setState({
          startDateInvalid: false,
        });
      }
    } else {
      this.setState({
        startDateInvalid: false,
      });
    }
  };

  checkProductsAreChosen = () => {
    if (this.state.fullChosenProductsBackup.length > 0) {
      this.setState({
        productsAreNotChosen: false,
      });
    } else {
      this.setState({
        productsAreNotChosen: true,
      });
    }
  };

  checkValues = () => {
    this.checkPromoChosen();
    this.checkProductsAreChosen();
    this.checkEndDate();
    this.checkStartDate();

    setTimeout(
      function () {
        this.submitValues();
      }.bind(this),
      1000
    );
  };

  makeid = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.setState({
      promoCode: text,
    });
  };
  submitValues = () => {
    if (
      !(
        this.state.promoNotSelected ||
        this.state.productsAreNotChosen ||
        this.state.startDateNotSet ||
        this.state.endDateNotSet ||
        this.state.startDateInvalid ||
        this.state.endDateInvalid
      )
    ) {
      var ProductIDOnly = [];
      this.state.fullChosenProductsBackup.map((product) => {
        ProductIDOnly.push(product.ProductID);
      });

      var endDate =
        this.state.endDateForTextView.getFullYear() +
        "" +
        (this.state.endDateForTextView.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.endDateForTextView.getMonth() + 1) +
        "" +
        ((this.state.endDateForTextView.getDate() < 10 ? "0" : "") +
          this.state.endDateForTextView.getDate());

      var startDate =
        this.state.startDateForTextView.getFullYear() +
        "" +
        (this.state.startDateForTextView.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.startDateForTextView.getMonth() + 1) +
        "" +
        ((this.state.startDateForTextView.getDate() < 10 ? "0" : "") +
          this.state.startDateForTextView.getDate());

      if (this.state.promoCode == "") {
        this.makeid();
      }
      const promoInfo = {
        productID: ProductIDOnly,
        promo: this.state.promo,
        promoStart: startDate,
        promoEnd: endDate,
        promoCode: this.state.promoCode,
      };
      setTimeout(
        function () {
          this.props.CallAddPromoCode(promoInfo);
        }.bind(this),
        500
      );
      setTimeout(
        function () {
          this.props.history.push("/viewPromoCodes");
          window.location.reload(false);
        }.bind(this),
        500
      );
    }
  };

  render() {
    let allProductsData = this.props.allproducts
      ? Object.keys(this.props.allproducts).map((key) => {
          return this.props.allproducts[key];
        })
      : {};

    let allpromosData = this.props.allpromos
      ? Object.keys(this.props.allpromos).map((key) => {
          return this.props.allpromos[key];
        })
      : {};
    if (allpromosData.length > 0) {
      var createMenusForDropDownPromos = allpromosData.map((d, i) => {
        return <option value={d.PromotionID}>{d.PromotionTitle}</option>;
      });
    }

    const Search = (type) => {
      var newList = [];
      if (type == "add") {
        newList = allProductsData;

        newList.map((productLeft) => {
          this.state.fullChosenProducts.map((chosen) => {
            if (productLeft.ProductName != chosen.ProductName) {
              newList = newList.filter(
                (item) => item.ProductName != chosen.ProductName
              );
            }
          });
        });

        var items = [];
        newList.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordAdd.toLowerCase()
            )
          ) {
            items.push(product);
          }
        });
        var newItemsImages = items.map(
          (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
        );
        this.setState({
          productsDisplayed: items,
          imagesLeft: newItemsImages,
        });
      } else if (type == "remove") {
        var chosenItems = allProductsData;
        this.state.productsLeft.map((product) => {
          chosenItems = chosenItems.filter(
            (listItem) => listItem.ProductName != product
          );
        });
        chosenItems.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordRemove.toLowerCase()
            )
          ) {
            newList.push(product);
          }
        });
        var newProductListImages = newList.map(
          (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
        );
        this.setState({
          fullChosenProducts: newList,
          fullChosenProductsBackup: chosenItems,
          imagesChosen: newProductListImages,
        });
      }
    };

    const setSearchValue = (value, type) => {
      if (type == "add") {
        this.setState({
          searchWordAdd: value,
        });
      } else if (type == "remove") {
        this.setState({
          searchWordRemove: value,
        });
      }
    };

    const setChosenProducts = (chosen, left) => {
      this.setState({
        chosenProductsNames: chosen,
        productsLeft: left,
      });
      setFullChosenProduct();
    };

    const setFullChosenProduct = () => {
      var newProductList = [];
      this.state.chosenProductsNames.map((chosenProduct) => {
        allProductsData.map((product) => {
          if (product.ProductName == chosenProduct) {
            newProductList.push(product);
          }
        });
      });
      var newList = [];
      var chosenItems = allProductsData;
      this.state.productsLeft.map((product) => {
        chosenItems = chosenItems.filter(
          (listItem) => listItem.ProductName != product
        );
      });
      chosenItems.map((product) => {
        if (
          product.ProductName.toLowerCase().includes(
            this.state.searchWordRemove.toLowerCase()
          )
        ) {
          newList.push(product);
        }
      });

      var newProductListImages = newProductList.map(
        (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
      );
      var ItemsLeft = allProductsData;
      newProductList.map((productItem) => {
        ItemsLeft = ItemsLeft.filter(
          (items) => items.ProductName !== productItem.ProductName
        );
      });

      var leftImages = ItemsLeft.map(
        (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
      );

      this.setState({
        fullChosenProducts: newProductList,
        fullChosenProductsBackup: newList,
        imagesChosen: newProductListImages,
        imagesLeft: leftImages,
      });
      if (this.state.productsAreNotChosen) {
        setTimeout(
          function () {
            this.checkProductsAreChosen();
          }.bind(this),
          200
        );
      }
    };

    const back = () => {
      this.props.history.push("/viewPromoCodes");
    };

    return (
      <div>
        <h2 style={{ margin: "10px" }}>Add Promo Code</h2>
        <Button onClick={back}>
          <i class="fas fa-chevron-left"></i>Back
        </Button>
        <Card style={{ width: "80%", margin: "0 auto" }}>
          <CardContent>
            <FormControl
              style={{ width: "100%" }}
              error={this.state.promoNotSelected}
            >
              <InputLabel htmlFor="simple-select">Promotion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                inputProps={{
                  name: "promotions",
                  id: "simple-select",
                }}
                value={this.state.promo}
                onChange={this.handleChange.bind(this, "promotion")}
              >
                <option aria-label="None" value="" />
                {createMenusForDropDownPromos}
              </Select>
            </FormControl>
            {this.state.promoNotSelected && (
              <p style={{ color: "red" }}>A promotion has to be selected.</p>
            )}

            <FormControl style={{ width: "100%", marginTop: "10px" }}>
              <InputLabel htmlFor="component-helper">Promotion Code</InputLabel>
              <Input
                id="component-helper"
                value={this.state.promoCode}
                onChange={this.handleChange.bind(this, "promoCode")}
                aria-describedby="component-helper-text"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FormHelperText id="component-helper-text">
                  {"*Optional"}
                </FormHelperText>
                <FormHelperText id="component-helper-text">
                  {
                    "Note: If no value is keyed in a random code will be generated to be used."
                  }
                </FormHelperText>
              </div>
            </FormControl>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ width: "100%", margin: "10px" }}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={this.state.startDateForTextView}
                    onChange={this.handleChange.bind(this, "startDate")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    style={{ width: "100%" }}
                    error={
                      this.state.startDateNotSet || this.state.startDateInvalid
                    }
                  />
                  {this.state.startDateNotSet || this.state.startDateInvalid ? (
                    <FormHelperText style={{ color: "red" }}>
                      Please enter a valid start date.
                    </FormHelperText>
                  ) : null}
                </div>
                <div style={{ width: "100%", margin: "10px" }}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End Date"
                    value={this.state.endDateForTextView}
                    onChange={this.handleChange.bind(this, "endDate")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    style={{ width: "100%" }}
                    error={
                      this.state.endDateNotSet || this.state.endDateInvalid
                    }
                  />
                  {this.state.endDateNotSet || this.state.endDateInvalid ? (
                    <FormHelperText style={{ color: "red" }}>
                      Please enter a valid end date.
                    </FormHelperText>
                  ) : null}
                </div>
              </MuiPickersUtilsProvider>
            </div>
            <InputLabel style={{ marginTop: "20px" }}>
              Select the products for the promotion
            </InputLabel>
            <TransferList
              allProducts={this.state.productsDisplayed}
              search={Search}
              searchWordAdd={this.state.searchWordAdd}
              setSearchValue={setSearchValue}
              searchWordRemove={this.state.searchWordRemove}
              setChosenProducts={setChosenProducts}
              chosenProducts={this.state.chosenProductsNames}
              fullChosenProducts={this.state.fullChosenProducts}
              imagesChosen={this.state.imagesChosen}
              imagesLeft={this.state.imagesLeft}
            />
            {this.state.productsAreNotChosen ? (
              <FormHelperText style={{ color: "red" }}>
                Have to have at least one product chosen.
              </FormHelperText>
            ) : null}
          </CardContent>
          <div style={{ width: "100%", textAlign: "center", margin: "10px" }}>
            <Button variant="outlined" onClick={this.checkValues.bind(this)}>
              Submit
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductVoucherComponent);
