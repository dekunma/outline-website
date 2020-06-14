import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ParticlesBg from 'particles-bg'
import SnackBar from 'components/Snackbar/Snackbar'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SendIcon from '@material-ui/icons/Send';

import client from '../../feathers'

import { useSelector, useDispatch } from 'react-redux'
import { updateEmail, 
				updatePassword, 
				setError, 
				setLogin,
				updateConfirmPassword
			 } from '../../actions'

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
      },
      content: {
        marginTop: "70px",
            minHeight: "calc(100vh - 123px)",
            width:'100%'
        },
};

const useStyles = makeStyles(styles);
var interval
export default function SignUp() {
	const classes = useStyles();

	const [ seconds, setSeconds ] = React.useState(5)
	const [ codeSent, setCodeSent ] = React.useState(false)
	const [ generatedCode, setGeneratedCode ] = React.useState('')
	const [ code, setCode ] = React.useState('')

	const email = useSelector(state => state.email)
	const password = useSelector(state => state.password)
	const cfmPassword = useSelector(state => state.cfmPassword)
	const error = useSelector(state => state.error)
	const login = useSelector(state => state.login)
	
	const dispatch = useDispatch()

	const signUp = () => {
		const regex  = /@7debate.club/
		if(!regex.test(email)){
			dispatch(setError(true,'Please Use the 7Debate Email'))
			setTimeout(() => {
				dispatch(setError(false,'Please Use the 7Debate Email'))
			},3000)
			return
		}
		console.log(cfmPassword)
		if(password !== cfmPassword){
			dispatch(setError(true,'The Two Passwords You Entered Are Not Identical'))
			setTimeout(() => {
				dispatch(setError(false,'The Two Passwords You Entered Are Not Identical'))
			},3000)
			return
		}

	}

	const sendCode = () => {
		if(!email){
			setError(true,'Please Enter Email')
			return
		}
		if(error.value){return}
		interval = setInterval(() => tick(), 1000);
			// const verificationCode = Math.random().toString().slice(-6);
			// client.service('verification')
			// .create({
			// 	email : this.state.email,
			// 	code  : verificationCode
			// })
			// .then(r => {
			// 	this.setState({
			// 		verificationCode:verificationCode,
			// 		success:true,
			// 		successMessage:"Code Sent"
			// 	})
			// 	setTimeout(() => {
			// 		this.setState({success:false})
			// 	}, 2500);
			// })
			// .catch(e => console.log(e))
	}

	const tick = () => {
		const newSeconds = seconds => seconds - 1
		if(newSeconds === 0){
			setSeconds(5)
			console.log('clean')
			clearInterval(interval);
			setCodeSent(false)
			return
		}

		setSeconds(seconds => seconds - 1)
		console.log(newSeconds())
		setCodeSent(true)
	}

  return (
    <div className={classes.content}>
        <ParticlesBg type="cobweb" num={60} color="#288484" bg={true} />
				<SnackBar
					place="bl"
					color="danger"
					icon={ErrorIcon}
					message={error.message}
					open={error.value}
					closeNotification={() => dispatch(setError(false, 'Invalid login'))}
					close
				/>
        <GridContainer>
            <GridItem xs={1} md={4}/>
            <GridItem xs={10} sm={10} md={4}>
            <Card>
                <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sign Up</h4>
                <p className={classes.cardCategoryWhite}>Create an Account Before Using VPN</p>
                </CardHeader>
                <CardBody>
                    <CustomInput
											labelText="Email"
											id="email"
											formControlProps={{
													fullWidth: true
											}}
											type='email'
											onChange={ev => dispatch(updateEmail(ev.target.value))}
											value={email}
                    />
                    <CustomInput
											labelText="Password"
											id="password"
											formControlProps={{
													fullWidth: true
											}}
											type='password'
											onChange={ev => dispatch(updatePassword(ev.target.value))}
											value={password}
                    />
										<CustomInput
											labelText="Confirm Password"
											id="cfmpassword"
											formControlProps={{
													fullWidth: true
											}}
											type='password'
											onChange={ev => dispatch(updateConfirmPassword(ev.target.value))}
											value={password}
                    />
										<CustomInput
											labelText="Verification Code"
											id="password"
											formControlProps={{
													fullWidth: true
											}}
											type='password'
											// onChange={ev => dispatch(updatePassword(ev.target.value))}
											// value={password}
                    />
                </CardBody>
                <CardFooter>
								{codeSent
									?<Button
										endIcon={<SendIcon/>}
										color="grey"
										disabled
									>
										Resend in: {seconds} Seconds
									</Button>
									:<Button 
										endIcon={<SendIcon/>}
										color="info"
										onClick={sendCode}
									>
										Get Verification Code
									</Button>
								}
								
								<Button 
									color="primary"
									onClick={signUp}
								>Sign Up
								</Button>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={1} md={4}/>
        </GridContainer>
        
    </div>
  );
}
