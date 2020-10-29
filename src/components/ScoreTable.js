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

const createData = (
  name,
  golfer1,
  golferOneID,
  golfer2,
  golferTwoID,
  golfer3,
  golferThreeID,
  score
) => {
  return {
    name,
    golfer1,
    golfer2,
    golfer3,
    score,
    detail: [
      { golfer: golfer1, score: golferOneID },
      { golfer: golfer2, score: golferTwoID },
      { golfer: golfer3, score: golferThreeID },
    ],
  };
};

const ScoreTable = () => {
  const { data, getScoreData, loading, getUsers, users } = useContext(
    GlobalContext
  );
  useEffect(() => {
    getScoreData();
    getUsers();
    console.log(rows);
    // eslint-disable-next-line
  }, []);

  const score = (id) =>
    data.results.leaderboard.find((g) => g.player_id === id).total_to_par;

  let rows = [];
  if (data.length === 0) {
    rows = [];
  } else {
    rows = users.map((u) => {
      const name = u.name;
      let inside = u.selections.map((s) => {
        const row = createData(
          name,
          s.selections.golferOne.name,
          score(s.selections.golferOne.id),
          s.selections.golferTwo.name,
          score(s.selections.golferTwo.id),
          s.selections.golferThree.name,
          score(s.selections.golferThree.id),
          score(s.selections.golferOne.id) +
            score(s.selections.golferTwo.id) +
            score(s.selections.golferThree.id)
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <Hidden xsDown>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon> Golfer 1
                </TableCell>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon> Golfer 2
                </TableCell>
                <TableCell>
                  <PersonSharpIcon></PersonSharpIcon> Golfer 3
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
                <Row key={`${row.name}-${index}`} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ScoreTable;
