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
    allcomplains: state.counterReducer["missings"],
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

class AddSuppliersComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllProductCategoryListing();
    this.props.callAllSupplierByUserStatus("endorsed");
    this.handlePrevClickButton = this.handlePrevClickButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      contactNumber:"",
      contactNumberEmpty: false,
      contactNumberDublicated: false,
      supplierName:"",
      supplierNameEmpty: false,
      supplierNameDublicated: false,
      companyName:"",
      companyNameEmpty: false,
      companyNameDublicated: false,
      companyNumber:"",
      companyNumberEmpty: false,
      companyNumberDublicated: false,
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


  checkContactNumber = () => {
    if (this.state.contactNumber === "" || this.state.contactNumber === null) {
      this.setState({
        contactNumberEmpty: true,
      });
    } else {
      this.setState({
        contactNumberEmpty: false,
      });
    }

    if (this.state.contactNumber !== "") {
      this.props.callCheckProduct(this.state.contactNumber.replaceAll(" ", "%20"));
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
          alert("Only 3 images are allowed.");
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
          console.log(
            this.state.file2Added +
              " file Length: " +
              this.state.fileInfo.length
          );
          toast.success( this.state.file2Added +
            " file Length: " +
            this.state.fileInfo.length);
          this.checkFiles512x512();
        }
      } else if (data === "1600x900") {
        if (this.state.fileInfo2.length + acceptedFiles.length > 3) {
          alert("Only 3 files are allowed.");
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
    if (data === "512x512") {
      var heigth = e.target.height;
      var width = e.target.width;
      if (heigth !== 512 || width !== 512) {
        this.removeFile(
          "512x512",
          e.target.attributes.getNamedItem("data-key").value
        );
        alert("Images have to be 512 x 512");
      }
    } else if (data === "1600x900") {
      // var heigth = e.target.height;
      // var width = e.target.width;
      if (heigth !== 900 || width !== 1600) {
        this.removeFile(
          "1600x900",
          e.target.attributes.getNamedItem("data-key").value
        );
        alert("Images have to be 1600 x 900");
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
      // console.log("length: " + this.state.fileInfo.length);
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
    if (this.state.file.length < 1 || this.state.file2.length < 1) {
      alert("There has to be at least 1 images for each size");
    } else {
      this.setState({
        index: 1,
      });

      for (var i = 0; i < this.state.file.length; i++) {
        this.setState({
          productID: productID,
          width: "512",
          height: "512",
        });
        const formData1 = new FormData();
        formData1.append(i + "image512x512", this.state.file[i]);
        formData1.append("imageName", productID + "_image512x512_" + (i + 1));
        formData1.append("ProductID", productID);
        let url = "http://tourism.denoo.my/emporiaimage/upload.php";
        axios.post(url, formData1, {}).then((res) => {
          console.warn(res);
        });
        this.props.callAddProductMedia(this.state);
      }
      for (var i = 0; i < this.state.file2.length; i++) {
        this.setState({
          productID: productID,
          width: "1600",
          height: "900",
        });
        const formData2 = new FormData();
        formData2.append(i + "image1600x900", this.state.file2[i]);
        formData2.append("imageName", productID + "_image1600x900_" + (i + 1));
        formData2.append("ProductID", productID);
        let url = "http://tourism.denoo.my/emporiaimage/upload.php";
        axios.post(url, formData2, {}).then((res) => {
          console.warn(res);
        });
        this.props.callAddProductMedia(this.state);
      }
    }
  };

  handleChange(data, e) {
    if (data === "supplierName") {
      this.setState({
        supplierName: e.target.value,
      });

      setTimeout(
        function () {
          this.checkProductName();
        }.bind(this),
        200
      );
    } else if (data === "contactNumber") {
      this.setState({
        contactNumber: e.target.value,
      });
    } else if (data === "companyName") {
      this.setState({
        companyName: e.target.value,
      });
    } else if (data === "companyNumber") {
      this.setState({
        companyNumber: e.target.value,
      });
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
    
    this.checkProductName();
  

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
      // alert(this.state.productCategory)

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
    this.setState((state) => {
      const productImages = state.productImages.concat(
        state.file.map((file) => file)
      );
      return {
        productImages,
      };
    });
    this.setState((state) => {
      const productImages = state.productImages.concat(
        state.file2.map((file) => file)
      );
      return {
        productImages,
      };
    });
    for (var i = 0; i < this.state.file.length; i++) {
      this.setState({
        productWidth: [...this.state.productWidth, "512"],
        productHeight: [...this.state.productHeight, "512"],
      });
    }
    for (var i = 0; i < this.state.file2.length; i++) {
      this.setState({
        productWidth: [...this.state.productWidth, "1600"],
        productHeight: [...this.state.productHeight, "900"],
      });
    }
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
    // console.log("mouseOut: " + this.state.onImage);
    toast.success( "mouseOut: " + this.state.onImage);
  };

  mouseIn = (id) => {
    this.setState({
      onImage: true,
      currentlyHovered: id,
    });
    // console.log("mouseIn " + this.state.onImage);
    toast.success( "mouseIn " + this.state.onImage);
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
      alert("You are selecting too fast! \nPlease select again.");
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
      var checkIfDone = resultData.map((d, i) => {
        if (d.ReturnVal === 0) {
          while (counter === 0) {
            this.uploadFile(d.ProductID);
            counter++;
          }
        } else {
          alert("No Value: " + d.ReturnVal);
        }
      });
    }

    const query = queryString.parse(this.props.location.search);
    // console.log(query);
    toast.success( query);
    const barcode = query.barcode;
    // console.log("barcode", barcode);
    toast.success( "barcode", barcode);
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
          <h1>Add Supplier</h1>
        </div>
        <Button>
          <i className="fas fa-chevron-left"></i>
          <Link className="nav-link" to={"/viewSupplier"}>
            Back
          </Link>
        </Button>
          <div style={Object.assign({})}>
            <Card style={cardStyle}>
              <CardContent>
                <TextField
                  id="supplierName"
                  helperText="Supplier Name"
                  value={this.state.suppliername}
                  onChange={this.handleChange.bind(this, "supplierName")}
                  error={
                    this.state.contactNumberEmpty ||
                    this.state.contactNumberDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Supplier name cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}
                  <br />
                <TextField
                  id="contactNumber"
                  helperText="Contact Number"
                  value={this.state.contactnumber}
                  onChange={this.handleChange.bind(this, "contactNumber")}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Contact Number cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}
                <br />
                <TextField
                  id="companyName"
                  helperText="Company Name"
                  value={this.state.companyname}
                  onChange={this.handleChange.bind(this, "companyName")}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Company name cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}
                <br />
                <TextField
                  id="companyNumber"
                  helperText="Company Number"
                  value={this.state.companynumber}
                  onChange={this.handleChange.bind(this, "companyNumber")}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Company number cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}
                <br />
                <TextField
                  id="companyNumber"
                  helperText="Address"
                  value={this.state.companynumber}
                  onChange={this.handleChange.bind(this, "companyNumber")}
                  error={
                    this.state.productNameEmpty ||
                    this.state.productNameDublicated
                  }
                  style={{ width: "100%" }}
                />
                <br />
                {this.state.productNameEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Company number cannot be empty.
                  </p>
                )}
                {this.state.name && checkDuplicate}
                
                <Select
                  onChange={this.handleChange.bind(this, "Product Supplier")}
                  inputProps={{
                    name: "Product Supplier",
                    id: "productSupplier",
                  }}
                  style={{ width: "100%" }}
                  error={this.state.productSupplierEmpty}
                >
                  <option aria-label="None" value="" />
                  <option value="online payment">Online Payment</option>
                  <option value="card"> credit/debit </option>
                  <option selected value="e-wallet">e-wallet</option>
                  {createMenusForDropDownUsers}
                </Select>
                <FormHelperText>Supplier</FormHelperText>
                
              </CardContent>
            </Card>
          </div>

         
        
      

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
)(AddSuppliersComponent);
