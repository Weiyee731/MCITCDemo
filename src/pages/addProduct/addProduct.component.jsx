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
import Fade from "@material-ui/core/Fade";
import NestedMenuItem from "material-ui-nested-menu-item";
import RestoreIcon from "@material-ui/icons/Restore";
import queryString from "query-string";
import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["supplier"],
    exist: state.counterReducer["exists"],
    result: state.counterReducer["addResult"],
    resultsMedia: state.counterReducer["productMediaResult"],
    variations: state.counterReducer["variations"],
    productCategories: state.counterReducer["productCategories"],
  };
}

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

class AddProductComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllProductCategoryListing();
    this.props.callAllSupplierByUserStatus("endorsed");
    this.handlePrevClickButton = this.handlePrevClickButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
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
      notEnoughFiles512x512: false,
      notEnoughFiles1600x900: false,
      productID: null,
      dataSent: false,
      file1Added: false,
      file2Added: false,
      file3Added: false,
      file1Added2: false,
      file2Added2: false,
      file3Added2: false,
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
    };
  }

  checkFiles512x512 = () => {
    if (this.state.file.length < 3) {
      this.setState({
        notEnoughFiles512x512: true,
      });
    } else {
      this.setState({
        notEnoughFiles512x512: false,
      });
    }
  };

  checkFiles1600x900 = () => {
    if (this.state.file2.length < 3) {
      this.setState({
        notEnoughFiles1600x900: true,
      });
    } else {
      this.setState({
        notEnoughFiles1600x900: false,
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
      }

      acceptedFiles.map((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      });
    }
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
    // console.log(productID);
    // console.log(this.state);
    // console.log(this.state.file2.length);
    // if (this.state.file.length < 1 || this.state.file2.length < 1) {
    //   toast.error("There has to be at least 1 images for each size");
    // } else {
    //   this.setState({
    //     index: 1,
    //   });

    for (var i = 0; i < this.state.file.length; i++) {
      // this.setState({
      //   productID: productID,
      //   width: "512",
      //   height: "512",
      // });
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
      // this.setState({
      //   productID: productID,
      //   width: "1600",
      //   height: "900",
      // });
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
    // }
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
      this.props.CallAllProductVariationByCategoryID(e.target.value);
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
    this.checkFiles1600x900();
    this.checkFiles512x512();

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

  mouseOut = (id) => {
    this.setState({
      onImage: false,
      currentlyHovered: id,
    });
    // toast.success("mouseOut: " + this.state.onImage);
  };

  mouseIn = (id) => {
    this.setState({
      onImage: true,
      currentlyHovered: id,
    });
    // toast.success("mouseIn " + this.state.onImage);
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

  render() {
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
          return (
            <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
              Product name already exists.
            </p>
          );
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
        style={{ width: "100%" }}
      >
        <option aria-label="None" value="" />
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
        style={{ width: "100%" }}
      >
        <option aria-label="None" value="" />
      </Select>
    );

    const cardStyle = { width: "80%", margin: "1% auto" };
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

    return (
      <div style={{ width: "75%", margin: "2%" }}>
        <div>
          <h1>Add Product</h1>
        </div>
        <Button>
          <i className="fas fa-chevron-left"></i>
          <Link className="nav-link" to={"/viewProduct"}>
            Back
          </Link>
        </Button>
        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={this.handleSlideChangeIndex}
        >
          <div style={Object.assign({})}>
            <Card style={cardStyle}>
              <CardContent>
                <TextField
                  id="productName"
                  helperText="Product Name"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this, "product")}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Product name cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}

                <Button
                  aria-owns={this.state.anchorEl ? "pc-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  onMouseEnter={this.handleClick}
                  variant="outlined"
                >
                  {this.state.selectedItem}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 5 }}
                  onClick={this.resetSelectedCategory}
                >
                  <RestoreIcon /> Reset
                </Button>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  id="pc-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  MenuListProps={{ onMouseLeave: this.handleClose }}
                  getContentAnchorEl={null}
                  TransitionComponent={Fade}
                >
                  {productCategoryDDL}
                </Menu>
                <FormHelperText>Product Category</FormHelperText>
                <br />
                {this.state.productCategoryEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Product category cannot be empty.
                  </p>
                )}
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
                  <option aria-label="None" value="" />
                  {createMenusForDropDownUsers}
                </Select>
                <FormHelperText>Supplier</FormHelperText>
                <br />
                {this.state.productSupplierEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Product supplier cannot be empty.
                  </p>
                )}
                {/* <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "100%", marginRight: "5px" }}>
                    {NotEmpty ? <Shoplots /> : null}
                    {NotEmpty ? <FormHelperText>Shoplot</FormHelperText> : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    {NotEmptyGrid ? <Grid /> : null}
                    {NotEmptyGrid ? (
                      <FormHelperText>Grid Storage</FormHelperText>
                    ) : null}
                  </div>
                </div>
                <br /> */}
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
                      id="productHeight"
                      helperText="Height (m)"
                      value={this.state.height}
                      onChange={this.handleChange.bind(this, "height")}
                      type="number"
                      style={{ marginRight: "5px", width: "100%" }}
                      error={
                        this.state.heightEmpty || this.state.heightNotDecimal
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
                  <div style={{ margin: "5px", width: "100%" }}>
                    <TextField
                      id="productWidth"
                      helperText="Width (m)"
                      value={this.state.width}
                      onChange={this.handleChange.bind(this, "width")}
                      type="number"
                      style={{ marginRight: "5px", width: "100%" }}
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
                  <div style={{ margin: "5px", width: "100%" }}>
                    <TextField
                      id="productDepth"
                      helperText="Depth (m)"
                      value={this.state.depth}
                      onChange={this.handleChange.bind(this, "depth")}
                      type="number"
                      style={{ width: "100%" }}
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
                <br />
                <TextField
                  id="productWeight"
                  helperText="Weight (kg)"
                  value={this.state.weight}
                  onChange={this.handleChange.bind(this, "weight")}
                  type="number"
                  style={{ width: "100%" }}
                  error={this.state.weightEmpty || this.state.weightNotDecimal}
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

                <br />
                <div
                  style={{
                    margin: "2%",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="productSku"
                    helperText="SKU"
                    value={this.state.sku}
                    onChange={this.handleChange.bind(this, "SKU")}
                    style={{ width: "100%" }}
                    error={this.state.skuEmpty || this.state.skuNotLongEnough}
                  />
                  <Link className="nav-link" to={"/productStocksIn"}>
                    Scan Now
                  </Link>
                </div>
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
                      id="productBrand"
                      helperText="Brand"
                      value={this.state.brand}
                      onChange={this.handleChange.bind(this, "Brand")}
                      style={{ marginRight: "5px", width: "100%" }}
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
                      id="productModel"
                      helperText="Model"
                      value={this.state.model}
                      onChange={this.handleChange.bind(this, "Model")}
                      style={{ width: "100%" }}
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

                <br />
                <p style={{ fontWeight: "bold" }}>Images of size 512x512:</p>
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "space-between",
                    margin: "0 auto",
                  }}
                >
                  {!this.state.file1Added && (
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
                            margin: "5px ",
                            marginTop: "5px",
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
                  )}
                  {this.state.file1Added && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 1)}
                      onMouseEnter={this.mouseIn.bind(this, 1)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 1 && (
                        <div
                          style={{
                            position: "absolute",
                          }}
                        >
                          <IconButton
                            style={{
                              float: "right",
                              width: "35px",
                              height: "35px",
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            onClick={() => this.onDelete(0, "512x512")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url[0]}
                        alt=""
                      />
                    </div>
                  )}
                  {!this.state.file2Added && (
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
                            margin: "5px ",
                            marginTop: "5px",
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
                  )}
                  {this.state.file2Added && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 2)}
                      onMouseEnter={this.mouseIn.bind(this, 2)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 2 && (
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
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            // onClick={this.deleteImage.bind(this, i)}
                            onClick={() => this.onDelete(1, "512x512")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url[1]}
                        alt=""
                      />
                    </div>
                  )}
                  {!this.state.file3Added && (
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
                            margin: "5px",
                            marginTop: "5px",
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
                  )}
                  {this.state.file3Added && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 3)}
                      onMouseEnter={this.mouseIn.bind(this, 3)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 3 && (
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
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            // onClick={this.deleteImage.bind(this, i)}
                            onClick={() => this.onDelete(2, "512x512")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url[2]}
                        alt=""
                      />
                    </div>
                  )}
                </div>

                {/* <div
                  style={{
                    textAlign: "left",
                    marginLeft: "5%",
                    marginTop: "5px",
                  }}
                >
                  <strong>Images:</strong>
                  <ul>
                    {this.state.fileInfo.map((fileName, i) => (
                      <li
                        style={{
                          listStyle: "none",
                        }}
                        key={fileName}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            alignContent: "space-between",
                          }}
                        >
                          <img src={this.state.url[i]} style={previewStyle} />
                          <p style={{ margin: "5px", width: "100%" }}>
                            {fileName}
                          </p>
                          <button
                            style={{
                              borderColor: "#a31702",
                              background: "#fff",
                              borderWidth: "2px",
                              borderRadius: "5px",
                              marginRight: "10px",
                              color: "#a31702",
                              fontWeight: "bold",
                            }}
                            onMouseOver={this.changeBackground}
                            onMouseLeave={this.changeBackground2}
                            key={fileName}
                            onClick={() => this.onDelete(i, "512x512")}
                          >
                            {" "}
                            Remove{" "}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div>
                  {this.state.url.map((imageName, i) => (
                    <img
                      src={imageName}
                      data-key={i}
                      onLoad={this.onLoad.bind(this, "512x512")}
                      style={{ display: "none" }}
                      alt=""
                    />
                  ))}
                </div>
                {this.state.notEnoughFiles512x512 && (
                  <p
                    style={{
                      color: "#e31e10",
                      margin: "0px 0px 0px 10px",
                    }}
                  >
                    There has to be at least 3 images of the size 512x512 added.
                  </p>
                )}
                <p style={{ fontWeight: "bold" }}>Images of size 1600x900:</p>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 auto",
                  }}
                >
                  {!this.state.file1Added2 && (
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
                            margin: "5px",
                            marginTop: "5px",
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
                            : "Drag and drop images, or click to select files. \n Images have to be 1600 x 900"}
                        </p> */}
                          <AddIcon style={{ margin: "15px" }} />
                        </div>
                      )}
                    </Dropzone>
                  )}
                  {this.state.file1Added2 && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 4)}
                      onMouseEnter={this.mouseIn.bind(this, 4)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 4 && (
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
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            onClick={() => this.onDelete(0, "1600x900")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url2[0]}
                        alt=""
                      />
                    </div>
                  )}
                  {!this.state.file2Added2 && (
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
                            margin: "5px",
                            marginTop: "5px",
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
                            : "Drag and drop images, or click to select files. \n Images have to be 1600 x 900"}
                        </p> */}
                          <AddIcon style={{ margin: "15px" }} />
                        </div>
                      )}
                    </Dropzone>
                  )}
                  {this.state.file2Added2 && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 5)}
                      onMouseEnter={this.mouseIn.bind(this, 5)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 5 && (
                        <div
                          style={{
                            position: "absolute",
                          }}
                        >
                          <IconButton
                            style={{
                              float: "right",
                              width: "35px",
                              height: "35px",
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            onClick={() => this.onDelete(1, "1600x900")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url2[1]}
                        alt=""
                      />
                    </div>
                  )}
                  {!this.state.file3Added2 && (
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
                            margin: "5px",
                            marginTop: "5px",
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
                  )}
                  {this.state.file3Added2 && (
                    <div
                      onMouseLeave={this.mouseOut.bind(this, 6)}
                      onMouseEnter={this.mouseIn.bind(this, 6)}
                    >
                      {this.state.onImage && this.state.currentlyHovered === 6 && (
                        <div style={{ position: "absolute" }}>
                          <IconButton
                            style={{
                              float: "right",
                              width: "35px",
                              height: "35px",
                              left: "85px",
                              bottom: "10px",
                            }}
                            color="secondary"
                            onClick={() => this.onDelete(2, "1600x900")}
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
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          border: "0.5px solid",
                          borderColor: "#c9c9c9",
                          padding: "2px",
                        }}
                        src={this.state.url2[2]}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div>
                  {this.state.url2.map((imageName, i) => (
                    <img
                      src={imageName}
                      data-key={i}
                      onLoad={this.onLoad.bind(this, "1600x900")}
                      style={{ display: "none" }}
                    />
                  ))}
                </div>
                {this.state.notEnoughFiles1600x900 && (
                  <p
                    style={{
                      color: "#e31e10",
                      margin: "0px 0px 0px 10px",
                    }}
                  >
                    There has to be at least 3 images of the size 1600x900
                    added.
                  </p>
                )}

                <TextField
                  id="productDescription"
                  label="Product Description"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  value={this.state.description}
                  variant="outlined"
                  onChange={this.handleChange.bind(this, "description")}
                  style={{ width: "100%" }}
                  error={this.state.productDesciptionEmpty}
                />
                <br />
                {this.state.productDesciptionEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Product description cannot be empty.
                  </p>
                )}
                <TextField
                  id="productTags"
                  helperText="Product Tags"
                  value={this.state.tags}
                  onChange={this.handleChange.bind(this, "Tags")}
                  style={{ width: "100%" }}
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
              </CardContent>
            </Card>
          </div>

          {/*=================== Variation slide ===================*/}
          <div style={cardStyle}>
            {this.props.variations.map((row, i) => {
              const { ProductVariation } = row;
              productVariation[row.ProductVariationID] = ProductVariation;
            })}
            <MaterialTable
              title="Specifications"
              options={{
                paging: false,
                search: false,
              }}
              columns={[
                {
                  title: "Product Variation",
                  field: "ProductVariationID",
                  lookup: productVariation,
                },
                {
                  title: "Value",
                  field: "Value",
                },
              ]}
              data={this.state.ProductVariationSelectedData}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      this.addProductVariation(newData);
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [
                        ...this.state.ProductVariationSelectedData,
                      ];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      // this.state.ProductVariationSelectedData = dataUpdate
                      this.updateProductVariation(dataUpdate);
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [
                        ...this.state.ProductVariationSelectedData,
                      ];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      this.deleteProductVariation(dataDelete);
                      resolve();
                    }, 1000);
                  }),
              }}
            />
            <br />
            <br />

            {/* {this.props.variations.CustomizableIndicator == 0 ? (
              ""
            ) : (
              <ProductModificableVariationTable
                ProductData={this.props.variations}
              ></ProductModificableVariationTable>
            )} */}
            {/* </CardContent> */}
            {/* </Card> */}
          </div>

          {/*=================== Summary slide ===================*/}

          <div style={Object.assign({})}>
            <Card style={cardStyle}>
              <CardHeader>Confirmation</CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Product Name:</TableCell>
                      <TableCell style={tableCell}>{this.state.name}</TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Product Category:</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.productCategory}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Supplier:</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.productSupplier}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Dimension:</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.height} (Height(m))
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead} />
                      <TableCell style={tableCell}>
                        {this.state.width} (Width(m))
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead} />
                      <TableCell style={tableCell}>
                        {this.state.depth} (Depth(m))
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Weight (kg):</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.weight}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>
                        Product Description:
                      </TableCell>
                      <TableCell style={tableCell}>
                        {this.state.description}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>SKU:</TableCell>
                      <TableCell style={tableCell}>{this.state.sku}</TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Brand:</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.brand}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Model:</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.model}
                      </TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Product Tag:</TableCell>
                      <TableCell style={tableCell}>{this.state.tags}</TableCell>
                    </TableRow>
                    <TableRow style={tableRow}>
                      <TableCell style={tableHead}>Specifications</TableCell>
                      <TableCell style={tableCell}>(Depth(m))</TableCell>
                      <TableCell style={tableCell}>
                        {this.state.depth}
                      </TableCell>
                    </TableRow>
                    {this.state.ProductVariationSelectedData.map((itemrow) => {
                      return (
                        <TableRow style={tableRow}>
                          <TableCell style={tableHead}>
                            {itemrow.ProductVariation}
                          </TableCell>
                          <TableCell style={tableCell}>
                            {itemrow.Value}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <button
                  onClick={this.addProductForm}
                  style={{
                    background: "#000",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "80px",
                    height: "auto",
                    color: "white",
                    borderColor: "#000",
                    borderWidth: "2px",
                    fontWeight: "bold",
                  }}
                >
                  Next
                </button>
              </CardContent>
            </Card>
          </div>
        </SwipeableViews>

        {/*=================== Sliders ===================*/}

        <div style={sliders}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {this.state.index === 0 ? (
              ""
            ) : (
              <button onClick={this.handlePrevClickButton} style={sliderButton}>
                <i style={{ fontSize: 40 }} className="fas fa-angle-left"></i>
              </button>
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {this.state.index > 2 ? (
              ""
            ) : (
              <button onClick={this.checkEverything} style={sliderButton}>
                <i style={{ fontSize: 40 }} className="fas fa-angle-right"></i>
              </button>
            )}
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
