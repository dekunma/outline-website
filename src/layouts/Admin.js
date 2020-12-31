import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-4.jpg";
import logo from "assets/img/outline-logo.png";

import client from '../feathers'

import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setServers, setAnnouncement, setVipServers } from '../actions'

import Loading from '../views/Loading/Loading'

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/console") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/console" to="/console/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("green");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true)

  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  //authenticate
  React.useEffect(() => {
    client.authenticate()
    .then(r => {
      const userEmail = r.user.email
      const vipState = r.user.vip ? true : false
      dispatch(setLogin(true,r.user._id, userEmail, vipState))
      setLoading(false)

      //get vip servers
      client.service('vip')
      .find()
      .then(r => {
          const data = r.data
          dispatch(setVipServers(data))
      })

      //get announcement
      client.service('announcements')
      .find({query:{
        $limit:1, 
        $sort: {
          createdAt: -1
        }
      }})
      .then(r => {
        dispatch(setAnnouncement(r.data[0].content))
      })

      //get server status
      client.service('servers')
      .find()
      .then(r => {
        const serverIds = r.data
        const servers = []
        serverIds.map(s => {
          //用后端的proxy获得access keys
          client.service('proxy/access-keys')
          .create({
            URL:s.URL
          })
          .then( r => {
            let userKey = null
            r.accessKeys.map(key => {
              //if find the user's access-key
              if(key.name === userEmail){
                userKey=key.accessUrl
              }
              return null
            })
            const singleServerData = {
              name: s.name,
              version: s.version,
              status: s.status,
              accessKey: userKey,
              URL:s.URL,
              note: s.note
            }
            servers.push(singleServerData)
            // 解决tmd异步机制
            if(servers.length === serverIds.length){
              dispatch(setServers(servers))
            }
          })
          .catch(e => console.log(e))
          return null
        })
      })
    })
    .catch(e => {setLoading(false)})
  },[dispatch])
  
  if(loading){
    return(<Loading/>)
  }
  if(!login.value){
    return(<Redirect to='/sign-in'/>)
  }
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"7Debate-VPN"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
      
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
