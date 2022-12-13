import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import NestedMenuItem from "material-ui-nested-menu-item";
import RestoreIcon from '@mui/icons-material/Restore';
import "../../app/App.scss";
function mapStateToProps(state) {
  return {
    productCategories: state.counterReducer["productCategories"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategoryListing: () => dispatch(GitAction.CallAllProductCategoryListing()),
  };
}

class ProductCatogoryDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllProductCategoryListing();
    this.state = this.props.data;
  }

  handleChange(data, e) {
    const alphaNumbericRegex = /^[a-zA-z0-9]/
    let name = e.target.value ? e.target.value.trim() : '';
    let parentId = (this.state.ParentProductCategoryID && this.state.ParentProductCategoryID !== '') ? this.state.ParentProductCategoryID : '';
    let hierarchy = (this.state.HierarchyLevel && this.state.HierarchyLevel !== '') ? this.state.HierarchyLevel : 1;
    
    if (data == "ProductCategoryName") {
        if(name !== '' || alphaNumbericRegex.test(name)){
          this.setState({
            ProductCategroyName: name,
            ParentProductCategoryID: parentId,
            HierarchyLevel: hierarchy,
            buttonDisabled: false,
          });
        }
        else{
          this.setState({
            buttonDisabled: true,
          });
          toast.error( "The Product Category Label is required.");
        }
    } else if (data === "ParentProductCategoryID") {
      this.setState({
        ParentProductCategoryID: e.target.value,
      });
    } else if (data === "Tags") {
      this.setState({
        Tags: e.target.value,
      });
    } else if (data === "MaximumStock") {
      this.setState({
        MaximumStock: e.target.value,
      });
    } else if (data === "RestockQuantity") {
      this.setState({
        RestockQuantity: e.target.value,
      });
    } else if (data === "RestockDate") {
      this.setState({
        RestockDate: e.target.value,
      });
    } else if (data === "RestockStatus") {
      this.setState({
        RestockStatus: e.target.value,
      });
    } else {
    }
  }

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
        ParentProductCategoryID: elemId,
        selectedItem: elemName,
        HierarchyLevel: (elemHierarchy && elemHierarchy !== '' ) ? elemHierarchy + 1 : 1,
      });
    } else {
      toast.error( "You are selecting too fast! \nPlease select again.");
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null, menuPosition: null });
  };

  resetSelectedCategory = () => {
    this.setState({
      ParentProductCategoryID: '',
      selectedItem: 'Choose a Category',
      HierarchyLevel: ''
    })
  }

  updateProductCatagoryForm() {
    this.props.CallUpdateGridStorages(this.state);
  }

  render() {
    const edit = (e) => {
      this.setState((prevState, props) => {
        return { toBeEdited: !prevState.toBeEdited };
      });
    };

    var subMenu = (hierarchyList) => {
      if (typeof hierarchyList !== "object")
        hierarchyList = JSON.parse(hierarchyList);
      var elemList = [];
      hierarchyList.map((d, i) => {
        if(d.HierarchyID < 4){
          if (d.HierarchyItem) {
            // let menuitem = (
            //   // <NestedMenuItem
            //   //   label={(d.ProductCategoryID, d.ProductCategory)}
            //   //   onClick={() =>
            //   //     this.selectCategory(d.ProductCategoryID, d.ProductCategory, d.HierarchyID)
            //   //   }
            //   //   parentMenuOpen={!!this.state.menuPosition}
            //   // >
            //   //   {subMenu(d.HierarchyItem)}
            //   // </NestedMenuItem>
            // );
            // elemList.push(menuitem);
          } else {
            let menuitem = (
              <MenuItem
                onClick={() =>
                  this.selectCategory(d.ProductCategoryID, d.ProductCategory, d.HierarchyID)
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

    const back = () => {

      
    };

    const cardStyle = { width: "80%", margin: "1% auto" };
    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1>Product Category Detail</h1>
        </div>
        <Button onClick={back}>
          <Link className="nav-link" to={"/viewProductCategories"}>
            Back
          </Link>
        </Button>
        {this.state.toBeEdited ? (
          <div>
            <Card style={cardStyle}>
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
                <Button
              aria-owns={this.state.anchorEl ? "pc-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              onMouseEnter={this.handleClick}
              variant="outlined"
              >
                {this.state.selectedItem? this.state.selectedItem : 'Select a Category'}
              </Button> 
              <Button variant='outlined' color='secondary' style={{marginLeft: 5}} onClick={this.resetSelectedCategory}><RestoreIcon /> Reset</Button>
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
              <FormHelperText>Select a Product Category or leave it if this is the Main Category</FormHelperText>
              <br />
              <br />
            <TextField
                id="text-field-controlled"
                helperText="Product Category Label"
                defaultValue={this.state.ProductCategory}
                onChange={this.handleChange.bind(this, "ProductCategoryName")}
                type="text"
                style={{ marginRight: "5px", width: "30%" }}
            />
              <br />
              <br />
            <TextField
                id="text-field-controlled"
                helperText="Tags"
                defaultValue={this.state.Tags}
                onChange={this.handleChange.bind(this, "Tags")}
                type="text"
                style={{ marginRight: "5px", width: "30%" }}
            />
              <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.updateProductCatagoryForm}
                >
                Submit
            </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <Card style={cardStyle}>
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
                <TextField
                  id="text-field-controlled"
                  helperText="Product Category Label"
                  value={this.state.ProductCategory}
                  // onChange={this.handleChange.bind(this, "GridStorageCode")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Hierarchy Level"
                  value={this.state.HierarchyID ? this.state.HierarchyID : 1}
                  // onChange={this.handleChange.bind(this, "GridStorageCode")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Belongs to Product Category"
                  value={this.state.ParentProductCategoryID ? this.state.ParentProductCategoryID : 'Nil'}
                  // onChange={this.handleChange.bind(this, "GridStorageCode")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Tags"
                  value={this.state.Tag}
                  // onChange={this.handleChange.bind(this, "RentalPricePerMonth")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    // alignContent: "stretch",
                  }}
                >
                </div>
               
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatogoryDetailComponent);
