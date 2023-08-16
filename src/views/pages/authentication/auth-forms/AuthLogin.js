import { useState,forwardRef } from 'react';
import { useSelector } from 'react-redux';
import {Admin_login} from '../../../../global';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  
  Snackbar,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);

  const [open, setOpen] = useState(false);

const [login,setLogin] = useState({})
  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
const handleChange = (e) =>{
  setLogin({...login,[e.target.name]:e.target.value});

  const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidInput = emailRegex.test(e.target.value);
    const isValidInputpass = passwordRegex.test(e.target.value);


    setLogvalidation((prevProduct) => ({ ...prevProduct, [e.target.name]: e.target.value }));
    
    if(e.target.name==='email'){
      setError((prevErrors) => ({ ...prevErrors, email :!isValidInput }));
    } else if(e.target.name === 'password'){
      setError((prevErrors) => ({ ...prevErrors, password :!isValidInputpass }));
    } else{
    setError((prevErrors) => ({ ...prevErrors, [e.target.name]: e.target.value === '' }));
  }

}

const [logvalidation,setLogvalidation]=useState({
email:'',
password:''
});

const [error, setError] = useState({
email:false,
password:false
});

const onSubmit=(e)=>{
  e.preventDefault();

const newError ={
  email:logvalidation.email === '',
  password:logvalidation.password === ''
}

setError(newError);
if(!newError.email&&!newError.password){

  Admin_login(login)
  .then((res)=>{
    console.log(res)
    if(res.data.success == true){
      console.log("login Successfull")
      localStorage.setItem("token",res.data.authtoken)
      navigate("/")

    }else if(res.data.success == false){
     
      setOpen(true);

    }else{
      console.log("some error occured")
      setOpen(true);
    }
  
  })
  .catch((err)=>{
    console.log("Error:"+err)
  })
}
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  // Close the alert by setting the open state to false
  setOpen(false);
};

console.log(login)
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

           

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors,  touched, values }) => (
          <form noValidate  {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                
                name="email"
               value={logvalidation.email}
                error={error.email}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
               {error.email && <FormHelperText error>Enter valid email</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
             
                name="password"
                value={logvalidation.password}
                error={error.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
               {error.password && <FormHelperText error>This field is required</FormHelperText>}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Button  onClick={onSubmit} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in 
                </Button>
                 {/* Snackbar to show the alert */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
  <Alert severity="warning" sx={{ width: '450px' }}>
    Email or password is wrong!
  </Alert>
</Snackbar>
          </Stack>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
