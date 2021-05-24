import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import theme from '../../data/theme';
import Dropzone from "react-dropzone";
import Card from 'react-bootstrap/Card'
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "./viewSettings.component.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import SupplierEndorsementDetails from "../viewSupplierEndorsement/viewSupplierEndorsementDetails.component";
import Button from 'react-bootstrap/Button'
import SearchBox from "../../components/SearchBox/SearchBox";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import SelectCurrency from '../../../src';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import logo from "../../assets/logo_black_word.png";
import SocialLinks from '../../components/shared/SocialLinks';

function mapStateToProps(state) {
  return {
    colors: state.counterReducer["colors"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllColor: () => dispatch(GitAction.CallAllColor()),
    CallDeleteColor: (prodData) =>
      dispatch(GitAction.CallDeleteColor(prodData)), //the backend of deletion is require
  };
}




class ViewSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllColor();

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      selection: [],
      selectAll: false,
      height: "300px",
      detailsShown: false,
      index: null,
      code: null,
      Color: null,
      rental: null,
      productId: null,
      stockAmount: null,
      maxStock: null,
      restockQty: null,
      restockDate: null,
      restockStatus: null,
      tabType:'Company',
    };
  }
  toggleMe=(value)=>{
    this.setState({
        tabType:value
    })

  }

 render(){
    return (
      <div style={{ width: "100%" }}>
          <h1>System Settings</h1>
                  <Button variant="primary" onClick={()=>this.toggleMe('company')}>Company</Button>&nbsp;&nbsp;
                  <Button onClick={()=>this.toggleMe('admin')}>Admin</Button>&nbsp;&nbsp;
                  <Button onClick={()=>this.toggleMe('miscelianeous')}>Miscelianeous</Button>&nbsp;&nbsp;
                  <Button onClick={()=>this.toggleMe('about')}>About</Button>&nbsp;&nbsp;   
                  <Button onClick={()=>this.toggleMe('T&C')}>Term and Condition</Button>&nbsp;&nbsp;
                  <Button onClick={()=>this.toggleMe('policy')}>Policy</Button>
          <Card >
              <div class="container">
                  {
                      this.state.tabType==='company' && 
                      <div>
                          <form>
                      <p>&nbsp;Company Name &nbsp;: &nbsp;
                      <input
                      style={{ width: "500px" }}
                      defaultValue="MCITC"
                        type="text"
                      />
                      </p>
                      <p>&nbsp;Company Image &nbsp;: &nbsp;
                      
                     
                    <Dropzone
                                    
                                    accept="image/*"
                                  >
                                    {({
                                      getRootProps,
                                      getInputProps,
                                      isDragActive,
                                      isDragAccept,
                                      isDragReject,
                                    }) => (
                                      <div
                                        {...getRootProps({
                                          className: "dropzone",
                                        })}
                                        style={{
                                          background: "#f0f0f0",
                                          padding: "20px",
                                          margin: "5px ",
                                          marginTop: "5px",
                                          borderStyle: "dashed",
                                          borderColor: isDragActive
                                            ? isDragReject
                                              ? "#fc5447"
                                              : "#a0d100"
                                            : "#b8b8b8",
                                          borderWidth: "2px",
                                          borderRadius: "10px",
                                          textAlign: "center",
                                          selfAlign: "center",
                                          width: "100px",
                                          height: "100px",
                                          color: isDragActive
                                            ? isDragReject
                                              ? "#a31702"
                                              : "#507500"
                                            : "#828282",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        <input {...getInputProps()} />
                                        {/* <p>
                                          {isDragActive
                                            ? isDragReject
                                              ? "The file needs to be an image"
                                              : "Release to drop file"
                                            : "Drag and drop images, or click to select files. \n Images have to be 512 x 512"}
                                        </p> */}
                                        <AddIcon style={{ margin: "15px" }} />
                                      </div>
                                    )}
                                  </Dropzone> 
                                  </p>
                                  
                      <p>&nbsp;Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                      <input
                      style={{ width: "500px" }}
                        type="text"
                      />
                      </p>
                      <p>&nbsp;Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
                      <input
                      style={{ width: "500px" }}
                        type="text"
                      />
                      </p>
                      <p>&nbsp;Website &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                      <input
                      style={{ width: "500px" }}
                        type="text"
                      />
                      </p>
                      <p>&nbsp;Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
                      <input
                      style={{ width: "500px" }}
                        type="text"
                      />
                      </p>
                    </form></div>
                  }
                  {
                    this.state.tabType==='admin' && 
                    <div>
                      <p>&nbsp;Admin Email : &nbsp;
                      <input
                      style={{ width: "500px" }}
                        type="text"
                      />
                      </p>

                    </div>

                  }
                  {
                    this.state.tabType==='miscelianeous' && 
                    <div>
                      <p>
                      &nbsp;Timezone : &nbsp;
                      <TimezonePicker
                       absolute      = {false}
                       defaultValue  = "(GMT+08:00) Kuala Lumpur"
                       placeholder   = "Select timezone..."
                       onChange      = {this.handleChange}
                      />
                       </p>
                      <p>&nbsp;Invoice Footer : &nbsp;
                      <input
                        defaultValue="Come Again"
                        type="text"
                        id="invoice_footer"
                      />
                      </p>
                    </div>

                  }
                  {
                    this.state.tabType==='about' && 
                    <div>
                      <img
                            style={{width: 550, height: 650}} 
                            src={logo} />
                            <br />
                            <p> Version: V1.0.1 </p>
                            {/* <SocialLinks className="footer-newsletter__social-links" shape="circle" /> */}
                            <p>&nbsp;Facebook : &nbsp;
                            <input 
                            style={{ width: "500px" }}
                            defaultValue= {theme.author.profile_url}
                            type="text"
                            />
                            </p>
                            <p>&nbsp;Twitter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                            <input
                            style={{ width: "500px" }}
                            defaultValue="MCITC"
                            type="text"
                            />
                            </p>
                            <p>&nbsp;Youtube &nbsp;&nbsp;&nbsp;: &nbsp;
                            <input
                            style={{ width: "500px" }}
                            defaultValue="MCITC"
                            type="text"
                            />
                            </p>
                            <p>&nbsp;Instagram : &nbsp;
                            <input
                            style={{ width: "500px" }}
                            defaultValue="MCITC"
                            type="text"
                            />
                            </p>
                            <p>&nbsp;RSS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
                            <input
                            style={{ width: "500px" }}
                            defaultValue="MCITC"
                            type="text"
                            />
                            </p>
              
                    </div>

                  }
                  {
                    this.state.tabType==='T&C' && 
                    <div>
                      <h2>1. INTRODUCTION</h2>
                      <ul>
                      <li>
                      1.1 Welcome to the MCITC.com.my website and/or the MCITC mobile
                      app (the “Platform”). These Terms of Use govern your access and
                      use of the Platform and the use of any services, information and
                      functions made available by us at the Platform (“Services”).
                      Before using this Platform or the Services, you must read
                      carefully and accept these Terms of Use and all other terms and
                      conditions and policies pertaining to the use of the Platform
                      and/or the Services (collectively referred to as “MCITC Terms
                        and Conditions”) and you must consent to the processing of your
                        personal data as described in the Privacy Policy set out at 
                         <u> https://www.MCITC.com.my/privacy-policy/</u> By accessing the
                        Platform and/or using the Services, you agree to be bound by
                        MCITC Terms and Conditions and any amendments to the foregoing
                        issued by us from time to time. If you do not agree to MCITC
                        Terms and Conditions and the Privacy Policy, do not access
                        and/or use this Platform and/or the Services.
                        </li>
                        <li>
                        1.2 MCITC reserves the right, to change, modify, add, or remove
                        portions of these Terms of Use and/or MCITC Terms and Conditions
                        at any time. Changes will be effective when posted on the
                        Platform with no other notices provided and you are deemed to be
                        aware of and bound by any changes to the foregoing upon their
                        publication on the Platform.
                        </li>
                        <li>
                        1.3 If you are under the age of 18 or the legal age for giving
                        consent hereunder pursuant to the applicable laws in your
                        country (the “legal age”), you must obtain permission from your
                        parent(s) or legal guardian(s) to open an account on the
                        Platform. If you are the parent or legal guardian of a minor who
                        is creating an account, you must accept and comply with these
                        Terms of Use on the minor's behalf and you will be responsible
                        for the minor’s actions, any charges associated with the minor’s
                        use of the Platform and/or Services or purchases made on the
                        Platform. If you do not have consent from your parent(s) or
                        legal guardian(s), you must stop using/accessing this Platform
                        and/or Services.
                        </li>
                        </ul>
                        <h2>2. USE OF THE PLATFORM AND/OR SERVICES</h2>
                        <ul>
                          <li>
                          2.1 We grant you a non-transferable and revocable license to use
                          the Platform and/or Services, subject to these Terms of Use, for
                          the purpose of shopping for personal items sold on the Platform.
                          Commercial use or use on behalf of any third party is
                          prohibited, except as explicitly permitted by us in advance. Any
                          breach of these Terms of Use shall result in the immediate
                          revocation of the license granted herein without notice to you.
                          </li>
                          <li>
                           2.2 Certain services and related features that may be made
                           available on the Platform may require registration or
                           subscription. Should you choose to register or subscribe for any
                           such services or related features, you agree to provide accurate
                           and current information about yourself, and to promptly update
                           such information if there are any changes. Every user of the
                           Platform is solely responsible for keeping passwords and other
                           account identifiers safe and secure. The account owner is
                           entirely responsible for all activities that occur under such
                           password or account. Furthermore, you must notify us of any
                           unauthorized use of your password or account. MCITC shall not be
                           responsible or liable, directly or indirectly, in any way for
                           any loss or damage of any kind incurred as a result of, or in
                           connection with, your failure to comply with this section.
                          </li>
                          <li>
                          2.3 We reserve the right, but shall not be obliged to:
                          <br />
                          (a) monitor, screen or otherwise control any activity, content or
                          material on the Platform and/or through the Services. We may in
                          our sole and absolute discretion, investigate any violation of
                          these Terms of Use contained herein and may take any action it
                          deems appropriate;
                          <br />
                          (b) prevent or restrict access of any an authorised user to the
                          Platform and/or the Services;
                          <br />
                          (c) report any activity it suspects to be in violation of any
                          applicable law, statute or regulation to the appropriate
                          authorities and to co-operate with such authorities; and/or
                          <br />
                          (d) to request any information and data from you in connection
                          with your use of the Services and/or access of the Platform at any
                          time and to exercise our right under this paragraph if you refuse
                          to divulge such information and/or data or if you provide or if we
                          have reasonable grounds to suspect that you have provided
                          inaccurate, misleading or fraudulent information and/or data.
                          <br />
                          <br />
                          </li>
                        </ul>
                        <h2>3. USER SUBMISSIONS</h2>
                        <ul>
                          <li>
                          3.1 You grant us a non-exclusive license to use the materials or
                          information that you submit to the Platform and/or provide to
                          us, including but not limited to, questions, reviews, comments,
                          and suggestions (collectively, "Submissions"). When you post
                          comments or reviews to the Platform, you also grant us the right
                          to use the name that you submit or your username, in connection
                          with such review, comment, or other content. You shall not use a
                          false e-mail address, pretend to be someone other than yourself
                          or otherwise mislead us or third parties as to the origin of any
                          Submissions. We may, but shall not be obligated to, remove or
                          edit any Submissions.
                          </li>
                        </ul>
                        <h2>4. TRADEMARKS AND COPYRIGHTS</h2>
                        <ul>
                          <li>4.1 All intellectual property rights, whether registered or
                          unregistered, in the Platform, information content on the
                          Platform and all the website design, including, but not limited
                          to, text, graphics, software, photos, video, music, sound, and
                          their selection and arrangement, and all software compilations,
                          underlying source code and software (collectively referred to as
                          “Intellectual Property”) shall remain our property or where
                          applicable, our affiliates or third party intellectual property
                          owners. The entire contents of the Platform also are protected
                          by copyright as a collective work under Malaysia copyright laws
                          and international conventions. All rights are reserved.
                          </li>
                          <li>
                          4.2 No part or parts of the Platform may be reproduced, reverse
                          engineered, decompiled, disassembled, separated, altered,
                          distributed, republished, displayed, broadcasted, hyperlinked,
                          mirrored, framed, transferred or transmitted in any manner or by
                          any means or stored in an information retrieval system or
                          installed on any servers, system or equipment any Intellectual
                          Property without our prior written permission or that of the
                          relevant Intellectual Property owners. No party accessing the
                          Platform shall claim any right, title or interest therein.
                          Permission will only be granted to you to download, print or use
                          the Intellectual Property for personal and non-commercial uses,
                          provided that you do not modify the Intellectual Property and
                          that we or the relevant copyright owners retain all copyright
                          and other proprietary notices contained in the Materials.
                          </li>
                          </ul>
                          <h2>5. Our limitation of responsibility and liability</h2>
                          <ul>
                          <li>
                          5.1 The Platform and all data and/or information contained
                          therein and/or the Services are provided on an “as is” and “as
                          available” basis without any warranties, claims or
                          representations made by MCITC of any kind either expressed,
                          implied or statutory with respect to the Platform and/or the
                          Services, including, without limitation, warranties of
                          non-infringement of third party rights, title, merchantability,
                          satisfactory quality or fitness for a particular purpose. All
                          data and/or information contained in the Platform and/or the
                          Services are provided for informational purposes only.
                          </li>
                          <li>
                          5.2 Without limiting the foregoing, MCITC does not warrant that
                          the Platform and/or the Services or the functions contained
                          therein will be available, accessible, uninterrupted, timely,
                          secure, accurate, complete or error-free, that defects, if any,
                          will be corrected, or that this Platform and/or the server that
                          makes the same available are free of viruses, clocks, timers,
                          counters, worms, software locks, drop dead devices,
                          trojan-horses, routings, trap doors, time bombs or any other
                          harmful codes, instructions, programs or components.
                          </li>
                          <li>
                          5.4 Any risk of misunderstanding, error, damage, expense or
                          losses resulting from the use of the Platform and/or Services is
                          entirely at your own risk and we shall not be liable therefore.
                          </li>
                          </ul>
                          <h2>6.0 HYPERLINKS</h2>
                        <ul>
                          <li>
                            6.1 For your convenience, we may include hyperlinks to other
                            websites or content on the Platform that are owned or operated
                            by third parties. Such linked websites or content are not under
                            our control and we are not liable for any errors, omissions,
                            delays, defamation, libel, slander, falsehood, obscenity,
                            pornography, profanity, inaccuracy or any other objectionable
                            material contained in the contents, or the consequences of
                            accessing, any linked website. Any hyperlinks to any other
                            websites or content are not an endorsement or verification of
                            such websites or content and you agree that your access to or
                            use of such linked websites or content is entirely at your own
                            risk.
                            </li>
                        </ul>
                        <h2>7. APPLICABLE LAW AND JURISDICTION</h2>
                        <ul>
                        <li>
                        7.1 These Terms of Use and/or other MCITC Terms and Conditions
                        shall be interpreted and governed by the laws in force in
                        Malaysia. Subject to the section on Arbitration below, you
                        hereby agree to submit to the jurisdiction of the Courts of
                        Malaysia.       
                        </li>
                        </ul>
                        <h2>9. TERMINATION</h2>
                        <ul>
                          <li>
                          9.1 In addition to any other legal or equitable remedies, we
                          may, without prior notice to you, immediately terminate or
                          revoke any or all of your rights granted under these Terms of
                          Use and/or other MCITC Terms and Conditions. Upon any
                          termination of these Terms of Use and/or other MCITC Terms and
                          Conditions, you shall immediately cease all access to and use of
                          the Platform and/or Services and we shall, in addition to any
                          other legal or equitable remedies, immediately revoke all
                          password(s) and account identification issued to you and deny
                          your access to and use of this Platform and/or Services in whole
                          or in part. Any termination of this agreement shall not affect
                          the respective rights and obligations (including without
                          limitation, payment obligations) of the parties arising before
                          the date of termination. You furthermore agree that MCITC shall
                          not be liable to you or to any other person as a result of any
                          such suspension or termination. If you are dissatisfied with the
                          Platform and/or Services or with any terms, conditions, rules,
                          policies, guidelines, or practices of MCITC, in operating the
                          Platform and/or providing Services, your sole and exclusive
                          remedy is to discontinue using the Platform and/or the Services.
                          </li>
                        </ul>
                        <h2> TERMS AND CONDITIONS OF SALE </h2>
                        <h2>1.0 Interpretation </h2>                         
                        <ul>
                        <li>
                        1.1 In these Conditions:
                        <br />
                        <br />
                        "Buyer" means the person who purchases Goods on the Platform;
                        <br />
                        "Conditions" mean these Terms and Conditions of Sale;
                        <br />
                        "Contract" means the contract formed when Seller accepted the
                        order placed by Buyer on the Platform for the purchase of Goods
                        sold by Seller;
                        <br />
                        "Goods" means the goods made available for sale on the Platform,
                        including any instalment of the goods or any parts for them;
                        <br />
                        “MCITC Terms and Conditions” means these Terms and Conditions of
                        Sale and all other terms and conditions and policies pertaining to
                        the use of the Platform and/or the Services;
                        <br />
                        “Platform” means the MCITC.com.my website and/or the MCITC mobile
                        app;
                        <br />
                        “Seller” means a seller which uses the Platform and/or Services to
                        sell Goods to the Buyers, and includes a Third Party Vendor. MCITC
                        may also be a “Seller” for selected Goods;
                        <br />
                        “Services” means the use of any services, information and
                        functions made available by MCITC at the Platform;
                        <br />
                        “Third Party Vendor” means a seller which uses the Platform and/or
                        Services to sell Goods to the Buyers, and excludes MCITC; and
                        <br />
                        "Writing" includes electronic mail facsimile transmission and any
                        comparable means of communication.
                        <br />
                        <br />
                        </li>
                        <li>
                        1.2 Any reference in these Conditions to any provision of a
                        statute shall be construed as a reference to that provision as
                        amended, re-enacted or extended at the relevant time.
                        </li>
                        <li>
                        1.3 Any references to “MCITC” in these Conditions refer to both
                        MCITC’s actions on its own behalf as Seller and/or as the
                        operator of the Platform and/or as the agent of Third Party
                        Vendors as Sellers in respect of each and every Contract.
                        </li>
                        </ul>
                        <h2>2. Basis of the Contract</h2>
                        <ul>
                          <li>
                          2.1 The Platform provides a place and opportunity for the sale
                          of Goods between the Buyer and the Seller (collectively
                            “Parties”). The identity of the Seller for a particular Goods
                            listed for sale on the Platform, be it MCITC or a Third Party
                            Vendor, may be stated on the webpage listing such Goods.
                          </li>
                          <li>
                          2.2 Where the Buyer has placed an order on the Platform for the
                          purchase of Goods sold by MCITC and MCITC has accepted the same,
                          this shall constitute a Contract entered into directly between
                          the Buyer and MCITC. On the other hand, where the Buyer has
                          placed an order on the Platform for the purchase of Goods sold
                          by a Third Party Vendor and the said Third Party Vendor has
                          accepted the same, this shall constitute a Contract entered into
                          directly between the Buyer and the Third Party Vendor. Where the
                          Contract is entered into directly between the Buyer and a Third
                          Party Vendor, MCITC is not a party to the Contract or any other
                          Contract between the Buyer and Third Party Vendor and accepts no
                          obligations in connection with any such Contract. Parties to
                          such contracts shall be entirely responsible for the Contract
                          between them, the listing of Goods, warranty of purchase and the
                          like.
                          </li>
                          <li>
                          2.3 Any information made available on the Platform in connection
                          with the supply of Goods, including photographs, drawings, data
                          about the extent of the delivery, appearance, performance,
                          dimensions, weight, consumption of operating materials,
                          operating costs or any information disclosed by Third Party
                          Vendors through the chat system are not binding and for
                          information purposes only. In entering into the Contract, the
                          Buyer acknowledges that it does not rely on and waives any claim
                          based on any such representations or information so provided.
                          </li>
                          <li>
                          2.4 While the Seller endeavours to provide an accurate
                          description of the Goods, neither MCITC nor Seller warrants that
                          such description is accurate, current or free from error. In the
                          event that the Goods the Buyer receives is fundamentally
                          different from the Goods as described on the Platform and which
                          the Buyer has ordered, Clause 7 of these Conditions shall apply.
                          </li>
                          <li>
                          2.5 Any typographical clerical or other error or omission in any
                          quotation, invoice or other document or information issued by
                          MCITC in its website shall be subject to correction without any
                           liability on the part of MCITC.
                           </li>
                        </ul>
                          <h2> 3. Orders and Specifications</h2>
                           <ul>
                             <li>
                             3.1 The Buyer may purchase Goods by placing and completing the
                             order form on the Platform and shall be responsible for ensuring
                             the accuracy of the order. All orders shall be subject to
                             Seller’s acceptance in their sole discretion and each order
                             accepted by the Seller shall constitute a separate Contract and
                             shall be deemed to be irrevocable and unconditional upon
                             transmission through the Platform. MCITC shall be entitled (but
                              not obliged) to process such orders without further consent from
                              the Buyer. Nevertheless, you may request to cancel or amend the
                              order which MCITC shall endeavour (but not obliged) to give
                              effect to on a commercially reasonable effort basis.
                             </li>
                             <li>
                             3.2 Order acceptance and completion of the Contract between the
                             Buyer and Seller will only be completed upon MCITC issuing a
                             confirmation of dispatch of the Goods to the Buyer. For the
                             avoidance of doubt, MCITC shall be entitled to refuse or cancel
                             any order without giving any reasons for the same to the Buyer
                             prior to issue of the confirmation of dispatch. MCITC shall
                             furthermore be entitled to require the Buyer to furnish MCITC
                             with contact and other verification information, including but
                             not limited to address, contact numbers prior to issuing a
                             confirmation of dispatch.
                             </li>
                             <li>
                             3.3 No concluded Contract may be modified or cancelled by the
                             Buyer except with prior written consent from MCITC and on terms
                             that the Buyer shall indemnify MCITC in full against all loss
                             (including loss of profit), costs (including the cost of all
                              labour and materials used), damages, charges and expenses
                              incurred by MCITC as a result of the modification or
                              cancellation, as the case may be.
                             </li>
                            </ul>
                            <h2>4. Price</h2>
                            <ul>
                              <li>
                              4.1 The price of the Goods shall be the price stated on the
                              Platform at the time which the Buyer places and completes the
                              order form on the Platform. The price includes any applicable
                              sales and services tax, value added tax or similar tax which the
                              Buyer shall be liable to pay to MCITC in addition to the price,
                              but it excludes the delivery charges.
                              </li>
                              <li>
                              4.2 In the event that a Goods has been mispriced on the
                              Platform, the Seller reserves the right to terminate the
                              Contract, in which MCITC shall, on behalf of Seller (where
                                Seller is a Third Party Vendor), notify the Buyer of such
                                cancellation by giving three days’ notice. The Seller shall have
                                such right to terminate the Contract notwithstanding that the
                                Goods have been dispatched or are in transit or that payment has
                                been charged to Buyer.
                              </li>
                            </ul>
                                <h2>5. Liability</h2>
                                <ul>
                                  <li>
                                 5.1 In no event shall MCITC be liable for loss of profit or
                                 goodwill, loss of production or revenue or any type of special
                                 indirect or consequential loss whatsoever (including loss or
                                 damage suffered by the Buyer as a result of an action brought by
                                  a third party) even if such loss were reasonably foreseeable or
                                  if MCITC had been advised by the Buyer of the possibility of
                                  incurring the same.
                                  </li>
                                  <li>
                                  5.2 The remedies set out in Clause 10 of these Conditions are
                                  the Buyer’s sole and exclusive remedies for non-conformity of or
                                  defects in the Goods and MCITC’s liability for the same shall be
                                  limited in the manner specified in Clause 10 of these Conditions
                                  .
                                  </li>
                                  <li>
                                  5.3 Notwithstanding any other provision of these Conditions,
                                  Seller’s maximum cumulative liability to you or to any other
                                  party for all losses under, arising out of or relating to the
                                  sale of products under each Contract, shall not exceed the sums
                                  that you have paid to Seller under such Contract.
                                  </li>
                                  <li>
                                  5.4 If a number of events give rise substantially to the same
                                  loss they shall be regarded as giving rise to only one claim
                                  under these Conditions.
                                  </li>
                                  <li>
                                  5.5 No action shall be brought against MCITC later than 12
                                  months after the date it became aware of the circumstances
                                  giving rise to a claim or the date when it ought reasonably to
                                  have become aware, and in any event, no later than 12 months
                                  after the end of the Warranty Period.
                                  </li>
                                </ul>
                                <h2>6. AMENDMENTS </h2>
                                <ul>
                                  <li>
                                  We may amend these Terms and Conditions any time by posting an
                                  updated version at https://www.MCITC.com.my/terms-of-use/ . The
                                  updated version of these Terms and Conditions shall take effect
                                  21 days from the posting date. Each time you use your MCITC
                                  Account you confirm that you agree to be bound by these Terms
                                  and Conditions as may be amended from time to time.
                                  </li>
                                </ul>
                                <h2>7. RESTRICTED ACTIVITIES</h2>
                                <ul>
                                  <li>
                                  7.1 In connection with your use of your MCITC Account, you shall not:
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.1.1 Provide false, inaccurate or misleading information
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.1.2 Use MCITC for any illegal activities
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.1.3 Use your MCITC in a manner that may result in complaints,
                                  disputes, claims, penalties or other liability to us, other
                                  users or third parties or may be regarded as an abuse of the
                                  card system or a violation of card association or network rules
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.1.4 Breach these Terms and Conditions and/or the Privacy
                                  Policy or violate any applicable laws and regulations.
                                  </li>
                                  <li>
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.2 If we, in our sole discretion, believe that you may have
                                  engaged in the above restricted activities, we may take various
                                  actions, including the following:
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.2.1 We may suspend or restrict your access to and/or close
                                  your MCITC Account;
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.2.2 We may terminate these Terms and Conditions and refuse to
                                  provide the services to you;
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.2.3 We may place a hold on your MCITC Account Balance for up
                                  to 180 days if reasonably needed to protect against the risk of
                                  liability; or
                                  <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;7.2.4 We may take legal action against you.
                                  </li>
                                  <li>
                                  7.3 If you are below 18 years old you must obtain consent from
                                  your parent(s) or legal guardian(s). By consenting to your
                                  acceptance of these Terms and Conditions, your parent(s) or
                                  legal guardian(s) are agreeing to take responsibility for: (i)
                                  your actions in your use of the MCITC Account; (ii) any charges
                                  associated with your use of any of the MCITC Account; and (iii)
                                  your compliance with these Terms and Conditions. If you do not
                                  have consent from your parent(s) or legal guardian(s), you must
                                  cease using the MCITC Account.
                                  </li>
                                </ul>
                                  
                                  

                    </div>

                  }
                  {
                    this.state.tabType==='policy' && 
                    <div>
                      <h2>Privacy Policy</h2>
                     <p>
                                PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY CLICKING OR CHECKING 
                                “SIGN UP”, “I AGREE TO MCITC’S PRIVACY POLICY”, “I AGREE AND CONSENT 
                                TO THE COLLECTION, USE, DISCLOSURE, STORAGE, TRANSFER AND/OR PROCESSING 
                                OF MY PERSONAL DATA FOR THE PURPOSE STATED IN, AND UNDER THE TERMS OF, 
                                MCITC’S PRIVACY POLICY” OR SIMILAR STATEMENTS AVAILABLE AT THE MCITC 
                                REGISTRATION PAGE OR IN THE COURSE OF PROVIDING YOU WITH THE SERVICES 
                                OR ACCESS TO THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD
                                THE TERMS OF THIS PRIVACY POLICY AND THAT YOU HAVE AGREED AND CONSENTED 
                                TO THE COLLECTION, USE, DISCLOSURE, STORAGE, TRANSFER AND/OR PROCESSING 
                                OF YOUR PERSONAL DATA AS DESCRIBED AND UNDER THE TERMS HEREIN.
                     </p>
                     <h2>Introduction to this Privacy Policy</h2>
                     <ul> 
                     <li>
                                        MCITC and its affiliates (collectively or individually, "MCITC", "we" 
                                        or "us" take your privacy seriously. Depending on your location, the 
                                        MCITC entity controlling your personal data will be MCITC South East 
                                        Asia Pte. Ltd. and/or as follows:
                                        <br />
                                        Malaysia China International Trade Centre
                                        <br />
                                        Where applicable, this Privacy Policy should be read in conjunction 
                                        with the Country-Specific Riders for your jurisdiction as set out in Section 13 below.
                     </li>
                     </ul>

                    </div>

                  }
          
      </div>   
      </Card>
           
      </div>
      
    );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSettingsComponent);
