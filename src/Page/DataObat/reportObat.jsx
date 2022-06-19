import {
  Grid,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Card,
} from "@material-ui/core";
import { Close, Save, Report, Description } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "moment/locale/id";
import DateFnsUtils from "@date-io/date-fns";
import { id } from "date-fns/locale";
import jwtDecode from "jwt-decode";
import BeliExcel from "./beliExcel";
import KeluarExcel from "./keluarExcel";
import KeluarPdf from "./keluarPdf";
import BeliPdf from "./beliPdf";

export default function LaporanObat(props) {
  const { onSelected } = props;
  const [open, setOpen] = useState(false);

  const [tanggalValue, setTanggalValue] = useState(moment().format("YYYY-MM"));
  const [reportObat, setReportObat] = useState([]);
  const [kategori, setKategori] = useState("keluar");
  //   console.log("reportObat", reportObat);
  useEffect(() => {
    getDataReportObat([]);
  }, []);
  useEffect(() => {
    getDataReportObat([]);
  }, [onSelected]);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleChangeTanggal = (event) => {
    setTanggalValue(moment(event).format("YYYY-MM"));
    onSelected();
  };
  const handleChange = (event) => {
    event.preventDefault();
    setKategori(event.target.value);
    onSelected();
  };
  const getDataReportObat = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user");

      window.location.replace("/login");
      return false;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL +
          `/api/export/xlsx?kategori=${kategori}&tanggal=${moment(
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
      setReportObat(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const PilihLaporan = () => {
    if (kategori === "beli") {
      return (
        <BeliExcel reportObat={reportObat} setReportObat={setReportObat} />
      );
    } else if (kategori === "keluar") {
      return (
        <KeluarExcel reportObat={reportObat} setReportObat={setReportObat} />
      );
    } else {
      console.log("tidak ada");
    }
  };
  const PilihLaporanPdf = () => {
    if (kategori === "beli") {
      return <BeliPdf reportObat={reportObat} setReportObat={setReportObat} />;
    } else if (kategori === "keluar") {
      return (
        <KeluarPdf reportObat={reportObat} setReportObat={setReportObat} />
      );
    } else {
      console.log("tidak ada");
    }
  };
  return (
    <Grid container>
      <Grid
        style={{
          textAlign: "left",
          padding: "7px",
          margin: "5px 0",
          TextAlign: "center",
        }}
        item
        xs={12}
        sm={4}
      >
        <MuiPickersUtilsProvider locale={id} utils={DateFnsUtils}>
          <KeyboardDatePicker
            views={["year", "month"]}
            minDate="2021-07"
            maxDate={new Date()}
            openTo="year"
            id="tanggalValue"
            name="tanggalValue"
            style={{
              margin: "0 auto",
              TextAlign: "center",
              width: "100%",
            }}
            value={tanggalValue}
            onChange={(date) => handleChangeTanggal(date)}
            animateYearScrolling
            label="Pilih Bulan Laporan"
            InputLabelProps={{
              shrink: true,
              className: "get-date",
            }}
            className="title-date"
          />
        </MuiPickersUtilsProvider>{" "}
      </Grid>
      <Grid
        style={{
          textAlign: "left",
          margin: "5px 0",
          padding: "10px",
          float: "right",
        }}
        item
        xs={12}
        sm={4}
      >
        <FormControl>
          <TextField
            select
            margin="dense"
            variant="outlined"
            label="Jenis Laporan"
            className="text1"
            InputProps={{
              className: "text1Props",
            }}
            SelectProps={{
              //   onChange: handleChange,
              //   name: "kategori",
              //   value: kategori,
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
            id="kategori"
            style={{
              width: "120px",
              margin: "0px 5px 0 0  ",
              textAlign: "left",
            }}
            value={kategori}
            name="kategori"
            onChange={handleChange}
            defaultValue="beli"
          >
            <MenuItem
              value="beli"
              name="beli"
              size="small"
              margin="dense"
              className="text6-menu-item"
            >
              Masuk
            </MenuItem>
            <MenuItem
              value="keluar"
              name="keluar"
              size="small"
              margin="dense"
              className="text6-menu-item"
            >
              Keluar
            </MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid
        style={{
          textAlign: "left",
          margin: "5px 0",
          float: "right",
        }}
        item
        xs={12}
        sm={4}
      >
        <Button
          variant="contained"
          className="laporan"
          onClick={() => {
            setOpen("firstDialog", { ...open });
          }}
          startIcon={<Description />}
        >
          Download{" "}
        </Button>

        {/* <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          size="large"
          onClick={PilihLaporan()}
          className="tambah-obat"
          onClick={() => {
            setOpen("firstDialog", { ...open, listObat: !listObat });
          }}
          startIcon={<Report />}
        >
          Laporan{" "}
        </Button> */}
      </Grid>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open && open === "firstDialog"}
        className="dialog-action"
      >
        <DialogTitle className="customized-dialog-title">
          <Box className="dialog-title">Jenis Laporan</Box>
          <Box>
            <IconButton className="button-close-obat">
              <Close onClick={handleCloseDialog} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box>{PilihLaporan()}</Box> <Box>{PilihLaporanPdf()}</Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
