// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// blocks
import BlockMap from "../blocks/BlockMap";

// data stubs
import theme from "../../data/theme";

function SitePageContactUs() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Contact Us", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Contact Us — ${theme.name}`}</title>
      </Helmet>

      <BlockMap />

      <PageHeader header="Contact Us" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="card mb-0">
            <div className="card-body contact-us">
              <div className="contact-us__container">
                <div className="row">
                  <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                    <strong className="contact-us__header card-title">
                      Our Address
                    </strong>

                    <div className="contact-us__address">
                      <p>
                        <h5>
                          {/* Malaysia-China International Trading Centre <br />
                          Sejingkat, 93050 Kuching, Sarawak */}
                          <br />
                          {/* Email: MCITC@MCITC.asia */}
                          <br />
                          {/* Phone Number: (60) 12-850 9198 */}
                        </h5>
                      </p>
                      <br />
                      <p>
                        <strong>Opening Hours</strong>
                        <br />
                        <h5> Monday to Saturday: 10.00am - 07.00pm</h5>
                        {/* <br />
                                                Saturday: 8am-6pm
                                                <br />
                                                Sunday: 10am-4pm */}
                      </p>
                      {/* 
                                            <p>
                                                <strong>Comment</strong>
                                                <br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Curabitur suscipit suscipit mi, non tempor
                                                nulla finibus eget. Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p> */}
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <h4 className="contact-us__header card-title">
                      Leave us a Message
                    </h4>

                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="form-name">Your Name</label>
                          <input
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="form-email">Email</label>
                          <input
                            type="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-subject">Subject</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-message">Message</label>
                        <textarea
                          id="form-message"
                          className="form-control"
                          rows="4"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </form>
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
