import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    fontSize: "0.8 rem",
    letterSpacing: "0.2em",
  },
});

export default function TeamCard(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ background: theme.palette.primary.light }}
      variant="outlined"
    >
      <CardContent className={classes.text}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography variant="body2" align="left">
              {props.selections.golferOne.position}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" align="left">
              <b>{`${props.selections.golferOne.last_name.toUpperCase()}`}</b>,{" "}
              {props.selections.golferOne.first_name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" align="left">
              {props.selections.golferOne.total_to_par > 0
                ? `+${props.selections.golferOne.total_to_par}`
                : props.selections.golferOne.total_to_par}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" align="left">
              {props.selections.golferTwo.position}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" align="left">
              <b>{`${props.selections.golferTwo.last_name.toUpperCase()}`}</b>,{" "}
              {props.selections.golferTwo.first_name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" align="left">
              {props.selections.golferTwo.total_to_par > 0
                ? `+${props.selections.golferTwo.total_to_par}`
                : props.selections.golferTwo.total_to_par}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" align="left">
              {props.selections.golferThree.position}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" align="left">
              <b>{`${props.selections.golferThree.last_name.toUpperCase()}`}</b>
              , {props.selections.golferThree.first_name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" align="left">
              {props.selections.golferThree.total_to_par > 0
                ? `+${props.selections.golferThree.total_to_par}`
                : props.selections.golferThree.total_to_par}
            </Typography>
          </Grid>
          <Divider
            variant="middle"
            style={{ width: "100%", height: 2, marginLeft: "0" }}
          />

          <Grid item xs={10}>
            <Typography variant="body2" align="left">
              <b>Total</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" align="left">
              {props.selections.golferOne.total_to_par +
                props.selections.golferTwo.total_to_par +
                props.selections.golferThree.total_to_par >
              0
                ? `+${
                    props.selections.golferOne.total_to_par +
                    props.selections.golferTwo.total_to_par +
                    props.selections.golferThree.total_to_par
                  }`
                : props.selections.golferOne.total_to_par +
                  props.selections.golferTwo.total_to_par +
                  props.selections.golferThree.total_to_par}
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
