import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Hidden } from "@material-ui/core";
import * as moment from "moment";

const Row = (props) => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  const start = moment("2020-11-12T12:00:00.000");
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={
          props.index % 2 ? { background: "#ecfef6" } : { background: "ffffff" }
        }
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <b> {row.name}</b>
        </TableCell>

        {Date.now() > start ? (
          <>
            <TableCell  align="left">
              <b>
                {row.totalScore > 0 ? `+${row.totalScore}` : row.totalScore}
              </b>
            </TableCell>
            <Hidden xsDown>
              <TableCell>{row.golfer1}</TableCell>
              <TableCell>{row.golfer2}</TableCell>
              <TableCell>{row.golfer3}</TableCell>
              <TableCell>{row.golfer4}</TableCell>
            </Hidden>
          </>
        ) : (
          <Hidden xsDown>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </Hidden>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Pos.</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Selection
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Played
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Today
                      </TableCell>
                    </Hidden>
                    <TableCell style={{ fontWeight: "bold" }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Date.now() > start
                    ? row.detail
                        .sort((a, b) => {
                          if (a.position > b.position) {
                            return 1;
                          } else {
                            return -1;
                          }
                        })
                        .map((detailRow) => (
                          <TableRow key={detailRow.player_id}>
                            <TableCell width="10%" component="th" scope="row">
                              <b>{detailRow.position}</b>
                            </TableCell>
                            <TableCell width="70%" component="th" scope="row">
                              <b>{detailRow.last_name.toUpperCase()}</b>
                              {`, ${detailRow.first_name}`}
                            </TableCell>
                            <Hidden xsDown>
                              <TableCell width="10%" component="th" scope="row">
                                <b>{detailRow.holes_played}</b>
                              </TableCell>
                              <TableCell width="10%">
                                {
                                  detailRow.rounds[detailRow.rounds.length - 1]
                                    .total_to_par
                                }
                              </TableCell>
                            </Hidden>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              width="10%"
                            >
                              {detailRow.total_to_par > 0
                                ? `+${detailRow.total_to_par}`
                                : detailRow.total_to_par}
                            </TableCell>
                          </TableRow>
                        ))
                    : <TableRow>
                    <TableCell width="10%" component="th" scope="row">
                      
                    </TableCell>
                    <TableCell width="70%" component="th" scope="row">

                    </TableCell>
                    <Hidden xsDown>
                      <TableCell width="10%" component="th" scope="row">

                      </TableCell>
                      <TableCell width="10%">

                      </TableCell>
                    </Hidden>
                    <TableCell
                      style={{ fontWeight: "bold" }}
                      width="10%"
                    >

                    </TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
export default Row;
