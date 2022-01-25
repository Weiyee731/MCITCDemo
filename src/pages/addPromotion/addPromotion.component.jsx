import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import { toast } from "react-toastify";
//---------------------------------- TABLE THINGS ---------------------------------------------------
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Input from "@material-ui/core/Input";
import Logo from "../../assets/Emporia.png";
// -------------------------------------------------ADD PRODUCT THINGS--------------------------------------------------------
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import InputLabel from "@material-ui/core/InputLabel";
//------------------------------------------------------------------- DatePicker-----------------------------------------------
import DatePicker from 'react-date-picker'

import moment from "moment";
//---------------------------------- ADD IMAGE THINGS ---------------------------------------------------
import { DropzoneArea } from "material-ui-dropzone";
import Dropzone from "react-dropzone";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";

//----------------------------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    Promotion: state.counterReducer["addPromo"], // Add data to Promotion
    // allstocks: state.counterReducer["products"],

    allproducts: state.counterReducer["productsListing"],
    promotionBannerReturn: state.counterReducer["promotionBannerReturn"],
    // productsListing: state.counterReducer["productsListing"],
  };
}

// ------------------------------------------- Call call-----------------------------------------------
function mapDispatchToProps(dispatch) {
  return {
    CallClearPromotion: () => dispatch(GitAction.CallClearPromotion()),
    CallAddPromotion: (promoData) => dispatch(GitAction.CallAddPromotion(promoData)), // To add data
    CallAllProductsListing: (prodData) => dispatch(GitAction.CallAllProductsListing(prodData)), // To call Product List For Promotion Product
  };
}

