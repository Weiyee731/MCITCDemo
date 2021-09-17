import React, { Component,  useState  } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  } from "@material-ui/core";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import SearchBox from "../../components/SearchBox/SearchBox";
import validator from 'validator'

function mapStateToProps(state) {
  return {
    subscriber: state.counterReducer["subscriber"],
    newSubsObj: state.counterReducer[" newSubsObj"],
    adddispatch: state.counterReducer["adddispatch"],
    addsubs:state.counterReducer["addsubs"], 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // CallViewSubs: (subscriber) =>
    //   dispatch(GitAction.CallViewSubs(subscriber)),
    CallDeleteSubs: (newSubsObj) =>
      dispatch(GitAction.CallDeleteSubs(newSubsObj)),
    CallUpdateSubs: (newSubsObj) =>
      dispatch(GitAction.CallUpdateSubs(newSubsObj)),
    CallAddDispatch: (adddispatch) => 
      dispatch(GitAction.CallAddDispatch(adddispatch)),
    CallAddSubs: (addsubs) =>
    dispatch(GitAction.CallAddSubs(addsubs)),
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

const headCells = [ //maybe this similar to column
 
  {
    id: "SubscriberEmail",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },


];


function SendEmailTableHead(props) { //identical to EndorseTableHead - Change Naming Later (done)
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CustomTableCell = ({ row, name, onChange }) => {

  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.TableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function EditMailTableHead(props) { //identical to EndorseTableHead - Change Naming Later (done)
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">        
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



EditMailTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EditMailTable(props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [previous, setPrevious] = React.useState({});
  const [dense, setDense] = React.useState(false);
  const classes = useStyles();
  const [rows, setRows] = React.useState(props.Data);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("SubscriberEmail");
 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  

  const onToggleEditMode = (SubscriberId) => {
    setRows(state => {
      return rows.map(row => {
        if (row.SubscriberId === SubscriberId) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
   
  };

  const onSendEditMode = (SubscriberId) => {
    setRows(state => {
      return rows.map(row => {
        if (row.SubscriberId !== SubscriberId) {
          return { ...row, isEditMode: row.isEditMode };
         
        }
        const SubsInfo = {
          SubscriberId: row.SubscriberId,
          SubscriberEmail: row.SubscriberEmail,
        };
        setTimeout(
          function () {
            alert("Updated");
            props.SubsProps.CallUpdateSubs(SubsInfo);
            setTimeout(
              function () {
                window.location.reload(false);
              }.bind(this),
              500
            );
          },
          
        );
        console.log(SubsInfo)
        return row;
      });
  
    });
   
    onToggleEditMode(SubscriberId);
  };


  // const isSelected = (SubscriberId) => selected.indexOf(SubscriberId) !== -1;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  
  const onChange = (e, row) => {
    if (!previous[row.SubscriberId]) {
      setPrevious(state => ({ ...state, [row.SubscriberId]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const {SubscriberId} = row;
    const newRows = rows.map(row => {
    
      if (row.SubscriberId === SubscriberId) {
        return { ...row, [name]: value };
      }
      return row;
    }
    );

  setRows(newRows);
};


const onRevert = SubscriberId => {
  const newRows = props.Data.map(row => {
    if (row.SubscriberId === SubscriberId) {
      return previous[SubscriberId] ? previous[SubscriberId] : row;
    }
    // console.log(row);
    return row;
    
  });
    setRows(newRows);
    setPrevious(state => {
      delete state[SubscriberId];
      // console.log(state);
      return state;
      
    });

  };

  return (
    <Paper className={classes.root}>
    <TableContainer>
      <Table className={classes.table} 
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table">    
            <EditMailTableHead
                      classes={classes}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
       
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.SubscriberId}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <> <Tooltip title="Save">
                    <IconButton
                      aria-label="save"
                      label="save"
                      onClick={() => onSendEditMode(row.SubscriberId)}
                    >
                      <DoneIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Redo">
                    <IconButton
                      aria-label="redo"
                      label="redo"
                      onClick={() => onRevert(row.SubscriberId)}
                    >
                      <UndoIcon />
                    </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title="Edit Email">
                  <IconButton
                    aria-label="edit"
                    label="edit"
                    onClick={() => onToggleEditMode(row.SubscriberId)}
                  >
                    <EditIcon />
                  </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            
              <CustomTableCell {...{ row, name: "SubscriberEmail", onChange }} />
              
            </TableRow>
          ))}
          {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  );
}

function DeleteEmailTableHead(props) { //identical to EndorseTableHead - Change Naming Later (done)
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


function DisplayTableHead(props) { //no diff from endorse display table
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SendEmailTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

DeleteEmailTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const SelectTab = (props) => {
  const classes = useStyles();

  const { numSelected } = props;
  
  const onSendEmail = () => {  
    props.SubsProps.CallAddDispatch(props.selectedData.map(Recipients=>({Recipients})));

    };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          Please Select Recipient(s) Email.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Send Email">
          <IconButton
            aria-label="Send Email"
            onClick={() => {
              onSendEmail();
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

const DeleteTab = (props) => {
  const classes = useStyles();
  const { numSelected } = props;
  const onDeleteEmail = () => {
    props.SubsProps.CallDeleteSubs(props.selectedData); 
    setTimeout(
      function () {
        window.location.reload(false);
      }.bind(this),
      500
    );
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          Please Select Recipient(s) Email to Delete.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete Email">
          <IconButton
            aria-label="Delete Email"
            onClick={() => {
              onDeleteEmail();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

DeleteTab.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


function DeleteTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.Data.map((n) => n.SubscriberId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, mail) => {
    const selectedIndex = selected.indexOf(mail);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, mail);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (mail) => selected.indexOf(mail) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.Data.length - page * rowsPerPage);

  return (
    <div>
    
      <Paper className={classes.paper}>
        <DeleteTab
          numSelected={selected.length}
          selectedData={selected}
          SubsProps={props.SubsProps}
        
        />
        
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <DeleteEmailTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.Data.length}
            />
            <TableBody>
              {stableSort(props.Data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.SubscriberId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.SubscriberId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.SubscriberId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {row.SubscriberEmail}
                      </TableCell>                                            
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const DisplayTableToolbar = (props) => {
  const classes = useStyles();
  const { numSelected } = props;

  return <Toolbar className={clsx(classes.root)}></Toolbar>;
};

SelectTab.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


DisplayTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function SelectMailTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.Data.map((n) => n.SubscriberId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, mail) => {
    const selectedIndex = selected.indexOf(mail);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, mail);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    
    // console.log(newSelected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (mail) => selected.indexOf(mail) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.Data.length - page * rowsPerPage);

  

  console.log({selected})

  return (
    <div>
      <Paper className={classes.paper}>
        <SelectTab
          numSelected={selected.length}
          selectedData={selected}
          SubsProps={props.SubsProps}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <SendEmailTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.Data.length}
            />
            <TableBody>
              {stableSort(props.Data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.SubscriberEmail);
                  console.log(isSelected(row.SubscriberEmail))
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.SubscriberEmail)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.SubscriberId}
                      selected={isItemSelected}
                     
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      
                      <TableCell align="left">
                        {row.SubscriberEmail}
                      </TableCell>                                            
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


class viewUserMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "SubsMail",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      selectActive: false,
      deleteActive: false,
      searchFilter: "",
      rows: [],
      open: false,
      SubscriberEmail:"",
      SubscriberEmailEmailFormat: false,
      error: false,
    };
    // this.props.CallViewSubs(); 
    this.ToggleSelectable = this.ToggleSelectable.bind(this);
    this.ToggleDelete = this.ToggleDelete.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }
  

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };
  
  handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
  };

  onRowClick = (event, row) => {
    this.setState({
      // SubsID:row.SubcriberId,
      SubsMail:row.SubscriberEmail,
     
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

  ToggleSelectable() {
    this.setState((prevState, props) => {
      return { selectActive: !prevState.selectActive };
    });
  };

  ToggleDelete() {
    this.setState((prevState, props) => {
      return { deleteActive: !prevState.deleteActive };
    });
  };

  handleChange(data, e) {
    if (data === "SubscriberEmail") {
      this.setState({
        SubscriberEmail: e.target.value,
      });
    }
  };

  checkMailFormat= () => {
    if (validator.isEmail(this.state.SubscriberEmail)) {
      this.setState({
        SubscriberEmailFormat : false,
      });
    } else {
      this.setState({
        SubscriberEmailFormat: true,
      });
    }
  };

  SubmitMail = () => {
    if (
      !(
        this.state.SubscriberEmailFormat
      )
    ){this.setState({open:false});
    const mailinfo = {
      SubscriberEmail: this.state.SubscriberEmail,
      
    };

    this.props.CallAddSubs(mailinfo); 
    
    setTimeout(
      function () {
        window.location.reload(false);
      }.bind(this),
      500
    );
    console.log(this.props.subscriber)}
  };

  checkValues = () => {
    this.checkMailFormat(); //check promotion title 
    setTimeout(
      function () {
        this.SubmitMail();
      }.bind(this),
      500
    );
  };

  
  render() {
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.subscriber.length - this.state.page * this.state.rowsPerPage
      );
   
    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",

      marginTop: "15px",
    };

    const table = {
      minWidth: 750,
    };

    const classes2 = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    };
    const filteredSubs = [];
    return (
      <div style={{ margin: "2%" }}>
        { this.state.selectActive ? (
          <div>
            <h1>Email List</h1>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.selectActive}
                    onChange={this.ToggleSelectable}
                  />
                }
                label="Send Email"
                style={{
                  float: "right",
                  marginRight: "4%",
                  marginTop: "1%",
                  
                }}
              />

            </div>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            {this.props.subscriber.filter(
              (searchedItem) =>
                searchedItem.SubscriberEmail.toLowerCase().includes(
                  this.state.searchFilter
                ) ||
                searchedItem.SubscriberEmail.toLowerCase().includes(
                  this.state.searchFilter
                )
            ).map((filteredItem) => {
              filteredSubs.push(filteredItem);
            })}
            <SelectMailTable
              Data={this.props.subscriber}
              SubsProps={this.props}
            ></SelectMailTable>
          </div>
        ): this.state.deleteActive ? (<div>
            <h1>Email List</h1>
            <div>                
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.deleteActive}
                    onChange={this.ToggleDelete}
                  />
                }
                label="Delete Email"
                style={{
                  float: "right",
                  marginRight: "4%",
                  marginTop: "1%",
                  
                }}
              />                            
            </div>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            {this.props.subscriber.filter(
              (searchedItem) =>
                searchedItem.SubscriberEmail.toLowerCase().includes(
                  this.state.searchFilter
                ) ||
                searchedItem.SubscriberEmail.toLowerCase().includes(
                  this.state.searchFilter
                )
            ).map((filteredItem) => {
              filteredSubs.push(filteredItem);
            })}
            <DeleteTable
              Data={this.props.subscriber}
              SubsProps={this.props}
            ></DeleteTable>
          </div> 
          ):(
        
          <div><br/>
            <h1>Email List</h1>
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
        Add New Subscriber Mail
      </Button>
    
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Valid Email for Subscription
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="SubscriberEmail"
            onChange={this.handleChange.bind(this, "SubscriberEmail")}
            value ={this.state.SubscriberEmail}
            label="Email Address"
            type="email"
            error={this.state.SubscriberEmailFormat}
            fullWidth
          />
          <br />
              {this.state.SubscriberEmailFormat && (
                <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                  Please Enter Valid Email.
                </p>
              )}

              <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.checkValues.bind(this)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog></div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.selectActive}
                    onChange={this.ToggleSelectable}
                  />
                }
                label="Send Email"
                style={{
                  float: "right",
                  marginRight: "4%",
                  marginTop: "1%",
                }}
              />
            </div>

            <div>
            <FormControlLabel
                control={
                  <Switch
                    checked={this.state.deleteActive}
                    onChange={this.ToggleDelete}
                  />
                }
                label="Delete Email"
                style={{
                  float: "right",
                  marginRight: "4%",
                  marginTop: "1%",
                  
                }}
              />
            </div>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            <div>
              {this.props.subscriber.filter(
                      (searchedItem) =>
                        searchedItem.SubscriberEmail.toLowerCase().includes(
                          this.state.searchFilter
                        ) ||
                        searchedItem.SubscriberEmail.toLowerCase().includes(
                          this.state.searchFilter
                        )
                    ).map((filteredItem) => {
                      filteredSubs.push(filteredItem);
                    })}
                    <EditMailTable
                      Data={this.props.subscriber}
                      SubsProps={this.props}
                    ></EditMailTable>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(viewUserMail);
