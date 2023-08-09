import React, { useState } from 'react';
import {
  Button,
  Stack,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Autocomplete
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';
import { View_Party, View_Product, Insert_Sales } from '../../global';

const TableComponent = () => {
  const initialRow = {
    id: 1,
    ItemName: '',
    Batch: '',
    ExpDate: '',
    Qty: 0,
    Discount: 0,
    PPrice: 0,
    SPrice: '',
    MRP: '',
    Tax: 0,
    Total: 0
  }; // table inside values

  const [DisAmount, setDisAmount] = useState(0);
  const [display, setDisplay] = useState([]); // it give product table names
  const [party, setParty] = useState([]); // it will show party names
  const [formData, setFormData] = useState({
    BillNo: '',
    Invoice:'',
    Party: '',
    BillDate: '',
    rows: [initialRow],
    SubTotal: 0,
    Discount: 0,
    DisAmount: 0,
    Vat: 0,
    Freight: 0,
    gtotal: 0
  }); // here state will store enter values

  console.log(formData, 9999);

  // ....................start................... billdate and bill number .............//

  //you can use both methods

  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value

  //   });

  // };

  // <TextField  onChange={(e) => handleInputChange("BillDate", e.target.value)}/>

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //   <TextField name="BillNo" onChange={handleInputChange} size="small"  /> //name should be state value

  //............................................end ......................................................//

  useEffect(() => {
    View_Product()
      .then((res) => {
        console.log('Product Response : ' + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, []);
  console.log(formData);

  useEffect(() => {
    View_Party()
      .then((res) => {
        console.log('Party name' + JSON.stringify(res.data));
        setParty(res.data);
      })
      .catch((error) => {
        console.log('Error:' + error);
      });
  }, []);

  const onSubmit = () => {
    Insert_Sales(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // .......................start.............................................................//

  useEffect(() => {
    recalculateAll();
  }, [formData.rows, formData.Freight]);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[index][field] = value;
    // Recalculate the Total for the current row
    updatedRows[index].Total = calculateRowTotal(updatedRows[index]);
    setFormData({
      ...formData,
      rows: updatedRows
    });
  };

  const calculateRowTotal = (row) => {
    // Your logic to calculate the Total for a single row
    // For example: (Qty * PPrice) - Discount
    const add = (row.Qty * row.PPrice * row.Discount) / 100;
    const discount = row.Qty * row.PPrice - add;
    const tax = (discount * row.Tax) / 100;
    const total = discount + tax;
    console.log(total);
    return total;
  };

  const recalculateAll = () => {
    // Calculate SubTotal
    let discounts = 0;
    let Vats = 0;
    let distotal = 0;
    let vattotal = 0;
    let freight = 0;
    let grandTotal = 0;
    const subTotal = formData.rows.reduce((total, row) => total + row.Qty * row.PPrice, 0);
    const discount = formData.rows.reduce((dis, row) => dis + (row.Qty * row.PPrice * row.Discount) / 100, 0);
    const vat = formData.rows.reduce(
      (vats, row) => vats + ((row.Qty * row.PPrice - (row.Qty * row.PPrice * row.Discount) / 100) * row.Tax) / 100,
      0
    );

    // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
    distotal = subTotal - discount;
    Vats = distotal + vat;
    freight = formData.Freight;
    grandTotal = Vats + freight;
    // Calculate grand total

    console.log(vat, 'vat');
    // Update the formData state with the calculated values
    setFormData({
      ...formData,
      SubTotal: subTotal,
      Discount: discount,
      Vat: vat,
      gtotal: grandTotal
    });
  };

  // ..................................end..............................................//

  // ....................................start ...addrows ...............................//
  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { ...initialRow, id: formData.rows.length + 1 }]
    });
  };

  // ..........................end ................................................//

  console.log(formData.rows.Tax);

  const handleFreight = (e) => {
    let Freight = parseInt(e.target.value);
    setFormData({ ...formData, [e.target.name]: Freight });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = formData.rows.filter((row, i) => i !== index);
    setFormData({
      ...formData,
      rows: updatedRows
    });
    console.log(index);
  };

  // ............................start.....auto(id).....................................................

  const handleAutocompleteChange = (value, index) => {
    if (value) {
      // Find the selected item by its product_name =value

      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
        alert(selectedItem?._id);

        const updatedRows = [...formData.rows];
        // updatedRows[index]['Tax'] = value;
        // updatedRows[index]['ItemName']=value;
        updatedRows[index].ItemName = selectedItem?._id;
        // Recalculate the Total for the current row
        updatedRows[index].Tax = selectedItem?.tax_code;
        setFormData({
          ...formData,
          item: updatedRows
        });

        // alert(selectedItem?.tax_code);
      }
    }
  };

  const handleparty = (value) => {
    if (value) {
      const partyid = party.find((item) => item.party_name === value);
      if (partyid) {
        formData.Party = partyid?._id;
      }
    }
    setFormData({
      ...formData
    });
  };

  // ...............................end.....auto(id).........................................

  console.log(formData.BillDate);

  return (
    <>
      <div>
        <Stack spacing={{ xs: 1 }} direction="row">
          <TextField
            variant="outlined"
            label="Bill Number"
            required
            name="BillNo"
            onChange={handleInputChange}
            size="small"
            sx={{ width: 250, mb: 3 }}
          />
          <TextField
            variant="outlined"
            label="Invoice No"
            required
            name="Invoice"
            onChange={handleInputChange}
            size="small"
            sx={{ width: 250, mb: 3 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <Autocomplete
              onChange={(e, value) => handleparty(value, 'Party', e.target.value)}
              disablePortal
              id="combo-box-demo"
              size="small"
              options={party.map((item) => item.party_name)}
              sx={{ width: 300 }}
              required
              renderInput={(params) => <TextField {...params} label="Select Party Name" />}
            />
          </FormControl>

          <TextField type="date" size="small" name="BillDate" required onChange={handleInputChange} />
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
                <TableCell>Price</TableCell>
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
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      options={display.map((item) => item.product_name)}
                      sx={{ borderRadius: 4, width: '30ch' }}
                      onChange={(e, value) => handleAutocompleteChange(value, index)}
                      renderInput={(params) => <TextField {...params} label="Select Product Name" />}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Batch"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      onChange={(e) => handleRowChange(index, 'Batch', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      type="date"
                      name="expDate"
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                      value={row.col3}
                      onChange={(e) => handleRowChange(index, 'ExpDate', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Qty"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      name="Qty"
                      required
                      value={row.Qty}
                      onChange={(e) => handleRowChange(index, 'Qty', parseInt(e.target.value))}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      value={row.Discount}
                      onChange={(e) => handleRowChange(index, 'Discount', parseInt(e.target.value))}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Price"
                      required
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.PPrice}
                      onChange={(e) => handleRowChange(index, 'PPrice', parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="MRP"
                      size="small"
                      value={row.MRP}
                      sx={{ borderRadius: 4, width: '10ch' }}
                      onChange={(e) => handleRowChange(index, 'MRP', parseInt(e.target.value))}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Tax (GST%)"
                      size="small"
                      name="Tax"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row?.Tax}
                      // onChange={(e) => handleRowChange(index, 'Tax', parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Total"
                      size="small"
                      sx={{ borderRadius: 0, width: '10ch' }}
                      name="Total"
                      value={calculateRowTotal(row)}
                    />
                  </TableCell>

                  <TableCell>
                    <DeleteIcon onClick={() => handleDeleteRow(index)} color="error" style={{ cursor: 'pointer' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
          <Button variant="contained" color="primary" onClick={handleAddRow} startIcon={<AddIcon />}>
            Add Item
          </Button>

          <Button variant="contained" color="success" onClick={onSubmit} startIcon={<CheckIcon />}>
            Submit
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div className="flex">
            <div className="pr-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '43px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5">Total :</Typography>
                </div>
                <div className="mr-4">
                  <TextField variant="outlined" name="subtotal" value={formData.SubTotal.toFixed(2)} label="Total" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" name="discount" value={formData.Discount.toFixed(2)} label="Discount" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" name="vat" value={formData.Vat.toFixed(2)} label="VAT" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" onChange={handleFreight} label="Freight" name="Freight" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Grand Total : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" name="gtotal" value={formData.gtotal.toFixed(2)} label="Grand Total" size="small" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginLeft: '150px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '80px' }}>
            <div className="mb-4">
              <Typography variant="h5"> Select Credit Note : </Typography>
            </div>
            <div>
              <TextField variant="outlined" label="Credit No" size="small" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '80px' }}>
            <div className="mb-4">
              <Typography variant="h5"> Select Purchase Bill : </Typography>
            </div>

            <div>
              <TextField variant="outlined" label="Purchase Bill No" size="small" />
            </div>
            <TextField variant="outlined" label="Purchase Bill No" size="small" />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <div className="mb-4">
              <Typography variant="h5"> To Pay : </Typography>
            </div>
            <div>
              <TextField variant="outlined" label="To Pay" size="small" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
