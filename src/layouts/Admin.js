import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
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
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setServers } from '../actions'

import { DominoSpinner } from "react-spinners-kit";
import { primaryColor } from '../assets/jss/material-dashboard-react'

let ps;

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
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("green");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true)

  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  //authenticate
  React.useEffect(() => {
    client.authenticate()
    .then(r => {
      const userEmail = r.user.email
      dispatch(setLogin(true,r.user._id, userEmail))
      setLoading(false)

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

          // //用后端的proxy获得server的数据
          // client.service('proxy/servers')
          // .create({
          //   URL:s.URL
          // })
          // .then(r => {
          //   const singleServerData = {
          //     name: r.name,
          //     version: r.version,
          //     status: s.status
          //   }
          //   servers.push(singleServerData)
          //   // 解决tmd异步机制，只在获取到两台服务器数据的时候才dispatch
          //   if(servers.length === 2){
          //     dispatch(setServers(servers))
          //   }
          // })
          // .catch(e => console.log(e))
        })
      })
    })
    .catch(e => {setLoading(false)})
  },[])
  // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);
    
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // }, [mainPanel]);
  
  if(loading){
    return(
      <div>
        <div style={{margin:'auto', position:'absolute', top:0, left:0, right:0, bottom:0, width:100, height:10}}>
          <DominoSpinner color={primaryColor[0]} />
        </div>
      </div>
   
    )
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
        {/* <button onClick={ev => console.log(servers)}>Click</button> */}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
