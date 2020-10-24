import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Hidden } from "@material-ui/core";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import { GlobalContext } from "../context/GlobalState";
import Row from './Row'
import Spinner from "./layout/Spinner";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const createData = (name, golfer1, golfer2, golfer3, score, golfersData) => {
  return {
    name,
    golfer1,
    golfer2,
    golfer3,
    score,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
};

const ScoreTable = () => {
  const { player, data, getScoreData, loading } = useContext(GlobalContext);
  useEffect(() => {
    getScoreData();
    // eslint-disable-next-line
  }, []);

  
  const randomArr = Array.from({ length: 78 }, () =>
    Math.floor(Math.random() * 78)
  );
  let rows = []
  if (data.length === 0) {
    rows = [];
  } else {
    rows = [
      createData(
        "Conor Walsh",
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[0]].first_name} ${
              data.results.leaderboard[randomArr[0]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[1]].first_name} ${
              data.results.leaderboard[randomArr[1]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[2]].first_name} ${
              data.results.leaderboard[randomArr[2]].last_name
            } `,
        data.results.leaderboard[randomArr[0]].total_to_par +
          data.results.leaderboard[randomArr[1]].total_to_par +
          data.results.leaderboard[randomArr[2]].total_to_par
      ),
      createData(
        "James McGauran",
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[3]].first_name} ${
              data.results.leaderboard[randomArr[3]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[4]].first_name} ${
              data.results.leaderboard[randomArr[4]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[5]].first_name} ${
              data.results.leaderboard[randomArr[5]].last_name
            } `,
        data.results.leaderboard[randomArr[3]].total_to_par +
          data.results.leaderboard[randomArr[4]].total_to_par +
          data.results.leaderboard[randomArr[5]].total_to_par
      ),
      createData(
        "Mark Towey",
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[6]].first_name} ${
              data.results.leaderboard[randomArr[6]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[7]].first_name} ${
              data.results.leaderboard[randomArr[7]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[8]].first_name} ${
              data.results.leaderboard[randomArr[8]].last_name
            } `,
        data.results.leaderboard[randomArr[6]].total_to_par +
          data.results.leaderboard[randomArr[7]].total_to_par +
          data.results.leaderboard[randomArr[8]].total_to_par
      ),
      createData(
        "Brian Fahey",
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[12]].first_name} ${
              data.results.leaderboard[randomArr[12]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[13]].first_name} ${
              data.results.leaderboard[randomArr[13]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[14]].first_name} ${
              data.results.leaderboard[randomArr[14]].last_name
            } `,
        data.results.leaderboard[randomArr[12]].total_to_par +
          data.results.leaderboard[randomArr[13]].total_to_par +
          data.results.leaderboard[randomArr[14]].total_to_par
      ),
      createData(
        "Martin P Clarke",
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[9]].first_name} ${
              data.results.leaderboard[randomArr[9]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[10]].first_name} ${
              data.results.leaderboard[randomArr[10]].last_name
            } `,
        data.length === 0
          ? " "
          : `${data.results.leaderboard[randomArr[11]].first_name} ${
              data.results.leaderboard[randomArr[11]].last_name
            } `,
        data.results.leaderboard[randomArr[9]].total_to_par +
          data.results.leaderboard[randomArr[10]].total_to_par +
          data.results.leaderboard[randomArr[11]].total_to_par
      ),
    ];
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
            {rows.sort((a, b) => {
            if (a.score < b.score) {
              return -1;
            } else return 1;
          }).map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ScoreTable;
