import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import LihatObat from "../DataObat/lihatObat";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";

export default function CardPharamcy() {
  const [dataObat, setDataObat] = useState([]);
  useEffect(() => {
    getDataObat();
  }, []);
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  return (
    <Container
      style={{
        marginTop: "30px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <LihatObat />
    </Container>
  );
}
