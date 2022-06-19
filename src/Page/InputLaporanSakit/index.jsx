import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  TextareaAutosize,
  Radio,
  RadioGroup,
  Paper,
  TextField,
  Button,
  Divider,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { Gap } from "../../component";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function InputLaporanSakit() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({ nama: null, posisi: null });
  const [keluhanState, setKeluhanState] = React.useState({});

  const handleChange = (event, keluhan) => {
    setState({ ...state, [event.target.name]: event.target.value });

    setKeluhanState({
      ...keluhanState,
      [keluhan]: {
        keterangan: event.target.value,
      },
    });
  };

  const upload = async (e) => {
    // const decoded = jwtDecode(localStorage.token);
    // if (decoded.exp < Date.now() / 1000) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   window.location.replace("/login");
    //   return false;
    // }
    e.preventDefault();
    history.push("/data-laporan-sakit");

    try {
      let form = {
        ...state,
      };

      const response = await fetch(
        process.env.REACT_APP_URL + "/api/sakit/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(form),
        }
      );
      const res = await response.json();

      setState({
        nama: "",
        posisi: "",
        sakit: [],
        keterangan: "",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleKeluhan = (event, keluhan) => {
    setKeluhanState({
      ...keluhanState,
      [keluhan]: {
        keterangan: event.target.value,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Paper className="papper-stepper">
        <form>
          <h4>Input Laporan Sakit</h4>
          <Divider style={{ margin: "15px 0" }} />
          <TextField
            className="input-search"
            id="nama"
            label="Nama "
            variant="outlined"
            name="nama"
            onChange={handleChange}
            value={state.nama}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon className="icon-search" />
          </IconButton>
          <Gap height={10} />
          <TextField
            className="inputan"
            id="posisi"
            label="posisi"
            type="posisi"
            autoComplete="current-ttl"
            variant="outlined"
            name="posisi"
            value={state.posisi}
            onChange={handleChange}
          />{" "}
          <Gap height={10} />
          <TableContainer component={Paper} className="tableFixHeader">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="headerTitle">Nama Keluhan</TableCell>
                  <TableCell className="headerTitle">Dirasakan</TableCell>
                  <TableCell className="headerTitle">Keterangan</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Demam{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Demam")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      onChange={(e) => handleChange(e, "Demam")}
                      value={state.keterangan}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Malam Susah Tidur{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Malam Susah Tidur")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      onChange={(e) => handleChange(e, "Malam Susah Tidur")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Batuk{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Batuk")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      onChange={(e) => handleChange(e, "Batuk")}
                      value={state.keterangan}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Tenggorokan Sakit{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Tenggorokan Sakit")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      onChange={(e) => handleChange(e, "Tenggorokan Sakit")}
                      value={state.keterangan}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Pegal - pegal{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Pegal - pegal")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) => handleChange(e, "Pegal - pegal")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Pusing{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Pusing")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) => handleChange(e, "Pusing")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Perasa Hilang (Mulut Pahit){" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) =>
                          handleKeluhan(e, "Perasa Hilang (Mulut Pahit)")
                        }
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) =>
                        handleChange(e, "Perasa Hilang (Mulut Pahit)")
                      }
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Penciuman Hilang (Hidung Mampet)
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) =>
                          handleKeluhan(e, "Penciuman Hilang (Hidung Mampet)")
                        }
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) =>
                        handleChange(e, "Penciuman Hilang (Hidung Mampet)")
                      }
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Lemas{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Lemas")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) => handleChange(e, "Lemas")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Diare{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Diare")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) => handleChange(e, "Diare")}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className="tableListNama"
                  >
                    Mual{" "}
                  </TableCell>
                  <TableCell className="tableListKelengkapan">
                    <FormControl className="form-radio" component="fieldset">
                      <RadioGroup
                        row
                        value={state.sakit}
                        onChange={(e) => handleKeluhan(e, "Mual")}
                      >
                        <FormControlLabel
                          className="radio-but"
                          value="Ya"
                          control={<Radio color="primary" />}
                          label="Ya"
                        />
                        <FormControlLabel
                          className="radio-but"
                          value="Tidak"
                          control={<Radio />}
                          label="Tidak"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                  <TableCell className="tableListKet">
                    <TextareaAutosize
                      style={{ width: 120, marginLeft: "5px" }}
                      rowsMin={3}
                      rowsMax={4}
                      value={state.keterangan}
                      onChange={(e) => handleChange(e, "Mual")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button type="submit" onClick={upload} className="btn-save">
            Save{" "}
          </Button>{" "}
          <Button className="btn-cancel">Cancel</Button>
        </form>
      </Paper>
    </div>
  );
}
