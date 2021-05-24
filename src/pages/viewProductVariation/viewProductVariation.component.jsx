import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
// import ShoplotDetailComponent from "../shoplotDetail/shoplotDetail.component";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import TableContainer from "@material-ui/core/TableContainer";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Dialog from "@material-ui/core/Dialog";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import { withStyles } from "@material-ui/core/styles";
// import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
// import GoogleMaps from "../../components/googleMaps/googleMaps";
// import MapIcon from "@material-ui/icons/Map";
import MaterialTable from "material-table";

function mapStateToProps(state) {
  return {
    variations: state.counterReducer["variations"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductVariation: () =>
      dispatch(GitAction.CallAllProductVariation()),
    CallAddProductVariation: (prodData) =>
      dispatch(GitAction.CallAddProductVariation(prodData)),
    // CallDeleteShoplots: (prodData) =>
    //   dispatch(GitAction.CallDeleteShoplots(prodData)), //the backend of deletion is require
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// class DisplayTable extends Component {
//   constructor(props) {
//     super(props);
//     // this.props.callAllStock();
//     this.state = {
//       order: "asc",
//       orderBy: "ProductVariationID",
//       selected: [],
//       page: 0,
//       dense: false,
//       rowsPerPage: 5,
//       detailsShown: false,
//       deleteActive: false,
//       variationArray: [],
//     };

//     this.ToggleDeletable = this.ToggleDeletable.bind(this);
//     this.handleRequestSort = this.handleRequestSort.bind(this);
//     this.onRowClick = this.onRowClick.bind(this);
//     this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
//     this.handleChangePage = this.handleChangePage.bind(this);
//     this.handleChangeDense = this.handleChangeDense.bind(this);
//     this.isSelected = this.isSelected.bind(this);
//     this.addRowData = this.addRowData.bind(this);
//   }

//   handleRequestSort = (event, property) => {
//     const isAsc = this.state.orderBy === property && this.state.order === "asc";
//     this.setState({ order: isAsc ? "desc" : "asc" });
//     this.setState({ orderBy: property });
//   };

//   onRowClick = (event, row) => {
//     this.setState({
//       name: row.ProductCategory,
//       hierarchyLevel: row.HierarchyID,
//       tags: row.Tag,
//     });

//     if (this.state.detailsShown) {
//       this.setState({
//         detailsShown: false,
//       });
//     } else {
//       this.setState({
//         detailsShown: true,
//       });
//     }
//   };

//   handleChangePage = (event, newPage) => {
//     this.setState({ page: newPage });
//   };

//   handleChangeRowsPerPage = (event) => {
//     this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
//     this.setState({ page: 0 });
//   };

//   handleChangeDense = (event) => {
//     this.setState({ dense: event.target.checked });
//   };

//   isSelected = (name) => {
//     // this.state.selected.indexOf(name) !== -1;
//   };

//   ToggleDeletable() {
//     this.setState((prevState, props) => {
//       return { deleteActive: !prevState.deleteActive };
//     });
//   }

//   addRowData = (rowData) => {
//     console.log(rowData);
//     // this.setState({
//     //   variationArray: rowData.ProductVariation,
//     // });
//     // console.log(this.state.variation);
//     this.props.CallAddProductVariation(rowData);
//     // const newrow = { ProductVariation: "" };
//     // this.setState((prevState, props) => {
//     //   const appendednewrow = {
//     //     variationArray: [...prevState.variationArray, newrow],
//     //   };
//     //   return appendednewrow.variationArray;
//     // });
//   };

//   render() {
//     const { classes } = this.props;
//     // console.log(classes.root);
//     const emptyRows =
//       this.state.rowsPerPage -
//       Math.min(
//         this.state.rowsPerPage,
//         this.props.Data.length - this.state.page * this.state.rowsPerPage
//       );
//     // this.props.Data.map((d, i) => {
//     //   d.Picture = (
//     //     <div>
//     //       <img
//     //         height={50}
//     //         src={
//     //           JSON.parse(d.ProductImages)
//     //             ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
//     //             : ""
//     //         }
//     //       />
//     //     </div>
//     //   );
//     // });

//     const divStyle = {
//       width: "100%",
//       margin: "auto",
//       padding: "1%",
//       // paddingRight: "1%",
//       marginTop: "15px",
//     };

//     const table = {
//       // margin: "20px",
//       minWidth: 750,
//     };

//     const classes2 = {
//       border: 0,
//       clip: "rect(0 0 0 0)",
//       height: 1,
//       margin: -1,
//       overflow: "hidden",
//       padding: 0,
//       position: "absolute",
//       top: 20,
//       width: 1,
//     };

//     return (
//       <div style={{ margin: "2%" }}>
//         <div>
//           <h1>Product Variations List</h1>
//           <div style={{ margin: "1%" }}>
//             <MaterialTable
//               title="Product Variation"
//               columns={[
//                 {
//                   title: "Product Category",
//                   field: "ProductCategory",
//                 },
//                 {
//                   title: "Hierarchy Level",
//                   field: "HierarchyID",
//                 },
//                 {
//                   title: "Tag",
//                   field: "Tag",
//                 },
//               ]}
//               data={this.props.Data}
//               options={{
//                 paging: true,
//                 search: false,
//               }}
//               detailPanel={(rowData) => {
//                 const row = JSON.parse(rowData.ProductCategoryVariation);
//                 this.state.variationArray = row;
//                 return (
//                   <div style={{ padding: "2%" }}>
//                     {/* {console.log(row)} */}
//                     <MaterialTable
//                       title="Variations"
//                       columns={[
//                         {
//                           title: "Variations",
//                           field: "ProductVariation",
//                         },
//                         {
//                           title: "Product Category ID",
//                           field: "ProductCategoryID",
//                         },
//                         {
//                           title: "Customizable",
//                           field: "CustomizableIndicator",
//                         },
//                       ]}
//                       data={row}
//                       options={{
//                         paging: false,
//                         search: false,
//                       }}
//                       editable={{
//                         onRowAdd: (newData) =>
//                           new Promise((resolve, reject) => {
//                             setTimeout(() => {
//                               // setData([...data, newData]);
//                               this.addRowData(newData);
//                               resolve();
//                             }, 1000);
//                           }),
//                         onRowUpdate: (newData, oldData) =>
//                           new Promise((resolve, reject) => {
//                             setTimeout(() => {
//                               const dataUpdate = [...row];
//                               const index = oldData.tableData.id;
//                               dataUpdate[index] = newData;
//                               // setData([...dataUpdate]);
//                               this.addRowData([...dataUpdate]);
//                               resolve();
//                             }, 1000);
//                           }),
//                         onRowDelete: (oldData) =>
//                           new Promise((resolve, reject) => {
//                             setTimeout(() => {
//                               const dataDelete = [...row];
//                               const index = oldData.tableData.id;
//                               dataDelete.splice(index, 1);
//                               // setData([...dataDelete]);
//                               this.addRowData([...dataDelete]);
//                               resolve();
//                             }, 1000);
//                           }),
//                       }}
//                     ></MaterialTable>
//                   </div>
//                 );
//               }}
//             ></MaterialTable>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

class ViewProductVariationComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllProductVariation();

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      selection: [],
      selectAll: false,
      height: "300px",
      detailsShown: false,
      index: null,
      name: null,
      hierarchyLevel: null,
      tags: null,
      variation: null,

      order: "asc",
      orderBy: "ProductVariationID",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      variationArray: [],
    };

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.addRowData = this.addRowData.bind(this);
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  onRowClick = (event, row) => {
    this.setState({
      name: row.ProductCategory,
      hierarchyLevel: row.HierarchyID,
      tags: row.Tag,
    });

    if (this.state.detailsShown) {
      this.setState({
        detailsShown: false,
      });
    } else {
      this.setState({
        detailsShown: true,
      });
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangeDense = (event) => {
    this.setState({ dense: event.target.checked });
  };

  isSelected = (name) => {
    // this.state.selected.indexOf(name) !== -1;
  };

  ToggleDeletable() {
    this.setState((prevState, props) => {
      return { deleteActive: !prevState.deleteActive };
    });
  }

  addRowData = (rowData) => {
    // this.setState({
    //   variationArray: rowData.ProductVariation,
    // });
    // console.log(this.state.variation);
    this.props.CallAddProductVariation(rowData);
    // const newrow = { ProductVariation: "" };
    // this.setState((prevState, props) => {
    //   const appendednewrow = {
    //     variationArray: [...prevState.variationArray, newrow],
    //   };
    //   return appendednewrow.variationArray;
    // });
  };

  render() {
    // const { classes } = this.props;

    // console.log(classes.root);
    // const emptyRows =
    //   this.state.rowsPerPage -
    //   Math.min(
    //     this.state.rowsPerPage,
    //     this.props.variations.length - this.state.page * this.state.rowsPerPage
    //   );
    // this.props.Data.map((d, i) => {
    //   d.Picture = (
    //     <div>
    //       <img
    //         height={50}
    //         src={
    //           JSON.parse(d.ProductImages)
    //             ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
    //             : ""
    //         }
    //       />
    //     </div>
    //   );
    // });

    // const divStyle = {
    //   width: "100%",
    //   margin: "auto",
    //   padding: "1%",
    //   // paddingRight: "1%",
    //   marginTop: "15px",
    // };

    // const table = {
    //   // margin: "20px",
    //   minWidth: 750,
    // };

    // const classes2 = {
    //   border: 0,
    //   clip: "rect(0 0 0 0)",
    //   height: 1,
    //   margin: -1,
    //   overflow: "hidden",
    //   padding: 0,
    //   position: "absolute",
    //   top: 20,
    //   width: 1,
    // };

    return (
      <div style={{ width: "100%" }}>
        {/* <DisplayTable
          Data={this.props.variations}
          VariationProps={this.props}
        ></DisplayTable> */}
        <div style={{ margin: "2%" }}>
          <div>
            <h1>Product Variations List</h1>
            <div style={{ margin: "1%" }}>
              <MaterialTable
                title="Product Variation"
                columns={[
                  {
                    title: "Product Category",
                    field: "ProductCategory",
                  },
                  {
                    title: "Hierarchy Level",
                    field: "HierarchyID",
                  },
                  {
                    title: "Tag",
                    field: "Tag",
                  },
                ]}
                data={this.props.variations}
                options={{
                  paging: true,
                  search: false,
                }}
                detailPanel={(rowData) => {
                  let row = JSON.parse(rowData.ProductCategoryVariation);
                  row = row && row.length > 0 ? row : [];
                  // this.state.variationArray = row;
                  return (
                    <div style={{ padding: "2%" }}>
                      <MaterialTable
                        title="Variations"
                        columns={[
                          {
                            title: "Variations",
                            field: "ProductVariation",
                          },
                          // {
                          //   title: "Product Category ID",
                          //   field: "ProductCategoryID",
                          // },
                          // {
                          //   title: "Customizable",
                          //   field: "CustomizableIndicator",
                          // },
                        ]}
                        data={row}
                        options={{
                          paging: false,
                          search: false,
                        }}
                        editable={{
                          onRowAdd: (newData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                var newArr = {
                                  ProductVariation: newData.ProductVariation,
                                  ProductCategoryID: rowData.ProductCategoryID,
                                  CustomizableIndicator: 0,
                                };
                                // setData([...data, newData]);
                                this.addRowData(newArr);
                                resolve();
                              }, 1000);
                            }),
                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataUpdate = [...row];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                // setData([...dataUpdate]);
                                this.addRowData([...dataUpdate]);
                                resolve();
                              }, 1000);
                            }),
                          onRowDelete: (oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataDelete = [...row];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                // setData([...dataDelete]);
                                this.addRowData([...dataDelete]);
                                resolve();
                              }, 1000);
                            }),
                        }}
                      ></MaterialTable>
                    </div>
                  );
                }}
              ></MaterialTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductVariationComponent);
