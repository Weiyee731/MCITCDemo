// react
import React, { useEffect, useState } from 'react';

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// blocks
import BlockMap from "../blocks/BlockMap";

// data stubs
import theme from "../../data/theme";

import TextField from '@material-ui/core/TextField';

function SitePageContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Contact Us", url: "" },
  ];

  const isEmailValid = (email) => { return (typeof email === 'undefined' || email === '' || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? false : true }

  const checkValidity = () => {
    if (name === "")
      return false
    if (email === "" || !isEmailValid(email))
      return false
    if (subject === "")
      return false
    if (message === "")
      return false
    else
      return true
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Contact Us — ${theme.name}`}</title>
      </Helmet>
      <PageHeader header="Contact Us" breadcrumb={breadcrumb} />
      {/* <BlockMap /> */}
      <div className="block">
        <div className="container">
          <div className="card mb-0">
            <div className="card-body contact-us">
              <div className="contact-us__container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    <h4 className="contact-us__header card-title" style={{ textAlign: "left", paddingLeft: "50pt" }}>
                      Send us a Message
                    </h4>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <TextField
                            id="form-name"
                            className="form-control"
                            label="Name"
                            multiline
                            variant="outlined"
                            placeholder="Your Name"
                            onChange={(x) => setName(x.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <TextField
                            id="form-email"
                            className="form-control"
                            label="Email Address"
                            multiline
                            type="email"
                            variant="outlined"
                            placeholder="Email Address"
                            onChange={(x) => setEmail(x.target.value)}
                          />
                          {
                            !isEmailValid(email) && email.length > 0 && <p style={{ color: "red" }}>Invalid Email</p>
                          }
                        </div>
                      </div>
                      <div className="form-group">
                        <TextField
                          id="form-subject"
                          className="form-control"
                          label="Subject"
                          multiline
                          variant="outlined"
                          type="text"
                          placeholder="Subject"
                          onChange={(x) => setSubject(x.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          id="form-message"
                          className="form-control"
                          label="Message"
                          multiline
                          variant="outlined"
                          rows="4"
                          placeholder="Type Your Message Here ..."
                          onChange={(x) => setMessage(x.target.value)}
                        />
                      </div>
                      <div className="pt-5">
                        <button type="submit" className="btn btn-primary" disabled={checkValidity() ? false : true}>
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-12 col-lg-4 pb-4 pb-lg-0">
                    <h4 className="contact-us__header card-title" style={{ textAlign: "left" }}>
                      Our Address
                    </h4>
                    <div className="contact-us__address">
                      <p style={{ textAlign: "left" }}>
                        <label>OPENING HOURS</label>
                        <label>Monday to Saturday: 10.00am - 06.00pm</label><br />

                        <label className="mt-3">EMAIL US:</label><br />
                        <label>helpdesk.myemporia@gmail.com</label><br />

                        <label className="mt-3">MAILING ADDRESS:</label><br />
                        <label>SUITE 3, 2ND FLOOR, SUBLOT 25,</label>
                        <br />
                        <label>TABUAN COMMERCIAL CENTRE, JALAN CANNA</label>
                        <br />
                        <label>93350, KUCHING SARAWAK</label>

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageContactUs;
