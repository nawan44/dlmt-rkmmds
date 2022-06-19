import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import { Close, Save } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import InputObat from "./inputObat";
import EditObat from "./editObat";
import moment from "moment";
import jwtDecode from "jwt-decode";
import MaterialTable from "material-table";
import RestockObat from "./restockObat";
import AdminObat from "./adminObat";

import "moment/locale/id";

import LaporanObat from "./reportObat";

export default function DataObat({ aksiObat }) {
  const [open, setOpen] = useState(false);
  const permanentMenu = localStorage.getItem("user");
  const userData = JSON.parse(permanentMenu);
  const { listObat } = open;
  const [dataObat, setDataObat] = useState([]);
  const [itemSupport, setItemSupport] = useState();
  const [onSelected, setOnSelected] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenCloseFormEdit = (params) => {
    setOpen(!open);
    setDataObat(params);
    return (
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
            <Close onClick={handleCloseDialog} />
          </IconButton>
        </Grid>
        <DialogContent dividers>
          <EditObat
            handleClose={handleCloseDialog}
            getDataObat={getDataObat}
            dataObat={dataObat}
            setDataObat={setDataObat}
          />
        </DialogContent>
      </Dialog>
    );
  };
  useEffect(() => {
    getDataObat();
  }, []);
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
        process.env.REACT_APP_URL + "/api/medis/obat",
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

  const adminObat = () => {
    if (userData.role === "admin") {
      return (
        <AdminObat
          dataObat={dataObat}
          setDataObat={setDataObat}
          getDataObat={getDataObat}
          modalEdit={handleOpenCloseFormEdit}
          itemSupport={itemSupport}
          open={open}
          setOpen={setOpen}
          handleCloseDialog={handleCloseDialog}
        />
      );
    } else {
      return (
        <>
          <Grid container style={{ margin: "0 auto", textAlign: "center" }}>
            <Grid container>
              <Grid
                style={{
                  textAlign: "left",
                  margin: "5px 0",
                }}
                item
                xs={12}
                sm={4}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="tambah-obat"
                  onClick={() => {
                    setOpen("firstDialog", { ...open, listObat: !listObat });
                  }}
                  startIcon={<Save />}
                >
                  Tambah Obat
                </Button>
              </Grid>
              <Grid
                style={{
                  textAlign: "left",
                  margin: "5px 0",
                }}
                item
                xs={8}
                sm={8}
              >
                <LaporanObat onSelected={() => setOnSelected(!onSelected)} />{" "}
              </Grid>
            </Grid>
          </Grid>
          <MaterialTable
            title="Daftar Obat"
            columns={[
              {
                title: "Nama Obat",
                field: "nama_obat",
                width: "350px",
              },
              {
                width: "300px",
                title: "Tanggal Expired",
                field: "tgl_expired",
                type: "date",
                render: (rowData) =>
                  moment(rowData.tgl_expired).format("dddd, D MMMM  YYYY"),
              },
              { title: "Stok", field: "jumlah", width: "50px" },
            ]}
            data={dataObat}
            options={{
              filtering: true,
              paging: false,
              title: false,
              actionsColumnIndex: -1,
              maxBodyHeight: "500px",
            }}
          />
        </>
      );
    }
  };

  return (
    <div spacing={2} className="container-obat">
      {adminObat()}
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open && open === "firstDialog"}
        className="dialog-action"
      >
        <DialogTitle className="obat-dialog-title">
          <Box className="dialog-title" style={{ padding: "0px 10px" }}>
            Tambah Obat
          </Box>
          <Box>
            <IconButton className="button-close-obat">
              <Close onClick={handleCloseDialog} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Button
            style={{
              width: "100%",
              float: "left",
              textAlign: "center",
              padding: "5px 0px",
              marginBottom: "10px",
              background: "#3f51b4",
              color: "#fff",
            }}
            onClick={() => {
              setOpen("secondDialog", { ...open, listObat: !listObat });
            }}
          >
            Input Obat Baru
          </Button>

          <Button
            style={{
              width: "100%",
              float: "left",
              textAlign: "center",
              padding: "5px 0px",
              background: "#3f51b4",
              color: "#fff",
            }}
            onClick={() => {
              setOpen("thirdDialog", { ...open, listObat: !listObat });
            }}
          >
            Restock Obat
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open && open === "secondDialog"}
        onClose={() => {
          setOpen(false);
        }}
        className="dialog-konfirmasi"
      >
        <Grid container className="dialog-title-konfirmasi">
          <h3 className="title-dialog"> Input Data Obat Baru</h3>
          <IconButton className="button-close-obat" onClick={handleCloseDialog}>
            {" "}
            <Close onClick={handleCloseDialog} />
          </IconButton>
        </Grid>
        <DialogContent dividers>
          <InputObat
            handleCloseDialog={handleCloseDialog}
            getDataObat={getDataObat}
            dataObat={dataObat}
            setDataObat={setDataObat}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open && open === "thirdDialog"}
        onClose={() => {
          setOpen(false);
        }}
        className="dialog-konfirmasi"
      >
        <Grid container className="dialog-title-konfirmasi">
          <h3 className="title-dialog"> Restock Obat</h3>
          <IconButton className="button-close-obat" onClick={handleCloseDialog}>
            {" "}
            <Close onClick={handleCloseDialog} />
          </IconButton>
        </Grid>
        <DialogContent dividers>
          <RestockObat
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
