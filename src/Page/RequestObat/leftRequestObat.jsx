import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import FormRequestObat from "./formRequestObat";

export default function LeftRequestObat(props) {
  const {
    namaValue,
    nikValue,
    titleMenu,
    clearState,
    nameFocused,
    setNameFocused,
  } = props;

  return (
    <Grid container spacing={1} style={{ padding: "0px 5px" }}>
      {" "}
      <Grid container spacing={1}>
        <FormRequestObat
          namaValue={namaValue}
          nikValue={nikValue}
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