//------------------------------------- Table Component ------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    margin: "auto",
    padding: "1%",
    // paddingRight: "1%",
    marginTop: "15px",
  },
  table: {
    // margin: "20px",
    minWidth: 750,
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

// ------------------------------------------- Add Product Transfer List ------------------------------------------------------

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
    props.allProducts !== null && props.allProducts.length > 0 &&
    (props.allProducts).map((product) =>
      product.ProductName
    )
  );

  const [right, setRight] = React.useState([]);
  const [LeftImages, setLeftImage] = React.useState(props);
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
    props.setChosen(leftChecked, "add")
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    props.setChosen(rightChecked, "remove")
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

  }, [], [right]);

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


  // React.useEffect(()=>{
  //   setLeftImage([LeftImages, ...props.imageLeft])
  // },[], [LeftImages])

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
      <List className={classes.list} dense component="div" role="list" style={{ width: "500px", height: "300px" }}>
        {items.length > 0 && items.map((value, i) => {
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

                {/* <img src={props.allProducts[i] !== undefined && props.allProducts[i].ProductImage !== null ? props.allProducts[i].ProductImage : Logo}
                  height={50}
                  width={50}
                  alt={value} onError={(e) => (e.target.src = Logo)} /> */}
                {/* <img src={allItems.length > 0 && allItems[i] !== null ? allItems[i] : Logo}
                  height={50}
                  width={50}
                  alt={value} onError={(e) => (e.target.src = Logo)} /> */}
              </ListItemIcon>
              <ListItemText style={{ paddingLeft: "10px" }} id={labelId} primary={value} />
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
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        {customList(
          "Products Left",
          left,
          props.searchWordAdd,
          props.imageLeft
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
          props.imageChosen
        )}
      </Grid>
    </Grid>
  );
}
// ------------------------------------------------------------------------------------------------

const SelectProductTableToolbar = (props) => {
  const classes = useStyles();

  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          Please select the products that you want to promote.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Add">
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

SelectProductTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

class AddPromotionBannerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "productName",
      page: 0,
      dense: false,
      rowsPerPage: 5,
      searchFilter: "",
      Amount: [],
      PromotionTitle: "",
      PromotionDesc: "",
      DiscountPercentage: null,
      isDetailsSet: false,

      file: [],

      productsDisplayed: [],
      filteredProduct: [],
      isFiltered: false,
      filteredChosenProduct: [],
      productsChoosen: [],
      isChosenFiltered: false,

      // productsDisplayed: [],
      // productsChoosen: [],
      ProductID: [], //ADD PRODUCT
      fullChosenProducts: [],
      fullChosenProductsBackup: [], //final products chosen to be sent
      chosenProducts: [],
      chosenProductsNames: [],
      imagesLeft: [],
      imagesChosen: [],
      productsLeft: [],

      promoStart: new Date().toLocaleString(),
      promoEnd: new Date().toLocaleString(),
      PromotionStartDate: new Date(),
      PromotionEndDate: new Date(),

      searchWordAdd: "",
      searchWordRemove: "",
      startDateNotSet: false,
      startDateInvalid: false,
      endDateNotSet: false,
      endDateInvalid: false,
      PromotionTitleEmpty: false,
      PromotionDescEmpty: false,
      productsAreNotChosen: false,
      promotionDiscountNotSet: false,

      mediaAlert: false,
      isPromoSubmit: false

    };

    this.uploadHandler = this.uploadHandler.bind(this);
    // this.setProductChosen = this.setProductChosen.bind(this)

    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: "Endorsed",
    //   UserID: window.localStorage.getItem("id"),
    // });

    this.props.CallAllProductsListing({
      type: "Merchant",
      typeValue: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
      userId: localStorage.getItem("isLogin") === true ? localStorage.getItem("id") : 0,
      productPage: 999,
      page: 1,
    })
  }

  uploadHandler(e) {
    this.setState({ file: e });
  }

  handleChange(data, e) {
    if (data === "PromotionTitle") {
      this.setState({
        PromotionTitle: e.target.value,
      });
    } else if (data === "PromotionDesc") {
      this.setState({
        PromotionDesc: e.target.value,
      });
    } else if (data === "PromotionStartDate") {
      if (e != null) {
        if (moment(e, "dd/MM/yyyy", true).isValid()) {
          var StartDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            ((e.getDate() < 10 ? "0" : "") + e.getDate());
          this.setState({
            PromotionStartDate: e,
            promoStart: StartDate,
          });
        } else {
          this.setState({
            PromotionEndDate: e,
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
    } else if (data === "PromotionEndDate") {
      if (e != null) {
        if (moment(e, "dd/MM/yyyy", true).isValid()) {
          var EndDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            ((e.getDate() < 10 ? "0" : "") + e.getDate());

          this.setState({
            PromotionEndDate: e,
            promoEnd: EndDate,
          });
        } else {
          this.setState({
            PromotionEndDate: e,
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
    } else if (data === "DiscountPercentage") {
      this.setState({
        DiscountPercentage: e.target.value,
      });
    }
    // else if (data === "ProductID") {
    //   this.setState({
    //     ProductID: e.target.value,
    //   });
    // }
  }

  // --------------------------------------------------------- Error Validation --------------------------------------------------
  checkStartDate = () => {
    if (
      this.state.PromotionStartDate === "" ||
      this.state.PromotionStartDate === null
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
    var currentDay =
      (currentDate.getDate() < 10 ? "0" : "") + currentDate.getDate();
    var currentMonth = parseInt(currentDate.getMonth() + 1);

    var currentYear = currentDate.getFullYear();

    if (currentYear > this.state.PromotionStartDate.getFullYear()) {
    } else if (currentYear === this.state.PromotionStartDate.getFullYear()) {
      if (currentMonth > this.state.PromotionStartDate.getMonth() + 1) {
        this.setState({
          startDateInvalid: true,
        });
      } else if (
        currentMonth ===
        this.state.PromotionStartDate.getMonth() + 1
      ) {
        if (currentDay > this.state.PromotionStartDate.getDate()) {
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
      this.state.PromotionEndDate === "" ||
      this.state.PromotionEndDate == null
    ) {
      this.setState({
        endDateNotSet: true,
      });
    } else {
      this.setState({
        endDateNotSet: false,
      });
    }

    var startDay =
      (this.state.PromotionStartDate.getDate() < 10 ? "0" : "") +
      this.state.PromotionStartDate.getDate();
    var startMonth = parseInt(this.state.PromotionStartDate.getMonth() + 1);

    var startYear = this.state.PromotionStartDate.getFullYear();

    if (startYear > this.state.PromotionEndDate.getFullYear()) {
      this.setState({
        endDateInvalid: true,
      });
    } else if (startYear === this.state.PromotionEndDate.getFullYear()) {
      if (startMonth > this.state.PromotionEndDate.getMonth() + 1) {
        this.setState({
          endDateInvalid: true,
        });
      } else if (startMonth === this.state.PromotionEndDate.getMonth() + 1) {
        if (startDay > this.state.PromotionEndDate.getDate()) {
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

  checkPromotionTitle = () => {
    if (this.state.PromotionTitle == "") {
      this.setState({
        PromotionTitleEmpty: true,
      });
    } else {
      this.setState({
        PromotionTitleEmpty: false,
      });
    }
  };

  checkPromotionDesc = () => {
    if (this.state.PromotionDesc == "") {
      this.setState({
        PromotionDescEmpty: true,
      });
    } else {
      this.setState({
        PromotionDescEmpty: false,
      });
    }
  };

  checkPromotionDiscount = () => {
    if (
      this.state.DiscountPercentage === "" ||
      this.state.DiscountPercentage === null
    ) {
      this.setState({
        promotionDiscountNotSet: true,
      });
    } else {
      this.setState({
        promotionDiscountNotSet: false,
      });
    }
  };

  checkProductsAreChosen = () => {
    if (this.state.productsChoosen.length > 0) {
      this.setState({
        productsAreNotChosen: false,
      });
    } else {
      this.setState({
        productsAreNotChosen: true,
      });
    }
  };

  // --------------------------------------------------------Check Everything------------------------------------------------------------------

  checkValues = () => {
    this.checkPromotionTitle(); //check promotion title
    this.checkStartDate(); //check promotion start date
    this.checkEndDate(); //check promotion end date
    this.checkPromotionDiscount(); //checkDiscount
    this.checkPromotionDesc(); //check PromotionDescription
    this.checkProductsAreChosen();

    setTimeout(
      function () {
        this.submitValues();
      }.bind(this),
      1000
    );
  };

  // -------------------------------------------------- Send Data Method 1---------------------------------------------------------------------

  submitValues = () => {
    if (
      !(
        this.state.PromotionTitleEmpty ||
        this.state.productsAreNotChosen ||
        this.state.startDateNotSet ||
        this.state.endDateNotSet ||
        this.state.startDateInvalid ||
        this.state.endDateInvalid ||
        this.state.PromotionDescEmpty ||
        this.state.promotionDiscountNotSet ||
        this.state.file.length === 0
      )
    ) {
      var ProductIDOnly = [];
      this.state.productsChoosen.map((product) => {
        ProductIDOnly.push(product.ProductID);
      });

      var EndDate =
        this.state.PromotionEndDate.getFullYear() +
        "" +
        (this.state.PromotionEndDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionEndDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionEndDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionEndDate.getDate());

      var StartDate =
        this.state.PromotionStartDate.getFullYear() +
        "" +
        (this.state.PromotionStartDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionStartDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionStartDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionStartDate.getDate());



      //============= Promotion Content and Promotion Banner Updator =============

      const formData = new FormData();

      //============= Set BannerImage Name by Date + Time =============
      var today = new Date();
      var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
      var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
      var BannerImage = date + '_' + time;

      const promoInfo = {
        ProductID: ProductIDOnly,
        PromotionDesc: this.state.PromotionDesc,
        PromotionTitle: this.state.PromotionTitle,
        BannerImage: BannerImage + ".jpg",
        SlideOrder: 1,
        PromotionStartDate: StartDate,
        PromotionEndDate: EndDate,
        DiscountPercentage: this.state.DiscountPercentage,
      };

      formData.append("imageFile", this.state.file[0]);
      formData.append("imageName", BannerImage);
      let url = "https://myemporia.my/emporiaimage/uploadpromotion.php"
      axios.post(url, formData, {}).then(res => {
        if (res.status === 200) {
          this.props.CallAddPromotion(promoInfo)
          this.setState({ isPromoSubmit: true })
        }
        else {
          toast.error("Res Status error.");
        }
      });
    }
    else {
      toast.error("Please fill in all required details");
      if (this.state.file.length === 0)
        this.setState({ mediaAlert: true })
    }
  };

  componentDidUpdate() {
    // to capture the photo is successfully save into the database, then reload if success
    if (this.props.Promotion !== undefined && this.state.isPromoSubmit === true) {
      if (this.props.Promotion.length > 0) {
        if (this.props.Promotion[0].ReturnVal === 1) {
          // this.props.CallClearPromotion()
        }
      }
      else {
        toast.success("Promotion Banner Added Successfully.")
        // window.location.href = '/viewProductPromotion';
      }
    }
  }

  render() {

    let allProductsData = {}
    if (this.props.allproducts !== null && this.props.allproducts.length > 0) {
      allProductsData = JSON.parse(this.props.allproducts)
        ? Object.keys(JSON.parse(this.props.allproducts)).map((key) => {
          return JSON.parse(this.props.allproducts)[key];
        })
        : {};
    }

    if (this.state.isDetailsSet === false && allProductsData.length > 0) {
      this.setState({ productsDisplayed: allProductsData, isDetailsSet: true })
    }

    const setProductChosen = (value, type) => {
      let filteredSameListing = []
      let filterDiffListing = []
      let listing = []

      if (type === "add")
        listing = this.state.productsDisplayed
      else
        listing = this.state.productsChoosen

      value.length > 0 && value.map((data) => {

        listing.filter((x) => x.ProductName === data).map((filteredData) => {
          filteredSameListing.push(filteredData)
        })
        if (filterDiffListing.length === 0) {
          listing.filter((x) => x.ProductName !== data).map((filteredData) => {
            filterDiffListing.push(filteredData)
          })
        }
        else
          filterDiffListing = filterDiffListing.filter((x) => x.ProductName !== data)
      })

      if (type === "add")
        this.setState({ productsDisplayed: filterDiffListing, productsChoosen: this.state.productsChoosen.concat(filteredSameListing) })

      else
        this.setState({ productsChoosen: filterDiffListing, productsDisplayed: this.state.productsDisplayed.concat(filteredSameListing) })
    }

    const Search = (type) => {
      var newList = [];
      if (type == "add") {


        newList = this.state.productsDisplayed;
        newList.length > 0 && newList.map((productLeft) => {
          this.state.fullChosenProducts.map((chosen) => {
            if (productLeft.ProductName != chosen.ProductName) {
              newList = newList.filter(
                (item) => item.ProductName != chosen.ProductName
              );
            }
          });
        });

        var items = [];
        newList.length > 0 && newList.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordAdd.toLowerCase()
            )
          ) {
            items.push(product);
          }
        });
        if (items) {
          var newItemsImages = items.length > 0 && items.map(
            (images) => images.ProductImage
          );
        }

        this.setState({
          filteredProduct: items,
          imagesLeft: newItemsImages,
          isFiltered: true
        });
      } else if (type == "remove") {
        var chosenItems = this.state.productsChoosen;
        this.state.productsLeft.length > 0 && this.state.productsLeft.map((product) => {
          chosenItems = chosenItems.filter(
            (listItem) => listItem.ProductName != product
          );
        });
        chosenItems.length > 0 && chosenItems.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordRemove.toLowerCase()
            )
          ) {
            newList.push(product);
          }
        });
        var newProductListImages = newList.length > 0 && newList.map(
          (images) => images.ProductImage
        );

        this.setState({
          fullChosenProducts: newList,
          fullChosenProductsBackup: chosenItems,
          imagesChosen: newProductListImages,
          isChosenFiltered: true
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
      this.state.chosenProductsNames.length > 0 && this.state.chosenProductsNames.map((chosenProduct) => {
        allProductsData.length > 0 && allProductsData.map((product) => {
          if (product.ProductName == chosenProduct) {
            newProductList.push(product);
          }
        });
      });
      var newList = [];
      var chosenItems = allProductsData;
      this.state.productsLeft.length > 0 && this.state.productsLeft.map((product) => {
        chosenItems = chosenItems.filter(
          (listItem) => listItem.ProductName != product
        );
      });
      chosenItems.length > 0 && chosenItems.map((product) => {
        if (
          product.ProductName.toLowerCase().includes(
            this.state.searchWordRemove.toLowerCase()
          )
        ) {
          newList.push(product);
        }
      });

      var newProductListImages = newProductList.length > 0 && newProductList.map(
        (images) => images.ProductImage
      );
      var ItemsLeft = allProductsData;
      newProductList.length > 0 && newProductList.map((productItem) => {
        ItemsLeft = ItemsLeft.filter(
          (items) => items.ProductName !== productItem.ProductName
        );
      });

      var leftImages = ItemsLeft.length > 0 && ItemsLeft.map(
        (images) => images.ProductImage
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
      this.props.history.push("/viewProductPromotion");
    };

    // ---------------------------------------------------- Add Product Method 2 -------------------------------------------------
    // const handleClick = (event, name) => {
    //   const selectedIndex = this.state.ProductID.indexOf(name);
    //   let newSelected = [];

    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(this.state.ProductID, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(this.state.ProductID.slice(1));
    //   } else if (selectedIndex === this.state.ProductID.length - 1) {
    //     newSelected = newSelected.concat(this.state.ProductID.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       this.state.ProductID.slice(0, selectedIndex),
    //       this.state.ProductID.slice(selectedIndex + 1)
    //     );
    //   }
    //   this.setState({ ProductID: newSelected });
    // };

    // const handleChangePage = (event, newPage) => {
    //   this.setState({ page: newPage });
    // };

    // const handleChangeRowsPerPage = (event) => {
    //   this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    // };

    // const isSelected = (name) => this.state.ProductID.indexOf(name) !== -1;

    // const emptyRows =
    //   this.state.rowsPerPage -
    //   Math.min(
    //     this.state.rowsPerPage,
    //     this.props.allproducts.length - this.state.page * this.state.rowsPerPage
    //   );

    // const divStyle = {
    //   width: "100%",
    //   margin: "auto",
    //   padding: "1%",
    //   marginTop: "15px",
    // };

    const classes = {
      root: {
        width: "100%",
      },
      paper: {
        width: "100%",
        margin: "1% auto",
        padding: "1%",
      },
      submitBtn: {
        float: "right",
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
      },
      title: {
        flex: "1 1 100%",
      },
    };

    return (
      <div>
        <div className="App" style={{ width: "100%", alignContent: "center" }}>
          <div className="App-header">
            <h2 style={{ margin: "10px" }}>Add Promotion</h2>
            <Button onClick={back}>
              <i className="fas fa-chevron-left"></i>Back
            </Button>
          </div>
          <Card style={{ width: "80%", margin: "0 auto" }}>
            <CardContent>
              {/* -------------------------------- Add Promotion Title ------------------------------------- */}
              <TextField
                id="text-field-controlled"
                variant="outlined"
                label="Promotion Title"
                size="small"
                // helperText="Promotion Title"
                value={this.state.PromotionTitle}
                onChange={this.handleChange.bind(this, "PromotionTitle")}
                type="text"
                style={{ width: "100%" }}
                error={this.state.PromotionTitleEmpty}
              />

              <br />
              {this.state.PromotionTitleEmpty && (
                <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                  Please insert a Product Title.
                </p>
              )}
              <br />
              {/* -------------------------------- Add Promotion Effective Date----------------------------- */}

              <div style={{ display: "flex", justifyContent: "space-around" }}   >
                <br />
                <div style={{ width: "100%", paddingRight: "20px" }}>
                  <DatePicker
                    size="small"
                    placeholderText="Start Date"
                    // onChange={(e) => this.handleDateChange(e)}
                    // value={this.state.selectedDate}
                    value={this.state.PromotionStartDate}
                    format="dd/MM/yyyy"
                    onChange={this.handleChange.bind(
                      this,
                      "PromotionStartDate"
                    )}
                    className={`w-100`}
                  />
                  {this.state.startDateNotSet ||
                    this.state.startDateInvalid ? (
                    <FormHelperText style={{ color: "red" }}>
                      Please enter a valid start date.
                    </FormHelperText>
                  ) : null}
                </div>
                <div style={{ width: "100%" }}>
                  <DatePicker
                    size="small"
                    placeholderText="End Date"
                    // onChange={(e) => this.handleDateChange(e)}
                    onChange={this.handleChange.bind(
                      this,
                      "PromotionEndDate"
                    )}
                    format="dd/MM/yyyy"
                    value={this.state.PromotionEndDate}
                    className={`w-100`}
                  />
                  {this.state.endDateNotSet || this.state.endDateInvalid ? (
                    <FormHelperText style={{ color: "red" }}>
                      Please enter a valid end date.
                    </FormHelperText>
                  ) : null}
                </div>
              </div>
              <br />
              {/* -----------------------------------Add Discount Percentage  -------------------------------------- */}
              <TextField
                id="text-field-controlled"
                variant="outlined"
                label="Discount Percentage"
                size="small"
                // helperText="Discount Percentage"
                value={this.state.DiscountPercentage}
                onChange={this.handleChange.bind(this, "DiscountPercentage")}
                type="number"
                style={{ width: "30%" }}
                error={this.state.promotionDiscountNotSet}
              />
              <br />
              {this.state.promotionDiscountNotSet && (
                <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                  Please set the Promotion Discount.
                </p>
              )}

              {/* ----------------------------------------------- (Start) Add Promotion Banner --------------------------------------- */}
              <br />
              <div>
                <div className="form-group">
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag & Drop Story Image or Click To Browse"}
                    filesLimit={1}
                    multiple={false}
                    onChange={this.uploadHandler}
                  />
                </div>
                {this.state.mediaAlert === true ? <FormHelperText className="invalid-message" style={{ color: "#e31e10" }}>Please Insert a Promotion Banner</FormHelperText> : ""}
              </div>  

              {/* ----------------------------------------------- (End) Add Promotion Banner --------------------------------------- */}

              <div>
                {/* ----------------------------------------------- Add Product --------------------- (Method 1)------------------ */}
                <InputLabel style={{ marginTop: "20px" }}>
                  Select Promotion Products
                </InputLabel>
                <br />

                <TransferList
                  allProducts={this.state.isFiltered === false ? this.state.productsDisplayed : this.state.filteredProduct}
                  // allProducts={allProductsData}
                  search={Search}
                  searchWordAdd={this.state.searchWordAdd}
                  setSearchValue={setSearchValue}
                  searchWordRemove={this.state.searchWordRemove}
                  setChosenProducts={setChosenProducts}
                  chosenProducts={this.state.ProductID}
                  fullChosenProducts={this.state.fullChosenProducts}
                  imageChosen={this.state.imagesChosen}
                  imageLeft={this.state.imagesLeft}
                  setChosen={setProductChosen}
                />
                {this.state.productsAreNotChosen ? (
                  <FormHelperText style={{ color: "red" }}>
                    Please Choose at Least ONE Product.
                  </FormHelperText>
                ) : null}
              </div>
              {/* ----------------------------------------------- Add Product ----------------------- (Method 2)----------------- */}
              {/* <Paper className={classes.paper} style={divStyle}>
                <SelectProductTableToolbar
                  numSelected={this.state.ProductID.length}
                  selectedData={this.state.ProductID}
                  ProductProps={this.props.ProductProps}
                />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={this.state.dense ? "small" : "medium"}
                    aria-label="enhanced table"
                  >
                   
                    <TableBody>
                      {/* {setValue(DataV)} */}
              {/* {stableSort(
                        this.props.allstocks,
                        getComparator(this.state.order, this.state.orderBy)
                      )
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.ProductID);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                handleClick(event, row.ProductID)
                              }
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.ProductID}
                              ProductID={isItemSelected}
                              value={this.state.ProductID}
                              onChange={this.handleChange.bind(this, "ProductID")}

                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </TableCell>

                              <TableCell align="left">
                                {row.ProductName}
                              </TableCell>

                              <TableCell align="left">{row.Brand}</TableCell>

                              <TableCell align="left">
                                <div className={classes.root}>
                                  <Input
                                    style={{ zIndex: 1 }}
                                    className={classes.input}
                                    value={this.state.Amount[index]}
                                    margin="dense"
                                    // onChange={(event) =>
                                    //   // handleInputChange(event, index)
                                    // }
                                    // onBlur={handleBlur}
                                    inputProps={{
                                      step: 1,
                                      min: 0,
                                      max: 1000,
                                      type: "number",
                                      "aria-labelledby": "input-slider",
                                    }}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (this.state.dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.props.allstocks.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper> */}
              {/* </div> */}
              {/* ---------------------------------------------------------------------------------------------------------- */}
              <br />

              <div>
                <TextField
                  id="PromotionDesc"
                  label="Promotion Description"
                  multiline
                  rows={4}
                  defaultValue=" "
                  value={this.state.PromotionDesc}
                  variant="outlined"
                  onChange={this.handleChange.bind(this, "PromotionDesc")}
                  style={{ width: "100%" }}
                  error={this.state.PromotionDescEmpty}
                />
                <br />
                {this.state.PromotionDescEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Promotion Description Need to Be Set.
                  </p>
                )}
                <br />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              ></div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              ></div>
              <br />

              <div style={{ width: "100%", textAlign: "center" }}>
                <Button
                  variant="outlined"
                  onClick={this.checkValues.bind(this)}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPromotionBannerComponent);
