import React from 'react'
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Quote from '../../components/Typography/Quote'
import Primary from '../../components/Typography/Primary'
import Button from '../../components/CustomButtons/Button'
import clipboard from 'clipboard-polyfill'
import Skeleton from '@material-ui/lab/Skeleton';
import client from '../../feathers'
import CheckIcon from '@material-ui/icons/Check'
import SnackBar from '../../components/Snackbar/Snackbar'
import InfoIcon from '@material-ui/icons/Info';

import { useSelector } from 'react-redux'

export default function ServerCard(props) {

    const [ success, setSuccess ] = React.useState(false)
    const [ successMessage, setSuccessMessage ] = React.useState('')
    const [ info, setInfo ] = React.useState(false)
    const [ infoMessage, setInfoMessage ] = React.useState('') 
    const [ buttonDisabled, setButtonDisabled ] = React.useState(false)

    const login = useSelector(state => state.login)
    
    const copyKey = (key) => {
        setSuccess(true)
        setSuccessMessage('Key Copied')
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
        clipboard.writeText(key)
    }

    const getNewAccessKey = (URL) => {
        setInfo(true)
        setInfoMessage('Getting your access key...')
        setButtonDisabled(true)
        //get new accesskey throw proxy
        client.service('proxy/new-key')
        .create({URL:URL})
        .then(r => {
          const id = r.id
    
          //change the name of the access key through proxy
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
      }

    return (
        
        <React.Fragment>
            
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

            <GridItem xs={12} sm={6} md={6}>
                <Card>
                <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                    <Cloud/>
                    </CardIcon>

                    <p style={{fontSize:'2em'}} className={props.classes.cardCategory}>{props.name}</p>
                    {props.accessKey !== undefined
                    ? //if loading finished
                    props.accessKey !== null
                        ? //if user has access key
                        <div>
                            {/* <p style={{color:'black'}}>Access key: </p> */}
                            <Primary>Access Key: </Primary>
                            <Quote text={props.accessKey + "#" + props.name}/>
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
                    <div className={props.classes.stats}>
                    {props.accessKey !== undefined
                    ? //if loading finished
                        props.accessKey !== null
                        ? //if user has access key
                            <Button color='primary' onClick={ev => copyKey(props.accessKey + "#" + props.name)}>Copy Key</Button>
                        : //if user does not have access key
                            //check if the user has clicked the button
                            buttonDisabled
                            ? <Button disabled>Getting Key...</Button>
                            : <Button color='primary' onClick={ev => getNewAccessKey(props.URL)}>Get key</Button>
                    :// if still loading
                        <div/>}

                    </div>
                </CardFooter>
                </Card>
            </GridItem>
        </React.Fragment>
    )
}