// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
import bg from "../../assets/bg.jpg";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
// import GridList from "@mui/material/GridList";
// import GridListTile from "@mui/material/GridListTile";
// import GridListTileBar from "@mui/material/GridListTileBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1500,
    height: 700,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const tileData = [
  {
    img:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    title: "COMMERCIAL",
  },
  {
    img:
      "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82",
    title: "Customer Care",
    featured: true,
  },
  {
    img: "https://uifaces.co/our-content/donated/KtCFjlD4.jpg",
    title: "Strategy & Management",
    featured: true,
  },
  {
    img:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    title: "Corporate Function",
  },

  {
    img: "https://uifaces.co/our-content/donated/n4Ngwvi7.jpg",
    title: "Supply Chain & Logistics",
  },
  {
    img: "https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
    title: "Marketing",
  },
  {
    img:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "Technology & Product",
  },
  {
    img:
      "https://images.pexels.com/photos/1394499/pexels-photo-1394499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Security & Risk",
  },
];

function SitePageCareers() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Careers", url: "" },
  ];
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Careers — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Departments</h1>
              <div className="document__subtitle">
                Join us to enter new level of your life
              </div>
              <div className={classes.root}>
                {/* <GridList
                  cellHeight={250}
                  spacing={30}
                  className={classes.gridList}
                >
                  <GridListTile
                    key="Subheader"
                    cols={4}
                    style={{ height: "auto" }}
                  >
                    <ListSubheader component="div"></ListSubheader>
                  </GridListTile>
                  {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                      <img src={tile.img} alt={tile.title} />
                      <GridListTileBar
                        title={tile.title}
                        actionIcon={
                          <IconButton
                            aria-label={`info about ${tile.title}`}
                            className={classes.icon}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList> */}
              </div>
            </div>

            <div className="document__header">
              <h1 className="document__title">Mission and Vision</h1>
            </div>
            <div className="document__content typography">
              <h2>Mission</h2>
              <p>
                Accelerating Progress In Southeast Asia Through Commerce &
                Technology
              </p>

              <h2>Vision</h2>

              <ol>
                <li>
                  <strong>Enter market of Southeast Asia</strong>
                </li>
                <li>
                  <strong>
                    Create millions of jobs in the eCommerce ecosystems
                  </strong>
                </li>
                <li>
                  <strong>Power real, profitable SMEs across SEA</strong>
                </li>
              </ol>

              <h2>Core Value</h2>

              <ol>
                <li>
                  <strong>
                    CUSTOMERS FIRST, EMPLOYEES SECOND, SHAREHOLDERS THIRD
                  </strong>
                  -This reflects our choice of what’s important in the order of
                  priority. Only by creating sustained customer value can
                  employees grow and shareholders achieve long-term benefit.
                </li>
                <li>
                  <strong>TRUST MAKES EVERYTHING SIMPLE</strong>-Trust is both
                  the most precious and fragile thing in the world. “Our Story”,
                  to keep only “Aliren and Lazadians” is a story of building and
                  cherishing trust. Complexity begets complexity, and simplicity
                  breeds simplicity. Lazadians are straightforward – what you
                  see is what you get. With trust, there is no second-guessing
                  or suspicion, and the result is simplicity and efficiency.
                </li>
                <li>
                  <strong>
                    TODAY’S BEST PERFORMANCE IS TOMORROW’S BASELINE
                  </strong>
                  -n Lazada’s most challenging times, this spirit has helped us
                  overcome difficulties and survive. In bad times, we know how
                  to motivate ourselves; in good times, we dare to set “dream
                  targets” (stretch goals). Face the future, or we regress. We
                  must shoot for the moon, challenge ourselves, motivate
                  ourselves and exceed ourselves.
                </li>
                <li>
                  <strong>IF NOT NOW, WHEN? IF NOT ME, WHO?</strong>-This was a
                  tagline in Alibaba’s first job advertisement and became our
                  first proverb. It is not a question, but a call of duty. This
                  proverb symbolizes the sense of ownership that each
                  Aliren-Lazadian must possess.
                </li>
                <li>
                  <strong>LIVE SERIOUSLY, WORK HAPPILY</strong>-“Work is now,
                  life is forever. What you do in your job is up to you, but you
                  have responsibility to the ones who love you. Enjoy work as
                  you enjoy life; treat life seriously as you do work. If you
                  live with purpose, you will find reward. You make Alibaba
                  different and make your loved ones proud. Everyone has their
                  own view of work and life; we respect each person’s choice.
                  Whether you live by this value depends on how you live your
                  life.” -- Jack Ma
                </li>
                <li>
                  <strong>CHANGE IS THE ONLY CONSTANT</strong>-Whether you
                  change or not, the world is changing, our customers are
                  changing and the competitive landscape is changing. We must
                  face change with respect and humility. Otherwise, we will fail
                  to see it, fail to respect it, fail to understand it and fail
                  to catch up with it.
                </li>
              </ol>

              <p>
                For information about how to contact us, please visit our
                <Link to="/site/contact-us"> contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageCareers;
