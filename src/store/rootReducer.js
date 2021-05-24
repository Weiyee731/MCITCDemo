import { combineReducers } from 'redux';

// reducers
import cartReducer from './cart';
import compareReducer from './compare';
import currencyReducer from './currency';
import localeReducer from './locale';
import mobileMenuReducer from './mobile-menu';
import quickviewReducer from './quickview';
import sidebarReducer from './sidebar';
import version from './version';
import wishlistReducer from './wishlist';
import { counterReducer } from "./reducer/gitReducer";

export default combineReducers({
    counterReducer:counterReducer,
    version: (state = version) => state,
    cart: cartReducer,
    compare: compareReducer,
    currency: currencyReducer, 
    locale: localeReducer,
    mobileMenu: mobileMenuReducer,
    quickview: quickviewReducer,
    sidebar: sidebarReducer,
    wishlist: wishlistReducer,
});
