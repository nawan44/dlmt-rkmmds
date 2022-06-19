import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import HeaderRequestObat from "./headerRequestObat";
import LeftRequestObat from "./leftRequestObat";

export default function ContainerRequestObat() {
  const [value, setValue] = useState("");
  const [namaValue, setNamaValue] = useState("");
  const [nikValue, setNikValue] = useState("");
  const [placeOfBirthValue, setPlaceOfBirthValue] = useState("");
  const [birthdayValue, setBirthdayValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [alergiValue, setAlergiValue] = useState(null);
  const [golDarah, setGolDarah] = useState("");
  const [rhesus, setRhesus] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [onSelected, setOnSelected] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [namaValue], [nikValue]);
  const clearState = () => {
    setValue("");
    setNamaValue("");
    setNikValue("");
    setPlaceOfBirthValue("");
    setBirthdayValue("");
    setAgeValue("");
    setGenderValue("");
    setGolDarah("");
    setRhesus("");
    setOpen(false);
  };
  return (
    <Grid
      container
      xs={10}
      sm={10}
      spacing={1}
      style={{
        paddingTop: "10px ",
        margin: "0 auto",
        textAlign: "center",
        width: "700px",
      }}
    >
      <Gap height={10} />
      <div
        className="head-template"
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        <HeaderRequestObat
          namaValue={namaValue}
          setNamaValue={setNamaValue}
          nikValue={nikValue}
          setNikValue={setNikValue}
          valueState={value}
          setValueState={setValue}
          placeOfBirthValue={placeOfBirthValue}
          setPlaceOfBirthValue={setPlaceOfBirthValue}
          birthdayValue={birthdayValue}
          setBirthdayValue={setBirthdayValue}
          ageValue={ageValue}
          setAgeValue={setAgeValue}
          genderValue={genderValue}
          setGenderValue={setGenderValue}
          golDarah={golDarah}
          setGolDarah={setGolDarah}
          rhesus={rhesus}
          setRhesus={setRhesus}
          onSelected={() => setOnSelected(!onSelected)}
          nameFocused={nameFocused}
          setNameFocused={setNameFocused}
          alergiValue={alergiValue}
          setAlergiValue={setAlergiValue}
          open={open}
          setOpen={setOpen}
        />
      </div>{" "}
      <Gap height={93} />
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <LeftRequestObat
          namaValue={namaValue}
          nikValue={nikValue}
          clearState={clearState}
          nameFocused={nameFocused}
          setNameFocused={setNameFocused}
        />
      </div>
    </Grid>
  );
}
