import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  containerFooter: {
    color: "#fff",
    backgroundColor: "#3F51B5",
    height: "auto",
    width: "100%",
    float: "left",
    textAlign: "center",
    margin: "0 auto",
    marginTop: "50px",
    padding: "20px 0",
    fontSize: "16px",
    bottom: "0",
  },
});

export default function Footer() {
  const classes = useStyles();

  return <div className={classes.containerFooter}>@delameta</div>;
}
