import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GlobalContext } from "../context/GlobalState";

export default function TeamCard(props) {
  const selections = Object.values(props.selections);

  const { matchSelection } = useContext(GlobalContext);

  const getScore = (id) => {
    const player = matchSelection(id);
    return player[0];
  };

  console.log(getScore(156988).total_to_par)

  const totalScore = selections.reduce(
    (acc, s) => acc + getScore(s.player_id).total_to_par,
    0
  );
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ background: "#0EA463" }}>
          <TableRow>
            <TableCell style={{ color: "#ffffff" }}>Pos.</TableCell>
            <TableCell style={{ color: "#ffffff" }}>Player</TableCell>
            <TableCell style={{ color: "#ffffff" }} align="right">Played</TableCell>
            <TableCell style={{ color: "#ffffff" }} align="right">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selections &&
            selections.sort((a, b) => {
              if (a.position > b.position) {
                return 1;
              } else {
                return -1;
              }
            }).map((s) => {
              return (
                <TableRow key={s.player_id}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: "10px" }}
                  >
                    {getScore(s.player_id).position}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: "10px" }}
                  >
                    <b>{`${s.last_name.toUpperCase()}`}</b>, {s.first_name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    style={{ width: "10px" }}
                  >
                    {getScore(s.player_id).holes_played}
                  </TableCell>
                  <TableCell align="right" style={{ width: "10px" }}>
                    {getScore(s.player_id).total_to_par > 0
                      ? `+${getScore(s.player_id).total_to_par}`
                      : getScore(s.player_id).total_to_par}
                  </TableCell>
                </TableRow>
              );
            })}
          <TableRow>
            <TableCell style={{ fontSize: "1.3em" }} align="right" colSpan={2}>
              <b>Total</b>
            </TableCell>
            <TableCell style={{ fontSize: "1.3em" }} align="right">
              <b>{totalScore > 0 ? `+${totalScore}` : totalScore}</b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
