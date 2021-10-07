import React, {Component} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/FilterList';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from "@material-ui/core";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state ={
            filterBy:this.props.filterList[0]
        }
    }

    handleChange = (e) =>{
        this.setState({
            filterBy:e.target.value
        })
    }

    onChange = (e) =>{
        var filteredProduct = [];
        Object.keys(this.props.Data[0]).map((key,i) => {
            if(key == this.state.filterBy){
                this.props.Data.filter((searchedItem) =>
                Object.values(searchedItem)[i].toLowerCase().includes(
                            e.target.value.toLowerCase()
                        )
                ).map((filteredItem) => {
                    filteredProduct.push(filteredItem);
                  
                    })
            }
        });
        this.props.changeValue(filteredProduct);
    }
    render(){
        return (
            <div style={{display:"flex"}}>
                <FormControl variant="standard" style={{width:"80%"}}>
                    <OutlinedInput
                    id="input-with-icon-adornment"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    variant="outlined"
                    style={{borderRadius:"50px"
                    ,paddingLeft:"10px"
                     }}
                     onChange={this.onChange.bind(this)}
                   />
                </FormControl>
                <div style={{display:"flex", marginTop:"15px", width:"20%", marginLeft:"10px", justifyContent:"space-between"}}>
                <FilterIcon style={{marginTop:"5px",}}/><p style={{marginRight:"5px", marginTop:"5px",}}>Filter By</p>
                <TextField
                 style={{width:"60%",}}
                    select
                      value={this.state.filterBy}
                      onChange={this.handleChange.bind(this)}
                    SelectProps={{
                        native: true,
                    }}
                    variant="standard"
                    >
                    {this.props.filterList.map((option) => (
                        <option key={option} value={option}>
                        {option.replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                    ))}
                
                </TextField>
                </div>    
            </div>
        );
    }

}

export default SearchBar;