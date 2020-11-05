import React, { useContext } from "react";
import { makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import PublicIcon from "@material-ui/icons/Public";
import { GlobalContext } from "../../context/GlobalState";
import masters from "../../static/images/masters.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 20,
    flex: "1 2",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    background: theme.palette.secondary.main,
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
  },
  typography: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10
  },
}));

export default function CompetitionCard() {
  const { data } = useContext(GlobalContext);
  const classes = useStyles();

  console.log(data.results.tournament);
  const { country, course, name,} = data.results.tournament;
  const { current_round } = data.results.tournament.live_details;

  const checkRound = () => {
    switch (current_round) {
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

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={masters}
        title="Augusta"
        component="img"
      />

      {/* <Hidden xsUp>
        <CardMedia
          className={classes.media}
          image={masters}
          title="Augusta"
          component="img"
        />
      </Hidden> */}
      <div className={classes.text}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" align="left">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <GolfCourseIcon className={classes.icon}></GolfCourseIcon> {course}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <PublicIcon className={classes.icon}></PublicIcon> {country}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            align="left"
            className={classes.typography}
          >
            <AccessTimeIcon className={classes.icon}></AccessTimeIcon>

            {checkRound()}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
