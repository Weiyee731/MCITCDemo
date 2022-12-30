// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const detailStyle = {
    background: 'aliceblue',
    borderRadius: '10px 10px 10px 10px',
}

function SitePageShippingDelivery() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Shipping & Delivery', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`FAQ — ${theme.name}`}</title>
            </Helmet>
            <PageHeader header="Shipping n Delivery" breadcrumb={breadcrumb} />
            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                            <Typography variant='h6' style={{ fontSize: "28px", fontWeight: 700 }} >Shipping Information</Typography>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
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
                                                    <li>Send the supporting documnts to MyEmporia Customer Service</li>
                                                </ul>
                                                <br />
                                                ii) <u>Damaged parcel claims process</u>
                                                <ul>
                                                    <li>Must raise the claim within 5 calendar days from the date of parcel received.</li>
                                                    <li>Provide supporting document (Order details page) as a proof and image of damaged parcel.</li>
                                                    <li>Send the supporting documents to MyEmporia Customer Service</li>
                                                </ul>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
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
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
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
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3a-content"
                                            id="panel3a-header"
                                        >
                                            <Typography variant='subtitle1'>How Long Will It Take To Deliver My Parcel Using different Express?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                MyEmporia will deliver your parcels within 3 working days adter the parcel is shipped by the seller.
                                                Please allow some time for the tracking status to be updated throught Express website
                                                <br />
                                                You may check with MyEmporia Customer Service for redelivery if your parcel experienced failed delivery.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq__section">
                        <div className="faq__section-title" style={{ display: 'flex', justifyContent: "center", }}>
                            <Typography variant='h6' style={{ fontSize: "28px", fontWeight: 700 }} >Delivery Information</Typography>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant='subtitle1'>How do i ensure i get my online purchases during the Conditional Movement Control Order(CMCO) and Targeted Enchanced MOvement Control Order(TEMCO)?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                As our courier partners are operating as usual during this period, they will do their best to ensure
                                                your packages are delivered even if the Office address is in the CMCO/TEMCO area. In the event the courier
                                                fails to deliver the package to you or a trusted recipient (i.e. office receptionist or security),
                                                the package will be marked as.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters elevation={2}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant='subtitle1'>I have a received a damaged / a defective / an incorrect item, what should i do?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={detailStyle}>
                                            <Typography>
                                                <u>Damaged Item</u>
                                                <br />
                                                If your item is damaged, you may return it and it should be done as soon as possible in order to be refunded.
                                                To return your damaged item, you may do so by submitting a form under certain conditions
                                                <br />
                                                <u>Incorrect Item</u>
                                                <br />
                                                A product that does not match your order description falls under incorrect item category.
                                                For example, you ordered a chocolate milk for 1L but you ended up receiving a strawberry milk for 1L.
                                                Hence the next step would be return and refund request.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageShippingDelivery;
