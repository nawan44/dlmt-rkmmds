import { Grid } from "@material-ui/core";
import React from "react";
import { Gap } from "../../component";
import FormRekamSwab from "./formRekamSwab";

export default function LeftSwab(props) {
  const { namaValue, nikValue, alergiValue, clearState } = props;

  return (
    <Grid container spacing={1} style={{ padding: "0px 5px" }}>
      {" "}
      <Grid container spacing={1}>
        <FormRekamSwab
          namaValue={namaValue}
          nikValue={nikValue}
          alergiValue={alergiValue}
          clearState={clearState}
        />{" "}
      </Grid>
      <Gap height={10} />
    </Grid>
  );
}
