import React, { useState, useEffect } from "react";
import AutoSuggest from "react-autosuggest";
import {
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { Delete, Add, Check, Clear } from "@material-ui/icons";

const Row = function (props) {
  const {
    value,
    dataHistoryState,
    selectListHistory,
    itemHistory,
    aksiHistory,
    idNamaObat,
    key,
    handleObat,
    idx,
    stok,
    handleChangeObat,
    onChangeObat,
    setOnChangeObat,
    jumlah,
    cara_pemakaian,
    frekuensi_pemakaian,
    setIdNamaObat,
  } = props;
  console.log("cara_pemakaian", cara_pemakaian);
  console.log("frekuensi_pemakaian", frekuensi_pemakaian);
  const [customAdd, setCustomAdd] = useState(false);
  const [openLain, setopenLain] = useState(false);
  const [state, setState] = useState({
    nama_obat: itemHistory ? itemHistory.obat.nama_obat : null,
    id_obat: itemHistory ? itemHistory.obat.id_obat : null,
    frekuensi_pemakaian: itemHistory
      ? itemHistory.obat.frekuensi_pemakaian
      : null,
    jumlah: itemHistory ? itemHistory.obat.jumlah : null,
    cara_pemakaian: itemHistory ? itemHistory.obat.cara_pemakaian : null,
    stok_obat: null,
    other: "",
  });
  console.log(idNamaObat);
  const [dummyJumlah, setDummyJumlah] = useState(jumlah);
  const [dummyFrekuensi, setDummyFrekuensi] = useState(frekuensi_pemakaian);
  // const [dummyPakai, setDummyPakai] = useState(cara_pemakaian);
  const [errorObat, setErrorObat] = useState(false);
  const [errorJumlah, setErrorJumlah] = useState(false);
  const [errorFrekuensi, setErrorFrekuensi] = useState(false);
  const [errorPakai, setErrorPakai] = useState(false);
  const [valueObat, setValueObat] = useState(value);
  const [stokObat, setStokObat] = useState(stok);
  const [nicknameValue, setNicknameValue] = useState("");
  const [nicknameSuggestions, setNicknameSuggestions] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [namaObatValue, setNamaObatValue] = useState("");

  console.log("namaObat >>>>>>>>>", namaObatValue);
  const clearData = () => {
    if (valueObat !== dataObat.nama_obat || idNamaObat.nama_obat === "") {
      setDummyJumlah("");
      setDummyFrekuensi("");
      setCustomAdd(true);
      isDisabled();
      setStokObat("");
      getDataObat();
    }
  };

  useEffect(() => {
    getDataObat();
  }, []);

  useEffect(() => {
    handleChangeObat();
  }, [state]);

  useEffect(() => {
    if (valueObat === "") {
      getDataObat();
    }
  }, [valueObat]);

  useEffect(
    (e) => {
      idNamaObat.map((r, val) => {
        if (r.id_obat && !r.nama_obat) {
          setErrorObat(true);
        } else {
          setErrorObat(false);
        }
      });
      idNamaObat.map((r, val) => {
        if (r.id_obat && !r.frekuensi_pemakaian) {
          setErrorFrekuensi(true);
        } else {
          setErrorFrekuensi(false);
        }
      });
      idNamaObat.map((r) => {
        if (r.id_obat && !r.jumlah) {
          setErrorJumlah(true);
        } else {
          setErrorJumlah(false);
        }
      });
      idNamaObat.map((r) => {
        if (r.id_obat && !r.cara_pemakaian) {
          setErrorPakai(true);
        } else {
          setErrorPakai(false);
        }
      });
    },
    [idNamaObat],
    [state]
  );

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
        process.env.REACT_APP_URL + `/api/medis/search?obat=${valueObat}`,
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
    handleObat(
      suggestion.id_obat,
      suggestion.nama_obat,
      suggestion.jumlah,
      idx
    );
  };
  const isDisabled = () => {
    if (!valueObat) {
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

  return (
    <Grid container spacing={1} style={{ marginBottom: "5px", width: "100%" }}>
      <Grid item sm={4}>
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
          onSuggestionSelected={onNicknameSuggestionSelected}
          getSuggestionValue={getSuggestionNickname}
          renderSuggestion={renderSuggestion}
          label="Nama"
          inputProps={{
            placeholder: "Nama Obat ...",
            value: valueObat,
            onChange: (_, { newValue, method }) => {
              // console.log("newValue", newValue);
              setValueObat(newValue);
              clearData();
            },
            required: idNamaObat.length > 0 ? true : false,
            style: {
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
      </Grid>
      <Grid item sm={2}>
        <TextField
          label="Frekuensi"
          id="frekuensi_pemakaian"
          disabled={isDisabled()}
          className="text7"
          style={{
            width: "100%",
            margin: "0px ",
          }}
          variant="outlined"
          InputProps={{
            onChange: (e) =>
              handleChangeObat(e.target.name, e.target.value, idx),
            value: clearData ? dummyFrekuensi : frekuensi_pemakaian,
            name: "frekuensi_pemakaian",
          }}
          // error={errorFrekuensi}
          required={
            errorFrekuensi
              ? true
              : false || frekuensi_pemakaian === "" || !frekuensi_pemakaian
          }
          // helperText={
          //   errorFrekuensi && (
          //     <span style={{ color: "red", fontSize: "9px" }}>
          //       *Tidak Boleh Kosong
          //     </span>
          //   )
          // }
        />
      </Grid>
      <Grid item sm={3}>
        <FormControl
          style={{
            marginTop: "0",
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {customAdd ? (
            <TextField
              style={{
                width: "100%",
                margin: "  0 ",
                padding: "0",
              }}
              margin="dense"
              label="Cara Pakai"
              variant="outlined"
              type="text"
              placeholder="Cara Pakai"
              disabled={isDisabled()}
              InputProps={{
                className: "text1Props",

                endAdornment: customAdd ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setCustomAdd(false)}
                      disabled={isDisabled()}
                      edge="end"
                    >
                      <Clear
                        style={{ fontSize: "20px", paddingRight: "5px" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end"></InputAdornment>
                ),
              }}
              className="text1"
              onChange={(e) => {
                setState({ ...state, cara_pemakaian: e.target.value });
                handleChangeObat("cara_pemakaian", e.target.value, idx);
              }}
              // error={errorPakai ? true : false}
              required={
                errorPakai
                  ? true
                  : false || cara_pemakaian === "" || !cara_pemakaian
              }

              // helperText={
              //   errorPakai && (
              //     <span style={{ color: "red", fontSize: "9px" }}>
              //       Tidak Boleh Kosong{" "}
              //     </span>
              //   )
              // }
            />
          ) : (
            <TextField
              select
              margin="dense"
              variant="outlined"
              label="Cara Pakai"
              className="text1"
              InputProps={{
                className: "text1Props",
                name: "cara_pemakaian",
                onChange: (e) =>
                  handleChangeObat(e.target.name, e.target.value, idx),
              }}
              style={{
                width: "100%",
                margin: "  0 ",
                padding: "0",
              }}
              SelectProps={{
                value: cara_pemakaian,
                // value: clearData ? dummyPakai : cara_pemakaian,

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
              // error={errorPakai ? true : false}
              required={
                errorPakai
                  ? true
                  : false || cara_pemakaian === "" || !cara_pemakaian
              }

              // helperText={
              //   errorPakai && (
              //     <span style={{ color: "red", fontSize: "9px" }}>
              //       Tidak Boleh Kosong{" "}
              //     </span>
              //   )
              // }
            >
              <MenuItem
                value="Sebelum Makan"
                size="small"
                margin="dense"
                className="text6-menu-item"
              >
                Sebelum Makan
              </MenuItem>
              <MenuItem
                value="Setelah Makan"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Setelah Makan
              </MenuItem>
              <MenuItem
                value="Pemakaian Luar"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Pemakaian Luar
              </MenuItem>
              <MenuItem
                value="Ditetes"
                className="text6-menu-item"
                size="small"
                margin="dense"
              >
                Ditetes
              </MenuItem>
              <hr />
              <MenuItem
                className="text6-menu-item"
                size="small"
                margin="dense"
                onClick={() => setCustomAdd(true)}
              >
                Lain - lain
              </MenuItem>
            </TextField>
          )}
        </FormControl>
      </Grid>
      <Grid item sm={1}>
        <TextField
          label="Jumlah"
          className="text5"
          id="jumlah"
          type="number"
          disabled={isDisabled()}
          style={{ width: "100%", fontSize: "10px" }}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: 1, max: 1000000 },
            name: "jumlah",
            onChange: (e) =>
              handleChangeObat(e.target.name, e.target.value, idx),
            value: clearData ? dummyJumlah : jumlah,
            className: "text5",
            style: { padding: "0", fontSize: "12px" },
          }}
          // error={
          //   stok && jumlah ? false : errorJumlah || jumlah === "" || !jumlah
          // }
          required={errorJumlah ? true : false || jumlah === "" || !jumlah}
          // helperText={
          //   idx && jumlah
          //     ? false
          //     : (errorJumlah && (
          //         <span style={{ color: "red", fontSize: "9px" }}>
          //           Tidak Boleh Kosong
          //         </span>
          //       )) ||
          //       jumlah == "" ||
          //       !jumlah
          // }
        />
      </Grid>
      <Grid item sm={1}>
        <Box component="span" display={displayButton()}>
          <div>
            <TextField
              id="stok"
              label="Stock"
              disabled
              className="text5"
              name="stokObat"
              value={stokObat}
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
    idNamaObat,
    setIdNamaObat,
    handleAddRow,
  } = props;
  const [dataObat, setDataObat] = useState({
    nama_obat: itemHistory ? itemHistory.obat.nama_obat : null,
    id_obat: itemHistory ? itemHistory.obat.id_obat : null,
    frekuensi_pemakaian: itemHistory
      ? itemHistory.obat.frekuensi_pemakaian
      : null,
    jumlah: itemHistory ? itemHistory.obat.jumlah : null,
    cara_pemakaian: itemHistory ? itemHistory.obat.cara_pemakaian : null,
    stok_obat: null,
  });

  const displayButton = () => {
    if (aksiHistory === "lihatData") {
      return "none";
    } else {
      return "block";
    }
  };
  const displayObat = () => {
    if (aksiHistory === "lihatData") {
      return "block";
    } else {
      return "none";
    }
  };
  const [onChangeObat, setOnChangeObat] = useState(false);

  // console.log("aksiHistory", aksiHistory);
  const handleObat = (id_obat, nama_obat, jumlah, idx) => {
    setIdNamaObat((prevState) => {
      const aa = prevState.map((r) => {
        if (r.idx === idx) {
          return {
            idx,
            id_obat,
            nama_obat,
            stok_obat: jumlah,
          };
        } else {
          return r;
        }
      });
      return aa;
    });
  };
  const handleChangeObat = (name, val, idx) => {
    setIdNamaObat((prevState) => {
      const aa = prevState.map((r) => {
        if (r.idx === idx) {
          return {
            ...r,
            [name]: val,
          };
        } else {
          return r;
        }
      });
      return aa;
    });
  };
  const handleRemove = (idx) => {
    setIdNamaObat((prevState) => prevState.filter((r) => r.idx != idx));
  };

  const dataNamaObat = dataObat.nama_obat && dataObat.nama_obat.split(",");
  const dataFrekuensi =
    dataObat.frekuensi_pemakaian && dataObat.frekuensi_pemakaian.split(",");
  const dataPakai =
    dataObat.cara_pemakaian && dataObat.cara_pemakaian.split(",");
  const disabledHistory = () => {
    if (aksiHistory === "lihatData") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        margin: "0 auto",
        padding: "0",
      }}
    >
      {aksiHistory === "lihatData" ? (
        <Grid
          container
          spacing={1}
          style={{ marginBottom: "5px", width: "100%" }}
        >
          <Grid item sm={4}>
            {dataNamaObat &&
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
                  disabled={disabledHistory()}
                  value={pharm}
                />
              ))}
          </Grid>
          <Grid item sm={2}>
            {dataFrekuensi &&
              dataFrekuensi.map((key) => (
                <TextField
                  label="Frekuensi"
                  disabled={disabledHistory()}
                  className="text7"
                  value={key}
                  style={{
                    width: "100%",
                    margin: "5px 0px",
                  }}
                  variant="outlined"
                />
              ))}
          </Grid>
          <Grid item sm={3}>
            {dataPakai &&
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
              ))}
          </Grid>
          <Grid item sm={1}>
            {dataObat.jumlah &&
              dataObat.jumlah.map((jum) => (
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
              ))}
          </Grid>
        </Grid>
      ) : (
        <>
          <Button className="btn-obat-add" type="button" onClick={handleAddRow}>
            Tambah Obat
          </Button>
          {idNamaObat &&
            idNamaObat.map((item, idx) => (
              <Grid container>
                {" "}
                <Grid item sm={11}>
                  <Row
                    key={item.id_obat}
                    value={item.nama_obat}
                    stok={item.stok_obat}
                    jumlah={item.jumlah}
                    cara_pemakaian={item.cara_pemakaian}
                    frekuensi_pemakaian={item.frekuensi_pemakaian}
                    dataHistoryState={dataHistoryState}
                    itemHistory={itemHistory}
                    aksiHistory={aksiHistory}
                    handleObat={handleObat}
                    idx={item.idx}
                    idNamaObat={idNamaObat}
                    setIdNamaObat={setIdNamaObat}
                    handleChangeObat={handleChangeObat}
                    onChangeObat={onChangeObat}
                    setOnChangeObat={setOnChangeObat}
                  />{" "}
                </Grid>
                <Box component="span" display={displayButton()}>
                  <Grid item sm={1}>
                    <Delete
                      style={{
                        color: "red",
                        margin: "0 0 0 0",
                        padding: "0 0 0 0",
                        fontSize: "30px",
                      }}
                      onClick={() => handleRemove(item.idx)}
                    >
                      remove
                    </Delete>
                  </Grid>
                </Box>
              </Grid>
            ))}
        </>
      )}
    </div>
  );
}
