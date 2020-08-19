import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Quote from '../../components/Typography/Quote'
import Primary from '../../components/Typography/Primary'
import CheckIcon from '@material-ui/icons/Check'
import SnackBar from '../../components/Snackbar/Snackbar'
import InfoIcon from '@material-ui/icons/Info';
import VipCard from '../../components/VipCard/VipCard'

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import renderHTML from 'react-render-html';
import client from '../../feathers'
import Button from '../../components/CustomButtons/Button'
import { useSelector } from 'react-redux'
import clipboard from 'clipboard-polyfill'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [announcement, setAnnouncement] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [info, setInfo] = React.useState(false)
  const [infoMessage, setInfoMessage] = React.useState('')

  const servers = useSelector(state => state.servers)
  const login = useSelector(state => state.login)

  React.useEffect(() => {
    console.log(login)
    //get new announcement
    client.service('announcements')
    .find({query:{
      $limit:1, 
      $sort: {
        createdAt: -1
      }
    }})
    .then(r => {
      setAnnouncement(r.data[0].content)
    })
  }, [])

  
  const getNewAccessKey = (URL) => {
    setInfo(true)
    setInfoMessage('Getting your access key...')
    setButtonDisabled(true)
    // servers.map(s => {
      //get new accesskey throw proxy
    client.service('proxy/new-key')
    .create({URL:URL})
    .then(r => {
      const id = r.id

      //change the name of the access key throw proxy
      client.service('proxy/change-name')
      .create({
        id:id,
        URL:URL,
        newName:login.email
      })
      .then(r => {
        window.location.reload(false)
      })

    })
    // })
  }

  const copyKey = (key) => {
    setSuccess(true)
    setSuccessMessage('Key Copied')
    setTimeout(() => {
      setSuccess(false)
    }, 2000)
    clipboard.writeText(key)
  }

  return (
    <div>

      <SnackBar
        place="bl"
        color="success"
        icon={CheckIcon}
        message={successMessage}
        open={success}
        closeNotification={() => setSuccess(false)}
        close
      />

      <SnackBar
        place="bl"
        color="info"
        icon={InfoIcon}
        message={infoMessage}
        open={info}
        closeNotification={() => setInfo(false)}
        close
      />

      <GridContainer>

      <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Announcement</h4>
              <p className={classes.cardCategoryWhite}>
                New announcement published by admin
              </p>
            </CardHeader>
            <CardBody>
              {announcement !== ''
                ? //if loading finished
                  renderHTML(announcement)
                : //if loading
                  <Skeleton/>
              }
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>

      <GridContainer>
        
          
          {login.vip
          ? 
            <GridItem xs={12} sm={6} md={6}>
              <VipCard />
            </GridItem>

          : <React.Fragment/>}
          
        {servers.map(s => (
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Cloud/>
                </CardIcon>

                <p style={{fontSize:'2em'}} className={classes.cardCategory}>{s.name}</p>
                {s.accessKey !== undefined
                ? //if loading finished
                  s.accessKey !== null
                    ? //if user has access key
                      <div>
                        {/* <p style={{color:'black'}}>Access key: </p> */}
                        <Primary>Access Key: </Primary>
                        <Quote text={s.accessKey + "#" + s.name}/>
                      </div>
                    
                    : //if user does not have access key
                      <div>
                        <p>note</p>
                        <Quote text='Please click the button below to get an acess key for VPN' />
                      </div>
                : //if loading
                <div>
                  <p>loading</p>
                  <Skeleton/>
                  <Skeleton/>
                </div>
                }
                
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {s.accessKey !== undefined
                  ? //if loading finished
                    s.accessKey !== null
                      ? //if user has access key
                        <Button color='primary' onClick={ev => copyKey(s.accessKey + "#" + s.name)}>Copy Key</Button>
                      : //if user does not have access key
                        //check if the user has clicked the button
                        buttonDisabled
                        ? <Button disabled>Getting Key...</Button>
                        : <Button color='primary' onClick={ev => getNewAccessKey(s.URL)}>Get key</Button>
                  :// if still loading
                    <div/>}
                  

                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>

    </div>
  );
}
