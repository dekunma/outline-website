import React from "react";
// @material-ui
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";

import { useSelector } from 'react-redux'

import ServerCard from '../../components/ServerCard/ServerCard'
import AnnouncementHeader from '../../components/AnnouncementHeader/AnnouncementHeader'
import GridContainer from "components/Grid/GridContainer.js";
import VipCard from '../../components/VipCard/VipCard'
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const servers = useSelector(state => state.servers)
  const vipServers = useSelector(state => state.vipServers)
  const login = useSelector(state => state.login)

  return (
    <div>
      {/* Header to display admin announcement */}
      <AnnouncementHeader classes={classes} />

      <GridContainer>
          {login.vip
          ? 
            vipServers.map(s => (
              <GridItem xs={12} sm={6} md={6}>
                <VipCard {...s}/>
              </GridItem>
            ))
            

          : <React.Fragment/>}
          
        {servers.map(s => (
          <ServerCard {...s} classes={classes}/>
        ))}
      </GridContainer>
    </div>
  );
}
