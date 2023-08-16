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
import { View_All_Purchase,Delete_Purchase  } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link} from 'react-router-dom'
import { Box, color } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';



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


const handleDelete = (id) => {
  // const nav = useNavigate();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Delete_Purchase(id)
          .then((res) => {
            console.log(res);
            // nav('../../msales/view-sales')
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };




export default function CustomizedTables() {
  let params = useParams();
  const [singlepurchase,setPurchasesigle]=useState([])

  

  useEffect(()=>{
    View_All_Purchase(params.id)
    .then((res)=>{
      console.log("Purchase Response : " + JSON.stringify(res.data));

      console.log("res",res.data)
      setPurchasesigle(res.data.item)
    })
    .catch((err)=>{
      console.log("Error :" + err);
    })
  },[]);

  


  console.log("single",singlepurchase)
  
 
  return (
    <div>
    <Box sx={{display:'flex',justifyContent:'end',mb:'10px'}}>
   
     
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <TableCell>#</TableCell>
                <TableCell style={{ width: 200 }}>Item Name</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Exp.Date</TableCell>
                <TableCell>Qty</TableCell>
                
                <TableCell>Discount</TableCell>
                <TableCell>Price</TableCell>
                <TableCell> Sales Price</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Tax (GST%)</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singlepurchase.map((item,index)=>{
            return(
              <StyledTableRow key={index} >
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell >{item.ItemName.product_name}</StyledTableCell>
              <StyledTableCell >{item.Batch}</StyledTableCell>
              <StyledTableCell >{item.ExpDate}</StyledTableCell>
              <StyledTableCell >{item.Qty}</StyledTableCell>
              <StyledTableCell >{item.Discount}</StyledTableCell>
              <StyledTableCell >{item.PPrice}</StyledTableCell>
              <StyledTableCell >{item.SPrice}</StyledTableCell>
              <StyledTableCell >{item.MRP}</StyledTableCell>
              <StyledTableCell >{item.Tax}</StyledTableCell>
              <StyledTableCell >{item.Total}</StyledTableCell>
              <StyledTableCell sx={{display:'flex'}}>
              
              <Link to={`/msales/update-sales/${params.id}`}><BorderColorIcon color="primary" /> </Link>
              <DeleteOutlineIcon onClick={() => handleDelete(params.id)} sx={{ color: 'red' }} />
                
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