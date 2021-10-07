import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  CardHeader,
  TableBody,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import SwipeableViews from "react-swipeable-views";
import MaterialTable from "material-table";
import Dropzone from "react-dropzone";
import axios from "axios";
import { browserHistory } from "react-router";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Fade from "@material-ui/core/Fade";
import NestedMenuItem from "material-ui-nested-menu-item";
import RestoreIcon from "@material-ui/icons/Restore";
import queryString from "query-string";
import { toast } from "react-toastify";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { HashLink } from "react-router-hash-link";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormInput,
} from "shards-react";
import "./addProduct.component.css";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import { checkboxSelectionColDef } from "@material-ui/data-grid";
import { ignoreElements } from "rxjs/operators";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Fade } from "shards-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["supplier"],
    exist: state.counterReducer["exists"],
    result: state.counterReducer["addResult"],
    resultsMedia: state.counterReducer["productMediaResult"],
    variations: state.counterReducer["variations"],
    productCategories: state.counterReducer["productCategories"],
    productCategoriesFullList: state.counterReducer["categories"],
  };
}
const editorConfiguration = {
  toolbar: [
    "bold",
    "italic",
    "heading",
    "bulletedList",
    "numberedList",
    "outdent",
    "indent",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "link",
  ],
};

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategoryListing: () =>
      dispatch(GitAction.CallAllProductCategoryListing()),
    callAddProduct: (prodData) => dispatch(GitAction.CallAddProduct(prodData)),
    callAllSupplierByUserStatus: (suppData) =>
      dispatch(GitAction.CallAllSupplierByUserStatus(suppData)),
    callCheckProduct: (prodData) =>
      dispatch(GitAction.CallCheckProduct(prodData)),
    callAddProductMedia: (prodData) =>
      dispatch(GitAction.CallAddProductMedia(prodData)),
    CallAllProductVariationByCategoryID: (prodData) =>
      dispatch(GitAction.CallAllProductVariationByCategoryID(prodData)),
    CallAllProductsCategories: () =>
      dispatch(GitAction.CallAllProductCategory()),
  };
}

function ProductModificableVariationTable(props) {
  const { useState } = React;

  const productVariation = {};
  const [data] = useState(props.ProductData);
  props.ProductData.map((row, i) => {
    const { ProductVariation } = row;
    productVariation[i + 1] = ProductVariation;
  });

  const [columns] = useState([
    {
      title: "Product Variation",
      field: "ProductVariation",
      lookup: productVariation,
    },
    {
      title: "Value",
      field: "Value",
    },
  ]);
  columns[0].lookup = productVariation;
  const [data2, setData2] = useState([
    {
      Value: "S",
    },
    {
      Value: "M",
    },
  ]);
  const [data3, setData3] = useState([
    {
      Value: "Black",
    },
    {
      Value: "White",
    },
    {
      Value: "Red",
    },
  ]);

  return (
    <MaterialTable
      title="Variations"
      options={{
        paging: false,
        search: false,
      }}
      columns={columns}
      data={data}
      detailPanel={(rowData) => {
        return (
          <div style={{ padding: "10px 50px 10px 50px", backgroundColor: "" }}>
            <MaterialTable
              title={columns[1].lookup[data[0].ProductVariation]}
              columns={[
                {
                  title: "Value",
                  field: "Value",
                },
              ]}
              data={data2}
              options={{
                paging: false,
                search: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      setData2([...data2, newData]);

                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      const dataUpdate = [...data2];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData2([...dataUpdate]);

                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      const dataDelete = [...data2];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData2([...dataDelete]);

                      resolve();
                    }, 1000);
                  }),
              }}
              detailPanel={(rowData) => {
                return (
                  <div style={{ padding: "10px 50px 10px 50px" }}>
                    <MaterialTable
                      title="Colors"
                      columns={[
                        {
                          title: "Value",
                          field: "Value",
                        },
                      ]}
                      data={data3}
                      options={{
                        paging: false,
                        search: false,
                      }}
                      editable={{
                        onRowAdd: (newData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              setData3([...data3, newData]);

                              resolve();
                            }, 1000);
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              const dataUpdate = [...data3];
                              const index = oldData.tableData.id;
                              dataUpdate[index] = newData;
                              setData3([...dataUpdate]);

                              resolve();
                            }, 1000);
                          }),
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              const dataDelete = [...data3];
                              const index = oldData.tableData.id;
                              dataDelete.splice(index, 1);
                              setData3([...dataDelete]);

                              resolve();
                            }, 1000);
                          }),
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>
        );
      }}
    />
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function getSteps() {
  return [
    "Basic Information",
    "Product Details",
    "Product Variations",
    "Shipping Information",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return ``;
    case 1:
      return "";
    case 2:
      return ``;
    case 3:
      return ``;
    default:
      return "";
  }
}

