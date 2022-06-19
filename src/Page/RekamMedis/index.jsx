import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import HeaderRekamMedis from "./headerRekamMedis";
import LeftRekamMedis from "./leftRekamMedis";
import ListHistory from "./listHistory";
import moment from "moment";
import "moment/locale/id";
import jwtDecode from "jwt-decode";

export default function ContainerRekamMedis() {
  const [value, setValue] = useState("");
  const [namaValue, setNamaValue] = useState("");
  const [nikValue, setNikValue] = useState("");
  const [placeOfBirthValue, setPlaceOfBirthValue] = useState("");
  const [birthdayValue, setBirthdayValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [alergiValue, setAlergiValue] = useState(null);
  const [dataHistory, setDataHistory] = useState();
  const [golDarah, setGolDarah] = useState("");
  const [rhesus, setRhesus] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [onSelected, setOnSelected] = useState(false);
  const [lihatHistory, setLihathistory] = useState(false);
  const [open, setOpen] = useState(false);
  const [tanggalValue, setTanggalValue] = useState(moment().format("YYYY-MM"));
  const [state, setState] = useState({});
  const handleSelect = (event) => {
    setTanggalValue(moment(event).format("YYYY-MM"));
  };

  useEffect(() => {}, [namaValue], [nikValue], [tanggalValue]);
  useEffect(() => {
    getDataHistory([]);
  }, []);
  useEffect(() => {
    getDataHistory([]);
  }, [onSelected]);

  const getDataHistory = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user");

      window.location.replace("/login");
      return false;
    }
    if (namaValue && nikValue && tanggalValue) {
      try {
        const response = await fetch(
          process.env.REACT_APP_URL +
            `/api/medis/data?pasien=${namaValue}&nik=${nikValue}&tanggal=${moment(
              tanggalValue
            ).format("YYYY-MM")}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        let res = await response.json();
        setDataHistory(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
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
    setDataHistory("");
    setOpen(false);
  };

  return (
    <Grid container spacing={1} style={{ padding: "10px " }}>
      <Grid item xs={6} item sm={6}>
        {" "}
        <Gap height={10} />
        <div className="head-template">
          <HeaderRekamMedis
            namaValue={namaValue}
            nikValue={nikValue}
            setNamaValue={setNamaValue}
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
            dataHistory={dataHistory}
            setDataHistory={setDataHistory}
            tanggalValue={tanggalValue}
            setTanggalValue={setTanggalValue}
            getDataHistory={getDataHistory}
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
            lihatHistory={lihatHistory}
            setLihathistory={setLihathistory}
          />
        </div>{" "}
        <Gap height={93} />
        <LeftRekamMedis
          namaValue={namaValue}
          nikValue={nikValue}
          alergiValue={alergiValue}
          setAlergiValue={setAlergiValue}
          clearState={clearState}
          nameFocused={nameFocused}
          setNameFocused={setNameFocused}
        />{" "}
      </Grid>
      <Grid item xs={6} item sm={6}>
        <Gap height={10} />

        <div className="head-template">
          <ListHistory
            namaValue={namaValue}
            nikValue={nikValue}
            tanggalValue={tanggalValue}
            setTanggalValue={setTanggalValue}
            state={state}
            setState={setState}
            dataHistory={dataHistory}
            setDataHistory={setDataHistory}
            getDataHistory={getDataHistory}
            lihatHistory={lihatHistory}
            setLihathistory={setLihathistory}
            onSelected={() => setOnSelected(!onSelected)}
          />
        </div>
        <Gap height={4} />
      </Grid>
    </Grid>
  );
}
