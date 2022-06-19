import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import moment from "moment";
import "moment/locale/id";
import AutoSuggest from "react-autosuggest";
import { useSnackbar } from "notistack";

export default function RestockObat(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const { handleCloseDialog, getDataObat } = props;
  const [value, setValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [nicknameSuggestions, setNicknameSuggestions] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [namaObatValue, setNamaObatValue] = useState("");
  const [expiredValue, setExpiredValue] = useState("");
  const [tanggalKirim, setTanggalKirim] = useState(null);
  const [restockObat, setRestockObat] = useState({
    namaObat: "",
    jumlah: 0,
    tanggal_expired: "",
  });
  useEffect(() => {
    setRestockObat({
      tanggal_expired: tanggalKirim,
    });
  }, [tanggalKirim]);
  useEffect(() => {
    searchDataObat();
  }, []);
  const handleChange = (event) => {
    setRestockObat({
      ...restockObat,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = async (e) => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    if (expiredValue) {
      if (e) {
        try {
          let form = {
            data: {
              namaObat: namaObatValue,
              jumlah: Number(restockObat.jumlah),
              tglExpired: expiredValue,
            },
          };
          const response = await fetch(
            process.env.REACT_APP_URL + "/api/medis/obat/restock",
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
          setRestockObat({
            namaObat: "",
            jumlah: 0,
            tanggal_expired: "",
          });
          enqueueSnackbar("Restock Obat Berhasil", { variant: "success" });
          handleCloseDialog();
          getDataObat();
        } catch (err) {
          enqueueSnackbar(err, {
            variant: "error",
          });
        }
      }
    } else {
      enqueueSnackbar("Nama Obat Tidak Ada", {
        variant: "error",
      });
    }
  };

  const searchDataObat = async () => {
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
    return dataObat.filter((obat) => regex.test(obat.nama_obat));
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
    setExpiredValue(suggestion.tgl_expired);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={1}
          style={{
            margin: "5px 0 5px  0",

            width: "100%",
          }}
          justify="flex-end"
        >
          <Grid item sm={5} style={{ margin: "7px 0 0 0" }}>
            <AutoSuggest
              suggestions={nicknameSuggestions}
              onSuggestionsClearRequested={() => setNicknameSuggestions([])}
              onSuggestionsFetchRequested={({ value }) => {
                setNicknameValue(value);
                setNicknameSuggestions(getSuggestions(value));
              }}
              id="nama_obat"
              onSuggestionSelected={onNicknameSuggestionSelected}
              getSuggestionValue={getSuggestionNickname}
              renderSuggestion={renderSuggestion}
              label="Nama"
              inputProps={{
                placeholder: "Nama Obat ...",
                value: value,
                onChange: (_, { newValue, method }) => {
                  setValue(newValue);
                },
                style: {
                  width: "100%",
                  height: "35px",
                  padding: "5px 10px",
                  margin: "0 5px 0 0",
                  fontFamily: "Helvetica, sans-serif",
                  fontWeight: 300,
                  fontSize: "12px",
                  borderRadius: "4px",
                  border: "1px solid #000",
                  color: "#000",
                  background: "#FAFAFA",
                },
              }}
              highlightFirstSuggestion={true}
            />
          </Grid>

          <Grid item xs={5} sm={5}>
            <TextField
              margin="dense"
              label="Expired Obat"
              variant="outlined"
              className="text4"
              value={
                namaObatValue
                  ? moment(expiredValue && expiredValue).format("DD MMMM YYYY")
                  : ""
              }
              name="nik"
              disabled
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item sm={2} xs={2}>
            <TextField
              id="Qty"
              margin="dense"
              label="Qty"
              className="text4"
              name="jumlah"
              type="number"
              value={restockObat.jumlah}
              style={{ maxWidth: "70px", margin: "8px 0 0 5px" }}
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 1, max: 100000 },
                value: restockObat.jumlah,
                onChange: handleChange,
                name: "jumlah",
              }}
              {...register("jumlah", {
                required: true,
              })}
              error={errors.jumlah}
            />{" "}
            {errors.jumlah?.type === "required" && (
              <span className="alert-dialog"> *Qty Tidak Boleh Kosong</span>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ margin: "5px 0 5px  0", width: "100%" }}
          justify="flex-end"
        >
          <Grid item sm={5}>
            {" "}
          </Grid>
          <Grid item sm={4}></Grid>
          <Grid item sm={3}></Grid>
        </Grid>

        <Button disabled={!value} type="submit" className="button-add-obat">
          Save
        </Button>
      </form>
    </div>
  );
}
