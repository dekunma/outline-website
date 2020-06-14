import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackBar from 'components/Snackbar/Snackbar'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from '@material-ui/icons/Check'
// import client from '../feathers'


import client from '../../feathers'

import { useSelector } from 'react-redux'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const login = useSelector(state => state.login)
  
  const [ password, setPassword] = React.useState('')
  const [ cfmPassword, setCfmPassword ] = React.useState('')
  const [ error, setError ] = React.useState(false)
  const [ errorMessage, setErrorMessage ] = React.useState('')
  const [ success, setSeccess ] = React.useState(false)
  const [ successMessage, setSuccessMessage ] = React.useState('')

  const updatePassword = () => {
    if(!password){
      setError(true)
      setErrorMessage('Please Enter Password')
      setTimeout(() => {setError(false)}, 3000)
      return
    }
    if(!cfmPassword){
      setError(true)
      setErrorMessage('Please Confirm Password')
      setTimeout(() => {setError(false)}, 3000)
      return
    }
    if(password !== cfmPassword){
      setError(true)
      setErrorMessage('The Two Passwords You Entered Are Not Identical')
      setTimeout(() => {setError(false)}, 3000)
      return
    }
    client.service('users')
    .patch(login.userId, {password:password})
    .then(r => {
      setSeccess(true)
      setSuccessMessage('Password Changed')
      setPassword('')
      setCfmPassword('')
    })
    .catch(e => {
      setError(true)
      setErrorMessage(e.message)
    })
    setTimeout(() => setSeccess(false),2500)    
  }

  return (
    <div>
      <SnackBar
        place="bl"
        color="danger"
        icon={ErrorIcon}
        message={errorMessage}
        open={error}
        closeNotification={() => setError(false)}
        close
      />
      <SnackBar
        place="bl"
        color="success"
        icon={CheckIcon}
        message={successMessage}
        open={success}
        closeNotification={() => setSeccess(false)}
        close
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Change Your Account Setting</p>
            </CardHeader>
            <CardBody>
                  <CustomInput
                    labelText={login.email}
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                  <CustomInput
                    labelText="New Password"
                    id="password"
                    formControlProps={{
                        fullWidth: true
                    }}
                    type='password'
                    onChange={ev => setPassword(ev.target.value)}
                    value={password}
                  />
                  <CustomInput
                    labelText="Confirm New Password"
                    id="cfmpassword"
                    formControlProps={{
                        fullWidth: true
                    }}
                    type='password'
                    onChange={ev => setCfmPassword(ev.target.value)}
                    value={cfmPassword}
                  />
            </CardBody>
            <CardFooter>
              <Button 
                color="primary"
                onClick={ev => updatePassword()}
              >Update Password</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
