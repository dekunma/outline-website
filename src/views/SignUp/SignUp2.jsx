import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ParticlesBg from 'particles-bg'
import SnackBar from 'components/Snackbar/Snackbar'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from '@material-ui/icons/Check'
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

import client from '../../feathers'

const styles = theme => ({
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
});

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            cfmPassword:"",
            code:"",
            helperText: '', 
            error: false,
            seconds:60,
          }
		}
		
	updateField(name, ev) {
      const regex  = /@7debate.club/
      if(name === 'email'){
        if(!regex.test(ev.target.value)){
          this.setState({errorMessage:"Please use a 7Debate email", error:true, [name]: ev.target.value})
          return
        }
      }
      this.setState({ [name]: ev.target.value, error:false });
    }

    async login() {
      const { email, password } = this.state;
      try {
        client.authenticate({
          strategy: 'local',
          email, password
        })
        .then(r => {this.props.history.push("/");})
        .catch(error => this.setState({error}))
      }
      catch (error) {
        return this.setState({ error });
      }
    }
  
    signup = () => {
      const { email, password, cfmPassword, name } = this.state;
	  	const regex  = /@7debate.club/
      if(!regex.test(email)){
					console.log('sign')
					console.log(email)
          this.setState({error:true, errorMessage:"Please use a 7Debate email"})
          return;
      }
      
      if(!(password === cfmPassword)){
				console.log('pw ', password)
				console.log('cpw ', cfmPassword)
        this.setState({error:true,errorMessage:"The Two Passwords You Entered are not Identical"})
        return;
      }

      if(this.state.verificationCode !== this.state.code){
        this.setState({error:true,errorMessage:'wrong verification code'})
        return;
			}
			
      client.service('users')
        .create({ email, password, name })
        .then(r => this.login())
				// .catch(e => this.setState({error: true}))
				.catch(e => this.setState({error:true, errorMessage:e.message}))
    }

    onKeyup = (e) => {
      if(e.keyCode === 13) {
          this.signup()
      }
    }

    sendCode = () => {
      if(!this.state.email){
        this.setState({
          errorMessage:'Please Enter Email',
          error:true
        })
        return
      }
      if(this.state.error){return}
      this.interval = setInterval(() => this.tick(), 1000);
        const verificationCode = Math.random().toString().slice(-6);
        client.service('verification')
        .create({
          email : this.state.email,
          code  : verificationCode
        })
        .then(r => {
          this.setState({
            verificationCode:verificationCode,
            success:true,
            successMessage:"Code Sent"
          })
          setTimeout(() => {
            this.setState({success:false})
          }, 2500);
        })
        .catch(e => console.log(e))
    }

    tick() {
      if(this.state.seconds === 0){
        clearInterval(this.interval);
        this.setState({seconds:60, codeSent:false})
        return
      }
      this.setState(state => ({
        seconds : state.seconds - 1,
        codeSent:true
      }));
    }

    render(){
				const { classes } = this.props;
				const { error, 
								errorMessage,
								email,
								password,
								cfmPassword,
								code,
								success,
								successMessage,
								codeSent,
								seconds 
							} = this.state
        return(
            <div className={classes.content}>
							<ParticlesBg type="cobweb" num={60} color="#288484" bg={true} />
							<SnackBar
								place="bl"
								color="danger"
								icon={ErrorIcon}
								message={errorMessage}
								open={error}
								closeNotification={() => this.setState({error:false, errorMessage:''})}
								close
							/>
							<SnackBar
								place="bl"
								color="success"
								icon={CheckIcon}
								message={successMessage}
								open={success}
								closeNotification={() => this.setState({success:false, successMessage:''})}
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
														onChange={ev => this.updateField('email', ev)}
														value={email}
													/>
													<CustomInput
														labelText="Password"
														id="password"
														formControlProps={{
																fullWidth: true
														}}
														type='password'
														onChange={ev => this.updateField('password', ev)}
														value={password}
													/>
													<CustomInput
														labelText="Confirm Password"
														id="cfmpassword"
														formControlProps={{
																fullWidth: true
														}}
														type='password'
														onChange={ev => this.updateField('cfmPassword', ev)}
														value={cfmPassword}
													/>
													<CustomInput
														labelText="Verification Code"
														id="password"
														formControlProps={{
																fullWidth: true
														}}
														type='password'
														onChange={ev => this.updateField('code', ev)}
														value={code}
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
													onClick={ev => this.sendCode()}
												>
													Get Verification Code
												</Button>
											}
											
											<Button 
												color="primary"
												onClick={ev => this.signup()}
											>Sign Up
											</Button>
											</CardFooter>
									</Card>
									</GridItem>
									<GridItem xs={1} md={4}/>
							</GridContainer>
							
					</div>
        )
    }
}

export default withStyles(styles)(SignUp)