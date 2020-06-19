import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector } from 'react-redux'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Status() {
  const classes = useStyles();
  const [ tableData, setTableData ] = React.useState([])

  const servers = useSelector(state => state.servers)

  React.useEffect(() => {
    const serverDataAsArr = []
    var counter = 1
    servers.map(s => {
      var singleData = []
      singleData.push(counter++)
      singleData.push(s.name)
      singleData.push(s.version)
      singleData.push(s.status)
      singleData.push(s.note)
      serverDataAsArr.push(singleData)
      return null
    })
    setTableData(serverDataAsArr)
  },[servers])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Server Status</h4>
            <p className={classes.cardCategoryWhite}>
              Here is the status for servers
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["id", "Location", "Version", "Status", "Note"]}
              tableData={tableData}
            />
          </CardBody>
        </Card>
      </GridItem>
      {/* <button onClick={ev => console.log(servers)}>Click</button> */}
    </GridContainer>
  );
}
