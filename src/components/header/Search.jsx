// react
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// third-party
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

// application
import shopApi from '../../api/shop';
import Suggestions from './Suggestions';
import { Cross20Svg, Search20Svg } from '../../svg';
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    products: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (credentials) => dispatch(GitAction.CallAllProducts(credentials)),
  };
}

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let canceled = false;

    const treeToList = (categories, depth = 0) => (
      categories.reduce(
        (result, category) => [
          ...result,
          { depth, ...category },
          ...treeToList(category.children || [], depth + 1),
        ],
        [],
      )
    );

    shopApi.getCategories({ depth: 1 }).then((categories) => {
      if (canceled) {
        return;
      }

      setCategories(treeToList(categories));
    });

    return () => {
      canceled = true;
    };
  }, [setCategories]);

  return categories;
}

function Search(props) {
  const {
    context,
    className,
    inputRef,
    onClose,
    location,
  } = props;
  const [cancelFn, setCancelFn] = useState(() => () => { });
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category] = useState('[all]');
  const wrapper = useRef(null);
  const close = useCallback(() => {
    if (onClose) {
      onClose();
    }

    setSuggestionsOpen(false);
  }, [onClose]);

  // Close suggestions when the location has been changed.
  useEffect(() => close(), [close, location]);

  // Close suggestions when a click has been made outside component.
  useEffect(() => {
    const onGlobalClick = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener('mousedown', onGlobalClick);

    return () => document.removeEventListener('mousedown', onGlobalClick);
  }, [close]);

  // Cancel previous typing.
  useEffect(() => () => cancelFn(), [cancelFn]);

  const handleFocus = () => {
    setSuggestionsOpen(true);
  };

  const handleChangeQuery = (event) => {
    let canceled = false;
    let timer;

    const newCancelFn = () => {
      canceled = true;
      clearTimeout(timer);
    };

    const query = event.target.value;

    setQuery(query);

    if (query === '') {
      setHasSuggestions(false);
    } else {
      timer = setTimeout(() => {
        const options = { limit: 5 };

        if (category !== '[all]') {
          options.category = category;
        }

        let filteredProduct = props.products.filter(el =>
          el.ProductName.toLowerCase().trim().includes(query.toLowerCase().trim()))

        setSuggestedProducts(filteredProduct.slice(0, 5));
        setHasSuggestions(filteredProduct.length > 0);
        setSuggestionsOpen(true);

        if (canceled) {
          return;
        }
      }, 100);
    }

    setCancelFn(() => newCancelFn);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement === document.body) {
        return;
      }

      // Close suggestions if the focus received an external element.
      if (wrapper.current && !wrapper.current.contains(document.activeElement)) {
        close();
      }
    }, 10);
  };

  // Close suggestions when the Escape key has been pressed.
  const handleKeyDown = (event) => {
    // Escape.
    if (event.which === 27) {
      close();
    }
  };

  const rootClasses = classNames(`search search--location--${context}`, className, {
    'search--suggestions-open': suggestionsOpen,
    'search--has-suggestions': hasSuggestions,
  });

  const closeButton = context !== 'mobile-header' ? '' : (
    <button className="search__button search__button--type--close" type="button" onClick={close}>
      <Cross20Svg />
    </button>
  );

  return (
    <div className={rootClasses} ref={wrapper} onBlur={handleBlur}>
      <div className="search__body">
        <div className="search__form" action="">
          <input
            ref={inputRef}
            onChange={handleChangeQuery}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            value={query}
            className="search__input"
            name="search"
            placeholder="Search in Emporia"
            aria-label="Site search"
            type="text"
            autoComplete="off"
          />
          <button className="search__button search__button--type--submit" type="submit">
            <Search20Svg />
          </button>
          {closeButton}
          <div className="search__border" />
        </div>
        <Suggestions className="search__suggestions" context={context} products={suggestedProducts} />
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
