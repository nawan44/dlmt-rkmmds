import { Grid, Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import EditObat from "./editObat";
import moment from "moment";
import MaterialTable from "material-table";

export default function AdminObat({
  getDataObat,
  modalEdit,
  dataObat,
  setDataObat,
  itemSupport,
  open,
  setOpen,
  handleCloseDialog,
}) {
  return (
    <div>
      <MaterialTable
        title="Daftar Obat"
        columns={[
          {
            title: "Nama Obat",
            field: "nama_obat",
            maxWidth: "40%",
          },
          {
            maxWidth: "40%",
            title: "Tanggal Expired",
            field: "tgl_expired",
            type: "date",
            render: (rowData) =>
              moment(rowData.tgl_expired).format("dddd, D MMMM  YYYY"),
          },
          { title: "Stok", field: "jumlah", maxWidth: "10%" },
        ]}
        data={dataObat}
        options={{
          filtering: true,
          paging: false,
          title: false,
          actionsColumnIndex: -1,
          maxBodyHeight: "500px",
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (evt, rowData) => modalEdit(rowData),
            width: "10%",
            textAlign: "left",
          },
        ]}
      />{" "}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="dialog-konfirmasi"
      >
        <Grid container className="dialog-title-konfirmasi">
          <h3 className="title-dialog"> Edit Obat</h3>
          <IconButton className="button-close-obat" onClick={handleCloseDialog}>
            {" "}
            <Close onClick={handleCloseDialog} />
          </IconButton>
        </Grid>
        <DialogContent dividers>
          <EditObat
            itemSupport={itemSupport}
            handleCloseDialog={handleCloseDialog}
            getDataObat={getDataObat}
            dataObat={dataObat}
            setDataObat={setDataObat}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
