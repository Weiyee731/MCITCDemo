// react
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// third-party
import classNames from 'classnames';
// import { browserHistory } from "react-router";

// application
import Suggestions from './Suggestions';
import { Cross20Svg, Search20Svg } from '../../svg';
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

function mapStateToProps(state) {
  return {
    loading: state.counterReducer["loading"],
    products: state.counterReducer["products"],
    categories: state.counterReducer["categories"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProductCategory: (prodData) => dispatch(GitAction.CallAllProductCategory(prodData)),
  };
}

// function useCategories() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     let canceled = false;

//     const treeToList = (categories, depth = 0) => (
//       categories.reduce(
//         (result, category) => [
//           ...result,
//           { depth, ...category },
//           ...treeToList(category.children || [], depth + 1),
//         ],
//         [],
//       )
//     );

//     return () => {
//       canceled = true;
//     };
//   }, [setCategories]);

//   return categories;
// }

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
  const [type, setType] = useState("Hardware");
  // const [category] = useState('[all]');
  const wrapper = useRef(null);
  const close = useCallback(() => {
    if (onClose) {
      onClose();
    }

    setSuggestionsOpen(false);
  }, [onClose]);

  const setPageSale_Type = (type) => {
    sessionStorage.setItem("saleType", type);
    setType(type)

    window.location.reload(false)
}

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

  useEffect(() => {
    props.CallAllProductCategory();
  }, []);

  const { categories } = useSelector(state => state.counterReducer);

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

        let filteredCategory = []

        if (categories.length > 0) {
          categories.filter(el => el.ProductCategory.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_').toLowerCase().trim().includes(query.toLowerCase().trim())).map((data) => {
            if (data.ProductCategory !== null) {
              filteredCategory.push({
                data: data,
                variation: []
              })
            }
          })
        }

        setSuggestedProducts([{ data: { ProductCategory: query ,ProductCategoryID: 0} }])
        if (filteredCategory.length > 0) {
          setSuggestedProducts(prevArray => [...prevArray, ...filteredCategory.slice(0, 5)]);
          setHasSuggestions(filteredCategory.length > 0);
          setSuggestionsOpen(true);
        }

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

    if (event.key === "Enter") {
      // this.props.history.push("/shop/ProductListing/type:Keyword&typevalue:" + searchquery)
      window.location.href = "/shop/ProductListing/type:Keyword&typevalue:" + searchquery
      // this.props.history.push("/shop/ProductListing/type:Keyword&typevalue:" + searchquery);
      // window.location.reload(false);
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


  let searchquery = query.toLowerCase().length > 0 ? query.toLowerCase() : 0
  return (
    <div className={rootClasses} ref={wrapper} onBlur={handleBlur}>
      <div className='col' style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
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
            placeholder="Search in MyEmporia"
            aria-label="Site search"
            type="text"
            autoComplete="off"
            style={{ borderRadius: "5px" }}
          />

          <button className="search__button search__button--type--submit" type="submit"
            onClick={(e) => {
              window.location.href = "/shop/ProductListing/type:Keyword&typevalue:" + searchquery
            }}>
            <Search20Svg />
          </button>
          {closeButton}
          <div className="search__border" style={{ borderRadius: "5px" }} />
        </div>
        <Suggestions className="search__suggestions" context={context} products={suggestedProducts} closeSuggestion={close}
        //  linktoGo={"/shop/ProductListing/type:Keyword&typevalue:" + suggestedProducts.data.ProductCategory}
        />
      </div>
          <Button style={{marginLeft:"4%", backgroundColor:'transparent', color:sessionStorage.getItem("saleType")  === 'Hardware' ? '#288825' : 'black', textTransform:'none'}} onClick={() => setPageSale_Type('Hardware')}>Hardware</Button>
          <Button style={{marginLeft:"4%", backgroundColor:'transparent',  color:sessionStorage.getItem("saleType") === 'Hotel' ? '#288825' : 'black', textTransform:'none'}} onClick={() => setPageSale_Type('Hotel')}>Hotel</Button>
      </div>
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
