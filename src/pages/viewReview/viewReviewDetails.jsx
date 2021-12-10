import React, { PureComponent } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@material-ui/core/TextField";

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Rating from "@material-ui/lab/Rating";
import SendIcon from '@mui/icons-material/SendTwoTone';

import { Card, CardText, CardBody } from 'reactstrap'
import USER from "../../assets/user.jpg";

const ViewReviewDetails = (props) => {
    const {
        isOpen,
        handleOpen,
        handleComment,
        handleAddReview,
        handleOnChange,
        // handleInputFocus,
        state,
        data,
        // handleChangeCardType
    } = props

    let reviewListing = (reviewData) => {
        return (
            <div className="row">
                <div className="col-2">
                    <div id="review_avatar" className="review__avatar">
                        <img width="50px" height="65px" src={reviewData.avatar ? reviewData.avatar : USER} alt={reviewData.avatar} onError={(e) => (e.target.src = USER)} />
                    </div>
                </div>
                <div className="col-10">
                    <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                        <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{reviewData.Name}</div>
                        <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{reviewData.CreatedDate}</div>
                        <div id="review_comment" style={{ fontSize: "12px" }}>{reviewData.ProductReviewComment}</div>
                    </div>
                </div>
            </div>
        )
    }

    let ReplyReviewFormat = (reviewItem, index) => {
        //backgroundColor: "#778899" 
        return (
            <ListItem key={index} button style={{ borderBottom: '1px solid rgba(33, 33, 33, 0.3)', display: "inline-block" }} >
                <Card style={{ width: '80%', display: "block", float: "right", backgroundColor: "#D8D8D8" }}>
                    <CardBody style={{ padding: "0.5rem" }}>
                        <CardText>
                            {reviewListing(reviewItem)}
                        </CardText>
                    </CardBody>
                </Card>
            </ListItem>
        )
    }

    let userReviewFormat = (reviewItem, index) => {
        let checkReply = JSON.parse(state.ProductReviewDetail).filter((x) => x.replyParentID === reviewItem.ProductReviewID)
        return (
            <>
                <ListItem key={index} button style={{ borderBottom: '1px solid rgba(33, 33, 33, 0.3)' }} onClick={() => { handleComment(reviewItem) }}   >
                    <Card style={{ width: '100%' }}>
                        <CardBody style={{ padding: "0.5rem" }}>
                            <CardText>
                                {reviewListing(reviewItem)}
                            </CardText>
                        </CardBody>
                    </Card>
                </ListItem>
                {checkReply.length > 0 &&
                    checkReply.map((data) => {
                        return (ReplyReviewFormat(data, 0))
                    })
                }
            </>
        )
    }

    return (

        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={isOpen}
            onClose={() => handleOpen()}
        >
            <AppBar style={{ position: 'sticky', top: 0, backgroundColor: "#2b2b2b" }}>
                <Toolbar>
                    <Typography variant="h6" style={{ marginLeft: 2, flex: 1, }}>
                        {data.productName}
                    </Typography>
                    <IconButton color="inherit"
                        onClick={() => handleOpen()}>
                        <CloseIcon /></IconButton>
                </Toolbar>
            </AppBar>
            <List style={{ height: '100vh', overflowY: 'auto' }}>
                {state !== null ?
                    <>
                        <Card style={{ width: '100%' }} onClick={() => { handleComment(state) }} >
                            <CardBody style={{ padding: "0.5rem" }} >
                                <CardText>
                                    <div className="row">
                                        <div className="col-2">
                                            <div id="review_avatar" className="review__avatar">
                                                <img width="50px" height="65px" src={state.avatar ? state.avatar : USER} alt={state.avatar} onError={(e) => (e.target.src = USER)} />
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                                                <div id="review_author" className=" review__author" style={{ fontSize: "12px", fontWeight: "bold" }}>{state.Name}</div>
                                                <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{state.CreatedDate}</div>
                                                <div id="review_rating" className=" review__rating">
                                                    <Rating style={{ fontSize: "1rem" }} value={state.ProductReviewRating} />
                                                </div>
                                                <div id="review_comment">{state.ProductReviewComment}</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        {state.ProductReviewDetail !== null && state.ProductReviewDetail !== undefined &&
                            JSON.parse(state.ProductReviewDetail).map((reviewItem, index) => {
                                return (
                                    reviewItem.UserID === parseInt(localStorage.getItem("id")) && reviewItem.replyParentID === state.ProductReviewID &&
                                    ReplyReviewFormat(reviewItem, index)
                                )
                            })
                        }
                        {state.ProductReviewDetail !== null && state.ProductReviewDetail !== undefined &&
                            JSON.parse(state.ProductReviewDetail).map((reviewItem, index) => {
                                return (
                                    reviewItem.UserID !== parseInt(localStorage.getItem("id")) &&
                                    userReviewFormat(reviewItem, index)
                                )
                            })
                        }
                    </>
                    : ""
                }
            </List>

            <div className="container-fluid" style={{ position: 'sticky', bottom: 0, zIndex: 100, backgroundColor: '#2b2b2b', }}>
                <div className="row" style={{ padding: '10px 2px' }}>
                    {
                        data.selectedCommentReply !== [] && data.selectedCommentReply.length !== 0 &&
                        <div className='col-12' style={{ marginBottom: '10px' }}>
                            <div style={{ backgroundColor: "#fff", color: 'black', borderRadius: '3px', width: '98%', margin: 'auto', padding: "10px 15px" }}>
                                <div className="row">
                                    <div className="col-2" style={{ fontSize: "12px" }}>
                                        Reply To :
                                    </div>
                                    <div className="col-8">
                                        <div id="review_author" className=" review__author" style={{ fontSize: "14px", fontWeight: "bold" }}>{data.selectedCommentReply.Name}</div>
                                        <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                                            <div id="review_reply_date" className=" review__date" style={{ fontSize: "10px" }}>{data.selectedCommentReply.CreatedDate}</div>
                                            <div id="review_comment" style={{ fontSize: "12px" }}>{data.selectedCommentReply.ProductReviewComment}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="col-11">
                        <TextField
                            id="filled-textarea"
                            label="Multiline Placeholder"
                            placeholder="Placeholder"
                            multiline
                            variant="filled"
                            className="w-100"
                            style={{
                                background: '#fff',
                                borderRadius: '25px',
                                marginLeft: '15px',
                                padding: '6 px 8px'
                            }}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <div className="col-1">
                        <IconButton className="icon" disabled={data.replyComment !== "" && data.selectedCommentReply.length !== 0 ? false : true}>
                            <SendIcon style={{ color: "wheat" }} onClick={() => handleAddReview(data.selectedCommentReply, state.ProductReviewID)} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}

export default ViewReviewDetails