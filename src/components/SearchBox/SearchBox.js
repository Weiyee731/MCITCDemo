import React from "react";

const SearchBox = (props) => {
  return (
    <div>
      <div className="sidebar-item sidebar-search">
        <div>
          <div className="input-group">
            <input
              type="search"
              className="form-control search-menu"
              placeholder={props.placeholder}
              onChange={props.onChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
