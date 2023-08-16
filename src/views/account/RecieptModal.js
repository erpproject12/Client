import React, { useEffect, useState } from 'react';
import '../stocks/style.css';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { View_Sales_Return } from 'global';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Payment_Reciept_Insert } from '../../global';

export default function RecieptModal({ toggleShow, centredModal, setCentredModal, selectedItems }) {
  const [salesReturn, setSaleReturn] = useState([]);
  const [paymentMode, setPaymentMode] = useState(''); // Add state to track the selected payment mode
  const [selectedCredit, setSelectedCredit] = useState([]);
  const [recieptNo, setRecieptNo] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [recieptDate, setRecieptDate] = useState('');
  const [narration, setNarration] = useState('');
  const [paidAmt, setPaidAmt] = useState(0);

  let nav=useNavigate();


  console.log(selectedItems,"selected Items");

  const inv = selectedItems.map((item) => {
    return item.invoice_no;
  });

  const pnameArray = selectedItems.map((item) => item.party_id.party_name);
  const uniquePnameSet = new Set(pnameArray);
  const uniquePnameArray = Array.from(uniquePnameSet);

  const sumOfSalesGTotal = selectedItems.reduce((total, record) => total + record.sales_gtotal, 0);

  // console.log(selectedItems,"prp" );

  useEffect(() => {
    View_Sales_Return()
      .then((res) => {
        console.log('sales retuen' + res.data);
        setSaleReturn(res.data);
      })
      .catch((err) => {
        console.log('Error' + err);
      });
  }, []);

  console.log(recieptNo);

  const partyId = selectedItems.map((item) => item.party_id._id);
  const uniquePIdSet = new Set(partyId);
  const uniquePId = Array.from(uniquePIdSet);

  const creditnote_no = salesReturn.filter((item) => uniquePIdSet.has(item?.party_id?._id));

  console.log(creditnote_no, 'sales return');

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedCredit((prev) => [...prev, item]);
    } else {
      setSelectedCredit((prev) => prev.filter((prevItem) => prevItem._id !== item._id));
    }
  };

  const mapped_creditNote = selectedCredit.map((item) => {
    return item.credit_note_no;
  });

  console.log(mapped_creditNote, 'check');

  const sumOfCredit = selectedCredit.reduce((total, record) => total + record.sales_return_gtotal, 0);



  const handleSubmit = () => {
     // Sort selectedItems array based on invoice dates (oldest to newest)
  const sortedItems = selectedItems.sort((a, b) => new Date(a.sales_billdate) - new Date(b.sales_billdate));

  // Initialize variables for payment allocation
  let remainingPayment; // Define the variable

  if (paymentMode === 'creditno') {
    remainingPayment = sumOfCredit; // Use sumOfCredit when credit note mode is selected
  } else {
    remainingPayment = paidAmt; // Use paidAmt for other payment modes
  }

  
  const paymentAllocations = [];

  // Iterate through sorted invoices and allocate payment
  sortedItems.forEach((item) => {
    const invoiceAmount = item.sales_gtotal;
    const paidAmountForInvoice = Math.min(remainingPayment, invoiceAmount); // this will compare which amount is smaller and that amount will be stored in variable.
    const balanceAmountForInvoice = invoiceAmount - paidAmountForInvoice;

    paymentAllocations.push({
      invoice_no: item.invoice_no,
      total_amount: invoiceAmount,
      paid_amount: paidAmountForInvoice,
      balance_amount: balanceAmountForInvoice
    });

    remainingPayment -= paidAmountForInvoice;
  });


    const reciept_no = recieptNo;
    const pId = uniquePId;
    const recievable_amt = sumOfSalesGTotal;
    const pay_mode = paymentMode;
    const chequeno = chequeNo;
    const transId = transactionId;
    const creditNote = mapped_creditNote;

    let recieced_amt; // Define the variable

    if (paymentMode === 'creditno') {
      recieced_amt = sumOfCredit; // Use sumOfCredit when credit note mode is selected
    } else {
      recieced_amt = paidAmt; // Use paidAmt for other payment modes
    }
    const pay_date = recieptDate;
    const r_narration = narration;

    const data = {
      reciept_no,
      pId,
      recievable_amt,
      pay_mode,
      chequeno,
      transId,
      creditNote,
      recieced_amt,
      inv,
      pay_date,
      r_narration,
      paymentAllocations
    };
   

    Payment_Reciept_Insert(data)
      .then((res) => {
        console.log('Reciept' + res.data);
        nav('/account/view_reciept');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Payment Details</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Receipt Number"
                  size="small"
                  name="recieptNo"
                  onChange={(e) => setRecieptNo(e.target.value)}
                  variant="standard"
                  sx={{ minWidth: '300px' }}
                />
                <TextField
                  id="outlined-basic"
                  label="Party Name"
                  size="small"
                  value={uniquePnameArray}
                  variant="standard"
                  sx={{ minWidth: '300px' }}
                />
                <TextField
                  id="outlined-basic"
                  label="Recievable Amount"
                  value={'₹ ' + sumOfSalesGTotal}
                  variant="standard"
                  size="small"
                  sx={{ minWidth: '300px' }}
                />
                <FormControl sx={{ minWidth: '620px' }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Payment Mode</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={paymentMode} // Set the value of the selected payment mode
                    onChange={(e) => setPaymentMode(e.target.value)} // Update the selected payment mode
                  >
                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                    <FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
                    <FormControlLabel value="creditno" control={<Radio />} label="Credit note" />
                  </RadioGroup>
                </FormControl>
                <Box sx={{ marginBottom: '40px' }}>
                  {/* Display a text field when UPI option is selected */}
                  {paymentMode === 'upi' && (
                    <TextField
                      id="outlined-basic"
                      label="Transaction Id"
                      onChange={(e) => setTransactionId(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: '450px', marginTop: '10px', marginBottom: '50px' }}
                    />
                  )}

                  {/* Display a text field when Cheque option is selected */}
                  {paymentMode === 'cheque' && (
                    <TextField
                      id="outlined-basic"
                      label="Cheque Number"
                      onChange={(e) => setChequeNo(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: '450px', marginTop: '10px', marginBottom: '50px' }}
                    />
                  )}

                  {/* Display a text field when Credit note option is selected */}
                  {paymentMode === 'creditno' && (
                    <TableContainer component={Paper} sx={{ width: '600px', marginBottom: '50px' }}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Credit note number</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {creditnote_no.map((nt, index) => (
                            <TableRow
                              key={index}
                              sx={{ paddingBottom: '2px' }}
                              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                <Checkbox onChange={(event) => handleCheckboxChange(event, nt)} />
                              </TableCell>
                              <TableCell>{nt.credit_note_no}</TableCell>
                              <TableCell>₹{nt.sales_return_gtotal}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                {paymentMode === 'creditno' ? (
                  <TextField
                    id="outlined-basic"
                    label="Recieved Amount"
                    size="small"
                    value={'₹ ' + sumOfCredit}
                    variant="standard"
                    sx={{ minWidth: '450px' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                ) : (
                  <TextField
                    id="outlined-basic"
                    label="Recieved Amount"
                    size="small"
                    value={paidAmt}
                    onChange={(e) => {
                      setPaidAmt(parseInt(e.target.value));
                    }}
                    variant="standard"
                    sx={{ minWidth: '450px' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}

                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  variant="standard"
                  onChange={(e) => setRecieptDate(e.target.value)}
                  size="small"
                  sx={{
                    minWidth: '450px',
                    height: '100px'
                  }}
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Box>
              <TextField
                id="outlined-basic"
                label="Invoice Numbers"
                size="small"
                value={inv}
                variant="standard"
                sx={{ minWidth: '930px', marginBottom: '20px' }}
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Narration"
                multiline
                onChange={(e) => setNarration(e.target.value)}
                variant="standard"
                inputProps={{
                  component: TextareaAutosize,
                  rows: 4 // You can adjust the number of visible rows
                }}
                style={{ minWidth: '930px' }}
              />
              {/* </Box> */}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
