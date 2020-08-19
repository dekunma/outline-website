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

import client from '../../feathers'
import clipboard from 'clipboard-polyfill'

//styles
import styles from '../../assets/jss/material-dashboard-react/components/vipCardStyle'
const useStyles = makeStyles(styles)

export default function VipCard() {

    const classes = useStyles()

    const [ loading, setLoading ] = React.useState(true)
    const [ success, setSuccess ] = React.useState(false)
    const [ successMessage, setSuccessMessage ] = React.useState('')
    const [ data, setData ] = React.useState({})

    React.useEffect(() => {
        client.service('vip')
        .find()
        .then(r => {
            const data = r.data[0]
            setLoading(false)
            setData(data)
        })
    }, [])

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

            <p style={{fontSize:'2em'}} className={classes.cardCategory}>{data.name}</p>
            {loading
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
                <Quote text={data.URL + "#" + data.name}/>
            </div>
            }
            
            </CardHeader>
            <CardFooter stats>

                {loading
                ? <div />
                : <Button color='warning' onClick={ev => copyKey(data.URL + "#" + data.name)}>Copy Key</Button>
                }
            </CardFooter>
        </Card>
    )
}
