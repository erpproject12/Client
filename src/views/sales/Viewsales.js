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
import { View_Sales, Delete_Sales } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Box, color } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
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

const handleDelete = (id) => {
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
      Delete_Sales(id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
};

export default function CustomizedTables() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    View_Sales()
      .then((res) => {
        console.log('Sales Response : ' + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: '10px' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link to={'/msales/add-sales'} style={{ textDecoration: 'none', color: 'white' }}>
            Add Sales
          </Link>
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Bill Number</StyledTableCell>
              <StyledTableCell>Party Name</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Vat</StyledTableCell>
              <StyledTableCell>Freight</StyledTableCell>
              <StyledTableCell>Grand Total</StyledTableCell>
              <StyledTableCell> Bill Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {display.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{item.sales_billno}</StyledTableCell>
                  <StyledTableCell>{item.party_id.party_name}</StyledTableCell>
                  <StyledTableCell>{item.sales_total}</StyledTableCell>
                  <StyledTableCell>{item.sales_discount}</StyledTableCell>
                  <StyledTableCell>{item.sales_vat}</StyledTableCell>
                  <StyledTableCell>{item.sales_freight}</StyledTableCell>
                  <StyledTableCell>{item.sales_gtotal}</StyledTableCell>

                  <StyledTableCell>{item.sales_billdate}</StyledTableCell>
                  <StyledTableCell sx={{ display: 'flex' }}>
                    <Link to={`/msales/view-all/${item._id}`}>
                      <IconButton>
                        <RemoveRedEyeIcon sx={{ color: 'green' }} />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
