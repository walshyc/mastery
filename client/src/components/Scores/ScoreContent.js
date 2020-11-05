import React from "react";
import ScoreTable from "./ScoreTable";
import CompetitionCard from "./CompetitionCard";
import { Grid } from "@material-ui/core";

const ScoreContent = () => {
  return (
    <Grid >
      <Grid item xs={12}>
        <CompetitionCard></CompetitionCard>
      </Grid>
      <Grid item xs={12}>
        <ScoreTable></ScoreTable>
      </Grid>
    </Grid>
  );
};

export default ScoreContent;
