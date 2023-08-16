// material-ui

// project imports
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router';

import { Single_Product, Update_Product } from '../../global';
import { useNavigate } from 'react-router';

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

const SamplePage = () => {

  let nav = useNavigate();

  let params = useParams();

  const [product, setProduct] = useState({});
  useEffect(() => {
    Single_Product(params.id)
      .then((res) => {
        console.log('Single Product Update:' + JSON.stringify(res.data));
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const Change = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    Update_Product(params.id, product)
      .then((res) => {
        console.log('Updated Product :' + JSON.stringify(res.data));
        nav('../../mproduct/view-product');
      })
      .catch((err) => {
        console.log(err.massege);
      });
  };
  return (
    <MainCard title="Add Product Details">
      
      <Box  sx={{
          
          display: 'flex',gap:'10px',marginLeft: '50px'
        }} >

        <Box
         
        >
          <TextField
          sx={{width:'35ch'}}
            id="outlined-basic"
            size="small"
            onChange={Change}
            value={product?.product_code}
            label="Product Code"
            InputLabelProps={{
              shrink:true
            }}
            name="product_code"
            variant="outlined"
          />
          </Box>
          <Box>
          <TextField
          sx={{width:'35ch'}}
            id="outlined-basic"
            onChange={Change}
            value={product?.product_name}
            label="Product Name"
            name="product_name"
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink:true
            }}
          />
        </Box>
     


      <FormControl sx={{  width: '35ch'}}>
        <InputLabel id="demo-simple-select-label">Tax Percentage</InputLabel>
        <Select
       
          variant="outlined"
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="tax_code"
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


</Box>
      <Box sx={{ width: '108ch', mt: 3, marginBottom: '50px', marginTop: '5px' }}>
        <FormControl fullWidth sx={{ marginLeft: '50px' }}>
          <TextField
          size="small"
            id="outlined-multiline-static"
            onChange={Change}
            value={product.product_description}
            name="product_description"
            label="Product Description....."
            multiline
            rows={1}
            InputLabelProps={{
              shrink:true
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ marginLeft: '50px' }}>
        <Typography sx={{ m: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>Optional</Typography>
      </Box>

      <FormControl  sx={{ marginLeft: '50px' }}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 0.5, width: '35ch' }
          }}
        >
          <TextField id="outlined-basic"
          size="small"
          InputLabelProps={{
            shrink:true
          }} onChange={Change} value={product.rack_no} label="Rack Number" name="rack_no" variant="outlined" />
          <TextField 
          id="outlined-basic"
          size="small"
          InputLabelProps={{
            shrink:true
          }} onChange={Change} value={product.HSN} label="HSN" name="HSN" variant="outlined" />
           <TextField id="outlined-basic"
          size="small"
           InputLabelProps={{
              shrink:true
            }}
            onChange={Change} value={product.category} label="Category" name="category" variant="outlined" />
        </Box>
      </FormControl>
      <FormControl sx={{ marginLeft: '50px' }}>
        <Box
            sx={{
              '& .MuiTextField-root': { m: 0.5, width: '35ch' }
            }}
        >
         
          <TextField
            id="outlined-basic"
            size="small"
            onChange={Change}
            value={product.manufactures}
            label="Manufacturer"
            name="manufactures"
            variant="outlined"
            InputLabelProps={{
              shrink:true
            }}
          />
<TextField
            id="outlined-basic"
            size="small"
            onChange={Change}
            value={product.weight_dimension}
            InputLabelProps={{
              shrink:true
            }}
            label="Weight Dimension"
            name="weight_dimension"
            variant="outlined"
          />
           <TextField id="outlined-basic" 
          size="small"
          InputLabelProps={{
            shrink:true
          }}
          onChange={Change} value={product.variants} label="Variants" name="variants" variant="outlined" />
          {/* <TextField id="outlined-basic" label="HSN" variant="outlined" /> */}

        </Box>
      </FormControl>
      <FormControl sx={{ marginLeft: '45px' }}>
        <Box
         sx={{ m: 0.5, width: '35ch', marginLeft:'280px', marginBottom: '50px' }}
        >
          <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel id="demo-simple-select-label">Unit of Measure</InputLabel>
            <Select
              onChange={Change}
              size="small"
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              InputLabelProps={{
                shrink:true
              }}
              //   value={age}
              name="unit_of_masure"
              label="Tax Percentage"
              value={parseInt(product.unit_of_masure)}
            >
              <MenuItem value={product.unit_of_masure}>{product.unit_of_masure}%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={30}>30%</MenuItem>
            </Select>
          </FormControl>
          
        </Box>
      </FormControl>
      
      <Box
       sx={{
        '& .MuiTextField-root': { m: 2 },
        '& .MuiButton-root': { fontSize: '1.0rem', padding: '8px 380px', marginLeft: '50px' }
      }}
      >
        <Button variant="contained" onClick={onSubmit} disableElevation fullWidth>
          Update Product
        </Button>
      </Box>
    </MainCard>
  );
};

export default SamplePage;
