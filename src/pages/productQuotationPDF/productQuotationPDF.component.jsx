import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import logo from "../../assets/Emporia.png";
import { GitAction } from "../../store/action/gitAction";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const TAX_RATE = 0.07;

function mapStateToProps(state) {
  return {
    allQuotations: state.counterReducer["quotations"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddProductQuotation: (prodData) =>
      dispatch(GitAction.CallAddProductQuotation(prodData)),
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(index, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { index, desc, qty, unit, price };
}

function createComInfoRow(desc, info) {
  return { desc, info };
}

function subtotal(items) {
  var sum = 0;

  sum =
    parseInt(sum) +
    items.map((SumProduct) => {
      return parseInt(SumProduct.Quantity * SumProduct.ProductSellingPrice);
    });
  return items.reduce(
    (total, { Quantity, ProductSellingPrice }) =>
      (total += Quantity * ProductSellingPrice),
    0
  );
}

const options = {
  orientation: "landscape",
  unit: "in",
  format: [11.7, 8.3],
};

function ProductDetailTable(props) {
  const classes = useStyles();

  const invoiceSubtotal = subtotal(props.SelectedData);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceSubtotal;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Price
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Product Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.SelectedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div>
                  <img
                    height={50}
                    alt={row.ProductName}
                    src={row.ProductImage}
                  />
                </div>
              </TableCell>
              <TableCell>{row.ProductName}</TableCell>
              <TableCell align="right">{row.Quantity}</TableCell>
              <TableCell align="right">{row.ProductSellingPrice}</TableCell>
              <TableCell align="right">
                {row.Quantity * row.ProductSellingPrice}
              </TableCell>
            </TableRow>
          ))}

          {/* <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell colSpan={3} align="right">
              Total
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {"RM " + invoiceTotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

function printPDF() {
  return (
    <ReactToPrint
      content={() => this.componentRef}
      documentTitle="post.pdf"
    ></ReactToPrint>
  );
}

class productQuotationPDF extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    const ProductIDs = [];
    const ProductQuantities = [];
    const ProductPrices = [];
    const groupedArray = [];
    const comInfo = [
      createComInfoRow("Company Name:", this.state.PropsData.CompanyName),
      createComInfoRow(
        "Address:",
        this.state.PropsData.CompanyAddressLine1 +
          this.state.PropsData.CompanyAddressLine2
      ),
      createComInfoRow("Phone No.:", this.state.PropsData.CompanyContactNo),
      createComInfoRow(
        "Quotation No.:",
        this.state.PropsData.ProductQuotationCode
      ),
      createComInfoRow("Quotation Date:", this.state.PropsData.CreatedDate),
    ];

    var selected = [];
    console.log(this.state);
    if (this.state.FirstCreatedFlag == 1) {
      selected = this.state.SelectedData.map((ProductID, ind) => {
        const index = this.state.PropsData.Data.findIndex(
          (x) => x.ProductID === ProductID
        );
        this.state.PropsData.Data[index].Quantity = this.props.selectAmount[
          index
        ];
        ProductIDs.push(this.state.PropsData.Data[index].ProductID);
        ProductQuantities.push(this.state.PropsData.Data[index].Quantity);
        ProductPrices.push(
          this.state.PropsData.Data[index].ProductSellingPrice
        );
        return this.state.PropsData.Data[index];
      });
    } else {
      // console.log(this.state.PropsData);
      selected = JSON.parse(this.state.PropsData.ProductQuotationDetail);
      selected.map((datarow, ind) => {
        ProductIDs.push(datarow.ProductID);
        ProductQuantities.push(datarow.Quantity);
        ProductPrices.push(datarow.ProductSellingPrice);
      });
    }

    groupedArray.push({
      ProductIDs: ProductIDs,
      ProductQuantities: ProductQuantities,
      ProductPrices: ProductPrices,
    });

    const companyTitle = {
      fontWeight: "bolder",
      fontSize: "25px",
    };

    const companyDetailTitle = {
      fontWeight: "bold",
      fontSize: "15px",
    };

    const companyDetail = {
      fontSize: "12px",
      color: "grey",
      fontWeight: "normal",
    };

    const quotation = {
      float: "right",
      fontSize: "20px",
      fontWeight: "bold",
    };

    const tncTitle = {
      fontSize: "16px",
      color: "#0070C0",
    };

    const tncDiv = {
      margin: "1%",
    };

    const downloadButton = {
      backgroundColor: "lightgrey",
      float: "right",
      margin: "5%",
    };

    const back = () => {
      window.location.reload(false);
    };

    // const submit = () => {

    //   confirmAlert({
    //     title: "Confirmation",
    //     message: "Are you sure to generate this quotation?",
    //     buttons: [
    //       {
    //         label: "Yes",
    //         onClick: () => {
    //           groupedArray && groupedArray.length > 0
    //             ? this.props.CallAddProductQuotation(groupedArray[0])
    //             : alert(
    //                 "Your quotation is incomplete! Please select again your products with amount."
    //               );
    //         },
    //       },
    //       {
    //         label: "No",
    //         onClick: () => {},
    //       },
    //     ],
    //   });
    //   console.log(groupedArray);
    // };

    return (
      <>
        <div>
          <Button onClick={back}>
            <i className="fas fa-chevron-left"></i>
            <Link className="nav-link">Back</Link>
          </Button>
        </div>
        <div
          style={{ width: "100%", padding: "3%" }}
          className="Post"
          ref={(el) => (this.componentRef = el)}
        >
          <div style={{ padding: "1%" }}>
            <div>
              <div style={{ float: "left" }}>
                <img src={logo} width="200px" />
              </div>
              <div style={companyTitle}>
                &nbsp; Malaysia China International Trading Centre
              </div>
              <div style={companyTitle}>&nbsp; 马来西亚中国国际商城</div>
              <div style={companyDetailTitle}>
                &nbsp; Address{"  "}
                <span style={companyDetail}>
                  Sejingkat, 93050 Kuching, Sarawak
                </span>
              </div>
              <div style={companyDetailTitle}>
                &nbsp; Phone No{"  "}
                <span style={companyDetail}>012-850 9198</span>
                <span style={quotation}>Quotation</span>
              </div>
              <div
                style={{
                  width: "100%",
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                  borderImage: "initial",
                  borderBottom: "1pt solid rgb(0, 112, 192)",
                  padding: "0 5px",
                  height: "20px",
                  verticalAlign: "top",
                }}
              />
            </div>
            <br />
            <Table style={{ width: "100%" }}>
              <TableBody>
                {comInfo.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="left">{row.info}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <br />
            Quotation Details:
            <ProductDetailTable
              SelectedData={selected}
              SelectedAmount={this.props}
            />
          </div>
          {/* ROW OF TERMS & CONDITIONS */}
          <div style={tncDiv}>
            <div style={tncTitle}>Terms and Conditions</div>
            <br />
            <div>
              <p>
                1. Customer will be billed after indicating acceptance of this
                quote.
              </p>
              <p>
                2. Payment will be due prior to delivery of service and goods.
              </p>
              <p>To accept this Quotation ,sign here and return :</p>
            </div>
          </div>
          <br />
        </div>
        {/* <Button style={downloadButton} onClick={submit}> */}
        {/* Generate PDF
        </Button> */}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productQuotationPDF);
