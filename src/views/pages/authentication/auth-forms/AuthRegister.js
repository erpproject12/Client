import { useState, useEffect,forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Admin_Insert} from '../../../../global';
// material-ui
import { useNavigate } from 'react-router-dom';
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
  Stack,
  Snackbar,
 
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
  
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';

// ===========================|| FIREBASE - REGISTER ||=========================== //
const Alert =forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
const [register,setRegister]=useState({})


const [open, setOpen] = useState(false);

const [on, setOn] =useState({
  email:false
})


  const googleHandler = async () => {
    console.error('Register');
  };
  const handleChange =(e)=>{
    
    setRegister({...register,[e.target.name]:e.target.value})



    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidInput = emailRegex.test(e.target.value);
    const isValidInputpass = passwordRegex.test(e.target.value);


    setRegvalidation((prevProduct) => ({ ...prevProduct, [e.target.name]: e.target.value }));
    
    if(e.target.name==='email'){
      setError((prevErrors) => ({ ...prevErrors, email :!isValidInput }));
    } else if(e.target.name === 'password'){
      setError((prevErrors) => ({ ...prevErrors, password :!isValidInputpass }));
    } else{
    setError((prevErrors) => ({ ...prevErrors, [e.target.name]: e.target.value === '' }));
  }

  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
    
  };
  const navigate = useNavigate();


  const [regvalidation, setRegvalidation]=useState({
      name:'',
      email:'',
      password:''


  })

  const [error, setError]=useState({
   name:false,
   email:false,
   password:false

  })

 const handleSubmit = (e) =>{
 
  e.preventDefault()
  setOn(false);

 const newError = {
  name:regvalidation.name === '',
  email:regvalidation.email === '',
  password:regvalidation.password === ''

 } 

 setError(newError);
 if(!newError.name&&!newError.email&&!newError.password){

  Admin_Insert(register)
  .then((res)=>{
    console.log(res)

    if (res.data.copy) {
      setOn(true);
      setOpen(true);
    }else{
      navigate("/pages/login/login3")

    }

    

  })
  .catch((err)=>{
    console.log("error"+err)
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


  useEffect(() => {
    changePassword('123456');
  }, []);
 

console.log(register,8888)
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
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
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
        {({ errors, isSubmitting, touched, values }) => (
          <form noValidate  {...others}>
         
              
              <  FormControl fullWidth>
                <TextField
                  onChange={handleChange}
                  label="First Name"
                  margin="normal"
                  name="name"

                  value={regvalidation.name}
            error={error.name}

                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />

                {error.name && <FormHelperText error>This field is required</FormHelperText>}

                </FormControl>
            
             
            
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                
                name="email"

                value={regvalidation.email}
                error={error.email}

                
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
               {error.email && <FormHelperText error>Enter valid email</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
               
                name="password"
                label="Password"

                value={regvalidation.password}
                error={error.password}

                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
                {error.password && <FormHelperText error>This field is required</FormHelperText>}
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
             
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}


<Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button fullWidth onClick={handleSubmit} size="large" variant="contained" color="secondary">
              Sign up
            </Button>
            {/* Snackbar to show the alert */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
  <Alert severity="warning" sx={{ width: '450px' }}>
    Email already existed!
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

export default FirebaseRegister;
