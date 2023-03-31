// react
import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../../store/action/gitAction";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { url } from "../../../services/utils";

// application
import {Grid, Typography, Stack, Checkbox, TextField, Button, IconButton, Paper, Card} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CheckoutPaymentMethods from './ShopPageCheckOutPaymentMethods';
import CheckoutPaymentMethods from "../../shop/CheckOutPayment/ShopPageCheckOutPaymentMethods";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import CheckIcon from '@mui/icons-material/Check';
import { Info } from "@mui/icons-material";

function HotelBooking_1(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const steps = [
        'Accomodaton Selection',
        'Your Info',
        'Final Step',
      ];

    var CryptoJS = require("crypto-js");

    const [country, setCountry] = React.useState('Malaysia');
    const [PaymentType, setPaymentType] = React.useState("1");
    const [BankID, setBankID] = React.useState("0");
    const [paidStat, setPaidStat] = React.useState(false);

    const handleChange = (e) => {
        setCountry(e.target.value);
    };

    const [fpx_information, setfpx_information] = useState({
        fpx_msgType: "AR",
        fpx_msgToken: "01",
        // fpx_sellerExId: "EX00013776",
        fpx_sellerExId: "EX00012067", // live FPX
        fpx_sellerExOrderNo: "",
        fpx_sellerTxnTime: "",
        fpx_sellerOrderNo: "",
        // fpx_sellerId: "SE00015397",
        fpx_sellerId: "SE00055564",  // live FPX
        fpx_sellerBankCode: "01",
        fpx_txnCurrency: "MYR",
        fpx_txnAmount: "",
        fpx_buyerEmail: "",
        fpx_buyerName: "",

        fpx_buyerBankBranch: "",
        fpx_buyerAccNo: "",
        fpx_buyerId: "",
        fpx_makerName: "",
        fpx_buyerIban: "",
        fpx_productDesc: "Emporia Hardware",
        fpx_version: "6.0",

        fpx_checkSum: 0,
        fpx_buyerBankId: 0,
        fpx_sellerExOrderNo: 0,
        fpx_sellerTxnTime: 0,
        fpx_sellerOrderNo: 0
    })

    const [paymentData, setpaymentData] = useState({
        access_key: "",
        profile_id: "",
        transaction_uuid: "",
        signed_date_time: "",
        locale: "",
        transaction_type: "",
        reference_number: "",
        amount: "",

        currency: "",
        bill_to_surname: "",
        bill_to_forename: "",

        bill_to_email: "",
        bill_to_address_line1: "",
        bill_to_address_city: "",

        bill_to_address_postal_code: "",
        bill_to_address_state: "",
        bill_to_address_country: "",
        signature: "",
        signed_field_names: "",


        totalPrice: "",
        PickUpIndicator: "",
        time: "",

        lastname: "",
        firstname: "",
        email: "",
        addressLine1: "",
        city: "",
        state: "",
        poscode: "",
        now: "",

    })


    const [activeStep, setActiveStep] = React.useState(1);

    const [goPayment, setGoPayment] = React.useState(false);

    const dummyHotelRoom_data = [
        { RoomID:0,
          RoomName: 'Standard Suite',
          Price:280.00,
          HotelID:0,
          Bed:[{BedCategoryID:0, BedCat_Name:"Queen Bed"}],
          RoomImages:[
            {ImageID:0, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37434884.jpg'},
            {ImageID:1, ImageURL:'https://www.timing-design.com/food/ranee1.jpg'},
            {ImageID:2, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg'},
            {ImageID:3, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg'},
          ],
          FreeCancellation_Stat: true,
          Advance_Pay: true,
          Breakfast_Included: false,
          AvailableRoom_Qty: 2,
          Facilities:[
          {
            AmenityID:0,
            AmenityName:'Bath/ Shower',
          },
          {
            AmenityID:1,
            AmenityName: 'Hairdryer',
          },
          {
            AmenityID:2,
            AmenityName:'Fan',
          },
          {
            AmenityID:3,
            AmenityName:'Towel',
          },
          {
            AmenityID:4,
            AmenityName:'Refrigerator',
          },
        ],
        Capacity:2,
        },
         
        { RoomID:1,
            RoomName: 'Deluxe Junior Suite',
            Price: 380.00,
            HotelID:2,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
              {
                AmenityID:0,
                AmenityName:'Bath/ Shower',
              },
              {
                AmenityID:1,
                AmenityName: 'Hairdryer',
              },
              {
                AmenityID:2,
                AmenityName:'Fan',
              },
              {
                AmenityID:3,
                AmenityName:'Towel',
              },
              {
                AmenityID:4,
                AmenityName:'Refrigerator',
              },
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          },
  
          { RoomID:1,
            RoomName: 'Executive King Suite',
            Price: 380.00,
            HotelID:4,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
              {
                AmenityID:0,
                AmenityName:'Bath/ Shower',
              },
              {
                AmenityID:1,
                AmenityName: 'Hairdryer',
              },
              {
                AmenityID:2,
                AmenityName:'Fan',
              },
              {
                AmenityID:3,
                AmenityName:'Towel',
              },
              {
                AmenityID:4,
                AmenityName:'Refrigerator',
              },
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          },
  
  
        { RoomID:1,
          RoomName: 'Deluxe King Suite',
          Price: 380.00,
          HotelID:1,
          Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
          RoomImages:[
            {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
            {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
            {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
            {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
          ],
          FreeCancellation_Stat: true,
          Advance_Pay: true,
          Breakfast_Included: false,
          AvailableRoom_Qty: 2,
          Facilities:[
            {
              AmenityID:0,
              AmenityName:'Bath/ Shower',
            },
            {
              AmenityID:1,
              AmenityName: 'Hairdryer',
            },
            {
              AmenityID:2,
              AmenityName:'Fan',
            },
            {
              AmenityID:3,
              AmenityName:'Towel',
            },
            {
              AmenityID:4,
              AmenityName:'Refrigerator',
            },
            {
              AmenityID:5,
              AmenityName:'Wardrobe',
            },
            {
              AmenityID:6,
              AmenityName:'Bathtub',
            },
            {
              AmenityID:7,
              AmenityName:'Coffee Maker',
            },
          ],
        Capacity:2,
        },
         
        { RoomID:1,
            RoomName: 'Deluxe Queen Suite',
            Price: 380.00,
            HotelID:3,
            Bed:[{BedCategoryID:1, BedCat_Name:"King Bed"}],
            RoomImages:[
              {ImageID:4, ImageURL:'https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg'},
              {ImageID:5, ImageURL:'https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg'},
              {ImageID:6, ImageURL:'https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg'},
              {ImageID:7, ImageURL:'https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg'},
            ],
            FreeCancellation_Stat: true,
            Advance_Pay: true,
            Breakfast_Included: false,
            AvailableRoom_Qty: 2,
            Facilities:[
              {
                AmenityID:0,
                AmenityName:'Bath/ Shower',
              },
              {
                AmenityID:1,
                AmenityName: 'Hairdryer',
              },
              {
                AmenityID:2,
                AmenityName:'Fan',
              },
              {
                AmenityID:3,
                AmenityName:'Towel',
              },
              {
                AmenityID:4,
                AmenityName:'Refrigerator',
              },
              {
                AmenityID:5,
                AmenityName:'Wardrobe',
              },
              {
                AmenityID:6,
                AmenityName:'Bathtub',
              },
              {
                AmenityID:7,
                AmenityName:'Coffee Maker',
              },
            ],
          Capacity:2,
          }
      ]

      const render_Step2 = () => {
        return(
            <Grid item xs={12} sm={12} style={{margin:'2%', paddingLeft:'8%', paddingRight:'4%'}}>
            <Grid item container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Grid item container spacing={1} style={{padding:"5%", border:'1px solid #E6E3DD', borderRadius:'2%'}}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h7" >Your booking summary</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                                <div>
                                    <Typography variant="body2">Check In</Typography>
                                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Wednesday, 19 April 2023</Typography>
                                </div>
                                <div>
                                    <Typography variant="body2">Check Out</Typography>
                                    <Typography variant="subtitle1" style={{fontWeight:"bold"}}>Thursday, 20 April 2023</Typography>
                                </div>
                            </Stack>
                            </Grid>
                       
                            <Grid item xs={12} sm={12}>
                                <Typography variant="body2">Stay Duration</Typography>
                                <Typography variant="subtitle1" style={{fontWeight:"bold"}}>1 Night</Typography>
                            </Grid>
                           
                           <Grid item xs={12} sm={12}>
                                <Typography variant="body2">You selected</Typography>
                                <Typography variant="subtitle1" style={{fontWeight:"bold", marginBottom:"4%"}}>Deluxe King Room</Typography>
                                <Link style={{textDecoration:"underline", color: 'blue'}}>Change Room</Link>
                           </Grid>

                           <Grid item xs={12} sm={12}>
                                <Typography variant="h7" >Purchase Summary</Typography>
                                <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography>Deluxe King Room</Typography>
                                    <Typography variant="h6" style={{fontWeight:'bold'}}>MYR 380.00</Typography>
                                </Stack>
                                <Typography variant="subtitle2" style={{marginTop:"2%"}}>
                                A tourism tax of RM 10 per room per night applies to all foreign guests. This tax isn't included in the room rate and must be paid upon check-in. Guests who are Malaysian nationals or permanent residents of Malaysia (hold a MyPR card) are exempted.
                                </Typography>

                                <Typography variant="body2" style={{marginTop:"3%"}}>Excluded charges</Typography>
                                <Stack direction="row" spacing={2} style={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography>VAT</Typography>
                                    <Typography variant="subtitle1" style={{fontWeight:'bold'}}>MYR 8.86</Typography>
                                </Stack>

                           </Grid>

                           <Grid item xs={12} sm={12} style={{border:'1px solid #E6E3DD', padding:'2%', marginTop:'3%'}}>
                                <Typography variant="h7">How much it cost to cancel?</Typography>
                                <Typography style={{color:'green'}}>Free cancellation until 23:59 on 18 Apr</Typography>
                                <Stack direction="row" style={{display:"flex", flexDirection:'row', justifyContent:"space-between"}}>
                                    <Typography >From 00:00 on 18 Apr </Typography>
                                    <Typography >MYR 153</Typography>
                                </Stack>
                                
                           </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Grid item container spacing={1} style={{ padding:"2%",border:'1px solid #E6E3DD', borderRadius:'9px'}}>
                            <Grid item xs={12} sm={12} style={{marginTop:"2%"}}>
                                <Typography variant="h7" >Fill in your details</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:"2%"}}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Fullname"
                                defaultValue="Amanda Lin"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:"2%"}}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Contact No"
                                defaultValue="013-6663772"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{marginTop:"2%"}}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue="Amanda77@gmail.com"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} style={{marginTop:"2%"}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={country}
                                    label="Country"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={'Malaysia'}>Malaysia</MenuItem>
                                    <MenuItem value={'Indonesia'}>Indonesia</MenuItem>
                                    <MenuItem value={'Brunei'}>Brunei</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:"2%"}}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" style={{color:"black"}}>Are you booking for someone else?</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="No"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} style={{marginTop:"2%"}}>
                                <Stack direction="row" spacing={3} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography variant="h7">Guest</Typography>
                                        <IconButton color="success"><AddCircleIcon/></IconButton>
                                        <Typography variant="subtitle1">5</Typography>
                                        <IconButton ><RemoveCircleIcon/></IconButton>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={12} style={{marginTop:'2%'}}>
                                <Stack direction='row' spacing={2} >
                                    <AccessTimeIcon color="success"/>
                                    <Typography variant="h7">Your room will be ready for check-in between 14:00 and 22:00</Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={12} style={{marginTop:"2%"}}>
                                <Typography variant="body1">By proceeding with this booking, I agree to MyEmporia’s Terms of Use and Privacy Policy.</Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} style={{marginTop:"3%", display:'flex', flexDirection:'row', justifyContent:"center"}}>
                                <Button variant="contained" color="primary" onClick={() => setGoPayment(true)}>Final Step</Button>
                            </Grid>
                            
                        </Grid>
                    </Grid>
            </Grid>
    </Grid>
        )
      }

      const handlePaymentTypes = (type) => {
        // type==1 , bankin // type==2 , creditcard
        setPaymentType(type);
        if (type === "2") {
            // const APIKey = "f783628784ec4418af60cd35a0825d7348e554e1b51d4904a3f724e7cc089a64017e565d08d34592ae97a223a0ffa5ed430d202f43454968897b9cddcb604ee2316f500b3cd24cba9cb44b54a1ca43d3bdf35062728945b28b5144f4a6f22bffc43072e5a41c456c9d0ba003c81ad4097c65c2fa2aa147fb9d72bdb336df288e"
            // live credit card
            const APIKey = "2c57e2f0161a450ebe5fb67ffbdd51fc196b0256ed1940158f54990b57f4ec3c1e08823fa84c4596bea898bb2b53e6d124414d118b954914806c182092123d4008ba628a8eaf403faa7e3c1adb470ee9d6044313451442d2acd532b47d42e00a2fdecfa996334065a94e0d46d32b7534b3fb4016198047568afd83c99823f6ed"

            // let access_key = "fb2033f6e3fe3bb29fa96ebc01c911ae"
            // let profile_id = "FCC3E6E0-639C-4A4E-B58B-9C759897778F"
            let access_key = "51f40be210ff34cba0079b19efd3ab42";  //live credit card,
            let profile_id = "0CE666B6-7064-4D68-9DFE-EC46776C02A4";  //live credit card
            let transaction_uuid = paymentData.time + '123';
            let signed_date_time = paymentData.now;
            let locale = "en";
            let transaction_type = "sale";
            let reference_number = paymentData.time;
            // let amount = paymentData.totalPrice;

            let amount = 0
            let currency = "MYR";
            let bill_to_surname = paymentData.lastname;
            let bill_to_forename = paymentData.firstname;
            let bill_to_email = paymentData.email;
            let bill_to_address_line1 = paymentData.addressLine1;
            let bill_to_address_city = paymentData.city;
            let bill_to_address_postal_code = paymentData.poscode;
            let bill_to_address_state = paymentData.state;
            let bill_to_address_country = "MY";
            let signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_surname,bill_to_forename,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country";
            let signature = "access_key=" + access_key + ",profile_id=" + profile_id + ",transaction_uuid=" + transaction_uuid + ",signed_field_names=" + signed_field_names + ",signed_date_time=" + signed_date_time + ",locale=" + locale + ",transaction_type=sale,reference_number=" + reference_number + ",amount=" + amount + ",currency=" + currency + ",bill_to_surname=" + bill_to_surname + ",bill_to_forename=" + bill_to_forename + ",bill_to_email=" + bill_to_email + ",bill_to_address_line1=" + bill_to_address_line1 + ",bill_to_address_city=" + bill_to_address_city + ",bill_to_address_postal_code=" + bill_to_address_postal_code + ",bill_to_address_state=" + bill_to_address_state + ",bill_to_address_country=" + bill_to_address_country;

            let hash = CryptoJS.HmacSHA256(signature, APIKey);
            var base64EncodedHmac = hash.toString(CryptoJS.enc.Base64);

            setpaymentData({
                ...paymentData,
                access_key: access_key,
                profile_id: profile_id,
                transaction_uuid: transaction_uuid,
                signed_date_time: signed_date_time,
                locale: locale,
                transaction_type: transaction_type,
                reference_number: reference_number,
                amount: amount,
                currency: currency,
                bill_to_surname: bill_to_surname,
                bill_to_forename: bill_to_forename,
                bill_to_email: bill_to_email,
                bill_to_address_line1: bill_to_address_line1,
                bill_to_address_city: bill_to_address_city,
                bill_to_address_postal_code: bill_to_address_postal_code,
                bill_to_address_state: bill_to_address_state,
                bill_to_address_country: "MY",
                signed_field_names: signed_field_names,
                signature: signature,
                signed: base64EncodedHmac,
                deliveryPrice: 0
            })
        }
    }

    const handleBanking = (bankid) => {
        let date = moment(new Date()).format("YYYYMMDDHHmmss").toString()
        let fpx_sellerExOrderNo = date
        let fpx_sellerTxnTime = date
        let fpx_sellerOrderNo = date

        let bankingdata = fpx_information.fpx_buyerAccNo + "|" + fpx_information.fpx_buyerBankBranch + "|" + bankid + "|" + fpx_information.fpx_buyerEmail + "|" + fpx_information.fpx_buyerIban + "|" + fpx_information.fpx_buyerId + "|" + fpx_information.fpx_buyerName + "|" + fpx_information.fpx_makerName + "|" + fpx_information.fpx_msgToken + "|" + fpx_information.fpx_msgType + "|" + fpx_information.fpx_productDesc + "|" + fpx_information.fpx_sellerBankCode + "|" + fpx_information.fpx_sellerExId + "|" + fpx_sellerExOrderNo + "|" + fpx_information.fpx_sellerId + "|" + fpx_sellerOrderNo + "|" + fpx_sellerTxnTime + "|" + parseFloat(fpx_information.fpx_txnAmount).toFixed(2) + "|" + fpx_information.fpx_txnCurrency + "|" + fpx_information.fpx_version
        let URL = "https://myemporia.my/payment/check.php"
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append("bankingdata", bankingdata);
        axios.post(URL, formData, config).then((res) => {

            if (res.status === 200) {
                setfpx_information({
                    ...fpx_information,
                    fpx_checkSum: res.data,
                    fpx_buyerBankId: bankid,
                    fpx_sellerExOrderNo: fpx_sellerExOrderNo,
                    fpx_sellerTxnTime: fpx_sellerTxnTime,
                    fpx_sellerOrderNo: fpx_sellerOrderNo
                })
            }
            else {
                toast.error("There is something wrong with uploading images. Please try again.")
            }
        }).catch(e => {
            toast.error("There is something wrong with uploading images. Please try again.")
        })
        setBankID(bankid)
    }

    
    const render_PaymentPage = () => {
            return(

                <CheckoutPaymentMethods sx={{ my: 3 }}
                onSelectPaymentTypes={handlePaymentTypes}
                onSelectBank={handleBanking}
                />
            )
    }

    const click_BookNow = () => {
        setActiveStep(2)
        setPaidStat(true)
    }

    const info =[
      {
      infoName:'Room Charge',
      infoValue: 'MYR 380'
      },
  
  ]
    return (

      <Grid item container style={{ padding:'4%'}} >
        <Grid item xs={12} sm={12} style={{paddingLeft:'8%', paddingRight:'4%'}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Grid>
        
        {activeStep === 1 && 
         goPayment === false ?
         render_Step2()
         :
         goPayment === true && paidStat === false ?
         <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={3}>
                    {render_PaymentPage()}
                    <Button variant="contained" color="primary" onClick={() => click_BookNow()}>Book Now</Button>
                </Stack>
               
            </Grid>
         </Grid>
         :
        //  <Grid item xs={12} sm={12} style={{marginTop:'2%'}}>
         <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'2%'}}>
            <Grid item xs={12} sm={6} >
                <Grid item container spacing={2} >
                    <Grid item xs={12} sm={12} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <Stack direction="row" spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <CheckIcon fontSize="large" color="success"/>
                            <Typography variant="h5" style={{textAlign:'center'}}>Booking Complete</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'2%'}}>
                            <Typography variant="body1">We've sent confirmation email and invoice</Typography>
                            <Typography variant="subtitle2" > Amanda77@gmail.com</Typography>
                        </Stack>
                        <Typography variant="subtitle1">Order Number #GTHYS23</Typography>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Paper style={{padding:'2%'}}>
                            <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Hilton Hotel</Typography>
                                    <Typography variant="body1">Deluxe King Suite</Typography>
                                    <Stack direction="row" spacing={2} style={{marginTop:'4%'}}>
                                        <Typography variant="subtitle2">Check In: Wednesday, 29 April 2023 - 15:00 PM</Typography>
                                        <Typography variant="subtitle2">Check Out: Wednesday, 30 April 2023 - 12:00 PM</Typography>
                                    </Stack>
                                    <Typography variant="subtitle2" style={{marginTop:'4%'}}>Duration: 1 Night</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <img src="https://i.travelapi.com/lodging/1000000/20000/18900/18804/f08dc4b5_z.jpg" style={{width:'100%', height:'100%'}}/>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  {info.map((x)=>(
                                   <Grid item container spacing={2} style={{display:'flex', flexDirection:"row", justifyContent:'space-around'}}>
                                      <Grid item xs={6} sm={6}>
                                          <Typography>{x.infoName}</Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={6} >
                                          <Typography>{x.infoValue}</Typography>
                                      </Grid>
                                   </Grid>
                                   ))}
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                
                                   <Grid item container spacing={2} style={{display:'flex', flexDirection:"row", justifyContent:'space-around'}}>
                                      <Grid item xs={6} sm={6}>
                                          <Typography variant="h6">Total</Typography>
                                      </Grid>
                                      <Grid item xs={6} sm={6} >
                                          <Typography variant="h6">MYR 380.00</Typography>
                                      </Grid>
                                   </Grid>
                                
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                
            </Grid>
          
         </Grid>
        //  </Grid>
        }
        </Grid>
      
    );
  
  
  }
  
  HotelBooking_1.propTypes = {
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf([
      "grid-sm",
      "grid-nl",
      "grid-lg",
      "list",
      "horizontal",
    ]),
  };
  
  
  const mapStateToProps = (state) => ({
 
   
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelBooking_1);