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
import { View_Product, DeleteProduct, View_PurchaseReturn } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Box, color, display } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ViewAll_PurchaseReturn } from '../../global';
import { useParams } from 'react-router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function CustomizedTables() {
  let params = useParams();
  const [purchase, setPurchase] = useState([]);
  useEffect(() => {
    console.log("bjdeb");
    ViewAll_PurchaseReturn(params.id)
      .then((res) => {
        console.log('View All Purchase Return Display :', res.data);
        setPurchase(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  console.log(purchase);

  
  return (
    <div>
     
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Batch Number</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Purchase Price</StyledTableCell>
              <StyledTableCell>Selling Price</StyledTableCell>
              <StyledTableCell>MRP</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Tax(GST%)</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(purchase?.purchase_return_item)?.map((item, index) => {
              return (
                <StyledTableRow key={index} >
                  <StyledTableCell component="th" scope="row">
                    {++index}
                  </StyledTableCell>
                  <StyledTableCell >{item?.ItemName?.product_name}</StyledTableCell>
                  <StyledTableCell >{item?.Batch}</StyledTableCell>
                  <StyledTableCell >{item?.Qty}</StyledTableCell>
                  <StyledTableCell >₹{item?.PPrice}</StyledTableCell>
                  <StyledTableCell >₹{item?.SPrice}</StyledTableCell>
                  <StyledTableCell >₹{item?.MRP}</StyledTableCell>
                  <StyledTableCell >{item?.Discount}%</StyledTableCell>
                  <StyledTableCell >{item?.Tax}%</StyledTableCell>
                  <StyledTableCell >₹{item?.Total}</StyledTableCell>
                </StyledTableRow>
              );
            })} 
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
