// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Currency(props) {
  const { value, currency, currentCurrency } = props;
  const { symbol } = currency || currentCurrency;

  return <React.Fragment>
    {/* {`${currency} ${value.toFixed(2)}`} */}
    {`RM ${value === 'number' ? value.toFixed(2) : value}`}
  </React.Fragment>;
}

Currency.propTypes = {
  /** price value */
  value: PropTypes.number,
  /** currency object, specify to override currentCurrency */
  currency: PropTypes.any,
  /** currency object */
  currentCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentCurrency: state.currency,
});

export default connect(mapStateToProps)(Currency);
