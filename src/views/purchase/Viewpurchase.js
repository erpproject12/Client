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
import {View_Purchase } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link} from 'react-router-dom'
import { Box, color } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
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
  let nav = useNavigate();

  useEffect(()=>{
    View_Purchase()
    .then((res)=>{
      console.log("Purchase Response : " + JSON.stringify(res.data));
      setDisplay(res.data)
    })
    .catch((err)=>{
      console.log("Error :" + err);
    })
  },[])

  


 
  return (
    <div>
    <Box sx={{display:'flex',justifyContent:'end',mb:'10px'}}>
    <Button variant="contained" startIcon={<AddIcon />}>
   <Link to={'/mpurchase/add-purchase'} style={{textDecoration:'none',color:'white'}}>Add Purchase</Link>
</Button>
     
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Party Name</StyledTableCell>
            <StyledTableCell>Bill Number</StyledTableCell>
            <StyledTableCell>Sub-Total</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>VAT</StyledTableCell>
            <StyledTableCell>Freight</StyledTableCell>
            <StyledTableCell>Grand Total</StyledTableCell>
            <StyledTableCell>Bill Date</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {display.map((item,index)=>{
            return(
              <StyledTableRow key={index} >
              <StyledTableCell component="th" scope="row">
                {++index}
              </StyledTableCell>
              <StyledTableCell >{item.party_id.party_name}</StyledTableCell>
              <StyledTableCell >{item.purchase_bill_no}</StyledTableCell>
              <StyledTableCell >₹{item.purchase_total_price}</StyledTableCell>
              <StyledTableCell >{item.purchase_discount}</StyledTableCell>
              <StyledTableCell >{item.purchase_vat}</StyledTableCell>
              <StyledTableCell >{item.purchase_freight}</StyledTableCell>
              <StyledTableCell >₹{item.purchase_gtotal}</StyledTableCell>
              <StyledTableCell >{item.purchase_udate}</StyledTableCell>
              <StyledTableCell sx={{display:'flex'}}>
              <Link to={`/mpurchase/view-purchaseall/${item._id}`} ><RemoveRedEyeIcon sx={{color:'green'}}/></Link>
               
                 
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