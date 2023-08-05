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


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import {Insert_Purchase,View_Product,View_Party} from '../../global'
import { setDate } from 'date-fns';

const YourComponent = () => {
  const initialRow = {
    id: 1,
    ItemName: "",
    Batch: "",
    ExpDate: "",
    Qty: 0, 
    Discount: 0,
    PPrice: 0,
    SPrice: "",
    MRP: "",
    Tax: 0,
    Total: 0
  };

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

  
  const handleFreight = (e) => {
    let Freight = parseInt(e.target.value);
    setFormData({ ...formData, [e.target.name]: Freight });
    
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { ...initialRow, id: formData.rows.length + 1 }]
      
    });
  };
console.log(formData.rows.Tax);
  const handleDeleteRow = (index) => {
    const updatedRows = formData.rows.filter((row, i) => i !== index);
    setFormData({
      ...formData,
      rows: updatedRows
     
    });
    console.log(index); 
  };
  console.log(party);  

  const handleAutocompleteChange = (value,index) => {
    if (value) {
      // Find the selected item by its product_name
      
      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
       alert (selectedItem?._id)
       
       
        const updatedRows = [...formData.rows];
        updatedRows[index]['Tax'] = value;
        updatedRows[index]['ItemName']=value;
        updatedRows[index].ItemName = selectedItem?._id
        // Recalculate the Total for the current row
        updatedRows[index].Tax = selectedItem?.tax_code
        setFormData({
          ...formData,
          rows: updatedRows
        });
    
        // alert(selectedItem?.tax_code);



      }
    }
   
  }
  return (
    <div>
    <Box sx={{display:'flex',justifyContent:'end',mb:'10px'}}>
    <Button variant="contained" startIcon={<AddIcon />}>
   <Link to={'/mpurchase/add-purchase'} style={{textDecoration:'none',color:'white'}}>Add Purchase</Link>
</Button>
     
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Product Code</StyledTableCell>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell>Tax(%)</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Active Status</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {display.map((item,index)=>{
            return(
              <StyledTableRow key={index} >
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell >{item.product_code}</StyledTableCell>
              <StyledTableCell >{item.product_name}</StyledTableCell>
              <StyledTableCell >{item.tax_code}</StyledTableCell>
              <StyledTableCell >{item.product_description}</StyledTableCell>
              <StyledTableCell >{item.active_status}</StyledTableCell>
              <StyledTableCell >{item.date}</StyledTableCell>
              <StyledTableCell sx={{display:'flex'}}>
              <Link to={`/mproduct/single-product/${item._id}`} ><IconButton><RemoveRedEyeIcon sx={{color:'green'}}/></IconButton></Link>
                <Link to={`/mproduct/update-product/${item._id}`}><IconButton><BorderColorIcon color="primary"/></IconButton></Link>
                 <IconButton><DeleteOutlineIcon onClick={()=>{handleDelete(item._id)}} sx={{color:'red'}}/></IconButton>
                  </StyledTableCell>
            </StyledTableRow>
            )
          })}
         
           
      
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}