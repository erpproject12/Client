// material-ui

// project imports
import React,{useState,useEffect} from 'react'
import MainCard from 'ui-component/cards/MainCard';

import {Update_Party,Single_Party} from '../../global'
import { useParams } from 'react-router';
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
  //   FormHelperText,
  //   Grid,
  //   IconButton,
  //   InputAdornment,

  //   TextField,
  Typography
  //   useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router';

// ==============================|| SAMPLE PAGE ||============================== //





const SamplePage = () =>{

  const nav = useNavigate();
    let params=useParams();
  const [party,setParty]=useState({})

useEffect(()=>{
    Single_Party(params.id)
    .then((res)=>{
        console.log("Single Party:" +JSON.stringify(res.data))
        setParty(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
},[])

  const Change=(e)=>{
  setParty({...party,[e.target.name]:e.target.value})
  }
const onSubmit=()=>{
    Update_Party(params.id,party)
    .then((res)=>{
        console.log("Update Party:" +JSON.stringify(res.data));
        nav('../../mparty/view-party')
       
    })
    .catch((err)=>{
        console.log(err)
    })
}

return(

  <MainCard title="Update Party Details">
    <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
      <Box
      
      >
        <TextField 
         sx={{width:'35ch'}}
         size="small"
         InputLabelProps={{
          shrink:true
        }}onChange={Change} value={party?.party_name} label="Party Name" name='party_name' variant="outlined" />
       </Box>
       <Box>
        <TextField 
         sx={{width:'35ch'}}
         size="small"
         InputLabelProps={{
          shrink:true
        }} onChange={Change}  value={party?.party_phone} label="Party Contect Number" name='party_phone' variant="outlined" />
      </Box>
      <Box>
      <TextField 
       sx={{width:'35ch'}}
       size="small"
         InputLabelProps={{
          shrink:true
        }} onChange={Change} value={party?.party_email} label="Party Email" name='party_email' variant="outlined" />
      </Box>
    
      </Box>

      <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
      <Box
      >
        <TextField 
         sx={{width:'35ch'}}
         size="small"
         InputLabelProps={{
          shrink:true
        }}
         onChange={Change}  value={party?.party_address} label="Party address" name='party_address' variant="outlined" />
      </Box>
      <Box>

      <TextField 
       sx={{width:'35ch'}}
       size="small"
         InputLabelProps={{
          shrink:true
        }}
         onChange={Change}  value={party?.party_street} label="Party Street" name='party_street' variant="outlined" />
    </Box>
    <Box
      >
       
        <TextField
         sx={{width:'35ch'}}
         size="small" 
         InputLabelProps={{
          shrink:true
        }}
        onChange={Change}  value={party?.party_city} label="Party City" name='party_city' variant="outlined" />
      </Box>
    

      </Box>
      
     
   
      <Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
      <Box
        
      >
         <TextField id="outlined-basic"
          sx={{width:'35ch'}}
          size="small"
          InputLabelProps={{
            shrink:true
          }}
           onChange={Change} value={party?.party_pincode} label="Party Pincode" name='party_pincode' variant="outlined" />
        </Box>
        <Box>
        <TextField 
         sx={{width:'35ch'}}
         size="small" 
         InputLabelProps={{
          shrink:true
        }}
        onChange={Change}  value={party?.party_state} label="Party State" name='party_state' variant="outlined" />
      </Box>

      <Box
      >
        <TextField 
         sx={{width:'35ch'}}
         size="small"
         InputLabelProps={{
          shrink:true
        }}
         onChange={Change} value={party?.party_country} label="Party Country" name='party_country' variant="outlined" />
      </Box>
   
    </Box>
  
<Box sx={{display:'flex',gap:'10px',marginBottom:'10px',marginLeft:'100px'}}>
<Box
        >
        
          <TextField  sx={{width:'35ch'}}
        size="small" value={party.party_GST}
        InputLabelProps={{
          shrink:true
        }} onChange={Change}  label="GST Number" name='party_GST' variant="outlined" />
        </Box>

        <Box
      >

        <TextField  sx={{width:'35ch'}}
        size="small" 
        InputLabelProps={{
          shrink:true
        }}value={party.party_creadit_limit} onChange={Change}  label="Credit Limit" name='party_creadit_limit' variant="outlined" />
      </Box>

      <Box
      >
        <TextField  sx={{width:'35ch'}}
        size="small"
        InputLabelProps={{
          shrink:true
        }} value={party.party_creadit_days} onChange={Change}  label="Credit Days" name='party_creadit_days' variant="outlined" />
        {/* <TextField id="outlined-basic" onChange={Change}  label="Manufacturer" name='manufactures' variant="outlined" /> */}
      </Box>

</Box>
    
     
    
    
      <Box sx={{marginBottom:'30px',marginLeft:'420px'}}
      
      >
           <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
          <Select
            size="small"
          onChange={Change} 
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            InputLabelProps={{
              shrink:true
            }}
            value={party.party_account_type}
            sx={{ m: 1, width: '40ch' }}
            name='party_account_type'
            label="Tax Percentage"
          >
            <MenuItem value={party.party_account_type} >{party.party_account_type}</MenuItem>
            <MenuItem value={'client'}>Client</MenuItem>
            <MenuItem value={'Sellar'}>Sellar</MenuItem>
       
          </Select>
      
      </Box>
    
   
     
   

    
    

    

    
      
    
   
      
   
   
    
<Box>
    <Button variant="contained" onClick={onSubmit}  disableElevation fullWidth>
  Add Party
</Button>
</Box>
  </MainCard>
)};

export default SamplePage;