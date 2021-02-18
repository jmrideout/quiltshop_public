import { TextField, FormControl, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../api/UserAPI';

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textFieldHalf: {
      marginLeft: 5,
      marginRight: 5,
      width: '50ch',
      margin: 8
    },
    textFieldFull: {
      marginLeft: 5,
      marginRight: 5,
      width: '75ch',
      margin: 8
    },
    textFieldQuarter: {
      marginLeft: 5,
      marginRight: 5,
      width: '25ch',
      margin: 8
    },
    buttons: {
      margin: 10
    }
  }
);


const LoginPage = (props) => {
  const classes = useStyles();
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [cancelRedirect, setCancelRedirect] = React.useState(false)
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const userObject = {
      "username": username,
      "password": password
    }
    let response = await login(userObject);
    let data = await response.json();
    console.log(data);
    if (data.token) {
      props.setUser(data.user);
      props.setIsLoggedIn(true);
      localStorage.setItem("token", data.token)
      setCancelRedirect(true);
    }
    else {
      ///////////// alert or display "incorrect input"
    }
  }
  
  return (
    <div>
      <h1>Login Page</h1>
      <form className={classes.root}>
        <div>
          <FormControl>
            <TextField id="username" label="Username" color="secondary" variant="outlined" className={classes.textFieldQuarter} onChange={(e)=>setUsername(e.target.value)} />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField id="password" label="Password" color="secondary" variant="outlined" className={classes.textFieldQuarter} onChange={(e)=>setPassword(e.target.value)} />
          </FormControl>
        </div>

        <div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.buttons}
            style={{marginLeft: 5}}
            onClick={handleLogin}
          >Confirm
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.buttons}
            onClick={()=>setCancelRedirect(true)}
          >Cancel
          </Button>
        </div>
      </form>
      {cancelRedirect ? <Redirect to="/" /> : null}
    </div>
  );
}


export default LoginPage;
