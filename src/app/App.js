import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import languages from "../i18n";
import { localeChange } from "../store/locale";
import Layout from "../components/Layout";
import HomePageTwo from "../components/home/HomePageTwo";
import "./App.scss";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/globalStyles";
import { lightTheme, darkTheme } from "../components/Themes";
import { useDarkMode } from "../components/useDarkMode";
import Toggle from "../components/Toggler";
import { GoogleOAuthProvider } from '@react-oauth/google';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en",
      toggled: true,
    };
    this.themeToggler = this.themeToggler.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const preloader = document.querySelector(".site-preloader");
      preloader.addEventListener("transitionend", (event) => {
        if (event.propertyName === "opacity") {
          preloader.parentNode.removeChild(preloader);
        }
      });
      preloader.classList.add("site-preloader__fade");
    }, 500);
    const { localeChange: changeLocale } = this.props;
    const direction = new URLSearchParams(window.location.search).get("dir");
    if (direction !== null) {
      changeLocale(direction === "rtl" ? "ar" : "en");
    }
  }

  shouldUpdateScroll = (prevRouterProps, { location }) =>
    prevRouterProps && location.pathname !== prevRouterProps.location.pathname;

  themeToggler() {
    this.state.theme === "light"
      ? window.localStorage.setItem("theme", "dark")
      : window.localStorage.setItem("theme", "light");
    this.state.theme === "light"
      ? window.localStorage.setItem(
        "themebackground",
        JSON.stringify(darkTheme)
      )
      : window.localStorage.setItem(
        "themebackground",
        JSON.stringify(lightTheme)
      );
    this.setState((prevState, props) => {
      return {
        theme: prevState.theme === "light" ? "dark" : "light",
      };
    });
    this.setState((prevState, props) => {
      return {
        themebackground: prevState.theme === "light" ? lightTheme : darkTheme,
      };
    });
  }

  render() {
    const { locale } = this.props;
    const { messages, direction } = languages[locale];
    return (
      <GoogleOAuthProvider clientId="1089726873361-rg2eh6mrmac947ofivkecl5mofo6naho.apps.googleusercontent.com">
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <IntlProvider locale={locale} messages={messages}>
          <Router>
            <HelmetProvider>
              <Helmet htmlAttributes={{ lang: locale, dir: direction }} />
              <Switch>
                <Route
                  path="/"
                  render={(props) => (
                    <Layout
                      {...props}
                      headerLayout="default"
                      homeComponent={HomePageTwo}
                    />
                  )}
                />
              </Switch>
            </HelmetProvider>
          </Router>
        </IntlProvider>
      </ThemeProvider>
      </GoogleOAuthProvider>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = (state) => ({
  locale: state.locale,
});

const mapDispatchToProps = {
  localeChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
