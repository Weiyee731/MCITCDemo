// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import {
  Redirect,
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// application
import Footer from "./footer";
import Header from "./header";
import MobileHeader from "./mobile/MobileHeader";
import MobileMenu from "./mobile/MobileMenu";
import Quickview from "./shared/Quickview";

// pages
import SitePageAffiliate from "./site/SitePageAffiliate";
import SitePageCareers from "./site/SitePageCareers";
import AccountLayout from "./account/AccountLayout";
import BlogPageCategory from "./blog/BlogPageCategory";
import BlogPagePost from "./blog/BlogPagePost";
import PageCart from "./shop/ShopPageCart";
import PageCheckout from "./shop/ShopPageCheckout";
import PageCompare from "./shop/ShopPageCompare";
import PageWishlist from "./shop/ShopPageWishlist";
import ShopPageCategory from "./shop/ShopPageCategory";
import ShopPageOrderSuccess from "./shop/ShopPageOrderSuccess";
import ShopPageProduct from "./shop/ShopPageProduct";
import ShopPageTrackOrder from "./shop/ShopPageTrackOrder";
import SitePageAboutUs from "./site/SitePageAboutUs";
import SitePagePolicy from "./site/SitePagePolicy";
import SitePageCampaignCondition from "./site/SitePageCampaignCondition";
import SitePageTicketForm from "./site/SitePageTicketForm";
import SitePageComponents from "./site/SitePageComponents";
import SitePageContactUs from "./site/SitePageContactUs";
import SitePageContactUsAlt from "./site/SitePageContactUsAlt";
import SitePageFaq from "./site/SitePageFaq";
import SitePageNotFound from "./site/SitePageNotFound";
import SitePageTerms from "./site/SitePageTerms";
import SitePageTypography from "./site/SitePageTypography";
import SitePageHowToBuy from "./site/SitePageHowToBuy";
import SitePageHowToReturn from "./site/SitePageHowToReturn";
import SitePageShippingDelivery from "./site/sitePageShippingDelivery";
import BlockCategoryDetails from "./blocks/BlockCategoryDetails";
import BlockAllProductCategory from "./blocks/BlockAllProductCategory";

// data stubs
import SideBarMenu from "../components/navigationsidebar/SideBarMenu";
import Login from "../pages/login/login.component";
import ResetPassword from "../pages/login/resetPassword.component";
import SignUp from "../pages/signup/signup.component";
import ProductDetailsComponent from "../pages/productDetails/productDetails.component";
import AddProductComponent from "../pages/addProduct/addProduct.component";
import AddSuppliersComponent from "../pages/addSuppliers/addSuppliers.component";
import ViewProductComponent from "../pages/viewProduct/viewProduct.component";
import ViewSupplierComponent from "../pages/viewSupplier/viewSupplier.component";
import DashboardComponent from "../pages/dashboard/dashboard.component";
import viewProductEndorsementComponent from "../pages/viewProductEndorsement/viewProductEndorsement.component";
import ViewSupplierEndorsementComponent from "../pages/viewSupplierEndorsement/viewSupplierEndorsement.component";
import ColorPickerComponent from "../pages/ColorPicker/ColorPicker.component";
import ViewProductCategoryComponent from "../pages/viewProductCategories/viewProductCategories.component";
import AddProductCategoryComponent from "../pages/addProductCategory/addProductCategory.component";
import ViewProductVariationComponent from "../pages/viewProductVariation/viewProductVariation.component";
import ViewReviewComponent from "../pages/viewReview/viewReview.component";
import ProductStockInComponent from "../pages/productStockIn/productStockIn.component";
import Cookie from "universal-cookie";
import userProfile from "../pages/userProfile/userProfile.component";
import addPromotionBannerComponent from "../pages/addPromotionBanner/addPromotionBanner";
import ViewProductPromotionComponent from "../pages/viewProductPromotion/viewProductPromotion.component";
import ViewSettingsComponent from "../pages/viewSettings/viewSettings.component";
import addPromoCodeComponent from "../pages/addPromoCode/addPromoCode.component";
import ViewTransactionsComponent from "../pages/viewTransactions/viewTransactions.component";
import ViewPromoCodes from "../pages/viewPromoCodes/viewPromoCodes.component";
import ViewPromoCodesDetails from "../pages/promoCodeDetails/promoCodeDetails.component";
import TransactionDetailsComponent from "../pages/transactionDetails/transactionDetails.component";
import viewUserComponent from "../pages/viewUser/viewUser.component";
import AddManualStockInComponent from "../pages/addManualStockIn/addManualStockIn.component";
import ViewProductOrders from "../pages/viewProductOrders/viewProductOrders.component";
import ViewStockInEndorsementComponent from "../pages/viewStockInEndorsement/viewStockInEndorsement.component";
import ViewPromotionBanner from "../pages/viewPromotionBanners/viewPromotionBanner.component";
import addPromotion from "../pages/addPromotion/addPromotion.component";
import supplierResponse from "../pages/supplierResponse/supplierResponse.component";
import ViewProductStockOutComponent from "../pages/viewProductStockOut/viewProductStockOut.component";
import ViewStockOutDetailsComponent from "../pages/viewStockOutDetails/viewStockOutDetails.component";
// import ViewReceivableComponent from "../pages/viewReceivable/viewReceivable.component";
import ViewDeliverableComponent from "../pages/viewDeliverableTransaction/viewDeliverableTransaction.component";
// import viewUserMail from "../pages/viewUserMail/viewUserMail.component";

