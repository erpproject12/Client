import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { View_Product,DeleteProduct } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link} from 'react-router-dom'
import { Box, color } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables() {
  const [display,setDisplay]=useState([]);

  useEffect(()=>{
    View_Product()
    .then((res)=>{
      console.log("Product Response : " + JSON.stringify(res.data));
      setDisplay(res.data)
    })
    .catch((err)=>{
      console.log("Error :" + err);
    })
  },[])

  
  const handleDelete=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteProduct(id)
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err)
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
   
  }
  return (
    <div>
    <Box sx={{display:'flex',justifyContent:'end',mb:'10px'}}>
    <Button variant="contained" startIcon={<AddIcon />}>
   <Link to={'/mproduct/add-product'} style={{textDecoration:'none',color:'white'}}>Add Product</Link>
</Button>
    
    </Box>

<Box sx={{mb:2}}>
<TextField id="outlined-basic" label="Bill Number" variant="outlined" size='small' sx={{width:300}}/>

<FormControl sx={{ width: 300}} size="small">
      <InputLabel id="demo-select-small-label">Party Name</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        
        label="Party Name"
       
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
    </LocalizationProvider>

</Box>

    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell>Batch</StyledTableCell>
            <StyledTableCell>Exp.Date</StyledTableCell>
            <StyledTableCell>Qty</StyledTableCell>
            <StyledTableCell>Pack</StyledTableCell>
            <StyledTableCell>Offer</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>PPrice</StyledTableCell>
            <StyledTableCell>SPrice</StyledTableCell>
            <StyledTableCell>MRP</StyledTableCell>
            <StyledTableCell>Tax(GST%)</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
              <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              
              </StyledTableCell>
             
              <StyledTableCell component="th" scope="row">
              <TextField size='small'></TextField>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              <TextField size='small'></TextField>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" >
              <TextField size='small' ></TextField>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              <TextField size='small'></TextField>
              </StyledTableCell>
             
             
            </StyledTableRow>
            
         
           
      
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}