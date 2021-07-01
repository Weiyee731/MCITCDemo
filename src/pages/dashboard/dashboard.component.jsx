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

    console.log(this.props.statistic)
    this.props.statistic.map((row) => {
      if (Array.isArray(this.state.RevenueAndProfit) && this.state.RevenueAndProfit.length === 0)
        this.setState({ RevenueAndProfit: JSON.parse(row.RevenueAndProfit), })

      if (Array.isArray(this.state.TopProduct) && this.state.TopProduct.length === 0) {
        let topProduct = JSON.parse(row.TopProduct)
        topProduct.map((d, i) => {
          d.ProductImage = (
            <div>
              <img height={50} src={d.ProductImage} />
            </div>
          );

          d.ProductRating = parseFloat(d.ProductRating).toFixed(2)
        })
        this.setState({ TopProduct: topProduct, })
      }

      if (Array.isArray(this.state.TopCategory) && this.state.TopCategory.length === 0)
        this.setState({ TopCategory: JSON.parse(row.TopCategory), })

      if (Array.isArray(this.state.Transaction) && this.state.Transaction.length === 0)
        this.setState({ Transaction: JSON.parse(row.Transaction), })
      // this.state.RevenueAndProfit = JSON.parse(row.RevenueAndProfit);
      // this.state.TopProduct = JSON.parse(row.TopProduct);
      // this.state.TopCategory = JSON.parse(row.TopCategory);
      // this.state.Transaction = JSON.parse(row.Transaction);
    });

    // this.state.TopProduct.map((d, i) => {
    //   d.ProductImage = (
    //     <div>
    //       <img height={50} src={d.ProductImage} />
    //     </div>
    //   );

    //   d.ProductRating = parseFloat(d.ProductRating).toFixed(2)
    // });

    return (
      <div>
        {this.state.RevenueAndProfit.map((RevenueData) => {
          return (
            <Row className="mt-3">
              <Col md="3">
                <Card className="card-stats" style={{ height: "150px", }}>
                  <CardBody className="card-body">
                    <Row>
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>

                      <div className="numbers">
                        <p className="card-category">
                          {RevenueData.OverallRevenueTitle}
                        </p>
                        <CardTitle style={{ fontSize: "18pt", fontWeight: 600 }}>
                          RM {RevenueData.OverallRevenue}
                        </CardTitle>
                        <p />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col md="3">

                <Card className="card-stats" style={{ height: "150px", }}>
                  <CardBody className="card-body">
                    <Row>
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>

                      <div className="numbers">
                        <p className="card-category">
                          {RevenueData.OverallProfitTitle}
                        </p>
                        <CardTitle style={{ fontSize: "18pt", fontWeight: 600 }}>
                          RM {RevenueData.OverallProfit}
                        </CardTitle>
                        <p />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-stats" style={{ height: "150px", }}>
                  <CardBody className="card-body">
                    <Row>
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                      <div className="numbers">
                        <p className="card-category">
                          {RevenueData.MonthlyProfitTitle}
                        </p>
                        <CardTitle style={{ fontSize: "18pt", fontWeight: 600 }}>
                          RM {RevenueData.MonthlyProfit}
                        </CardTitle>
                        <p />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-stats" style={{ height: "150px", }}>
                  <CardBody className="card-body">
                    <Row>
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>

                      <div className="numbers">
                        <p className="card-category">
                          {RevenueData.WeeklyProfitTitle}
                        </p>
                        <CardTitle style={{ fontSize: "18pt", fontWeight: 600 }}>
                          RM {RevenueData.WeeklyProfit}
                        </CardTitle>
                        <p />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col md="7">
            <div className="py-2">
              <h5 className="ml-3"><b>Sales Made</b></h5>
              <Line data={data} width={280} height={100} />
            </div>
            <div className="py-2">
              <h5 className="ml-3"><b>Visitor</b></h5>
              <Line data={data} width={280} height={100} />
            </div>
          </Col>


          <Col md="5">
            <div>
              <h5><b>Preference Statistics</b></h5>
              <div className="TopProduct">
                <Pie
                  label={Label}
                  data={PieData}
                  options={dashboardEmailStatisticsChart.options}
                />
              </div>
            </div>
            <div className="" style={{ fontSize: 12, width: '95%', height: "40vh", overflowY: 'auto' }} >
              <MaterialTable
                title="Top Grossing Product"
                columns={[
                  {
                    title: "Product",
                    field: "ProductImage",
                  },
                  {
                    title: "Name",
                    field: "ProductName",
                  },
                  {
                    title: "Stocks",
                    field: "ProductStockAmountInital",
                  },
                  {
                    title: "Ratings",
                    field: "ProductRating",
                  },
                ]}
                data={this.state.TopProduct}
                options={{
                  paging: false,
                  search: false,
                  headerStyle: {
                    backgroundColor: '#333333',
                    color: '#FFF'
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
