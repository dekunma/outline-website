import React from 'react'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from '@material-ui/icons/Star';
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Quote from '../../components/Typography/Quote'
import Warning from '../../components/Typography/Warning'
import Button from '../../components/CustomButtons/Button'
import Skeleton from '@material-ui/lab/Skeleton';
import CheckIcon from '@material-ui/icons/Check'
import SnackBar from '../../components/Snackbar/Snackbar'

import clipboard from 'clipboard-polyfill'

//styles
import styles from '../../assets/jss/material-dashboard-react/components/vipCardStyle'

const useStyles = makeStyles(styles)

export default function VipCard(props) {

    const classes = useStyles()

    const [ success, setSuccess ] = React.useState(false)
    const [ successMessage, setSuccessMessage ] = React.useState('')

    const copyKey = (key) => {
        setSuccess(true)
        setSuccessMessage('Key Copied')
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
        clipboard.writeText(key)
      }

    return(
        <Card>
            <SnackBar
                place="bl"
                color="success"
                icon={CheckIcon}
                message={successMessage}
                open={success}
                closeNotification={() => setSuccess(false)}
                close
            />
            <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
                <StarIcon fontSize="large"/>
            </CardIcon>

            <p style={{fontSize:'2em'}} className={classes.cardCategory}>{props.name}</p>
            {props.name === ''
            ? //if loading 
                <div>
                    <p style={{fontSize:'2em'}} className={classes.cardCategory}>loading</p>
                    <p>loading</p>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            : //if loading finished
            <div>
                <Warning color="warning">Access Key: </Warning>
                <Quote text={props.URL + "#" + props.name}/>
            </div>
            }
            
            </CardHeader>
            <CardFooter stats>

                {props.name === ''
                ? <div />
                : <Button color='warning' onClick={ev => copyKey(props.URL + "#" + props.name)}>Copy Key</Button>
                }
            </CardFooter>
        </Card>
    )
}
