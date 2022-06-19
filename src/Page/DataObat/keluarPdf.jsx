import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { renderToString } from "react-dom/server";
import { Button } from "@material-ui/core";
import { Description } from "@material-ui/icons";

const KeluarPdf = (reportObat, setReportObat) => {
  const exportPDF = () => {
    const unit = "pt";
    // const aa = [reportObat];
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Laporan Data Obat";
    const headers = [
      ["ID OBAT", "NAMA OBAT", "JUMLAH", "TANGGAL", "USER INPUT"],
    ];
    // console.log("reportObat", reportObat);
    // cuk.map((r, i) => ({
    //   id_obat: cok[i].id_obat,
    //   nama_obat: cok[i].nama_obat,
    //   frekuensi_pemakaian: r.frekuensi_pemakaian,
    //   jumlah: r.jumlah,
    //   cara_pemakaian: r.cara_pemakaian,
    //   stok_obat: r.stok_obat,
    // }))

    const data = reportObat.reportObat?.map((elt) => [
      elt.id_obat,
      elt.nama_obat,
      elt.jumlah,
      elt.tanggal,
      elt.user_input,
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
        PDF Keluar
      </Button>
    </div>
  );
};
export default KeluarPdf;
