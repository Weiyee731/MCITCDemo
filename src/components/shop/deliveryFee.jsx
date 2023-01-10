import PropTypes from 'prop-types';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
// components
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import sum from 'lodash/sum';

import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../store/action/gitAction';
// ----------------------------------------------------------------------

DeliveryFee.propTypes = {
    handleGetPostcode: PropTypes.func,
    address: PropTypes.object,
    data: PropTypes.object,
};

export default function DeliveryFee({
    handleGetPostcode,
    address,
    data
}) {

    const dispatch = useDispatch();
    const [fee, setShippingFee] = useState(0)

    useEffect(() => {
        dispatch(GitAction.CallRetrievePostcodesList());
    }, []);

    const postcodes = useSelector(state => ({ postcodes: state.counterReducer.postcodes }));

    useEffect(() => {
        console.log("useeffect2")
        console.log("1", address !== undefined)
        console.log("2", postcodes !== undefined)
        console.log("2", postcodes)
        console.log("3", postcodes.length > 0)
        console.log("4", data !== undefined)
        console.log("5", data.length > 0)
        if (address !== undefined && postcodes !== undefined && postcodes.postcodes.length > 0
            && data !== undefined && data.length > 0) {
            console.log("Delivery", "in")
            handleData()
        }

    }, [postcodes]);


    const dummyRate = [
        { id: 1, isWestMalaysia: 1, shippingRateFirstKG: 9.00, shippingRatesubKG: 8.00, shippingRateFirst5KG: 9.00, shippingRatesub5KG: 8.00, isSarawak: "KUL" },
        { id: 2, isWestMalaysia: 0, shippingRateFirstKG: 4.00, shippingRatesubKG: 2.00, shippingRateFirst5KG: 10.00, shippingRatesub5KG: 2.00, isSarawak: "SRW" },
        { id: 3, isWestMalaysia: 0, shippingRateFirstKG: 9.00, shippingRatesubKG: 8.00, shippingRateFirst5KG: 9.00, shippingRatesub5KG: 8.00, isSarawak: "SBH" },
    ]

    const isDeliverySet = false

    const handleData = () => {
        let selectedAddress = []
        let filteredPostcode = []
        let productWeight = 0
        console.log("checkee", address)
        if (address !== undefined) {
                filteredPostcode = postcodes.postcodes.filter((x) => x.Poscode === address.UserPoscode)
                if (filteredPostcode.length > 0) {
                    productWeight = handleProductWeight(data, filteredPostcode[0])
                    handleCalculation(filteredPostcode[0], productWeight)
                }
                else {
                    // toast.warning("The poscode is incorrect. Please cross check the selected address poscode")
                    setTimeout(() => {
                        window.location.href = "/account/addresses/"
                    }, 3000);
                }
            
        }

        if (address.UserAddressBookID !== undefined && address.UserAddressBookID === 0) {
            // this.setState({ isDeliverySet: true })
            handleGetPostcode(0)
            setShippingFee(0)
            return { shipping: 0 }

        }
    }

    const handleProductWeight = (productData, poscodeData) => {
        let volumetricWeight = 0
        let actualWeight = 0

        if (this.props.orderHistory !== undefined) {
            for (let i = 0; i < productData.length; i++) {
                volumetricWeight = volumetricWeight + (((productData[i].ProductDimensionDeep * productData[i].ProductDimensionHeight * productData[i].ProductDimensionWidth) / 5000) * productData[i].ProductQuantity)
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

    const handleCalculation = (filteredPostcode, finalWeight) => {
        let shippingRate = dummyRate
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
            console.log("shippingCost", shippingCost)

            this.props.handleGetPostcode(shippingCost)
            setShippingFee(shippingCost)
            return { shipping: shippingCost }
        }
    }



    return { shipping: fee };
}
