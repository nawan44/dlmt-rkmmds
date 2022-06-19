import React from "react";
import { Gap } from "../../component";
import { Divider, Typography } from "@material-ui/core";
import AutoComplete from "./autoComplete";
import { useLocation } from "react-router-dom";

export default function HeaderRekamMedis({
  setNamaValue,
  setNikValue,
  placeOfBirthValue,
  setPlaceOfBirthValue,
  birthdayValue,
  setBirthdayValue,
  valueState,
  setValueState,
  ageValue,
  setAgeValue,
  tanggalValue,
  setTanggalValue,
  genderValue,
  setGenderValue,
  getDataHistory,
  setDataHistory,
  namaValue,
  nikValue,
  onSelected,
  golDarah,
  setGolDarah,
  rhesus,
  setRhesus,
  nameFocused,
  setNameFocused,
  state,
  setState,
  dataHistorySwab,
  setDataHistorySwab,
  alergiValue,
  setAlergiValue,
  register,
  handleSubmit,
  watch,
  errors,
  reset,
  open,
  setOpen,
  lihatHistory,
  setLihathistory,
}) {
  let location = useLocation();

  const titleMenu = () => {
    if (location.pathname === "/swab") {
      return "Swab";
    } else if (location.pathname === "/rekam-medis") {
      return "Rekam Medis";
    } else if (location.pathname === "/data-obat") {
      return "Data Obat";
    } else if (location.pathname === "/data-laporan-sakit") {
      return "Data Laporan Sakit";
    } else if (location.pathname === "/input-laporan-sakit") {
      return "Input Laporan Sakit";
    } else if (location.pathname === "/") {
      return "Dashboard";
    }
  };
  return (
    <div>
      {" "}
      <Typography
        style={{
          textAlign: "left",
          padding: " 0 0 10px 20px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Input {titleMenu()}
      </Typography>
      <AutoComplete
        tanggalValue={tanggalValue}
        setTanggalValue={setTanggalValue}
        namaValue={namaValue}
        nikValue={nikValue}
        setNamaValue={setNamaValue}
        placeOfBirthValue={placeOfBirthValue}
        setPlaceOfBirthValue={setPlaceOfBirthValue}
        setNikValue={setNikValue}
        valueState={valueState}
        setValueState={setValueState}
        birthdayValue={birthdayValue}
        setBirthdayValue={setBirthdayValue}
        ageValue={ageValue}
        setAgeValue={setAgeValue}
        genderValue={genderValue}
        setGenderValue={setGenderValue}
        getDataHistory={getDataHistory}
        setDataHistory={setDataHistory}
        onSelected={onSelected}
        golDarah={golDarah}
        setGolDarah={setGolDarah}
        rhesus={rhesus}
        setRhesus={setRhesus}
        nameFocused={nameFocused}
        setNameFocused={setNameFocused}
        state={state}
        setState={setState}
        alergiValue={alergiValue}
        setAlergiValue={setAlergiValue}
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        dataHistorySwab={dataHistorySwab}
        setDataHistorySwab={setDataHistorySwab}
        reset={reset}
        open={open}
        setOpen={setOpen}
        lihatHistory={lihatHistory}
        setLihathistory={setLihathistory}
      />
      <Gap height={10} />
      <Divider />
      <Gap height={5} />
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Formulir {titleMenu()}
      </Typography>
    </div>
  );
}
