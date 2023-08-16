import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, TextField, Typography, Autocomplete, Checkbox, IconButton } from '@mui/material';
import { View_Sales, Insert_Sales_Return } from '../../global';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';

export default function DenseTable() {
  const [sales, setSales] = React.useState([]);
  const [party, setParty] = React.useState('');
  const [invoice, setInvoice] = React.useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedInvoiceItems, setSelectedInvoiceItems] = useState([]);
  const [returnDate, setReturnDate] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Create a separate state to keep track of selected items for each invoice
  const [selectedItemsByInvoice, setSelectedItemsByInvoice] = useState({});
  let nav = useNavigate();
  useEffect(() => {
    View_Sales()
      .then((res) => {
        console.log('Party name' + JSON.stringify(res.data));
        setSales(res.data);
      })
      .catch((error) => {
        console.log('Error:' + error);
      });
  }, []);

  const handleAutocompleteChange = (value) => {
    const partyId = value ? value.party_id : null;
    console.log(partyId);

    if (partyId) {
      // Filter the sales data based on the selected party_id
      const selectedSales = sales.filter((item) => item.party_id._id === partyId._id);

      const inn = selectedSales.map((invn) => invn.invoice_no);
      setInvoice(inn);
      setParty(partyId);
    } else {
      // If the selectedId is not found, reset the invoice array
      setInvoice([]);
    }
  };

  console.log(party, 77);

  const uniqueParties = sales.filter(
    (sale, index, self) => index === self.findIndex((s) => s.party_id.party_name === sale.party_id.party_name)
  );

  const handleInvoiceItemClick = (invNo) => {
    // Filter the sales data based on the selected invoice number
    const selectedInvoiceItem = sales.filter((item) => item.invoice_no === invNo).flatMap((sale) => sale.item);

    // Update the selectedInvoiceItems state with the items of the newly selected invoice
    setSelectedInvoice(invNo);
    setSelectedInvoiceItems(selectedInvoiceItem);

    // Reset the selectedItems state when a new invoice is selected
    setSelectedItems([]);
  };

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((prevItem) => prevItem._id !== item._id));
    }
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      // Calculate sub total based on selected checkboxes
      const subTotal = selectedItems.reduce((total, item) => total + item.Qty * item.PPrice, 0);
      setSubtotal(subTotal);

      // Calculate discount amount based on a fixed discount percentage (e.g., 10%)
      const discountPercentage = 10; // You can change this to your desired discount percentage
      const discountAmt = (subTotal * discountPercentage) / 100;
      setDiscountAmount(discountAmt);

      // Calculate VAT based on a fixed VAT percentage (e.g., 5%)
      const vatPercentage = 5; // You can change this to your desired VAT percentage
      const vatAmt = (subTotal - discountAmt) * (vatPercentage / 100);
      setVat(vatAmt);

      // Calculate grand total
      const grandTotalAmt = subTotal - discountAmt + vatAmt;
      setGrandTotal(grandTotalAmt);
    } else {
      // If no items are selected (checkboxes unchecked), reset the values to zero
      setSubtotal(0);
      setDiscountAmount(0);
      setVat(0);
      setGrandTotal(0);
    }
  }, [selectedItems]);
  //   // Update the selectedItemsByInvoice state when the selectedItems state changes
  //   setSelectedItemsByInvoice((prev) => ({
  //     ...prev,
  //     [selectedInvoice]: selectedItems,
  //   }));
  // }, [selectedItems, selectedInvoice]);

  console.log(returnDate);
  const handleInputChange = (e) => {
    alert(e.target.value);
    setReturnDate(e.target.value);
  };

  const handleSubmit = () => {
    // Gather the data for submission
    const partyId = party._id;
    console.log(partyId);
    const invoiceNo = selectedInvoice;
    const items = selectedItems;
    const subTotal = subtotal;
    const discountAmt = discountAmount;
    const vatAmount = vat;
    const grandTotalAmount = grandTotal;
    const invBill = sales.find((item) => item.invoice_no === invoiceNo);
    // if(invBill){
    const billNo = invBill?.sales_billno;
    const billDate = returnDate;

    console.log(billNo);
    // }

    // Create a data object to send to the server
    const data = {
      partyId,
      invoiceNo,
      items,
      subTotal,
      discountAmount: discountAmt,
      vatAmount,
      grandTotalAmount,
      billNo,
      billDate
    };

    console.log(data);
    Insert_Sales_Return(data)
      .then((res) => {
        console.log(res);
        nav('/msales/view-sales-return');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...selectedInvoiceItems];
    updatedRows[index][field] = value;
    // Recalculate the Total for the current row
    updatedRows[index].Total = calculateRowTotal(updatedRows[index]);
    setSelectedInvoiceItems(updatedRows);

    // Trigger recalculation of totals
    setSelectedItems(updatedRows.filter((item) => selectedItems.includes(item)));
  };

  const calculateRowTotal = (row) => {
    // Your logic to calculate the Total for a single row
    // For example: (Qty * PPrice) - Discount
    const add = (row.Qty * row.PPrice * row.Discount) / 100;
    const discount = row.Qty * row.PPrice - add;
    const tax = (discount * row.Tax) / 100;
    const total = discount + tax;
    return total;
  };
  console.log(selectedInvoiceItems);

  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Autocomplete
            onChange={(e, value) => handleAutocompleteChange(value)}
            disablePortal
            id="combo-box-demo"
            name="party"
            size="small"
            options={uniqueParties}
            getOptionLabel={(option) => option.party_id.party_name} // Display the party_name in the options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Party" />}
          />
        </div>
        <div>
          <TextField type="date" size="small" name="billDate" onChange={handleInputChange} required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {invoice != '' ? (
          <div>
            <TableContainer component={Paper}>
              <Table size="large" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.map((inv, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Button
                          onClick={() => handleInvoiceItemClick(inv)}
                          style={{
                            backgroundColor: selectedInvoice === inv ? 'green' : 'inherit',
                            color: selectedInvoice === inv ? 'white' : 'inherit'
                          }}
                        >
                          {inv}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          ''
        )}

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1200 }} size="large" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Batch Number</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">MRP</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Tax(GST%)</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              {selectedInvoiceItems != '' ? (
                <>
                  <TableBody>
                    {selectedInvoiceItems.map((item, index) => (
                      <TableRow key={item.index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Checkbox onChange={(event) => handleCheckboxChange(event, item)} />
                        </TableCell>
                        <TableCell>
                          <Typography>{item?.ItemName?.product_name}</Typography>
                        </TableCell>
                        <TableCell align="right">{item?.Batch}</TableCell>
                        <TableCell align="right">
                          <div>
                            {selectedItems.includes(item) ? ( // Check if the item is in selectedItems
                              <div>
                                <TextField
                                  id="filled-basic"
                                  onChange={(e) => handleRowChange(index, 'Qty', parseInt(e.target.value))}
                                  sx={{ width: '50px', '& input': { textAlign: 'center' } }}
                                  variant="standard"
                                  value={item?.Qty}
                                />
                              </div>
                            ) : (
                              item?.Qty // Display the regular quantity value
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="right">{item?.PPrice}</TableCell>
                        <TableCell align="right">{item?.MRP}</TableCell>
                        <TableCell align="right">{item?.Discount}</TableCell>
                        <TableCell align="right">{item?.Tax}</TableCell>
                        <TableCell align="right">{item?.Total}</TableCell>
                        {/* Add other table cells here */}
                      </TableRow>
                    ))}{' '}
                  </TableBody>
                </>
              ) : (
                <TableBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      padding: '10px',
                      border: '1px solid red'
                    }}
                  >
                    <Typography variant="h4">No records</Typography>
                  </div>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <div style={{ marginTop: '10px' }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              size="large"
              startIcon={<CheckIcon sx={{ color: 'white' }} />}
              style={{ color: 'white' }}
            >
              Submit
            </Button>
          </div>
          {selectedInvoice != null ? (
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div className="flex">
                <div className="pr-12">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '19px', marginBottom: '5px' }}>
                    <div className="mb-8">
                      <Typography variant="h5">Sub Total :</Typography>
                    </div>
                    <div className="mr-4">
                      <TextField
                        variant="outlined"
                        name="subtotal"
                        label="Total"
                        size="small"
                        value={subtotal}
                        InputProps={{ readOnly: true }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                    <div className="mb-8">
                      <Typography variant="h5"> Discount : </Typography>
                    </div>
                    <div>
                      <TextField
                        variant="outlined"
                        name="discount"
                        label="Discount"
                        size="small"
                        value={discountAmount}
                        InputProps={{ readOnly: true }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '5px' }}>
                    <div className="mb-8">
                      <Typography variant="h5"> VAT : </Typography>
                    </div>
                    <div>
                      <TextField variant="outlined" name="vat" label="VAT" size="small" value={vat} InputProps={{ readOnly: true }} />
                    </div>
                  </div>
                  {/* <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '5px' }}>
                  <div className="mb-8">
                    <Typography variant="h5"> Freight : </Typography>
                  </div>
                  <div>
                    <TextField variant="outlined" label="Freight" name="Freight" size="small" />
                  </div>
                </div> */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                    <div className="mb-8">
                      <Typography variant="h5"> Grand Total : </Typography>
                    </div>
                    <div>
                      <TextField
                        variant="outlined"
                        name="gtotal"
                        label="Grand Total"
                        size="small"
                        value={grandTotal}
                        InputProps={{ readOnly: true }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
