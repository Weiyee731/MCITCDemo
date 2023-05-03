// react
import React from 'react';
// import React, { useEffect, useState } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import Fab from '@mui/material/Fab';
// import Popup from 'reactjs-popup';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import aboutUsImage from "./aboutUsImage.jpg";
import Search from '../header/Search';
// import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider,createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const FAB = () => (
    <></>
    // <Popup 
    //     trigger={
    //     <Fab className="button" ><span class="material-icons">contact_support</span></Fab>
    //     }
    //     position="top center"
    //     on="hover"
    //     closeOnDocumentClick
    // >
    //     <Link to="/site/contact-us">
    //     <button class="fabbtn1">
    //         <span class="material-icons">call</span>
    //     </button>
    //     </Link>
    //     <Link to="/">
    //     <button class="fabbtn2">
    //         <span class="material-icons">confirmation_number</span>
    //     </button>
    //     </Link>
    //     <a href="http://mail.google.com" target="_blank">
    //     <button class="fabbtn3">
    //         <span class="material-icons">email</span>
    //     </button>
    //     </a>
    // </Popup>
);

const detailStyle = {
    background: 'aliceblue',
    borderRadius: '10px 10px 10px 10px',
}

const accordionArrangement = {
    display: 'flex',
    flexDirection: 'row-reverse'
}

const myTheme = createTheme({
    styleOverrides: {
        MuiExpansionPanelSummary: {
            root: {
                minHeight: "0px",
                minWidth: "0px",
                "&$expanded": {
                    //Elevation 1
                    boxShadow:
                        "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
                    minHeight: "0px",
                    backgroundColor: "#3f51b5",
                    color: "red",
                    "& .MuiExpansionPanelSummary-expandIcon": {
                        color: "red"
                    }
                },
                ".MuiExpansionPanelDetails-root &$expanded": {
                    backgroundColor: "transparent",
                    color: "black",
                    "& .MuiExpansionPanelSummary-expandIcon": {
                        color: defaultTheme.palette.action.active
                    }
                }
            }
        }
    }
});

function SitePageFaq() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Frequently Asked Questions', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>
            {/* <div style={{ background: "white", height: "350px" }}> */}
            <PageHeader header="Frequently Asked Questions" breadcrumb={breadcrumb} />
            {/* <div className="container">
                    <h1 style={searchTitle}>Hi, how can I help you?</h1>
                    <div className="site-header__search" style={{ margin: "-30px 16px" }}>
                        <Search context="header" style={{ borderRadius: "10px" }} />
                    </div>
                </div>
            </div> */}



            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                            <Typography variant='h6' style={{ fontSize: "28px", fontWeight: 700 }} >Shipping Information</Typography>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div>
                                    <ThemeProvider theme={myTheme}>
                                        <Accordion disableGutters elevation={2} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={accordionArrangement}
                                                disableGutters={false}
                                            >
                                                <Typography variant='subtitle1'>How Do I Claim For Lost and Damaged Under Certain Express?</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={detailStyle}>
                                                <Typography>
                                                    For lost or damaged parcels,All Express will compensate the parcel's value amount
                                                    <br />
                                                    i) <u>Lost Parcel Claims Process</u>
                                                    <ul>
                                                        <li>Ensure parcel does not exceed 30 calendar days from the date that the Express has accepted the shipment.</li>
                                                        <li>Provide supporting documents such as pick up receipt or manifest as proof of shipment.</li>
                                                        <li>Send the supporting documnts to MCITC Customer Service</li>
                                                    </ul>
                                                    <br />
                                                    ii) <u>Damaged parcel claims process</u>
                                                    <ul>
                                                        <li>Must raise the claim within 5 calendar days from the date of parcel received.</li>
                                                        <li>Provide supporting document (Order details page) as a proof and image of damaged parcel.</li>
                                                        <li>Send the supporting documents to MCITC Customer Service</li>
                                                    </ul>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </ThemeProvider>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                            style={accordionArrangement}
                                        >
                                            <Typography variant='subtitle1'>What shipping methods are available?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                We are provided these shipping methods
                                                <ul>
                                                    <li>AIR (Air Freight)</li>
                                                    <li>POS </li>
                                                </ul>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                            style={accordionArrangement}
                                        >
                                            <Typography variant='subtitle1'>How To Check Where Is My Order? What Is My Order's Shipping Status Mean?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                You can check your parcel detail at profile tab and check for the order history
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                            style={accordionArrangement}
                                        >
                                            <Typography variant='subtitle1'>How Long Will It Take To Deliver My Parcel Using different Express?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                MCITC will deliver your parcels within 3 working days adter the parcel is shipped by the seller.
                                                Please allow some time for the tracking status to be updated throught Express website
                                                <br />
                                                You may check with MCITC Customer Service for redelivery if your parcel experienced failed delivery.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq__section">
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                                        <Typography variant='h6' style={{ fontSize: "28px", fontWeight: 700 }} >Payment Information</Typography>
                                    </div>
                                    <div>
                                        <Accordion disableGutters elevation={2}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={accordionArrangement}
                                            >
                                                <Typography variant='subtitle1'>What Payment Methods Are Available?</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={detailStyle}>
                                                <Typography>
                                                    We are provided these payment methods
                                                    <ul>
                                                        {/* <li>E-Wallet</li> */}
                                                        <li>Credit / Debit Card</li>
                                                        <li>Online Banking</li>
                                                    </ul>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion disableGutters elevation={2}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={accordionArrangement}
                                            >
                                                <Typography variant='subtitle1'>What should I do if I made double payment?</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={detailStyle}>
                                                <Typography>
                                                    In the event you have been issued double payment for a single amount owed, you may refer to the steps below in resolving this issue for the following payment methods:
                                                    <br />
                                                    <br />
                                                    <u>Credit / Debit Card</u>
                                                    <br />
                                                    your payment will be released as credit note in 7-14 working days. <br /> <Typography variant='caption'>*T&C apply</Typography>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                                        <Typography variant='h6' style={{ fontSize: "28px", fontWeight: 700 }} >Refunds and Returns</Typography>
                                    </div>
                                    <div>
                                        <Accordion disableGutters elevation={2}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={accordionArrangement}
                                            >
                                                <Typography variant='subtitle1'>When Will I Receive My Refund?</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={detailStyle}>
                                                <Typography>
                                                    If you pay for your order using one of the following methods, your payment will be released as credit note in 7-14 working days.
                                                    <br />
                                                    <Typography variant='caption'>*T&C apply</Typography>
                                                    <br />
                                                    1) Online Banking <br />
                                                    2) Credit Card <br />
                                                    3) Debit card
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion disableGutters elevation={2}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon style={{ marginRight: "10px", marginLeft: "10px" }} />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                style={accordionArrangement}
                                            >
                                                <Typography variant='subtitle1'>When And How Can I Apply For A Refund and Return?</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={detailStyle}>
                                                <Typography>
                                                    If your order is still under "To Receive" tab, please proceed to request for return/refund if you:
                                                    <ul>
                                                        <li> 1) Did not receive the order</li>
                                                        <li> 2) Received an incomplete product (missing quantity or accessories)</li>
                                                        <li> 3) Received the wrong product(s) (e.g. wrong size, wrong colour, different product)</li>
                                                        <li> 4) Received a product with physical damage (e.g. dented, scratched, broken)</li>
                                                        <li> 5) Received a faulty product (e.g. malfunction, does not work as intended)</li>
                                                    </ul>

                                                    Send the supporting documents to MCITC Customer Service
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floatfab">
                <FAB></FAB>
            </div>
        </React.Fragment>
    );
}

export default SitePageFaq;
