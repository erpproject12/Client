// material-ui

// project imports
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import { Insert_Product, View_Product } from '../../global';
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

import { useNavigate } from 'react-router';


import 'mdb-react-ui-kit/dist/css/mdb.min.css';


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {

  const nav = useNavigate();

  const [on, setOn] = useState({
    product_code: false,
    product_name: false
  });
  const [product, setProduct] = useState({});

  useEffect(() => {
    View_Product()
      .then((res) => {
        console.log('Product Response : ' + JSON.stringify(res.data));
        setEnteredProductName(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);

  const Change = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

    setProductCode((prevProduct) => ({ ...prevProduct, [e.target.name]: e.target.value }));
    setError((prevErrors) => ({ ...prevErrors, [e.target.name]: e.target.value === '' }));
  };

  const [productCode, setProductCode] = useState({
    product_code: '',
    product_name: '',
    tax_code: ''

  });



  const [error, setError] = useState({

    product_code: false,
    product_name: false,
    tax_code: false
  });
  console.log(productCode, 88);

  const onSubmit = (e) => {
   
    e.preventDefault(); //this is used for from tag
    setOn(false);
   
    const newError = {
      product_code: productCode.product_code === '',
      product_name: productCode.product_name === '',
      tax_code: productCode.tax_code === ''
    };

    setError(newError);
    if (!newError.product_code && !newError.tax_code && !newError.product_name) {
      
      Insert_Product(product)
        .then((res) => {
          console.log(res);

          if (res.data.copy) {
            setOn(true);
            
          }

          nav('../../mproduct/view-product');
          
        })
        .catch((error) => {
          console.log('Error :' + error);
        });

    }
    // console.log();
  };

  return (
    <MainCard title="Add Product Details">

      <Box
        sx={{
          
          display: 'flex',gap:'10px',marginLeft: '50px'
        }}
      >

          {/* <InputLabel htmlFor="product-code">Product Code</InputLabel> */}
          <Box >
          <TextField
          sx={{width:'35ch'}}
            id="product-code"
            label="Product Code"
            variant="outlined"
            name="product_code"
            helperText={on.product_code && 'Entered Product Code Already Exists'}
            FormHelperTextProps={{ style: { color: 'red' } }}
            value={productCode.product_code}
            onChange={Change}
            error={error.product_code}
            size="small"
          />{' '}
          {error.product_code && <FormHelperText error>This field is required</FormHelperText>}
          </Box>
          <Box>
          <TextField
          sx={{width:'35ch'}}
            id="outlined-basic"
            onChange={Change}
            label="Product Name"
            name="product_name"
            variant="outlined"
            helperText={on.product_name && 'Entered Product Already Exists'}
            FormHelperTextProps={{ style: { color: 'red' } }}
            value={productCode.product_name}
            error={error.product_name}
            size="small"
          />
          {error.product_name && <FormHelperText error>This field is required</FormHelperText>}
          </Box>
        
       
        <FormControl sx={{width:'35ch'}}>
          <InputLabel id="demo-simple-select-label">Tax Percentage</InputLabel>

          <Select
            onChange={Change}
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            name="tax_code"
            label="Tax Percentage"
            error={error.tax_code}
            value={productCode.tax_code}
            size="small"
          >
            <MenuItem value={5}>5%</MenuItem>
            <MenuItem value={10}>10%</MenuItem>
            <MenuItem value={15}>15%</MenuItem>
            <MenuItem value={20}>20%</MenuItem>
            <MenuItem value={25}>25%</MenuItem>
          </Select>
          {error.tax_code && (
            <FormHelperText  error>
              This field is required
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      
      <Box sx={{ width: '108ch', mt: 3, marginBottom: '50px', marginTop: '5px' }}>
        <FormControl fullWidth sx={{ marginLeft: '50px' }}>

          <TextField
            id="outlined-multiline-static"
            onChange={Change}
            name="product_description"

            size="small"
            label="Product Description....."
            multiline
            rows={1}
          />
        </FormControl>
      </Box>
      <Box sx={{ marginLeft: '50px' }}>
        <Typography sx={{ m: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>Optional</Typography>
      </Box>

      <FormControl sx={{ marginLeft: '50px' }}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 0.5, width: '35ch' }
          }}
        >
          <TextField id="outlined-basic" onChange={Change} nam label="Rack Number" name="rack_no" variant="outlined" size="small" />
          <TextField id="outlined-basic" onChange={Change} label="HSN" name="HSN" variant="outlined" size="small" />
          <TextField id="outlined-basic" onChange={Change} label="Category" name="category" variant="outlined" size="small" />
        </Box>
      </FormControl>
      <FormControl sx={{ marginLeft: '50px' }}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 0.5, width: '35ch' }
          }}
        >
          <TextField id="outlined-basic" onChange={Change} label="Manufacturer" name="manufactures" variant="outlined" size="small" />
          <TextField
            id="outlined-basic"
            onChange={Change}
            label="Weight Dimension"
            name="weight_dimension"
            variant="outlined"
            size="small"
          />
          <TextField id="outlined-basic" onChange={Change} label="Variants" name="variants" variant="outlined" size="small" />
        </Box>
      </FormControl>
      <Box sx={{display:'flex',justifyContent:'center',width:'950px'}}>
        <FormControl sx={{ m: 0.5, width: '35ch', marginBottom: '50px' }}>
          <InputLabel id="demo-simple-select-label">Unit of Measure</InputLabel>
          <Select
            onChange={Change}
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={age}
            name="unit_of_masure"
            label="Tax Percentage"
            size="small"
          >
            <MenuItem value={10}>20%</MenuItem>
            <MenuItem value={20}>10%</MenuItem>
            <MenuItem value={30}>3%</MenuItem>
          </Select>
        </FormControl>
        </Box>

      <Box
        sx={{
          '& .MuiTextField-root': { m: 2 },
          '& .MuiButton-root': { fontSize: '1.0rem', padding: '8px 380px', marginLeft: '50px' }
        }}
      >
        <Button variant="contained" onClick={onSubmit} disableElevation>

          Add Product
        </Button>
      </Box>
    </MainCard>
  );
};

export default SamplePage;
