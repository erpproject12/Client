// material-ui

// project imports
import React,{useState} from 'react'
import MainCard from 'ui-component/cards/MainCard';

import {Insert_Product} from '../../global'
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


// ==============================|| SAMPLE PAGE ||============================== //





const SamplePage = () =>{
  const [product,setProduct]=useState({})

  const Change=(e)=>{
  setProduct({...product,[e.target.name]:e.target.value})
  }
  
  const onSubmit=(e)=>{
    e.preventDefault();//this is used for from tag
      // console.log();
      Insert_Product(product)
      .then((res)=>{
        console.log(res)
      })
  .catch((error)=>{
  console.log("Error :"+ error)
  })
  }

return(

  <MainCard title="Add Product Details">
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change} label="Product Code" name='product_code' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change}  label="Product Name" name='product_name' variant="outlined" />
      </Box>
    </FormControl>

    <FormControl sx={{ m: 1, width: '50ch', mt: 3 }}>
      <InputLabel id="demo-simple-select-label">Tax Percentage</InputLabel>
      <Select
      onChange={Change} 
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        //   value={age}
        name='tax_code'
        label="Tax Percentage"
      >
        <MenuItem value={20}>20%</MenuItem>
        <MenuItem value={10}>10%</MenuItem>
        <MenuItem value={30}>3%</MenuItem>
      </Select>
    </FormControl>
    <Box sx={{ m: 1 }}>
      <FormControl fullWidth>
        <TextField id="outlined-multiline-static" onChange={Change}  name='product_description' label="Product Description....." multiline rows={4} />
      </FormControl>
    </Box>
    <Box>
      <Typography sx={{ m: 1 }}>Optional</Typography>
    </Box>

    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change}  nam label="Rack Number" name='rack_no' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change}  label="HSN" name='HSN' variant="outlined" />
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change}  label="Category" name='category' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change}  label="Manufacturer" name='manufactures' variant="outlined" />
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <FormControl sx={{ m: 1, width: '50ch' }}>
          <InputLabel id="demo-simple-select-label">Unit of Measure</InputLabel>
          <Select
          onChange={Change} 
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            name='unit_of_masure'
            label="Tax Percentage"
          >
            <MenuItem value={10}>20%</MenuItem>
            <MenuItem value={20}>10%</MenuItem>
            <MenuItem value={30}>3%</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" onChange={Change}  label="Weight Dimension" name='weight_dimension' variant="outlined" />
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change}  label="Variants" name='variants' variant="outlined" />
        {/* <TextField id="outlined-basic" label="HSN" variant="outlined" /> */}
      </Box>
    </FormControl>
<Box>
    <Button variant="contained"  onClick={onSubmit} disableElevation fullWidth>
  Add Product
</Button>
</Box>
  </MainCard>
)};

export default SamplePage;