import AddProductAllInOne from "../pages/addProduct/addProductAllInOne.component";

const cookie = new Cookie();

const categoryLayouts = [
  [
    "/shop/category-grid-3-columns-sidebar",
    { columns: 3, viewMode: "grid", sidebarPosition: "start" },
  ],
  ["/shop/category-grid-4-columns-full", { columns: 4, viewMode: "grid" }],
  ["/shop/category-grid-5-columns-full", { columns: 5, viewMode: "grid" }],
  [
    "/shop/category-list",
    { columns: 3, viewMode: "list", sidebarPosition: "start" },
  ],
  [
    "/shop/category-right-sidebar",
    { columns: 3, viewMode: "grid", sidebarPosition: "end" },
  ],
].map(([url, options]) => (
  <Route
    key={url}
    exact
    path={url}
    render={(props) => (
      <ShopPageCategory {...props} {...options} categorySlug="power-tools" />
    )}
  />
));

const productLayouts = [
  ["/shop/product-standard", { layout: "standard" }],
  ["/shop/product-columnar", { layout: "columnar" }],
  ["/shop/product-sidebar", { layout: "sidebar" }],
].map(([url, options]) => (
  <Route
    key={url}
    exact
    path={url}
    render={(props) => (
      <ShopPageProduct
        {...props}
        {...options}
        productSlug={props.match.params.productSlug}
      // productSlug="brandix-screwdriver-screw1500acc"
      />
    )}
  />
));

