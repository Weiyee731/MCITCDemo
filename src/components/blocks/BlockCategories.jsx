// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// application
import BlockHeader from "../shared/BlockHeader";
import tester from "../../assets/user.jpg";
export default function BlockCategories(props) {
  const { title, layout, categories } = props;

  const categoriesList = categories.slice(1, 7).map((category, index) => {
    const classes = `block-categories__item category-card category-card--layout--${layout}`;

    const subcategories = categories.slice(1, 10).map((sub, subIndex) => {
      if (sub.HierarchyID == 2) {
        return (
          <li key={subIndex}>
            <Link to={sub.url}>{sub.ProductCategory}</Link>
          </li>
        );
      }
    });

    return (
      <div key={index} className={classes}>
        <div className=" category-card__body">
          <div className=" category-card__image">
            <Link to={category.url}>
              <img src={tester} alt="" />
            </Link>
          </div>
          <div className=" category-card__content">
            <div className=" category-card__name">
              <Link to={category.url}>{category.ProductCategory}</Link>
            </div>
            <ul className="category-card__links">{subcategories}</ul>
            <div className="category-card__all">
              <Link to={category.url}>Show All</Link>
            </div>
            <div className="category-card__products">
              {`${category.products} Products`}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`block block--highlighted block-categories block-categories--layout--${layout}`}
    >
      <div className="container">
        <BlockHeader title={title} />

        <div className="block-categories__list">{categoriesList}</div>
      </div>
    </div>
  );
}

BlockCategories.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.array,
  layout: PropTypes.oneOf(["classic", "compact"]),
};

BlockCategories.defaultProps = {
  categories: [],
  layout: "classic",
};
