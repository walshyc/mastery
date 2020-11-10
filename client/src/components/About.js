import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  expanded: {
    background: "#12A564",
    color: "#ffffff",
  },
}));

export default function About() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginBottom: 15 }}>
          How to Play
        </Typography>{" "}
      </div>
      <div style={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={expanded === "panel1" ? classes.expanded : ""}
              />
            }
            className={expanded === "panel1" ? classes.expanded : ""}
          >
            <Typography className={classes.heading}>
              How can I enter?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              To enter you must first sign up <Link to="/signup">here.</Link>{" "}
              Then from your account page you can add a team. Each team
              comprises of 3 golfers, with restrictions on who you can select in
              each slot based on the Offical Golf World Rankings.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={expanded === "panel2" ? classes.expanded : ""}
              />
            }
            className={expanded === "panel2" ? classes.expanded : ""}
          >
            <Typography className={classes.heading}>
              How much does it cost?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              Each entry of 3 golfers cost €5. You can enter 3 teams for the
              special price of €12.50!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={expanded === "panel3" ? classes.expanded : ""}
              />
            }
            className={expanded === "panel3" ? classes.expanded : ""}
          >
            <Typography className={classes.heading}>
              How does the scoring work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              Each team's score is combined by adding the current score of each
              golfer. If your golfer misses the cut, their score after 2 rounds
              will remain fixed for the rest of the competition.
              <br></br>
              <br></br>
              If at the end of the competition, 2 or more entries are level on
              the same score, the tiebracker will be based on which team has the
              highest combined world ranking. The current world rankings can be
              viewed{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="http://www.owgr.com/ranking"
              >
                here.
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={expanded === "panel4" ? classes.expanded : ""}
              />
            }
            className={expanded === "panel4" ? classes.expanded : ""}
          >
            <Typography className={classes.heading}>
              How much can I win?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              Most of the entry fees are added to the prize fund, so the more
              entries, the more you can win! The winner will get 70% of the
              prize fun, 20% for 2nd place and 10% for 3rd place. Once the
              competition starts the total prize fund will be revaled.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={expanded === "panel5" ? classes.expanded : ""}
              />
            }
            className={expanded === "panel5" ? classes.expanded : ""}
          >
            <Typography className={classes.heading}>
              Where can I see my teams?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              You can view your teams in your{" "}
              <Link to="/account">account page.</Link> From your account page
              you can also add more teams.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}
