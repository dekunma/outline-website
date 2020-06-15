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

export default function ForgetPassword() {
  const classes = useStyles();
  
  const [ error, setError ] = React.useState(false)
  const [ errorMessage, setErrorMessage ] = React.useState('')
  const [ success, setSeccess ] = React.useState(false)
	const [ successMessage, setSuccessMessage ] = React.useState('')
	const [ email, setEmail ] = React.useState('')
	const [buttonDisabled, setButtonDisabled] = React.useState(false)

  const updatePassword = () => {
		setButtonDisabled(true)
    if(!email){
      setError(true)
      setErrorMessage('Please Enter Your Email')
      setTimeout(() => {setError(false)}, 3000)
      return
    }
		
    client.service('authmanagement')
    .create({
			action:"sendResetPwd",
			value: {
				email:email
			}
		})
    .then(r => {
			setSeccess(true)
			setButtonDisabled(false)
      setSuccessMessage('Email Sent to ' + email)
			setEmail('')
			setTimeout(() => {
				window.location='/'
			}, 3000)

    })
    .catch(e => {
			setError(true)
			setButtonDisabled(false)
      setErrorMessage(e.message)
    })
    setTimeout(() => setSeccess(false),2500)    
  }

  return (
    <GridContainer>
    <GridItem xs={1} md={4} />
    <GridItem xs={10} md={4}>
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
			<Card>
				<CardHeader color="primary">
					<h4 className={classes.cardTitleWhite}>Retrive Your Password</h4>
					<p className={classes.cardCategoryWhite}>Please Enter Your Email Below to Get Verification Email</p>
				</CardHeader>
				<CardBody>
					<CustomInput
						labelText="Email Address"
						id="email"
						formControlProps={{
								fullWidth: true
						}}
						type='email'
						onChange={ev => setEmail(ev.target.value)}
						value={email}
					/>
				</CardBody>
				<CardFooter>
					{buttonDisabled
						?
							<Button 
								disabled
							>Sending Email...</Button>
						:
							<Button 
								color="primary"
								onClick={ev => updatePassword()}
							>Send Email</Button>
					}
					
				</CardFooter>
			</Card>

    </GridItem>

		<GridItem xs={1} md={4} />

    </GridContainer>
  );
}
