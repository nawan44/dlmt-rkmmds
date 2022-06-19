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
import moment from "moment";
import jwtDecode from "jwt-decode";

export default function Covid() {
  const [dataCovid, setDataCovid] = useState([]);
  useEffect(() => {
    getDataCovid();
  }, []);

  const getDataCovid = async () => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/medis/dashboard/swab"
      );
      let res = await response.json();
      setDataCovid(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const sortCovid = dataCovid.sort(
    (b, a) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
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
        style={{ textAlign: "center", margin: "0 auto", marginTop: "40px" }}
      >
        <Typography style={{ margin: "10px 0" }}>Data Covid-19</Typography>
      </Grid>
      <TableContainer className="table-lihat-obat-container ">
        <Typography
          color="textSecondary"
          style={{ textAlign: "left" }}
          gutterBottom
        >
          Jumlah Positif :
          <span style={{ color: "red" }}> {dataCovid.length} </span>Orang
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
                Tanggal Periksa
              </TableCell>
              <TableCell
                style={{ width: "50px" }}
                className="header-title-lihat-obat-2"
              >
                Hasil Swab
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortCovid &&
              sortCovid.map((row) => (
                <TableRow>
                  <TableCell className="table-list-lihat-obat">
                    {row.nama_pasien}
                  </TableCell>
                  <TableCell className="table-list-lihat-obat">
                    {moment(row.tanggal).format("dddd, D MMMM  YYYY")}
                  </TableCell>
                  <TableCell className="table-list-lihat-obat-2">
                    {row.swab_antigen}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
