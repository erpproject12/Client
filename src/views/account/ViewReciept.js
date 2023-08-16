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
import { Button, Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useEffect } from 'react';
import { Payment_Reciept_View, View_Sales_Return } from 'global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './receipt.css';

function Row(props, selectedParty) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  console.log(row, 'row');

  useEffect(() => {
    Payment_Reciept_View()
      .then((res) => {
        console.log('View Sale :' + res.data);
        setReciept(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.reciept_no}</TableCell>
        <TableCell>{row.party_id.party_name}</TableCell>
        <TableCell>
          <IconButton>
            <RemoveRedEyeIcon sx={{ color: '#78C1F3' }} />
          </IconButton>
        </TableCell>

        {/* <TableCell align="right">{row.invoice_no}</TableCell>
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
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                Invoices
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ background: 'black' }}>
                    <TableCell style={{ color: 'white' }}>Invoice no</TableCell>
                    <TableCell style={{ color: 'white' }}>Total amount</TableCell>
                    <TableCell style={{ color: 'white' }}>Paid amount</TableCell>
                    <TableCell style={{ color: 'white' }}>Balance amount</TableCell>
                    <TableCell style={{ color: 'white' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.payment_details?.map((item) => (
                    <TableRow key={item.id} className={item.balance_amount > 0 ? 'partialPaidRow' : 'paidRow'}>
                      <TableCell component="th" scope="row">
                        {item?.invoice_no}
                      </TableCell>
                      <TableCell>{item.total_amount}</TableCell>
                      <TableCell>{item.paid_amount}</TableCell>
                      <TableCell>{item.balance_amount}</TableCell>
                      <TableCell><b>{item.balance_amount > 0 ? 'Partial Paid' : 'Paid'}</b></TableCell>
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
  const [reciept, setReciept] = useState([]);
  const [selectedParty, setSelectedParty] = useState([]);

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

  useEffect(() => {
    Payment_Reciept_View()
      .then((res) => {
        console.log('View Sale :' + res.data);
        setReciept(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);

  console.log(reciept);

  const handleAutocompleteChange = (value) => {
    console.log('Autocomplete value:', value);
    const partyId = value ? value.party_id : null;
    // console.log(partyId);

    if (partyId) {
      // Filter the sales data based on the selected party_id
      const selectedPartyReciept = reciept.filter((item) => item.party_id._id === partyId._id);

      // const inn = selectedSales.map((invn) => invn.invoice_no);
      setSelectedParty(selectedPartyReciept);
      // setParty(partyId);
    } else {
      // If the selectedId is not found, reset the invoice array
      selectedParty([]);
    }
  };

  console.log(selectedParty, 'party');

  const uniqueParties = reciept.filter(
    (sale, index, self) => index === self.findIndex((s) => s.party_id.party_name === sale.party_id.party_name)
  );

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block', marginBottom: '20px' } }}>
        <Autocomplete
          onChange={(e, value) => handleAutocompleteChange(value)}
          disablePortal
          id="combo-box-demo"
          name="party"
          size="large"
          options={uniqueParties}
          getOptionLabel={(option) => option.party_id.party_name} // Display the party_name in the options
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Search Party" />}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ background: '#DDE6ED' }}>
              <TableCell />
              <TableCell>Receipt Number</TableCell>
              <TableCell>Party Name</TableCell>
              {/* <TableCell align="right">Credit-note no</TableCell>
              <TableCell align="right">Invoice no</TableCell>
              <TableCell align="right">Bill no</TableCell>
              <TableCell align="right">VAT</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Sub-total</TableCell>
              <TableCell align="right">Grand-total</TableCell>
              <TableCell align="right">Returned date</TableCell> */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedParty != ''
              ? selectedParty.map((row, index) => <Row key={index} row={row} selectedParty={selectedParty} />)
              : reciept.map((row, index) => <Row key={index} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
