import { Button } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import React, { Fragment } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const btnDownload = {
  width: "120px",
  margin: "10px 0",
  fontSize: "12px",
  padding: "9px 2px",
  float: "right",
  "&:hover": {
    backgroundColor: "red",
    color: "green",
  },
  // border: "no",
};

function BeliExcel(props) {
  const { reportObat, setReportObat } = props;
  return (
    <ExcelFile
      element={
        <Button
          variant="contained"
          className="laporan-excel"
          startIcon={<Description />}
        >
          Excel Beli
        </Button>
      }
    >
      <ExcelSheet data={reportObat} name="Beli Obat">
        <ExcelColumn label="Id Obat" value="id_obat" />
        <ExcelColumn label="Nama Obat" value="nama_obat" />
        <ExcelColumn label="Tanggal Expired" value="tanggal_expired" />
        <ExcelColumn label="Stok Awal" value="stok_awal" />
        <ExcelColumn label="Stok Akhir" value="stok_akhir" />
        <ExcelColumn label="Deskripsi" value="deskripsi" />

        {/* <ExcelColumn label="Marital Status"
                        value={(col) => col.is_married ? "Married" : "Single"} /> */}
      </ExcelSheet>
    </ExcelFile>
  );
}
export default BeliExcel;
