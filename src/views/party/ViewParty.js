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

import { View_Party,Delete_Party} from '../../global';

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

export default function ViewParty() {
  const [dis,setDisplay] = useState([]);

  useEffect(() => {
    View_Party()
      .then((res) => {
        console.log('Party Response: ' + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log('Error: ' + err);
      });
  }, []);

  const handleDelete = (id) => {
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
        Delete_Party(id)
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

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: '10px' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link to={'/mparty/add-party'} style={{ textDecoration: 'none', color: 'white' }}>
            Add Party
          </Link>
        </Button>
        {console.log(dis)}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Party Name</StyledTableCell>
              <StyledTableCell>Contact Number</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Account Type</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dis.map((item,index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index+1}
                  </StyledTableCell>
                  <StyledTableCell>{item.party_name}</StyledTableCell>
                  <StyledTableCell>{item.party_phone}</StyledTableCell>
                  <StyledTableCell>{item.party_email}</StyledTableCell>
                  <StyledTableCell>{item.party_address}</StyledTableCell>
                  <StyledTableCell>{item.party_account_type}</StyledTableCell>
                  <StyledTableCell>{item.party_date}</StyledTableCell>
                  <StyledTableCell sx={{ display: 'flex' }}>
                    <Link to={`/mparty/single-party/${item._id}`}>
                      
                        <RemoveRedEyeIcon sx={{ color: 'green' }} />
                     
                    </Link>
                    <Link to={`/mparty/update-party/${item._id}`}>
                      
                        <BorderColorIcon color="primary" />
                      
                    </Link>
                   
                      <DeleteOutlineIcon onClick={() => handleDelete(item._id)} sx={{ color: 'red' }} />
                  
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
