import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/id";
import DateFnsUtils from "@date-io/date-fns";
import { id } from "date-fns/locale";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";

export default function Kunjungan(props) {
  const { onSelected } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [dataKunjungan, setDataKunjungan] = useState([]);

  const [tanggalValue, setTanggalValue] = useState(moment().format("YYYY-MM"));

  const handleChange = (event) => {
    setTanggalValue(moment(event).format("YYYY-MM"));
    onSelected();
  };
  useEffect(() => {
    getDataKunjungan([]);
  }, []);
  useEffect(() => {
    getDataKunjungan([]);
  }, [onSelected]);
  const getDataKunjungan = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL +
          `/api/visit/pasien?tanggal=${moment(tanggalValue).format("YYYY-MM")}`
      );
      let res = await response.json();
      setDataKunjungan(res.data);
      //console.log(res.data);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  const sortKunjungan =
    dataKunjungan &&
    dataKunjungan.sort(
      (b, a) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      style={{ textAlign: "center", margin: "0 auto" }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        style={{ textAlign: "center", margin: "0 auto" }}
      >
        <Typography style={{ margin: "10px 0" }}>Data Kunjungan</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        style={{ textAlign: "center", margin: "0 auto", marginBottom: "15px" }}
      >
        <MuiPickersUtilsProvider locale={id} utils={DateFnsUtils}>
          <KeyboardDatePicker
            views={["year", "month"]}
            openTo="year"
            id="tanggalValue"
            name="tanggalValue"
            value={tanggalValue}
            minDate="2021-07"
            maxDate={new Date()}
            onChange={(date) => handleChange(date)}
            animateYearScrolling
            label="Pilih Bulan Kunjungan"
            InputLabelProps={{
              shrink: true,
              className: "get-date",
            }}
            className="title-date"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <TableContainer className="table-lihat-obat-container ">
        <Typography
          color="textSecondary"
          style={{ textAlign: "left" }}
          gutterBottom
        >
          Jumlah Kunjungan :
          <span style={{ color: "red" }}> {dataKunjungan?.length} </span>Orang
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "100px" }}
                className="header-title-lihat-obat"
              >
                Nama Karyawan
              </TableCell>
              <TableCell
                style={{
                  width: "90px",
                }}
                className="header-title-lihat-obat"
              >
                Tanggal Kunjungan
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortKunjungan &&
              sortKunjungan.map((row) => (
                <TableRow>
                  <TableCell className="table-list-lihat-obat">
                    {row.nama_pasien}
                  </TableCell>
                  <TableCell className="table-list-lihat-obat">
                    {moment(row.tanggal).format("dddd, D MMMM  YYYY")}
                  </TableCell>
                  {/* <TableCell className="table-list-lihat-obat-2">
                    {row.hasil_swab}
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
