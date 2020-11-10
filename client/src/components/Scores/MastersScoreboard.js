import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/GlobalState";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  tableContainer: {
    width: "100%",
  },
});

const MastersScoreboard = () => {
  const { data } = useContext(GlobalContext);
  let scores = [];
  if (data.results) {
    scores = data.results.leaderboard;
  }
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results &&
              scores
                .sort((a, b) => {
                  if (a.total_to_par > b.total_to_par) {
                    return 1;
                  } else return -1;
                })
                .map((row) => (
                  <TableRow key={row.player_id}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      style={{ width: "10px" }}
                    >
                      {`${row.last_name.toUpperCase()}, ${row.first_name.charAt(
                        0
                      )}`}
                    </TableCell>
                    <TableCell align="right" style={{ width: "10px" }}>
                      {row.total_to_par > 0
                        ? `+${row.total_to_par}`
                        : row.total_to_par}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MastersScoreboard;
