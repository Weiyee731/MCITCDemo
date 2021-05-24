import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "./productDetails.component.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddIcon from "@material-ui/icons/Add";
import Logo from "../../assets/myshops.png";
import Dropzone from "react-dropzone";
import {
  Card,
  CardContent,
  CardActions,
  // ThemeProvider,
} from "@material-ui/core";
import { toast } from "react-toastify";
const styles = {
  customWidth: {
    width: 200,
  },
};

function mapStateToProps(state) {
  return {
    allcategories: state.counterReducer["categories"],
    allUser: state.counterReducer["supplier"],
    exist: state.counterReducer["exists"],
    updated: state.counterReducer["newProdObj"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callAllSupplierByUserStatus: (suppData) =>
      dispatch(GitAction.CallAllSupplierByUserStatus(suppData)),
    CallAllProductCategory: () => dispatch(GitAction.CallAllProductCategory()),
    callCheckProduct: (prodData) =>
      dispatch(GitAction.CallCheckProduct(prodData)),
    callUpdateProduct: (prodData) =>
      dispatch(GitAction.CallUpdateProduct(prodData)),
  };
}

const stylesDialog = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(stylesDialog)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class ProductDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    this.props.callAllSupplierByUserStatus("endorsed");
    this.props.CallAllProductCategory();
  }

  state = {
    ProductID: this.props.data.productID,
    purchaseDate: "",
    selectedStore: "Neden Kullanırız",
    selectedProduct: "Lorem",
    quantity: "",
    unitPrice: "",
    name: this.props.data.name,
    manufacturer: "",
    description: this.props.data.description,
    productCategory: this.props.data.productCategory,
    productSupplier: this.props.data.productSupplier,
    productShoplot: "",
    productGrid: "",
    height: this.props.data.height,
    width: this.props.data.width,
    depth: this.props.data.depth,
    weight: this.props.data.weight,
    sku: this.props.data.sku,
    brand: this.props.data.brand,
    model: this.props.data.model,
    tags: this.props.data.tags,
    picture: this.props.data.picture,
    categoryList: [],
    supplierList: [],
    shopLotList: [],
    gridList: [],
    toBeEdited: false,
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
    isOpen: false,
    row: this.props.data.row,
    open: false,
    images: JSON.parse(
      this.props.data.picture[this.props.data.row].ProductImages
    )
      ? JSON.parse(
          this.props.data.picture[this.props.data.row].ProductImages
        ).map((pic) => pic.ProductMediaUrl)
      : [],
    imagesIndex: JSON.parse(
      this.props.data.picture[this.props.data.row].ProductImages
    )
      ? JSON.parse(
          this.props.data.picture[this.props.data.row].ProductImages
        ).map((pic) => pic.ProductMediaID)
      : [],
    currentIndex: 0,
    // OnImage: false,
    currentlyHovered: 0,
    file1Added: false,
    file2Added: false,
    file3Added: false,
    file1Added2: false,
    file2Added2: false,
    file3Added2: false,
    onImage: false,
    currentlyHovered: 0,
    file: [],
    fileInfo: [],
    url: [],
    counter: 0,
    counter2: 0,
    file2: [],
    fileInfo2: [],
    url2: [],
    images512x512: [],
    images1600x900: [],
  };

  changeIndex = (i) => {
    this.setState({
      currentIndex: i,
    });
  };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });

    toast.success("cliked");
  };

  OnSubmitLogin(e) {
    e.preventDefault();

    this.props.callAddStock(this.state);
  }

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
    this.props.callCheckProduct(this.state.name.replaceAll(" ", "%20"));
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
      });
    } else {
      this.setState({
        productSupplierEmpty: false,
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
      });
    } else {
      this.setState({
        heightEmpty: false,
      });
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
      });
    } else {
      this.setState({
        widthEmpty: false,
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
      });
    } else {
      this.setState({
        depthEmpty: false,
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
      });
    } else {
      this.setState({
        weightEmpty: false,
      });
    }
  };

  checkProductDesc = () => {
    if (this.state.description === "" || this.state.description === null) {
      this.setState({
        productDesciptionEmpty: true,
      });
    } else {
      this.setState({
        productDesciptionEmpty: false,
      });
    }
  };

  checkBrand = () => {
    if (this.state.brand === "" || this.state.brand === null) {
      this.setState({
        brandEmpty: true,
      });
    } else {
      this.setState({
        brandEmpty: false,
      });
    }
  };

  checkModel = () => {
    if (this.state.model === "" || this.state.model === null) {
      this.setState({
        modelEmpty: true,
      });
    } else {
      this.setState({
        modelEmpty: false,
      });
    }
  };

  checkTags = () => {
    if (this.state.tags === "" || this.state.tags === null) {
      this.setState({
        productTagsEmpty: true,
      });
    } else {
      this.setState({
        productTagsEmpty: false,
      });
    }
  };

  checkSKU = () => {
    if (this.state.sku === "" || this.state.sku === null) {
      this.setState({
        skuEmpty: true,
      });
    } else {
      this.setState({
        skuEmpty: false,
      });
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

      setTimeout(
        function () {
          this.checkProductCat();
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
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkHeightIsDecimal();
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
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkProductWidth();
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
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkProductWeight();
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
        }.bind(this),
        200
      );

      setTimeout(
        function () {
          this.checkSKU();
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
        }.bind(this),
        200
      );
    }
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

    setTimeout(
      function () {
        this.uploadFile();
      }.bind(this),
      500
    );
  };

  uploadFile = () => {
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
        this.state.productTagsEmpty
      )
    ) {
      toast.success("Submitted!");
      this.props.callUpdateProduct(this.state);
      this.setState({
        toBeEdited: false,
      });
    } else {
      toast.success("still empty");
    }
  };

  goToNextPic = () => {
    if (this.state.currentIndex != this.state.images.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    } else {
      this.setState({
        currentIndex: 0,
      });
    }
  };

  goToPrevPic = () => {
    if (this.state.currentIndex != 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
      });
    } else {
      this.setState({
        currentIndex: this.state.images.length - 1,
      });
    }
  };

  handleClickOpen = (i) => {
    this.setState({ open: true, currentIndex: i });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  mouseOut = (id) => {
    toast.success("mouse out");
    this.setState({
      onImage: false,
      currentlyHovered: id,
    });
  };
  mouseIn = (id) => {
    toast.success("mouse in");
    this.setState({
      onImage: true,
      currentlyHovered: id,
    });
  };

  changeImage = (id) => {
    this.setState({
      currentIndex: id,
    });
  };

  saveImageChanges = () => {
    //TODO: add Api
  };

  deleteImage = (id) => {
    toast.success(this.state.images.map((image) => image));

    var newList = this.state.images;
    this.state.images.map((image, i) => {
      if (i === id) {
        if (this.state.images.length > 1) {
          this.setState({
            currentIndex: this.state.currentIndex - 1,
          });
        } else {
          this.setState({
            currentIndex: 0,
          });
        }
      }
    });

    newList = newList.filter((imagesKept, i) => i !== id);
    setTimeout(
      function () {
        this.setState({
          images: newList,
        });
      }.bind(this),
      500
    );

    var newList2 = this.state.imagesIndex;
    newList2 = newList2.filter((imagesKept, i) => i !== id);
    this.setState({
      imagesIndex: newList2,
    });
    toast.success("deleted");
  };

  handleDrop = (data, acceptedFiles) => {
    if (acceptedFiles.length > 3) {
      toast.error("Only 6 images are allowed.");
    } else {
      if (data === "512x512") {
        if (this.state.fileInfo.length + acceptedFiles.length > 3) {
          toast.error("Only 6 images are allowed.");
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
          // this.checkFiles512x512();
        }
      } else if (data === "1600x900") {
        if (this.state.fileInfo2.length + acceptedFiles.length > 3) {
          toast.error("Only 6 files are allowed.");
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
          // this.checkFiles1600x900();
        }
      }

      acceptedFiles.map((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      });
    }
  };

  onLoadImages = (id, e) => {
    // if (data == "512x512") {
    var heigth = e.target.height;
    var width = e.target.width;
    if (heigth === 512 || width === 512) {
      this.setState({
        images512x512: [...this.state.images512x512, this.state.images[id]],
      });
    }
    if (heigth === 900 || width === 1600) {
      this.setState({
        images1600x900: [...this.state.images1600x900, this.state.images[id]],
      });
    }
    // } else if (data == "1600x900") {
    // var heigth = e.target.height;
    // var width = e.target.width;
    // if (heigth != 900 || width != 1600) {
    //   this.removeFile(
    //     "1600x900",
    //     e.target.attributes.getNamedItem("data-key").value
    //   );
    //   alert("Images have to be 1600 x 900");
    // }
    // }
  };

  onLoad = (data, e) => {
    if (data === "512x512") {
      var heigth = e.target.height;
      var width = e.target.width;
      if (heigth != 512 || width != 512) {
        this.removeFile(
          "512x512",
          e.target.attributes.getNamedItem("data-key").value
        );
        toast.error("Images have to be 512 x 512");
      }
    } else if (data === "1600x900") {
      var heigth = e.target.height;
      var width = e.target.width;
      if (heigth != 900 || width != 1600) {
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
      // this.checkFiles512x512();
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
      // this.checkFiles1600x900();
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

  render() {
    const edit = (e) => {
      if (this.state.toBeEdited) {
        this.setState({
          toBeEdited: false,
        });
      } else {
        this.setState({
          toBeEdited: true,
        });
      }
      this.setState({
        productCategory:
          allcategoriesData[this.props.data.category].ProductCategoryID,
        productSupplier: allusersData[this.props.data.supplier - 1].UserID,
      });
    };

    const updateImage = () => {};
    const buttonStyle = { width: "100%" };
    let allStoresData = this.props.allstores
      ? Object.keys(this.props.allstores).map((key) => {
          return this.props.allstores[key];
        })
      : {};
    if (allStoresData.length > 0) {
      var createMenusForDropDown = allStoresData.map((d, i) => {
        return <MenuItem key={i} value={d.name} primaryText={d.name} />;
      });
    }
    let allProductsData = this.props.allproducts
      ? Object.keys(this.props.allproducts).map((key) => {
          return this.props.allproducts[key];
        })
      : {};
    if (allProductsData.length > 0) {
      var createMenusForDropDownProduct = allProductsData.map((d, i) => {
        return <MenuItem key={i} value={d.name} primaryText={d.name} />;
      });
    }

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

    let allgridData = this.props.allgridstorages
      ? Object.keys(this.props.allgridstorages).map((key) => {
          return this.props.allgridstorages[key];
        })
      : {};

    if (allgridData.length > 0) {
      var NotEmptyGrid = true;
      var createMenusForDropDownGrid = allgridData.map((d, i) => {
        return <option value={d.GridStorageID}>{d.GridStorageCode}</option>;
      });
    } else {
      var NotEmptyGrid = false;
    }

    let allshoplotsData = this.props.allshoplots
      ? Object.keys(this.props.allshoplots).map((key) => {
          return this.props.allshoplots[key];
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

    let complains = this.props.allcomplains
      ? Object.keys(this.props.allcomplains).map((key) => {
          return this.props.allcomplains[key];
        })
      : {};
    if (complains.length > 0) {
      var complainCard = complains.map((d, i) => {
        return (
          <div key={i} className="card">
            <div className="container">
              <h4>
                <b>{d.title}</b>
              </h4>
              <p>{d.description}</p>
            </div>
          </div>
        );
      });
    }

    const Shoplots = () => (
      <FormControl variant="outlined" style={{ width: "100%", margin: "5px" }}>
        <InputLabel htmlFor="productCategory">Shoplot</InputLabel>
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
      </FormControl>
    );

    const Grid = () => (
      <FormControl variant="outlined" style={{ width: "100%", margin: "5px" }}>
        <InputLabel htmlFor="productCategory">Grid Storage</InputLabel>
        <Select
          value={this.state.productGrid}
          onChange={this.handleChange.bind(this, "Product Grid Storage")}
          inputProps={{
            name: "Product Grid Storage",
            id: "productGridStorage",
          }}
          style={{ width: "100%" }}
        >
          <option aria-label="None" value="" />
          {createMenusForDropDownGrid}
        </Select>
      </FormControl>
    );
    const Shoplots2 = () => (
      <FormControl
        disabled
        variant="outlined"
        style={{ width: "100%", margin: "5px" }}
      >
        <InputLabel htmlFor="productCategory">Shoplot</InputLabel>
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
      </FormControl>
    );

    const back = () => {
      window.location.reload(false);
    };

    const Grid2 = () => (
      <FormControl
        disabled
        variant="outlined"
        style={{ width: "100%", margin: "5px" }}
      >
        <InputLabel htmlFor="productCategory">Grid Storage</InputLabel>
        <Select
          value={this.state.productGrid}
          onChange={this.handleChange.bind(this, "Product Grid Storage")}
          inputProps={{
            name: "Product Grid Storage",
            id: "productGridStorage",
          }}
          style={{ width: "100%" }}
        >
          <option aria-label="None" value="" />
          {createMenusForDropDownGrid}
        </Select>
      </FormControl>
    );

    const hiddenFileInput = React.createRef();
    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };
    const addImage = (event) => {
      const fileUploaded = event.target.files[0];
      // props.handleFile(fileUploaded);
    };

    const addImagesToArray = () => {
      this.setState({
        images: this.state.images.concat(
          JSON.parse(this.state.picture[this.state.row].ProductImages).map(
            (pic) => pic.ProductMediaUrl
          )
        ),
      });
    };

    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1>Product Details</h1>
        </div>
        <Button onClick={back}>
          <i class="fas fa-chevron-left"></i>Back
        </Button>
        <br />
        <div>
          <Card
            style={{
              width: "80%",
              marginRight: "10px",
              margin: "0 auto",
            }}
          >
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
              <br />
              <br />
              {this.state.toBeEdited ? (
                <div>
                  <div style={{ display: "flex" }}>
                    {/* <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={addImage}
                      style={{ display: "none" }}
                      accept="image/*"
                    /> */}
                    <TextField
                      id="text-field-controlled"
                      label="Product Name"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this, "product")}
                      style={{ width: "100%" }}
                      defaultValue={this.props.data2.index}
                      variant="outlined"
                      error={
                        this.state.productNameEmpty ||
                        this.state.productNameDublicated
                      }
                    />
                  </div>
                  <br />

                  {this.state.productNameEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product name cannot be empty.
                    </p>
                  )}

                  <p style={{ fontWeight: "bold" }}>Images of size 512x512:</p>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "start",
                      margin: "0 auto",
                    }}
                  >
                    {this.state.images.map((imageName, i) => (
                      <img
                        src={imageName}
                        data-key={i}
                        onLoad={this.onLoadImages.bind(this, i)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = Logo;
                        }}
                        style={{ display: "none" }}
                      />
                    ))}
                    {this.state.images512x512.map((pic, i) => (
                      <Button
                        onClick={this.changeImage.bind(this, i)}
                        style={{ width: "120px", height: "120px" }}
                      >
                        <div
                          style={{
                            // borderWidth: "10px",
                            // background:
                            //   this.state.currentIndex == i ? "#e0dede" : null,
                            padding: "3px",
                            // borderRadius: "10px",
                          }}
                          onMouseEnter={this.mouseIn.bind(this, i)}
                          onMouseLeave={this.mouseOut.bind(this, i)}
                        >
                          {this.state.onImage &&
                            this.state.currentlyHovered === i && (
                              <div
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                  left: "0",
                                  rigth: "0",
                                  top: "0",
                                  bottom: "0",
                                }}
                              >
                                <IconButton
                                  style={{
                                    float: "right",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                  color="secondary"
                                  onClick={this.deleteImage.bind(this, i)}
                                >
                                  <CloseIcon
                                    style={{
                                      // float: "right",
                                      background: "#fff",
                                      borderRadius: "50px",
                                      border: "2px solid",
                                      borderColor: "#525252",
                                      padding: "5px",
                                      width: "25px",
                                      height: "25px",
                                      color: "#000",
                                    }}
                                  />
                                </IconButton>
                              </div>
                            )}
                          <Image
                            // height={100}
                            // width={100}
                            style={{
                              margin: "5px",
                              width: "100px",
                              height: "100px",
                            }}
                            src={pic}
                            // data-key={i}
                            // onLoad={this.onLoad.bind(this, "512x512")}
                          />
                          {this.state.url.map((imageName, i) => (
                            <img
                              src={imageName}
                              data-key={i}
                              onLoad={this.onLoad.bind(this, "512x512")}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = Logo;
                              }}
                              style={{ display: "none" }}
                            />
                          ))}
                        </div>
                      </Button>
                    ))}

                    {/* {this.state.file1Added && ( */}
                    {this.state.url.map((pic, i) => (
                      <div
                        onMouseLeave={this.mouseOut.bind(
                          this,
                          this.state.images512x512.length + i
                        )}
                        onMouseEnter={this.mouseIn.bind(
                          this,
                          this.state.images512x512.length + i
                        )}
                      >
                        <Button style={{ width: "120px", height: "120px" }}>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              // marginTop: "10px",
                              // marginBottom: "10px",
                              // marginRight: "5px",
                              margin: "10px",
                              border: "0.5px solid",
                              borderColor: "#c9c9c9",
                              // padding: "2px",
                            }}
                            // src={this.state.url[0]}
                            src={pic}
                          />
                        </Button>
                        {this.state.onImage &&
                          this.state.currentlyHovered ===
                            this.state.images512x512.length + i && (
                            <div
                              style={{
                                // width: "100%",
                                position: "absolute",
                                // left: "0",
                                // rigth: "0",
                                // top: "0",
                                // bottom: "0",
                              }}
                            >
                              <IconButton
                                style={{
                                  float: "right",
                                  width: "35px",
                                  height: "35px",
                                  left: "90px",
                                  bottom: "125px",
                                  // top: "3px",
                                }}
                                color="secondary"
                                // onClick={this.deleteImage.bind(this, i)}
                                onClick={() => this.onDelete(0, "512x512")}
                              >
                                <CloseIcon
                                  style={{
                                    // float: "right",
                                    background: "#fff",
                                    borderRadius: "50px",
                                    border: "2px solid",
                                    borderColor: "#525252",
                                    padding: "5px",
                                    width: "25px",
                                    height: "25px",
                                    color: "#000",
                                  }}
                                />
                              </IconButton>
                            </div>
                          )}
                      </div>
                    ))}

                    {/* )} */}
                    {/* {!this.state.file1Added && ( */}
                    <Dropzone
                      onDrop={this.handleDrop.bind(this, "512x512")}
                      accept="image/*"
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
                            background: "#f0f0f0",
                            padding: "20px",
                            margin: "10px",
                            // marginTop: "15px",
                            // marginBottom: "15px",
                            borderStyle: "dashed",
                            borderColor: isDragActive
                              ? isDragReject
                                ? "#fc5447"
                                : "#a0d100"
                              : "#b8b8b8",
                            borderWidth: "2px",
                            borderRadius: "10px",
                            textAlign: "center",
                            selfAlign: "center",
                            width: "100px",
                            height: "100px",
                            color: isDragActive
                              ? isDragReject
                                ? "#a31702"
                                : "#507500"
                              : "#828282",
                            fontWeight: "bold",
                          }}
                        >
                          <input {...getInputProps()} />

                          <AddIcon style={{ margin: "15px" }} />
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <p style={{ fontWeight: "bold" }}>Images of size 1600x900:</p>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "start",
                      margin: "0 auto",
                    }}
                  >
                    {this.state.images1600x900.map((pic, i) => (
                      <Button
                        onClick={this.changeImage.bind(this, i)}
                        style={{ width: "120px", height: "120px" }}
                      >
                        <div
                          style={{
                            padding: "3px",
                          }}
                          onMouseEnter={this.mouseIn.bind(
                            this,
                            this.state.images512x512.length +
                              this.state.url.length +
                              i
                          )}
                          onMouseLeave={this.mouseOut.bind(
                            this,
                            this.state.images512x512.length +
                              this.state.url.length +
                              i
                          )}
                        >
                          {this.state.onImage &&
                            this.state.currentlyHovered ===
                              this.state.images512x512.length +
                                this.state.url.length +
                                i && (
                              <div
                                style={{
                                  width: "100%",
                                  position: "absolute",
                                  left: "0",
                                  rigth: "0",
                                  top: "0",
                                  bottom: "0",
                                }}
                              >
                                <IconButton
                                  style={{
                                    float: "right",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                  color="secondary"
                                  onClick={this.deleteImage.bind(this, i)}
                                >
                                  <CloseIcon
                                    style={{
                                      background: "#fff",
                                      borderRadius: "50px",
                                      border: "2px solid",
                                      borderColor: "#525252",
                                      padding: "5px",
                                      width: "25px",
                                      height: "25px",
                                      color: "#000",
                                    }}
                                  />
                                </IconButton>
                              </div>
                            )}
                          <Image
                            style={{
                              margin: "5px",
                              width: "100px",
                              height: "100px",
                            }}
                            src={pic}
                          />
                          {this.state.url2.map((imageName, i) => (
                            <img
                              src={imageName}
                              data-key={i}
                              onLoad={this.onLoad.bind(this, "1600x900")}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = Logo;
                              }}
                              style={{ display: "none" }}
                            />
                          ))}
                        </div>
                      </Button>
                    ))}

                    {/* {this.state.file1Added && ( */}
                    {this.state.url2.map((pic, i) => (
                      <div
                        onMouseLeave={this.mouseOut.bind(
                          this,
                          this.state.images512x512.length +
                            this.state.images1600x900.length +
                            i
                        )}
                        onMouseEnter={this.mouseIn.bind(
                          this,

                          this.state.images512x512.length +
                            this.state.images1600x900.length +
                            i
                        )}
                      >
                        <Button style={{ width: "120px", height: "120px" }}>
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              // marginTop: "10px",
                              // marginBottom: "10px",
                              // marginRight: "5px",
                              margin: "10px",
                              border: "0.5px solid",
                              borderColor: "#c9c9c9",
                              // padding: "2px",
                            }}
                            // src={this.state.url[0]}
                            src={pic}
                          />
                        </Button>
                        {this.state.onImage &&
                          this.state.currentlyHovered ===
                            this.state.images512x512.length +
                              this.state.images1600x900.length +
                              i && (
                            <div
                              style={{
                                // width: "100%",
                                position: "absolute",
                                // left: "0",
                                // rigth: "0",
                                // top: "0",
                                // bottom: "0",
                              }}
                            >
                              <IconButton
                                style={{
                                  float: "right",
                                  width: "35px",
                                  height: "35px",
                                  left: "90px",
                                  bottom: "125px",
                                }}
                                color="secondary"
                                onClick={() => this.onDelete(0, "1600x900")}
                              >
                                <CloseIcon
                                  style={{
                                    background: "#fff",
                                    borderRadius: "50px",
                                    border: "2px solid",
                                    borderColor: "#525252",
                                    padding: "5px",
                                    width: "25px",
                                    height: "25px",
                                    color: "#000",
                                  }}
                                />
                              </IconButton>
                            </div>
                          )}
                      </div>
                    ))}

                    {/* )} */}
                    {/* {!this.state.file1Added && ( */}
                    <Dropzone
                      onDrop={this.handleDrop.bind(this, "1600x900")}
                      accept="image/*"
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
                            background: "#f0f0f0",
                            padding: "20px",
                            margin: "10px",
                            borderStyle: "dashed",
                            borderColor: isDragActive
                              ? isDragReject
                                ? "#fc5447"
                                : "#a0d100"
                              : "#b8b8b8",
                            borderWidth: "2px",
                            borderRadius: "10px",
                            textAlign: "center",
                            selfAlign: "center",
                            width: "100px",
                            height: "100px",
                            color: isDragActive
                              ? isDragReject
                                ? "#a31702"
                                : "#507500"
                              : "#828282",
                            fontWeight: "bold",
                          }}
                        >
                          <input {...getInputProps()} />
                          {/* <p>
                            {isDragActive
                              ? isDragReject
                                ? "The file needs to be an image"
                                : "Release to drop file"
                              : "Drag and drop images, or click to select files. \n Images have to be 512 x 512"}
                          </p> */}
                          <AddIcon style={{ margin: "15px" }} />
                        </div>
                      )}
                    </Dropzone>
                    {/* )} */}
                  </div>
                  <br />
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", margin: "10px 5px 5px 5px" }}
                  >
                    <InputLabel htmlFor="productCategory">
                      Product Category
                    </InputLabel>
                    <Select
                      native
                      value={this.state.productCategory}
                      onChange={this.handleChange.bind(
                        this,
                        "Product Category"
                      )}
                      inputProps={{
                        name: "Product Category",
                        id: "productCategory",
                      }}
                      style={{ width: "100%", margin: "5px" }}
                      label="Product Category"
                      error={this.state.productCategoryEmpty}
                    >
                      <option aria-label="None" value="" />
                      {createMenusForDropDown}
                    </Select>
                  </FormControl>
                  <br />
                  {this.state.productCategoryEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product category cannot be empty.
                    </p>
                  )}
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", margin: "5px" }}
                  >
                    <InputLabel htmlFor="productSupplier">Supplier</InputLabel>
                    <Select
                      native
                      value={this.state.productSupplier}
                      onChange={this.handleChange.bind(
                        this,
                        "Product Supplier"
                      )}
                      inputProps={{
                        name: "Product Supplier",
                        id: "productSupplier",
                      }}
                      style={{ width: "100%", margin: "5px" }}
                      error={this.state.productSupplierEmpty}
                    >
                      <option aria-label="None" value="" />
                      {createMenusForDropDownUsers}
                    </Select>
                  </FormControl>
                  <br />
                  {this.state.productSupplierEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product supplier cannot be empty.
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "100%", marginRight: "5px" }}>
                      {NotEmpty ? <Shoplots /> : null}
                    </div>

                    <div style={{ width: "100%" }}>
                      {NotEmptyGrid ? <Grid /> : null}
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FormHelperText>Dimension: </FormHelperText>
                    <br />
                    <div style={{ margin: "5px", width: "100%" }}>
                      <TextField
                        id="text-field-controlled"
                        helperText="Height (m)"
                        value={this.state.height}
                        onChange={this.handleChange.bind(this, "height")}
                        type="number"
                        style={{ width: "100%", marginRight: "5px" }}
                        variant="outlined"
                        error={
                          this.state.heightNotDecimal || this.state.heightEmpty
                        }
                      />
                      <br />
                      {this.state.heightEmpty && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product height cannot be empty.
                        </p>
                      )}
                      {this.state.heightNotDecimal && this.state.height && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product height has to be positive and in two decimal
                          places.
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        marginRight: "5px",
                        width: "100%",
                        marginTop: "5px",
                      }}
                    >
                      <TextField
                        id="text-field-controlled"
                        helperText="Width (m)"
                        value={this.state.width}
                        onChange={this.handleChange.bind(this, "width")}
                        type="number"
                        style={{ marginRight: "5px", width: "100%" }}
                        variant="outlined"
                        error={
                          this.state.widthEmpty || this.state.widthNotDecimal
                        }
                      />
                      {this.state.widthEmpty && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product width cannot be empty.
                        </p>
                      )}
                      {this.state.widthNotDecimal && this.state.width && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product width has to be positive and in two decimal
                          places.
                        </p>
                      )}
                    </div>
                    <div style={{ width: "100%", marginTop: "5px" }}>
                      <TextField
                        id="text-field-controlled"
                        helperText="Depth (m)"
                        value={this.state.depth}
                        onChange={this.handleChange.bind(this, "depth")}
                        type="number"
                        style={{ width: "100%" }}
                        variant="outlined"
                        error={
                          this.state.depthEmpty || this.state.depthNotDecimal
                        }
                      />
                      {this.state.depthEmpty && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product depth cannot be empty.
                        </p>
                      )}
                      {this.state.depthNotDecimal && this.state.depth && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px",
                          }}
                        >
                          Product depth has to be positive and in two decimal
                          places.
                        </p>
                      )}
                    </div>
                  </div>
                  <TextField
                    label="Weight (kg)"
                    id="text-field-controlled"
                    value={this.state.weight}
                    onChange={this.handleChange.bind(this, "weight")}
                    type="number"
                    style={{ width: "100%", margin: "5px" }}
                    variant="outlined"
                    error={
                      this.state.weightEmpty || this.state.weightNotDecimal
                    }
                  />
                  <br />
                  {this.state.weightEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product weight cannot be empty.
                    </p>
                  )}

                  {this.state.weightNotDecimal && this.state.weight && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product weight has to be in two decimal place.
                    </p>
                  )}
                  <TextField
                    label="SKU"
                    id="text-field-controlled"
                    value={this.state.sku}
                    onChange={this.handleChange.bind(this, "SKU")}
                    style={{ width: "100%", margin: "5px" }}
                    variant="outlined"
                    error={this.state.skuEmpty || this.state.skuNotLongEnough}
                  />
                  <br />
                  {this.state.skuEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product SKU cannot be empty.
                    </p>
                  )}
                  {this.state.skuNotLongEnough && this.state.sku && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product SKU has to be at least 8 characters long.
                    </p>
                  )}
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div style={{ margin: "5px", width: "100%" }}>
                      <TextField
                        label="Brand"
                        id="text-field-controlled"
                        value={this.state.brand}
                        onChange={this.handleChange.bind(this, "Brand")}
                        style={{ margin: "5px", width: "100%" }}
                        variant="outlined"
                        error={this.state.brandEmpty}
                      />
                      <br />
                      {this.state.brandEmpty && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px 0px 0px 10px",
                          }}
                        >
                          Product brand cannot be empty.
                        </p>
                      )}
                    </div>
                    <div style={{ margin: "5px", width: "100%" }}>
                      <TextField
                        label="Model"
                        id="text-field-controlled"
                        value={this.state.model}
                        onChange={this.handleChange.bind(this, "Model")}
                        style={{ width: "100%", margin: "5px 0px 5px 5px" }}
                        variant="outlined"
                        error={this.state.modelEmpty}
                      />
                      <br />
                      {this.state.modelEmpty && (
                        <p
                          style={{
                            color: "#e31e10",
                            margin: "0px 0px 0px 10px",
                          }}
                        >
                          Product model cannot be empty.
                        </p>
                      )}
                    </div>
                  </div>
                  <TextField
                    label="Product Tags"
                    id="text-field-controlled"
                    value={this.state.tags}
                    onChange={this.handleChange.bind(this, "Tags")}
                    style={{ width: "100%", margin: "5px" }}
                    variant="outlined"
                    error={this.state.productTagsEmpty}
                  />
                  <br />
                  {this.state.productTagsEmpty && (
                    <p
                      style={{
                        color: "#e31e10",
                        margin: "0px 0px 0px 10px",
                      }}
                    >
                      Product tags cannot be empty.
                    </p>
                  )}
                  <TextField
                    id="outlined-multiline-static"
                    label="Product Description"
                    multiline
                    rows={4}
                    value={this.state.description}
                    variant="outlined"
                    onChange={this.handleChange.bind(this, "description")}
                    style={{ width: "100%", margin: "5px" }}
                    variant="outlined"
                    error={this.state.productDesciptionEmpty}
                  />
                  <br />
                  {this.state.productDesciptionEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product description cannot be empty.
                    </p>
                  )}
                  <div style={{ width: "100%", alignContent: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={this.checkEverything}
                      style={{
                        display: "block",
                        maxWidth: "300px",
                        margin: "auto",
                      }}
                    >
                      Submit Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <div style={{ display: "flex" }}>
                    <TextField
                      id="text-field-controlled"
                      helperText="Product Name"
                      value={this.state.name}
                      style={{
                        width: "100%",
                        // , marginLeft: "10px"
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <br />
                  <FormHelperText>Product Images: </FormHelperText>
                  <div style={{ display: "flex" }}>
                    {JSON.parse(
                      this.state.picture[this.state.row].ProductImages
                    ) ? (
                      JSON.parse(
                        this.state.picture[this.state.row].ProductImages
                      ).map((pic, i) => {
                        return (
                          <div>
                            <Button
                              onClick={this.handleClickOpen.bind(this, i)}
                            >
                              <img
                                height={80}
                                style={{ margin: "5px" }}
                                src={pic.ProductMediaUrl}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = Logo;
                                }}
                              />
                            </Button>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Product Images Found</p>
                    )}
                  </div>
                  <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth="md"
                    maxWidth="md"
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={this.handleClose}
                    >
                      {this.state.name}
                    </DialogTitle>
                    <DialogContent
                      dividers
                      style={{
                        textAlign: "center",
                        padding: "0",
                        height: "800",
                      }}
                    >
                      <Image
                        // width={"60%"}
                        // minHeight={"40%"}
                        height={500}
                        style={{
                          margin: "10px",
                          //  width: "95%"
                          minHeight: "40%",
                          maxHeight: "40%",
                        }}
                        src={this.state.images[this.state.currentIndex]}
                      />

                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <Button onClick={this.goToPrevPic}>
                          <ArrowBackIosIcon />
                        </Button>
                        {this.state.images.map((pic, i) => (
                          <Button onClick={this.changeImage.bind(this, i)}>
                            <div
                              style={{
                                // borderWidth: "10px",
                                background:
                                  this.state.currentIndex === i
                                    ? "#e0dede"
                                    : null,
                                padding: "3px",
                                // borderRadius: "10px",
                              }}
                              // onClick={this.changeImage.bind(this, i)}
                            >
                              <Image
                                height={70}
                                width={70}
                                style={{ margin: "5px" }}
                                src={pic}
                              />
                            </div>
                          </Button>
                        ))}
                        <Button onClick={this.goToNextPic}>
                          <ArrowForwardIosIcon />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <FormHelperText>Product Category: </FormHelperText>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", margin: "10px 5px 5px 5px" }}
                    disabled
                  >
                    <Select
                      value={this.state.productCategory}
                      onChange={this.handleChange.bind(
                        this,
                        "Product Category"
                      )}
                      inputProps={{
                        name: "Product Category",
                        id: "productCategory",
                        readOnly: true,
                      }}
                      style={{ width: "100%" }}
                    >
                      <option aria-label="None" value="" />
                      {createMenusForDropDown}
                    </Select>
                  </FormControl>
                  <FormHelperText>Supplier: </FormHelperText>
                  <FormControl
                    style={{ width: "100%", margin: "10px 5px 5px 5px" }}
                    disabled="true"
                  >
                    <Select
                      value={this.state.productSupplier}
                      onChange={this.handleChange.bind(
                        this,
                        "Product Supplier"
                      )}
                      inputProps={{
                        name: "Product Supplier",
                        id: "productSupplier",
                      }}
                      style={{ width: "100%" }}
                    >
                      <option aria-label="None" value="" />
                      {createMenusForDropDownUsers}
                    </Select>
                  </FormControl>

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "100%", marginRight: "5px" }}>
                      {NotEmpty ? <Shoplots2 /> : null}
                    </div>

                    <div style={{ width: "100%" }}>
                      {NotEmptyGrid ? <Grid2 /> : null}
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FormHelperText>Dimension: </FormHelperText>
                    <br />
                    <TextField
                      id="text-field-controlled"
                      helperText="Height (m)"
                      value={this.state.height}
                      onChange={this.handleChange.bind(this, "height")}
                      type="number"
                      style={{ marginRight: "5px", width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="text-field-controlled"
                      helperText="Width (m)"
                      value={this.state.width}
                      onChange={this.handleChange.bind(this, "width")}
                      type="number"
                      style={{ marginRight: "5px", width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="text-field-controlled"
                      helperText="Depth (m)"
                      value={this.state.depth}
                      onChange={this.handleChange.bind(this, "depth")}
                      type="number"
                      style={{ width: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <TextField
                    id="text-field-controlled"
                    helperText="Weight (kg)"
                    value={parseInt(this.state.weight)}
                    onChange={this.handleChange.bind(this, "weight")}
                    type="number"
                    style={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                  <TextField
                    id="text-field-controlled"
                    helperText="SKU"
                    value={this.state.sku}
                    onChange={this.handleChange.bind(this, "SKU")}
                    style={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TextField
                      id="text-field-controlled"
                      helperText="Brand"
                      value={this.state.brand}
                      onChange={this.handleChange.bind(this, "Brand")}
                      style={{ marginRight: "5px", width: "50%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="text-field-controlled"
                      helperText="Model"
                      value={this.state.model}
                      onChange={this.handleChange.bind(this, "Model")}
                      style={{ width: "50%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <TextField
                    id="text-field-controlled"
                    helperText="Product Tags"
                    value={this.state.tags}
                    onChange={this.handleChange.bind(this, "Tags")}
                    style={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-multiline-static"
                    label="Product Description"
                    multiline
                    rows={4}
                    value={this.state.description}
                    variant="outlined"
                    onChange={this.handleChange.bind(this, "description")}
                    style={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              )}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsComponent);
