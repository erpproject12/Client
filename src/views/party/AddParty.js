// material-ui

// project imports
import React,{useState} from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';
import {Insert_Party} from '../../global'
import {
  Box,
    Button,
  //   Checkbox,
  //   Divider,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  //   FormControlLabel,
     FormHelperText,
  //   Grid,
  //   IconButton,
  //   InputAdornment,

  //   TextField,
  Typography
  //   useMediaQuery
} from '@mui/material';


// ==============================|| SAMPLE PAGE ||============================== //





const SamplePage = () =>{
  let nav = useNavigate();
  const [party,setParty]=useState({})

          
  const [partycode, setPartycode ] = useState({
  
    party_name:'',
    party_phone:'',
    party_email:'',
    party_address:'',
    party_street:'',
    party_city:'',
    party_pincode:'',
    party_state:'',
    party_country:'',
    party_account_type :'',
    party_GST:'',
    party_creadit_days:'',
    party_creadit_limit:''

  });

  const [error, setError] = useState({
    party_name: false,
    party_phone:false,
    party_email:false,
    party_address:false,
    party_street:false,
    party_city:false,
    party_pincode:false,
    party_state:false,
    party_country:false,
    party_account_type :false,
    party_GST:false,
    party_creadit_days:false,
    party_creadit_limit:false
  })


  const Change=(e)=>{
  setParty({...party,[e.target.name]:e.target.value})

   // Regular expression to match only letters
    const lettersRegex = /^[A-Za-z]+$/;
    const tenDigitsRegex = /^\d{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/i;
    const numbersRegex = /^\d*$/;

    // Check if the input matches the letters regex
    const isValidInput = lettersRegex.test(e.target.value);
    const isValidInput2 = tenDigitsRegex.test(e.target.value);
    const isValidInput3 = emailRegex.test(e.target.value);
    const isValidInput4 = numbersRegex.test(e.target.value);


  setPartycode((prevParty) => ({ ...prevParty, [e.target.name]:e.target.value }));

  if(e.target.name==='party_name'){

  setError((prevErrors) => ({ ...prevErrors, party_name :!isValidInput }));
  }else if(e.target.name==='party_phone'){
    setError((prevErrors) => ({ ...prevErrors, party_phone :!isValidInput2 }));
  }else if(e.target.name==='party_email'){
    setError((prevErrors) => ({ ...prevErrors, party_email :!isValidInput3 }));
  }else if(e.target.name==='party_pincode'){
    setError((prevErrors) => ({ ...prevErrors, party_pincode :!isValidInput4 }));
  }
  else{
    setError((prevErrors) => ({ ...prevErrors, [e.target.name]:e.target.value === '' }));
  }
  }



  
  const onSubmit=(e)=>{
    e.preventDefault();//this is used for from tag
      // console.log();


      const newError ={

        party_name:partycode.party_name === '',
        party_phone:partycode.party_phone === '',
        party_email:partycode.party_email === '',
        party_address:partycode.party_address === '',
        party_street:partycode.party_street === '',
        party_city:partycode.party_city === '',
        party_pincode:partycode.party_pincode === '',
        party_state:partycode.party_state=== '',
        party_country:partycode.party_country=== '',
        party_account_type:partycode.party_account_type=== '',
        party_GST:partycode.party_GST=== '',
        party_creadit_days:partycode.party_creadit_days === '',
        party_creadit_limit:partycode.party_creadit_limit ===''
      };

      setError(newError);
      if(!newError.party_name&&!newError.party_phone&&!newError.party_email&&!newError.party_street&&!newError.party_address&&!newError.party_city&&!newError.party_pincode&&!newError.party_state&&!newError.party_country&&!newError.party_account_type&&!newError.party_GST&&!newError.party_creadit_days&&!newError.party_creadit_limit){

      

      Insert_Party(party)
      .then((res)=>{
        console.log(res);
        nav('../../mparty/view-party');
      })
  .catch((error)=>{
  console.log("Error :"+ error)
 
  })
  }
}
console.log(party)
return(

  <MainCard title="Add Party Details">
   <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}} >
    
      <Box
              >
        <TextField 
        sx={{width:'35ch'}}
          value={partycode.party_name}
          error={error.party_name}
          size="small"
          
        onChange={Change} label="Party Name" required name='party_name' variant="outlined" />  
        {error.party_name && (
        <FormHelperText error>Enter characters only </FormHelperText>
      )}   

      </Box>
      

      
      <Box>
        <TextField 
        sx={{width:'35ch'}}
         value={partycode.party_phone}
         error={error.party_phone}
         size="small"
        onChange={Change}  label="Party Contect Number" required name='party_phone' variant="outlined" />
         {error.party_phone && (
        <FormHelperText error>Enter exactly 10 digits</FormHelperText>
      )}    
      </Box>


      <Box>
      <TextField 
      sx={{width:'35ch'}}
        value={partycode.party_email}
        error={error.party_email}
        size="small"
        onChange={Change} label="Party Email" name='party_email' variant="outlined" />
         {error.party_email && (
        <FormHelperText error>Enter valid email</FormHelperText>
      )}  

</Box>   
</Box>


      
      <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>   
<Box >
        <TextField 
        sx={{width:'35ch'}}
        size="small"
         value={partycode.party_address}
         error={error.party_address} 
        onChange={Change}  required label="Party address" name='party_address' variant="outlined" />
         {error.party_address && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>
    
      <Box
        
      >
        <TextField 
        sx={{width:'35ch'}}
        size="small"
        value={partycode.party_street}
        error={error.party_street}
        onChange={Change} label="Party Street" name='party_street' variant="outlined" />
         {error.party_street && (
        <FormHelperText error>This field is required</FormHelperText>
      )} 
      </Box> 
      <Box>
        <TextField
        sx={{width:'35ch'}} 
        size="small"
         value={partycode.party_city}
         error={error.party_city}
        onChange={Change} label="Party City" name='party_city' variant="outlined" />
         {error.party_city && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>
   </Box>



<Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
    
      <Box
       
      >
         <TextField 
         sx={{width:'35ch'}}
         size="small"
          value={partycode.party_pincode}
          error={error.party_pincode}
         onChange={Change} label="Party Pincode" name='party_pincode' variant="outlined" />
           {error.party_pincode && (
        <FormHelperText error>Enter digits only</FormHelperText>
      )}  
      </Box>

      <Box>
        <TextField 
        sx={{width:'35ch'}}
        size="small"
         value={partycode.party_state}
         error={error.party_state}
        onChange={Change}  label="Party State" name='party_state' variant="outlined" />
         {error.party_state && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>
    
      <Box>
      
        <TextField
        sx={{width:'35ch'}}
        size="small"
         value={partycode.party_country}
         error={error.party_country}
        onChange={Change}  label="Party Country" name='party_country' variant="outlined" />
       {error.party_country && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>

      </Box>

    
    
   <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
    
     
      <Box
      >
      
        <TextField
        sx={{width:'35ch'}} 
        size="small"
        value={partycode.party_GST}
        error={error.party_GST}
        onChange={Change}  label="GST Number" name='party_GST' variant="outlined" />
        {error.party_GST && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>
    
      <Box
      >

        <TextField 
        sx={{width:'35ch'}}
        size="small"
value={partycode.party_creadit_limit}
error={error.party_creadit_limit}
        onChange={Change}  label="Credit Limit" name='party_creadit_limit' variant="outlined" />
       {error.party_creadit_limit && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>

      <Box
       
      >
        <TextField 
        sx={{width:'35ch'}}
        size="small" 
        value={partycode.party_creadit_days}
        error={error.party_creadit_days}
        onChange={Change}  label="Credit Days" name='party_creadit_days' variant="outlined" />
        {/* <TextField id="outlined-basic" onChange={Change}  label="Manufacturer" name='manufactures' variant="outlined" /> */}
        {error.party_creadit_days && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>

      </Box>
   
   
    
    <Box sx={{marginBottom:'30px',marginLeft:'380px'}}
      >
           <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
          <Select
          
          size="small"
 value={partycode.party_account_type}
 error={error.party_account_type}

          onChange={Change} 
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            sx={{ m: 1, width: '35ch' }}
            name='party_account_type'
            label="Tax Percentage"
          >

            <MenuItem value={'Client'}>Client</MenuItem>
            <MenuItem value={'Sellar'}>Sellar</MenuItem>
       
          </Select>
       {error.party_account_type && (
        <FormHelperText error>This field is required</FormHelperText>
      )}  
      </Box>
    

<Box
 sx={{
  '& .MuiTextField-root': { m: 2 },
  '& .MuiButton-root': { fontSize: '1.0rem', padding: '8px 380px', marginLeft: '100px' }
}}
>
    <Button variant="contained"  onClick={onSubmit} disableElevation >
  Add Party
</Button>
</Box>
  </MainCard>
)};

export default SamplePage;