class AddProductComponent extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.props.CallAllProductCategoryListing();
    this.props.callAllSupplierByUserStatus("endorsed");
    this.handlePrevClickButton = this.handlePrevClickButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.props.CallAllProductsCategories();

    this.basicInfo = React.createRef();
    this.productDetails = React.createRef();
    this.productVarient = React.createRef();
    this.productMedia = React.createRef();
    this.shippingInfo = React.createRef();
    this.state = {
      scrollTop: 0,
      name: "",
      manufacturer: "",
      description: "",
      productCategory: "",
      productSupplier: "",
      productShoplot: "",
      productGrid: "",
      height: "",
      width: "",
      depth: "",
      weight: "",
      sku: "",
      brand: "",
      model: "",
      tags: "",
      categoryList: [],
      supplierList: [],
      shopLotList: [],
      gridList: [],
      index: 0,
      rows: [],
      file: [],
      fileInfo: [],
      url: [],
      counter: 0,
      counter2: 0,
      file2: [],
      fileInfo2: [],
      url2: [],
      file3: [],
      fileInfo3: [],
      url3: [],
      url4: [],
      counter3: 0,
      productImages: [],
      productHeight: [],
      productWidth: [],
      skuNotLongEnough: false,
      heightNotDecimal: false,
      widthNotDecimal: false,
      depthNotDecimal: false,
      dimensionsNotDecimal: false,
      productNameEmpty: false,
      productNameDublicated: false,
      productCategoryEmpty: false,
      productSupplierEmpty: false,
      heightEmpty: false,
      widthEmpty: false,
      depthEmpty: false,
      weightEmpty: false,
      weightNotDecimal: false,
      productDesciptionEmpty: false,
      skuEmpty: false,
      brandEmpty: false,
      modelEmpty: false,
      productTagsEmpty: false,
      priceEmpty: false,
      stockEmpty: false,
      variation1NameEmpty: false,
      variation2NameEmpty: false,
      notEnoughFiles512x512: false,
      notEnoughFiles1600x900: false,
      notEnoughFilesVideo: false,
      productID: null,
      dataSent: false,
      file1Added: false,
      file2Added: false,
      file3Added: false,
      file1Added2: false,
      file2Added2: false,
      file3Added2: false,
      file1Added3: false,
      onImage: false,
      currentlyHovered: 0,
      ProductVariationSelectedData: [],
      ProductCategroyName: "",
      ParentProductCategoryID: "",
      Tags: "",
      HierarchyLevel: "",
      anchorEl: null,
      selectedItem: "Choose a Category",
      menuPosition: null,
      buttonDisabled: true,
      categoryH1: "",
      categoryH2: null,
      categoryH3: null,
      categoryH4: null,
      categoryH2ID: "",
      categoryH3ID: "",
      categoryH4ID: "",
      categoryH1Name: "",
      categoryH2Name: "",
      categoryH3Name: "",
      categoryH4Name: "",
      basicInfoVisible: true,
      productDetailsVisible: false,
      productsVariationsVisible: false,
      productMediaVisible: false,
      shippingInfoVisible: false,
      productDescriptionVisible: false,
      variation1Name: "",
      variation2Name: "",
      progressBasic: 0,
      progressDetails: 0,
      progressVariation: 0,
      progressMedia: 0,
      progressShipping: 0,
      progressDescription: 0,
      supplierFilled: 0,
      skuFilled: 0,
      brandFilled: 0,
      modelFilled: 0,
      descriptionFilled: 0,
      tagsFilled: 0,
      priceFilled: 0,
      stockFilled: 0,
      widthFilled: 0,
      heightFilled: 0,
      depthFilled: 0,
      weightFilled: 0,
      variation1NameFilled: 0,
      variation2NameFilled: 0,
      variation1On: false,
      variation2On: false,
      variation1Options: 0,
      variation2Options: 0,
      wholeSaleOn: false,
      wholeSaleOptions: 1,
      activeStep: 0,
      price: null,
      stock: null,
      variation1: [],
      priceTierList: [],
      variantImagesTotal: 0.0,
      Total512x512: 0.0,
      Total1600x900: 0.0,
      videoFilled: 0,
      FocusOn: false,
      helpText: [],
      editorState: null,
    };
  }

  setHint = (data, e) => {
    console.log(e + " " + data);
    if (data === "ProductName") {
      this.setState({
        FocusOn: true,
        helpText: ["Product name should be short and descriptive."],
      });
    } else if (data === "Search") {
      this.setState({
        FocusOn: true,
        helpText: ["Choose a category that best represents the product."],
      });
    } else if (data === "ProductSupplier") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Choose the product's supplier from the provided list of suppliers.",
        ],
      });
    } else if (data === "ProductSKU") {
      this.setState({
        FocusOn: true,
        helpText: ["Product's SKU should be at least 8 characters long."],
      });
    } else if (data === "ProductBrand") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Specify the product's brand to make it easier for users to find the product.",
        ],
      });
    } else if (data === "ProductModel") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Specify the product's model to make it easier for users to find the product.",
        ],
      });
    } else if (data === "ProductDescription") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Try to include the product's specifications, contents and functions to avoid confusion and help the user decide if the product is suitable for them or not.",
        ],
      });
    } else if (data === "ProductTags") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Choose tags that best identify the product to improve the search results.",
        ],
      });
    } else if (data === "ProductPrice") {
      this.setState({
        FocusOn: true,
        helpText: ["Make sure to input the full product's price."],
      });
    } else if (data === "ProductStock") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Make sure to input the latest product stock to avoid issues with orders.",
        ],
      });
    } else if (data === "VariationName") {
      this.setState({
        FocusOn: true,
        helpText: [
          "A maximum of 2 variants can be added where the second one is a sub-category of the first one.",
          "A maximum of 20 options per variation is allowed with a maximum of 50 combinations overall.",
        ],
      });
    } else if (data === "VariantOption") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Choose words that best describe that variety option to avoid confusion.",
        ],
      });
    } else if (data === "VariationStock") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Make sure to input the latest product stock to avoid issues with orders.",
        ],
      });
    } else if (data === "VariationSKU") {
      this.setState({
        FocusOn: true,
        helpText: ["Product's SKU should be at least 8 characters long."],
      });
    } else if (data === "VariationPrice") {
      this.setState({
        FocusOn: true,
        helpText: ["Make sure to input the full product's price."],
      });
    } else if (data === "WholeSaleMin") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Price tiers should be added in Ascending order.",
          "The minimum value of each tier should be greater than the maximum value of the previous tier.",
          "The minimum value has to be at least 1.",
        ],
      });
    } else if (data === "WholeSaleMax") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Price tiers should be added in Ascending order.",
          "The maximum value of each tier should be greater than or equal to the minimum value of the tier it is on.",
        ],
      });
    } else if (data === "WholeSalePrice") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Price tiers should be added in Ascending order.",
          "The price of each tier should be different than that of the other tiers.",
        ],
      });
    } else if (data === "ProductImages") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Only .mp4 and .mov video files are allowed with a maximum size of 150MB.",
          "It's optional to add images for each variety if product varieties are included.",
        ],
      });
    } else if (data === "ProductHeight") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Measurments should include the packaging.",
          "Ensure that the accurate measurments are entered.",
        ],
      });
    } else if (data === "ProductWidth") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Measurments should take into account the packaging.",
          "Ensure that the accurate measurments are entered.",
        ],
      });
    } else if (data === "ProductDepth") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Measurments should take into account the packaging.",
          "Ensure that the accurate measurments are entered.",
        ],
      });
    } else if (data === "ProductWeight") {
      this.setState({
        FocusOn: true,
        helpText: [
          "Measurments should take into account the packaging.",
          "Ensure that the accurate measurments are entered.",
        ],
      });
    }
  };

  checkProgress = () => {
    if (!this.state.variation1On) {
      this.setState({
        progressDetails:
          ((this.state.supplierFilled +
            this.state.skuFilled +
            this.state.brandFilled +
            this.state.modelFilled +
            this.state.tagsFilled) /
            5) *
          100,
        progressShipping:
          ((this.state.widthFilled +
            this.state.heightFilled +
            this.state.depthFilled +
            this.state.weightFilled) /
            4) *
          100,
        progressMedia:
          ((this.state.Total512x512 +
            this.state.Total1600x900 +
            this.state.videoFilled) /
            3) *
          100,
        progressDescription: this.state.descriptionFilled * 100,
      });
    } else if (this.state.variation1On) {
      this.setState({
        progressMedia:
          ((this.state.Total512x512 +
            this.state.Total1600x900 +
            this.state.videoFilled +
            this.state.variantImagesTotal) /
            4) *
          100,
      });
    }

    if (this.state.name != "" && this.state.productCategory != "") {
      this.setState({
        progressBasic: 100,
      });
    } else if (
      (this.state.name != "" && this.state.productCategory == "") ||
      (this.state.name == "" && this.state.productCategory != "")
    ) {
      this.setState({
        progressBasic: 50,
      });
    } else if (this.state.name == "" && this.state.productCategory == "") {
      this.setState({
        progressBasic: 0,
      });
    }

    //Variant Progress
    if (!this.state.variation1On) {
      if (!this.state.wholeSaleOn) {
        this.setState({
          progressVariation:
            ((this.state.priceFilled + this.state.stockFilled) / 2) * 100,
        });
      } else if (this.state.wholeSaleOn) {
        var FilledValues = 0;
        var TotalValue = 0;
        this.state.priceTierList.map((priceTier, i) => {
          console.log(priceTier.max == 0);
          if (
            priceTier.max == 0 ||
            priceTier.max == null ||
            priceTier.max < priceTier.min
          ) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (priceTier.min == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (priceTier.price == 0 || priceTier.price == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
        });

        var WholeSaleFilled = FilledValues / TotalValue;
        console.log(FilledValues + " " + TotalValue);
        this.setState({
          progressVariation:
            ((this.state.priceFilled +
              this.state.stockFilled +
              WholeSaleFilled) /
              3) *
            100,
        });
      }
    } else if (this.state.variation1On) {
      if (!this.state.variation2On) {
        var FilledValues = 0;
        var TotalValue = 0;
        this.state.variation1.options.map((option, i) => {
          if (option.optionName == "" || option.optionName == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (option.price == "" || option.price == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (option.sku == "" || option.sku == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (option.stock == "" || option.stock == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
        });
        if (
          this.state.variation1.name == "" ||
          this.state.variation1.name == null
        ) {
          TotalValue = TotalValue + 1;
        } else {
          TotalValue = TotalValue + 1;
          FilledValues = FilledValues + 1;
        }
        var Variant1Filled = FilledValues / TotalValue;
        console.log(FilledValues + " " + TotalValue);

        if (this.state.wholeSaleOn) {
          var FilledValues2 = 0;
          var TotalValue2 = 0;
          this.state.priceTierList.map((priceTier, i) => {
            console.log(priceTier.max == 0);
            if (
              priceTier.max == 0 ||
              priceTier.max == null ||
              priceTier.max < priceTier.min
            ) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
            if (priceTier.min == null) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
            if (priceTier.price == 0 || priceTier.price == null) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
          });

          var WholeSaleFilled = FilledValues2 / TotalValue2;
          console.log(FilledValues2 + " " + TotalValue2);
          this.setState({
            progressVariation: ((Variant1Filled + WholeSaleFilled) / 2) * 100,
          });
        } else {
          this.setState({
            progressVariation: Variant1Filled * 100,
          });
        }
      } else if (this.state.variation2On) {
        var FilledValues = 0;
        var TotalValue = 0;

        this.state.variation1.options.map((option, i) => {
          if (option.optionName == "" || option.optionName == null) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          if (
            option.variation2Options.name == "" ||
            option.variation2Options.name == null
          ) {
            TotalValue = TotalValue + 1;
          } else {
            TotalValue = TotalValue + 1;
            FilledValues = FilledValues + 1;
          }
          console.log(option.variation2Options);
          console.log(this.state.variation1);
          option.variation2Options.options.map((option2, x) => {
            if (option2.optionName == "" || option2.optionName == null) {
              TotalValue = TotalValue + 1;
            } else {
              TotalValue = TotalValue + 1;
              FilledValues = FilledValues + 1;
            }
            if (option2.price == "" || option2.price == null) {
              TotalValue = TotalValue + 1;
            } else {
              TotalValue = TotalValue + 1;
              FilledValues = FilledValues + 1;
            }
            if (option2.sku == "" || option2.sku == null) {
              TotalValue = TotalValue + 1;
            } else {
              TotalValue = TotalValue + 1;
              FilledValues = FilledValues + 1;
            }
            if (option2.stock == "" || option2.stock == null) {
              TotalValue = TotalValue + 1;
            } else {
              TotalValue = TotalValue + 1;
              FilledValues = FilledValues + 1;
            }
          });
        });
        if (
          this.state.variation1.name == "" ||
          this.state.variation1.name == null
        ) {
          TotalValue = TotalValue + 1;
        } else {
          TotalValue = TotalValue + 1;
          FilledValues = FilledValues + 1;
        }
        var Variant1Filled = FilledValues / TotalValue;
        console.log(FilledValues + " " + TotalValue);
        if (this.state.wholeSaleOn) {
          var FilledValues2 = 0;
          var TotalValue2 = 0;
          this.state.priceTierList.map((priceTier, i) => {
            console.log(priceTier.max == 0);
            if (
              priceTier.max == 0 ||
              priceTier.max == null ||
              priceTier.max < priceTier.min
            ) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
            if (priceTier.min == null) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
            if (priceTier.price == 0 || priceTier.price == null) {
              TotalValue2 = TotalValue2 + 1;
            } else {
              TotalValue2 = TotalValue2 + 1;
              FilledValues2 = FilledValues2 + 1;
            }
          });

          var WholeSaleFilled = FilledValues2 / TotalValue2;
          console.log(FilledValues2 + " " + TotalValue2);
          this.setState({
            progressVariation: ((Variant1Filled + WholeSaleFilled) / 2) * 100,
          });
        } else {
          this.setState({
            progressVariation: Variant1Filled * 100,
          });
        }
      }
    }
  };

  checkFiles512x512 = () => {
    if (this.state.file.length < 3) {
      this.setState({
        notEnoughFiles512x512: true,
        Total512x512: this.state.file.length / 3,
      });
    } else {
      this.setState({
        notEnoughFiles512x512: false,
        Total512x512: 1,
      });
    }
  };

  checkFiles1600x900 = () => {
    if (this.state.file2.length < 3) {
      this.setState({
        notEnoughFiles1600x900: true,
        Total1600x900: this.state.file2.length / 3,
      });
    } else {
      this.setState({
        notEnoughFiles1600x900: false,
        Total1600x900: 1,
      });
    }
  };

  checkFilesVideo = () => {
    if (this.state.file3.length < 1) {
      this.setState({
        notEnoughFilesVideo: true,
        videoFilled: 0,
      });
    } else {
      this.setState({
        notEnoughFilesVideo: false,
        videoFilled: 1,
      });
    }
  };

  checkSKULength = () => {
    if (this.state.sku.length < 8) {
      this.setState({
        skuNotLongEnough: true,
      });
    } else {
      this.setState({
        skuNotLongEnough: false,
      });
    }
  };

  checkHeightIsDecimal = () => {
    var regex = /^\d+(\.\d{1,2})?$/;
    var numToBeChecked = this.state.height;
    if (regex.test(numToBeChecked)) {
      this.setState({
        heightNotDecimal: false,
      });
    } else {
      this.setState({
        heightNotDecimal: true,
      });
    }
  };

  checkWidthIsDecimal = () => {
    var regex = /^\d+(\.\d{1,2})?$/;
    var numToBeChecked = this.state.width;
    if (regex.test(numToBeChecked)) {
      this.setState({
        widthNotDecimal: false,
      });
    } else {
      this.setState({
        widthNotDecimal: true,
      });
    }
  };

  checkDepthIsDecimal = () => {
    var regex = /^\d+(\.\d{1,2})?$/;
    if (regex.test(this.state.depth)) {
      this.setState({
        depthNotDecimal: false,
      });
    } else {
      this.setState({
        depthNotDecimal: true,
      });
    }
  };

  checkWeightIsDecimal = () => {
    var regex = /^\d+(\.\d{1,2})?$/;
    if (regex.test(this.state.weight)) {
      this.setState({
        weightNotDecimal: false,
      });
    } else {
      this.setState({
        weightNotDecimal: true,
      });
    }
  };

  checkProductName = () => {
    if (this.state.name === "" || this.state.name === null) {
      this.setState({
        productNameEmpty: true,
      });
    } else {
      this.setState({
        productNameEmpty: false,
      });
    }

    if (this.state.name !== "") {
      this.props.callCheckProduct(this.state.name.replaceAll(" ", "%20"));
    }
  };

  checkProductCat = () => {
    if (
      this.state.productCategory === "" ||
      this.state.productCategory === null
    ) {
      this.setState({
        productCategoryEmpty: true,
      });
    } else {
      this.setState({
        productCategoryEmpty: false,
      });
    }
  };

  checkProductSupplier = () => {
    if (
      this.state.productSupplier === "" ||
      this.state.productSupplier === null
    ) {
      this.setState({
        productSupplierEmpty: true,
        supplierFilled: 0,
      });
    } else {
      this.setState({
        productSupplierEmpty: false,
        supplierFilled: 1,
      });
    }
  };

  checkProductHeight = () => {
    if (
      this.state.height === "" ||
      this.state.height === null ||
      this.state.height === "0"
    ) {
      this.setState({
        heightEmpty: true,
        heightFilled: 0,
      });
      console.log("filled 0");
    } else {
      this.setState({
        heightEmpty: false,
        heightFilled: 1,
      });
      console.log("filled 1");
    }
  };

  checkProductWidth = () => {
    if (
      this.state.width === "" ||
      this.state.width === null ||
      this.state.width === "0"
    ) {
      this.setState({
        widthEmpty: true,
        widthFilled: 0,
      });
    } else {
      this.setState({
        widthEmpty: false,
        widthFilled: 1,
      });
    }
  };

  checkProductDepth = () => {
    if (
      this.state.depth === "" ||
      this.state.depth === null ||
      this.state.depth === "0"
    ) {
      this.setState({
        depthEmpty: true,
        depthFilled: 0,
      });
    } else {
      this.setState({
        depthEmpty: false,
        depthFilled: 1,
      });
    }
  };

  checkProductWeight = () => {
    if (
      this.state.weight === "" ||
      this.state.weight === null ||
      this.state.weight === "0"
    ) {
      this.setState({
        weightEmpty: true,
        weightFilled: 0,
      });
    } else {
      this.setState({
        weightEmpty: false,
        weightFilled: 1,
      });
    }
  };

  checkProductDesc = () => {
    if (this.state.description === "" || this.state.description === null) {
      this.setState({
        productDesciptionEmpty: true,
        descriptionFilled: 0,
      });
    } else {
      this.setState({
        productDesciptionEmpty: false,
        descriptionFilled: 1,
      });
    }
  };

  checkBrand = () => {
    if (this.state.brand === "" || this.state.brand === null) {
      this.setState({
        brandEmpty: true,
        brandFilled: 0,
      });
    } else {
      this.setState({
        brandEmpty: false,
        brandFilled: 1,
      });
    }
  };

  checkModel = () => {
    if (this.state.model === "" || this.state.model === null) {
      this.setState({
        modelEmpty: true,
        modelFilled: 0,
      });
    } else {
      this.setState({
        modelEmpty: false,
        modelFilled: 1,
      });
    }
  };

  checkTags = () => {
    if (this.state.tags === "" || this.state.tags === null) {
      this.setState({
        productTagsEmpty: true,
        tagsFilled: 0,
      });
    } else {
      this.setState({
        productTagsEmpty: false,
        tagsFilled: 1,
      });
    }
  };

  checkPrice = () => {
    if (
      this.state.price === "" ||
      this.state.price === null ||
      this.state.price < 0
    ) {
      this.setState({
        priceEmpty: true,
        priceFilled: 0,
      });
    } else {
      this.setState({
        priceEmpty: false,
        priceFilled: 1,
      });
    }
  };

  checkStock = () => {
    if (
      this.state.stock === "" ||
      this.state.stock === null ||
      this.state.stock < 0
    ) {
      this.setState({
        stockEmpty: true,
        stockFilled: 0,
      });
    } else {
      this.setState({
        stockEmpty: false,
        stockFilled: 1,
      });
    }
  };

  checkSKU = () => {
    if (this.state.sku === "" || this.state.sku === null) {
      this.setState({
        skuEmpty: true,
        skuFilled: 0,
      });
    } else {
      this.setState({
        skuEmpty: false,
        skuFilled: 1,
      });
    }
  };

  checkVariation2Name = () => {
    if (
      this.state.variation2Name === "" ||
      this.state.variation2Name === null
    ) {
      this.setState({
        variation2NameEmpty: true,
        variation2NameFilled: 0,
      });
    } else {
      this.setState({
        variation2NameEmpty: false,
        variation2NameFilled: 1,
      });
    }
  };

  checkVariation1Name = () => {
    if (
      this.state.variation1Name === "" ||
      this.state.variation1Name === null
    ) {
      this.setState({
        variation1NameEmpty: true,
        variation1NameFilled: 0,
      });
    } else {
      this.setState({
        variation1NameEmpty: false,
        variation1NameFilled: 1,
      });
    }
  };

  checkVariantImages = () => {
    var missingImages = 0;
    for (var i = 0; i < this.state.variation1Options; i++) {
      if (!this.state.variation1.options[i].picture) {
        missingImages = missingImages + 1;
      }
    }
    if (missingImages > 0) {
      var valueToBeAdded = 1 - missingImages / this.state.variation1Options;
      console.log(valueToBeAdded);
      this.setState({
        variantImagesTotal: valueToBeAdded,
      });
    } else if (missingImages == 0) {
      this.setState({
        variantImagesTotal: 1,
      });
    }
    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      1000
    );
  };

  checkVariant1 = () => {
    var missing = 0.0;
    var totalFields = 0.0;
    for (var i = 0; i < this.state.variation1.options.length; i++) {
      if (!this.state.variation1.options[i].optionName) {
        missing = missing + 1;
        totalFields = totalFields + 1;
      } else if (this.state.variation1.options[i].optionName) {
        totalFields = totalFields + 1;
      }

      if (!this.state.variation1.options[i].price) {
        missing = missing + 1;
        totalFields = totalFields + 1;
      } else if (this.state.variation1.options[i].price) {
        totalFields = totalFields + 1;
      }
      if (!this.state.variation1.options[i].sku) {
        missing = missing + 1;
        totalFields = totalFields + 1;
      } else if (this.state.variation1.options[i].sku) {
        totalFields = totalFields + 1;
      }

      if (!this.state.variation1.options[i].stock) {
        missing = missing + 1;
        totalFields = totalFields + 1;
      } else if (this.state.variation1.options[i].stock) {
        totalFields = totalFields + 1;
      }
    }
    if (!this.state.variation1.name) {
      missing = missing + 1;
      totalFields = totalFields + 1;
    } else if (this.state.variation1.name) {
      totalFields = totalFields + 1;
    }

    console.log("missing: " + missing + " total: " + totalFields);
  };

  checkVariant2 = () => {
    var missing = 0.0;
    var totalFields = 0.0;
    for (var i = 0; i < this.state.variation1.options[0]; i++) {
      for (
        var x = 0;
        x < this.state.variation1.options[0].variation2Options.options.length;
        x++
      ) {
        if (
          !this.state.variation1.options[i].variation2Options.options[x]
            .optionName
        ) {
          missing = missing + 1;
          totalFields = totalFields + 1;
        } else if (
          this.state.variation1.options[i].variation2Options.options[x]
            .optionName
        ) {
          totalFields = totalFields + 1;
        }
        if (
          !this.state.variation1.options[i].variation2Options.options[x].price
        ) {
          missing = missing + 1;
          totalFields = totalFields + 1;
        } else if (
          this.state.variation1.options[i].variation2Options.options[x].price
        ) {
          totalFields = totalFields + 1;
        }
        if (
          !this.state.variation1.options[i].variation2Options.options[x].sku
        ) {
          missing = missing + 1;
          totalFields = totalFields + 1;
        } else if (
          this.state.variation1.options[i].variation2Options.options[x].sku
        ) {
          totalFields = totalFields + 1;
        }

        if (
          !this.state.variation1.options[i].variation2Options.options[x].stock
        ) {
          missing = missing + 1;
          totalFields = totalFields + 1;
        } else if (
          this.state.variation1.options[i].variation2Options.options[x].stock
        ) {
          totalFields = totalFields + 1;
        }
      }
    }
    if (!this.state.variation1.options[i].variation2Options.name) {
      missing = missing + 1;
      totalFields = totalFields + 1;
    } else if (this.state.variation1.name) {
      totalFields = totalFields + 1;
    }

    console.log("missing: " + missing + " total: " + totalFields);
  };

  changeBackground2 = (e) => {
    e.target.style.background = "#fff";
    e.target.style.color = "#a31702";
  };

  changeBackground = (e) => {
    e.target.style.background = "#a31702";
    e.target.style.color = "#fff";
  };

  handleInputChange(event) {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      this.setState({
        selectedFile: e.target.result,
      });
    };
  }

  handleDrop = (data, acceptedFiles) => {
    if (acceptedFiles.length > 3) {
    } else {
      if (data === "512x512") {
        if (this.state.fileInfo.length + acceptedFiles.length > 3) {
          toast.error("Only 3 images are allowed.");
        } else {
          this.setState((state) => {
            const file = state.file.concat(acceptedFiles.map((file) => file));
            const fileInfo = state.fileInfo.concat(
              acceptedFiles.map((file) => file.name)
            );
            const url = state.url.concat(
              acceptedFiles.map((file) => URL.createObjectURL(file))
            );
            return {
              file,
              fileInfo,
              url,
            };
          });
          // this.setState({
          //   file1Added: true,
          // });
          if (this.state.fileInfo.length === 1) {
            this.setState({
              file1Added: true,
            });
          } else if (this.state.fileInfo.length === 2) {
            this.setState({
              file1Added: true,
              file2Added: true,
            });
          } else if (this.state.fileInfo.length === 3) {
            this.setState({
              file1Added: true,
              file2Added: true,
              file3Added: true,
            });
          }
          toast.success(
            this.state.file2Added +
              " file Length: " +
              this.state.fileInfo.length
          );
          this.checkFiles512x512();
        }
      } else if (data === "1600x900") {
        if (this.state.fileInfo2.length + acceptedFiles.length > 3) {
          toast.error("Only 3 files are allowed.");
        } else {
          this.setState((state) => {
            const file2 = state.file2.concat(acceptedFiles.map((file) => file));
            const fileInfo2 = state.fileInfo2.concat(
              acceptedFiles.map((file) => file.name)
            );
            const url2 = state.url2.concat(
              acceptedFiles.map((file) => URL.createObjectURL(file))
            );
            return {
              file2,
              fileInfo2,
              url2,
            };
          });
          if (this.state.fileInfo2.length === 1) {
            this.setState({
              file1Added2: true,
            });
          } else if (this.state.fileInfo2.length === 2) {
            this.setState({
              file1Added2: true,
              file2Added2: true,
            });
          } else if (this.state.fileInfo2.length === 3) {
            this.setState({
              file1Added2: true,
              file2Added2: true,
              file3Added2: true,
            });
          }
          this.checkFiles1600x900();
        }
      } else if (data === "video") {
        if (this.state.fileInfo3.length + acceptedFiles.length > 1) {
          toast.error("Only 1 video is allowed.");
        } else {
          this.setState((state) => {
            const file3 = state.file3.concat(acceptedFiles.map((file) => file));
            const fileInfo3 = state.fileInfo3.concat(
              acceptedFiles.map((file) => file.name)
            );
            const url3 = state.url3.concat(
              acceptedFiles.map((file) => URL.createObjectURL(file))
            );
            return {
              file3,
              fileInfo3,
              url3,
            };
          });
          if (this.state.fileInfo3.length === 1) {
            this.setState({
              file1Added3: true,
            });
          }
          this.checkFilesVideo();
          console.log(this.state.file3[0]);
        }
      }

      acceptedFiles.map((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      });
    }
    this.checkProgress();
  };

  handleDropVariant = (data, index, acceptedFiles) => {
    console.log(data + " " + acceptedFiles + " " + index);
    if (data === "variant1") {
      console.log(acceptedFiles[0]);

      const optionData = {
        optionName: this.state.variation1.options[index].name,
        price: this.state.variation1.options[index].price,
        stock: this.state.variation1.options[index].stock,
        sku: this.state.variation1.options[index].sku,
        picture: acceptedFiles[0],
        pictureURL: URL.createObjectURL(acceptedFiles[0]),
        errorOption: this.state.variation1.options[index].errorOption,
        errorPrice: this.state.variation1.options[index].errorPrice,
        errorSKU: this.state.variation1.options[index].errorSKU,
        errorStock: this.state.variation1.options[index].errorStock,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });
    }
    setTimeout(
      function () {
        this.checkVariant2();
        this.checkVariantImages();
      }.bind(this),
      1000
    );
  };

  onLoad = (data, e) => {
    var heigth = e.target.height;
    var width = e.target.width;
    if (data === "512x512") {
      if (heigth !== 512 || width !== 512) {
        this.removeFile(
          "512x512",
          e.target.attributes.getNamedItem("data-key").value
        );
        toast.error("Images have to be 512 x 512");
      }
    } else if (data === "1600x900") {
      // var heigth = e.target.height;
      // var width = e.target.width;
      if (heigth !== 900 || width !== 1600) {
        this.removeFile(
          "1600x900",
          e.target.attributes.getNamedItem("data-key").value
        );
        toast.error("Images have to be 1600 x 900");
      }
    }
  };

  onDelete = (index, data) => {
    if (data === "512x512") {
      var newList2 = this.state.file;
      this.state.file.map((file, i) => {
        var valueToBeUsed2 = parseInt(index);
        if (i === valueToBeUsed2) {
          newList2 = newList2.filter((file2) => file !== file2);
          this.setState({
            counter2: this.state.counter2 + 1,
          });
        }
      });
      this.setState({
        file: newList2.map((file3) => file3),
        fileInfo: newList2.map((file3) => file3.name),
        url: newList2.map((file3) => URL.createObjectURL(file3)),
      });

      if (this.state.fileInfo.length === 1) {
        this.setState({
          file1Added: false,
          file2Added: false,
          file3Added: false,
          Total512x512: 0,
        });
      } else if (this.state.fileInfo.length === 2) {
        this.setState({
          file1Added: true,
          file2Added: false,
          file3Added: false,
          Total512x512: 1 / 3,
        });
      } else if (this.state.fileInfo.length === 3) {
        this.setState({
          file1Added: true,
          file2Added: true,
          file3Added: false,
          Total512x512: 2 / 3,
        });
      } else if (this.state.fileInfo.length === 4) {
        this.setState({
          file1Added: true,
          file2Added: true,
          file3Added: true,
          Total512x512: 3 / 3,
        });
      }
    } else if (data === "1600x900") {
      var newList3 = this.state.file2;
      this.state.file2.map((file, i) => {
        var valueToBeUsed2 = parseInt(index);
        if (i === valueToBeUsed2) {
          newList3 = newList3.filter((file2) => file !== file2);
          this.setState({
            counter2: this.state.counter2 + 1,
          });
        }
      });
      this.setState({
        file2: newList3.map((file3) => file3),
        fileInfo2: newList3.map((file3) => file3.name),
        url2: newList3.map((file3) => URL.createObjectURL(file3)),
      });

      if (this.state.fileInfo2.length === 1) {
        this.setState({
          file1Added2: false,
          file2Added2: false,
          file3Added2: false,
          Total1600x900: 0,
        });
      } else if (this.state.fileInfo2.length === 2) {
        this.setState({
          file1Added2: true,
          file2Added2: false,
          file3Added2: false,
          Total1600x900: 1 / 3,
        });
      } else if (this.state.fileInfo2.length === 3) {
        this.setState({
          file1Added2: true,
          file2Added2: true,
          file3Added2: false,
          Total1600x900: 2 / 3,
        });
      } else if (this.state.fileInfo2.length === 4) {
        this.setState({
          file1Added2: true,
          file2Added2: true,
          file3Added2: true,
          Total1600x900: 3 / 3,
        });
      }
    } else if (data === "video") {
      var newList3 = this.state.file3;
      this.state.file3.map((file, i) => {
        var valueToBeUsed2 = parseInt(index);
        if (i === valueToBeUsed2) {
          newList3 = newList3.filter((file2) => file !== file2);
          this.setState({
            counter3: this.state.counter3 + 1,
          });
        }
      });
      this.setState({
        file3: newList3.map((file3) => file3),
        fileInfo3: newList3.map((file3) => file3.name),
        url3: newList3.map((file3) => URL.createObjectURL(file3)),
      });

      if (this.state.fileInfo3.length === 1) {
        this.setState({
          file1Added3: false,
          videoFilled: 0,
        });
      }
    } else if (data === "variant") {
      const optionData = {
        optionName: this.state.variation1.options[index].name,
        price: this.state.variation1.options[index].price,
        stock: this.state.variation1.options[index].stock,
        sku: this.state.variation1.options[index].sku,
        picture: null,
        pictureURL: null,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });
    }
    setTimeout(
      function () {
        this.checkFiles512x512();
        this.checkFiles1600x900();
        this.checkFilesVideo();
        this.checkProgress();
      }.bind(this),
      500
    );
    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      1000
    );
  };

  onDeleteVariant = (index, data) => {
    console.log(index + " " + data);
    if (data === "variant1") {
      if (this.state.variation2On) {
        var newVariant = [];
        this.state.variation1.options[0].variation2Options.options.map(
          (info, i) => {
            const optionData = {
              optionName: info.optionName,
              price: null,
              stock: null,
              sku: null,
              picture: null,
              pictureURL: null,
              variation2Options: {
                name: "",
                options: [{ optionName: "", price: "", stock: "", sku: "" }],
              },
            };

            newVariant = [...newVariant, optionData];
          }
        );

        var editedVar = this.state.variation1;
        editedVar.name = this.state.variation2Name;
        editedVar.options = newVariant;

        this.setState({
          variation1: editedVar,
          variation2On: false,
          variation2Name: "",
          variation1Name: this.state.variation2Name,
          variation2Options: 0,
          variation1Options: this.state.variation2Options,
        });
      } else {
        this.setState({
          variation1On: false,
          variation1: [],
          variation1Options: 0,
          variation1Name: "",
        });
      }
    } else if (data === "variant1Option") {
      if (this.state.variation1Options > 1) {
        var newVariant = this.state.variation1.options;
        newVariant = newVariant.filter((file2, i) => i !== index);

        editedVar = this.state.variation1;
        editedVar.options = newVariant;

        this.setState({
          variation1: editedVar,
          variation1Options: this.state.variation1Options - 1,
        });
      } else {
        if (this.state.variation2On) {
          var newVariant = [];
          this.state.variation1.options[0].variation2Options.options.map(
            (info, i) => {
              const optionData = {
                optionName: info.optionName,
                price: null,
                stock: null,
                sku: null,
                picture: null,
                pictureURL: null,
                variation2Options: {
                  name: "",
                  options: [{ optionName: "", price: "", stock: "", sku: "" }],
                },
              };

              newVariant = [...newVariant, optionData];
            }
          );

          var editedVar = this.state.variation1;
          editedVar.name = this.state.variation2Name;
          editedVar.options = newVariant;

          this.setState({
            variation1: editedVar,
            variation2On: false,
            variation2Name: "",
            variation1Name: this.state.variation2Name,
            variation2Options: 0,
            variation1Options: this.state.variation2Options,
          });
        } else {
          this.setState({
            variation1On: false,
            variation1: [],
            variation1Options: 0,
            variation1Name: "",
          });
        }
      }
    } else if (data === "variant2") {
      const toBeAdded = { optionName: "", price: "", stock: "", sku: "" };

      for (var i = 0; i < this.state.variation1Options; i++) {
        var variations2 = this.state.variation1.options[i].variation2Options;
        variations2.options = [toBeAdded];
        variations2.name = "";

        var variations = this.state.variation1;
        variations.options[i].variation2Options = variations2;

        this.setState({
          variation1: variations,
          variation2On: false,
          variation2Options: 0,
          variation2Name: "",
        });
      }
    } else if (data === "variant2Option") {
      if (this.state.variation2Options > 1) {
        var newVariant = this.state.variation1.options[0].variation2Options
          .options;
        newVariant = newVariant.filter((file2, i) => i !== index);

        for (var i = 0; i < this.state.variation1Options; i++) {
          editedVar = this.state.variation1;
          editedVar.options[i].variation2Options.options = newVariant;

          this.setState({
            variation1: editedVar,
            variation2Options: this.state.variation2Options - 1,
          });
        }
      } else {
        const toBeAdded = { optionName: "", price: "", stock: "", sku: "" };

        for (var i = 0; i < this.state.variation1Options; i++) {
          var variations2 = this.state.variation1.options[i].variation2Options;
          variations2.options = [toBeAdded];
          variations2.name = "";

          var variations = this.state.variation1;
          variations.options[i].variation2Options = variations2;

          this.setState({
            variation1: variations,
            variation2On: false,
            variation2Options: 0,
            variation2Name: "",
          });
        }
      }
    } else if (data === "wholeSale") {
      this.setState({
        wholeSaleOn: false,
        wholeSaleOptions: 1,
        priceTierList: [],
      });
    } else if (data === "wholeSaleOption") {
      var editedVar = this.state.priceTierList;
      editedVar = editedVar.filter((file2, i) => i !== index);

      this.setState({
        priceTierList: editedVar,
        wholeSaleOptions: this.state.wholeSaleOptions - 1,
      });
    }
    setTimeout(
      function () {
        this.checkProgress();
        this.checkVariantImages();
      }.bind(this),
      1000
    );
  };

  removeFile = function (data, index) {
    if (data === "512x512") {
      var newList = this.state.file;
      this.state.file.map((file, i) => {
        var valueToBeUsed = parseInt(index);
        if (i === valueToBeUsed) {
          newList = newList.filter((file2) => file !== file2);
          this.setState({
            counter: this.state.counter + 1,
          });
        }
      });
      this.setState({
        file: newList.map((file3) => file3),
        fileInfo: newList.map((file3) => file3.name),
        url: newList.map((file3) => URL.createObjectURL(file3)),
      });
      this.checkFiles512x512();
      if (this.state.fileInfo.length === 1) {
        this.setState({
          file1Added: false,
          file2Added: false,
          file3Added: false,
        });
      } else if (this.state.fileInfo.length === 2) {
        this.setState({
          file1Added: true,
          file2Added: false,
          file3Added: false,
        });
      } else if (this.state.fileInfo.length === 3) {
        this.setState({
          file1Added: true,
          file2Added: true,
          file3Added: false,
        });
      } else if (this.state.fileInfo.length === 4) {
        this.setState({
          file1Added: true,
          file2Added: true,
          file3Added: true,
        });
      }
    } else if (data === "1600x900") {
      var newList4 = this.state.file2;
      this.state.file2.map((file, i) => {
        var valueToBeUsed = parseInt(index);
        if (i === valueToBeUsed) {
          newList4 = newList4.filter((file2) => file !== file2);
          this.setState({
            counter: this.state.counter + 1,
          });
        }
      });
      this.setState({
        file2: newList4.map((file3) => file3),
        fileInfo2: newList4.map((file3) => file3.name),
        url2: newList4.map((file3) => URL.createObjectURL(file3)),
      });
      this.checkFiles1600x900();
      if (this.state.fileInfo2.length === 1) {
        this.setState({
          file1Added2: false,
          file2Added2: false,
          file3Added2: false,
        });
      } else if (this.state.fileInfo2.length === 2) {
        this.setState({
          file1Added2: true,
          file2Added2: false,
          file3Added2: false,
        });
      } else if (this.state.fileInfo2.length === 3) {
        this.setState({
          file1Added2: true,
          file2Added2: true,
          file3Added2: false,
        });
      } else if (this.state.fileInfo2.length === 4) {
        this.setState({
          file1Added2: true,
          file2Added2: true,
          file3Added2: true,
        });
      }
    }
  };

  uploadFile = (productID) => {
    for (var i = 0; i < this.state.file.length; i++) {
      const formData1 = new FormData();
      formData1.append(i + "image512x512", this.state.file[i]);
      formData1.append("imageName", productID + "_image512x512_" + (i + 1));
      formData1.append("ProductID", productID);
      let url = "http://tourism.denoo.my/emporiaimage/upload.php";
      axios.post(url, formData1, {}).then((res) => {
        console.log("Warning: " + JSON.stringify(res));
      });
      this.props.callAddProductMedia(this.state);
    }
    for (var i = 0; i < this.state.file2.length; i++) {
      const formData2 = new FormData();
      formData2.append(i + "image1600x900", this.state.file2[i]);
      formData2.append("imageName", productID + "_image1600x900_" + (i + 1));
      formData2.append("ProductID", productID);
      let url = "http://tourism.denoo.my/emporiaimage/upload.php";
      axios.post(url, formData2, {}).then((res) => {
        console.log("Warning: " + res);
      });
      this.props.callAddProductMedia(this.state);
    }
  };

  handleChange(data, e) {
    if (data === "product") {
      this.setState({
        name: e.target.value,
      });

      setTimeout(
        function () {
          this.checkProductName();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "manufacturer") {
      this.setState({
        manufacturer: e.target.value,
      });
    } else if (data === "Product Category") {
      this.setState({
        productCategory: e.target.value,
      });
      this.props.CallAllProductVariationByCategoryID(e.target.value);
      setTimeout(
        function () {
          this.checkProductCat();
          this.checkProgress();
        }.bind(this),
        1000
      );
    } else if (data === "Product Supplier") {
      this.setState({
        productSupplier: e.target.value,
      });

      setTimeout(
        function () {
          this.checkProductSupplier();
          this.checkProgress();
        }.bind(this),
        1000
      );
    } else if (data === "Shoplot") {
      this.setState({
        productShoplot: e.target.value,
      });
    } else if (data === "Product Grid Storage") {
      this.setState({
        productGrid: e.target.value,
      });
    } else if (data === "height") {
      this.setState({
        height: e.target.value,
      });
      setTimeout(
        function () {
          this.checkProductHeight();
          this.checkProgress();
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkHeightIsDecimal();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "width") {
      this.setState({
        width: e.target.value,
      });

      setTimeout(
        function () {
          this.checkWidthIsDecimal();
          this.checkProgress();
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkProductWidth();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "depth") {
      this.setState({
        depth: e.target.value,
      });

      setTimeout(
        function () {
          this.checkDepthIsDecimal();
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkProductDepth();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "weight") {
      this.setState({
        weight: e.target.value,
      });

      setTimeout(
        function () {
          this.checkWeightIsDecimal();
          this.checkProgress();
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkProductWeight();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "description") {
      this.setState({
        description: e.target.value,
      });

      setTimeout(
        function () {
          this.checkProductDesc();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "SKU") {
      this.setState({
        sku: e.target.value,
      });

      setTimeout(
        function () {
          this.checkSKULength();
          this.checkProgress();
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkSKU();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Brand") {
      this.setState({
        brand: e.target.value,
      });

      setTimeout(
        function () {
          this.checkBrand();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Model") {
      this.setState({
        model: e.target.value,
      });

      setTimeout(
        function () {
          this.checkModel();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Tags") {
      this.setState({
        tags: e.target.value,
      });

      setTimeout(
        function () {
          this.checkTags();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Price") {
      this.setState({
        price: e.target.value,
      });

      setTimeout(
        function () {
          this.checkPrice();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "stock") {
      this.setState({
        stock: e.target.value,
      });

      setTimeout(
        function () {
          this.checkStock();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Variation1Name") {
      const variationObject = {
        name: e.target.value,
        options: this.state.variation1.options,
      };

      this.setState({
        variation1Name: e.target.value,
        variation1: variationObject,
      });

      setTimeout(
        function () {
          this.checkVariation1Name();
          this.checkProgress();
        }.bind(this),
        200
      );
    } else if (data === "Variation2Name") {
      for (var i = 0; i < this.state.variation1Options; i++) {
        var variations = this.state.variation1;
        variations.options[i].variation2Options.name = e.target.value;
        console.log(variations);
        this.setState({
          variation1: variations,
        });
      }

      this.setState({
        variation2Name: e.target.value,
      });

      setTimeout(
        function () {
          this.checkVariation2Name();
          this.checkProgress();
        }.bind(this),
        200
      );
    }
  }

  handleChangeOptions = (data, index, e) => {
    console.log(e + " " + index + " " + data);
    if (data === "variant1Options") {
      const optionData = {
        optionName: e.target.value,
        price: this.state.variation1.options[index].price,
        stock: this.state.variation1.options[index].stock,
        sku: this.state.variation1.options[index].sku,
        picture: this.state.variation1.options[index].picture,
        pictureURL: this.state.variation1.options[index].pictureURL,
        errorOption: e.target.value == "",
        errorPrice: this.state.variation1.options[index].errorPrice,
        errorSKU: this.state.variation1.options[index].errorSKU,
        errorStock: this.state.variation1.options[index].errorStock,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });

      setTimeout(
        function () {
          this.checkProgress();
        }.bind(this),
        500
      );
    } else if (data === "variation1Price") {
      const optionData = {
        optionName: this.state.variation1.options[index].optionName,
        price: e.target.value,
        stock: this.state.variation1.options[index].stock,
        sku: this.state.variation1.options[index].sku,
        picture: this.state.variation1.options[index].picture,
        pictureURL: this.state.variation1.options[index].pictureURL,
        errorOption: this.state.variation1.options[index].errorOption,
        errorPrice: e.target.value == "" || e.target.value < 0,
        errorSKU: this.state.variation1.options[index].errorSKU,
        errorStock: this.state.variation1.options[index].errorStock,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });

      setTimeout(
        function () {
          this.checkProgress();
        }.bind(this),
        500
      );
    } else if (data === "variation1Stock") {
      const optionData = {
        optionName: this.state.variation1.options[index].optionName,
        price: this.state.variation1.options[index].price,
        stock: e.target.value,
        sku: this.state.variation1.options[index].sku,
        picture: this.state.variation1.options[index].picture,
        pictureURL: this.state.variation1.options[index].pictureURL,
        errorOption: this.state.variation1.options[index].errorOption,
        errorPrice: this.state.variation1.options[index].errorPrice,
        errorSKU: this.state.variation1.options[index].errorSKU,
        errorStock: e.target.value == "" || e.target.value < 0,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });
      setTimeout(
        function () {
          this.checkProgress();
        }.bind(this),
        500
      );
    } else if (data === "variation1SKU") {
      const optionData = {
        optionName: this.state.variation1.options[index].optionName,
        price: this.state.variation1.options[index].price,
        stock: this.state.variation1.options[index].stock,
        sku: e.target.value,
        picture: this.state.variation1.options[index].picture,
        pictureURL: this.state.variation1.options[index].pictureURL,
        errorOption: this.state.variation1.options[index].errorOption,
        errorPrice: this.state.variation1.options[index].errorPrice,
        errorSKU: e.target.value == "" || e.target.value.length < 8,
        errorStock: this.state.variation1.options[index].errorStock,
        variation2Options: this.state.variation1.options[index]
          .variation2Options,
      };

      var variations = this.state.variation1;

      variations.options[index] = optionData;

      this.setState({
        variation1: variations,
      });

      setTimeout(
        function () {
          this.checkProgress();
        }.bind(this),
        500
      );
    } else if (data === "wholeSaleMax") {
      const optionData = {
        max: e.target.value,
        min: this.state.priceTierList[index].min,
        price: this.state.priceTierList[index].price,
        errorMax:
          e.target.value == "" ||
          e.target.value < this.state.priceTierList[index].min,
        errorMin: this.state.priceTierList[index].errorMin,
        errorPrice: this.state.priceTierList[index].errorPrice,
      };

      var tierList = this.state.priceTierList;

      tierList[index] = optionData;

      this.setState({
        priceTierList: tierList,
      });
    } else if (data === "wholeSaleMin") {
      const optionData = {
        max: this.state.priceTierList[index].max,
        min: e.target.value,
        price: this.state.priceTierList[index].price,
        errorMax: this.state.priceTierList[index].errorMax,
        errorMin: e.target.value < 1 || e.target.value == "",
        errorPrice: this.state.priceTierList[index].errorPrice,
      };

      var tierList = this.state.priceTierList;

      tierList[index] = optionData;

      this.setState({
        priceTierList: tierList,
      });
    } else if (data === "wholeSalePrice") {
      const optionData = {
        max: this.state.priceTierList[index].max,
        min: this.state.priceTierList[index].min,
        price: e.target.value,
        errorMax: this.state.priceTierList[index].errorMax,
        errorMin: this.state.priceTierList[index].errorMin,
        errorPrice: e.target.value == "" || e.target.value < 0,
      };

      var tierList = this.state.priceTierList;

      tierList[index] = optionData;

      this.setState({
        priceTierList: tierList,
      });
    }

    console.log(this.state.variation1);
    console.log(this.state.priceTierList);

    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      1000
    );
  };

  handleChangeOptionsVariant2 = (data, index, indexVariant2, e) => {
    console.log(e + " " + data + " " + index + " " + indexVariant2);
    console.log(this.state.variation1);

    if (data === "variant2Options") {
      const optionData = {
        optionName: e.target.value,
        price: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].price,
        stock: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].stock,
        sku: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].sku,
        errorOption: e.target.value == "",
        errorPrice: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorPrice,
        errorStock: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorStock,
        errorSKU: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorSKU,
      };

      //   for (var i = 0; i < this.state.variation1Options; i++) {
      var variations = this.state.variation1;
      variations.options[index].variation2Options.options[
        indexVariant2
      ] = optionData;
      console.log(variations);
      this.setState({
        variation1: variations,
      });
      //   }
    } else if (data === "variation2Price") {
      const optionData = {
        optionName: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].optionName,
        price: e.target.value,
        stock: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].stock,
        sku: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].sku,
        errorOption: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorOption,
        errorPrice: e.target.value == "" || e.target.value < 0,
        errorStock: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorStock,
        errorSKU: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorSKU,
      };

      var variations = this.state.variation1;
      console.log(this.state.variation1);
      variations.options[index].variation2Options.options[
        indexVariant2
      ] = optionData;
      console.log(variations);

      this.setState({
        variation1: variations,
      });
    } else if (data === "variation2Stock") {
      const optionData = {
        optionName: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].optionName,
        price: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].price,
        stock: e.target.value,
        sku: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].sku,
        errorOption: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorOption,
        errorPrice: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorPrice,
        errorStock: e.target.value == "" || e.target.value < 0,
        errorSKU: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorSKU,
      };

      var variations = this.state.variation1;

      variations.options[index].variation2Options.options[
        indexVariant2
      ] = optionData;

      this.setState({
        variation1: variations,
      });
    } else if (data === "variation2SKU") {
      const optionData = {
        optionName: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].optionName,
        price: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].price,
        stock: this.state.variation1.options[index].variation2Options.options[
          indexVariant2
        ].stock,
        sku: e.target.value,
        errorOption: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorOption,
        errorPrice: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorPrice,
        errorStock: this.state.variation1.options[index].variation2Options
          .options[indexVariant2].errorStock,
        errorSKU: e.target.value == "" || e.target.value.length < 8,
      };

      var variations = this.state.variation1;

      variations.options[index].variation2Options.options[
        indexVariant2
      ] = optionData;

      this.setState({
        variation1: variations,
      });
    }
    console.log(this.state.variation1);
    setTimeout(
      function () {
        this.checkVariant2();
      }.bind(this),
      500
    );

    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      1000
    );
  };

  handleChangeSlider = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handlePrevClickButton() {
    this.setState((prevState, props) => {
      return { index: prevState.index - 1 };
    });
  }

  handleSlideChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  onNavigationProductStockIn() {
    browserHistory.push("/Emporia/productStocksIn");
  }

  checkEverything = () => {
    this.checkSKULength();
    this.checkBrand();
    this.checkDepthIsDecimal();
    this.checkProductDepth();
    this.checkProductDesc();
    this.checkProductName();
    this.checkProductCat();
    this.checkProductSupplier();
    this.checkProductHeight();
    this.checkHeightIsDecimal();
    this.checkWidthIsDecimal();
    this.checkProductWidth();
    this.checkWeightIsDecimal();
    this.checkProductWeight();
    this.checkModel();
    this.checkSKU();
    this.checkTags();
    this.checkPrice();
    this.checkStock();
    this.checkFiles1600x900();
    this.checkFiles512x512();
    this.checkFilesVideo();

    setTimeout(
      function () {
        this.handleNextClickButton();
      }.bind(this),
      500
    );
  };

  handleNextClickButton = () => {
    if (
      !(
        this.state.brandEmpty ||
        this.state.depthNotDecimal ||
        this.state.depthEmpty ||
        this.state.productDesciptionEmpty ||
        this.state.productNameEmpty ||
        this.state.productNameDublicated ||
        this.state.productCategoryEmpty ||
        this.state.productSupplierEmpty ||
        this.state.heightEmpty ||
        this.state.heightNotDecimal ||
        this.state.widthNotDecimal ||
        this.state.widthEmpty ||
        this.state.weightNotDecimal ||
        this.state.weightEmpty ||
        this.state.modelEmpty ||
        this.state.skuEmpty ||
        this.state.skuNotLongEnough ||
        this.state.productTagsEmpty ||
        this.state.notEnoughFiles1600x900 ||
        this.state.notEnoughFiles512x512
      )
    ) {
      // this.addProductForm();
      if (this.state.index === 0) {
        this.initData(this.props.variations);
      }
      this.setState((prevState, props) => {
        return { index: prevState.index + 1 };
      });
    }
  };

  addProductForm = () => {
    // this.setState((state) => {
    //   const productImages = state.productImages.concat(
    //     state.file.map((file) => file)
    //   );
    //   return {
    //     productImages,
    //   };
    // });
    // this.setState((state) => {
    //   const productImages = state.productImages.concat(
    //     state.file2.map((file) => file)
    //   );
    //   return {
    //     productImages,
    //   };
    // });
    // for (var i = 0; i < this.state.file.length; i++) {
    //   this.setState({
    //     productWidth: [...this.state.productWidth, "512"],
    //     productHeight: [...this.state.productHeight, "512"],
    //   });
    // }
    // for (var i = 0; i < this.state.file2.length; i++) {
    //   this.setState({
    //     productWidth: [...this.state.productWidth, "1600"],
    //     productHeight: [...this.state.productHeight, "900"],
    //   });
    // }

    setTimeout(
      function () {
        this.props.callAddProduct(this.state);
      }.bind(this),
      1500
    );

    setTimeout(
      function () {
        this.setState({ dataSent: true });
      }.bind(this),
      2000
    );
  };

  addProductVariation = (newData) => {
    this.setState((prevState, props) => {
      const appendednewrow = {
        variationArray: [...prevState.ProductVariationSelectedData, newData],
      };
      return { ProductVariationSelectedData: appendednewrow.variationArray };
    });
  };

  deleteProductVariation = (deleteData) => {
    this.setState((prevState, props) => {
      return { ProductVariationSelectedData: deleteData };
    });
  };

  updateProductVariation = (updateData) => {
    this.setState((prevState, props) => {
      return { ProductVariationSelectedData: updateData };
    });
  };

  initData = (data) => {
    this.setState({ ProductVariationSelectedData: data });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });

    if (this.state.menuPosition) return;

    this.setState({
      menuPosition: {
        top: event.pageY,
        left: event.pageX,
      },
    });
  };

  selectCategory = (elemId, elemName, elemHierarchy = 0) => {
    if (typeof elemName === "string") {
      this.setState({
        productCategory: elemId,
      });
      this.props.CallAllProductVariationByCategoryID(elemId);
      setTimeout(
        function () {
          this.checkProductCat();
        }.bind(this),
        1000
      );
      this.setState({
        ParentProductCategoryID: elemId,
        selectedItem: elemName,
        HierarchyLevel:
          elemHierarchy && elemHierarchy !== "" ? elemHierarchy + 1 : 1,
      });
    } else {
      toast.warning("You are selecting too fast! \nPlease select again.");
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null, menuPosition: null });
  };

  resetSelectedCategory = () => {
    this.setState({
      ParentProductCategoryID: "",
      selectedItem: "Choose a Category",
      HierarchyLevel: "",
    });
  };

  addProductVariant = (type) => {
    if (type == "variation") {
      var variationObject = null;
      if (this.state.variation2On) {
        variationObject = {
          name: "",
          options: [
            {
              optionName: "",
              price: "",
              stock: "",
              sku: "",
              picture: "",
              pictureURL: "",
              errorOption: false,
              errorSKU: false,
              errorPrice: false,
              errorStock: false,
              variation2Options: this.state.variation1.options[0]
                .variation2Options,
            },
          ],
        };
      } else {
        variationObject = {
          name: "",
          options: [
            {
              optionName: "",
              price: "",
              stock: "",
              sku: "",
              picture: "",
              pictureURL: "",
              errorOption: false,
              errorSKU: false,
              errorPrice: false,
              errorStock: false,
              variation2Options: {
                name: "",
                options: [
                  {
                    optionName: "",
                    price: "",
                    stock: "",
                    sku: "",
                    errorOption: false,
                    errorSKU: false,
                    errorPrice: false,
                    errorStock: false,
                  },
                ],
              },
            },
          ],
        };
      }

      console.log(variationObject);

      if (!this.state.variation1On) {
        this.setState({
          variation1On: true,
          variation1Options: 1,
          variation1: variationObject,
        });
      } else if (this.state.variation1On) {
        this.setState({
          variation2On: true,
          variation2Options: 1,
        });
      }
    } else if (type == "priceTier") {
      const priceTier = [
        {
          min: null,
          max: null,
          price: null,
        },
      ];

      this.setState({
        wholeSaleOn: true,
        priceTierList: priceTier,
      });
    }

    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      500
    );
  };

  handleScroll = (e) => {
    var basicInfo = document.getElementById("basicInfo");
    var productDetails = document.getElementById("productDetails");
    var productVariation = document.getElementById("productVariation");
    var productMedia = document.getElementById("productMedia");
    var shippingInfo = document.getElementById("shippingInfo");
    var descriptionCard = document.getElementById("descriptionCard");
    if (this.checkVisible(basicInfo)) {
      this.setState({
        basicInfoVisible: true,
        activeStep: 0,
      });
    } else {
      this.setState({
        basicInfoVisible: false,
      });
    }

    if (this.checkVisible(productDetails) && !this.state.basicInfoVisible) {
      this.setState({
        productDetailsVisible: true,
        activeStep: 1,
      });
    } else {
      this.setState({
        productDetailsVisible: false,
      });
    }
    if (
      this.checkVisible(descriptionCard) &&
      !this.state.productDetailsVisible &&
      !this.state.basicInfoVisible
    ) {
      this.setState({
        productDescriptionVisible: true,
        activeStep: 2,
      });
    } else {
      this.setState({
        productDescriptionVisible: false,
      });
    }

    if (
      this.checkVisible(productVariation) &&
      !this.state.productDetailsVisible &&
      !this.state.basicInfoVisible &&
      !this.state.productDescriptionVisible
    ) {
      this.setState({
        productsVariationsVisible: true,
        activeStep: 3,
      });
    } else {
      this.setState({
        productsVariationsVisible: false,
      });
    }

    if (
      this.checkVisible(productMedia) &&
      !this.state.productDetailsVisible &&
      !this.state.basicInfoVisible &&
      !this.state.productsVariationsVisible &&
      !this.state.productDescriptionVisible
    ) {
      this.setState({
        productMediaVisible: true,
        activeStep: 4,
      });
      this.setHint("ProductImages");
    } else {
      this.setState({
        productMediaVisible: false,
      });
    }

    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      this.setState({
        shippingInfoVisible: true,
        activeStep: 5,
      });
    } else {
      this.setState({
        shippingInfoVisible: false,
      });
    }
  };

  mouseOut = (id) => {
    this.setState({
      onImage: false,
      currentlyHovered: id,
    });
  };

  mouseIn = (id) => {
    this.setState({
      onImage: true,
      currentlyHovered: id,
    });
  };

  checkVisible = (elm) => {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  addOptions = (variantNum, e) => {
    if (variantNum == 1) {
      if (
        (this.state.variation1Options + 1) * this.state.variation2Options <
        51
      ) {
        var option = null;
        if (this.state.variation2On) {
          option = {
            optionName: "",
            price: "",
            stock: "",
            sku: "",
            picture: "",
            pictureURL: "",
            errorOption: false,
            errorSKU: false,
            errorPrice: false,
            errorStock: false,
            variation2Options: {
              name: "",
              options: [],
            },
          };

          const toBeAdded = {
            optionName: "",
            price: "",
            stock: "",
            sku: "",
            errorOption: false,
            errorSKU: false,
            errorPrice: false,
            errorStock: false,
          };
          for (var i = 0; i < this.state.variation2Options + 1; i++) {
            option.variation2Options.options = [
              ...option.variation2Options.options,
              toBeAdded,
            ];
          }
        } else {
          option = {
            optionName: "",
            price: "",
            stock: "",
            sku: "",
            picture: "",
            pictureURL: "",
            errorOption: false,
            errorSKU: false,
            errorPrice: false,
            errorStock: false,
            variation2Options: {
              name: "",
              options: [
                {
                  optionName: "",
                  price: "",
                  stock: "",
                  sku: "",
                  errorOption: false,
                  errorSKU: false,
                  errorPrice: false,
                  errorStock: false,
                },
              ],
            },
          };
        }

        var variations = this.state.variation1;

        variations.options = [...variations.options, option];

        this.setState({
          variation1Options: this.state.variation1Options + 1,
          variation1: variations,
        });

        // var variant2Option = this.state.variation1.options[
        //   this.state.variation1Options
        // ].variation2Options.options;
        // const toBeAdded = { optionName: "", price: "", stock: "", sku: "" };

        // for (var i = 0; i < this.state.variation2Options - 1; i++) {
        //   variant2Option = [...variant2Option, toBeAdded];
        // }
        // variations.options[
        //   this.state.variation1Options
        // ].variation2Options.options = variant2Option;
        // console.log(variations);

        // console.log("check, this: ");
        // console.log(variant2Option);

        // this.setState({
        //   variation1: variations,
        // });
      }
    } else if (variantNum == 2) {
      if (
        this.state.variation1Options * (this.state.variation2Options + 1) <
        51
      ) {
        this.setState({
          variation2Options: this.state.variation2Options + 1,
        });

        const toBeAdded = {
          optionName: "",
          price: "",
          stock: "",
          sku: "",
          errorOption: false,
          errorSKU: false,
          errorPrice: false,
          errorStock: false,
        };

        for (var i = 0; i < this.state.variation1Options; i++) {
          var variations2 = this.state.variation1.options[i].variation2Options;
          variations2.options = [...variations2.options, toBeAdded];

          var variations = this.state.variation1;
          variations.options[i].variation2Options = variations2;

          this.setState({
            variation1: variations,
          });
        }

        console.log(variations);
      }
    } else if (variantNum == "priceTier") {
      const priceTier = {
        min: 0,
        max: 0,
        price: 0.0,
        errorMin: false,
        errorMax: false,
        errorPrice: false,
      };

      var TierList = this.state.priceTierList;
      TierList = [...TierList, priceTier];

      this.setState({
        wholeSaleOptions: this.state.wholeSaleOptions + 1,
        priceTierList: TierList,
      });

      console.log(this.state.priceTierList);
    }
    setTimeout(
      function () {
        this.checkProgress();
      }.bind(this),
      500
    );
  };

  saveDesign = () => {
    // this.editor.saveDesign((design) => {
    //   console.log("saveDesign", design);
    //   alert("Design Saved Successfully");
    // });

    setTimeout(
      function () {
        console.log(this.state.description);
      }.bind(this),
      500
    );
  };

  render() {
    const steps = [
      "Basic Information",
      "Product Details",
      "Product Variations",
      "Shipping Information",
    ];

    const handleNext = () => {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    };

    const handleBack = () => {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    };

    const handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    var counter = 0;
    let resultData = this.props.result
      ? Object.keys(this.props.result).map((key) => {
          return this.props.result[key];
        })
      : {};
    if (resultData.length > 0) {
      resultData.map((d, i) => {
        this.uploadFile(d.ProductID);
      });
    }

    const query = queryString.parse(this.props.location.search);

    const previewStyle = {
      display: "inline",
      width: 60,
      height: 60,
      padding: 5,
    };

    let existData = this.props.exist
      ? Object.keys(this.props.exist).map((key) => {
          return this.props.exist[key];
        })
      : {};
    if (existData.length > 0) {
      var checkDuplicate = existData.map((d, i) => {
        if (d.ReturnVal === 1) {
          return <p className="error">Product name already exists.</p>;
        }
      });
    }

    const { index } = this.state;
    let allcategoriesData = this.props.allcategories
      ? Object.keys(this.props.allcategories).map((key) => {
          return this.props.allcategories[key];
        })
      : {};

    if (allcategoriesData.length > 0) {
      var createMenusForDropDown = allcategoriesData.map((d, i) => {
        return <option value={d.ProductCategoryID}>{d.ProductCategory}</option>;
      });
    }

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

    const Shoplots = () => (
      <Select
        value={this.state.productShoplot}
        onChange={this.handleChange.bind(this, "Shoplot")}
        inputProps={{
          name: "Product Shoplot",
          id: "productShoplot",
        }}
        className="ItemContainer"
      >
        <option aria-label="None" value="" />
        {createMenusForDropDownShoplots}
      </Select>
    );

    const Grid = () => (
      <Select
        value={this.state.productGrid}
        onChange={this.handleChange.bind(this, "Product Grid Storage")}
        inputProps={{
          name: "Product Grid Storage",
          id: "productGridStorage",
        }}
        className="ItemContainer"
      >
        <option aria-label="None" value="" />
        {createMenusForDropDownGrid}
      </Select>
    );

    const productVariation = {};
    const columns = [];
    const sliderButton = {
      background: "white",
      borderRadius: "50%",
      padding: "10px",
      width: "80px",
      height: "80px",
      color: "black",
      borderColor: "white",
      borderWidth: "2px",
      fontWeight: "bold",
    };

    const tableRow = {
      width: "100%",
    };
    const tableHead = {
      columnCount: "4",
      fontWeight: "bold",
    };

    const tableCell = {
      columnCount: "8",
    };

    const sliders = {
      position: "absolute",
      display: "flex",
      width: "75%",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    };

    var subMenu = (hierarchyList) => {
      if (typeof hierarchyList !== "object")
        hierarchyList = JSON.parse(hierarchyList);
      var elemList = [];
      hierarchyList.map((d, i) => {
        if (d.HierarchyID < 5) {
          if (d.HierarchyItem) {
            let menuitem = (
              <NestedMenuItem
                label={(d.ProductCategoryID, d.ProductCategory)}
                parentMenuOpen={!!this.state.menuPosition}
              >
                {subMenu(d.HierarchyItem)}
              </NestedMenuItem>
            );
            elemList.push(menuitem);
          } else {
            let menuitem = (
              <MenuItem
                onClick={() =>
                  this.selectCategory(
                    d.ProductCategoryID,
                    d.ProductCategory,
                    d.HierarchyID
                  )
                }
              >
                {" "}
                {d.ProductCategory}
              </MenuItem>
            );
            elemList.push(menuitem);
          }
        }
      });
      return elemList;
    };

    let productCategoriesList = this.props.productCategories
      ? Object.keys(this.props.productCategories).map((key) => {
          return this.props.productCategories[key];
        })
      : {};

    if (productCategoriesList.length > 0) {
      var productCategoryDDL = subMenu(productCategoriesList);
    }

    let productCategoriesFullListList = this.props.productCategoriesFullList
      ? Object.keys(this.props.productCategoriesFullList).map((key) => {
          return this.props.productCategoriesFullList[key];
        })
      : {};

    const searchCategory = (searchValue) => {
      console.log(searchValue + "  " + this.state.productCategory);

      productCategoriesFullListList.map((category) => {
        if (category.ProductCategory == searchValue) {
          if (category.HierarchyID == 1) {
            productCategoriesList.map((categoryItem) => {
              if (
                categoryItem.ProductCategoryID == category.ProductCategoryID
              ) {
                console.log(JSON.parse(categoryItem.HierarchyItem));
                this.setState({
                  categoryH1: category.ProductCategoryID,
                  categoryH1Name: categoryItem.ProductCategory,
                  categoryH2: JSON.parse(categoryItem.HierarchyItem),
                  categoryH2ID: null,
                  categoryH2Name: null,
                  categoryH3: null,
                  categoryH3ID: null,
                  categoryH3Name: null,
                  categoryH4: null,
                  categoryH4ID: null,
                  categoryH4Name: null,
                  productCategory: category.ProductCategoryID,
                });
              }
            });
          } else if (category.HierarchyID == 2) {
            productCategoriesList.map((categoryItem) => {
              if (
                categoryItem.ProductCategoryID ==
                category.ParentProductCategoryID
              ) {
                console.log(JSON.parse(categoryItem.HierarchyItem));
                JSON.parse(categoryItem.HierarchyItem).map(
                  (firstNestedList) => {
                    if (
                      category.ProductCategoryID ==
                      firstNestedList.ProductCategoryID
                    ) {
                      this.setState({
                        categoryH1: category.ParentProductCategoryID,
                        categoryH1Name: categoryItem.ProductCategory,
                        categoryH2: JSON.parse(categoryItem.HierarchyItem),
                        categoryH2ID: category.ProductCategoryID,
                        categoryH2Name: category.ProductCategory,
                        categoryH3: JSON.parse(firstNestedList.HierarchyItem),
                        categoryH3ID: null,
                        categoryH3Name: null,
                        categoryH4: null,
                        categoryH4ID: null,
                        categoryH4Name: null,
                        productCategory: category.ProductCategoryID,
                      });
                    }
                  }
                );
              }
            });
          } else if (category.HierarchyID == 3) {
            productCategoriesFullListList.map((categoryItem) => {
              if (
                categoryItem.ProductCategoryID ==
                category.ParentProductCategoryID
              ) {
                productCategoriesFullListList.map((firstNestedList) => {
                  if (
                    firstNestedList.ProductCategoryID ==
                    categoryItem.ParentProductCategoryID
                  ) {
                    const h1ID = firstNestedList.ProductCategoryID;
                    const h1Name = firstNestedList.ProductCategory;
                    const h2ID = categoryItem.ProductCategoryID;
                    const h2Name = categoryItem.ProductCategory;
                    const h3ID = category.ProductCategoryID;
                    const h3Name = category.ProductCategory;

                    productCategoriesList.map((List1) => {
                      if (List1.ProductCategoryID == h1ID) {
                        console.log(JSON.parse(List1.HierarchyItem));
                        JSON.parse(List1.HierarchyItem).map((List2) => {
                          if (List2.ProductCategoryID == h2ID) {
                            JSON.parse(List2.HierarchyItem).map((List3) => {
                              if (List3.ProductCategoryID == h3ID) {
                                this.setState({
                                  categoryH1: List1.ProductCategoryID,
                                  categoryH1Name: List1.ProductCategory,
                                  categoryH2: JSON.parse(List1.HierarchyItem),
                                  categoryH2ID: List2.ProductCategoryID,
                                  categoryH2Name: List2.ProductCategory,
                                  categoryH3: JSON.parse(List2.HierarchyItem),
                                  categoryH3ID: List3.ProductCategoryID,
                                  categoryH3Name: List3.ProductCategory,
                                  categoryH4: JSON.parse(List3.HierarchyItem),
                                  categoryH4ID: null,
                                  categoryH4Name: null,
                                  productCategory: List3.ProductCategoryID,
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          } else if (category.HierarchyID == 4) {
            productCategoriesFullListList.map((categoryItem) => {
              if (
                categoryItem.ProductCategoryID ==
                category.ParentProductCategoryID
              ) {
                productCategoriesFullListList.map((firstNestedList) => {
                  if (
                    firstNestedList.ProductCategoryID ==
                    categoryItem.ParentProductCategoryID
                  ) {
                    productCategoriesFullListList.map((secondNestedList) => {
                      if (
                        secondNestedList.ProductCategoryID ==
                        firstNestedList.ParentProductCategoryID
                      ) {
                        const h1ID = secondNestedList.ProductCategoryID;
                        const h1Name = secondNestedList.ParentProductCategory;
                        const h2ID = firstNestedList.ProductCategoryID;
                        const h2Name = firstNestedList.ProductCategory;
                        const h3ID = categoryItem.ProductCategoryID;
                        const h3Name = categoryItem.ProductCategory;
                        const h4ID = category.ProductCategoryID;
                        const h4Name = category.ProductCategory;

                        productCategoriesList.map((List1) => {
                          if (List1.ProductCategoryID == h1ID) {
                            console.log(JSON.parse(List1.HierarchyItem));
                            JSON.parse(List1.HierarchyItem).map((List2) => {
                              if (List2.ProductCategoryID == h2ID) {
                                JSON.parse(List2.HierarchyItem).map((List3) => {
                                  if (List3.ProductCategoryID == h3ID) {
                                    JSON.parse(List3.HierarchyItem).map(
                                      (List4) => {
                                        if (List4.ProductCategoryID == h4ID) {
                                          this.setState({
                                            categoryH1: List1.ProductCategoryID,
                                            categoryH1Name:
                                              List1.ProductCategory,
                                            categoryH2: JSON.parse(
                                              List1.HierarchyItem
                                            ),
                                            categoryH2ID:
                                              List2.ProductCategoryID,
                                            categoryH2Name:
                                              List2.ProductCategory,
                                            categoryH3: JSON.parse(
                                              List2.HierarchyItem
                                            ),
                                            categoryH3ID:
                                              List3.ProductCategoryID,
                                            categoryH3Name:
                                              List3.ProductCategory,
                                            categoryH4: JSON.parse(
                                              List3.HierarchyItem
                                            ),
                                            categoryH4ID:
                                              List4.ProductCategoryID,
                                            categoryH4Name:
                                              List4.ProductCategory,
                                            productCategory:
                                              List4.ProductCategoryID,
                                          });
                                        }
                                      }
                                    );
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
      setTimeout(
        function () {
          this.checkProgress();
        }.bind(this),
        1000
      );
    };
    const categoryClick = (level, e) => {
      console.log(productCategoriesFullListList);
      console.log(e.currentTarget.id);
      if (level == "1") {
        productCategoriesList.map((categoryItem) => {
          if (categoryItem.ProductCategoryID == e.currentTarget.id) {
            console.log(JSON.parse(categoryItem.HierarchyItem));
            this.setState({
              categoryH1: e.currentTarget.id,
              categoryH1Name: categoryItem.ProductCategory,
              categoryH2: JSON.parse(categoryItem.HierarchyItem),
              categoryH2ID: null,
              categoryH2Name: null,
              categoryH3: null,
              categoryH3ID: null,
              categoryH3Name: null,
              categoryH4: null,
              categoryH4ID: null,
              categoryH4Name: null,
              productCategory: e.currentTarget.id,
            });
          }
        });
      } else if (level == "2") {
        this.state.categoryH2.map((categoryItem) => {
          if (categoryItem.ProductCategoryID == e.currentTarget.id) {
            console.log(JSON.parse(categoryItem.HierarchyItem));
            this.setState({
              categoryH2ID: e.currentTarget.id,
              categoryH2Name: categoryItem.ProductCategory,
              categoryH3: JSON.parse(categoryItem.HierarchyItem),
              categoryH3ID: null,
              categoryH3Name: null,
              categoryH4: null,
              categoryH4ID: null,
              categoryH4Name: null,
              productCategory: e.currentTarget.id,
            });
          }
        });
      } else if (level == "3") {
        this.state.categoryH3.map((categoryItem) => {
          if (categoryItem.ProductCategoryID == e.currentTarget.id) {
            console.log(JSON.parse(categoryItem.HierarchyItem));
            this.setState({
              categoryH3ID: e.currentTarget.id,
              categoryH3Name: categoryItem.ProductCategory,
              categoryH4: JSON.parse(categoryItem.HierarchyItem),
              categoryH4ID: null,
              categoryH4Name: null,
              productCategory: e.currentTarget.id,
            });
          }
        });
      } else if (level == "4") {
        this.state.categoryH4.map((categoryItem) => {
          console.log(categoryItem);
          if (categoryItem.ProductCategoryID == e.currentTarget.id) {
            this.setState({
              categoryH4ID: e.currentTarget.id,
              categoryH4Name: categoryItem.ProductCategory,
              productCategory: e.currentTarget.id,
            });
          }
        });
      }
      this.checkProgress();
    };

    return (
      <div className="MainContainer" style={{ display: "flex" }}>
        <div className="MainTab">
          <div>
            <div>
              <h1>Add Product</h1>
            </div>
            <Button>
              <i className="fas fa-chevron-left"></i>
              <Link className="nav-link" to={"/viewProduct"}>
                Back
              </Link>
            </Button>
          </div>

          <div>
            <Card id="basicInfo" className="SubContainer">
              <CardContent id="basicInfo">
                <p className="Heading">Basic Information</p>

                <TextField
                  id="productName"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this, "product")}
                  InputLabelProps={{
                    shrink: "true",
                  }}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  className="InputField"
                  size="small"
                  label="Product Name"
                  variant="outlined"
                  onFocus={this.setHint.bind(this, "ProductName")}
                  onBlur={() =>
                    this.setState({
                      FocusOn: false,
                    })
                  }
                />

                {this.state.productNameEmpty && (
                  <p className="error">Product name cannot be empty.</p>
                )}
                {/* {this.state.name && checkDuplicate} */}

                {this.state.productCategoryEmpty && (
                  <p className="error">Product category cannot be empty.</p>
                )}
                <p className="Label">Product Category</p>
                <div className="CategorySelector">
                  <Autocomplete
                    id="free-solo-demo"
                    options={productCategoriesFullListList.map(
                      (option) => option.ProductCategory
                    )}
                    popupIcon={<SearchIcon className="searchIcon" />}
                    noOptionsText="No Matching Categories"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        onFocus={this.setHint.bind(this, "Search")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                    )}
                    onChange={(event, value) => searchCategory(value)}
                    className="InputField"
                  />
                  <div className="CategorySelectorBody">
                    <div className="CategorySelectorSection">
                      {productCategoriesList.map((category) => (
                        <Button
                          className="CategorySelectorItem"
                          style={{
                            color:
                              this.state.categoryH1 ==
                              category.ProductCategoryID
                                ? "#3d3d3d"
                                : "#3d3d3d",
                            background:
                              this.state.categoryH1 ==
                              category.ProductCategoryID
                                ? "#ebebeb"
                                : "white",
                          }}
                          onClick={categoryClick.bind(this, "1")}
                          id={category.ProductCategoryID}
                        >
                          {category.ProductCategory}
                        </Button>
                      ))}
                    </div>
                    <div className="CategorySelectorSection">
                      {this.state.categoryH2
                        ? this.state.categoryH2.map((category) => (
                            <Button
                              className="CategorySelectorItem"
                              style={{
                                color:
                                  this.state.categoryH2ID ==
                                  category.ProductCategoryID
                                    ? "#3d3d3d"
                                    : "#3d3d3d",
                                background:
                                  this.state.categoryH2ID ==
                                  category.ProductCategoryID
                                    ? "#ebebeb"
                                    : "white",
                              }}
                              onClick={categoryClick.bind(this, "2")}
                              id={category.ProductCategoryID}
                            >
                              {category.ProductCategory}
                            </Button>
                          ))
                        : null}
                    </div>
                    <div className="CategorySelectorSection">
                      {this.state.categoryH3
                        ? this.state.categoryH3.map((category) => (
                            <Button
                              className="CategorySelectorItem"
                              style={{
                                color:
                                  this.state.categoryH3ID ==
                                  category.ProductCategoryID
                                    ? "#3d3d3d"
                                    : "#3d3d3d",
                                background:
                                  this.state.categoryH3ID ==
                                  category.ProductCategoryID
                                    ? "#ebebeb"
                                    : "white",
                              }}
                              onClick={categoryClick.bind(this, "3")}
                              id={category.ProductCategoryID}
                            >
                              {category.ProductCategory}
                            </Button>
                          ))
                        : null}
                    </div>
                    <div className="CategorySelectorSection">
                      {this.state.categoryH4
                        ? this.state.categoryH4.map((category) => (
                            <Button
                              className="CategorySelectorItem"
                              style={{
                                color:
                                  this.state.categoryH4ID ==
                                  category.ProductCategoryID
                                    ? "#3d3d3d"
                                    : "#3d3d3d",
                                background:
                                  this.state.categoryH4ID ==
                                  category.ProductCategoryID
                                    ? "#ebebeb"
                                    : "white",
                              }}
                              onClick={categoryClick.bind(this, "4")}
                              id={category.ProductCategoryID}
                            >
                              {category.ProductCategory}
                            </Button>
                          ))
                        : null}
                    </div>
                  </div>
                </div>

                <p className="Label">Currently Chosen:</p>
                <div className="Label">
                  {this.state.categoryH1Name ? (
                    <span>
                      {this.state.categoryH1Name}
                      {this.state.categoryH2Name ? (
                        <span>
                          {" > " + this.state.categoryH2Name}
                          {this.state.categoryH3Name ? (
                            <span>
                              {" > " + this.state.categoryH3Name}
                              {this.state.categoryH4Name ? (
                                <span>{" > " + this.state.categoryH4Name}</span>
                              ) : null}
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
            <br />
            <Card id="productDetails" className="SubContainer">
              <CardContent>
                <p className="Heading">Product Details</p>
                <FormControl
                  variant="outlined"
                  className="InputField"
                  size="small"
                >
                  <InputLabel shrink htmlFor="productSupplier">
                    Supplier
                  </InputLabel>
                  <Select
                    native
                    label="Supplier"
                    value={this.state.productSupplier}
                    onChange={this.handleChange.bind(this, "Product Supplier")}
                    inputProps={{
                      name: "Product Supplier",
                      id: "productSupplier",
                    }}
                    error={this.state.productSupplierEmpty}
                    onFocus={this.setHint.bind(this, "ProductSupplier")}
                    onBlur={() =>
                      this.setState({
                        FocusOn: false,
                      })
                    }
                  >
                    <option aria-label="None" value="" />
                    {createMenusForDropDownUsers}
                  </Select>
                </FormControl>
                {this.state.productSupplierEmpty && (
                  <p className="error">Product supplier cannot be empty.</p>
                )}
                <div className="HorizontalContainer">
                  <TextField
                    id="productSku"
                    value={this.state.sku}
                    error={this.state.skuEmpty}
                    onChange={this.handleChange.bind(this, "SKU")}
                    InputLabelProps={{
                      shrink: "true",
                    }}
                    error={this.state.skuEmpty || this.state.skuNotLongEnough}
                    className="InputField"
                    size="small"
                    label="Parent SKU"
                    variant="outlined"
                    onFocus={this.setHint.bind(this, "ProductSKU")}
                    onBlur={() =>
                      this.setState({
                        FocusOn: false,
                      })
                    }
                  />

                  {/* <Link className="nav-link" to={"/productStocksIn"}>
                    Scan Now
                  </Link> */}
                </div>

                {this.state.skuEmpty && (
                  <p className="error">Product SKU cannot be empty.</p>
                )}
                {this.state.skuNotLongEnough && this.state.sku && (
                  <p className="error">
                    Product SKU has to be at least 8 characters long.
                  </p>
                )}
                <div className="HorizontalContainer ">
                  <div className="InputFieldFirstElement">
                    <TextField
                      id="productBrand"
                      className="CategorySelectorItem"
                      label="Brand"
                      value={this.state.brand}
                      onChange={this.handleChange.bind(this, "Brand")}
                      onFocus={this.setHint.bind(this, "ProductBrand")}
                      onBlur={() =>
                        this.setState({
                          FocusOn: false,
                        })
                      }
                      error={this.state.brandEmpty}
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: "true",
                      }}
                    />
                    {this.state.brandEmpty && <br />}
                    {this.state.brandEmpty && (
                      <p className="error">Product brand cannot be empty.</p>
                    )}
                  </div>
                  <div className="InputFieldSecondElement">
                    <TextField
                      id="productModel"
                      className="CategorySelectorItem"
                      label="Model"
                      value={this.state.model}
                      onChange={this.handleChange.bind(this, "Model")}
                      onFocus={this.setHint.bind(this, "ProductModel")}
                      onBlur={() =>
                        this.setState({
                          FocusOn: false,
                        })
                      }
                      error={this.state.modelEmpty}
                      variant="outlined"
                      size="small"
                      InputLabelProps={{
                        shrink: "true",
                      }}
                    />
                    <br />
                    {this.state.modelEmpty && (
                      <p className="error">Product model cannot be empty.</p>
                    )}
                  </div>
                </div>
                {/* <TextField
                  id="productDescription"
                  label="Product Description"
                  multiline
                  defaultValue="Default Value"
                  value={this.state.description}
                  variant="outlined"
                  onChange={this.handleChange.bind(this, "description")}
                  onFocus={this.setHint.bind(this, "ProductDescription")}
                  onBlur={() =>
                    this.setState({
                      FocusOn: false,
                    })
                  }
                  className="InputField"
                  InputLabelProps={{
                    shrink: "true",
                  }}
                  size="small"
                  error={this.state.productDesciptionEmpty}
                /> */}

                <TextField
                  id="productTags"
                  label="Product Tags"
                  value={this.state.tags}
                  onChange={this.handleChange.bind(this, "Tags")}
                  onFocus={this.setHint.bind(this, "ProductTags")}
                  onBlur={() =>
                    this.setState({
                      FocusOn: false,
                    })
                  }
                  className="InputField"
                  InputLabelProps={{
                    shrink: "true",
                  }}
                  size="small"
                  variant="outlined"
                  error={this.state.productTagsEmpty}
                />
                {this.state.productTagsEmpty && (
                  <p className="error">Product tags cannot be empty.</p>
                )}
              </CardContent>
            </Card>
            <br />
            <Card id="descriptionCard" className="SubContainer">
              <CardContent>
                <p className="Heading">Product Description</p>
                <CKEditor
                  className="descriptionContainer"
                  editor={Editor}
                  config={editorConfiguration}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    this.setState({ description: data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
                {/* <Button
                  onClick={this.saveDesign}
                  variant="outlined"
                  className="AddButton"
                >
                  Save Design
                </Button> */}
                {this.state.productDesciptionEmpty && (
                  <p className="error">Product description cannot be empty.</p>
                )}
              </CardContent>
            </Card>
            <br />
            <Card className="SubContainer" id="productVariation">
              <CardContent>
                <p className="Heading">Product Variations</p>
                {!this.state.variation1On && !this.state.variation2On ? (
                  <div>
                    <InputGroup className="InputField">
                      <InputGroupAddon type="prepend">
                        <InputGroupText className="groupText">
                          RM
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        value={this.state.price}
                        invalid={this.state.priceEmpty}
                        onChange={this.handleChange.bind(this, "Price")}
                        placeholder="Price"
                        type="number"
                        step=".10"
                        onFocus={this.setHint.bind(this, "ProductPrice")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                    </InputGroup>
                    {this.state.priceEmpty ? (
                      <p className="error">
                        Price has to be filled and not less than 0.
                      </p>
                    ) : null}
                    <div className="Margin ItemContainer">
                      <TextField
                        id="standard-start-adornment"
                        label="Stock"
                        variant="outlined"
                        className="InputField"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        size="small"
                        value={this.state.stock}
                        error={this.state.stockEmpty}
                        type="number"
                        onChange={this.handleChange.bind(this, "stock")}
                        onFocus={this.setHint.bind(this, "ProductStock")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                      {this.state.stockEmpty ? (
                        <p className="error">
                          Stock has to be filled and not less than 0.
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {this.state.variation1On ? (
                  <div className="VariantMain">
                    <div className="VariantText">
                      <p>Variation 1</p>
                    </div>
                    <div className="VariantOptionsSection">
                      <TextField
                        className="InputField"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        onChange={this.handleChange.bind(
                          this,
                          "Variation1Name"
                        )}
                        value={this.state.variation1Name}
                        error={this.state.variation1NameEmpty}
                        label="Name"
                        id="standard-start-adornment"
                        size="small"
                        variant="outlined"
                        onFocus={this.setHint.bind(this, "VariationName")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                      {this.state.variation1NameEmpty ? (
                        <p className="error">
                          Variation name has to be filled.
                        </p>
                      ) : null}

                      {[...Array(this.state.variation1Options)].map((e, i) => (
                        <div>
                          <div className="VariantOption">
                            <RemoveCircleOutlineIcon
                              className="DeleteOptionButton"
                              color="secondary"
                              onClick={this.onDeleteVariant.bind(
                                this,
                                i,
                                "variant1Option"
                              )}
                            />
                            <TextField
                              className="InputField"
                              InputLabelProps={{
                                shrink: "true",
                              }}
                              label={"Option " + (i + 1)}
                              id="standard-start-adornment"
                              size="small"
                              variant="outlined"
                              key={i}
                              onChange={this.handleChangeOptions.bind(
                                this,
                                "variant1Options",
                                i
                              )}
                              error={
                                this.state.variation1.options[i].errorOption
                              }
                              onFocus={this.setHint.bind(this, "VariantOption")}
                              onBlur={() =>
                                this.setState({
                                  FocusOn: false,
                                })
                              }
                              value={
                                this.state.variation1.options[i].optionName
                              }
                            />
                          </div>
                          {this.state.variation1.options[i].errorOption ? (
                            <p className="error">
                              Variation option name has to be filled.
                            </p>
                          ) : null}
                        </div>
                      ))}

                      <Button
                        variant="outlined"
                        className="AddButton"
                        onClick={this.addOptions.bind(this, "1")}
                      >
                        Add Option
                      </Button>
                    </div>
                    <br />
                    <CloseIcon
                      className="DeleteVariantButton"
                      color="secondary"
                      onClick={this.onDeleteVariant.bind(this, -1, "variant1")}
                    />
                  </div>
                ) : null}
                {this.state.variation1On ? <br /> : null}

                {this.state.variation2On ? (
                  <div className="VariantMain">
                    <div className="VariantText">
                      <p>Variation 2</p>
                    </div>
                    <div className="VariantOptionsSection">
                      <TextField
                        className="InputField"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        onChange={this.handleChange.bind(
                          this,
                          "Variation2Name"
                        )}
                        onFocus={this.setHint.bind(this, "VariationName")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                        value={this.state.variation2Name}
                        error={this.state.variation2NameEmpty}
                        label="Name"
                        id="standard-start-adornment"
                        size="small"
                        variant="outlined"
                      />

                      {this.state.variation2NameEmpty ? (
                        <p className="error">
                          Variation name has to be filled.
                        </p>
                      ) : null}

                      {[...Array(this.state.variation2Options)].map((e, i) => (
                        <div>
                          <div className="VariantOption">
                            <RemoveCircleOutlineIcon
                              className="DeleteOptionButton"
                              color="secondary"
                              onClick={this.onDeleteVariant.bind(
                                this,
                                i,
                                "variant2Option"
                              )}
                            />
                            <TextField
                              className="InputField"
                              InputLabelProps={{
                                shrink: "true",
                              }}
                              label={"Option " + (i + 1)}
                              id="standard-start-adornment"
                              size="small"
                              variant="outlined"
                              onChange={this.handleChangeOptionsVariant2.bind(
                                this,
                                "variant2Options",
                                0,
                                i
                              )}
                              onFocus={this.setHint.bind(this, "VariantOption")}
                              onBlur={() =>
                                this.setState({
                                  FocusOn: false,
                                })
                              }
                              value={
                                this.state.variation1.options[0]
                                  .variation2Options.options[i].optionName
                              }
                              error={
                                this.state.variation1.options[0]
                                  .variation2Options.options[i].errorOption
                              }
                            />
                          </div>
                          {this.state.variation1.options[0].variation2Options
                            .options[i].errorOption ? (
                            <p className="error">
                              Variation option name has to be filled.
                            </p>
                          ) : null}
                        </div>
                      ))}
                      <Button
                        variant="outlined"
                        className="AddButton"
                        onClick={this.addOptions.bind(this, "2")}
                      >
                        Add Option
                      </Button>
                    </div>
                    <br />
                    <CloseIcon
                      className="DeleteVariantButton"
                      color="secondary"
                      onClick={this.onDeleteVariant.bind(this, -1, "variant2")}
                    />
                  </div>
                ) : null}

                {/* {this.state.variation2On ? <br /> : null} */}
                {!this.state.variation1On || !this.state.variation2On ? (
                  <div className="ItemContainer">
                    <Button
                      variant="outlined"
                      className="AddButton"
                      onClick={this.addProductVariant.bind(this, "variation")}
                    >
                      Add Variant
                    </Button>
                  </div>
                ) : null}

                {this.state.variation1On ? (
                  <p className="FontType1">Variations Information</p>
                ) : null}
                {this.state.variation1On ? (
                  <div className="VariantMain">
                    <div className="ItemContainer">
                      <div className="VariantContainer">
                        <InputGroup className="ItemContainer">
                          <InputGroupAddon type="prepend">
                            <InputGroupText className="groupText">
                              RM
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            onChange={this.handleChange.bind(this, "Price")}
                            value={this.state.price}
                            // invalid={this.state.priceEmpty}
                            placeholder="Price"
                            type="number"
                            step=".10"
                            onFocus={this.setHint.bind(this, "VariationPrice")}
                            onBlur={() =>
                              this.setState({
                                FocusOn: false,
                              })
                            }
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="StockField">
                      <TextField
                        id="standard-start-adornment"
                        label="Stock"
                        variant="outlined"
                        className="InputField2"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        type="number"
                        onChange={this.handleChange.bind(this, "stock")}
                        // error={this.state.stockEmpty}
                        onFocus={this.setHint.bind(this, "VariationStock")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                        value={this.state.stock}
                        size="small"
                      />
                    </div>
                    <div className="StockField">
                      <TextField
                        id="standard-start-adornment"
                        label="Parent SKU"
                        variant="outlined"
                        className="InputField2"
                        InputLabelProps={{
                          shrink: "true",
                        }}
                        onChange={this.handleChange.bind(this, "SKU")}
                        onFocus={this.setHint.bind(this, "VariationSKU")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                        value={this.state.sku}
                        // error={this.state.skuEmpty}
                        size="small"
                      />
                    </div>

                    <Button variant="outlined" className="ApplyAllButton">
                      Apply to All
                    </Button>
                  </div>
                ) : null}

                {this.state.variation1On ? (
                  <p className="FontType1">Variations List</p>
                ) : null}
                {this.state.variation1On ? (
                  <table className="TableMain">
                    <tr className="trHeading">
                      <td className="tdHeading">
                        {this.state.variation1Name
                          ? this.state.variation1Name
                          : "Variation 1 Name"}
                      </td>
                      {this.state.variation2On ? (
                        <td className="tdHeading">
                          {this.state.variation2Name
                            ? this.state.variation2Name
                            : "Variation 2 Name"}
                        </td>
                      ) : null}
                      <td className="tdHeading"> Price </td>
                      <td className="tdHeading"> Stock </td>
                      <td className="tdHeading">SKU</td>
                    </tr>

                    {[...Array(this.state.variation1Options)].map((a, x) =>
                      this.state.variation2On ? (
                        <tr className="trBody">
                          <td className="tdNestedText">
                            {this.state.variation1.options[x].optionName
                              ? this.state.variation1.options[x].optionName
                              : "Option " + (x + 1) + " Variant 1"}
                          </td>
                          <td colSpan="4">
                            <table>
                              {[...Array(this.state.variation2Options)].map(
                                (e, i) => (
                                  <tr className="trBody">
                                    <td className="tdNestedNew">
                                      {this.state.variation1.options[x]
                                        .variation2Options.options[i].optionName
                                        ? this.state.variation1.options[x]
                                            .variation2Options.options[i]
                                            .optionName
                                        : "Option " + (i + 1) + " Variant 2"}
                                    </td>
                                    <td className="tdNestedNew">
                                      <div className="StepContainer">
                                        <InputGroup className="TextFieldsTables">
                                          <InputGroupAddon type="prepend">
                                            <InputGroupText className="groupText">
                                              RM
                                            </InputGroupText>
                                          </InputGroupAddon>

                                          <FormInput
                                            type="number"
                                            step=".10"
                                            key={"price " + i}
                                            onChange={this.handleChangeOptionsVariant2.bind(
                                              this,
                                              "variation2Price",
                                              x,
                                              i
                                            )}
                                            onFocus={this.setHint.bind(
                                              this,
                                              "VariationPrice"
                                            )}
                                            onBlur={() =>
                                              this.setState({
                                                FocusOn: false,
                                              })
                                            }
                                            value={
                                              this.state.variation1.options[x]
                                                .variation2Options.options[i]
                                                .price
                                            }
                                            invalid={
                                              this.state.variation1.options[x]
                                                .variation2Options.options[i]
                                                .errorPrice
                                            }
                                          />
                                        </InputGroup>
                                        {this.state.variation1.options[x]
                                          .variation2Options.options[i]
                                          .errorPrice ? (
                                          <Tooltip
                                            placement="top-end"
                                            title="Price has to be filled and greater than 0."
                                            interactive="true"
                                          >
                                            <p className="error">*</p>
                                          </Tooltip>
                                        ) : null}
                                      </div>
                                    </td>
                                    <td className="tdNestedNew">
                                      <div className="StepContainer">
                                        <TextField
                                          id="productStock1"
                                          size="small"
                                          onChange={this.handleChangeOptionsVariant2.bind(
                                            this,
                                            "variation2Stock",
                                            x,
                                            i
                                          )}
                                          onFocus={this.setHint.bind(
                                            this,
                                            "VariationStock"
                                          )}
                                          onBlur={() =>
                                            this.setState({
                                              FocusOn: false,
                                            })
                                          }
                                          value={
                                            this.state.variation1.options[x]
                                              .variation2Options.options[i]
                                              .stock
                                          }
                                          error={
                                            this.state.variation1.options[x]
                                              .variation2Options.options[i]
                                              .errorStock
                                          }
                                          type="number"
                                          InputLabelProps={{
                                            shrink: "true",
                                          }}
                                          variant="outlined"
                                          className="InputField2"
                                          // error={this.state.stock || this.state.skuNotLongEnough}
                                        />
                                        {this.state.variation1.options[x]
                                          .variation2Options.options[i]
                                          .errorStock ? (
                                          <Tooltip
                                            placement="top-end"
                                            title="Stock has to be filled and greater than 0."
                                            interactive="true"
                                          >
                                            <p className="error">*</p>
                                          </Tooltip>
                                        ) : null}
                                      </div>
                                    </td>
                                    <td className="tdNestedNew">
                                      <div className="StepContainer">
                                        <TextField
                                          id="productStock1"
                                          size="small"
                                          onChange={this.handleChangeOptionsVariant2.bind(
                                            this,
                                            "variation2SKU",
                                            x,
                                            i
                                          )}
                                          onFocus={this.setHint.bind(
                                            this,
                                            "VariationSKU"
                                          )}
                                          onBlur={() =>
                                            this.setState({
                                              FocusOn: false,
                                            })
                                          }
                                          value={
                                            this.state.variation1.options[x]
                                              .variation2Options.options[i].sku
                                          }
                                          error={
                                            this.state.variation1.options[x]
                                              .variation2Options.options[i]
                                              .errorSKU
                                          }
                                          type="number"
                                          InputLabelProps={{
                                            shrink: "true",
                                          }}
                                          variant="outlined"
                                          className="InputField2"
                                          // error={this.state.stock || this.state.skuNotLongEnough}
                                        />
                                        {this.state.variation1.options[x]
                                          .variation2Options.options[i]
                                          .errorSKU ? (
                                          <Tooltip
                                            placement="top-end"
                                            title="SKU has to be filled and at least 8 characters long."
                                            interactive="true"
                                          >
                                            <p className="error">*</p>
                                          </Tooltip>
                                        ) : null}
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </table>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td className="tdNestedText">
                            {this.state.variation1.options[x].optionName
                              ? this.state.variation1.options[x].optionName
                              : "Option " + (x + 1) + " Variant 1"}
                          </td>
                          <td className="tdNestedText">
                            <div className="StepContainer">
                              <InputGroup className="ItemContainer">
                                <InputGroupAddon type="prepend">
                                  <InputGroupText className="groupText">
                                    RM
                                  </InputGroupText>
                                </InputGroupAddon>
                                <FormInput
                                  type="number"
                                  step=".10"
                                  onFocus={this.setHint.bind(
                                    this,
                                    "VariationPrice"
                                  )}
                                  onBlur={() =>
                                    this.setState({
                                      FocusOn: false,
                                    })
                                  }
                                  onChange={this.handleChangeOptions.bind(
                                    this,
                                    "variation1Price",
                                    x
                                  )}
                                  value={this.state.variation1.options[x].price}
                                  invalid={
                                    this.state.variation1.options[x].errorPrice
                                  }
                                />
                              </InputGroup>
                              {this.state.variation1.options[x].errorPrice ? (
                                <Tooltip
                                  placement="top-end"
                                  title="Price has to be filled and greater than 0."
                                  interactive="true"
                                >
                                  <p className="error">*</p>
                                </Tooltip>
                              ) : null}
                            </div>
                          </td>
                          <td className="tdNestedText">
                            <div className="StepContainer">
                              <TextField
                                id="productStock1"
                                value={this.state.variation1.options[x].stock}
                                error={
                                  this.state.variation1.options[x].errorStock
                                }
                                size="small"
                                onFocus={this.setHint.bind(
                                  this,
                                  "VariationStock"
                                )}
                                onBlur={() =>
                                  this.setState({
                                    FocusOn: false,
                                  })
                                }
                                onChange={this.handleChangeOptions.bind(
                                  this,
                                  "variation1Stock",
                                  x
                                )}
                                type="number"
                                InputLabelProps={{
                                  shrink: "true",
                                }}
                                variant="outlined"
                                className="InputField2"
                                // error={this.state.stock || this.state.skuNotLongEnough}
                              />
                              {this.state.variation1.options[x].errorStock ? (
                                <Tooltip
                                  placement="top-end"
                                  title="Stock has to be filled and greater than 0."
                                  interactive="true"
                                >
                                  <p className="error">*</p>
                                </Tooltip>
                              ) : null}
                            </div>
                          </td>
                          <td className="tdNestedText">
                            <div className="StepContainer">
                              <TextField
                                id="productSku"
                                size="small"
                                value={this.state.variation1.options[x].sku}
                                onFocus={this.setHint.bind(
                                  this,
                                  "VariationSKU"
                                )}
                                onBlur={() =>
                                  this.setState({
                                    FocusOn: false,
                                  })
                                }
                                onChange={this.handleChangeOptions.bind(
                                  this,
                                  "variation1SKU",
                                  x
                                )}
                                InputLabelProps={{
                                  shrink: "true",
                                }}
                                variant="outlined"
                                className="InputField2"
                                error={
                                  this.state.variation1.options[x].errorSKU
                                }
                              />
                              {this.state.variation1.options[x].errorSKU ? (
                                <Tooltip
                                  placement="top-end"
                                  title="SKU has to be filled and be at least 8 characters long."
                                  interactive="true"
                                >
                                  <p className="error">*</p>
                                </Tooltip>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </table>
                ) : null}

                <p className="FontType1">Wholesale Prices</p>
                {!this.state.wholeSaleOn ? (
                  <div className="ItemContainer">
                    <Button
                      variant="outlined"
                      className="AddButton"
                      onClick={this.addProductVariant.bind(this, "priceTier")}
                    >
                      Add Price Tiers
                    </Button>
                  </div>
                ) : null}
                {this.state.wholeSaleOn ? (
                  <div className="wholeSale">
                    <div>
                      {[...Array(this.state.wholeSaleOptions)].map((e, i) => (
                        <div className="wholeSaleRows">
                          <RemoveCircleOutlineIcon
                            className="deleteButtonWholeSale"
                            color="secondary"
                            className="deleteButtonWholeSale"
                            onClick={this.onDeleteVariant.bind(
                              this,
                              i,
                              "wholeSaleOption"
                            )}
                          />
                          <span className="VariantText deleteButtonWholeSale">
                            {"Price Tier " + (i + 1)}
                          </span>
                          <div className="PriceList">
                            <div className="MiddleDiv">
                              <TextField
                                label="Min"
                                variant="outlined"
                                className="MiddleText"
                                onFocus={this.setHint.bind(
                                  this,
                                  "WholeSaleMin"
                                )}
                                onBlur={() =>
                                  this.setState({
                                    FocusOn: false,
                                  })
                                }
                                InputLabelProps={{
                                  shrink: "true",
                                }}
                                type="number"
                                onChange={this.handleChangeOptions.bind(
                                  this,
                                  "wholeSaleMin",
                                  i
                                )}
                                value={this.state.priceTierList[i].min}
                                error={this.state.priceTierList[i].errorMin}
                                size="small"
                              />
                            </div>
                            <div className="MiddleDiv">
                              <TextField
                                InputLabelProps={{
                                  shrink: "true",
                                }}
                                className="MiddleText"
                                variant="outlined"
                                label="Max"
                                type="number"
                                onFocus={this.setHint.bind(
                                  this,
                                  "WholeSaleMax"
                                )}
                                onBlur={() =>
                                  this.setState({
                                    FocusOn: false,
                                  })
                                }
                                onChange={this.handleChangeOptions.bind(
                                  this,
                                  "wholeSaleMax",
                                  i
                                )}
                                value={this.state.priceTierList[i].max}
                                error={this.state.priceTierList[i].errorMax}
                                size="small"
                              />
                            </div>
                            <InputGroup className="mb-2 MiddleText">
                              <InputGroupAddon type="prepend">
                                <InputGroupText className="groupText">
                                  RM
                                </InputGroupText>
                              </InputGroupAddon>
                              <FormInput
                                type="number"
                                step=".10"
                                placeholder="Price"
                                onFocus={this.setHint.bind(
                                  this,
                                  "WholeSalePrice"
                                )}
                                onBlur={() =>
                                  this.setState({
                                    FocusOn: false,
                                  })
                                }
                                onChange={this.handleChangeOptions.bind(
                                  this,
                                  "wholeSalePrice",
                                  i
                                )}
                                value={this.state.priceTierList[i].price}
                                invalid={this.state.priceTierList[i].errorPrice}
                              />
                            </InputGroup>
                          </div>
                        </div>
                      ))}
                      <div className="AddButtonContainer">
                        <Button
                          variant="outlined"
                          className="AddButton"
                          onClick={this.addOptions.bind(this, "priceTier")}
                        >
                          Add Price Tier
                        </Button>
                      </div>
                    </div>

                    <br />
                    <CloseIcon
                      className="CloseButton"
                      color="secondary"
                      onClick={this.onDeleteVariant.bind(this, -1, "wholeSale")}
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
            <br />
            <Card className="SubContainer" id="productMedia">
              <CardContent>
                <p className="Heading">Product Media</p>
                <p className="FontType1">Product Images</p>
                <p className="FontType1">
                  Main product images of size 512x512:
                </p>
                <div className="DropZoneMain">
                  <div className="DropZoneGrid">
                    {!this.state.file1Added && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "512x512")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />
                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file1Added && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 1)}
                        onMouseEnter={this.mouseIn.bind(this, 1)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 1 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(0, "512x512")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url[0]}
                          alt=""
                        />
                      </div>
                    )}
                    {!this.state.file2Added && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "512x512")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />

                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file2Added && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 2)}
                        onMouseEnter={this.mouseIn.bind(this, 2)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 2 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(1, "512x512")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url[1]}
                          alt=""
                        />
                      </div>
                    )}
                    {!this.state.file3Added && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "512x512")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />
                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file3Added && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 3)}
                        onMouseEnter={this.mouseIn.bind(this, 3)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 3 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(2, "512x512")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url[2]}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {this.state.url.map((imageName, i) => (
                    <img
                      src={imageName}
                      data-key={i}
                      onLoad={this.onLoad.bind(this, "512x512")}
                      className="DropZoneImageForMeasurment"
                      alt=""
                    />
                  ))}
                </div>
                {this.state.notEnoughFiles512x512 && (
                  <p className="error">
                    There has to be at least 3 images of the size 512x512 added.
                  </p>
                )}
                <p className="FontType1">
                  Main product images of size 1600x900:
                </p>
                <div className="DropZoneMain">
                  <div className="DropZoneGrid">
                    {!this.state.file1Added2 && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "1600x900")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />
                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file1Added2 && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 4)}
                        onMouseEnter={this.mouseIn.bind(this, 4)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 4 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(0, "1600x900")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url2[0]}
                          alt=""
                        />
                      </div>
                    )}
                    {!this.state.file2Added2 && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "1600x900")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />
                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file2Added2 && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 5)}
                        onMouseEnter={this.mouseIn.bind(this, 5)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 5 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(1, "1600x900")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url2[1]}
                          alt=""
                        />
                      </div>
                    )}
                    {!this.state.file3Added2 && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "1600x900")}
                        accept="image/*"
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />
                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file3Added2 && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 6)}
                        onMouseEnter={this.mouseIn.bind(this, 6)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 6 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(2, "1600x900")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <img
                          className="DropZoneImage"
                          src={this.state.url2[2]}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {this.state.url2.map((imageName, i) => (
                    <img
                      src={imageName}
                      data-key={i}
                      onLoad={this.onLoad.bind(this, "1600x900")}
                      className="DropZoneImageForMeasurment"
                    />
                  ))}
                </div>
                {this.state.notEnoughFiles1600x900 && (
                  <p className="error">
                    There has to be at least 3 images of the size 1600x900
                    added.
                  </p>
                )}
                <p className="FontType1">Product Video:</p>
                <div className="DropZoneMain">
                  <div className="DropZoneGrid">
                    {!this.state.file1Added3 && (
                      <Dropzone
                        onDrop={this.handleDrop.bind(this, "video")}
                        accept="video/mov, video/mp4"
                        maxSize={157286400}
                        onFocus={this.setHint.bind(this, "ProductImages")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps({
                              className: "dropzone",
                            })}
                            style={{
                              borderColor: isDragActive
                                ? isDragReject
                                  ? "#fc5447"
                                  : "#a0d100"
                                : "#b8b8b8",
                              color: isDragActive
                                ? isDragReject
                                  ? "#a31702"
                                  : "#507500"
                                : "#828282",
                            }}
                          >
                            <input {...getInputProps()} />

                            <AddIcon className="DropZoneAddIcon" />
                          </div>
                        )}
                      </Dropzone>
                    )}
                    {this.state.file1Added3 && (
                      <div
                        onMouseLeave={this.mouseOut.bind(this, 7)}
                        onMouseEnter={this.mouseIn.bind(this, 7)}
                        className="DropZoneImageMain"
                      >
                        {this.state.onImage &&
                          this.state.currentlyHovered === 7 && (
                            <div className="DropZoneImageDeleteButtonDiv">
                              <IconButton
                                className="DropZoneImageDeleteButtonIconLocation"
                                onClick={() => this.onDelete(0, "video")}
                              >
                                <CloseIcon
                                  className="DropZoneImageDeleteButtonIcon"
                                  color="secondary"
                                />
                              </IconButton>
                            </div>
                          )}
                        <video className="DropZoneImage">
                          <source src={this.state.url3[0]} />
                        </video>
                      </div>
                    )}
                  </div>
                  <div>
                    {this.state.url3.map((imageName, i) => (
                      <img
                        src={imageName}
                        data-key={i}
                        onLoad={this.onLoad.bind(this, "video")}
                        className="DropZoneImageForMeasurment"
                      />
                    ))}
                  </div>
                </div>
                {this.state.notEnoughFilesVideo && (
                  <p className="error">
                    There has to be at least 1 video added.
                  </p>
                )}
                {this.state.variation1On ? (
                  <p className="FontType1">Product Variant 1:</p>
                ) : null}
                <div className="DropZoneVariantMain">
                  <div className="DropZoneGrid">
                    {[...Array(this.state.variation1Options)].map((e, i) =>
                      !this.state.variation1.options[i].picture ? (
                        <div className="DropZoneItemContainerVariant">
                          <Dropzone
                            onDrop={this.handleDropVariant.bind(
                              this,
                              "variant1",
                              i
                            )}
                            accept="image/*"
                            maxSize={157286400}
                            onFocus={this.setHint.bind(this, "ProductImages")}
                            onBlur={() =>
                              this.setState({
                                FocusOn: false,
                              })
                            }
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              isDragAccept,
                              isDragReject,
                            }) => (
                              <div
                                {...getRootProps({
                                  className: "dropzone",
                                })}
                                style={{
                                  borderColor: isDragActive
                                    ? isDragReject
                                      ? "#fc5447"
                                      : "#a0d100"
                                    : "#b8b8b8",
                                  color: isDragActive
                                    ? isDragReject
                                      ? "#a31702"
                                      : "#507500"
                                    : "#828282",
                                }}
                              >
                                <input {...getInputProps()} />

                                <AddIcon className="DropZoneAddIcon" />
                              </div>
                            )}
                          </Dropzone>
                          <p className="DropZoneVariantName">
                            {this.state.variation1.options[i].optionName
                              ? this.state.variation1.options[i].optionName
                              : "Variant 1 Option " + (i + 1)}
                          </p>
                        </div>
                      ) : (
                        this.state.variation1.options[i].picture && (
                          <div
                            onMouseLeave={this.mouseOut.bind(this, 8 + i)}
                            onMouseEnter={this.mouseIn.bind(this, 8 + i)}
                            className="DropZoneImageMain"
                          >
                            {this.state.onImage &&
                              this.state.currentlyHovered === 8 + i && (
                                <div className="DropZoneImageDeleteButtonDiv">
                                  <IconButton
                                    className="DropZoneImageDeleteButtonIconLocation"
                                    onClick={() => this.onDelete(i, "variant")}
                                  >
                                    <CloseIcon
                                      className="DropZoneImageDeleteButtonIcon"
                                      color="secondary"
                                    />
                                  </IconButton>
                                </div>
                              )}
                            <img
                              className="DropZoneImage"
                              src={this.state.variation1.options[i].pictureURL}
                              alt=""
                            />
                            <img
                              src={this.state.variation1.options[i].pictureURL}
                              data-key={i}
                              onLoad={this.onLoad.bind(this, "variant")}
                              className="DropZoneImageForMeasurment"
                            />
                            <p className="DropZoneVariantName">
                              {this.state.variation1.options[i].optionName
                                ? this.state.variation1.options[i].optionName
                                : "Variant 1 Option " + (i + 1)}
                            </p>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <br />
            <Card className="SubContainer" id="shippingInfo">
              <CardContent>
                <p className="Heading">Shipping Information</p>

                <div className="HorizontalContainer">
                  <p className="FontType3">Dimension: </p>
                  <div className="InputFieldMiddleElementNested">
                    <p className="FontTypeInputLabel">Height</p>
                    <InputGroup className="InputFieldMiddleElementNested">
                      <FormInput
                        step=".10"
                        type="number"
                        value={this.state.height}
                        invalid={
                          this.state.heightEmpty || this.state.heightNotDecimal
                        }
                        onChange={this.handleChange.bind(this, "height")}
                        onFocus={this.setHint.bind(this, "ProductHeight")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                      <InputGroupAddon type="append">
                        <InputGroupText className="groupText">m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  {/* {this.state.heightEmpty && <br />} */}
                  <div className="InputFieldMiddleElementNested">
                    <p className="FontTypeInputLabel">Width</p>
                    <InputGroup className="InputFieldMiddleElementNested">
                      <FormInput
                        type="number"
                        step=".10"
                        value={this.state.width}
                        invalid={
                          this.state.widthEmpty || this.state.widthNotDecimal
                        }
                        onChange={this.handleChange.bind(this, "width")}
                        onFocus={this.setHint.bind(this, "ProductWidth")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                      <InputGroupAddon type="append">
                        <InputGroupText className="groupText">m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="InputFieldMiddleElementNested">
                    <p className="FontTypeInputLabel">Depth</p>
                    <InputGroup className="InputFieldSecondElement">
                      <FormInput
                        type="number"
                        step=".10"
                        value={this.state.depth}
                        invalid={
                          this.state.depthEmpty || this.state.depthNotDecimal
                        }
                        onChange={this.handleChange.bind(this, "depth")}
                        onFocus={this.setHint.bind(this, "ProductDepth")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                      />
                      <InputGroupAddon type="append">
                        <InputGroupText className="groupText">m</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>

                {this.state.heightEmpty && (
                  <p className="error">Product height cannot be empty.</p>
                )}
                {this.state.heightNotDecimal && this.state.height && (
                  <p className="error">
                    Product height has to be positive and in two decimal places.
                  </p>
                )}
                {this.state.widthEmpty && (
                  <p className="error">Product width cannot be empty.</p>
                )}
                {this.state.widthNotDecimal && this.state.width && (
                  <p className="error">
                    Product width has to be positive and in two decimal places.
                  </p>
                )}
                {this.state.depthEmpty && (
                  <p className="error">Product depth cannot be empty.</p>
                )}
                {this.state.depthNotDecimal && this.state.depth && (
                  <p className="error">
                    Product depth has to be positive and in two decimal places.
                  </p>
                )}
                <div className="HorizontalContainer">
                  <div className="InputFieldMiddleElement">
                    <p className="FontTypeInputLabel">Weight</p>
                    <InputGroup className="InputField">
                      <FormInput
                        type="number"
                        step=".10"
                        value={this.state.weight}
                        onChange={this.handleChange.bind(this, "weight")}
                        onFocus={this.setHint.bind(this, "ProductWeight")}
                        onBlur={() =>
                          this.setState({
                            FocusOn: false,
                          })
                        }
                        invalid={
                          this.state.weightEmpty || this.state.weightNotDecimal
                        }
                      />
                      <InputGroupAddon type="append">
                        <InputGroupText className="groupText">
                          kg
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>
                {this.state.weightEmpty && (
                  <p className="error">Product weight cannot be empty.</p>
                )}

                {this.state.weightNotDecimal && this.state.weight && (
                  <p className="error">
                    Product weight has to be in two decimal place.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <br />
          <div className="SubmitButtonContainer">
            <Button variant="outlined" className="SubmitButton">
              Review Product Details
            </Button>
          </div>
        </div>

        <div className="StepContainer">
          <div className="ProgressTab">
            <Card>
              <CardContent>
                <div className="HorizontalContainer">
                  <Stepper
                    activeStep={this.state.activeStep}
                    orientation="vertical"
                    className="ItemContainer"
                    nonLinear
                  >
                    <Step key="basicInfo">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#basicInfo"
                          className="FontType4"
                        >
                          Basic Information
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressBasic}
                        />
                      </StepContent>
                    </Step>
                    <Step key="productDetails">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#productDetails"
                          className="FontType4"
                        >
                          Product Details
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressDetails}
                        />
                      </StepContent>
                    </Step>
                    <Step key="descriptionCard">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#descriptionCard"
                          className="FontType4"
                        >
                          Product Description
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressDescription}
                        />
                      </StepContent>
                    </Step>
                    <Step key="productVariations">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#productVariation"
                          className="FontType4"
                        >
                          Product Variations
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressVariation}
                        />
                      </StepContent>
                    </Step>
                    <Step key="productMedia">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#productMedia"
                          className="FontType4"
                        >
                          Product Media
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressMedia}
                        />
                      </StepContent>
                    </Step>
                    <Step key="shippingInfo">
                      <StepLabel>
                        <HashLink
                          to="/addProductsAllIn#shippingInfo"
                          className="FontType4"
                        >
                          Shipping Information
                        </HashLink>
                      </StepLabel>
                      <StepContent>
                        <LinearProgressWithLabel
                          value={this.state.progressShipping}
                        />
                      </StepContent>
                    </Step>
                  </Stepper>
                </div>
              </CardContent>
            </Card>
            <Fade in={this.state.FocusOn}>
              <br />
              <Card className="HintsCard">
                <CardContent>
                  <div className="HintsContainer">
                    <div className="HintsTitleContainer">
                      <InfoOutlinedIcon
                        color="disabled"
                        className="HintsIcon"
                      />
                      <p className="HintsTitleText">Hints</p>
                    </div>
                    <div className="HintsBodyContainer">
                      <ul>
                        {this.state.helpText.map((text) => (
                          <li>
                            <p className="HintBodyText">{text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductComponent);
