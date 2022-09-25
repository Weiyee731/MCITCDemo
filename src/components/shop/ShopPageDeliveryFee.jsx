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
        { id: 1, isWestMalaysia: 1, shippingRateFirstKG: 13.50, shippingRatesubKG: 5.00, isSarawak: "KUL" },
        { id: 2, isWestMalaysia: 0, shippingRateFirstKG: 7.00, shippingRatesubKG: 3.50, isSarawak: "SRW" },
        { id: 3, isWestMalaysia: 0, shippingRateFirstKG: 9.00, shippingRatesubKG: 4.50, isSarawak: "SBH" },
      ],
      selectedAddress: [],
      selectedPostcode: [],
      postcodeList: [],
      currentPostcode: [],
      finalWeight: [],
    };
  }

  componentDidMount() {
    this.props.CallRetrievePostcodesList()
    if (this.props.addressID !== undefined && this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID)) {
      const selectedAddress = this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID).map((x) => { return (x) })
      this.setState({ selectedAddress: selectedAddress[0], currentPostcode: selectedAddress[0].UserPoscode })

      const filteredPostcode = this.props.postcodes.filter((x) => x.Poscode === selectedAddress[0].UserPoscode)
      this.setState({ selectedPostcode: filteredPostcode[0] })

      const productDetails = this.props.data[0].product
      if (productDetails !== undefined) {
        const actualProductWeight = productDetails.ProductWeight
        const volumetricWeight = (productDetails.ProductDimensionVolume) / 6000
        console.log(actualProductWeight)
        console.log(volumetricWeight)
        actualProductWeight > volumetricWeight ? this.handleCalculation(filteredPostcode[0], (actualProductWeight).toFixed(2)) : this.handleCalculation(filteredPostcode[0], (volumetricWeight).toFixed(2))
      }
    }
  }

  componentDidUpdate(prevProps) {
  }

  handleCalculation(filteredPostcode, finalWeight) {
    console.log(finalWeight)
    if (this.state.dummyRate.filter((x) => x.isWestMalaysia === filteredPostcode.isWestMalaysia && x.isSarawak === filteredPostcode.CityAlias)) {
      const firstWeight = 1
      const subWeight = finalWeight - firstWeight

      const rate = this.state.dummyRate.filter((x) => x.isWestMalaysia === filteredPostcode.isWestMalaysia && x.isSarawak === filteredPostcode.CityAlias).map((y) => { return (y) })
      console.log(rate[0].shippingRateFirstKG)
      console.log(rate[0].shippingRatesubKG)
      console.log(firstWeight)
      console.log(subWeight)
      const shippingCost = firstWeight * (rate[0].shippingRateFirstKG) + subWeight * (rate[0].shippingRatesubKG)
      this.setState({ shippingFee: shippingCost, })
      console.log(shippingCost)
    }
  }

  render() {
    const postcodes = this.props.postcodes

    return (
      <>
        <LoadingPanel postcodes={postcodes} />
        {/* {this.props.handleGetPostcode(this.state.shippingFee)} */}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFee);