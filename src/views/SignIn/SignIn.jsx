import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import ParticlesBg from 'particles-bg'
import avatar from "assets/img/outline-logo.png";
import { withStyles } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link';
import SnackBar from 'components/Snackbar/Snackbar'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { updateEmail, 
				updatePassword, 
				setError, 
				setLogin } from '../../actions'

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
	},
	content: {
    marginTop: "70px",
		minHeight: "calc(100vh - 123px)",
		width:'100%'
	},
	button:{
		marginTop:'50px',
		// height:'40px',
		width:'150px',
		marginBottom:'30px'
	}
};

const Link = withStyles({
	root: {
			'&.MuiLink-underlineHover':{
				color:'#000000'
			}
	},
})(MuiLink);

const useStyles = makeStyles(styles);

export default function(){
	const classes = useStyles();
	const [redirect, setRedirect] = React.useState(false)
	const email = useSelector(state => state.email)
	const password = useSelector(state => state.password)
	const error = useSelector(state => state.error)
	const dispatch = useDispatch()

	//TODO: fix
	// React.useEffect(() => {
	// 	document.addEventListener('keyup',onKeyUp)
	// },[])

	//TODO:fix
	// const onKeyUp = (e) => {
	// 	if(e.keyCode === 13) {
	// 		console.log(email)
	// 		authenticate()
	// 	}
	// }

	const authenticate = () => {
		client.authenticate({
			email:email,
			password:password,
			strategy:'local'
		})
		.then(r => {
			const userId = r.user._id
			dispatch(setLogin(true,userId))
			setRedirect(true)
		})
		.catch(e => {
			dispatch(setError(true,e.message))
			setTimeout(() => {
				dispatch(setError(false,e.message))
			},3000)
		})
	}

	if(redirect){
		return<Redirect to='/console'/>
	}
	return(
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
						<Card profile>
							<CardAvatar profile>
								<a href="#pablo" onClick={e => e.preventDefault()}>
									<img src={avatar} alt="..." />
								</a>
							</CardAvatar>
							<CardBody profile>
								<h3 className={classes.cardCategory}>Welcome</h3>
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
								<div>
									<Button 
										color="primary" 
										round 
										className={classes.button}
										onClick={authenticate}
										//TODO: fix
										// onKeyUp={ev => onKeyUp(ev)}
									>
										Sign In
									</Button>
								</div>								
								<Link color="textPrimary" href="/reset-password">Forget Password?</Link>
								<div>
									<Link href="/sign-up">No account? Sign Up Now</Link>
								</div>
							</CardBody>
						</Card>
					</GridItem>
					<GridItem xs={1} md={4}/>
			</GridContainer>
			</div>
			
	)
}