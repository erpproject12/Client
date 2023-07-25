import React, { useState } from 'react';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { Calculate } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import {Insert_Purchase} from '../../global'
const TableComponent = () => {

  // const [purchase, setPurchase] = useState([]);
  // const [billNo, setBillNo] = useState('');
  // const [party, setParty] = useState('');
  // const [billDate, setBillDate] = useState('');
  // const [subTotal, setSubTotal] = useState('');
  // const [discount, setDiscount] = useState('');
  // const [vat, setVat] = useState('');
  // const [freight, setFreight] = useState('');
  // const [grandTotal, setGrandTotal] = useState('');
  
  // const [rows, setRows] = useState([
  //   // Initial data with an empty row
  //   {
  //     id: 1,
  //     ItemName: '',
  //     Batch: '',
  //     ExpDate: '',
  //     Qty: 0,
  
  //     Discount: 0,
  //     PPrice: 0,
  //     SPrice: '',
  //     MRP: '',
  //     Tax: 0,
  //     Total: 0,
  //   },
  // ]);
  // const [nextId, setNextId] = useState(2); // Track the next available ID for new rows
  // const [calc, setCalc] = useState({
  //   subtotal: 0,
  //   discount: 0,
  //   vat: 0,
  //   Freight: 0,
  //   gtotal: 0,
  // });
  // console.log(calc?.subtotal + calc?.vat + calc?.Freight);
  // const handleAddRow = () => {
  //   setRows([
  //     ...rows,
  //     {
  //       id: nextId,
  //       ItemName: '',
  //       Batch: '',
  //       ExpDate: '',
  //       Qty: 0,
  
  //       Discount: 0,
  //       PPrice: 0,
  //       SPrice: '',
  //       MRP: '',
  //       Tax: 0,
  //       Total: 0,
  //     },
  //   ]);
  //   setNextId(nextId + 1);
  // };
  
  // const Change = (e) => {
  //   setPurchase({ ...purchase, [e.target.name]: e.target.value });
  // };
  
  // // Function to add data to the state
  // const addData = () => {
  //   setPurchase([
  //     ...purchase,
  //     {
  //       billNo,
  //       party,
  //       billDate,
  //       subTotal,
  //       discount,
  //       vat,
  //       freight,
  //       grandTotal,
  //       rows, // Store rows as an array in the purchase object
  //     },
  //   ]);
  //   setBillNo('');
  //   setParty('');
  //   setBillDate('');
  //   setSubTotal('');
  //   setDiscount('');
  //   setVat('');
  //   setFreight('');
  //   setGrandTotal('');
  //   // setRows([]);
  // };
  
  // console.log(purchase);
  // const handleInputChange = (id, field, value) => {
  //   const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
  //   setRows(updatedRows);
  // };
  
  //   const handleInputChange2 = (id, field, value) => {
  //     const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
  //     setRows(updatedRows);
  //     let qty=rows[id-1].Qty;
  //     let price=rows[id-1].PPrice;
  //     let total=qty*price;
  //     console.log(total)

  //   };




  const initialRow = {
    id: 1,
    ItemName: "",
    Batch: "",
    ExpDate: "",
    Qty: "",
    Discount: "",
    PPrice: "",
    SPrice: "",
    MRP: "",
    Tax: "",
    Total: ""
  };

  const [formData, setFormData] = useState({
    BillNo: "",
    Party: "",
    BillDate: "",
    rows: [initialRow],
    SubTotal: 0,
    Discount: 0,
    Vat: 0,
    Freight: 0,
    gtotal: 0
  });

  useEffect(() => {
    // Calculate SubTotal
    const subTotal = formData.rows.reduce((total, row) => total + row.Total, 0);

    // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
    const discount = subTotal * 0.1; // 10% discount
    const vat = subTotal * 0.05; // 5% VAT
    const freight = 100; // Example: fixed freight amount of 100

    // Calculate grand total
    const grandTotal = subTotal - discount + vat + freight;

    // Update the formData state with the calculated values
    setFormData({
      ...formData,
      SubTotal: subTotal,
      Discount: discount,
      Vat: vat,
      Freight: freight,
      gtotal: grandTotal
    });
  }, [formData.rows]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[index][field] = value;

    setFormData({
      ...formData,
      rows: updatedRows
    });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { ...initialRow, id: formData.rows.length + 1 }]
    });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = formData.rows.filter((row, i) => i !== index);

    setFormData({
      ...formData,
      rows: updatedRows
    });
  };
  console.log(formData);


  

  // const handleInputChange2 = (id, name, value) => {
  //   setRows((prevRows) => {
  //     const updatedRows = prevRows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, [name]: value, Total: calculateTotal(value, row.PPrice, row.Discount, row.Tax) };
  //       }
  //       return row;
  //     });
  //     return updatedRows;
  //   });
  // };

  // const handlePPriceChange = (id, name, value) => {
  //   setRows((prevRows) => {
  //     const updatedRows = prevRows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, [name]: value, Total: calculateTotal(row.Qty, value, row.Discount, row.Tax) };
  //       }
  //       return row;
  //     });
  //     return updatedRows;
  //   });
  // };

  // const handleDiscountChange = (id, name, value) => {
  //   setRows((prevRows) => {
  //     const updatedRows = prevRows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, [name]: value, Total: calculateTotal(row.Qty, row.PPrice, value, row.Tax) };
  //       }
  //       return row;
  //     });
  //     return updatedRows;
  //   });
  // };

  // const handleTaxChange = (id, name, value) => {
  //   setRows((prevRows) => {
  //     const updatedRows = prevRows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, [name]: value, Total: calculateTotal(row.Qty, row.PPrice, row.Discount, value) };
  //       }
  //       return row;
  //     });
  //     return updatedRows;
  //   });
  // };
  // const calculateTotal = (qty, price, discount, tax) => {
  //   const parsedQty = parseFloat(qty);
  //   const parsedPrice = parseFloat(price);
  //   const parsedDiscount = parseFloat(discount);
  //   const parsedTax = parseFloat(tax);
  //   const subtotal = isNaN(parsedQty) || isNaN(parsedPrice) ? 0 : (parsedQty * parsedPrice * parsedDiscount) / 100;
  //   const totalDiscount = parsedQty * parsedPrice - (isNaN(subtotal) ? 0 : subtotal);
  //   const taxamt = isNaN(parsedTax) ? 0 : (totalDiscount * parsedTax) / 100;

  //   return taxamt + totalDiscount;
  // };

  // //   const totalDiscount = (Percentage,total) => {
  // //     if(Percentage==0 || Percentage==null || Percentage==""){
  // //         return total
  // //     }
  // //     else{
  // //     console.log(Percentage,total)
  // //     const parsedPercentage = parseFloat(Percentage);
  // //     const parsedtotal = parseFloat(total);
  // //  console.log(parsedtotal * parsedPercentage/100,333)
  // //     return isNaN(parsedPercentage) || isNaN(parsedtotal) ? 0 : total - ((parsedtotal * parsedPercentage)/100)  ;

  // //     }
  // //   };
  // useEffect(() => {
  //   let discount = 0;
  //   let price = 0;
  //   let qty = 0;
  //   let tot = 0;
  //   let subtotal = 0;
  //   let tax = 0;
  //   rows.map((row) => {
  //     price = parseInt(row.PPrice);
  //     qty = parseInt(row.Qty);
  //     tot = price * qty;
  //     subtotal += tot;
  //     discount += parseInt(row.Discount);
  //     tax += parseInt(row.Tax);
  //   });
  //   let amt = (subtotal * discount) / 100;
  //   let gtotal = subtotal - amt;
  //   let vat = (gtotal * tax) / 100;
  //   let all = gtotal + vat;

  //   let Freight = parseInt(calc.Freight);
  //   if (isNaN(Freight)) {
  //     setCalc({ ...calc, subtotal: subtotal, discount: discount, tax: tax, gtotal: all });
  //   } else {
  //     let total = all + Freight;

  //     setCalc({ ...calc, subtotal: subtotal, discount: discount, tax: tax, gtotal: total });
  //   }
  //   console.log(vat, 88);
  // }, []);

  // const handleFreight = (e) => {
  //   let Freight = parseInt(e.target.value);
  //   setCalc({ ...calc, [e.target.name]: Freight });
  // };
  // console.log(calc);
  // const handleRemoveRow = () => {
  //   if (rows.length > 1) {
  //     setRows(rows.slice(0, -1));
  //     setNextId(nextId - 1);
  //   }
  // };




  
  // useEffect(()=>{
  //     console.log('hello')
  // let qty=rows[0].Qty;
  // let price=rows[0].PPrice;
  // let total=qty*price;
  // console.log(total)
  // },[rows[0].Qty,rows[0].PPrice])

  return (
    <>
      <div>
        <Stack spacing={{ xs: 1 }} direction="row">
          <TextField variant="outlined" label="Bill Number" name='bill_no' size="small"  onChange={(e) => handleInputChange("BillNo", e.target.value)} sx={{ width: 250, mb: 3 }} />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Party</InputLabel>
            <Select labelId="demo-simple-select-helper-label"  onChange={(e) => handleInputChange("BillNo", e.target.value)}  name='party' id="demo-simple-select-helper" size="small" label="Party" sx={{ width: 250 }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={'Bill Date'} size="small"  onChange={(e) => handleInputChange("BillNo", e.target.value)}  name='bill_date'/>
          </LocalizationProvider>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{ width: 200 }}>Item Name</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Exp.Date</TableCell>
                <TableCell>Qty</TableCell>
               
                <TableCell>Discount</TableCell>
                <TableCell>PPrice</TableCell>
                <TableCell>SPrice</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Tax (GST%)</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {formData.rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Item Name"
                      name="ItemName"
                      sx={{ borderRadius: 4, width: '20ch' }}
                      size="small"
                      value={row.col1}
                      onChange={(e) => handleRowChange(index, "Batch", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Batch"
                      name='batch'
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col2}
                      onChange={(e) => handleRowChange(index, "Batch", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Exp.Date"
                      name='expDate'
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                      value={row.col3}
                      onChange={(e) => handleInputChange("BillNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Qty"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      name="Qty"
                      value={row.Qty}
                      onChange={(e) => handleRowChange(index, "Qty", e.target.value)}
                    />
                  </TableCell>
                  
                  
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      name="Discount"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      value={row.Discount}
                      onChange={(e) => handleInputChange("BillNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="PPrice"
                      name="PPrice"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.PPrice}
                      onChange={(e) => handleInputChange("BillNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="SPrice"
                      name="SPrice"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col9}
                      onChange={(e) => handleInputChange("BillNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="MRP"
                      name="MRP"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col10}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Tax (GST%)"
                      size="small"
                      name="Tax"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col11}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Total"
                      size="small"
                      name="Total"
                      sx={{ borderRadius: 0, width: '10ch' }}
                      value={isNaN(row.Total) ? 0 : row.Total}
                    />
                  </TableCell>
                  <Button variant="contained" color="error"  onClick={() => handleDeleteRow(index)} startIcon={<DeleteIcon />}>
            Remove
          </Button>
                </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
          <Button variant="contained" color="primary" onClick={handleAddRow} startIcon={<AddIcon />}>
            Add Item
          </Button>
          {/* <Button variant="contained" color="error"  onClick={() => handleDeleteRow(index)} startIcon={<DeleteIcon />}>
            Remove
          </Button> */}
          <Button variant="contained" color="success"  startIcon={<CheckIcon />}>
            Submit
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div className="flex">
            <div className="pr-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '7px' }}>
                <div className="mb-8">
                  {' '}
                  <Typography variant="h5">Sub Total :</Typography>
                </div>

                <div className="mr-4">
                  {/* <TextField
                    variant="outlined"
                    name="subtotal"
                    value={isNaN(calc.subtotal) ? 0 : calc.subtotal}
                    label="Sub Total"
                    size="small"
                  /> */}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
              <div className="mb-8">
              <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  {/* <TextField
                    variant="outlined"
                    name="discount"
                    value={isNaN(calc.discount) ? 0 : calc.discount}
                    label="Discount"
                    size="small"
                  /> */}
                </div>
                
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '7px' }}>
              <div className="mb-8">
              <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  {/* <TextField variant="outlined" name="vat" label="Vat" value={isNaN(calc.tax) ? 0 : calc.tax} size="small" /> */}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '7px' }}>
              <div className="mb-8">
              <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  {/* <TextField variant="outlined" name="Freight" onChange={handleFreight} label="Freight" size="small" /> */}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                <div className="mb-8">
                <Typography variant="h5"> Grand Total : </Typography>
                </div>
                  <div>
                    {/* <TextField
                      variant="outlined"
                      name="gtotal"
                      value={isNaN(calc.gtotal) ? 0 : calc.gtotal}
                      label="Grand Total"
                      size="small"
                    /> */}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
