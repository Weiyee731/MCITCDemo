// react
import React, { useState, useEffect } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';

// application
import MobileLinks from './MobileLinks';
import { Cross20Svg } from '../../svg';
import { currencyChange } from '../../store/currency';
import { localeChange } from '../../store/locale';
import { mobileMenuClose } from '../../store/mobile-menu';

// data stubs
import currencies from '../../data/shopCurrencies';

function MobileMenu(props) {
    const {
        mobileMenuState,
        closeMobileMenu,
        changeLocale,
        changeCurrency,
        productCategories
    } = props;

    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenuState.open,
    });

    const handleItemClick = (item) => {
        if (item.data) {
            if (item.data.type === 'language') {
                changeLocale(item.data.locale);
                closeMobileMenu();
            }
            if (item.data.type === 'currency') {
                const currency = currencies.find((x) => x.currency.code === item.data.code);

                if (currency) {
                    changeCurrency(currency.currency);
                    closeMobileMenu();
                }
            }
        }
        if (item.type === 'link') {
            window.location.href = item.url
            closeMobileMenu();
        }
    };

    const mobileMenuLinks = [
        {
            type: 'link',
            label: 'Home',
            url: '/Emporia',
        },

        {
            type: 'link',
            label: 'Categories',
            url: '',
            children: [
                productCategories.map((item, index) => {
                    return (
                        {
                            type: 'link',
                            label: item.ProductCategory,
                            url: '',
                        }
                    )
                }),
            ],
        },

        // {
        //     type: 'link',
        //     label: 'Shop',
        //     url: '/shop/category-grid-3-columns-sidebar',
        //     children: [
        //         {
        //             type: 'link',
        //             label: 'Shop Grid',
        //             url: '/shop/category-grid-3-columns-sidebar',
        //             children: [
        //                 { type: 'link', label: '3 Columns Sidebar', url: '/shop/category-grid-3-columns-sidebar' },
        //                 { type: 'link', label: '4 Columns Full', url: '/shop/category-grid-4-columns-full' },
        //                 { type: 'link', label: '5 Columns Full', url: '/shop/category-grid-5-columns-full' },
        //             ],
        //         },
        //         { type: 'link', label: 'Shop List', url: '/shop/category-list' },
        //         { type: 'link', label: 'Shop Right Sidebar', url: '/shop/category-right-sidebar' },
        //         {
        //             type: 'link',
        //             label: 'Product',
        //             url: '/shop/product-standard',
        //             children: [
        //                 { type: 'link', label: 'Product', url: '/shop/product-standard' },
        //                 { type: 'link', label: 'Product Alt', url: '/shop/product-columnar' },
        //                 { type: 'link', label: 'Product Sidebar', url: '/shop/product-sidebar' },
        //             ],
        //         },
        //         { type: 'link', label: 'Cart', url: '/shop/cart' },
        //         { type: 'link', label: 'Checkout', url: '/shop/checkout' },
        //         { type: 'link', label: 'Order Success', url: '/shop/checkout/success' },
        //         { type: 'link', label: 'Wishlist', url: '/shop/wishlist' },
        //         { type: 'link', label: 'Compare', url: '/shop/compare' },
        //         { type: 'link', label: 'Track Order', url: '/shop/track-order' },
        //     ],
        // },

        // {
        //     type: 'link',
        //     label: 'Blog',
        //     url: '/blog/category-classic',
        //     children: [
        //         { type: 'link', label: 'Blog Classic', url: '/blog/category-classic' },
        //         { type: 'link', label: 'Blog Grid', url: '/blog/category-grid' },
        //         { type: 'link', label: 'Blog List', url: '/blog/category-list' },
        //         { type: 'link', label: 'Blog Left Sidebar', url: '/blog/category-left-sidebar' },
        //         { type: 'link', label: 'Post Page', url: '/blog/post-classic' },
        //         { type: 'link', label: 'Post Without Sidebar', url: '/blog/post-full' },
        //     ],
        // },

        // {
        //     type: 'link',
        //     label: 'Pages',
        //     url: '/site/about-us',
        //     children: [
        //         { type: 'link', label: 'About Us', url: '/site/about-us' },
        //         { type: 'link', label: 'Contact Us', url: '/site/contact-us' },
        //         { type: 'link', label: 'Contact Us Alt', url: '/site/contact-us-alt' },
        //         { type: 'link', label: '404', url: '/site/not-found' },
        //         { type: 'link', label: 'Terms And Conditions', url: '/site/terms' },
        //         { type: 'link', label: 'FAQ', url: '/site/faq' },
        //         { type: 'link', label: 'Components', url: '/site/components' },
        //         { type: 'link', label: 'Typography', url: '/site/typography' },
        //     ],
        // },

        // {
        //     type: 'button',
        //     label: 'Currency',
        //     children: [
        //         { type: 'button', label: '€ Euro', data: { type: 'currency', code: 'EUR' } },
        //         { type: 'button', label: '£ Pound Sterling', data: { type: 'currency', code: 'GBP' } },
        //         { type: 'button', label: '$ US Dollar', data: { type: 'currency', code: 'USD' } },
        //         { type: 'button', label: '₽ Russian Ruble', data: { type: 'currency', code: 'RUB' } },
        //     ],
        // },

        // {
        //     type: 'button',
        //     label: 'Language',
        //     children: [
        //         { type: 'button', label: 'English', data: { type: 'language', locale: 'en' } },
        //         { type: 'button', label: 'Russian', data: { type: 'language', locale: 'ru' } },
        //     ],
        // },

        {
            type: 'link',
            label: 'Account',
            url: '',
            children: [
                localStorage.getItem('isLogin') === 'false' && { type: 'link', label: 'Login', url: '/login' },
                localStorage.getItem('roleid') <= 15 && { type: 'link', label: 'Inventory', url: '/Emporia/dashboard' },
                { type: 'link', label: 'Edit Profile', url: '/account' },
                { type: 'link', label: 'Order History', url: '/account/orders' },
                { type: 'link', label: 'Order Details', url: '/account/orders/5' },
                { type: 'link', label: 'Address Book', url: '/account/addresses' },
                { type: 'link', label: 'Edit Address', url: '/account/addresses/5' },
                { type: 'link', label: 'Change Password', url: '/account/password' },
                localStorage.getItem('isLogin') === 'true' && { type: 'link', label: 'Logout', url: '/' },
            ],
        },
    ];

    return (
        <div className={classes}>
            <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">Menu</div>
                    <button type="button" className="mobilemenu__close" onClick={closeMobileMenu}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={mobileMenuLinks} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    mobileMenuState: state.mobileMenu,
    productCategories: state.counterReducer["productCategories"]
});

const mapDispatchToProps = {
    closeMobileMenu: mobileMenuClose,
    changeLocale: localeChange,
    changeCurrency: currencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