const Access = () => {
  if (localStorage.getItem("isLogin") === false || localStorage.getItem("isLogin") === null) {
    return (
      <Router basename={"/Emporia"}>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/Emporia/login"}>
                Emporia
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Emporia/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Emporia/signup"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route path="/" component={Login} />
                <Route
                  exact
                  path="/resetPassword/:resetPasswordID"
                  render={(props) => (
                    <ResetPassword
                      {...props}
                      resetPasswordID={props.match.params.resetPasswordID}
                    />
                  )}
                />
                <Route path="/login" component={Login} />
                {/* <Route path="/resetPassword" component={ResetPassword}/> */}
                <Route path="/Emporia/signup" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  } else {
    return (
      <div
        className={"app"}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <div className={"page-wrapper default-theme toggled"}>
          <SideBarMenu
            lang={"en"}
            image={false}
            collapsed={false}
            rtl={false}
            toggled={false}
          />
        </div>
        <div
          style={{
            height: "100%",
            overflow: "scroll",
            boxSizing: "content-box",
            width: "100%",
          }}
        >
          <Switch>
            <Route path="/productDetails" component={ProductDetailsComponent} />
            <Route path="/dashboard" component={DashboardComponent} />
            <Route path="/viewTrend" component={DashboardComponent} />
            <Route path="/ColorPicker" component={ColorPickerComponent} />
            <Route path="/viewProduct" component={ViewProductComponent} />
            <Route path="/viewOrder" component={ViewProductComponent} />
            <Route
              path="/viewTransactioDetails"
              component={TransactionDetailsComponent}
            />
            <Route path="/addProduct" component={AddProductComponent} />
            <Route path="/addSuppliers" component={AddSuppliersComponent} />
            <Route path="/Emporia/login" component={Login} />
            <Route
              exact
              path="/resetPassword/:resetPasswordID"
              render={(props) => (
                <ResetPassword
                  {...props}
                  resetPasswordID={props.match.params.resetPasswordID}
                />
              )}
            />
            {/* <Route path="/resetPassword" component={ResetPassword}/> */}
            <Route path="/signup" component={SignUp} />
            <Route path="/viewSaleByProduct" component={ViewProductComponent} />
            <Route path="/viewSettings" component={ViewSettingsComponent} />
            <Route
              path="/viewTargetCustomer"
              component={ViewProductComponent}
            />
            {/* <Route path="/viewReceivable" component={ViewReceivableComponent} /> */}
            <Route
              path="/viewDeliverableTransaction"
              component={ViewDeliverableComponent}
            />
            <Route path="/viewPriceAnalysis" component={ViewProductComponent} />
            <Route
              path="/viewProductAnalysis"
              component={ViewProductComponent}
            />
            <Route
              path="/viewSalesByCategory"
              component={ViewProductComponent}
            />
            <Route path="/viewSales" component={ViewProductComponent} />
            <Route path="/viewWishlist" component={ViewProductComponent} />
            <Route path="/viewSupplier" component={ViewSupplierComponent} />
            <Route
              path="/viewSupplierEndorsement"
              component={ViewSupplierEndorsementComponent}
            />
            <Route
              path="/viewProductCategories"
              component={ViewProductCategoryComponent}
            />
            <Route
              path="/addProductCategory"
              component={AddProductCategoryComponent}
            />
            <Route
              path="/viewProductEndorsement"
              component={viewProductEndorsementComponent}
            />
            <Route
              path="/viewProductVariation"
              component={ViewProductVariationComponent}
            />
            <Route path="/viewReviews" component={ViewReviewComponent} />
            <Route path="/viewProfile" component={userProfile} />
            <Route
              path="/productStocksIn"
              component={ProductStockInComponent}
            />
            <Route
              path="/manualproductStocksIn"
              component={AddManualStockInComponent}
            />
            <Route
              path="/viewProductStockOut"
              component={ViewProductStockOutComponent}
            />
            <Route
              path="/viewStockOutDetail"
              component={ViewStockOutDetailsComponent}
            />
            <Route
              path="/viewProductPromotion"
              component={ViewProductPromotionComponent}
            />
            <Route
              path="/addPromotionBanner"
              component={addPromotionBannerComponent}
            />
            <Route path="/addPromoCode" component={addPromoCodeComponent} />
            <Route path="/viewTransaction" component={ViewTransactionsComponent} />
            <Route path="/viewPromoCodes" component={ViewPromoCodes} />
            <Route
              path="/viewPromoCodesDetails"
              component={ViewPromoCodesDetails}
            />
            <Route path="/viewUser" component={viewUserComponent} />
            <Route path="/viewProductOrders" component={ViewProductOrders} />
            <Route
              path="/viewStockEndorsement"
              component={ViewStockInEndorsementComponent}
            />
            <Route
              path="/viewPromotionBanner"
              component={ViewPromotionBanner}
            />
            <Route path="/addPromotion" component={addPromotion} />
            <Route path="/supplierResponse" component={supplierResponse} />

            <Route path="/addProductsAllIn" component={AddProductAllInOne} />
            {/* <Route path="/viewUserMail" component={viewUserMail} /> */}
            {/* <Route path="/sendUserMail" component={sendUserMail} /> */}
          </Switch>
        </div>
      </div>
    );
  }
};

function Layout(props) {
  const { match, headerLayout, homeComponent } = props;
  return (
    <React.Fragment>
      <Helmet></Helmet>
      <ToastContainer autoClose={5000} hideProgressBar />
      <Quickview />
      <MobileMenu />
      {localStorage.getItem("management") === "true" ? (
        Access()
      ) : (
        <div className="site">
          <header className="site__header d-lg-none">
            <MobileHeader />
          </header>

          <header className="site__header d-lg-block d-none">
            <Header layout={headerLayout} />
          </header>

          <div className="site__body" style={{ backgroundColor: "#f5f5f5" }}>
            <Switch>
              <Route exact path={`${match.path}`} component={homeComponent} />
              <Redirect exact from="/shop" to="/shop/catalog" />
              <Route
                exact
                path="/shop/catalog"
                render={(props) => (
                  <ShopPageCategory
                    {...props}
                    columns={3}
                    viewMode="grid"
                    sidebarPosition="start"
                  />
                )}
              />
              <Route
                exact
                path="/shop/catalog/:categorySlug"
                render={(props) => (
                  <ShopPageCategory
                    {...props}
                    columns={3}
                    viewMode="grid"
                    sidebarPosition="start"
                    categorySlug={props.match.params.categorySlug}
                  />
                )}
              />
              {/* {categoryLayouts} */}
              <Route
                exact
                path="/shop/products/:productSlug"
                render={(props) => (
                  <ShopPageProduct
                    {...props}
                    layout="standard"
                    productSlug={props.match.params.productSlug}
                  />
                )}
              />
              {productLayouts}
              <Route exact path="/shop/cart" component={PageCart} />
              <Route exact path="/shop/checkout" component={PageCheckout} />
              <Route
                exact
                path="/shop/checkout/success"
                component={ShopPageOrderSuccess}
              />
              <Route exact path="/shop/wishlist" component={PageWishlist} />
              <Route exact path="/shop/compare" component={PageCompare} />
              <Route
                exact
                path="/shop/track-order"
                component={ShopPageTrackOrder}
              />
              <Redirect exact from="/blog" to="/blog/category-classic" />
              <Route
                exact
                path="/blog/category-classic"
                render={(props) => (
                  <BlogPageCategory
                    {...props}
                    layout="classic"
                    sidebarPosition="end"
                  />
                )}
              />
              <Route
                exact
                path="/blog/category-grid"
                render={(props) => (
                  <BlogPageCategory
                    {...props}
                    layout="grid"
                    sidebarPosition="end"
                  />
                )}
              />
              <Route
                exact
                path="/blog/category-list"
                render={(props) => (
                  <BlogPageCategory
                    {...props}
                    layout="list"
                    sidebarPosition="end"
                  />
                )}
              />
              <Route
                exact
                path="/blog/category-left-sidebar"
                render={(props) => (
                  <BlogPageCategory
                    {...props}
                    layout="classic"
                    sidebarPosition="start"
                  />
                )}
              />
              <Route
                exact
                path="/blog/post-classic"
                render={(props) => (
                  <BlogPagePost
                    {...props}
                    layout="classic"
                    sidebarPosition="end"
                  />
                )}
              />
              <Route
                exact
                path="/blog/post-full"
                render={(props) => <BlogPagePost {...props} layout="full" />}
              />
              <Route exact path="/Emporia/login" component={Login} />
              <Route
                exact
                path="/resetPassword/:resetPasswordID"
                render={(props) => (
                  <ResetPassword
                    {...props}
                    resetPasswordID={props.match.params.resetPasswordID}
                  />
                )}
              />
              {/* <Route path="/resetPassword" component={ResetPassword}/> */}
              <Route exact path="/signup" component={SignUp} />
              <Route path="/account" component={AccountLayout} />

              <Redirect exact from="/site" to="/site/about-us" />
              <Route exact path="/site/about-us" component={SitePageAboutUs} />
              <Route exact path="/site/policy" component={SitePagePolicy} />
              <Route
                exact
                path="/site/campaigncondition"
                component={SitePageCampaignCondition}
              />
              <Route exact path="/site/Form" component={SitePageTicketForm} />

              <Route
                exact
                path="/site/components"
                component={SitePageComponents}
              />
              <Route
                exact
                path="/site/affiliate"
                component={SitePageAffiliate}
              />
              <Route exact path="/site/careers" component={SitePageCareers} />
              <Route
                exact
                path="/site/contact-us"
                component={SitePageContactUs}
              />
              <Route
                exact
                path="/site/contact-us-alt"
                component={SitePageContactUsAlt}
              />
              <Route
                exact
                path="/site/not-found"
                component={SitePageNotFound}
              />
              <Route exact path="/site/howtobuy" component={SitePageHowToBuy} />
              <Route exact path="/site/faq" component={SitePageFaq} />
              <Route
                exact
                path="/site/howtoreturn"
                component={SitePageHowToReturn}
              />
              <Route exact path="/site/terms" component={SitePageTerms} />
              <Route
                exact
                path="/site/shippingdelivery"
                component={SitePageShippingDelivery}
              />
              <Route
                exact
                path="/site/typography"
                component={SitePageTypography}
              />
              <Route
                exact
                path="/shop/ProductCategory/:categoryID/:categorySlug"
                render={(props) => (
                  <BlockCategoryDetails
                    {...props}
                    layout="standard"
                    categorySlug={props.match.params.categorySlug}
                    categoryID={props.match.params.categoryID}
                  />
                )}
              />
              <Route
                exact
                path="/shop/ProductCategory/:parentCategoryID/:categorySlug/:categoryID/:childcategorySlug"
                render={(props) => (
                  <BlockCategoryDetails
                    {...props}
                    layout="standard"
                    categorySlug={props.match.params.categorySlug}
                    childcategorySlug={props.match.params.childcategorySlug}
                    categoryID={props.match.params.categoryID}
                    parentCategoryID={props.match.params.parentCategoryID}
                  />
                )}
              />
              <Route
                exact
                path="/shop/AllProductCategory/"
                render={(props) => (
                  <BlockAllProductCategory
                    {...props}
                    layout="standard"
                  />
                )}
              />
              <Route component={SitePageNotFound} />
            </Switch>
          </div>
          <footer className="site__footer">
            <Footer />
          </footer>
        </div>
      )}
    </React.Fragment>
  );
}

Layout.propTypes = {
  headerLayout: PropTypes.oneOf(["default", "compact"]),
  homeComponent: PropTypes.elementType.isRequired,
};

Layout.defaultProps = {
  headerLayout: "default",
};

export default Layout;
