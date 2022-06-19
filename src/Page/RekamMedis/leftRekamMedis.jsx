import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Gap } from "../../component";
import FormRekamMedis from "./formRekamMedis";

export default function LeftRekamMedis(props) {
  const {
    namaValue,
    nikValue,
    alergiValue,
    titleMenu,
    clearState,

    nameFocused,
    setNameFocused,
  } = props;

  return (
    <Grid container spacing={1} style={{ padding: "0px 5px" }}>
      {" "}
      <Grid container spacing={1}>
        <FormRekamMedis
          namaValue={namaValue}
          nikValue={nikValue}
          alergiValue={alergiValue}
          titleMenu={titleMenu}
          clearState={clearState}
          nameFocused={nameFocused}
          setNameFocused={setNameFocused}
        />{" "}
      </Grid>
      <Gap height={10} />
    </Grid>
  );
}
