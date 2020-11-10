import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { GlobalContext } from "../../context/GlobalState";
import mastersImg from "../../static/images/masters1.png";
import Spinner from "../layout/Spinner";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import * as moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 20,
    marginTop: 20,
    flex: "1 2",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    backgroundColor: 'black',
    background: `linear-gradient(rgba(236, 254, 246,.9), rgba(236, 254, 246,.8)), url(${mastersImg})`,
    //padding: theme.spacing(8, 0, 6),
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    flex: 3,
  },
  media: {
    maxWidth: 400,
    flex: 1,
  },
  content: {
    flex: "1 auto",
  },
  icon: {
    paddingRight: 5,
   color: "#0ea463"
  },
  typography: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    color: "#101010",
  },
}));

export default function CompetitionCard() {
  const classes = useStyles();

  const { loading, data } = useContext(GlobalContext);
  const checkRound = (a) => {
    switch (a) {
      case 1:
        return "1st Round";
      case 2:
        return "2nd Round";
      case 3:
        return "3rd Round";
      case 4:
        return "4th Round";
      default:
        return "";
    }
  };

  // const updated = moment(new Date(data.results.tournament.live_details.updated).toISOString()).fromNow("");


  if (loading || !data || !data.results) {
    return <Spinner></Spinner>;
  }

  return (
    <Card className={classes.root}>
      <div className={classes.text}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" align="left">
            {data && data.results.tournament.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <GolfCourseIcon className={classes.icon}></GolfCourseIcon>{" "}
            {data && data.results.tournament.course}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <PublicIcon className={classes.icon}></PublicIcon>{" "}
            {data && data.results.tournament.country}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <BorderAllIcon className={classes.icon}></BorderAllIcon>

            {checkRound(data.results.tournament.live_details.current_round)}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <AccessTimeIcon className={classes.icon}></AccessTimeIcon>
            Updated {data.results && moment(new Date(data.results.tournament.live_details.updated).toISOString()).fromNow("")}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
