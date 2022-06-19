import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { renderToString } from "react-dom/server";
import { Button } from "@material-ui/core";
import { Description } from "@material-ui/icons";

const BeliPdf = (reportObat, setReportObat) => {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Laporan Data Obat";
    const headers = [
      [
        "ID OBAT",
        "NAMA OBAT",
        "TANGGAL EXPIRED",
        "DESKRIPSI",
        "STOK AWAL",
        "STOK AKHIR",
      ],
    ];

    const data = reportObat.reportObat?.map((elt) => [
      elt.id_obat,
      elt.nama_obat,
      elt.tgl_expired,
      elt.deskripsi,
      elt.stok_awal,
      elt.stok_akhir,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div>
      {" "}
      <Button
        variant="contained"
        className="laporan"
        startIcon={<Description />}
        onClick={exportPDF}
      >
        PDF Beli
      </Button>
    </div>
  );
};
export default BeliPdf;
