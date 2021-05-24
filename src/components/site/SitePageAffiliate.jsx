// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageAffiliate() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Affiliate Program", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`MyShops Affiliate Program — ${theme.name}`}</title>
      </Helmet>
      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">MyShops Affiliate Program</h1>
              <div className="document__subtitle">
                Join us to earn extra income.
              </div>
            </div>
            <div className="document__content typography">
              <p>
              MyShops offer everyone a fair way to legitimate your app or
                website through affiliate program.
              </p>

              <h2>Why choose us?</h2>

              <ol>
                <li>
                  <strong>Professional and quick support</strong>
                </li>
                <li>
                  <strong>High Return</strong>
                </li>
                <li>
                  <strong>Easy registration & instant activation</strong>
                </li>
              </ol>

              <p>
                For information about how to contact us, please visit our
                <Link to="/site/contact-us"> contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageAffiliate;
