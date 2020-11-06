import React, { useEffect, useContext } from "react";
import ScoreTable from "./ScoreTable";
import CompetitionCard from "./CompetitionCard";
import { Grid } from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalState";
import Spinner from "../layout/Spinner";

const ScoreContent = () => {
  const { getScoreData, getUsers, loading, data } = useContext(GlobalContext);
  useEffect(() => {
    getScoreData();
   getUsers();
    console.log('loaded from score content')

    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <Grid>
      <Grid item xs={12}>
        <CompetitionCard data={data}></CompetitionCard>
      </Grid>
      <Grid item xs={12}>
        <ScoreTable></ScoreTable>
      </Grid>
    </Grid>
  );
};

export default ScoreContent;
