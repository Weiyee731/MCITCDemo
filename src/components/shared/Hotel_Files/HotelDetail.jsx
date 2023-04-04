// react
import React, { Component, memo } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { url } from "../../../services/utils";

// application
import Grid from "@mui/material/Grid";
import InputNumber from "../InputNumber";
import ProductGallery from "../ProductGallery";
import Rating from "../Rating";
import { HashLink } from "react-router-hash-link";
import { GitAction } from "../../../store/action/gitAction";
import Logo from "../../../assets/Emporia.png"
import ProductSkeleton from "../ProductSkeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Typography, Card, Stack} from "@mui/material";
import Chip from '@mui/material/Chip';
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from "@mui/material/TextField";
import HotelSearchForm from "../../blocks/HotelSearchForm";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions } from '@mui/material';
import { Wishlist16Svg } from "../../../svg";

class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedButtonValue: 'Info',
          buttonValue: ['Info', 'Photos', 'Reviews'],
          ratingCategories: [{cat:'Rooms', rate:4.0}, {cat:'Cleanliness', rate:4.0}, {cat:'Services', rate:4.0}, {cat:'Value for Money', rate:4.0}, {cat:'Comfort', rate:4.5}, {cat:'Facilities', rate:4.0}, {cat:'Food', rate:4.3}],
          dummyDataComment:[
            {
                commentID:0,
                comment:'The hotel was comfortable and nice', //limit 50 words.
                Username: 'Jenny',
            },
            {
                commentID:1,
                comment:'The bathroom is so spacious', //limit 50 words.
                Username: 'Ahmed',
            },
            {
                commentID:2,
                comment:'Fantastic. Will come again next time.', //limit 50 words.
                Username: 'Mikaela',
            },
            {
                commentID:3,
                comment:'Overall is good. But may improves the services on check in and check out which time consuming', //limit 50 words.
                Username: 'Mikaela',
            },
        ]

        };

    }

    componentWillUnmount() {
  
    }

    componentDidMount() {
       
    }

    componentDidUpdate(props) {
       
    }

    handleChange = (newValue) => {
        this.setState({selectedButtonValue:newValue});
      };



    render_Button = () => {
        return(
                <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:"center", margin:'2%'}}>
                    <Grid item xs={12} sm={12} style={{borderBottom:"1px solid #CCD3CE", display:'flex', flexDirection:'row', justifyContent:'center', alignItem:'center'}}>
                    {this.state.buttonValue.map((x)=>(
                        <Button 
                            size="small" 
                            sx={{textTransform: "none", color: x === this.state.selectedButtonValue ? 'green' : 'black'}}
                            onClick={() => this.handleChange(x)}
                            >
                            {x}
                        </Button>
                    ))}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                     {this.render_SelectedTabInfo(this.state.selectedButtonValue)}
                    </Grid> 
                </Grid>
        )
    }

    render_SelectedTabInfo = (selectedAction) => {

        const dummyImages_Data = ['https://pix10.agoda.net/hotelImages/104/10435/10435_16100615590047498393.jpg?ca=6&ce=1&s=1024x768', 'https://www.hiltonhotels.com/assets/img/Hotel%20Images/Hilton/K/KUCHITW/rooms-suites/carousel/twin-executive-room-550x444px.jpg', 'https://ak-d.tripcdn.com/images/220b0g0000007z1i358C6_R_960_660_R5_D.jpg','https://www.hilton.com/im/en/KUCHITW/3072226/kuchi-matang-terrace.jpg?impolicy=crop&cw=3849&ch=3000&gravity=NorthWest&xposition=323&yposition=0&rw=548&rh=427','https://images.trvl-media.com/lodging/1000000/20000/18900/18804/86f92e29.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium','https://media-cdn.tripadvisor.com/media/photo-s/07/44/91/9f/hilton-kuching.jpg'];

        return(
            <Grid item container spacing={1} >

            {selectedAction === 'Info' &&
            <>
                <Grid item xs={12} sm={12}>
                    <Typography variant="caption" sx={{fontWeight:'bold'}}>Location</Typography>
                </Grid>
                <Grid item xs={12} sm={12} style={{display:'flex', direction:"row", justifyContent:'center', margin:'2%' }}>
                    <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.344848976278!2d110.34832935023209!3d1.5572031988588428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31fba7ebc2b14ff3%3A0xa043c1d7a5661ca5!2sHilton%20Kuching!5e0!3m2!1sms!2smy!4v1679109529572!5m2!1sms!2smy" 
                    width="100%" 
                    height="250" 
                    allowfullscreen="true" 
                    style={{borderRadius:'2%', border:'none'}}
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography variant="caption" sx={{fontWeight:'bold'}}>Description</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography>Boasting an enviable location on the waterfront with views of the Sarawak River, Hilton Kuching is a luxury chain hotel that features several bars and restaurants and a 25-metre outdoor swimming pool. The various rooms and suites offer a television, en-suite facilities and Internet access. One king-size or two single beds are provided while an extra bed can be added. Some rooms have floor-to-ceiling windows with lovely views of the river. Several meeting rooms are available for business use and Hilton Kuching also features a fitness centre. The reception offers a full concierge service and a tour desk where sightseeing trips can be arranged. On-site dining options include Waterfront Café, which serves Malaysian dishes like Pansoh Manuk, and SteakHouse, a must for meat-lovers. Senso Bar offers a chilled vibe alongside caviar, cocktails and Champagne. A five-minute boat-trip across the river is the 19th-century Fort Margherita, built to protect against pirates. Bako National Park, a 45-minute bus ride, is a haven for monkeys.</Typography>
                </Grid>

               
            </>
        }

        {selectedAction === 'Photos' &&
        
            <Grid item container style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            {dummyImages_Data.map((x)=>(
                <Grid item xs={12} sm={3} style={{width:'300px' , height:'200px', backgroundImage: `url(${x})`, backgroundSize: 'cover', margin:'0.5%'}}/>
                
                    ))}
            </Grid>
        
        }
        
        {selectedAction === 'Reviews' &&
        
        <Grid item container style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Grid item xs={12} sm={12}>
                <Typography variant="caption">Rating Overview</Typography>
            </Grid>
            
            <Grid item xs={12} sm={3} style={{padding:"3%", marginLeft:"auto"}} >
                {this.state.ratingCategories.map((x)=>(
            <Grid item container spacing={4} style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Grid item xs={6} sm={6}>
                    <Typography>{x.cat}</Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Rating value={x.rate   ? x.rate : 0} />
                </Grid>
            </Grid>
               
                ))}
            </Grid>

            <Grid item xs={12} sm={9}>
                <Grid item container spacing={2}>
                    {/* will display max 3 comments, to view more comment, click View Detail button */}
                    {this.state.dummyDataComment.slice(0,3).map((comment)=>(
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ maxWidth: 345, height:150, overflow:'auto' }}>
                            <CardActionArea>
                                <CardContent style={{height:100, overflowY:'scroll'}}>
                                <Typography variant="body2" color="text.secondary">
                                   {comment.comment}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{marginLeft:'3%'}}>
                                <Typography sx={{color:'#476E56'}}>{comment.Username}</Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                
            </Grid>

        </Grid>
    
        }
              

            </Grid>
        )
    }


    render() {

        const {product} = this.props

        return(
            <Grid item container spacing={2} style={{margin:"auto", display:'flex', flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                <Grid item xs={12} sm={4} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <img src={product.HotelImage} alt={product.HotelName} style={{width:"100%", borderRadius:"4%"}}/>
                </Grid>
                <Grid item xs={12} sm={4} >
                <Grid item xs={12} sm={12} >
                    <Stack direction="row" spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:"auto"}}>
                        <div>
                            <Typography variant="h6" sx={{letterSpacing:'2px'}} >{product.HotelName}</Typography>  
                        </div>
                        <div>
                            <Wishlist16Svg/>
                        </div>
                    </Stack>
                </Grid>
                    
                    <Typography sx={{marginTop:'2%'}}>5 Stars Hotel</Typography>
                    <Typography sx={{marginTop:'2%'}}>Jalan Tunku Abdul Rahman, 93100, Kuching, Malaysia</Typography>
                    <Grid item container style={{display:'flex', flexDirection:'row', alignItems:"center", marginTop:'1.5%'}}>
                        <Grid>
                            <Rating value={product.HotelRating !== null   ? product.HotelRating : 0} />
                        </Grid>
                        <Grid style={{marginLeft:'2%'}}>
                            <Typography variant="caption">800 reviews</Typography>
                        </Grid>
                    </Grid>
     
                   
                        <Grid item xs={12} sm={12} style={{padding:'2%',backgroundColor:"#ffffe6", }}>
                        <Stack direction="row" spacing={2}>
                        <EmojiEventsOutlinedIcon style={{color:"#ffa31a", marginRight:"4%"}} size="small"/>
                                <Typography variant="caption" >Popular choice</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={4} style={{ borderRadius:'4%'}}>
                    <Stack direction="column" spacing={2} style={{padding:'2%', backgroundColor:'rgb(188, 218, 199,0.5)', borderRadius:'2%'}}>
                        <Grid item xs={12} sm={12} >
                            <Stack direction="row" spacing={1}>
                                <Typography variant="subtitle2">Start from</Typography>
                                <Typography style={{color:"black"}} variant="h5">MYR {product.StartPrice.toFixed(2)}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{padding:'2%'}}>
                            <Typography variant="caption">Hotel Policy</Typography>
                            <Typography style={{color:'#476E56'}}>Check In 3pm - Check Out 12 pm</Typography>

                            <Typography variant="caption">Contact</Typography>
                            <Typography style={{color:'#476E56'}}>Jalan Tunku Abdul Rahman, 93100, Kuching, Malaysia
                            Telephone: +60 82223888 | Fax: +60 82428984</Typography>
                        </Grid>
                    </Stack>
                </Grid>

{/* design referred from Trivago */}
               {this.render_Button()}
            </Grid>
        )
    }
      
}

HotelDetails.propTypes = {
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

HotelDetails.defaultProps = {
    layout: "standard",
};

const mapStateToProps = (state) => ({
  
});


const mapDispatchToProps = (dispatch) => {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelDetails));