import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// components
import EditIcon from '@mui/icons-material/Edit';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
    billing: PropTypes.object,
    onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ billing, onBackStep, shipping }) {
    const { UserAddressBookID, UserAddressName, UserAddressLine1, UserAddressLine2, UserCity, UserPoscode, UserState, UserContactNo, isDefaultAddress } = billing;
    const isDefault = isDefaultAddress === 1
    const fullAddress = UserAddressLine1 + " " + UserAddressLine2 + ", " + UserCity + ", " + UserState

    const checkDeliveryTime = (ODA) => {
        let duration = 0
        console.log("dsadsadsa", ODA)
        if (ODA !== undefined) {
            duration = ODA.split("+")[1]
        }
        return duration
    }

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                title="Billing Address"
                action={
                    <Button size="small" startIcon={<EditIcon />} onClick={onBackStep}>
                        Change
                    </Button>
                }
            />
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                    {billing?.UserAddressName}&nbsp;
                </Typography>

                <Typography variant="body2" gutterBottom>
                    {billing && fullAddress}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {billing?.UserContactNo}
                </Typography>
                {
                    shipping[0].NSA_ODA === "Non-Serviceable Area" && <Typography style={{ color: "red" }}>Selected area is Non-Serviceable Area. Parcel required to pick up in nearest post office. Detail will be update in parcel tracking</Typography>
                }
                {
                    shipping[0].NSA_ODA !== undefined && shipping[0].NSA_ODA !== "Non-Serviceable Area" && shipping[0].NSA_ODA !== "Normal Delivery" && <Typography style={{ color: "red" }}>Selected area will required longer delivery time - Extra {checkDeliveryTime(shipping[0].NSA_ODA)} days is required</Typography>
                }
                {shipping[0].ShippingCost === null && <Typography style={{ color: "red" }}>Please select valid delivery address</Typography>}

            </CardContent>
        </Card>
    );
}
