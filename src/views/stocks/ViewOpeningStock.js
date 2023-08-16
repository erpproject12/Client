import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Autocomplete,
  FormControl
} from '@mui/material';
import UpdateOpeningStock from './UpdateOpeningStock';
import { useState } from 'react';
import { useEffect } from 'react';
import { View_Product, DeleteProduct, UpdateOpeningStock1 } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function ViewOpeningStock() {
  const [centredModal, setCentredModal] = useState(false);
  const [itemid, setItemId] = useState({});

  function toggleShow(params) {
    // alert(params);
    setItemId(params);

    setCentredModal(!centredModal);
  }

  const [display, setDisplay] = useState([]);
  const [display2, setDisplay2] = useState([]);
  const [count, setCount] = useState(0);

  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState({
    batch: '',
    exp_date: '',
    qty: 0,
    price: 0,
    sell_price: 0,
    MRP: 0,
    total: 0
  });

  const Change = (field, value) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: value,
      total: calculateRowTotal(field, value) // Recalculate the Total for the current row
    }));
  };

  const calculateRowTotal = (field, value) => {
    const { qty, price } = stock;
    // Your logic to calculate the Total for a single row
    // For example: (Qty * Price) - Discount
    // Parsing the value of field (either 'qty' or 'price') as a floating-point number
    const qtyValue = parseFloat(field === 'qty' ? value : qty) || 0;
    const priceValue = parseFloat(field === 'price' ? value : price) || 0;

    // Calculating the total by multiplying the parsed qtyValue and priceValue
    const total = qtyValue * priceValue;
    return total;
  };

  const handleAutocompleteChange = (value) => {
    alert(value);
    if (value) {
      // Find the selected item by its product_name
      const selectedItem = display.find((item) => item.product_name === value);
      const pid = selectedItem._id;
      if (selectedItem) {
        setProductId(...productId, pid);
      }
    }
  };

  const onSubmit = () => {
    UpdateOpeningStock1(productId, stock)
      .then((res) => {
        console.log('Update1 :' + res.data);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    // alert(count);
    View_Product()
      .then((res) => {
        console.log('Product Response : ' + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, [count]);

  useEffect(() => {
    View_Product()
      .then((res) => {
        console.log('Product Response : ' + JSON.stringify(res.data));
        setDisplay2(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, [count]);

  const filteredAndMappedItems = display
    .filter((item, index) => {
      // Add your filter condition here, e.g., item.qty > 10
      // Return true to keep the item, false to remove it
      return item?.qty != null;
    })
    .map((item, index) => {
      // Perform the mapping operation here, e.g., add new properties or modify existing ones
      return {
        ...item,
        totalCost: item.qty * item.price
      };
    });
  console.log('filteredAndMappedItems', filteredAndMappedItems);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Exp.Date</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {formData.opening_stocks.map((row, index) => ( */}
            <TableRow>
              <TableCell>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="product_id"
                  size="small"
                  options={display2.map((item) => (item.qty ? '' : item.product_name))}
                  sx={{ width: 240 }}
                  onChange={(e, value) => handleAutocompleteChange(value)}
                  renderInput={(params) => <TextField {...params} label="Select Product" />}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  label="Batch"
                  name="batch"
                  size="small"
                  sx={{ borderRadius: 4, width: '20ch' }}
                  onChange={(e) => Change('batch', parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  type="date"
                  name="exp_date"
                  sx={{ borderRadius: 4, width: '20ch' }}
                  size="small"
                  onChange={(e) => Change('exp_date', parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  label="Qty"
                  sx={{ borderRadius: 4, width: '10ch' }}
                  size="small"
                  name="qty"
                  onChange={(e) => Change('qty', parseInt(e.target.value))}
                />
              </TableCell>

              <TableCell>
                <TextField
                  variant="outlined"
                  label="Price"
                  name="price"
                  size="small"
                  sx={{ borderRadius: 4, width: '20ch' }}
                  onChange={(e) => Change('price', parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  label="Selling Price"
                  name="sell_price"
                  size="small"
                  sx={{ borderRadius: 4, width: '20ch' }}
                  onChange={(e) => Change('sell_price', parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  label="MRP"
                  name="MRP"
                  size="small"
                  sx={{ borderRadius: 4, width: '20ch' }}
                  onChange={(e) => Change('MRP', parseInt(e.target.value))}
                />
              </TableCell>

              <TableCell>
                <TextField
                  variant="outlined"
                  label="Total"
                  size="small"
                  name="total"
                  sx={{ borderRadius: 0, width: '20ch' }}
                  value={calculateRowTotal()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '40px' }}>
        <Button
          variant="contained"
          onClick={onSubmit}
          color="success"
          sx={{ color: 'white', fontSize: '18px' }}
          size="large"
          startIcon={<CheckIcon />}
        >
          Submit
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Batch</StyledTableCell>
              <StyledTableCell>Expiry Date</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Selling Price</StyledTableCell>
              <StyledTableCell>MRP</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndMappedItems.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{item.product_name}</StyledTableCell>
                  <StyledTableCell>{item.batch}</StyledTableCell>
                  <StyledTableCell>{moment(item?.exp_date).format('L')}</StyledTableCell>
                  <StyledTableCell>{item.qty}</StyledTableCell>
                  <StyledTableCell>₹{item?.price?.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>₹{item?.sell_price?.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>₹{item?.MRP?.toFixed(2)}</StyledTableCell>
                  <StyledTableCell>₹{item?.total?.toFixed(2)}</StyledTableCell>
                  <StyledTableCell sx={{ display: 'flex' }}>
                    <IconButton
                      title="Update"
                      onClick={() => {
                        toggleShow(item);
                      }}
                    >
                      <BorderColorIcon color="primary" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            <UpdateOpeningStock
              setCount={setCount}
              toggleShow={toggleShow}
              centredModal={centredModal}
              setCentredModal={setCentredModal}
              id={itemid}
              setid={setItemId}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
