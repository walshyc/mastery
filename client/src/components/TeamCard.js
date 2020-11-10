import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function TeamCard(props) {
  const selections = Object.values(props.selections);
  const totalScore = selections.reduce((acc, s) => acc + s.total_to_par, 0);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ background: "#0EA463" }}>
          <TableRow>
            <TableCell style={{ color: "#ffffff" }}>Pos.</TableCell>
            <TableCell style={{ color: "#ffffff" }}>Player</TableCell>
            <TableCell style={{ color: "#ffffff" }} align="right">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selections &&
            selections.map((s) => {
              return (
                <TableRow key={s.player_id}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: "10px" }}
                  >
                    {s.position}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: "10px" }}
                  >
                    <b>{`${s.last_name.toUpperCase()}`}</b>, {s.first_name}
                  </TableCell>
                  <TableCell align="right" style={{ width: "10px" }}>
                    {s.total_to_par > 0 ? `+${s.total_to_par}` : s.total_to_par}
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
