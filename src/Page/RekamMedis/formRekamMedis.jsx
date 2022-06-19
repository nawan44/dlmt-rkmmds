import {
  FormLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  InputAdornment,
  Divider,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import AddObat from "./addObat";
import moment from "moment";
import "moment/locale/id";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { useSnackbar } from "notistack";

export default function FormRekamMedis(props) {
  const {
    namaValue,
    nikValue,
    alergiValue,
    dataHistory,
    selectListHistory,
    itemHistory,
    aksiHistory,
    clearState,
    nameFocused,
    setNameFocused,
    lihatHistory,
    setLihathistory,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const nama = namaValue;
  const nik = nikValue;
  const alergiObat = alergiValue;
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [times, setTimes] = useState({});
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [errorKelainan, setErrorKelainan] = useState(false);
  const [idNamaObat, setIdNamaObat] = useState([]);

  useEffect(() => {
    setInterval(() => setTimes(moment().format("DD MMMM YYYY")), 1000);
  });
  useEffect(() => {
    setState({
      ...state,
      nama: namaValue,
      nik: nikValue,
      alergiObat: alergiValue,
    });
  }, [namaValue, nikValue, alergiValue, itemHistory?.tanggal]);
  const [state, setState] = useState({
    nama: itemHistory ? itemHistory.nama : null,
    nik: itemHistory ? itemHistory.nik : null,
    keluhan: itemHistory ? itemHistory.keluhan_utama : null,
    tanggal: itemHistory ? itemHistory.created_at : null,
    alergiObat: itemHistory ? itemHistory.alergi_obat : null,
    tinggi: itemHistory ? itemHistory.pemeriksaan_fisik.tinggi_badan : null,
    berat: itemHistory ? itemHistory.pemeriksaan_fisik.berat_badan : null,
    nadi: itemHistory ? itemHistory.pemeriksaan_fisik.nadi : null,
    tekanan_darah: itemHistory
      ? itemHistory.pemeriksaan_fisik.tekanan_darah
      : null,
    respirasi: itemHistory ? itemHistory.pemeriksaan_fisik.respirasi : null,
    suhu: itemHistory ? itemHistory.pemeriksaan_fisik.suhu : null,
    ca_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.ca_kanan
      : "minus",
    ca_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.ca_kiri
      : "minus",

    si_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.si_kanan
      : "minus",
    si_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.si_kiri
      : "minus",
    isokor_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.isokor_kanan
      : "plus",
    isokor_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.isokor_kiri
      : "plus",
    reflek_cahaya_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.reflek_cahaya_kanan
      : "plus",
    reflek_cahaya_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.reflek_cahaya_kiri
      : "plus",
    caries: itemHistory ? itemHistory.pemeriksaan_fisik.kepala.caries : "minus",
    kgb_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.kgb_kanan
      : "minus",
    kgb_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.kepala.kgb_kiri
      : "minus",

    reguler_irreguler: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.reguler_irreguler
      : "reguler",
    bj: itemHistory ? itemHistory.pemeriksaan_fisik.thorax.bj : null,
    murmur: itemHistory ? itemHistory.pemeriksaan_fisik.thorax.murmur : "minus",
    vbs_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.vbs_kanan
      : "plus",
    vbs_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.vbs_kiri
      : "plus",
    rh_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.rh_kanan
      : "minus",
    rh_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.rh_kiri
      : "minus",
    w_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.w_kanan
      : "minus",
    w_kiri: itemHistory ? itemHistory.pemeriksaan_fisik.thorax.w_kiri : "minus",
    slem_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.slem_kanan
      : "minus",
    slem_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.thorax.slem_kiri
      : "minus",
    distensi: itemHistory
      ? itemHistory.pemeriksaan_fisik.abdomen.distensi
      : "minus",
    bu: itemHistory ? itemHistory.pemeriksaan_fisik.abdomen.bu : "normal",
    massa: itemHistory ? itemHistory.pemeriksaan_fisik.abdomen.massa : "minus",
    cva_kanan: itemHistory
      ? itemHistory.pemeriksaan_fisik.abdomen.cva_kanan
      : "minus",
    cva_kiri: itemHistory
      ? itemHistory.pemeriksaan_fisik.abdomen.cva_kiri
      : "minus",
    nt: itemHistory ? itemHistory.pemeriksaan_fisik.abdomen.nt : "minus",
    akral_hangat: itemHistory
      ? itemHistory.pemeriksaan_fisik.ektremitas.akral_hangat
      : "plus",
    crt: itemHistory ? itemHistory.pemeriksaan_fisik.ektremitas.crt : "plus",
    kelainan: itemHistory
      ? itemHistory.pemeriksaan_fisik.ektremitas.kelainan
      : "minus",
    deskripsi: itemHistory
      ? itemHistory.pemeriksaan_fisik.ektremitas.deskripsi
      : null,
    kesimpulan: itemHistory ? itemHistory.diagnosa.kesimpulan : null,
    gula_darah: itemHistory ? itemHistory.pemeriksaan_darah.gula_darah : "",
    uric_acid: itemHistory ? itemHistory.pemeriksaan_darah.uric_acid : "",
    kolestrol: itemHistory ? itemHistory.pemeriksaan_darah.kolestrol : "",
    hasilSwab: itemHistory ? itemHistory.swabTest.hasilSwab : "tidak dilakukan",
  });

  const stokObatValid = (props) => {
    const hitungJumlah =
      idNamaObat && idNamaObat.map((row) => Number(row.jumlah));
    const hitungStok =
      idNamaObat && idNamaObat.map((row) => Number(row.stok_obat));
    const sum = hitungJumlah.map(function (num, idx) {
      return num > hitungStok[idx];
    });
    let aa = 0;

    sum.forEach((r) => {
      if (r) aa += 1;
    });
    return aa;
  };
  console.log(stokObatValid());
  const handleChange = (event) => {
    event.preventDefault();

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const validate = (val) => {
    const hitungJumlah = idNamaObat && idNamaObat.map((row) => row.id_obat);
    if (idNamaObat.length >= 0 && hitungJumlah) {
      return true;
    } else {
      return false;
    }
  };
  console.log("idNamaObat", idNamaObat);
  console.log("idNamaObat .length", idNamaObat.length);

  console.log("validate", validate());
  const onSubmit = async (data) => {
    const err = stokObatValid();
    const val = validate();

    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    if (val == true) {
      if (err == 0) {
        if (data) {
          try {
            let form = {
              data: {
                obat: val == true ? idNamaObat : [],
                nama: state.nama,
                nik: state.nik,
                keluhan: state.keluhan,
                alergi_obat: state.alergiObat,
                pemeriksaan_fisik: {
                  tinggi: state.tinggi,
                  berat: state.berat,
                  tekanan_darah: state.tekanan_darah,
                  nadi: state.nadi,
                  suhu: state.suhu,
                  respirasi: state.respirasi,
                  kepala: {
                    ca_kanan: state.ca_kanan,
                    ca_kiri: state.ca_kiri,
                    si_kanan: state.si_kanan,
                    si_kiri: state.si_kiri,
                    isokor_kanan: state.isokor_kanan,
                    isokor_kiri: state.isokor_kiri,
                    reflek_cahaya_kanan: state.reflek_cahaya_kanan,
                    reflek_cahaya_kiri: state.reflek_cahaya_kiri,
                    caries: state.caries,
                    kgb_kanan: state.kgb_kanan,
                    kgb_kiri: state.kgb_kiri,
                  },
                  thorax: {
                    reguler_irreguler: state.reguler_irreguler,
                    bj: state.bj,

                    murmur: state.murmur,
                    vbs_kanan: state.vbs_kanan,
                    vbs_kiri: state.vbs_kiri,
                    rh_kanan: state.rh_kanan,
                    rh_kiri: state.rh_kiri,
                    w_kanan: state.w_kanan,
                    w_kiri: state.w_kiri,
                    slem_kanan: state.slem_kanan,
                    slem_kiri: state.slem_kiri,
                  },
                  abdomen: {
                    distensi: state.distensi,
                    bu: state.bu,
                    massa: state.massa,
                    cva_kanan: state.cva_kanan,
                    cva_kiri: state.cva_kiri,
                    nt: state.nt,
                  },
                  ektremitas: {
                    akral_hangat: state.akral_hangat,
                    crt: state.crt,
                    kelainan: state.kelainan,
                    deskripsi: state.deskripsi,
                  },
                },
                diagnosa: {
                  kesimpulan: state.kesimpulan,
                },
                pemeriksaan_darah: {
                  gula_darah: state.gula_darah,
                  uric_acid: state.uric_acid,
                  kolestrol: state.kolestrol,
                },
                swabTest: {
                  hasilSwab: state.hasilSwab,
                },
              },
            };
            console.log("form", form);
            const response = await fetch(
              process.env.REACT_APP_URL + "/api/medis/data",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(form),
              }
            );
            const res = await response.json();
            console.log("form", form);
            setNameFocused(true);
            enqueueSnackbar("Data Rekam Medis Berhasil", {
              variant: "success",
            });
            clearState();
            setState({
              ...state,
              nama: "",
              nik: "",
              keluhan: "",
              alergiObat: "",
              pemeriksaan_fisik: {
                tinggi: "",
                berat: "",
                tekanan_darah: "",
                nadi: "",
                suhu: "",
                respirasi: "",
                kepala: {
                  ca_kanan: "",
                  ca_kiri: "",
                  si_kanan: "",
                  si_kiri: "",
                  isokor_kanan: "",
                  isokor_kiri: "",
                  reflek_cahaya_kanan: "",
                  reflek_cahaya_kiri: "",
                  caries: "",
                  kgb_kanan: "",
                  kgb_kiri: "",
                },
                thorax: {
                  bj: "",
                  reguler_irreguler: "",
                  murmur: "",
                  vbs_kanan: "",
                  vbs_kiri: "",
                  rh_kanan: "",
                  rh_kiri: "",
                  w_kanan: "",
                  w_kiri: "",
                  slem_kanan: "",
                  slem_kiri: "",
                },
                abdomen: {
                  distensi: "",
                  bu: "",
                  massa: "",
                  cva_kanan: "",
                  cva_kiri: "",
                  nt: "",
                },
                ektremitas: {
                  akral_hangat: "",
                  crt: "",
                  kelainan: "",
                  deskripsi: "",
                },
              },
              diagnosa: {
                kesimpulan: "",
              },
              pemeriksaan_darah: {
                gula_darah: "",
                uric_acid: "",
                kolestrol: "",
              },
              swabTest: {
                hasilSwab: "",
              },
              obat: "",
            });
          } catch (err) {
            enqueueSnackbar(err, { variant: "error" });
          }
          console.log("Data berhasil dimasukkan");
          // winnnnnnnn
          reset({});
          window.location.reload();
        } else {
          console.log("Masukkan Data Lengkap");
        }
      } else {
        enqueueSnackbar("Stok Obat Kurang", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Data Obat Kurang", { variant: "error" });
    }
  };
  const handleAddRow = () => {
    setIdNamaObat([
      ...idNamaObat,
      {
        idx: idNamaObat.length ? idNamaObat[idNamaObat.length - 1].idx + 1 : 0,
        id_obat: "",
        nama_obat: "",
      },
    ]);
  };
  const isDisabled = () => {
    if (aksiHistory === "lihatData") {
      return true;
    } else {
      return false;
    }
  };
  const displayButton = () => {
    if (aksiHistory === "lihatData") {
      return "none";
    } else {
      return "block";
    }
  };
  const disabledObat = () => {
    if (aksiHistory === "lihatData") {
      return (
        <Grid container spacing={1}>
          <FormLabel
            className="t-sub-title"
            style={{ margin: "5px 0 2px 0px" }}
          >
            Obat
          </FormLabel>
          <AddObat
            dataHistory={dataHistory}
            itemHistory={itemHistory}
            aksiHistory={aksiHistory}
            state={state}
            setState={setState}
            isFormInvalid={isFormInvalid}
            setIsFormInvalid={setIsFormInvalid}
            idNamaObat={idNamaObat}
            setIdNamaObat={setIdNamaObat}
            // handleAddRow={handleAddRow}
          />
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={1}>
          <FormLabel
            className="t-sub-title"
            style={{ margin: "5px 0 2px 0px" }}
          >
            Obat
            {close && (
              <IconButton>
                <AddCircleOutline
                  onClick={() => {
                    setOpen(true);
                    setClose(false);
                    handleAddRow();
                  }}
                />
              </IconButton>
            )}{" "}
            {open && (
              <IconButton>
                {" "}
                <RemoveCircleOutline
                  onClick={() => {
                    setOpen(false);
                    setClose(true);
                    setIdNamaObat([]);
                  }}
                />
              </IconButton>
            )}
          </FormLabel>
        </Grid>
      );
    }
  };
  const displayKeterangan = () => {
    if (state.kelainan === "plus") {
      return "block";
    } else {
      return "none";
    }
  };

  return (
    <div
      className="container-form-rekam-medis"
      style={{ padding: " 0 0 0 10px" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {stokObatValid}
        <Gap height={20} />
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            <Gap height={10} />
            <Grid container spacing={1} style={{ height: "80px" }}>
              <Grid item sm={3}>
                <TextField
                  margin="dense"
                  label="Tanggal Periksa"
                  style={{ width: "100%" }}
                  variant="outlined"
                  className="text2"
                  disabled
                  value={
                    moment(itemHistory?.created_at).format(
                      " dddd, D MMMM  YYYY"
                    ) || times
                  }
                  name="tgl_pemeriksaan"
                  id="tgl_pemeriksaan"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>{" "}
              <Grid item sm={3}>
                <TextField
                  margin="dense"
                  label="Dokter"
                  style={{ width: "100%" }}
                  variant="outlined"
                  className="text2"
                  disabled
                  defaultValue="Surya Santosa, dr"
                />
              </Grid>
              <Grid sm={6} item style={{ padding: "5px 0" }}>
                <TextField
                  rowsMin={3}
                  rowsMax={3}
                  multiline
                  margin="dense"
                  label="Alergi Obat"
                  style={{ width: "100%" }}
                  variant="outlined"
                  className="text2"
                  name="alergiObat"
                  tabIndex={1}
                  value={itemHistory?.alergi_obat || state.alergiObat}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  id="alergiObat"
                  required
                  error={namaValue && !alergiObat}
                  helperText={
                    namaValue &&
                    !alergiObat && (
                      <span style={{ color: "red", fontSize: "9px" }}>
                        Tidak Boleh Kosong{" "}
                      </span>
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
                {errors.alergiObat?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {" "}
              <FormLabel
                className="t-sub-title"
                style={{ margin: "15px 0 10px 0px" }}
              >
                Anamnesa
              </FormLabel>
            </Grid>
            <Grid container spacing={1}>
              {" "}
              <FormLabel
                className="t-label"
                style={{ margin: "10px 5px 10px 0", textAlign: "left" }}
              >
                {" "}
                Keluhan Utama
              </FormLabel>{" "}
            </Grid>
            <Grid container spacing={1}>
              <TextareaAutosize
                id="keluhan"
                name="keluhan"
                value={itemHistory?.keluhan_utama || state.keluhan}
                error={errors.keluahan}
                {...register("keluhan", { required: true })}
                onChange={handleChange}
                disabled={isDisabled()}
                className="text-area"
                style={{
                  float: "left",
                  width: "100%",
                  margin: "5px 0 0 0",
                  resize: "none",
                }}
                rowsMin={5}
                rowsMax={5}
                inputProps={{
                  tabIndex: 2,
                }}
              />
            </Grid>
            {errors.keluhan?.type === "required" && (
              <span
                style={{
                  fontSize: "9px",
                  color: "red",
                  margin: " 10px 0 0 0px",
                }}
              >
                {" "}
                *Tidak Boleh Kosong
              </span>
            )}
            <Gap height={10} />
            <Grid container spacing={1}>
              {" "}
              <FormLabel
                className="t-sub-title"
                style={{ margin: "15px 0 10px 0px" }}
              >
                Pemeriksaan Fisik
              </FormLabel>
            </Grid>
            <Grid container spacing={1} style={{ margin: "5px 0 10px 0" }}>
              <Grid item sm={1.5}>
                <TextField
                  label="Tinggi Badan"
                  margin="dense"
                  style={{ maxWidth: "100px", margin: "0px 10px 0 0" }}
                  variant="outlined"
                  className="text3"
                  name="tinggi"
                  value={
                    itemHistory?.pemeriksaan_fisik.tinggi_badan || state.tinggi
                  }
                  tabIndex={3}
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  id="tinggi"
                  onChange={handleChange}
                  disabled={isDisabled()}
                  InputProps={{
                    inputProps: { min: 50, max: 290 },
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        cm
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={1.5}>
                <TextField
                  margin="dense"
                  label="Berat Badan"
                  name="berat"
                  value={
                    itemHistory?.pemeriksaan_fisik.berat_badan || state.berat
                  }
                  tabIndex={4}
                  id="berat"
                  style={{ maxWidth: "100px", margin: "0px 5px" }}
                  variant="outlined"
                  className="text3"
                  onChange={handleChange}
                  disabled={isDisabled()}
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{
                    inputProps: { min: 25, max: 250 },
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        Kg
                      </InputAdornment>
                    ),
                  }}
                />{" "}
              </Grid>
            </Grid>
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid container spacing={1} style={{ margin: "5px 0 " }}>
              <Grid item sm={1.5}>
                <FormLabel
                  className="t-label"
                  style={{ margin: "13px 5px 0 0", width: "100%" }}
                >
                  1. Tanda Vital
                </FormLabel>
              </Grid>
              <Grid item sm={3.5}>
                {" "}
                <TextField
                  id="tekanan_darah"
                  tabIndex={5}
                  variant="outlined"
                  margin="dense"
                  label="Tekanan Darah"
                  name="tekanan_darah"
                  value={
                    itemHistory?.pemeriksaan_fisik.tekanan_darah ||
                    state.tekanan_darah
                  }
                  error={errors.tekanan_darah}
                  {...register("tekanan_darah", { required: true })}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  style={{
                    width: "125px",
                    margin: "0px 5px 0 0  ",
                    height: "50%",
                    float: "left",
                  }}
                  className="text3"
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        mmHg
                      </InputAdornment>
                    ),
                  }}
                />{" "}
                {errors.tekanan_darah?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                      float: "left",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>

              <Grid item sm={1.5}>
                <TextField
                  id="nadi"
                  margin="dense"
                  label="Nadi"
                  name="nadi"
                  {...register("nadi", { required: true })}
                  error={errors.nadi}
                  value={itemHistory?.pemeriksaan_fisik.nadi || state.nadi}
                  tabIndex={6}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  style={{ width: "70px", margin: "0px 5px 0 0  " }}
                  variant="outlined"
                  className="text3"
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        x/mm
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.nadi?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0px 0px 0px",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
              <Grid item sm={2.5}>
                <TextField
                  id="respirasi"
                  tabIndex={7}
                  variant="outlined"
                  margin="dense"
                  label="Respirasi"
                  name="respirasi"
                  value={
                    itemHistory?.pemeriksaan_fisik.respirasi || state.respirasi
                  }
                  error={errors.respirasi}
                  {...register("respirasi", { required: true })}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  style={{ maxWidth: "89px", margin: "0px 5px 0 0  " }}
                  className="text3"
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        x/mm
                      </InputAdornment>
                    ),
                  }}
                />{" "}
                {errors.respirasi?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
              <Grid item sm={1.5}>
                <TextField
                  margin="dense"
                  label="Suhu"
                  name="suhu"
                  value={itemHistory?.pemeriksaan_fisik.suhu || state.suhu}
                  tabIndex={8}
                  id="suhu"
                  style={{ width: "55px", margin: "0px " }}
                  error={errors.suhu}
                  {...register("suhu", { required: true })}
                  variant="outlined"
                  className="text3"
                  onChange={handleChange}
                  disabled={isDisabled()}
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{
                    inputProps: { min: 32, max: 45 },
                    endAdornment: (
                      <InputAdornment className="text3" position="end">
                        &deg;C
                      </InputAdornment>
                    ),
                  }}
                />{" "}
                {errors.suhu?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0px 0px 0px",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
            </Grid>
            <Gap height={10} />
            <Divider style={{ width: "100%" }} />
            <Gap height={10} />
            <Grid container spacing={1} style={{ margin: "2px 0px" }}>
              <Grid item sm={1.5}>
                <FormLabel
                  className="t-label"
                  style={{ margin: "0px 25px 0px -4px" }}
                >
                  2. Kepala
                </FormLabel>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "75px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">CA</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="ca_kanan"
                    name="ca_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.ca_kanan ||
                      state.ca_kanan
                    }
                    onChange={handleChange}
                    tabIndex={9}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={
                        <Radio
                          classes={{
                            disabled: "cls",
                          }}
                        />
                      }
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="ca_kiri"
                    name="ca_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.ca_kiri ||
                      state.ca_kiri
                    }
                    onChange={handleChange}
                    tabIndex={10}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "75px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">SI</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="si_kanan"
                    name="si_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.si_kanan ||
                      state.si_kanan
                    }
                    onChange={handleChange}
                    tabIndex={11}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="si_kiri"
                    name="si_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.si_kiri ||
                      state.si_kiri
                    }
                    onChange={handleChange}
                    tabIndex={12}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "75px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Isokor</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="isokor_kanan"
                    name="isokor_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.isokor_kanan ||
                      state.isokor_kanan
                    }
                    onChange={handleChange}
                    tabIndex={13}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="isokor_kiri"
                    name="isokor_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.isokor_kiri ||
                      state.isokor_kiri
                    }
                    onChange={handleChange}
                    tabIndex={14}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "75px",
                  padding: "5px 3px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Reflek Cahaya</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px ",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="reflek_cahaya_kanan"
                    name="reflek_cahaya_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala
                        .reflek_cahaya_kanan || state.reflek_cahaya_kanan
                    }
                    onChange={handleChange}
                    tabIndex={15}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="reflek_cahaya_kiri"
                    name="reflek_cahaya_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala
                        .reflek_cahaya_kiri || state.reflek_cahaya_kiri
                    }
                    onChange={handleChange}
                    tabIndex={16}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "60px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Caries</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={13} />
                  <RadioGroup
                    aria-label="caries"
                    name="caries"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.caries ||
                      state.caries
                    }
                    onChange={handleChange}
                    tabIndex={17}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "75px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">KGB</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="kgb_kanan"
                    name="kgb_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.kgb_kanan ||
                      state.kgb_kanan
                    }
                    onChange={handleChange}
                    tabIndex={18}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="kgb_kiri"
                    name="kgb_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.kepala.kgb_kiri ||
                      state.kgb_kiri
                    }
                    onChange={handleChange}
                    tabIndex={19}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Gap height={10} />
            <Divider style={{ width: "100%" }} />
            <Gap height={10} />{" "}
            <Grid container spacing={1} style={{ margin: "2px 0px" }}>
              <Grid item sm={1.5}>
                {" "}
                <FormLabel
                  className="t-label"
                  style={{ margin: "13px 22px 0 0px" }}
                >
                  3. Thorax
                </FormLabel>
              </Grid>
              <Grid item sm={2.5} style={{ margin: "10px 0px 0px -7px" }}>
                <TextField
                  id="bj"
                  label="BJ I /II"
                  margin="dense"
                  style={{ width: "100px" }}
                  variant="outlined"
                  className="text2"
                  name="bj"
                  error={errors.bj}
                  {...register("bj", { required: true })}
                  value={itemHistory?.pemeriksaan_fisik.thorax.bj || state.bj}
                  tabIndex={20}
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  multiline
                  rowsMin={4}
                  rowsMax={4}
                />
                {errors.bj?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "63px",
                  padding: "5px 2px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Irama</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={3} />
                  <RadioGroup
                    name="reguler_irreguler"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.reguler_irreguler ||
                      state.reguler_irreguler
                    }
                    onChange={handleChange}
                    tabIndex={21}
                    defaultValue="reguler"
                  >
                    <FormControlLabel
                      value="reguler"
                      className="t-radio-irama"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="Reguler"
                    />
                    <FormControlLabel
                      value="ireguler"
                      className="t-radio-irama"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="Ireguler"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "68px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px " }}
                >
                  Murmur
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <RadioGroup
                    aria-label="murmur"
                    name="murmur"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.murmur ||
                      state.murmur
                    }
                    onChange={handleChange}
                    tabIndex={22}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "68px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px " }}
                >
                  VBS
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="vbs_kanan"
                    name="vbs_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.vbs_kanan ||
                      state.vbs_kanan
                    }
                    onChange={handleChange}
                    tabIndex={23}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="vbs_kiri"
                    name="vbs_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.vbs_kiri ||
                      state.vbs_kiri
                    }
                    onChange={handleChange}
                    tabIndex={24}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "68px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px " }}
                >
                  RH
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="rh_kanan"
                    name="rh_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.rh_kanan ||
                      state.rh_kanan
                    }
                    onChange={handleChange}
                    tabIndex={25}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="rh_kiri"
                    name="rh_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.rh_kiri ||
                      state.rh_kiri
                    }
                    onChange={handleChange}
                    tabIndex={26}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "68px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px " }}
                >
                  WH
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="w_kanan"
                    name="w_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.w_kanan ||
                      state.w_kanan
                    }
                    onChange={handleChange}
                    tabIndex={27}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="w_kiri"
                    name="w_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.w_kiri ||
                      state.w_kiri
                    }
                    onChange={handleChange}
                    tabIndex={28}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={1.5}
                style={{
                  width: "68px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px" }}
                >
                  Slem
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="slem_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.slem_kanan ||
                      state.slem_kanan
                    }
                    onChange={handleChange}
                    name="slem_kanan"
                    tabIndex={29}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="slem_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.thorax.slem_kiri ||
                      state.slem_kiri
                    }
                    onChange={handleChange}
                    name="slem_kiri"
                    tabIndex={30}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
              </Grid>
            </Grid>
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid container spacing={1} style={{ margin: "2px 0 2px  0" }}>
              <Grid item sm={1.5}>
                {" "}
                <FormLabel
                  className="t-label"
                  style={{ margin: "13px 11px 0 -4px", textAlign: "left" }}
                >
                  4. Abdomen
                </FormLabel>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Distensi</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={13} />
                  <RadioGroup
                    aria-label="distensi"
                    name="distensi"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.distensi ||
                      state.distensi
                    }
                    onChange={handleChange}
                    tabIndex={31}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px ",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">BU</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "100%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={8} />
                  <RadioGroup
                    aria-label="bu"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.bu || state.bu
                    }
                    onChange={handleChange}
                    name="bu"
                    tabIndex={32}
                    defaultValue="normal"
                  >
                    <FormControlLabel
                      value="up	"
                      className="t-radio-3"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="&uarr;	"
                    />
                    <FormControlLabel
                      value="down"
                      className="t-radio-3"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="&darr;"
                    />
                    <FormControlLabel
                      value="normal"
                      className="t-radio-3-normal"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="Normal"
                      InputLabelProps={{
                        className: "normal-value",
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Massa</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={13} />
                  <RadioGroup
                    aria-label="massa"
                    name="massa"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.massa ||
                      state.massa
                    }
                    onChange={handleChange}
                    tabIndex={33}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "75px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography
                  className="t-label-radio"
                  style={{ padding: "5px " }}
                >
                  CVA
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kanan</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="cva_kanan"
                    name="cva_kanan"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.cva_kanan ||
                      state.cva_kanan
                    }
                    onChange={handleChange}
                    tabIndex={34}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>{" "}
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <FormLabel className="t-label-sub">Kiri</FormLabel>{" "}
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="cva_kiri"
                    name="cva_kiri"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.cva_kiri ||
                      state.cva_kiri
                    }
                    onChange={handleChange}
                    tabIndex={35}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">NT</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={13} />
                  <RadioGroup
                    aria-label="nt"
                    name="nt"
                    value={
                      itemHistory?.pemeriksaan_fisik.abdomen.nt || state.nt
                    }
                    onChange={handleChange}
                    tabIndex={36}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid container spacing={12} style={{ margin: "5px 0 5px  0" }}>
              <Grid item sm={1.5}>
                <FormLabel className="t-label" style={{ margin: "0 9px 0 0" }}>
                  5. Ektremitas
                </FormLabel>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "70px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Akral Hangat</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="akral_hangat"
                    name="akral_hangat"
                    value={
                      itemHistory?.pemeriksaan_fisik.ektremitas.akral_hangat ||
                      state.akral_hangat
                    }
                    onChange={handleChange}
                    tabIndex={37}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">
                  CRT &lt;2 &rdquo;
                </Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="crt"
                    name="crt"
                    value={
                      itemHistory?.pemeriksaan_fisik.ektremitas.crt || state.crt
                    }
                    onChange={handleChange}
                    tabIndex={38}
                    defaultValue="plus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                sm={2.5}
                style={{
                  width: "60px",
                  padding: "5px 2px",
                  margin: "5px 2px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <Typography className="t-label-radio">Kelainan</Typography>
                <FormControl
                  component="fieldset"
                  style={{
                    width: "50%",
                    float: "left",
                    paddingLeft: "5px",
                  }}
                >
                  <Gap height={2} />
                  <RadioGroup
                    aria-label="kelainan"
                    name="kelainan"
                    value={
                      itemHistory?.pemeriksaan_fisik.ektremitas.kelainan ||
                      state.kelainan
                    }
                    onChange={handleChange}
                    tabIndex={39}
                    defaultValue="minus"
                  >
                    <FormControlLabel
                      value="plus"
                      className="t-radio-1"
                      disabled={isDisabled()}
                      control={<Radio color="primary" />}
                      label="+"
                    />
                    <FormControlLabel
                      value="minus"
                      className="t-radio-2"
                      disabled={isDisabled()}
                      control={<Radio />}
                      label="-"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  float: "left",
                  margin: "0 0 0 0",
                }}
              >
                <Box component="span" display={displayKeterangan()}>
                  <TextField
                    margin="dense"
                    style={{
                      maxWidth: "180px",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                    multiline
                    rowsMin={3}
                    rowsMax={3}
                    variant="outlined"
                    label="Keterangan"
                    id="deskripsi"
                    name="deskripsi"
                    onChange={handleChange}
                    error={errorKelainan ? state.kelainan === "plus" : "minus"}
                    required={state.kelainan === "plus"}
                    helperText={
                      aksiHistory === "lihatData" ||
                      (state.kelainan === "plus" && (
                        <span
                          style={{
                            fontSize: "9px",
                            color: "red",
                            margin: " 5px 0 0 0px",
                            float: "left",
                          }}
                        >
                          {" "}
                          *Jika kelainan plus Tidak Boleh Kosong
                        </span>
                      ))
                    }
                    className="text9"
                    value={
                      itemHistory?.pemeriksaan_fisik.ektremitas.deskripsi ||
                      state.deskripsi
                    }
                    disabled={isDisabled()}
                  />
                </Box>
              </Grid>
            </Grid>
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid container spacing={1} style={{ padding: " 0 0 5px 0" }}>
              <Grid container spacing={1}>
                {" "}
                <FormLabel
                  className="t-sub-title"
                  style={{ margin: "5px 0px" }}
                >
                  Pemeriksaan Darah
                </FormLabel>
              </Grid>
              <Grid container spacing={1} style={{ margin: "0 0 5px  0" }}>
                <Grid item sm={2.5}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    className="text4"
                    label="Gula Darah"
                    disabled={isDisabled()}
                    id="gula_darah"
                    onChange={handleChange}
                    name="gula_darah"
                    onKeyPress={(data) => {
                      if (data.charCode === 13) {
                        data.stopPropagation();
                        data.preventDefault();
                        return false;
                      }
                    }}
                    style={{ width: "100px", margin: "0px 5px 0 0  " }}
                    value={
                      itemHistory?.pemeriksaan_darah.gula_darah ||
                      state.gula_darah
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="text4" position="end">
                          mg/dL
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={2.5}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    className="text4"
                    disabled={isDisabled()}
                    id="uric_acid"
                    name="uric_acid"
                    label="Uric Acid"
                    onKeyPress={(data) => {
                      if (data.charCode === 13) {
                        data.stopPropagation();
                        data.preventDefault();
                        return false;
                      }
                    }}
                    value={
                      itemHistory?.pemeriksaan_darah.uric_acid ||
                      state.uric_acid
                    }
                    style={{ width: "100px", margin: "0px 5px 0 0  " }}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="text4" position="end">
                          mg/dL
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={2.5}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    className="text4"
                    disabled={isDisabled()}
                    id="kolestrol"
                    label="Kolesterol"
                    name="kolestrol"
                    value={
                      itemHistory?.pemeriksaan_darah.kolestrol ||
                      state.kolestrol
                    }
                    onKeyPress={(data) => {
                      if (data.charCode === 13) {
                        data.stopPropagation();
                        data.preventDefault();
                        return false;
                      }
                    }}
                    style={{ width: "100px", margin: "0px 5px 0 0  " }}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="text4" position="end">
                          mg/dL
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item sm={2.5}>
                  <FormControl>
                    <TextField
                      select
                      margin="dense"
                      variant="outlined"
                      label="Swab Antigen"
                      className="text4"
                      InputProps={{
                        className: "text6Props",
                      }}
                      SelectProps={{
                        MenuProps: {
                          className: "text1-menu-props",
                          getContentAnchorEl: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          size: "small",
                          margin: "dense",
                        },
                      }}
                      id="hasilSwab"
                      style={{
                        width: "120px",
                        margin: "0px 5px 0 0  ",
                        textAlign: "left",
                      }}
                      name="hasilSwab"
                      value={itemHistory?.swabTest.hasilSwab || state.hasilSwab}
                      disabled={isDisabled()}
                      onChange={handleChange}
                      defaultValue="tidak dilakukan"
                    >
                      <MenuItem
                        value="positif"
                        size="small"
                        margin="dense"
                        className="text6-menu-item"
                      >
                        Positif
                      </MenuItem>
                      <MenuItem
                        value="negatif"
                        size="small"
                        margin="dense"
                        className="text6-menu-item"
                      >
                        Negatif
                      </MenuItem>
                      <MenuItem
                        value="tidak dilakukan"
                        size="small"
                        margin="dense"
                        className="text6-menu-item"
                      >
                        Tidak Dilakukan
                      </MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>{" "}
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid container spacing={1} style={{ margin: "5px 0 5px  0" }}>
              <Grid container spacing={1}>
                {" "}
                <FormLabel className="t-sub-title" style={{ margin: "5px 0 " }}>
                  Kesimpulan / Saran{" "}
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  id="kesimpulan"
                  name="kesimpulan"
                  value={itemHistory?.diagnosa.kesimpulan || state.kesimpulan}
                  error={errors.kesimpulan}
                  {...register("kesimpulan", { required: true })}
                  onChange={handleChange}
                  disabled={isDisabled()}
                  rowsMin={5}
                  rowsMax={5}
                  className="text-area"
                  style={{ width: "100%", resize: "none" }}
                />
                {errors.kesimpulan?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                      float: "left",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
            </Grid>
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />
            {disabledObat()}
            {open && (
              <AddObat
                dataHistory={dataHistory}
                itemHistory={itemHistory}
                aksiHistory={aksiHistory}
                state={state}
                setState={setState}
                idNamaObat={idNamaObat}
                setIdNamaObat={setIdNamaObat}
                handleAddRow={handleAddRow}
              />
            )}
            <Gap height={5} />
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />{" "}
            <Grid
              spacing={1}
              container
              style={{
                marginTop: "50px",
                width: "90%",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <Box
                component="span"
                display={displayButton()}
                style={{ width: "100%", margin: "0 auto", textAlign: "center" }}
              >
                <Button
                  type="submit"
                  disabled={!namaValue}
                  className="btn-save"
                  style={{
                    margin: "5px 0 0 0",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  Save{" "}
                </Button>{" "}
              </Box>
            </Grid>{" "}
          </Grid>
        </Grid>
        <Gap height={30} />
      </form>
    </div>
  );
}
