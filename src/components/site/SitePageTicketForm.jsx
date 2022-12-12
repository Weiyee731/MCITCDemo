// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { makeStyles } from '@mui/styles';
import { FormLabel, InputLabel, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const useStyles = makeStyles((theme) => ({
    form: {
            '& .MuiTextField-root': 
                {
                    margin: theme.spacing(1),
                    width: '25ch',
                },
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 700,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    buttonField: {
        display: "flex",
        textAlign: "right",
    }
}));

function SitePageTicketForm() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Terms And Conditions', url: '' },
    ];

    const classes = useStyles();
    const [feedback, setType] = React.useState('');
    const [desciption, setDescription] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Terms And Conditions — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">Feedback Form/Create New Report</h1>
                        </div>
                        
                        <div className="document__content typography">
                            <form className={classes.form}>
                                {/* <FormLabel>Feedback type</FormLabel> */}
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="select-feedback-type">Feedback Type</InputLabel>
                                    <Select
                                            labelId="select-feedback-type"
                                            id="select-feedback-type"
                                            value={feedback}
                                            onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Account Problem</MenuItem>
                                        <MenuItem value={2}>Data Privacy</MenuItem>
                                        <MenuItem value={3}>MCITC Community Policies</MenuItem>
                                        <MenuItem value={4}>Products on MCITC</MenuItem>
                                        <MenuItem value={5}>Payments</MenuItem>
                                        <MenuItem value={6}>Shipping & Delivery</MenuItem>
                                        <MenuItem value={7}>Refunds & Returns</MenuItem>
                                        <MenuItem value={8}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="outlined-basic" label="Personal Details" variant="outlined" className={classes.formControl}/>
                                <TextField id="outlined-basic" label="Subject" variant="outlined" className={classes.formControl}/>
                                <TextField id="outlined-multiline-description" label="Description" multiline rowsMax={4} value={desciption} onChange={handleDescription} variant="outlined" className={classes.formControl}/>
                                <Button variant="outlined" className={classes.formControl}>Browse...</Button>

                                <Typography>Fill in all (*) to enable Browse button. Maximum upload file size : 50MB</Typography>
                                <hr style={{
                                                width:"100%",
                                                textAlign:"left",
                                                marginLeft:"0",
                                            }}
                                />
                                <Typography>Thank you for your patience. This form will be closed after the saving process done.Don't click any button.</Typography>
                                
                                <div className="classes.buttonField">
                                    <Button style={{float: 'right'}} variant="outlined">Create Report</Button>
                                    <Button style={{float: 'right', margin: '0 1%'}} variant="outlined">Back</Button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SitePageTicketForm;
