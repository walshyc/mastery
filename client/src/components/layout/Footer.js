import React from "react";
import "fontsource-bree-serif";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    footer: {
      padding: 15,
      background: "#ECFEF6",
      display: "flex",
      height: 50,
      bottom: 0,
      width: "100%",
    },
    footerText: {
      color: "black",
      fontFamily: "Bree Serif",
      margin: 15,
      textDecoration: "none",
      flex: 1,
    },
  }));
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div style={{ margin: "15", flex: 1 }}>
        <Typography
          variant="subtitle"
          className={classes.footerText}
          component={RouterLink}
          to="/"
          align="center"
        >
          Made by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/walshy_c"
            style={{ textDecoration: "none", color: "#111" }}
          >
            walshyc
          </a>
        </Typography>
      </div>

      <div style={{ margin: "15", flex: 1 }}>
        <a target="_blank" rel="noreferrer" href="https://github.com/walshyc">
          <GitHubIcon
            style={{ marginRight: 20, color: "#111", fontSize: "1em" }}
          ></GitHubIcon>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:conorwalsh0703@gmail.com"
        >
          <EmailIcon
            style={{ marginRight: 20, color: "#111", fontSize: "1em" }}
          ></EmailIcon>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/walshy_c"
          style={{ marginRight: 20, color: "#111" }}
        >
          <TwitterIcon
            style={{ marginRight: 20, color: "#111", fontSize: "1rem" }}
          ></TwitterIcon>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
