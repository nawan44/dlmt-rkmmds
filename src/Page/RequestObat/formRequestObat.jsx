import {
  Grid,
  TextField,
  FormControl,
  Button,
  Box,
  Divider,
  MenuItem,
  Checkbox,
  Select,
  InputLabel,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import moment from "moment";
import "moment/locale/id";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AutoSuggest from "react-autosuggest";
import { useSnackbar } from "notistack";
import AddObat from "../RekamMedis/addObat";

export default function FormRequestObat(props) {
  const [idNamaObat, setIdNamaObat] = useState([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { namaValue, nikValue, clearState, setNameFocused } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const nama = namaValue;
  const nik = nikValue;
  const [state, setState] = useState({
    nama: null,
    nik: null,
  });

  useEffect(() => {
    setState({
      ...state,
      nama: namaValue,
      nik: nikValue,
    });
  }, [namaValue, nikValue]);

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
  const validate = (val) => {
    const hitungJumlah = idNamaObat && idNamaObat.map((row) => row.id_obat);
    if (idNamaObat.length >= 0 && hitungJumlah) {
      return true;
    } else {
      return false;
    }
  };
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
                obat: idNamaObat,
                nama: state.nama,
                nik: Number(state.nik),
              },
            };
            const response = await fetch(
              process.env.REACT_APP_URL + "/api/medis/obat/keluar",
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
            setNameFocused(true);
            clearState();
            enqueueSnackbar("Request Obat Berhasil", { variant: "success" });
          } catch (err) {
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          }
          console.log("Data berhasil dimasukkan");
          reset({});
          window.location.reload();
        } else {
          enqueueSnackbar("Masukkan Data Obat", { variant: "error" });
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
  console.log("idNamaObat", idNamaObat);
  return (
    <div
      className="container-form-rekam-medis"
      style={{
        padding: " 0 0 0 10px",
        marginTop: "100px",
        width: "100%",
      }}
    >
      {" "}
      <Gap height={20} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddObat
          idNamaObat={idNamaObat}
          setIdNamaObat={setIdNamaObat}
          handleAddRow={handleAddRow}
        />{" "}
        <Button
          type="submit"
          disabled={!namaValue || idNamaObat.length == 0}
          className="btn-save"
          style={{
            margin: "5px 0 0 0",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Save{" "}
        </Button>
      </form>
    </div>
  );
}
