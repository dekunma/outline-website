import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiTextField from '@material-ui/core/TextField';
import style from 'assets/jss/material-dashboard-react/views/signInStyle.js'
import { withStyles } from '@material-ui/core/styles';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
const useStyles = makeStyles(style)

const TextField = withStyles({
	root: {
				'& .MuiOutlinedInput-root': {
					'&.Mui-focused fieldset': {
						borderColor: '#000000',
					},
			},
				'& .MuiFormLabel-root':{
					'&.Mui-focused':{
						color:'#000000'
					}
				}
	},
})(MuiTextField);

const Link = withStyles({
	root: {
				'&.MuiLink-underlineHover':{
					color:'#000000'
				}
	},
})(MuiLink);

export default function SignIn(){

		const classes = useStyles()
    return(
			<Grid container xs={12} className={classes.container}>
				<ParticlesBg type="thick" num={7} bg={true} />
				<Grid container className={classes.wrap}>
								
					{/* <Grid container xs={12} sm={8} md={6} className={classes.paper}> */}
					<Grid container xs={10} sm={6} md={4} className={classes.paper}>
						<Grid item xs={9} className={classes.innerPaper}>
							<Grid item xs={12}>
								<div className={classes.signInText}><p>Sign In</p></div>
								<div className='line'></div>              
							</Grid>

							<Grid item xs={12} className={classes.textContainer}>
								<TextField
									className={classes.textBox}
									id="email"
									label="Email"
									variant="outlined"
									type="email"
									/>
							</Grid>

							<Grid item xs={12} className={classes.textContainer}>
								<TextField
									className={classes.textBox}
									id="password"
									label="Password"
									variant="outlined"
									type="password"
								/>
							</Grid>

							<Grid item xs={12} className={classes.buttonContainer}>
								<div>
									<Button 
										className={classes.button}
										textSizeLarge
									>
										Sign In
									</Button>
								</div>
								
								<Link color="textPrimary" href="/reset-password">Forget Password?</Link>
								<div>
									<Link href="/sign-up">No account? Sign Up Now</Link>
								</div>
								
							</Grid>

						</Grid>
					</Grid>
				</Grid>
			</Grid>
    )
}