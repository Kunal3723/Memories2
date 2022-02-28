import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signIn,signUp} from "../../redux/actions/auth.js";
function Auth() {

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',

  }
  const [formData, setformData] = useState(initialState);
  function handleSubmit(e) {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    }
    else{
      dispatch(signIn(formData, navigate));
    }
  }
  function handleChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function switchMode() {
    setisSignup(!isSignup);
    setShowPassword(false);
  }
  async function googleSuccess(res) {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({ type: "AUTH", data: { result, token } });
    navigate('/');
  }
  function googleFailure() {
    console.log("Google sign in failed");
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={function (e) { handleSubmit(e); }}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin clientId='160905761377-r4cvvva2b7aglfh51c599qm3qlk4dnrj.apps.googleusercontent.com'
            render={function (renderProps) {
              return (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )
            }}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          ></GoogleLogin>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container >
  )
}

export default Auth