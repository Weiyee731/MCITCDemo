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
import FormHelperText from "@material-ui/core/FormHelperText";

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

function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={classes.root}>
      Quantity &nbsp;
      <Input
        className={classes.input}
        value={value}
        margin="dense"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: 1000,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </div>
  );
}

const InputNumber = 0;
const useStyles = () => ({
  root: {
    width: "80%",
    margin: "1%",
  },
  card: {
    width: "100%",
    margin: "1%",
  },
  sliderWidth: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: "250px",
  margin: "1%",
  height: "40%",

  // change background colour if dragging
  // background: isDragging ? "lightgrey" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? 'grey' : 'white',
  display: "flex",
  padding: "10px",
  overflow: "auto",
});

class ProductPurchaseOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.props.callAllSupplierByUserStatus("Endorsed");
    this.generatePO = this.generatePO.bind(this);
    this.state = {
      postSubmitted: false,
      productSupplier: "",
      productSupplierEmpty: false,
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
      productList: [],
      tasks: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "Selection of product",
          closeButton: false,
          taskIds: [],
        },
        "column-2": {
          id: "column-2",
          title: "Selected",
          closeButton: true,
          taskIds: [],
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ["column-1", "column-2"],
      SelectedProductID: [],
      SelectedProductStock: [],
    };
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination) {
      this.setStat = true;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    // console.log(startTaskIds);
    // console.log(finishTaskIds);
    // console.log(newStart);
    // console.log(newFinish);

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  generatePO = (event) => {
    const selected1 = this.state.columns["column-2"].taskIds.map(
      (taskId, ind) => {
        const index = this.state.SelectedProductID.findIndex(
          (x) => x + "_ID" === taskId
        );
        return this.state.SelectedProductID[index];
      }
    );
    console.log(selected1);
    const selected = selected1.map((id, ind) => {
      const index = this.props.allstocks.findIndex(
        (x) => x.ProductID + "_ID" === id
      );
      return this.props.allstocks[index];
    });
    console.log(selected);
    // const User;
    // this.props.CallAddProductPurchaseOrder(this.state);
    // this.setState({
    //   postSubmitted: true,
    // });
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

  handleChange(data, e) {
    if (data === "Product Supplier") {
      this.state.columns["column-1"].taskIds = [];
      this.state.columns["column-2"].taskIds = [];
      this.props.CallAllProductsByProductStatus({
        ProductStatus: "Endorsed",
        UserID: e.target.value,
      });

      this.setState({
        UserID: e.target.value,
      });
    }
  }

  handleInputChange = (index, e) => {
    let newSelected = this.state.SelectedProductStock;
    newSelected[index] = Number(e.target.value);
    newSelected = newSelected.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductStock: newSelected });
    let newSelectedProductID = this.state.SelectedProductID;
    newSelectedProductID[index] = this.props.allstocks[index].ProductID;
    newSelectedProductID = newSelectedProductID.filter(function (el) {
      return el !== "empty";
    });
    this.setState({ SelectedProductID: newSelectedProductID });
    // console.log(this.state);
  };

  handleBlur = () => {
    // if (value < 0) {
    //   setValue(0);
    // } else if (value > 100) {
    //   setValue(100);
    // }
  };

  render() {
    const classes = useStyles();
    this.state.productSupplier = this.props.allUser;
    this.state.productList = this.props.allstocks;
    this.state.columns["column-1"].taskIds = [];
    this.state.productList.map((d, i) => {
      d.Picture = (
        <div>
          <img
            height={100}
            src={
              JSON.parse(d.ProductImages)
                ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
                : { logo }
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Logo;
            }}
          />
        </div>
      );
      // if (
      //   this.state.columns["column-1"].taskIds.length <= 0 &&
      //   this.state.columns["column-2"].taskIds.length <= 0
      // ) {
      this.state.columns["column-1"].taskIds.push(d.ProductID + "_ID");
      // }
    });

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

    let DraggableContent = this.state.columnOrder.map((columnId) => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map((taskId, ind) => {
        const index = this.props.allstocks.findIndex(
          (x) => x.ProductID + "_ID" === taskId
        );
        return this.props.allstocks[index];
      });
      return (
        <Card style={classes.card}>
          <CardContent>
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id} type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {tasks.length > 0
                    ? tasks.map((task, index) => (
                        <Draggable
                          draggableId={task.ProductID + "_ID"}
                          key={task.ProductID + "_ID"}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              isDragging={snapshot.isDragging}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <CardContent>
                                <div style={{ position: "relative" }}>
                                  {task.ProductName}
                                  {task.Picture}
                                  <div className={classes.root}>
                                    Quantity
                                    <Input
                                      className={classes.input}
                                      value={
                                        this.state.SelectedProductStock[index]
                                      }
                                      margin="dense"
                                      onChange={this.handleInputChange.bind(
                                        this,
                                        index
                                      )}
                                      inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: "number",
                                        "aria-labelledby": "input-slider",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  {"RM" + " " + task.ProductSellingPrice}
                                </div>
                              </CardContent>
                              <CardMedia
                                image={task.ProductMediaUrl}
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                }}
                              />
                              <CardActions>
                                <Button size="small">Learn More</Button>
                              </CardActions>
                            </Card>
                          )}
                        </Draggable>
                      ))
                    : ""}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      );
    });

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
              <option aria-label="None" value="" />
              {createMenusForDropDownUsers}
            </Select>
            <FormHelperText>Supplier</FormHelperText>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div>
                {DraggableContent}
                <button onClick={(event) => this.generatePO(event)}>
                  Generate PO
                </button>
              </div>
            </DragDropContext>
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
