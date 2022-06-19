import "date-fns";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import {
  Table,
  Grid,
  Divider,
  TableBody,
  Typography,
  Paper,
  TableHead,
  TableContainer,
  TableCell,
  TableRow,
} from "@material-ui/core";
import TemplateRekamMedis from "./templateRekamMedis";
import CancelIcon from "@material-ui/icons/Cancel";
import moment from "moment";
import "moment/locale/id";
import { id } from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useLocation } from "react-router-dom";

export default function ListHistory(props) {
  let location = useLocation();
  const {
    setDataHistory,
    dataHistory,
    tanggalValue,
    setTanggalValue,
    onSelected,
    lihatHistory,
    setLihathistory,
  } = props;
  const { namaValue, nikValue } = props;
  const [selectListHistory, setSelectListHistory] = useState({
    aksiHistory: "",
    itemHistory: "",
  });
  const handleChange = (event) => {
    setTanggalValue(moment(event).format("YYYY-MM"));
    onSelected();
  };
  const titleMenu = () => {
    if (location.pathname === "/swab") {
      return "Swab";
    } else if (location.pathname === "/rekam-medis") {
      return "Rekam Medis";
    }
  };
  const sortDataHistory =
    dataHistory &&
    dataHistory.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  return (
    <Grid container spacing={1} style={{ padding: "0px 20px" }}>
      <Grid item xs={12} container style={{ margin: "0px", padding: "0px" }}>
        <Typography className="title-list-riwayat">
          History {titleMenu()}
        </Typography>
        <MuiPickersUtilsProvider locale={id} utils={DateFnsUtils}>
          <KeyboardDatePicker
            views={["year", "month"]}
            minDate="2021-07"
            maxDate={new Date()}
            openTo="year"
            id="tanggalValue"
            name="tanggalValue"
            value={tanggalValue}
            selected={onSelected}
            onChange={(date) => handleChange(date)}
            animateYearScrolling
            label="Pilih Bulan dan Tahun"
            InputLabelProps={{
              shrink: true,
              className: "get-date",
            }}
            className="title-date"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} style={{ margin: "0px", padding: "0px" }}>
        <Gap height={5} />
        <TableContainer
          component={Paper}
          style={{ width: "100%", height: "180px" }}
          className="table-riwayat-header "
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={1}
                  className="t-header-title-tgl "
                  align="center"
                >
                  Tanggal Pemeriksaan
                </TableCell>
                <TableCell
                  colSpan={1}
                  className="t-header-title-diagnosa"
                  align="center"
                >
                  Kesimpulan / Saran{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ width: "100%" }}>
              {sortDataHistory &&
                sortDataHistory.map((itemHistory) => (
                  <TableRow
                    key={itemHistory.id}
                    onClick={() => {
                      setSelectListHistory({
                        aksiHistory: "lihatData",
                        itemHistory,
                      });
                      setLihathistory(true);
                    }}
                    className="table-row-history"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="t-table-list-tgl"
                    >
                      {moment(itemHistory.created_at).format(
                        " dddd, D MMMM  YYYY"
                      )}
                    </TableCell>

                    <TableCell align="left" className="t-table-list-diagnosa">
                      {itemHistory.diagnosa.kesimpulan}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="head-template">
          <Gap height={18} />
          <Divider />
          <Gap height={5} />
          <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>
            Riwayat {titleMenu()}
            <CancelIcon
              style={{
                backgroundColor: "red",
                color: "#fff",
                fontSize: "12px",
                margin: "0 0 0 5px",
              }}
              onClick={() => {
                setLihathistory(false);
              }}
            >
              Keluar
            </CancelIcon>
          </Typography>{" "}
          {lihatHistory && (
            <TemplateRekamMedis
              dataHistory={dataHistory}
              aksiHistory={selectListHistory.aksiHistory}
              itemHistory={selectListHistory.itemHistory}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
}
