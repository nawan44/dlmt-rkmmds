import {
  FormLabel,
  Grid,
  TextField,
  FormControl,
  Button,
  Box,
  Divider,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Gap } from "../../component";
import moment from "moment";
import "moment/locale/id";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";

export default function FormRekamSwab(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { namaValue, nikValue, itemHistorySwab, aksiHistorySwab, clearState } =
    props;
  const [times, setTimes] = useState({});
  const [state, setState] = useState({
    nama: null,
    nik: null,
    hasil_swab: itemHistorySwab ? itemHistorySwab.swab_antigen : "",
    created_at: itemHistorySwab ? itemHistorySwab.created_at : "",
  });
  useEffect(() => {
    setInterval(() => setTimes(moment().format("DD MMMM YYYY")), 1000);
  });
  useEffect(() => {
    setState({
      ...state,
      nama: namaValue,
      nik: nikValue,
    });
  }, [namaValue, nikValue]);
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = async (e) => {
    const decoded = jwtDecode(localStorage.token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
      return false;
    }

    if (e) {
      try {
        let form = {
          data: {
            nama: state.nama,
            nik: state.nik,
            hasil: state.hasil_swab,
          },
        };
        const response = await fetch(
          process.env.REACT_APP_URL + "/api/medis/swab",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(form),
          }
        );
        clearState();
        enqueueSnackbar("Data Swab Berhasil", { variant: "success" });
        setState({
          nama: "",
          nik: "",
          hasil_swab: "",
        });
        window.location.reload();
      } catch (err) {
        enqueueSnackbar(err, { variant: "error" });
      }
    } else {
      console.log("Masukkan data lengkap");
    }
  };
  const isDisabled = () => {
    if (aksiHistorySwab === "lihatData") {
      return true;
    } else {
      return false;
    }
  };
  const displayButton = () => {
    if (aksiHistorySwab === "lihatData") {
      return "none";
    } else {
      return "block";
    }
  };

  return (
    <div className="container-form-rekam-medis">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Gap height={20} />
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            <Gap height={10} />
            <Grid container spacing={1} style={{ height: "80px" }}>
              <Grid item sm={3}>
                <TextField
                  margin="dense"
                  label="Tanggal Periksa"
                  style={{ width: "100%" }}
                  variant="outlined"
                  className="text2"
                  disabled
                  value={
                    aksiHistorySwab === "lihatData"
                      ? moment(state.created_at).format(" dddd, D MMMM  YYYY")
                      : times
                  }
                  name="tgl_pemeriksaan"
                  id="tgl_pemeriksaan"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>{" "}
              <Grid item sm={3}>
                <TextField
                  margin="dense"
                  label="Dokter"
                  style={{ width: "100%" }}
                  variant="outlined"
                  className="text2"
                  disabled
                  defaultValue="Surya Santosa, dr"
                />
              </Grid>
            </Grid>
            <Divider style={{ width: "100%" }} />
            <Gap height={5} />
            <Grid container spacing={1} style={{ padding: " 0 0 5px 0" }}>
              <Grid container spacing={1}>
                {" "}
                <FormLabel
                  className="t-sub-title"
                  style={{ margin: "5px 0 5px 5px" }}
                >
                  Hasil Pemeriksaan Swab
                </FormLabel>
              </Grid>
              <Grid container spacing={1} style={{ margin: "0 0 5px  0" }}>
                <Grid item sm={2.5}>
                  <FormControl>
                    <TextField
                      select
                      margin="dense"
                      variant="outlined"
                      label="Swab Antigen"
                      className="text4"
                      InputProps={{
                        className: "text6Props",
                      }}
                      SelectProps={{
                        onChange: handleChange,
                        value:
                          itemHistorySwab?.swab_antigen || state.hasil_swab,
                        name: "hasil_swab",
                        MenuProps: {
                          className: "text1-menu-props",
                          getContentAnchorEl: null,
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          size: "small",
                          margin: "dense",
                        },
                      }}
                      id="hasil_swab"
                      style={{
                        width: "120px",
                        margin: "0px 5px 0 0  ",
                        textAlign: "left",
                      }}
                      name="hasil_swab"
                      value={itemHistorySwab?.swab_antigen || state.hasil_swab}
                      disabled={isDisabled()}
                      onChange={handleChange}
                      error={errors.hasil_swab}
                      {...register("hasil_swab", { required: true })}
                    >
                      <MenuItem
                        name="positif"
                        value="positif"
                        size="small"
                        margin="dense"
                        className="text6-menu-item"
                      >
                        Positif
                      </MenuItem>
                      <MenuItem
                        name="positif"
                        value="negatif"
                        size="small"
                        margin="dense"
                        className="text6-menu-item"
                      >
                        Negatif
                      </MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>{" "}
                {errors.hasil_swab?.type === "required" && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "red",
                      margin: " 10px 0 0 0px",
                      float: "left",
                    }}
                  >
                    {" "}
                    *Tidak Boleh Kosong
                  </span>
                )}
              </Grid>
            </Grid>{" "}
            <Gap height={5} />
            <Grid spacing={1} container style={{ marginTop: "50px" }}>
              <Box
                component="span"
                display={displayButton()}
                style={{ width: "100%" }}
              >
                <Button
                  type="submit"
                  className="btn-save"
                  disabled={!namaValue}
                  style={{ margin: "5px 0 0 0" }}
                >
                  Save{" "}
                </Button>{" "}
              </Box>
            </Grid>{" "}
          </Grid>
        </Grid>
        <Gap height={30} />
      </form>
    </div>
  );
}
