import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
  Button,
  Checkbox,
  Autocomplete,
  TextField
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useEffect } from 'react';
import { View_Sales, Delete_Sales } from '../../global';
import { useState } from 'react';
import RecieptModal from './RecieptModal';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Fab from '@mui/material/Fab';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));



export default function BasicTable() {
  const [sales, setSales] = React.useState([]);
  const [party, setParty] = React.useState('');
  const [invoice, setInvoice] = React.useState([]);
  const [selectedItems, setSelectedItems] = useState([]);


  const [centredModal, setCentredModal] = useState(false);

  // const toggleShow = () => setCentredModal(!centredModal);

  function toggleShow() {
    

    setCentredModal(!centredModal);
  }

  useEffect(() => {
    View_Sales()
      .then((res) => {
        console.log('View Sale :' + res.data);
        setSales(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);

  const handleAutocompleteChange = (value) => {
    console.log('Autocomplete value:', value);
    const partyId = value ? value.party_id : null;
    // console.log(partyId);

    if (partyId) {
      // Filter the sales data based on the selected party_id
      const selectedSales = sales.filter((item) => item.party_id._id === partyId._id);

      const inn = selectedSales.map((invn) => invn.invoice_no);
      setInvoice(selectedSales);
      setParty(partyId);
    } else {
      // If the selectedId is not found, reset the invoice array
      setInvoice([]);
    }
  };
  console.log(party);

  const uniqueParties = sales.filter(
    (sale, index, self) => index === self.findIndex((s) => s.party_id.party_name === sale.party_id.party_name)
  );

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((prevItem) => prevItem._id !== item._id));
    }
  };

  console.log(selectedItems, 'slee');
  return (
    <>
      <Box sx={{ display: 'flex', gap: '670px' }}>
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

        {selectedItems != '' ? (
          <Box>
            <Fab variant="extended" sx={{ borderRadius: '5px' }} size="large" onClick={toggleShow}>
              <ReceiptIcon sx={{ mr: 1 }} />
              Generate Reciept
            </Fab>

            <RecieptModal  toggleShow={toggleShow} centredModal={centredModal} setCentredModal={setCentredModal} selectedItems={selectedItems}/>

           
          </Box>
        ) : (
          ''
        )}
        
     

      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: '#DDE6ED' }}>
              <TableCell></TableCell>
              <TableCell>Invoice no</TableCell>
              <TableCell>Part name</TableCell>
              <TableCell>Bill no</TableCell>
              <TableCell>Sub total</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>VAT</TableCell>
              <TableCell>Freight</TableCell>
              <TableCell>Grand total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {party != '' ? (
              <>
                {invoice.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Checkbox onChange={(event) => handleCheckboxChange(event, row)} />
                    </TableCell>
                    <TableCell>{row.invoice_no}</TableCell>
                    <TableCell>{row.party_id.party_name}</TableCell>
                    <TableCell>{row.sales_billno}</TableCell>
                    <TableCell>{row.sales_total}</TableCell>
                    <TableCell>{row.sales_discount}</TableCell>
                    <TableCell>{row.sales_vat}</TableCell>
                    <TableCell>{row.sales_freight}</TableCell>
                    <TableCell>{row.sales_gtotal}</TableCell>
                  </TableRow>
                ))}{' '}
              </>
            ) : (
              <>
                {sales.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                   
                    </TableCell>
                    <TableCell>{row.invoice_no}</TableCell>
                    <TableCell>{row.party_id.party_name}</TableCell>
                    <TableCell>{row.sales_billno}</TableCell>
                    <TableCell>{row.sales_total}</TableCell>
                    <TableCell>{row.sales_discount}</TableCell>
                    <TableCell>{row.sales_vat}</TableCell>
                    <TableCell>{row.sales_freight}</TableCell>
                    <TableCell>{row.sales_gtotal}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>

        
      </TableContainer>
    </>
  );
}
