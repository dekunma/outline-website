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
import SnackBar from 'components/Snackbar/Snackbar'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from '@material-ui/icons/Check'

import client from '../../feathers'

import { useSelector, useDispatch } from 'react-redux'
import MuiTextField from '@material-ui/core/TextField'

import { withStyles } from '@material-ui/core/styles'
import { primaryColor } from '../../assets/jss/material-dashboard-react'

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

const TextField = withStyles({
    root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: primaryColor[0],
            },
        },
    },
  })(MuiTextField);

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  
  const [ password, setPassword] = React.useState('')
  const [ cfmPassword, setCfmPassword ] = React.useState('')
  const [ error, setError ] = React.useState(false)
  const [ errorMessage, setErrorMessage ] = React.useState('')
  const [ success, setSeccess ] = React.useState(false)
  const [ successMessage, setSuccessMessage ] = React.useState('')
  const [content, setContent] = React.useState('')

  const submitIssue = () => {
		if(content === '') {
			setError(true)
			setErrorMessage('Describe your issue, please')
			return
		}

		client.service('issues')
		.create({
			content:content
		})
		.then(r => {
			setContent('')
			setSeccess(true)
			setSuccessMessage('We received your message')
			setTimeout(() => {
				setSeccess(false)
			},2500)
		})
		.catch(e => {
			setError(true)
			setErrorMessage(e.message)
		})
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
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Report Issue</h4>
              <p className={classes.cardCategoryWhite}>Anything we can help you with</p>
            </CardHeader>
            <CardBody>
                  <CustomInput
                    labelText="To: William@dekun.me （The Admin)"
                    id="toWilliam"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                  <TextField
                    style={{width:'100%', marginTop:20}}
                    id="content"
                    multiline
                    rows="8"
                    placeholder="Describe the issue you encountered"
                    variant="outlined"
                    onChange={ev => setContent(ev.target.value)}
                    value={content}
                  />
                
            </CardBody>
            <CardFooter>
              <Button 
                color="primary"
                onClick={ev => submitIssue()}
              >Submit</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
