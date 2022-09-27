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
import { toast } from "react-toastify";


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
      dummyRate: [
        { id: 1, isWestMalaysia: 1, shippingRateFirstKG: 13.50, shippingRatesubKG: 5.00, isSarawak: "KUL" },
        { id: 2, isWestMalaysia: 0, shippingRateFirstKG: 7.00, shippingRatesubKG: 3.50, isSarawak: "SRW" },
        { id: 3, isWestMalaysia: 0, shippingRateFirstKG: 9.00, shippingRatesubKG: 4.50, isSarawak: "SBH" },
      ],
    };
  }

  componentDidMount() {
    this.props.CallRetrievePostcodesList()
    if (this.props.addressID !== undefined && this.props.addressID !== 0 && this.props.postcodes !== undefined && this.props.postcodes.length > 0 && this.props.data !== undefined && this.props.data.length > 0) {

      let selectedAddress = []
      let filteredPostcode = []
      let productWeight = 0

      if (this.props.addresses !== undefined && this.props.addresses.length > 0) {
        selectedAddress = this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID)

        if (selectedAddress.length > 0) {
          filteredPostcode = this.props.postcodes.filter((x) => x.Poscode === selectedAddress[0].UserPoscode)
          if (filteredPostcode.length > 0) {
            productWeight = this.handleProductWeight(this.props.data)
            this.handleCalculation(filteredPostcode[0], productWeight)
          }
          else {
            toast.warning("The poscode is incorrect. Please cross check the selected address poscode")
            setTimeout(() => {
              window.location.href = "/account/addresses/"
            }, 3000);
          }
        }
      }
    }
    if (this.props.addressID !== undefined && this.props.addressID === 0)
      this.props.handleGetPostcode(0)
  }

  componentDidUpdate(prevProps) {
  }

  handleProductWeight(productData) {
    let volumetricWeight = 0
    let actualWeight = 0

    productData.map((details) => {
      if (details.product !== undefined) {
        volumetricWeight = volumetricWeight + ((details.product.ProductDimensionVolume * 1000000) / 6000)
        actualWeight = actualWeight + details.product.ProductWeight
      }
    })

    if (volumetricWeight > actualWeight)
      return volumetricWeight
    else
      return actualWeight

  }

  handleCalculation(filteredPostcode, finalWeight) {
    let shippingRate = this.state.dummyRate

    if (shippingRate !== undefined && shippingRate.length > 0) {
      const firstWeight = 1
      const subWeight = finalWeight - firstWeight
      let shippingCost = 0

      const rate = shippingRate.filter((x) => x.isWestMalaysia === filteredPostcode.isWestMalaysia && x.isSarawak === filteredPostcode.CityAlias).map((y) => { return (y) })
      if (rate !== undefined && rate.length > 0) {
        if (finalWeight > 1)
          shippingCost = (firstWeight * rate[0].shippingRateFirstKG) + (Math.ceil(subWeight) * rate[0].shippingRatesubKG)
        else
          shippingCost = firstWeight * rate[0].shippingRateFirstKG
      }
      this.props.handleGetPostcode(shippingCost)
    }
  }

  render() {
    const postcodes = this.props.postcodes

    return (
      <>
        <LoadingPanel postcodes={postcodes} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFee);