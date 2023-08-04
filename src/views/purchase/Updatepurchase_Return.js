import React, { useState, useEffect } from 'react';
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
  Typography,
  Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { useParams } from 'react-router';
import { Insert_PurchaseReturn, View_Product, View_Party, ViewAll_PurchaseReturn } from '../../global';

const YourComponent = () => {
  let params = useParams();
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
  };
  const [display, setDisplay] = useState([]);
  const [party, setParty] = useState([]);
  const [formData, setFormData] = useState({
    purchase_return_item: [],
    purchasereturn_bill_no: '',
    purchase_return_date: '',
    party_id: null,
    purchase_return_totalprice: 0,
    purchase_return_discount: 0,
    purchasereturn_vat: 0,
    purchase_return_gtotal: 0,
    Freight: 0
  });

  useEffect(() => {
    recalculateAll();
  }, [formData, formData.Freight]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.purchase_return_item];
    updatedRows[index][field] = value;

    // Recalculate the Total for the current row
    updatedRows[index].Total = calculateRowTotal(updatedRows[index]);

    setFormData({
      ...formData,
      purchase_return_item: updatedRows
    });
  };

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

  const calculateRowTotal = (row) => {
    const discount = (row.Qty * row.PPrice * row.Discount) / 100;
    const total = row.Qty * row.PPrice - discount;
    return total;
  };

  const recalculateAll = () => {
    // Calculate SubTotal
    const subTotal = formData?.purchase_return_item?.reduce((total, row) => total + calculateRowTotal(row), 0);
    const discount = formData?.purchase_return_item?.reduce((dis, row) => dis + ((row.Qty * row.PPrice * row.Discount) / 100), 0);
    const vat = formData?.purchase_return_item?.reduce((vats, row) => vats + ((calculateRowTotal(row) * row.Tax) / 100), 0);

    // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
    const distotal = subTotal - discount;
    const vattotal = distotal + vat;
    const grandTotal = vattotal + formData.Freight;

    // Update the formData state with the calculated values
    setFormData({
      ...formData,
      purchase_return_totalprice: subTotal,
      purchase_return_discount: discount,
      purchasereturn_vat: vat,
      purchase_return_gtotal: grandTotal
    });
  };

  const handleFreight = (e) => {
    let Freight = parseInt(e.target.value);
    setFormData({ ...formData, [e.target.name]: Freight });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      purchase_return_item: [...formData.purchase_return_item, { ...initialRow, id: formData.purchase_return_item.length + 1 }]
    });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = formData.purchase_return_item.filter((row, i) => i !== index);
    setFormData({
      ...formData,
      purchase_return_item: updatedRows
    });
  };

  const handleAutocompleteChange = (value, index) => {
    if (value) {
      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
        alert(selectedItem?._id);

        const updatedRows = [...formData.purchase_return_item];
        updatedRows[index]['Tax'] = value;
        updatedRows[index]['ItemName'] = value;
        updatedRows[index].ItemName = selectedItem?._id;
        updatedRows[index].Tax = selectedItem?.tax_code;
        // Recalculate the Total for the current row
        updatedRows[index].Total = calculateRowTotal(updatedRows[index]);

        setFormData({
          ...formData,
          purchase_return_item: updatedRows
        });
      }
    }
  };

  const handleParty = (value) => {
    if (value) {
      const partyid = party.find((item) => item.party_name === value);
      if (partyid) {
        setFormData({
          ...formData,
          party_id: partyid._id
        });
      }
    }
  };

  useEffect(() => {
    ViewAll_PurchaseReturn(params.id)
      .then((res) => {
        console.log('Single view of purchase return :', res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const onSubmit = () => {
    Insert_PurchaseReturn(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Stack spacing={{ xs: 1 }} direction="row">
        <TextField
          variant="outlined"
          label="Bill Number"
          name="bill_no"
          size="small"
          value={formData?.purchasereturn_bill_no}
          onChange={(e) => handleInputChange('purchasereturn_bill_no', e.target.value)}
          sx={{ width: 250, mb: 3 }}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          name="product"
          size="small"
          value={formData?.party_id?.party_name}
          options={party.map((item) => item.party_name)}
          sx={{ width: 300 }}
          onChange={(e, value) => handleParty(value)}
          renderInput={(params) => <TextField {...params} label="Select Product" />}
        />

        <TextField
          type="date"
          size="small"
          onChange={(e) => handleInputChange('purchase_return_date', e.target.value)}
          value={formData?.purchase_return_date}
        />
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
            {formData?.purchase_return_item?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Autocomplete
                    key={index}
                    disablePortal
                    id="combo-box-demo"
                    name="product"
                    size="small"
                    value={row.ItemName.product_name}
                    options={display.map((item) => item.product_name)}
                    sx={{ width: 300 }}
                    onChange={(e, value) => handleAutocompleteChange(value, index)}
                    renderInput={(params) => <TextField {...params} label="Select Product" />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    label="Batch"
                    name="batch"
                    value={row.Batch}
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
                    value={row.ExpDate}
                    sx={{ borderRadius: 4, width: '15ch' }}
                    size="small"
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
                    value={row.Qty}
                    onChange={(e) => handleRowChange(index, 'Qty', parseInt(e.target.value))}
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
                    onChange={(e) => handleRowChange(index, 'Discount', parseInt(e.target.value))}
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
                    onChange={(e) => handleRowChange(index, 'PPrice', parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    label="SPrice"
                    name="SPrice"
                    size="small"
                    value={row.SPrice}
                    sx={{ borderRadius: 4, width: '10ch' }}
                    onChange={(e) => handleRowChange(index, 'SPrice', parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    label="MRP"
                    name="MRP"
                    size="small"
                    sx={{ borderRadius: 4, width: '10ch' }}
                    value={row.MRP}
                    onChange={(e) => handleRowChange(index, 'MRP', parseInt(e.target.value))}
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
                    onChange={(e) => handleRowChange(index, 'Tax', parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    label="Total"
                    size="small"
                    name="Total"
                    sx={{ borderRadius: 0, width: '10ch' }}
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

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '10px' }}>
              <div className="mb-8">
                {' '}
                <Typography variant="h5">Sub Total :</Typography>
              </div>
              <div className="mr-4">
                <TextField
                  variant="outlined"
                  name="subtotal"
                  value={formData.purchase_return_totalprice}
                  label="Sub Total"
                  size="small"
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '9px' }}>
              <div className="mb-8">
                <Typography variant="h5"> Discount : </Typography>
              </div>
              <div>
                <TextField
                  variant="outlined"
                  name="discount"
                  value={formData.purchase_return_discount}
                  label="Discount"
                  size="small"
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '10px' }}>
              <div className="mb-8">
                <Typography variant="h5"> VAT : </Typography>
              </div>
              <div>
                <TextField variant="outlined" name="vat" label="Vat" value={formData.purchasereturn_vat} size="small" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '10px' }}>
              <div className="mb-8">
                <Typography variant="h5"> Freight : </Typography>
              </div>
              <div>
                <TextField
                  variant="outlined"
                  name="Freight"
                  onChange={handleFreight}
                  label="Freight"
                  size="small"
                  value={formData.Freight}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
              <div className="mb-8">
                <Typography variant="h5"> Grand Total : </Typography>
              </div>
              <div>
                <TextField
                  variant="outlined"
                  name="gtotal"
                  value={formData.purchase_return_gtotal}
                  label="Grand Total"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
