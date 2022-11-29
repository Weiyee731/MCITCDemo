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
        { id: 1, isWestMalaysia: 1, shippingRateFirstKG: 9.00, shippingRatesubKG: 8.00, shippingRateFirst5KG: 9.00, shippingRatesub5KG: 8.00, isSarawak: "KUL" },
        { id: 2, isWestMalaysia: 0, shippingRateFirstKG: 4.00, shippingRatesubKG: 2.00, shippingRateFirst5KG: 10.00, shippingRatesub5KG: 2.00, isSarawak: "SRW" },
        { id: 3, isWestMalaysia: 0, shippingRateFirstKG: 9.00, shippingRatesubKG: 8.00, shippingRateFirst5KG: 9.00, shippingRatesub5KG: 8.00, isSarawak: "SBH" },
      ],
      isDeliverySet: false
    };
  }

  componentDidMount() {
    this.props.CallRetrievePostcodesList()
    if (this.props.addressID !== undefined && this.props.postcodes !== undefined && this.props.postcodes.length > 0 && this.props.data !== undefined && this.props.data.length > 0)
      this.handleData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.addressID !== undefined && this.props.postcodes !== undefined && this.props.postcodes.length > 0
      && this.props.data !== undefined && this.props.data.length > 0 && this.state.isDeliverySet === false)
      this.handleData()

  }

  handleData() {
    let selectedAddress = []
    let filteredPostcode = []
    let productWeight = 0

    if (this.props.addresses !== undefined && this.props.addresses.length > 0) {
      selectedAddress = this.props.addresses.filter((x) => x.UserAddressBookID === this.props.addressID)

      if (selectedAddress.length > 0) {
        filteredPostcode = this.props.postcodes.filter((x) => x.Poscode === selectedAddress[0].UserPoscode)
        if (filteredPostcode.length > 0) {
          productWeight = this.handleProductWeight(this.props.data, filteredPostcode[0])
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

    if (this.props.addressID !== undefined && this.props.addressID === 0) {
      this.setState({ isDeliverySet: true })
      this.props.handleGetPostcode(0)
    }
  }

  handleProductWeight(productData, poscodeData) {
    let volumetricWeight = 0
    let actualWeight = 0

    if (this.props.orderHistory !== undefined) {
      for (let i = 0; i < productData.length; i++) {
          volumetricWeight = volumetricWeight + (((productData[i].ProductDimensionDeep * productData[i].ProductDimensionHeight  * productData[i].ProductDimensionWidth ) / 5000) * productData[i].ProductQuantity)
          actualWeight = actualWeight + (productData[i].ProductWeight * productData[i].ProductQuantity)
        }
    }
    else {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].product !== undefined) {
          volumetricWeight = volumetricWeight + (((productData[i].product.ProductDimensionVolume * 1000000) / 5000) * productData[i].quantity)
          actualWeight = actualWeight + (productData[i].product.ProductWeight * productData[i].quantity)
        }
      }
    }

    if (poscodeData.CityAlias !== "SRW") {
      if (volumetricWeight > actualWeight)
        return volumetricWeight
      else
        return actualWeight
    }
    else
      return actualWeight
  }

  handleCalculation(filteredPostcode, finalWeight) {
    let shippingRate = this.state.dummyRate
    if (shippingRate !== undefined && shippingRate.length > 0) {
      let firstWeight = 1
      if (filteredPostcode.CityAlias === "SRW")
        firstWeight = 2

      const subWeight = finalWeight - firstWeight
      let shippingCost = 0

      const rate = shippingRate.filter((x) => x.isWestMalaysia === filteredPostcode.isWestMalaysia && x.isSarawak === filteredPostcode.CityAlias).map((y) => { return (y) })
      if (rate !== undefined && rate.length > 0) {
        if (finalWeight > 5 && filteredPostcode.CityAlias === "SRW") {
          shippingCost = (rate[0].shippingRateFirst5KG) + (Math.ceil(finalWeight - 5) * rate[0].shippingRatesub5KG)
        }
        else {
          if (finalWeight > 1)
            shippingCost = (rate[0].shippingRateFirstKG) + (Math.ceil(subWeight) * rate[0].shippingRatesubKG)
          else
            shippingCost = rate[0].shippingRateFirstKG
        }
      }
      this.props.handleGetPostcode(shippingCost)
    }
  }

  render() {
    const postcodes = this.props.postcodes

    console.log("IN DELIVER", this.props)

    return (
      <>
        <LoadingPanel postcodes={postcodes} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryFee);