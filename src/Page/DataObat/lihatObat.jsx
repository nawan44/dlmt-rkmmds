import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import moment from "moment";
import jwtDecode from "jwt-decode";

export default function LihatObat() {
  const [dataObat, setDataObat] = useState([]);

  useEffect(() => {
    getDataObat();
  }, []);
  const sortData =
    dataObat &&
    dataObat.sort((a, b) => {
      return (
        new Date(a.tgl_expired).getTime() - new Date(b.tgl_expired).getTime()
      );
    });

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
        process.env.REACT_APP_URL + "/api/medis/expired",
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

  return (
    <Grid
      xs={12}
      sm={12}
      container
      item
      style={{ textAlign: "center", margin: "0 auto" }}
    >
      {" "}
      <Grid
        xs={12}
        sm={12}
        item
        style={{
          textAlign: "center",
          margin: "40px 0px 10px 0",
        }}
      >
        <Typography>Data Obat Yang Akan Expired</Typography>
      </Grid>
      <TableContainer className="table-lihat-obat-container ">
        {" "}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "100px" }}
                className="header-title-lihat-obat"
              >
                Nama Obat
              </TableCell>
              <TableCell
                style={{
                  width: "90px",
                }}
                className="header-title-lihat-obat"
              >
                Tanggal Expired
              </TableCell>
              <TableCell
                style={{ width: "50px" }}
                className="header-title-lihat-obat-2"
              >
                Stok
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData &&
              sortData.map((row) => (
                <TableRow>
                  <TableCell className="table-list-lihat-obat">
                    {row.nama_obat}
                  </TableCell>
                  <TableCell className="table-list-lihat-obat">
                    {moment(row.tgl_expired).format("dddd, D MMMM  YYYY")}
                  </TableCell>
                  <TableCell className="table-list-lihat-obat-2">
                    {row.jumlah}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
