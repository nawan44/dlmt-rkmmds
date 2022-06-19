import { Button } from "@material-ui/core";
import React, { Fragment } from "react";
import ReactExport from "react-export-excel";
import { Description } from "@material-ui/icons";
// import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@material-ui/icons/Description";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const btnDownload = {
  width: "120px",
  margin: "10px 0",
  fontSize: "12px",
  padding: "9px 2px",
  float: "right",
};

function KeluarExcel(props) {
  const { reportObat, setReportObat } = props;

  return (
    <ExcelFile
      element={
        <Button
          variant="contained"
          className="laporan-excel"
          startIcon={<Description />}
        >
          Excel Keluar{" "}
        </Button>
      }
    >
      <ExcelSheet data={reportObat} name="Sheet2">
        <ExcelColumn label="Id Obat" value="id_obat" />
        <ExcelColumn label="Nama Obat" value="nama_obat" />
        <ExcelColumn label="Tanggal" value="tanggal" />
        <ExcelColumn label="Jumlah" value="jumlah" />
        <ExcelColumn label="User" value="user_input" />
      </ExcelSheet>
    </ExcelFile>
  );
}
export default KeluarExcel;
