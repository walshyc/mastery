import React, { useContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Hidden } from "@material-ui/core";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import { GlobalContext } from "../context/GlobalState";
import Row from "./Row";
import Spinner from "./layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";




const ScoreTable = () => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    tableHead: {
      background: '#009b77',
      color: '#ecfef6'
    },
    tableCell: {
      color: '#ecfef6'
    },
    table: {
      marginTop: '20px'
    },
  });
  const classes = useRowStyles();
  const { data, getScoreData, loading, getUsers, users, matchSelection } = useContext(
    GlobalContext
  );
  useEffect(() => {
    getScoreData();
    getUsers();
    // eslint-disable-next-line
  }, []);
  const createData = (
    name,
    golfer1,
    golferOneID,
    oneID,
    golfer2,
    golferTwoID,
    twoID,
    golfer3,
    golferThreeID,
    threeID,
    totalScore
  ) => {
    return {
      name,
      golfer1,
      golfer2,
      golfer3,
      totalScore,
      detail: [
        matchSelection(oneID)[0],
        matchSelection(twoID)[0],
        matchSelection(threeID)[0],
      ],
    };
  };

  const score = (id) =>
    data.results.leaderboard.find((g) => g.player_id === id).total_to_par;

  let rows = [];
  if (data.length === 0) {
    rows = [];
  } else {
    rows = users.filter((a) => {
      if ((typeof(a.selections) !== 'undefined' && a.selections != null)) {
        return true; // skip
      }
      return false;
    }).map((u) => {
      const name = u.name;
      let inside = u.selections.map((s) => {
        
        const row = createData(
          name,
          `${s.golferOne.first_name} ${s.golferOne.last_name}`,
          score(s.golferOne.player_id),
          s.golferOne.player_id,
          `${s.golferTwo.first_name} ${s.golferTwo.last_name}`,
          score(s.golferTwo.player_id),
          s.golferTwo.player_id,
          `${s.golferThree.first_name} ${s.golferThree.last_name}`,
          score(s.golferThree.player_id),
          s.golferThree.player_id,
          score(s.golferOne.player_id) +
            score(s.golferTwo.player_id) +
            score(s.golferThree.player_id)
        );
        return row;
      });
      return inside;
    });
  }
  let allScores = rows.reduce((a, b) => a.concat(b), []);

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <TableContainer component={Paper} >
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell />
              <TableCell >Name</TableCell>
              <Hidden xsDown>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon>
                </TableCell>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon>
                </TableCell>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon>
                </TableCell>
              </Hidden>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allScores
              .sort((a, b) => {
                if (a.score < b.score) {
                  return -1;
                } else return 1;
              })
              .map((row, index) => (
                <Row key={`${row.name}-${index}`} row={row} index={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ScoreTable;
