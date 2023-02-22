// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import Topbar from '../header/Topbar';
import Indicator from '../header/Indicator';
import IndicatorAccount from "../header/IndicatorAccount";
import {
    Menu18x14Svg,
    LogoSmallSvg,
    Search20Svg,
    Heart20Svg,
    Person20Svg
} from '../../svg';
import { mobileMenuOpen } from '../../store/mobile-menu';
import Search from '../header/Search';
import { Cart20Svg  } from '../../svg';
import PageCart_side from "../shop/ShopPageCart_side";
import { Drawer } from '@mui/material';
import IndicatorCart from '../../components/header/IndicatorCart'

class MobileHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
            openCart: false,
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
        const { searchOpen, openCart } = this.state;
        const searchClasses = classNames('mobile-header__search', {
            'mobile-header__search--open': searchOpen,
        });

        return (
            <div className="mobile-header">
                <div className="mobile-header__panel">
                    <Topbar/>
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button" className="mobile-header__menu-button" onClick={openMobileMenu}>
                                {/* <Menu18x14Svg /> */}
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

                                {
                                    localStorage.getItem("isLogin") === 'true' &&
                                    <Indicator
                                        url="/shop/wishlist"
                                        value={wishlist !== undefined ? wishlist.length : 0}
                                        icon={<Heart20Svg />}
                                    />
                                }

                                <Indicator 
                                    value={productcart !== undefined ? productcart.length : 0}
                                    onClick={() => {
                                        this.setState({openCart:true})
                                      }} 
                                    icon={<Cart20Svg/>}
                                />

                                {
                                    localStorage.getItem('isLogin') === 'true' &&
                                        <Indicator
                                    className="indicator--mobile"
                                    url={'/account'}
                                    icon={<Person20Svg />}
                                />  
                                }
                                {
                                    localStorage.getItem('isLogin') === 'false' &&
                                        <IndicatorAccount />  
                                }

                                {
                                        <div >
                                            <Drawer
                                            PaperProps={{
                                                sx: { width: "380px" },
                                            }}
                                            anchor='right' open={openCart} onClose={() => this.setState({openCart:false})}>
                                            <PageCart_side history={this.props.productcart} setCartOpen={() => this.setState({openCart:false})}/>
                                            </Drawer>
                                        </div>
                                }
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
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
