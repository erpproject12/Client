import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { color } from '@mui/system';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useEffect } from 'react';
import { View_Sales, View_Sales_Return } from 'global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.party_id.party_name}
        </TableCell>
        <TableCell align="right">{row.credit_note_no}</TableCell>
        <TableCell align="right">{row.invoice_no}</TableCell>
        <TableCell align="right">{row.sales_return_bill}</TableCell>
        <TableCell align="right">{row.sales_return_vat}</TableCell>
        <TableCell align="right">{row.sales_return_discount}</TableCell>
        <TableCell align="right">{row.sales_return_total}</TableCell>
        <TableCell align="right">{row.sales_return_gtotal}</TableCell>
        <TableCell align="right">{row.sales_return_date}</TableCell>
        <TableCell align="right">
          {' '}
          <Link to={`/msales/single-sales/${row._id}`}>
            <IconButton>
              <RemoveRedEyeIcon sx={{ color: '#78C1F3'}} />
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#8CABFF', color: 'white' }}>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Batch no</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">PPrice</TableCell>
                    <TableCell align="right">Discount</TableCell>
                    <TableCell align="right">Tax (GST %)</TableCell>
                    <TableCell align="right">MRP</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Exp Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sales_return.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.ItemName.product_name}
                      </TableCell>
                      <TableCell>{item.Batch}</TableCell>
                      <TableCell align="right">{item.Qty}</TableCell>
                      <TableCell align="right">{item.PPrice}</TableCell>
                      <TableCell align="right">{item.Discount}%</TableCell>
                      <TableCell align="right">{item.Tax}%</TableCell>
                      <TableCell align="right">{item.MRP}</TableCell>
                      <TableCell align="right">{item.Total}</TableCell>
                      <TableCell align="right">{item.ExpDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    View_Sales_Return()
      .then((res) => {
        console.log('Sales return:' + res.data);
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log('Error' + err);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: '10px' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link to={'/msales/add-sales-return'} style={{ textDecoration: 'none', color: 'white' }}>
            Add Sales Return
          </Link>
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ background: '#DDE6ED' }}>
              <TableCell />
              <TableCell>Party Name</TableCell>
              <TableCell align="right">Credit-note no</TableCell>
              <TableCell align="right">Invoice no</TableCell>
              <TableCell align="right">Bill no</TableCell>
              <TableCell align="right">VAT</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Sub-total</TableCell>
              <TableCell align="right">Grand-total</TableCell>
              <TableCell align="right">Returned date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {display.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
