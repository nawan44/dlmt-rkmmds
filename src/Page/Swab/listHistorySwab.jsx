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
import TemplateSwab from "./templateSwab";
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

export default function ListHistorySwab(props) {
  let location = useLocation();
  const {
    setDataHistoryWeb,
    dataHistorySwab,
    open,
    setOpen,
    onSelected,
    tanggalValue,
    setTanggalValue,
  } = props;
  const [selectListHistory, setSelectListHistory] = useState({
    aksiHistorySwab: "",
    itemHistorySwab: null,
  });

  const titleMenu = () => {
    if (location.pathname === "/swab") {
      return "Swab";
    } else if (location.pathname === "/rekam-medis") {
      return "Rekam Medis";
    }
  };
  const handleChange = (event) => {
    setTanggalValue(moment(event).format("YYYY-MM"));
    onSelected();
  };
  const sortDataHistorySwab =
    dataHistorySwab &&
    dataHistorySwab.sort((a, b) => {
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
            id="tanggal"
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
                  Hasil Swab{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ width: "100%" }}>
              {sortDataHistorySwab &&
                sortDataHistorySwab.map((itemHistorySwab) => (
                  <TableRow
                    key={itemHistorySwab.id}
                    onClick={() => {
                      setSelectListHistory({
                        aksiHistorySwab: "lihatData",
                        itemHistorySwab,
                      });
                      setOpen(true);
                    }}
                    className="table-row-history"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="t-table-list-tgl"
                    >
                      {moment(itemHistorySwab.created_at).format(
                        " dddd, D MMMM  YYYY"
                      )}
                    </TableCell>

                    <TableCell align="left" className="t-table-list-diagnosa">
                      {itemHistorySwab.swab_antigen}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open && (
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
                  setOpen(false);
                }}
              >
                Keluar
              </CancelIcon>
            </Typography>
            <TemplateSwab
              dataHistorySwab={dataHistorySwab}
              aksiHistorySwab={selectListHistory.aksiHistorySwab}
              itemHistorySwab={selectListHistory.itemHistorySwab}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
}
