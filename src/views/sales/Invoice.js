import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router';
import { Single_Sales } from '../../global';
import { Box,Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: '8px', // Customize as needed
    borderBottom: 'none',

  },
}));
const TableHeader = ({ title }) => (
  <Box
    sx={{
      borderBottom: '1px solid #ccc',
      paddingBottom: '10px',
      marginBottom: '10px',
      fontWeight: 'bold',
    }}
  >
    {title}
  </Box>
);
const SamplePage = () => {
  const classes = useStyles();
  const params = useParams();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    Single_Sales(params.id)
      .then((res) => {
        console.log(res.data);
        setSales(res.data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }, []);

  return (
   
    <MainCard >
       <Box sx={{border:2}}>
      <Box sx={{ padding: '20px'}}>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h3">Good Company Invoice</Typography>
            <Typography>14B,North Streets <br/> Greater South Avenue <br/> New York 10001 U.S.A</Typography>
          <hr style={{ margin: '10px 0' }} />
        </Box>
       
        <Box sx={{
      display: 'grid',
      columnGap: 3,
      rowGap: 1,
      gridTemplateColumns: 'repeat(2, 1fr)',
      border: '1px solid #ccc', // Add a border to the whole grid
      padding: '20px',
    }}>
      {/* Provider Information */}
      <Box sx={{ borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <TableHeader title="PROVIDER" />
        <Typography><strong>Name:</strong> ACME Supplies</Typography>
        <Typography><strong>Email:</strong> provider@example.com</Typography>
        <Typography><strong>Phone:</strong> +123-456-7890</Typography>
        <Typography><strong>Address:</strong> 123 Provider St, City</Typography>
      </Box>

      {/* Customer Information */}
      <Box sx={{ paddingLeft: '20px' }}>
        <TableHeader title="CUSTOMER" />
        <Typography><strong>Name:</strong> {sales?.party_id?.party_name}</Typography>
        <Typography><strong>Phone:</strong> {sales?.party_id?.party_phone}</Typography>
        <Typography><strong>Email:</strong> {sales?.party_id?.party_email}</Typography>
        <Typography><strong>Address:</strong> {sales?.party_id?.party_address}</Typography>
        <Typography><strong>State:</strong> {sales?.party_id?.party_state}</Typography>
        <Typography><strong>City:</strong> {sales?.party_id?.party_city}</Typography>
        <Typography><strong>Pincode:</strong> {sales?.party_id?.party_pincode}</Typography>
        <Typography><strong>Country:</strong> {sales?.party_id?.party_country}</Typography>
        <Typography><strong>GST:</strong> {sales?.party_id?.party_GST}</Typography>
        <Typography><strong>Account Type:</strong> {sales?.party_id?.party_account_type}</Typography>
        <Typography><strong>Bill Number:</strong> {sales?.sales_billno}</Typography>
        <Typography><strong>Invoice:</strong> {sales?.invoice_no}</Typography>
        <Typography><strong>Bill Date:</strong> {sales?.sales_billdate}</Typography>
      </Box>
    </Box>
      </Box>

      <TableContainer component={Paper} sx={{ padding: '20px', marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: 'primary.main',color: 'white',}}>
            <TableRow>
              <TableCell sx={{color:"white"}}>Product Name</TableCell>
              <TableCell align="right">Batch Number</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">MRP</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(sales?.item)?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row?.ItemName?.product_name}
                </TableCell>
                <TableCell align="right">{row?.Batch}</TableCell>
                <TableCell align="right">{row.Qty}</TableCell>
                <TableCell align="right">{row.PPrice}</TableCell>
                <TableCell align="right">{row.Discount}</TableCell>
                <TableCell align="right">{row.Tax}</TableCell>
                <TableCell align="right">{row.MRP}</TableCell>
                <TableCell align="right">{row.Total}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className={classes.tableCell} colSpan={7} align="right">
                <strong>SubTotal :</strong>
              </TableCell>
              <TableCell>{sales.sales_total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell} colSpan={7} align="right">
                <strong>Discount :</strong>
              </TableCell>
              <TableCell>{sales.sales_discount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell} colSpan={7} align="right">
                <strong>Vat :</strong>
              </TableCell>
              <TableCell>{sales.sales_vat}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell} colSpan={7} align="right">
                <strong>Frieght :</strong>
              </TableCell>
              <TableCell>{sales.sales_freight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableCell} colSpan={7} align="right">
                <strong>Grand Total :</strong>
              </TableCell>
              <TableCell>{sales.sales_gtotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </MainCard>
    
  );
};

export default SamplePage;
