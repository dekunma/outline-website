import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
  } from "assets/jss/material-dashboard-react.js";
  
  const vipCardStyle = {
    cardCategory: {
        color: grayColor[0],
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0"
      },
    stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
        top: "4px",
        width: "16px",
        height: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        top: "4px",
        fontSize: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
    }
    },
  };
  
  export default vipCardStyle;
  