// material-ui

// project imports
import React,{useState,useEffect} from 'react'
import MainCard from 'ui-component/cards/MainCard';

import {Insert_Product,View_Product} from '../../global'
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
  FormHelperText,
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
  const [on,setOn]=useState({
    product_code:false,
    product_name:false
  })
  const [product,setProduct]=useState({});
 
  useEffect(()=>{
    View_Product()
    .then((res)=>{
      console.log("Product Response : " + JSON.stringify(res.data));
      setEnteredProductName(res.data)
    })
    .catch((err)=>{
      console.log("Error :" + err);
    })
  },[])
  const Change=(e)=>{
  setProduct({...product,[e.target.name]:e.target.value})


  setProductCode((prevProduct) => ({ ...prevProduct, [e.target.name]:e.target.value }));
  setError((prevErrors) => ({ ...prevErrors, [e.target.name]:e.target.value === '' }));
  }
  const [productCode, setProductCode] = useState({
    product_code:'',
    product_name:'',
    tax_code:'',
    HSN:''
  });
  const [error, setError] = useState({
    product_code:false,
    product_name:false,
    tax_code:false,
    HSN:false
  });
  console.log(productCode,88);
 
  const onSubmit=(e)=>{
    e.preventDefault();//this is used for from tag
    setOn(false)
    
    const newError = {
      product_code: productCode.product_code === '',
      product_name: productCode.product_name === '',
      tax_code: productCode.tax_code === '',
      HSN: productCode.HSN === '',
    };

    setError(newError);
    if (!newError.product_code&&!newError.HSN&&!newError.tax_code&&!newError.product_name) {
 Insert_Product(product)
      .then((res)=>{
        console.log(res)


        if(res.data.copy){
          setOn(true)
       
        }
      })
  .catch((error)=>{
  console.log("Error :"+ error)
  })
    }
      // console.log();
     
  }


return(

  <MainCard title="Add Product Details">
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
         {/* <InputLabel htmlFor="product-code">Product Code</InputLabel> */}
         <TextField
        id="product-code"
        label="Product Code"
        variant="outlined"
        name="product_code"
        helperText={on.product_code && "Entered Product Code Already Exists"}
        FormHelperTextProps={{ style: { color: 'red' } }}
        value={productCode.product_code}
        onChange={Change}
        error={error.product_code}
      />
      {error.product_code && (
        <FormHelperText error>This field is required</FormHelperText>
      )}


        <TextField
        id="outlined-basic"
        onChange={Change}
        label="Product Name"
        name="product_name"
        variant="outlined"
       helperText={on.product_name && "Entered Product Already Exists"}
        FormHelperTextProps={{ style: { color: 'red' } }}
        value={productCode.product_name}
        error={error.product_name}
      />
        {error.product_name && (
        <FormHelperText error>This field is required</FormHelperText>
      )}
     

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
        error={error.tax_code}
        value={productCode.tax_code}
      >
       
        <MenuItem value={20}>20%</MenuItem>
        <MenuItem value={10}>10%</MenuItem>
        <MenuItem value={30}>3%</MenuItem>
      </Select>
      {error.tax_code && (
        <FormHelperText error>This field is required</FormHelperText>
      )}
       
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
       
      </Box>
    </FormControl>
    <FormControl>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' }
        }}
      >
        <TextField id="outlined-basic" onChange={Change}  label="Category" name='category' variant="outlined" />
        <TextField id="outlined-basic" onChange={Change} 
         label="Manufacturer" name='manufactures' variant="outlined" />
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
            required
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
