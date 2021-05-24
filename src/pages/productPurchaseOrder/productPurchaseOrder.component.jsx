import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GitAction } from "../../store/action/gitAction";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import logo from "../../assets/logo_white_word.png";
import PDF from "./productPurchaseOrderPDF.component";
import { CardMedia } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Logo from "../../assets/myshops.png";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["supplier"],
    allstocks: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductsByProductStatus: (prodData) =>
      dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    callAllSupplierByUserStatus: (suppData) =>
      dispatch(GitAction.CallAllSupplierByUserStatus(suppData)),
    CallAddProductPurchaseOrder: (prodData) =>
      dispatch(GitAction.CallAddProductPurchaseOrder(prodData)),
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
  console.log(props.allProducts);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(
    props.allProducts.map((product) => product.ProductName)
  );
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [InputValue, setValue] = React.useState([]);
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

  const handleInputChange = (e, index) => {
    console.log(InputValue);
    let newSelected = InputValue;
    newSelected[index] = Number(e.target.value);
    setValue(newSelected);
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
    const timeOutId = setTimeout(
      () => props.setChosenProducts(right, left, InputValue),
      0
    );
    return () => clearTimeout(timeOutId);
  }, [right]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () => setLeft(props.allProducts.map((product) => product.ProductName)),
      0
    );
    return () => clearTimeout(timeOutId);
  }, [props.allProducts]);

  // React.useEffect(() => {
  //   const timeOutId = setTimeout(
  //     () =>
  //       setRight(
  //         props.fullChosenProducts.map((product) => product.ProductName)
  //       ),
  //     0
  //   );
  //   return () => clearTimeout(timeOutId);
  // }, [props.fullChosenProducts]);

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
                  src={allItems[i].ProductImage}
                  // src={allItems[i]}
                />
              </ListItemIcon>

              <ListItemText id={labelId} primary={value} />
              {title == "Chosen Products" ? (
                <Input
                  className={classes.input}
                  value={InputValue[i]}
                  margin="dense"
                  onChange={(e) => handleInputChange(e, i)}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 1000,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              ) : (
                ""
              )}
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
          props.allProducts
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
          props.allProducts
        )}
      </Grid>
    </Grid>
  );
}

class ProductPurchaseOrderComponent extends Component {
  constructor(props) {
    super(props);
    // this.generatePO = this.generatePO.bind(this);
    this.state = {
      postSubmitted: false,
      productSupplier: "",
      productSupplierEmpty: false,
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
      productList: [],
      SelectedProductID: [],
      SelectedProductStock: [],
      productsDisplayed: [],
      searchWordAdd: "",
      searchWordRemove: "",
      chosenProducts: [],
      chosenProductsNames: [],
      fullChosenProducts: [],
      fullChosenProductsBackup: [], //final products chosen to be sent
      productsLeft: [],
    };
    this.props.callAllSupplierByUserStatus("Endorsed");
  }

  handleChange(data, e) {
    this.props.CallAllProductsByProductStatus({
      ProductStatus: "Endorsed",
      UserID: e.target.value,
    });
    this.setState({
      UserID: e.target.value,
      productSupplier: e.target.value,
    });
  }

  checkValues = () => {
    setTimeout(
      function () {
        this.submitValues();
      }.bind(this),
      1000
    );
  };

  submitValues = () => {
    var ProductIDOnly = [];
    this.state.fullChosenProductsBackup.map((product) => {
      ProductIDOnly.push(product.ProductID);
    });
    const promoInfo = {
      SupplierID: this.state.productSupplier,
      ProductID: ProductIDOnly,
      ProductStock: this.state.SelectedProductStock,
    };
    console.log(promoInfo);
    this.props.CallAddProductPurchaseOrder(promoInfo);
  };

  render() {
    let allProductsData = this.props.allstocks
      ? Object.keys(this.props.allstocks).map((key) => {
          return this.props.allstocks[key];
        })
      : {};

    let allusersData = this.props.allUser
      ? Object.keys(this.props.allUser).map((key) => {
          return this.props.allUser[key];
        })
      : {};

    if (allusersData.length > 0) {
      var createMenusForDropDownUsers = allusersData.map((d, i) => {
        return (
          <option value={d.UserID}>
            {d.FirstName + d.LastName} ({d.CompanyName})
          </option>
        );
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

    const setChosenProducts = (chosen, left, InputValue) => {
      this.setState({
        chosenProductsNames: chosen,
        productsLeft: left,
        SelectedProductStock: InputValue,
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

    return (
      <div style={{ width: "100%" }}>
        {!this.state.postSubmitted ? (
          <div style={{ margin: "2%" }}>
            <Select
              value={this.state.productSupplier}
              onChange={this.handleChange.bind(this, "Product Supplier")}
              inputProps={{
                name: "Product Supplier",
                id: "productSupplier",
              }}
              style={{ width: "100%" }}
              error={this.state.productSupplierEmpty}
            >
              {createMenusForDropDownUsers}
            </Select>
            <TransferList
              allProducts={this.props.allstocks}
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
            <div style={{ width: "100%", textAlign: "center", margin: "10px" }}>
              <Button variant="outlined" onClick={this.checkValues.bind(this)}>
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <PDF title={this.state.ProductName} content={this.state} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPurchaseOrderComponent);
