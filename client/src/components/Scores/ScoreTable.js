import React, { useContext, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Hidden, useTheme } from "@material-ui/core";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import { GlobalContext } from "../../context/GlobalState";
import Row from "./Row";
import Alert from "@material-ui/lab/Alert";
import Spinner from "../layout/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import * as moment from "moment";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const ScoreTable = () => {
  const [refresh, setRefresh] = useState(false);

  const useRowStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    tableHead: {
      background: theme.palette.primary.main,
      color: "#ecfef6",
    },
    tableCell: {
      color: "#ecfef6",
    },
    table: {
      marginTop: "20px",
    },
  }));
  const classes = useRowStyles();
  const { data, loading, users, matchSelection, start } = useContext(
    GlobalContext
  );

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
    golfer4,
    golferFourID,
    fourID,
    totalScore
  ) => {
    return {
      name,
      golfer1,
      golfer2,
      golfer3,
      golfer4,
      totalScore,
      detail: [
        matchSelection(oneID)[0],
        matchSelection(twoID)[0],
        matchSelection(threeID)[0],
        matchSelection(fourID)[0],
      ],
    };
  };
  const theme = useTheme();
  const score = (id) =>
    data.results.leaderboard.find((g) => g.player_id === id).total_to_par;

  let rows = [];
  if (data.length === 0) {
    rows = [];
  } else {
    rows = users
      .filter((a) => {
        if (typeof a.selections !== "undefined" && a.selections != null) {
          return true; // skip
        }
        return false;
      })
      .map((u) => {
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
            `${s.golferFour.first_name} ${s.golferFour.last_name}`,
            score(s.golferFour.player_id),
            s.golferFour.player_id,
            score(s.golferOne.player_id) +
              score(s.golferTwo.player_id) +
              score(s.golferThree.player_id) +
              score(s.golferFour.player_id)
          );
          return row;
        });
        return inside;
      });
  }
  let allScores = rows.reduce((a, b) => a.concat(b), []);
  const date = moment("2020-11-12T12:00:00.000");
  if (Date.now() < date) {
    for (let i = allScores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = allScores[i];
      allScores[i] = allScores[j];
      allScores[j] = temp;
    }
  }

  const refreshPage = (e) => {
    setRefresh(!refresh);
  };



  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        {/* <Alert icon={<InfoIcon fontSize="inherit" />}>
          All selections will appear once the tournament begins.
        </Alert> */}
        <TableContainer component={Paper}>
          <Table size="small" aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell
                  onClick={refreshPage}
                  style={{ color: theme.palette.primary.light }}
                >
                  <AutorenewIcon style={{ marginTop: 5 }}></AutorenewIcon>{" "}
                </TableCell>
                <TableCell style={{ color: theme.palette.primary.light }}>
                  Name
                </TableCell>{" "}
                {Date.now() > start ? (
                  <TableCell
                    style={{ color: theme.palette.primary.light }}
                    align="left"
                  >
                    Score
                  </TableCell>
                ) : (
                  ""
                )}
                <Hidden xsDown>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon></PersonSharpIcon>
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {allScores
                .sort((a, b) => {
                  if (a.totalScore < b.totalScore) {
                    return -1;
                  } else return 1;
                })
                .map((row, index) => (
                  <Row key={`${row.name}-${index}`} row={row} index={index} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default ScoreTable;
