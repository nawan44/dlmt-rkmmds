import React from "react";
import { useState, useEffect } from "react";
import AutoSuggest from "react-autosuggest";
import { Grid, TextField, InputAdornment, Paper } from "@material-ui/core";

import mergeByKey from "array-merge-by-key";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

const AutoComplete = ({
  setNamaValue,
  namaValue,
  nikValue,
  setNikValue,
  placeOfBirthValue,
  setPlaceOfBirthValue,
  birthdayValue,
  setBirthdayValue,
  valueState,
  setValueState,
  setDataHistory,
  ageValue,
  setAgeValue,
  genderValue,
  setGenderValue,
  golDarah,
  setGolDarah,
  rhesus,
  setRhesus,
  onSelected,
  setNameFocused,
  alergiValue,
  setAlergiValue,
  dataHistorySwab,
  setDataHistorySwab,
  open,
  setOpen,
  lihatHistory,
  setLihathistory,
}) => {
  let location = useLocation();

  const [nicknameValue, setNicknameValue] = useState("");
  const [nicknameSuggestions, setNicknameSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [dataPasien, setDataPasien] = useState([]);
  const [dataAlergi, setDataAlergi] = useState([]);

  useEffect(() => {
    getDataPasien();
  }, []);
  useEffect(() => {
    getDataPasien();
  }, [alergiValue]);
  useEffect(() => {
    if (valueState === "") {
      getDataPasien();
    }
  }, [valueState]);
  const clearData = () => {
    if (valueState !== dataPasien.nama) {
      setNamaValue("");
      setNikValue("");
      setPlaceOfBirthValue("");
      setBirthdayValue("");
      setGenderValue("");
      setAgeValue("");
      setAlergiValue("");
      setGolDarah("");
      setRhesus("");
      setOpen(false);
      setLihathistory(false);
      if (location.pathname === "/swab") {
        setDataHistorySwab("");
      } else if (location.pathname === "/rekam-medis") {
        setDataHistory("");
      } else {
        console.log("tidak ada data");
      }
    }
  };
  const resus = () => {
    if (rhesus === "positive") {
      return golDarah + "+";
    } else if (rhesus === "negative") {
      return golDarah + "-";
    } else {
      return golDarah;
    }
  };

  const getDataPasien = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + `/api/medis/find?pasien=${valueState}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let res = await response.json();
      if (res.data) {
        setDataPasien(res.data);
      }
      if (res.data_alergi) {
        setDataAlergi(res.data_alergi);
      } else {
        console.log("data kosong");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  let merged = mergeByKey("nik", dataPasien, dataAlergi);
  // for (let i = 0; i < dataPasien.length; i++) {
  //   merged.push({
  //     ...dataPasien[i],
  //     ...dataAlergi[i],
  //   });
  // }
  // console.log(merged);
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return merged.filter((user) => regex.test(user.nama));
  }

  function getSuggestionNickname(suggestion) {
    return suggestion.nama;
  }
  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.nama} <br />
        NIK : {suggestion.nik}
        <br />
        TTL : {suggestion.place_of_birth} , {suggestion.birthday}
      </span>
    );
  }

  const onNicknameSuggestionSelected = (event, { suggestion }) => {
    setNamaValue(suggestion.nama);
    setNikValue(suggestion.nik);
    setPlaceOfBirthValue(suggestion.place_of_birth);
    setBirthdayValue(suggestion.birthday);
    setGenderValue(suggestion.gender);
    setAgeValue(suggestion.age);
    setAlergiValue(suggestion.alergi_obat);
    setGolDarah(suggestion.blood_group);
    setRhesus(suggestion.blood_rhesus);
    onSelected();
  };
  return (
    <div style={{ height: "148px" }}>
      {" "}
      <Paper component="form" className="paper-search">
        <AutoSuggest
          style={{
            width: "100%",
          }}
          suggestions={nicknameSuggestions}
          onSuggestionsClearRequested={() => setNicknameSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setNicknameValue(value);
            setNicknameSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={onNicknameSuggestionSelected}
          getSuggestionValue={getSuggestionNickname}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Nama Karyawan ...",
            value: valueState,
            onChange: (_, { newValue, method }) => {
              setValueState(newValue);
              clearData();
            },
            onFocus: setNameFocused(true),
            onBlur: (e) => setNameFocused(false),
            autoFocus: true,
          }}
          highlightFirstSuggestion={true}
        />
      </Paper>{" "}
      <div>
        <Grid
          container
          spacing={1}
          style={{ margin: "5px 10px", width: "99%" }}
        >
          <Grid item sm={6}>
            <TextField
              name="nama_karyawan"
              margin="dense"
              label=" Nama Karyawan"
              variant="outlined"
              className="text4"
              style={{ width: "100%" }}
              disabled
              name="nama_karyawan"
              value={namaValue}
            />{" "}
          </Grid>
          <Grid item sm={6}>
            <TextField
              margin="dense"
              label="Nomor Induk Karyawan (NIK)"
              variant="outlined"
              className="text4"
              value={nikValue}
              name="nik"
              disabled
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ margin: "2px 10px", width: "99%" }}
        >
          <Grid item sm={5}>
            <TextField
              margin="dense"
              label="Tempat, Tanggal Lahir"
              variant="outlined"
              className="text4"
              value={
                nikValue
                  ? placeOfBirthValue + ", " + birthdayValue
                  : placeOfBirthValue
              }
              disabled
              name="place_of_birth"
              style={{ width: "100%", margin: "0 5px 0 0" }}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              margin="dense"
              label="Umur"
              variant="outlined"
              style={{ width: "90%", margin: "0 5px 0 5px" }}
              className="text4"
              value={ageValue}
              disabled
              name="age"
              InputProps={{
                endAdornment: (
                  <InputAdornment className="text4" position="end">
                    th
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={2}>
            {" "}
            <TextField
              margin="dense"
              label="Gender"
              value={genderValue}
              disabled
              name="gender"
              style={{ width: "100%", margin: "0 5px 0 0" }}
              variant="outlined"
              className="text4"
            />
          </Grid>{" "}
          <Grid item sm={3}>
            <TextField
              margin="dense"
              label="Gol. Darah"
              value={resus()}
              disabled
              name="golDarah"
              style={{ width: "100%", margin: "0 5px 0 5px" }}
              variant="outlined"
              className="text4"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AutoComplete;
