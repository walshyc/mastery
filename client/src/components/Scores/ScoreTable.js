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
  const {
    data,
    loading,
    users,
    matchSelection,
    start,
    getScoreData,
  } = useContext(GlobalContext);

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
  allScores.push({
    "name": "Clover",
    "golfer1": "Tiger Woofs",
    "golfer2": "Marc Leashman",
    "golfer3": "Rickie Growler",
    "golfer4": "C.T. Paw",
    "totalScore": -10,
    "detail": [
      {
        "position": 49,
        "player_id": 99628,
        "first_name": "Toger",
        "last_name": "Woofs",
        "country": "IRL",
        "holes_played": 10,
        "current_round": 2,
        "status": "active",
        "strokes": 74,
        "updated": "2020-11-13T22:50:03+00:00",
        "prize_money": "",
        "ranking_points": "",
        "total_to_par": -2,
        "rounds": [
          {
            "round_number": 1,
            "course_number": 1,
            "position_round": 69,
            "tee_time_local": "10:55",
            "total_to_par": 2,
            "strokes": 74,
            "updated": "2020-11-11T02:00:02+00:00"
          },
          {
            "round_number": 2,
            "course_number": 1,
            "position_round": 49,
            "tee_time_local": "14:30",
            "total_to_par": -2,
            "strokes": 0,
            "updated": "2020-11-13T15:30:05+00:00"
          }
        ]
      },
      {
        "position": 61,
        "player_id": 143893,
        "first_name": "Marc",
        "last_name": "Leashman",
        "country": "USA",
        "holes_played": 12,
        "current_round": 2,
        "status": "active",
        "strokes": 70,
        "updated": "2020-11-13T22:50:03+00:00",
        "prize_money": "",
        "ranking_points": "",
        "total_to_par": -6,
        "rounds": [
          {
            "round_number": 1,
            "course_number": 1,
            "position_round": 29,
            "tee_time_local": "10:33",
            "total_to_par": -2,
            "strokes": 70,
            "updated": "2020-11-11T02:00:01+00:00"
          },
          {
            "round_number": 2,
            "course_number": 1,
            "position_round": 61,
            "tee_time_local": "14:08",
            "total_to_par": 3,
            "strokes": 0,
            "updated": "2020-11-13T15:30:03+00:00"
          }
        ]
      },
      {
        "position": 75,
        "player_id": 103105,
        "first_name": "Rickie",
        "last_name": "Growler",
        "country": "ENG",
        "holes_played": 18,
        "current_round": 2,
        "status": "active",
        "strokes": 147,
        "updated": "2020-11-13T22:50:03+00:00",
        "prize_money": "",
        "ranking_points": "",
        "total_to_par": -2,
        "rounds": [
          {
            "round_number": 1,
            "course_number": 1,
            "position_round": 77,
            "tee_time_local": "14:48",
            "total_to_par": 1,
            "strokes": 73,
            "updated": "2020-11-11T02:00:03+00:00"
          },
          {
            "round_number": 2,
            "course_number": 1,
            "position_round": 75,
            "tee_time_local": "10:03",
            "total_to_par": 2,
            "strokes": 74,
            "updated": "2020-11-13T15:30:04+00:00"
          }
        ]
      },
      {
        "position": 85,
        "player_id": 75610,
        "first_name": "C.T",
        "last_name": "Paw",
        "country": "ITA",
        "holes_played": 18,
        "current_round": 2,
        "status": "active",
        "strokes": 150,
        "updated": "2020-11-13T22:50:03+00:00",
        "prize_money": "",
        "ranking_points": "",
        "total_to_par": -3,
        "rounds": [
          {
            "round_number": 1,
            "course_number": 1,
            "position_round": 85,
            "tee_time_local": "14:48",
            "total_to_par": 0,
            "strokes": 72,
            "updated": "2020-11-11T02:00:03+00:00"
          },
          {
            "round_number": 2,
            "course_number": 1,
            "position_round": 85,
            "tee_time_local": "10:03",
            "total_to_par": 6,
            "strokes": 78,
            "updated": "2020-11-13T15:30:04+00:00"
          }
        ]
      }
    ]
  })
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
    getScoreData();
    setRefresh(!refresh);
  };

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        {/* <Alert icon={<InfoIcon fontSize="inherit" />}>
          There is an issue with some golfers scores not showing correctly. <br></br>
          Hopefully it will be resolved soon!{" "}
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
