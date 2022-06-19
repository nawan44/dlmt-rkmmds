import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Divider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Gap } from "../../component";
import jwtDecode from "jwt-decode";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function DataLaporanSakit() {
  const [dataLaporanSakit, setDataLaporanSakit] = useState([]);
  useEffect(() => {
    getDataLaporanSakit();
  }, []);
  const getDataLaporanSakit = async () => {
    // const decoded = jwtDecode(localStorage.token);
    // if (decoded.exp < Date.now() / 1000) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   window.location.replace("/login");
    //   return false;
    // }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "/api/sakit/data",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let res = await response.json();
      setDataLaporanSakit(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="root">
      <Paper className="paper-table">
        <div className="container-title">
          <h3 className="title-laporan-sakit ">Data Laporan Sakit</h3>{" "}
        </div>
        <Gap height={10} />
        <Divider />
        <Gap height={10} />
        <TextField
          className="input-search"
          id="nama"
          label="Nama "
          variant="outlined"
          name="nama"
        />
        <Gap height={10} />
        <TextField
          className="inputan"
          id="tanggal-lahir"
          label="Tanggal Lahir "
          type="date"
          variant="outlined"
          name="tanggalLahir"
          InputLabelProps={{ shrink: true, required: true }}
        />
        <Gap height={10} />
        <TextField
          className="inputan"
          id="Umur"
          label="Umur"
          variant="outlined"
          name="tanggalLahir"
        />
        <TableContainer component={Paper} className="tableFixHeader">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell align="left">Jabatan /Posisi </StyledTableCell>
                <StyledTableCell align="left">Keluhan Sakit</StyledTableCell>
                <StyledTableCell align="left">Tanggal</StyledTableCell>
                <StyledTableCell align="left">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLaporanSakit &&
                dataLaporanSakit.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.nama_karyawan}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.jabatan}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.keluhan_sakit.join(", ")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_at}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <EditIcon /> <DeleteIcon />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
