import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

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
    history: [
      { golfer: golfer1, score: golferOneID },
      { golfer: golfer2, score: golferTwoID },
      { golfer: golfer3, score: golferThreeID },
    ],
  };
};

const ScoreTable = () => {
  const { player, data, getScoreData, loading, getUsers, users } = useContext(
    GlobalContext
  );
  useEffect(() => {
    getScoreData();
    getUsers();
    // eslint-disable-next-line
  }, []);

  const randomArr = Array.from({ length: 78 }, () =>
    Math.floor(Math.random() * 78)
  );
  const score = (id) =>
    data.results.leaderboard.find((g) => g.player_id === id).total_to_par;
  let rows = [];
  if (data.length === 0) {
    rows = [];
  } else {
    console.log(score(144259));
    rows = users.map((u) => {
      console.log(score(u.selections.golferOne.id))
      const row = createData(
        u.name,
        u.selections.golferOne.name,
        score(u.selections.golferOne.id),
        u.selections.golferTwo.name,
        score(u.selections.golferTwo.id),
        u.selections.golferThree.name,
        score(u.selections.golferThree.id),
        score(u.selections.golferOne.id) +
          score(u.selections.golferTwo.id) +
          score(u.selections.golferThree.id)
      );

      return row;
    });
  }
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
              <Hidden smDown>
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
            {rows
              .sort((a, b) => {
                if (a.score < b.score) {
                  return -1;
                } else return 1;
              })
              .map((row) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ScoreTable;
