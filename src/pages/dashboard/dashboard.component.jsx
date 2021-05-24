import React, { Component } from "react";
import { connect } from "react-redux";
import { Line, Pie } from "react-chartjs-2";
import { GitAction } from "../../store/action/gitAction";
import "./dashboard.component.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "./variables/charts.js";
import MaterialTable from "material-table";

function mapStateToProps(state) {
  return {
    statistic: state.counterReducer["statistic"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallOverallSummary: (propData) =>
      dispatch(GitAction.CallOverallSummary(propData)),
  };
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchaseDate: "",
      StartDateTime: "20201008",
      RevenueAndProfit: [],
      TopProduct: [],
      TopCategory: [],
      Transaction: [],
    };

    this.props.CallOverallSummary(this.state);
  }

  render() {
    let Date = [];
    let Amount = [];
    let Label = [];
    let Data = [];
    if (this.props.statistic[0]) {
      JSON.parse(this.props.statistic[0].Transaction).map((row) => {
        Date.push(row.TransactionDate);
        Amount.push(row.TransactionCount);
      });

      JSON.parse(this.props.statistic[0].TopCategory).map((row) => {
        Label.push(row.ProductCategory);
        Data.push(row.ProductCount);
      });
    }

    const data = {
      labels: Date,
      datasets: [
        {
          label: "Transaction By Date",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Amount,
        },
      ],
    };

    const PieData = {
      labels: Label,
      datasets: [
        {
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
          borderWidth: 0,
          data: Data,
        },
      ],
    };

    this.props.statistic.map((row) => {
      this.state.RevenueAndProfit = JSON.parse(row.RevenueAndProfit);
      this.state.TopProduct = JSON.parse(row.TopProduct);
      this.state.TopCategory = JSON.parse(row.TopCategory);
      this.state.Transaction = JSON.parse(row.Transaction);
    });

    this.state.TopProduct.map((d, i) => {
      d.ProductImage = (
        <div>
          <img height={50} src={d.ProductImage} />
        </div>
      );
    });

    return (
      <div>
        {this.state.RevenueAndProfit.map((RevenueData) => {
          return (
            <Row className="TopCards">
              <Card className="card-stats" style={{ height: "200px" }}>
                <CardBody className="card-body">
                  <Row>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>

                    <div className="numbers">
                      <p className="card-category">
                        {RevenueData.OverallRevenueTitle}
                      </p>
                      <CardTitle tag="p">
                        RM {RevenueData.OverallRevenue}
                      </CardTitle>
                      <p />
                    </div>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  {/* <div className="stats">
                    <i className="fas fa-sync-alt" /> In last day
                    
                  </div> */}
                </CardFooter>
              </Card>
              <Card className="card-stats" style={{ height: "200px" }}>
                <CardBody className="card-body">
                  <Row>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>

                    <div className="numbers">
                      <p className="card-category">
                        {RevenueData.OverallProfitTitle}
                      </p>
                      <CardTitle tag="p">
                        RM {RevenueData.OverallProfit}
                      </CardTitle>
                      <p />
                    </div>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  {/* <div className="stats">
                    <i className="far fa-calendar" /> In last day
                  </div> */}
                </CardFooter>
              </Card>
              <Card className="card-stats" style={{ height: "200px" }}>
                <CardBody className="card-body">
                  <Row>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                    <div className="numbers">
                      <p className="card-category">
                        {RevenueData.MonthlyProfitTitle}
                      </p>
                      <CardTitle tag="p">
                        RM {RevenueData.MonthlyProfit}
                      </CardTitle>
                      <p />
                    </div>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  {/* <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div> */}
                </CardFooter>
              </Card>
              <Card className="card-stats" style={{ height: "200px" }}>
                <CardBody className="card-body">
                  <Row>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>

                    <div className="numbers">
                      <p className="card-category">
                        {RevenueData.WeeklyProfitTitle}
                      </p>
                      <CardTitle tag="p">
                        RM {RevenueData.WeeklyProfit}
                      </CardTitle>
                      <p />
                    </div>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  {/* <div className="stats">
                    <i className="fas fa-sync-alt" /> In last day
                  </div> */}
                </CardFooter>
              </Card>
            </Row>
          );
        })}

        <Row>
          <Card
            className="card-stats"
            style={{ width: "50%", height: "400px" }}
          >
            <CardHeader>
              <CardTitle tag="h5">Transaction</CardTitle>
            </CardHeader>
            <CardBody>
              <Line data={data} width={380} height={100} />
            </CardBody>
            <CardFooter>
              <hr />
              {/* <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div> */}
            </CardFooter>
          </Card>
          <Card
            className="card-ProductPie"
            style={{ width: "25%", height: "400px" }}
          >
            <CardHeader>
              <CardTitle tag="h5" style={{ fontSize: 30 }}>
                Preference Statistics
              </CardTitle>
              <p className="card-category">Last Quarter Performance</p>
            </CardHeader>
            <CardBody>
              <div className="TopProduct">
                <Pie
                  label={Label}
                  data={PieData}
                  options={dashboardEmailStatisticsChart.options}
                />
              </div>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Card className="card-stats" style={{ width: "100%" }}>
            <CardHeader>
              <CardTitle style={{ fontSize: 30 }} tag="h5">
                Top Grossing Product
              </CardTitle>
              <p className="card-category"></p>
            </CardHeader>
            <CardBody>
              <div className="" style={{ fontSize: 12 }}>
                <MaterialTable
                  title="Top Product"
                  columns={[
                    {
                      title: "Product Image",
                      field: "ProductImage",
                    },
                    {
                      title: "Product Name",
                      field: "ProductName",
                    },
                    {
                      title: "Brand",
                      field: "Brand",
                    },
                    {
                      title: "Current Stock",
                      field: "ProductStockAmountInital",
                    },
                    {
                      title: "Product Rating",
                      field: "ProductRating",
                    },
                  ]}
                  data={this.state.TopProduct}
                  options={{
                    paging: false,
                    search: false,
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
