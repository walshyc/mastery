import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function TeamCard(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ background: theme.palette.secondary.main }}
      variant="outlined"
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <b>{`${props.selections.golferOne.last_name.toUpperCase()}`}</b>,{" "}
            {props.selections.golferOne.first_name}
          </Grid>
          <Grid item xs={4}>
            {props.selections.golferOne.total_to_par > 0
              ? `+${props.selections.golferOne.total_to_par}`
              : props.selections.golferOne.total_to_par}
          </Grid>
          <br></br>
          <Grid item xs={8}>
            <b>{`${props.selections.golferTwo.last_name.toUpperCase()}`}</b>,{" "}
            {props.selections.golferTwo.first_name}
          </Grid>
          <Grid item xs={4}>
            {props.selections.golferTwo.total_to_par > 0
              ? `+${props.selections.golferTwo.total_to_par}`
              : props.selections.golferTwo.total_to_par}
          </Grid>
          <Grid item xs={8}>
            <b>{`${props.selections.golferThree.last_name.toUpperCase()}`}</b>,{" "}
            {props.selections.golferThree.first_name}
          </Grid>
          <Grid item xs={4}>
            {props.selections.golferThree.total_to_par > 0
              ? `+${props.selections.golferThree.total_to_par}`
              : props.selections.golferThree.total_to_par}
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Total Score:{" "}
            {(props.selections.golferOne.total_to_par +
              props.selections.golferTwo.total_to_par +
              props.selections.golferThree.total_to_par) > 0 ? `+${props.selections.golferOne.total_to_par +
                props.selections.golferTwo.total_to_par +
                props.selections.golferThree.total_to_par}`: props.selections.golferOne.total_to_par +
                props.selections.golferTwo.total_to_par +
                props.selections.golferThree.total_to_par }</Typography>
            
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
