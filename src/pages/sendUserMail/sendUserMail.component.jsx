import React, { Component } from "react";

import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@material-ui/core";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import { DataGrid } from '@material-ui/data-grid';
import EmailEditor from 'react-email-editor'


function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["supplier"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callAllSupplierByUserStatus: (suppData) =>
      dispatch(GitAction.CallAllSupplierByUserStatus(suppData)),
  };
}

const back = (props) => {
   props.history.push("/viewUserMail");
  };

  const columns = [
    { field: 'id', headerName: 'No.'},
    { field: 'email', headerName: 'Email Address', width: "auto"}, 
  ];
  
  const rows = [
      
    { id: 1, email: "abc@gmail.com" },
    { id: 2, email: "cde@gmail.com" },
    { id: 3, email: "fgh@gmail.com" },
    { id: 4, email: "ijk@gmail.com" },
    { id: 5, email: "lmn@gmail.com" },
 

  ];
  function DataTable() {
    return (
      <div style={{ height: 300, width: 'auto'}}>
        <DataGrid rows={rows} columns={columns} pageSize={4}  /> 
      </div>
    );
  }
  
class sendUserMail extends Component {
    state = {
        editorState: EditorState.createEmpty(),
      };

      saveDesign = () => {
        this.editor.saveDesign(design => {
          alert('Design Saved Successfully');
        })
      }

      onLoad = () => {
        // const json = /* DESIGN JSON GOES HERE */
        // this.editor.loadDesign(json)
      }
    
      render() {
        const { editorState } = this.state;
        return (
            <div >
            <div className="App" style={{ width: "100%", alignContent: "center" }}>
              <div className="App-header">
                <h2 style={{ margin: "10px" }}>Dispatch Email</h2>
                <Button onClick={back}>
                  <i class="fas fa-chevron-left"></i>Back
                </Button>
              </div>
              <Card style={{ width: "80%", margin: "0 auto" }}>
                <CardContent>
                  {/* -------------------------------- Add Promotion Title ------------------------------------- */}
                  <div  style={{
                    display: "flex"
                    
                  }}>
                  <div style={{width:"50%", padding:"10px"}}>
                  <InputLabel htmlFor="age-native-label-placeholder">Selected Recipient(s)</InputLabel>
                  <DataTable rows={rows} columns={columns} pageSize={3}  style={{height:"400px",width: "auto",margin:"auto", alignContent:"center"}} />
                  </div>
                  <div style={{width:"50%", padding:"50px"}}> 
                  <TextField
                  id="subject"
                  helperText="Subject"
                  // value={this.state.name}
                  // onChange={this.handleChange.bind(this, "product")}
                  // error={
                  //   this.state.productNameEmpty ||
                  //   this.state.productNameDublicated
                  // }
                  style={{ width: "100%" }}
                />
                <div>
                <br/>
                  <TextField
                  id="emaildesc"
                  label="Email Description"
                  multiline
                  rows={4}
                  defaultValue=" "
                  // value={this.state.PromotionDesc}
                  variant="outlined"
                  // onChange={this.handleChange.bind(this, "PromotionDesc")}
                  style={{ width: "100%" }}
                  // error={this.state.PromotionDescEmpty}
                />
                </div>
                </div>
                </div>
                  <br />
                  {/* {this.state.PromotionTitleEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Product Title Need to Be Set.
                    </p>
                  )} */}
    
                  <br />
                  <div style={{ width: "100%", height: "auto", border: "solid 2px gray", borderRadius: "10px", margin:"auto", overflow: "scroll"}}>
                 {/* <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                /> */}
                {/* <Button onClick={this.exportHtml} color="primary" variant="outlined" style={{marginTop:"5px", marginLeft:"5px", marginRight:"5px"}}>Export HTML</Button> */}
                <Button onClick={this.saveDesign} color="secondary" variant="outlined" style={{marginTop:"5px", marginLeft:"5px", marginRight:"5px"}}>Save Design</Button>
                <EmailEditor 
                  ref={editor => this.editor = editor}
                  onLoad={this.onLoad}
                />
    
                
                {/* <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                ></textarea> */}
              </div>
            <br/><br/>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="inherit"
  
                     
                    //   onClick={this.checkValues.bind(this)}
                    >
                      SEND EMAIL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
    
        );
      }    
    
    }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sendUserMail);
