export default [
    {
        title: 'Home',
        url: '/',
        // submenu: {
        //     type: 'menu',
        //     menu: [
        //         { title: 'Home 1', url: '/' },
        //         { title: 'Home 2', url: '/home-two' },
        //     ],
        // },
    },
    {
        title: 'Megamenu',
        url: '',
        submenu: {
            type: 'megamenu',
            menu: {
                size: 'nl',
                columns: [
                    {
                        size: 6,
                        links: [
                            {
                                title: 'Power Tools',
                                url: '',
                                links: [
                                    { title: 'Engravers', url: '' },
                                    { title: 'Wrenches', url: '' },
                                    { title: 'Wall Chaser', url: '' },
                                    { title: 'Pneumatic Tools', url: '' },
                                ],
                            },
                            {
                                title: 'Machine Tools',
                                url: '',
                                links: [
                                    { title: 'Thread Cutting', url: '' },
                                    { title: 'Chip Blowers', url: '' },
                                    { title: 'Sharpening Machines', url: '' },
                                    { title: 'Pipe Cutters', url: '' },
                                    { title: 'Slotting machines', url: '' },
                                    { title: 'Lathes', url: '' },
                                ],
                            },
                        ],
                    },
                    {
                        size: 6,
                        links: [
                            {
                                title: 'Hand Tools',
                                url: '',
                                links: [
                                    { title: 'Screwdrivers', url: '' },
                                    { title: 'Handsaws', url: '' },
                                    { title: 'Knives', url: '' },
                                    { title: 'Axes', url: '' },
                                    { title: 'Multitools', url: '' },
                                    { title: 'Paint Tools', url: '' },
                                ],
                            },
                            {
                                title: 'Garden Equipment',
                                url: '',
                                links: [
                                    { title: 'Motor Pumps', url: '' },
                                    { title: 'Chainsaws', url: '' },
                                    { title: 'Electric Saws', url: '' },
                                    { title: 'Brush Cutters', url: '' },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
    {
        title: 'Shop',
        url: '/shop/category-grid-3-columns-sidebar',
        submenu: {
            type: 'menu',
            menu: [
                {
                    title: 'Shop Grid',
                    url: '/Emporia/shop/category-grid-3-columns-sidebar',
                    submenu: [
                        { title: '3 Columns Sidebar', url: '/Emporia/shop/category-grid-3-columns-sidebar' },
                        { title: '4 Columns Full', url: '/Emporia/shop/category-grid-4-columns-full' },
                        { title: '5 Columns Full', url: '/Emporia/shop/category-grid-5-columns-full' },
                    ],
                },
                { title: 'Shop List', url: '/Emporia/shop/category-list' },
                { title: 'Shop Right Sidebar', url: '/Emporia/shop/category-right-sidebar' },
                {
                    title: 'Product',
                    url: '/Emporia/shop/product-standard',
                    submenu: [
                        { title: 'Product', url: '/Emporia/shop/product-standard' },
                        { title: 'Product Alt', url: '/Emporia/shop/product-columnar' },
                        { title: 'Product Sidebar', url: '/Emporia/shop/product-sidebar' },
                    ],
                },
                { title: 'Cart', url: '/Emporia/shop/cart' },
                { title: 'Checkout', url: '/Emporia/shop/checkout' },
                { title: 'Order Success', url: '/Emporia/shop/checkout/success' },
                { title: 'Wishlist', url: '/Emporia/shop/wishlist' },
                { title: 'Compare', url: '/Emporia/shop/compare' },
                { title: 'Track Order', url: '/Emporia/shop/track-order' },
            ],
        },
    },
    {
        title: 'Account',
        url: '/account',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'Login', url: '/Emporia/login' },
                { title: 'Dashboard', url: '/Emporia/dashboard' },
                { title: 'Edit Profile', url: '/Emporia/account/profile' },
                { title: 'Order History', url: '/Emporia/account/orders' },
                { title: 'Order Details', url: '/Emporia/account/orders/5' },
                { title: 'Address Book', url: '/Emporia/account/addresses' },
                { title: 'Edit Address', url: '/Emporia/account/addresses/5' },
                { title: 'Change Password', url: '/Emporia/account/password' },
            ],
        },
    },
    {
        title: 'Blog',
        url: '/blog/category-classic',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'Blog Classic', url: '/Emporia/blog/category-classic' },
                { title: 'Blog Grid', url: '/Emporia/blog/category-grid' },
                { title: 'Blog List', url: '/Emporia/blog/category-list' },
                { title: 'Blog Left Sidebar', url: '/Emporia/blog/category-left-sidebar' },
                { title: 'Post Page', url: '/Emporia/blog/post-classic' },
                { title: 'Post Without Sidebar', url: '/Emporia/blog/post-full' },
            ],
        },
    },
    {
        title: 'Pages',
        url: '/site/about-us',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'About Us', url: '/Emporia/site/about-us' },
                { title: 'Contact Us', url: '/Emporia/site/contact-us' },
                { title: 'Contact Us Alt', url: '/Emporia/site/contact-us-alt' },
                { title: '404', url: '/Emporia/site/not-found' },
                { title: 'Terms And Conditions', url: '/Emporia/site/terms' },
                { title: 'FAQ', url: '/Emporia/site/faq' },
                { title: 'Components', url: '/Emporia/site/components' },
                { title: 'Typography', url: '/Emporia/site/typography' },
            ],
        },
    },
    {
        title: 'Buy Theme',
        url: 'https://themeforest.net/item/stroyka-tools-store-react-ecommerce-template/23909258',
        props: {
            external: true,
            target: '_blank',
        },
    },
];
