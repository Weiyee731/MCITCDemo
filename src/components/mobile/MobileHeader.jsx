// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import Indicator from '../header/Indicator';
import {
    Menu18x14Svg,
    LogoSmallSvg,
    Search20Svg,
    Heart20Svg,
    Cart20Svg,
    Person20Svg,

} from '../../svg';
import { mobileMenuOpen } from '../../store/mobile-menu';
import Search from '../header/Search';

class MobileHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
        };
        this.searchInput = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchOpen } = this.state;

        if (searchOpen && searchOpen !== prevState.searchOpen && this.searchInput.current) {
            this.searchInput.current.focus();
        }
    }

    handleOpenSearch = () => {
        this.setState(() => ({ searchOpen: true }));
    };

    handleCloseSearch = () => {
        this.setState(() => ({ searchOpen: false }));
    };

    render() {
        const { openMobileMenu, wishlist, cart, productcart } = this.props;
        const { searchOpen } = this.state;
        const searchClasses = classNames('mobile-header__search', {
            'mobile-header__search--open': searchOpen,
        });

        console.log(this.props)

        return (
            <div className="mobile-header">
                <div className="mobile-header__panel">
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button" className="mobile-header__menu-button" onClick={openMobileMenu}>
                                <Menu18x14Svg />
                            </button>
                            <Link to="/" className="mobile-header__logo"><LogoSmallSvg /></Link>
                            <Search
                                context="header"
                                className={searchClasses}
                                inputRef={this.searchInput}
                                onClose={this.handleCloseSearch}
                            />
                            <div className="mobile-header__indicators">
                                <Indicator
                                    className="indicator--mobile indicator--mobile-search d-md-none"
                                    onClick={this.handleOpenSearch}
                                    icon={<Search20Svg />}
                                />

                                {localStorage.getItem("isLogin") === 'true' &&
                                    <Indicator
                                        url="/shop/wishlist"
                                        value={this.props.wishlist !== undefined ? this.props.wishlist.length : 0}
                                        icon={<Heart20Svg />}
                                    />
                                }

                                <Indicator
                                    className="indicator--mobile"
                                    url="/shop/cart"
                                    value={productcart.length}
                                    icon={<Cart20Svg />}
                                />

                                <Indicator
                                    className="indicator--mobile"
                                    url={localStorage.getItem('isLogin') === 'true' ? '/account' : '/login'}
                                    icon={<Person20Svg />}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    wishlist: state.counterReducer.wishlist,
    productcart: state.counterReducer.productcart,
});

const mapDispatchToProps = {
    openMobileMenu: mobileMenuOpen,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MobileHeader);
