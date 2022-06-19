import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Gap } from "../../component";
import HeaderRekamMedis from "../RekamMedis/headerRekamMedis";
import ListHistorySwab from "./listHistorySwab";
import LeftSwab from "./leftSwab";
import moment from "moment";
import "moment/locale/id";
import jwtDecode from "jwt-decode";

export default function Swab() {
  const [value, setValue] = useState("");
  const [namaValue, setNamaValue] = useState("");
  const [nikValue, setNikValue] = useState("");
  const [placeOfBirthValue, setPlaceOfBirthValue] = useState("");
  const [birthdayValue, setBirthdayValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [dataHistorySwab, setDataHistorySwab] = useState([]);
  const [nameFocused, setNameFocused] = useState(false);
  const [golDarah, setGolDarah] = useState("");
  const [rhesus, setRhesus] = useState("");
  const [alergiValue, setAlergiValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [onSelected, setOnSelected] = useState(false);
  const [lihatHistory, setLihathistory] = useState(false);

  const [tanggalValue, setTanggalValue] = useState(moment().format("YYYY-MM"));
  const [state, setState] = useState({});
  useEffect(() => {}, [namaValue], [nikValue], [tanggalValue]);

  useEffect(() => {
    getDataHistorySwab();
  }, []);
  useEffect(() => {
    getDataHistorySwab();
  }, [onSelected]);
  console.log("dataHistorySwab", dataHistorySwab);
  const getDataHistorySwab = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    if (namaValue && nikValue && tanggalValue) {
      try {
        const response = await fetch(
          process.env.REACT_APP_URL +
            `/api/medis/swab?pasien=${namaValue}&nik=${nikValue}&tanggal=${moment(
              tanggalValue
            ).format("YYYY-MM")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        let res = await response.json();
        setDataHistorySwab(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const clearState = () => {
    setValue("");
    setState("");
    setNamaValue("");
    setNikValue("");
    setPlaceOfBirthValue("");
    setBirthdayValue("");
    setAgeValue("");
    setGenderValue("");
    setGolDarah("");
    setRhesus("");
    setDataHistorySwab("");
    setNameFocused(true);
  };
  return (
    <Grid container spacing={1} style={{ padding: "10px " }}>
      <Grid item xs={12} sm={6}>
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
            dataHistorySwab={dataHistorySwab}
            setDataHistorySwab={setDataHistorySwab}
            tanggalValue={tanggalValue}
            setTanggalValue={setTanggalValue}
            getDataHistorySwab={getDataHistorySwab}
            onSelected={() => setOnSelected(!onSelected)}
            nameFocused={nameFocused}
            setNameFocused={setNameFocused}
            golDarah={golDarah}
            setGolDarah={setGolDarah}
            rhesus={rhesus}
            setRhesus={setRhesus}
            alergiValue={alergiValue}
            setAlergiValue={setAlergiValue}
            open={open}
            setOpen={setOpen}
            lihatHistory={lihatHistory}
            setLihathistory={setLihathistory}
          />
        </div>
        <Gap height={93} />
        <LeftSwab
          namaValue={namaValue}
          nikValue={nikValue}
          clearState={clearState}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {" "}
        <Gap height={10} />
        <div className="head-template">
          <ListHistorySwab
            namaValue={namaValue}
            nikValue={nikValue}
            tanggalValue={tanggalValue}
            setTanggalValue={setTanggalValue}
            state={state}
            setState={setState}
            dataHistorySwab={dataHistorySwab}
            setDataHistorySwab={setDataHistorySwab}
            getDataHistorySwab={getDataHistorySwab}
            open={open}
            setOpen={setOpen}
            onSelected={() => setOnSelected(!onSelected)}
          />
        </div>
        <Gap height={4} />
      </Grid>
    </Grid>
  );
}
