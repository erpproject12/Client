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
  Typography
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

const TableComponent = () => {
  const [rows, setRows] = useState([
    // Initial data with an empty row
    {
      id: 1,
      ItemName: '',
      Batch: '',
      ExpDate: '',
      Qty: '0',
      Discount: '0',
      Price: '',
      MRP: '',
      Tax: '',
      Total: ''
    }
  ]);
  const [nextId, setNextId] = useState(2); // Track the next available ID for new rows

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: nextId,
        ItemName: '',
        Batch: '',
        ExpDate: '',
        Qty: '',
        Discount: '',
        Price: '',
        MRP: '',
        Tax: '',
        Total: ''
      }
    ]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(updatedRows);
  };
  //   const handleInputChange2 = (id, field, value) => {
  //     const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
  //     setRows(updatedRows);
  //     let qty=rows[id-1].Qty;
  //     let price=rows[id-1].PPrice;
  //     let total=qty*price;
  //     console.log(total)

  //   };
  const handleInputChange2 = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(value, row.PPrice) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const handlePPriceChange = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(row.Qty, value) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const handleDiscount = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(row.Discount, value) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const calculateTotal = (qty, price, Discount) => {
    const parsedQty = parseFloat(qty);
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(Discount);
    return isNaN(parsedQty) || isNaN(parsedPrice) ? 0 : parsedQty * parsedPrice;
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
      setNextId(nextId - 1);
    }
  };
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
          <TextField variant="outlined" label="Bill Number" size="small" sx={{ width: 250, mb: 3 }} />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Party</InputLabel>
            <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" size="small" label="Party" sx={{ width: 250 }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={'Bill Date'} size="small" />
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
                <TableCell>Price</TableCell>
                <TableCell>MRP</TableCell>

                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
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
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Batch"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col2}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Exp.Date"
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                      value={row.col3}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
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
                      onChange={(e) => handleInputChange2(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  
                  
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      value={row.Discount}
                      onChange={(e) => handleDiscount(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="SPrice"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col9}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="MRP"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col10}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Total"
                      size="small"
                      sx={{ borderRadius: 0, width: '10ch' }}
                      value={row.total}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
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
          <Button variant="contained" color="error" onClick={handleRemoveRow} startIcon={<DeleteIcon />}>
            Remove
          </Button>
          <Button variant="contained" color="success" onClick={handleRemoveRow} startIcon={<CheckIcon />}>
            Submit
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'end'}}>
          <div className="flex">
            <div className="pr-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '43px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5">Total :</Typography>
                </div>
                <div className="mr-4">
                  <TextField variant="outlined" label="Total" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Discount" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="VAT" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Freight" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Grand Total : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Grand Total" size="small" />
                </div>
              </div>

             
            </div>
          </div>
        </div>


        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px',marginLeft:'150px'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <div className="mb-8">
                <Typography variant="h5"> Select Credit Note : </Typography>
              </div>
              <div>
                <TextField variant="outlined" label="Credit No" size="small" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
              <div className="mb-4">
                <Typography variant="h5"> Select Purchase Bill : </Typography>
              </div>
            
              <div>
                <TextField variant="outlined" label="Purchase Bill No" size="small" />
              </div>
                <TextField variant="outlined" label="Purchase Bill No" size="small" />
            </div>

            
            
          </div>

        <div style={{display:'flex',justifyContent: 'end'}}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
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
