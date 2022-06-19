import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import "moment/locale/id";
import { id } from "date-fns/locale";
import { useSnackbar } from "notistack";

export default function EditObat(props) {
  const { handleCloseDialog, getDataObat, dataObat } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setKirimObat({
      ...kirimObat,
      [event.target.name]: event.target.value,
    });
  };
  const [tanggalKirim, setTanggalKirim] = useState(null);
  const [kirimObat, setKirimObat] = useState({
    namaObat: "",
    idObat: 0,
    jumlah: null,
    tglExpired: "",
  });
  useEffect(() => {
    setKirimObat({
      idObat: dataObat.id_obat,
      namaObat: dataObat.nama_obat,
      jumlah: dataObat.jumlah,
    });
  }, []);
  useEffect(() => {
    setTanggalKirim(moment(dataObat.tgl_expired).format("YYYY-MM-01"));
  }, []);
  const handleChangeTanggal = (event) => {
    setTanggalKirim(moment(event).format("YYYY-MM-01"));
  };
  const futureMonth = moment().format("YYYY-MM");

  const onSubmit = async (e) => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    if (e) {
      try {
        let form = {
          data: {
            idObat: kirimObat.idObat,
            namaObat: kirimObat.namaObat,
            tglExpired: tanggalKirim,
            jumlahBaru: Number(kirimObat.jumlah),
          },
        };
        const response = await fetch(
          process.env.REACT_APP_URL + "/api/super/obat/edit",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(form),
          }
        );
        const res = await response.json();
        handleCloseDialog();
        enqueueSnackbar("Edit Data Berhasil", { variant: "success" });

        getDataObat();
      } catch (err) {
        enqueueSnackbar(err, {
          variant: "error",
        });
      }
    }
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
          <Grid item xs={5} sm={5}>
            <TextField
              id="namaObat"
              margin="dense"
              label="Nama Obat"
              autoFocus
              style={{
                margin: "8px 5px 0 0",
                width: "100%",
              }}
              value={kirimObat.namaObat}
              variant="outlined"
              className="text4"
              InputProps={{
                value: kirimObat.namaObat,
                onChange: handleChange,
                name: "namaObat",
              }}
              {...register("namaObat", { required: true })}
              error={errors.namaObat}
            />{" "}
            {errors.namaObat?.type === "required" && (
              <span className="alert-dialog">
                {" "}
                *Nama Obat Tidak Boleh Kosong
              </span>
            )}
          </Grid>

          <Grid item xs={5} sm={5}>
            <MuiPickersUtilsProvider locale={id} utils={DateFnsUtils}>
              <DatePicker
                views={["year", "month"]}
                margin="dense"
                minDate="2021"
                inputVariant="outlined"
                openTo="year"
                id="tanggalKirim"
                value={tanggalKirim}
                onChange={handleChangeTanggal}
                animateYearScrolling
                label="Expired Obat"
                error={futureMonth > tanggalKirim ? true : false}
                className="text4"
                style={{ width: "95%", margin: "8px 0 0 10px" }}
                InputProps={{
                  name: "tanggalKirim",
                  ...register("tanggalKirim", {
                    required: true,
                    validate: (value) => {
                      return futureMonth < moment(value).format("YYYY-MM");
                    },
                  }),
                  error: errors.tanggalKirim,
                }}
              />{" "}
              {errors.tanggalKirim?.type === "required" && (
                <span className="alert-dialog">
                  {" "}
                  *Tanggal Expired Tidak Boleh Kosong
                </span>
              )}
              {errors.tanggalKirim?.type === "validate" && (
                <span className="alert-dialog"> * Expired &#60; 2 Bulan</span>
              )}
            </MuiPickersUtilsProvider>{" "}
          </Grid>
          <Grid item sm={2} xs={2}>
            <TextField
              id="Qty"
              margin="dense"
              label="Qty"
              className="text4"
              name="jumlah"
              type="number"
              value={kirimObat.jumlah}
              style={{ maxWidth: "70px", margin: "8px 0 0 5px" }}
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 1, max: 100000 },
                value: kirimObat.jumlah,
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
        <Button type="submit" className="button-add-obat">
          Save{" "}
        </Button>
      </form>
    </div>
  );
}
