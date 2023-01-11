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

export default function CheckoutBillingInfo({ billing, onBackStep }) {
    const { UserAddressBookID, UserAddressName, UserAddressLine1, UserAddressLine2, UserCity, UserPoscode, UserState, UserContactNo, isDefaultAddress } = billing;
    const isDefault = isDefaultAddress === 1
    const fullAddress = UserAddressLine1 + " " + UserAddressLine2 + ", " + UserCity + ", " + UserState

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
            </CardContent>
        </Card>
    );
}
