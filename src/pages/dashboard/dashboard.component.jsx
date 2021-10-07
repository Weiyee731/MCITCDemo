import React, { Component } from "react";
import { connect } from "react-redux";
import { Line, Pie,Bar } from "react-chartjs-2";
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
import HouseIcon from '@material-ui/icons/House';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

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
      TopCategroy:[{
        Category: "Clothes",
        Volume: "13,102",
      },{
        Category: "Shoes",
        Volume: "11,222",
      },{
        Category: "Foods",
        Volume: "10,089",
      },{
        Category: "Equipments",
        Volume: "8,074",
      },{
        Category: "Decoration",
        Volume: "4,118",
      }]
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

    const bardata = {
      labels: ['Merchant A', 'Merchant B', 'Merchant C', 'Merchant D', 'Merchant E', 'Merchant F'],
      datasets: [
        {
          label: 'Top Sales of the Month',
          data: [12000, 19000, 13000, 12500, 11200, 10300],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const barOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    

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
      if (Array.isArray(this.state.RevenueAndProfit) && this.state.RevenueAndProfit.length === 0)
        this.setState({ RevenueAndProfit: JSON.parse(row.RevenueAndProfit), })

      if (Array.isArray(this.state.TopProduct) && this.state.TopProduct.length === 0) {
        let topProduct = JSON.parse(row.TopProduct)
        topProduct.map((d, i) => {
          d.ProductImage = (
            <div>
              <img height={50} width={50} src={d.ProductImage} alt="" />
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
        <div className="p-1">
          <h1>Administrative Dashboard</h1>
        </div>

        {this.state.RevenueAndProfit.map((RevenueData) => {
          return (
            <Row className="mt-3" style={{ width: '98% ' }}>
              <Col>
                <Card className="card-stats w-100" style={{ height: "175px", backgroundColor: '#2b2b2b', borderRadius: '5px' }} >
                  <CardBody className="card-body">
                    <Row>
                      <div className="numbers">
                        <CardTitle style={{ fontSize: "24pt", fontWeight: 600, color: "white" }}>
                          RM {RevenueData.OverallRevenue}
                        </CardTitle>
                        <p className="" style={{ color: "white", }}>
                          {/* {RevenueData.OverallRevenueTitle} */}
                          <HouseIcon fontSize={'large'} /> <span style={{ fontSize: "14pt" }}>Total Revennue</span>
                        </p>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col>
                <Card className="card-stats w-100" style={{ height: "175px", backgroundColor: '#2b2b2b', borderRadius: '5px' }}>
                  <CardBody className="card-body">
                    <Row>
                      {/* <div className="numbers">
                        <CardTitle style={{ fontSize: "18pt", fontWeight: 600 }}>
                          RM {RevenueData.OverallProfit}
                        </CardTitle>
                          <p className="" style={{color: "white",}}>
                          <HouseIcon fontSize={'large'}/> <span style={{ fontSize: "14pt"}}>Da</span>
                        </p>
                      </div> */}

                      <div className="w-100">
                        <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.33)", padding: '5px 10px', textAlign: 'left' }}>
                          <span style={{ color: 'white', fontSize: '12pt', marginRight: '10px' }}>Daily Sales</span>
                          <span style={{ fontSize: "24pt", fontWeight: 600, color: "white", width: '100%' }}>
                            RM {RevenueData.OverallProfit}
                          </span>
                        </div>
                        <div style={{ padding: '5p 10px', textAlign: 'right' }}>
                          <span style={{ fontSize: "24pt", fontWeight: 600, color: "white", width: '100%', marginRight: '10px' }}>
                            369
                          </span>
                          <span style={{ color: 'white', fontSize: '12pt' }}>Orders</span>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col>
                <Card className="card-stats w-100" style={{ height: "175px", backgroundColor: '#2b2b2b', borderRadius: '5px', color: 'white' }}>
                  <CardBody className="card-body">
                    <Row>
                      <div className="numbers">
                        <CardTitle style={{ fontSize: "24pt", fontWeight: 600, color: "white" }}>
                          {/* {RevenueData.MonthlyProfit} */}
                          10,642
                        </CardTitle>
                        <p className="" style={{ color: "white", }}>
                          {/* {RevenueData.OverallRevenueTitle} */}
                          <PeopleAltIcon fontSize={'large'} /> <span style={{ fontSize: "14pt" }}>Total Visitor</span>
                        </p>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col md="5">
            <div className="py-2">
              <h5 className="ml-3"><b>Top Merchants</b></h5>
              <Bar data={bardata} options={barOptions} />
            </div>
          </Col>


          <Col md="7">
            {/* <div>
              <h5><b>Preference Statistics</b></h5>
              <div className="TopProduct">
                <Pie
                  label={Label}
                  data={PieData}
                  options={dashboardEmailStatisticsChart.options}
                />
              </div>
            </div> */}

            <div className="row" style={{ fontSize: 12, width: '100%', height: "40vh", overflowY: 'auto' }} >
              <div className="col-6">

                <MaterialTable
                  title="Hot Sales Items"
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
                    }, 
                    rowStyle: {
                      padding: '5px'
                    }
                  }}
                />
              </div>
              <div className="col-6">
                <MaterialTable
                  title="Hot Sales Items"
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
                    },
                    rowStyle: {
                      padding: '5px'
                    }
                  }}
                />
              </div>

            </div>
          </Col>
        </Row>

        <Row>
          <Col md="8">
            <div className="py-2">
              <h5 className="ml-3"><b>Total Sales Revenue</b></h5>
              <Line data={data} width={80} height={30} />
            </div>
          </Col>


          <Col md="4">
            <div>
              <MaterialTable
                title="Top Category Browsing"
                columns={[
                  {
                    title: "Category",
                    field: "Category",
                  },
                  {
                    title: "Volume",
                    field: "Volume",
                  },
                ]}
                data={this.state.TopCategroy}
                options={{
                  paging: false,
                  search: false,
                  headerStyle: {
                    backgroundColor: '#333333',
                    color: '#FFF'
                  },
                  rowStyle: {
                    padding: '0'
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
