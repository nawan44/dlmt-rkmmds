import React, { useState, useEffect } from "react";
import AutoSuggest from "react-autosuggest";
import {
  Grid,
  TextField,
  Checkbox,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import moment from "moment";
import jwtDecode from "jwt-decode";

const Row = function (props) {
  const {
    checked,
    onChecked,
    dataHistoryState,
    selectListHistory,
    itemHistory,
    aksiHistory,
    cok,
    cuk,
    hdlSb,
    setCuk,
    handleObat,
    idx,
    register,
    stokValue,
    setStokValue,
    stateObat,
    setStateObat,
  } = props;
  // const [stateRemove, setStateRemove] = useState({
  //   values: [],
  // });
  const [state, setState] = useState({
    nama_obat: itemHistory ? itemHistory.obat.nama_obat : null,
    id_obat: itemHistory ? itemHistory.obat.id_obat : null,
    frekuensi_pemakaian: itemHistory
      ? itemHistory.obat.frekuensi_pemakaian
      : null,
    jumlah: itemHistory ? itemHistory.obat.jumlah : null,
    cara_pemakaian: itemHistory ? itemHistory.obat.cara_pemakaian : null,
  });

  const [itemCuk, setItemCuk] = useState({
    nama_obat: "",
    id_obat: null,
    frekuensi_pemakaian: "",
    jumlah: null,
    cara_pemakaian: "",
    stok_obat: null,
  });
  const [value, setValue] = useState("");
  const [stokObat, setStokObat] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [nicknameSuggestions, setNicknameSuggestions] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [namaObatValue, setNamaObatValue] = useState("");
  const clearData = () => {
    if (value !== dataObat.nama_obat) {
      setState({
        id_obat: null,
        frekuensi_pemakaian: "",
        cara_pemakaian: "",
        nama_obat: "",
        jumlah: null,
      });
    }
  };
  const dataNamaObat = state.nama_obat && state.nama_obat.split(",");
  const dataFrekuensi =
    state.frekuensi_pemakaian && state.frekuensi_pemakaian.split(",");
  const dataPakai = state.cara_pemakaian && state.cara_pemakaian.split(",");
  useEffect(() => {
    getDataObat();
  }, []);
  useEffect(() => {
    register("frekuensi_pemakaian");
  }, [register]);
  useEffect(() => {
    setItemCuk({
      stok_obat: stokObat,
    });
  }, [stokObat]);
  const getDataObat = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + `/api/medis/search?obat=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let res = await response.json();
      setDataObat(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return dataObat && dataObat.filter((obat) => regex.test(obat.nama_obat));
  }
  function getSuggestionNickname(suggestion) {
    return suggestion.nama_obat;
  }
  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.nama_obat} <br />
        Tgl Expired :{moment(suggestion.tgl_expired).format(
          " D MMMM  YYYY"
        )}{" "}
        <br />
        Stok : {suggestion.jumlah}
      </span>
    );
  }
  const onNicknameSuggestionSelected = (event, { suggestion }) => {
    setNamaObatValue(suggestion.nama_obat);
    setStokValue(suggestion.jumlah);
    setStokObat(suggestion.jumlah);

    handleObat(suggestion.id_obat, suggestion.nama_obat, idx);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    // setState(state);
  };
  const handleChangeAddObat = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    const abc = {
      ...itemCuk,
      // ...state,
      [event.target.name]: event.target.value,
    };
    setItemCuk(abc);
    const abcd = cuk;
    abcd[idx] = abc;
    setCuk((prevState) => {
      return abcd;
    });
    hdlSb(
      cuk.map((r, i) => ({
        id_obat: cok[i].id_obat,
        nama_obat: cok[i].nama_obat,
        frekuensi_pemakaian: r.frekuensi_pemakaian,
        jumlah: r.jumlah,
        cara_pemakaian: r.cara_pemakaian,
        stok_obat: r.stok_obat,
      }))
    );
  };
  const isDisabled = () => {
    if (!value) {
      return true;
    } else {
      return false;
    }
  };
  const displayObat = () => {
    if (cok.length > 0) {
      return "block";
    } else {
      return "none";
    }
  };
  const disabledHistory = () => {
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
  const removeClick = (i) => {
    // let values = [...state.values];
    // values.splice(i, 1);
    setStateObat({
      rows: stateObat.rows.filter((e) => !e.checked),
    });
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ marginBottom: "5px", width: "100%" }}
      // key={list.id}
    >
      <Grid item sm={1}>
        {aksiHistory === "lihatData" ? (
          <Box></Box>
        ) : (
          // <Checkbox
          //   checked={checked}
          //   onChange={onChecked}
          //   className="check"
          //   // disabled={isDisabled()}
          // />
          <input type="button" value="remove" onClick={removeClick} />
        )}
      </Grid>
      <Grid item sm={4}>
        {/* <Grid item sm={cok.length > 0 ? 4 : 12}> */}
        {aksiHistory === "lihatData" ? (
          dataNamaObat &&
          dataNamaObat.map((pharm) => (
            <TextField
              margin="dense"
              variant="outlined"
              label="Nama Obat"
              className="text1"
              style={{
                width: "100%",
                margin: "5px  0 ",
                padding: "0",
              }}
              disabled={isDisabled()}
              value={pharm}
            />
          ))
        ) : (
          <AutoSuggest
            suggestions={nicknameSuggestions}
            onSuggestionsClearRequested={() => setNicknameSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
              // console.log("val", value);
              setNicknameValue(value);
              setNicknameSuggestions(getSuggestions(value));
            }}
            id="nama_obat"
            name="nama_obat"
            // onChange={handleChangeCuk}
            onSuggestionSelected={onNicknameSuggestionSelected}
            getSuggestionValue={getSuggestionNickname}
            renderSuggestion={renderSuggestion}
            label="Nama"
            inputProps={{
              placeholder: "Nama Obat ...",
              value: aksiHistory === "lihatData" ? state.nama_obat : value,
              onChange: (_, { newValue, method }) => {
                setValue(newValue);
                clearData();
              },
              style:
                aksiHistory === "lihatData"
                  ? {
                      width: "100%",
                      height: "35px",
                      padding: "5px 10px",
                      margin: "0 5px 0 0",
                      fontFamily: "Helvetica, sans-serif",
                      fontWeight: 300,
                      fontSize: "12px",
                      // border: "none",
                      borderRadius: "4px",
                      border: "1px solid #000",
                      color: "#000",
                      backgroundColor: "#F5F5F5",
                    }
                  : {
                      width: "100%",
                      height: "35px",
                      padding: "5px 10px",
                      margin: "0 5px 0 0",
                      fontFamily: "Helvetica, sans-serif",
                      fontWeight: 300,
                      fontSize: "12px",
                      // border: "none",
                      borderRadius: "4px",
                      border: "1px solid #000",
                      color: "#000",
                      background: "#FAFAFA",
                    },
            }}
            highlightFirstSuggestion={true}
          />
        )}
      </Grid>
      <Grid item sm={2}>
        {aksiHistory === "lihatData" ? (
          dataFrekuensi &&
          dataFrekuensi.map((key) => (
            <TextField
              label="Frekuensi"
              disabled={disabledHistory()}
              className="text7"
              value={
                aksiHistory === "lihatData" ? key : state.frekuensi_pemakaian
              }
              style={{
                width: "100%",
                margin: "5px 0px",
              }}
              variant="outlined"
            />
          ))
        ) : (
          <TextField
            label="Frekuensi"
            id="frekuensi_pemakaian"
            disabled={isDisabled()}
            className="text7"
            onKeyPress={(data) => {
              if (data.charCode === 13) {
                data.stopPropagation();
                data.preventDefault();
                return false;
              }
            }}
            style={{
              width: "100%",
              margin: "0px ",
            }}
            variant="outlined"
            InputProps={{
              onChange: handleChangeAddObat,
              value: state.frekuensi_pemakaian,
              name: "frekuensi_pemakaian",
            }}
            error={cok.length > 0 && !state.frekuensi_pemakaian ? true : false}
            required={
              cok.length > 0 && !state.frekuensi_pemakaian ? true : false
            }
            helperText={
              cok.length > 0 &&
              !state.frekuensi_pemakaian && (
                <span style={{ color: "red", fontSize: "9px" }}>
                  Tidak Boleh Kosong
                </span>
              )
            }
          />
        )}{" "}
      </Grid>
      <Grid item sm={3}>
        {aksiHistory === "lihatData" ? (
          dataPakai &&
          dataPakai.map((pakai) => (
            <TextField
              margin="dense"
              variant="outlined"
              label="Cara Pakai"
              className="text1"
              style={{
                width: "100%",
                margin: "5px  0px ",
                padding: "0",
              }}
              disabled={disabledHistory()}
              value={pakai}
            />
          ))
        ) : (
          <FormControl style={{ marginTop: "0 0 0 0", width: "100%" }}>
            <TextField
              select
              margin="dense"
              variant="outlined"
              label="Cara Pakai"
              className="text1"
              InputProps={{
                className: "text1Props",
              }}
              style={{
                width: "100%",
                margin: "  0 ",
                padding: "0",
              }}
              value={state.cara_pemakaian}
              // value={itemHistory?.obat.cara_pemakaian || state.cara_pemakaian}

              name="cara_pemakaian"
              onChange={handleChangeAddObat}
              SelectProps={{
                onChange: handleChangeAddObat,
                value: state.cara_pemakaian,
                name: "cara_pemakaian",
                style: { padding: "0px", textAlign: "left" },
                MenuProps: {
                  className: "text1-menu-props",
                  style: { width: "140px" },
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  size: "small",
                  margin: "dense",
                },
              }}
              id="cara_pemakaian"
              disabled={isDisabled()}
              error={cok.length > 0 && !state.cara_pemakaian ? true : false}
              defaultValue="Setelah Makan"
              required={cok.length > 0 && !state.cara_pemakaian ? true : false}
              helperText={
                cok.length > 0 &&
                !state.cara_pemakaian && (
                  <span style={{ color: "red", fontSize: "9px" }}>
                    Tidak Boleh Kosong{" "}
                  </span>
                )
              }
            >
              <MenuItem
                value="Sebelum Makan"
                name="Sebelum Makan"
                size="small"
                margin="dense"
                className="text6-menu-item"
              >
                Sebelum Makan
              </MenuItem>
              <MenuItem
                value="Setelah Makan"
                name="Setelah Makan"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Setelah Makan
              </MenuItem>
              <MenuItem
                value="Pemakaian Luar"
                name="Pemakaian Luar"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Pemakaian Luar
              </MenuItem>
              <MenuItem
                value="Ditetes"
                name="Ditetes"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Ditetes
              </MenuItem>
              <hr />
              <InputLabel className="text6-menu-item" id="lain">
                Lain -lain
              </InputLabel>
              <Select
                labelId="lain"
                id="lain"
                name="cara_pemakaian"
                value={state.cara_pemakaian}
                style={{ width: "100%", fontSize: "9px" }}
                fullWidth
                onChange={handleChangeAddObat}
                disabled={isDisabled()}
              >
                <TextField
                  style={{
                    maxWidth: "120px",
                    textAlign: "left",
                    margin: "0 auto",
                    fontSize: "9px",
                    padding: "0",
                  }}
                  id="standard-full-width"
                  placeholder="Lain -lain"
                  fullWidth
                  name="cara_pemakaian"
                  value={state.cara_pemakaian}
                  margin="dense"
                  className="text8"
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "9px",
                      textAlign: "left",
                      margin: "0",
                      padding: "0",
                    },
                  }}
                  onKeyPress={(data) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      data.preventDefault();
                      return false;
                    }
                  }}
                  InputProps={{ disableUnderline: true }}
                  onChange={handleChangeAddObat}
                  onKeyPress={(data, input) => {
                    if (data.charCode === 13) {
                      data.stopPropagation();
                      return false;
                    }
                  }}
                />
              </Select>
            </TextField>
          </FormControl>
        )}{" "}
      </Grid>
      <Grid item sm={1}>
        {aksiHistory === "lihatData" ? (
          state.jumlah &&
          state.jumlah.map((jum) => (
            <TextField
              label="Jumlah"
              className="text5"
              variant="outlined"
              value={jum}
              disabled={disabledHistory()}
              style={{
                width: "100%",
                margin: "5px 0 ",
                fontSize: "10px",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: "text5",
                style: {
                  padding: "7px 5px",
                  fontSize: "12px",
                  textAlign: "center",
                },
              }}
            />
          ))
        ) : (
          <TextField
            label="Jumlah"
            className="text5"
            id="jumlah"
            name="jumlah"
            type="number"
            onKeyPress={(data) => {
              if (data.charCode === 13) {
                data.stopPropagation();
                data.preventDefault();
                return false;
              }
            }}
            disabled={isDisabled()}
            style={{ width: "100%", fontSize: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeAddObat}
            value={state.jumlah}
            InputProps={{
              inputProps: { min: 1, max: 1000000 },

              className: "text5",
              style: { padding: "0", fontSize: "12px" },
            }}
            required={cok.length > 0 && !state.jumlah ? true : false}
            error={cok.length > 0 && !state.jumlah ? true : false}
            helperText={
              cok.length > 0 &&
              !state.jumlah && (
                <span style={{ color: "red", fontSize: "9px" }}>
                  *Tidak Boleh Kosong
                </span>
              )
            }
          />
        )}{" "}
      </Grid>
      <Grid item sm={1}>
        <Box component="span" display={displayButton()}>
          <div>
            <TextField
              id="stok"
              label="Stock"
              disabled
              className="text5"
              // value={stokValue}
              // onChange={handleStok}
              value={stokObat}
              error={parseInt(state.jumlah) > parseInt(stokObat)}
              helperText={
                parseInt(state.jumlah) > parseInt(stokObat) && (
                  <span style={{ color: "red", fontSize: "9px" }}>
                    Stok Obat Kurang
                  </span>
                )
              }
              style={{ width: "100%", fontSize: "10px" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: "text5",
                style: { padding: "0", fontSize: "12px" },
              }}
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default function AddObat(props) {
  const {
    dataHistoryState,
    selectListHistory,
    itemHistory,
    aksiHistory,
    hdlSb,
    register,
    handleSubmit,
    watch,
    errors,
    reset,
    isFormInvalid,
    setIsFormInvalid,
    stokValue,
    setStokValue,
    Abc,
    setAbc,
  } = props;

  const [cuk, setCuk] = useState([]);
  const [state, setState] = useState({
    rows: [{ value: null, checked: false }],
  });
  const [cok, setCok] = useState([]);
  const [itemCuk, setItemCuk] = useState({
    nama_obat: "",
    id_obat: 0,
    frekuensi_pemakaian: "",
    jumlah: 0,
    cara_pemakaian: "",
    stok_obat: null,
  });
  console.log("abc", Abc);
  const updateValue = (e, idx) => {
    const rows = [...state.rows]; // copy array because we don't want to mutate the previous one
    // rows[idx].value = e.target.value;
    rows[idx].checked = !rows[idx].checked;
    setState({
      rows,
    });
  };
  const onChecked = (idx) => {
    const rows = [...state.rows]; // copy array because we don't want to mutate the previous one
    rows[idx].checked = !rows[idx].checked;
    setState({
      rows,
    });
  };
  const addRow = () => {
    const rows = [...state.rows, { value: null, checked: false }];
    setState({
      rows,
    });
    setItemCuk({
      nama_obat: "",
      id_obat: 0,
      frekuensi_pemakaian: "",
      jumlah: 0,
      cara_pemakaian: "",
    });
  };
  const deleteRows = (idx) => {
    // console.log(state.rows);
    // console.log("idx >>>>", idx.value);
    // if (cok.length > 0) {
    //   setAbc([]);
    // }
    // setState({
    //   rows: state.rows.filter((e) => !e.checked),
    // });

    const removeIndex = cuk.findIndex((item) => item.id === !item.checked);
    // remove object
    cuk.splice(removeIndex, 1);
  };
  const displayButton = () => {
    if (aksiHistory === "lihatData") {
      return "none";
    } else {
      return "block";
    }
  };
  const handleObat = (id_obat, nama_obat, idx) => {
    setCok((prevState) => {
      const qwe = prevState;
      qwe[idx] = { id_obat, nama_obat };
      return qwe;
    });
  };
  console.log("cuk", cuk);
  console.log("cok", cok);
  console.log("state", state);

  // console.log("cok", cok.length > 0);
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        margin: "0 auto",
        padding: "0",
      }}
    >
      {" "}
      {state.rows.map((row, idx) => {
        return (
          <Row
            key={idx}
            value={row.valueCheck}
            checked={row.checked}
            onChange={(e) => updateValue(e, idx)}
            onChecked={() => onChecked(idx)}
            dataHistoryState={dataHistoryState}
            itemHistory={itemHistory}
            aksiHistory={aksiHistory}
            // handleChangeCuk={(e) => handleChangeCuk(e, idx)}
            setCuk={setCuk}
            handleObat={handleObat}
            idx={idx}
            cuk={cuk}
            cok={cok}
            hdlSb={hdlSb}
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            reset={reset}
            style={{ background: "blue" }}
            isFormInvalid={isFormInvalid}
            setIsFormInvalid={setIsFormInvalid}
            stokValue={stokValue}
            setStokValue={setStokValue}
            stateObat={state}
            setStateObat={setState}
          />
        );
      })}
      <Box component="span" display={displayButton()}>
        <Button onClick={addRow} className="btn-obat-add">
          Tambah Obat
        </Button>
        <Button onClick={deleteRows} className="btn-obat-del">
          Hapus Obat
        </Button>
      </Box>
    </div>
  );
}
