import React, { Component } from "react";
import ReactToPdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
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
const TAX_RATE = 0.07;

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

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function createComInfoRow(desc, info) {
  return { desc, info };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// const rows = [
//   createRow({}, 100, 1.15),
//   // createRow("Paper (Case)", 10, 45.99),
//   // createRow("Waste Basket", 2, 17.99),
// ];

const comInfo = [
  createComInfoRow("Company Name:", "Abc"),
  createComInfoRow("Address:", "Abc"),
  createComInfoRow("Phone No.:", "Abc"),
  createComInfoRow("Quotation No.:", "Abc"),
  createComInfoRow("Quotation Date:", "Abc"),
];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const ref = React.createRef();

const options = {
  orientation: "landscape",
  unit: "in",
  format: [11.7, 8.3],
};

function ProductDetailTable({
  invoiceSubtotal,
  rows,
  invoiceTaxes,
  invoiceTotal,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(rows)}
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
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
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

// const ref = React.createRef();
class productPurchaseOrderPDF extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    const PDFTitle = {
      width: "10%",
      padding: "0% 5% 0% 5%",
      height: "10%",
      //   fontFamily: "Times New Roman",
    };

    const titleFont = {
      fontSize: "19px",
      //   fontFamily: "Times New Roman",
      color: "#262626",
      textAlign: "center",
    };

    const comDetail = {
      width: "50%",
    };

    const tncTitle = {
      fontSize: "16px",
      //   fontFamily: "Times New Roman",
      color: "#0070C0",
    };

    const tncDiv = {
      margin: "1%",
    };

    const downloadButton = {
      backgroundColor: "lightgrey",
      border: "1px solid black",
      float: "right",
      margin: "5%",
    };
    // const totalamount =  arr.reduce((result,number)=> result+number);
    console.log(this.state);
    const selectedinPDFcomponent = this.state.content.columns[
      "column-2"
    ].taskIds.map((taskId, ind) => {
      const index = this.state.content.productList.findIndex(
        (x) => x.ProductID + "_ID" === taskId
      );
      return this.state.content.productList[index];
    });

    console.log(selectedinPDFcomponent);
    const rowss = [];

    selectedinPDFcomponent.map((item) => {
      rowss.push(
        createRow(
          item.ProductName,
          item.ProductStockAmount,
          item.ProductSellingPrice
        )
      );
    });

    console.log(rowss);
    const invoiceSubtotal = subtotal(rowss);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (
      <>
        <div
          style={{ margin: "5%" }}
          className="Post"
          ref={(el) => (this.componentRef = el)}
        >
          <div style={{ padding: "1%" }}>
            <div>
              <div style={titleFont}>My Company Name</div>
              <div style={comDetail}>Rate Quotation</div>
              <div style={comDetail}>Address</div>
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
            <div></div>
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
            {console.log(selectedinPDFcomponent)}
            <ProductDetailTable
              invoiceSubtotal={invoiceSubtotal}
              rows={rowss}
              invoiceTaxes={invoiceTaxes}
              invoiceTotal={invoiceTotal}
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
        <ReactToPrint
          content={() => this.componentRef}
          trigger={() => <Button style={downloadButton}>Generate PDF</Button>}
          documentTitle="Quatation.pdf"
        ></ReactToPrint>
      </>
    );
  }
}

export default productPurchaseOrderPDF;
