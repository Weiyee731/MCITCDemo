// react
import React, { Component } from "react";

// third-party
import { connect } from "react-redux";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import { GitAction } from "../../store/action/gitAction";
import "react-step-progress/dist/index.css";
import LoadingPanel from '../shared/loadingPanel';


function mapStateToProps(state) {
  return {
    postcodes: state.counterReducer["postcodes"],
    addresses: state.counterReducer["addresses"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallRetrievePostcodesList: () => dispatch(GitAction.CallRetrievePostcodesList()),
  };
}

class DeliveryFee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingFee: "",
      dummyRate: [
        { id: 1, isWestMalaysia: 1, shippingRateFirstKG: 13.50, shippingRatesubKG: 5.00, isSarawak: "no" },
        { id: 2, isWestMalaysia: 0, shippingRateFirstKG: 7.00, shippingRatesubKG: 3.50, isSarawak: "SRW" },
        { id: 3, isWestMalaysia: 0, shippingRateFirstKG: 9.00, shippingRatesubKG: 4.50, isSarawak: "SBH" },
      ],
      selectedAddress: [],
    };
  }

  componentDidMount() {
    this.props.CallRetrievePostcodesList()
    if (this.props.addressID !== undefined && this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID)) {
      const selectedAddress = this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID).map((x) => { return (x) })
      // console.log(selectedAddress[0])
      this.setState({ selectedAddress: selectedAddress[0] })
    }
  }

  componentDidUpdate(prevProps) {
  }

  handleCalculation(selectedAddress) {
    const currentPostcode = selectedAddress.UserPoscode;
    const currentDummyRate = this.state.dummyRate.map((y) => y);
    const filteredPostcode = this.props.postcodes.filter((x) => x.Poscode === currentPostcode).map((y) => {return(y)})
    let selectedPostcode = filteredPostcode[0]
    const productDetails = this.props.data[0].product

    console.log("productDetails", selectedPostcode)
    // console.log("productDetails", selectedPostcode.isWestMalaysia)

    // console.log("currentDummyRate", currentDummyRate)

    // if (selectedPostcode.isWestMalaysia === currentDummyRate.map((y) => y.isWestMalaysia)
    //   ) {
    //   console.log("shippingFee", selectedPostcode.isWestMalaysia === currentDummyRate.map((y) => y.isWestMalaysia))

    //   // const actualProductWeight = productDetails.ProductWeight
    //   // const volumetricWeight = (productDetails.ProductDimensionVolume) / 6000
    //   // actualProductWeight > volumetricWeight ? this.setState({ finalWeight: actualProductWeight }) : this.setState({ finalWeight: volumetricWeight })

    //   // const firstWeight = 1
    //   // const subWeight = this.state.finalWeight - firstWeight

    //   // const shippingCost = firstWeight * (currentDummyRate.shippingRateFirstKG) + subWeight * (currentDummyRate.shippingRatesubKG)
    //   // this.setState({ shippingFee: shippingCost, })
    //   // console.log("shippingFee", this.state.shippingFee)

    //   // this.props.handleGetPostcode(this.state.shippingFee)
    // }
  }

  render() {
    const postcodes = this.props.postcodes

    console.log("delivery", this.props)
    console.log("delivery", this.props.data[0])
    return (
      <>
        <LoadingPanel postcodes={postcodes} />
        {this.handleCalculation(this.state.selectedAddress)}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFee);