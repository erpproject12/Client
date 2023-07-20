// material-ui

// project imports
import React,{useState,useEffect} from 'react'
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from "react-router"

import {Single_Product,Update_Product} from '../../global'

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
  let params = useParams();
 const [product,setProduct]=useState({})
useEffect(()=>{
  Single_Product(params.id)
  .then((res)=>{
    console.log("Single Product Update:"+JSON.stringify(res.data))
    setProduct(res.data)
  })
  .catch((err)=>{
    console.log(err.massege)
  })
},[])
 const Change=(e)=>{
  setProduct({...product,[e.target.name]:e.target.value})
 }

 const onSubmit=()=>{
  // const product_code = product.product_code
  // const product_name = product.product_name
  // const tax_code = product.tax_code
  // const product_description = product.product_description
  // const rack_no = product.rack_no
  // const HSN = product.HSN
  // const category = product.category
  // const manufactures = product.manufactures
  // const unit_of_masure = product.unit_of_masure
  // const weight_dimension = product.weight_dimension
  // const variants = product.variants
  Update_Product(params.id,product)
  .then((res)=>{
    console.log("Updated Product :" +JSON.stringify(res.data))
    
  })
  .catch((err)=>{
    console.log(err.massege)
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
        <TextField id="outlined-basic" onChange={Change} value={product?.product_code}  label="Product Code" name='product_code' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change} value={product?.product_name}  label="Product Name" name='product_name' variant="outlined" />
      </Box>
    </FormControl>

    <FormControl sx={{ m: 1, width: '50ch', mt: 3 }}>
  <InputLabel id="demo-simple-select-label">Tax Percentage</InputLabel>
  <Select
    variant="outlined"
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name='tax_code'
    label="Tax Percentage"
    onChange={Change}
    value={parseInt(product.tax_code)} // Set the value to the retrieved database value
  >
    {/* {console.log(typeof (parseInt(product.tax_code)))} */}
    <MenuItem value={product.tax_code}>{product?.tax_code}%</MenuItem>
    <MenuItem value={10}>10%</MenuItem>
    <MenuItem value={30}>30%</MenuItem>
  </Select>
</FormControl>

    <Box sx={{ m: 1 }}>
      <FormControl fullWidth>
        <TextField id="outlined-multiline-static" onChange={Change} value={product.product_description}  name='product_description' label="Product Description....." multiline rows={4} />
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
        <TextField id="outlined-basic" onChange={Change}  value={product.rack_no} label="Rack Number" name='rack_no' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change} value={product.HSN}  label="HSN" name='HSN' variant="outlined" />
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change} value={product.category}   label="Category" name='category' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change} value={product.manufactures}  label="Manufacturer" name='manufactures' variant="outlined" />
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
            value={parseInt(product.unit_of_masure)}
          >
            <MenuItem value={product.unit_of_masure}>{product.unit_of_masure}%</MenuItem>
            <MenuItem value={20}>20%</MenuItem>
            <MenuItem value={10}>10%</MenuItem>
            <MenuItem value={30}>30%</MenuItem>
          </Select>
        </FormControl>
        <TextField id="outlined-basic" onChange={Change} value={product.weight_dimension}   label="Weight Dimension" name='weight_dimension' variant="outlined" />
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change} value={product.variants}   label="Variants" name='variants' variant="outlined" />
        {/* <TextField id="outlined-basic" label="HSN" variant="outlined" /> */}
      </Box>
    </FormControl>
<Box>
    <Button variant="contained" onClick={onSubmit}   disableElevation fullWidth>
  Update Product
</Button>
</Box>
  </MainCard>
)};

export default SamplePage;
