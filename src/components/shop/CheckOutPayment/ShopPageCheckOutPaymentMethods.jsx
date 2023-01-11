import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GitAction } from '../../../store/action/gitAction';
// @mui
import {
    Box,
    Card,
    Radio,
    Stack,
    Paper,
    Button,
    TextField,
    Typography,
    RadioGroup,
    CardHeader,
    CardContent,
    FormHelperText,
    FormControlLabel,
} from '@mui/material';
// components
// import Image from '../../../../../components/image';
// import Iconify from '../../../../../components/iconify';
import Image from '../../image/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import FPX from '../../../assets/fpx-logo2.png';
import MASTERCARD from '../../../assets/Mastercard-logo.svg.png';
import VISACARD from '../../../assets/Visa-Logo.png';
import axios from "axios";
import { toast } from "react-toastify";
// section

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
    // bankOptions: PropTypes.array,
};

export default function CheckoutPaymentMethods({ ...other }) {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let URL2 = "https://myemporia.my/payment/06_fpx_bankListRequest.php"
    //     const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    //     axios.post(URL2, {}, config).then((res) => {
    //         if (res.status === 200) {

    //             let bankFinalList = []
    //             let bankList = res.data.split('|')[0]
    //             bankList = bankList.split(',')
    //             bankList.length > 0 && bankList.map((bank) => {
    //                 this.state.allBankDetails.filter((x) => x.BankID === bank.split("~")[0]).map((x) => {
    //                     let bankListing = {
    //                         BankID: bank.split("~")[0],
    //                         BankStatus: bank.split("~")[1],
    //                         BankName: x.BankName,
    //                         BankType: x.BankType,
    //                         PaymentMethod: x.PaymentMethod,
    //                         PaymentMethodCharges: x.PaymentMethodCharges,
    //                         PaymentMethodDesc: x.PaymentMethodDesc,
    //                         PaymentMethodID: x.PaymentMethodID,
    //                         PaymentMethodImage: x.PaymentMethodImage,
    //                         TestingInd: x.TestingInd
    //                     }
    //                     bankFinalList.push(bankListing)
    //                 })
    //             })

    //             bankList.length > 0 && bankList.map((bank) => {
    //                 const listing = bankFinalList.filter((data) => data.BankID !== null && data.BankID.toLowerCase().includes(bank.split("~")[0].toLowerCase()))
    //                 if (listing.length === 0) {
    //                     let bankListing = {
    //                         BankID: bank.split("~")[0],
    //                         BankStatus: bank.split("~")[1],
    //                         BankName: bank.split("~")[0],
    //                         BankType: "B2C",
    //                         PaymentMethod: bank.split("~")[0],
    //                         PaymentMethodCharges: 1.2,
    //                         PaymentMethodDesc: "FPX",
    //                         PaymentMethodID: 59,
    //                         PaymentMethodImage: "",
    //                         TestingInd: 0
    //                     }
    //                     bankFinalList.push(bankListing)
    //                 }
    //             })

    //             bankFinalList.sort((a, b) => a.PaymentMethod.localeCompare(b.PaymentMethod));
    //             this.setState({ finalAllBankDetails: bankFinalList, BankID: "0" })
    //         }
    //     }).catch(e => {
    //         toast.error("There is something wrong for bank retrieve. Please try again.")
    //     })
    // }, []);


    // useEffect(() => {
    //     dispatch(GitAction.CallAllPaymentMethod());
    // }, []);
    // const paymentmethod = useSelector(state => ({ paymentmethod: state.counterReducer.paymentmethod }));

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const PAYMENT_OPTIONS = [
        {
            value: 1,
            title: 'Online Banking',
            description: 'You will be redirected to PayPal website to complete your purchase securely.',
            icons: [FPX],
        },
        {
            value: 2,
            title: 'Credit / Debit Card',
            description: 'We support Mastercard, Visa, Discover and Stripe.',
            icons: [MASTERCARD, VISACARD],
        }
    ];

    const defaultOption = PAYMENT_OPTIONS[0]
    const bankOptions = [
        { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
        { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
        { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
    ];




    return (
        <>
            <Card {...other}>
                <CardHeader title="Payment options" />

                <CardContent>
                    <RadioGroup row defaultValue={defaultOption ? defaultOption.value : 0}>
                        <Stack spacing={3} sx={{ width: 1 }}>
                            {PAYMENT_OPTIONS.map((option) => (
                                <PaymentOption
                                    key={option.title}
                                    option={option}
                                    bankOptions={bankOptions}
                                    hasChild={option.value === 1}
                                    isBankIn={
                                        option.value === 1}
                                    // isSelected={field.value === option.value}


                                    onOpen={handleOpen}
                                />
                            ))}
                        </Stack>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* <PaymentNewCardDialog open={open} onClose={handleClose} /> */}
        </>
    );
}

// ----------------------------------------------------------------------

PaymentOption.propTypes = {
    onOpen: PropTypes.func,
    hasChild: PropTypes.bool,
    option: PropTypes.object,
    isSelected: PropTypes.bool,
    bankOptions: PropTypes.array,
    isBankIn: PropTypes.bool,
};

function PaymentOption({ option, bankOptions, hasChild, isSelected, isBankIn, onOpen }) {
    const { value, title, icons, description } = option;

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                transition: (theme) => theme.transitions.create('all'),
                // ...(isSelected && {
                //     boxShadow: (theme) => theme.customShadows.z20,
                // }),
                ...(hasChild && {
                    flexWrap: 'wrap',
                }),
            }}
        >
            <FormControlLabel
                value={value}
                control={<Radio checkedIcon={<CheckCircleIcon />} />}
                label={
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </Box>
                }
                sx={{ py: 3, pl: 2.5, flexGrow: 1, mr: 0 }}
            />

            <Stack
                direction="row"
                spacing={1}
                flexShrink={0}
                sx={{
                    pr: 2.5,
                    display: {
                        xs: 'none',
                        sm: 'inline-flex',
                    },
                }}
            >
                {icons.map((icon) => (
                    <Image key={icon} disabledEffect alt="logo card" src={icon} sx={{ width: 37 }} />
                ))}
            </Stack>

            {isBankIn && (
                <Stack
                    alignItems="flex-start"
                    sx={{
                        px: 3,
                        width: 1,
                        my: 3
                    }}
                >
                    <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
                        {bankOptions.map((card) => (
                            <option key={card.value} value={card.value}>
                                {card.label}
                            </option>
                        ))}
                    </TextField>
                </Stack>
            )}
        </Paper>
    );
}
