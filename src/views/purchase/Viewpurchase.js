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
import { useEffect } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import {Insert_Purchase,View_Product,View_Party} from '../../global'
import { setDate } from 'date-fns';

const YourComponent = () => {
  const initialRow = {
    id: 1,
    ItemName: "",
    Batch: "",
    ExpDate: "",
    Qty: 0,
    Discount: 0,
    PPrice: 0,
    SPrice: "",
    MRP: "",
    Tax: 0,
    Total: 0
  };
  const [display,setDisplay]=useState([]);
  const [party,setParty]=useState([]);
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
    recalculateAll();
  }, [formData.rows,formData.Freight]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
      
    });
   
  };

 
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
  useEffect(()=>{
    View_Product()
    .then((res)=>{
      console.log("Product Response : " + JSON.stringify(res.data));
      setDisplay(res.data)
    })
    .catch((err)=>{
      console.log("Error :" + err);
    })
  },[])
console.log(formData)
  useEffect(()=>{
    View_Party()
    .then((res)=>{
      console.log("Party name"+JSON.stringify(res.data));
      setParty(res.data)
    })
    .catch((error)=>{
      console.log("Error:"+error);
    })
  },[])
  const calculateRowTotal = (row) => {
    // Your logic to calculate the Total for a single row
    // For example: (Qty * PPrice) - Discount
    const add = (row.Qty * row.PPrice * row.Discount)/100;
    const discount = (row.Qty * row.PPrice)-add;
    const tax = (discount*row.Tax)/100;
    const total = discount+tax;
    return total;
  };

  const onSubmit = () =>{
    Insert_Purchase(formData)
    .then((res)=>{
      console.log(res);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const recalculateAll = () => {
    // Calculate SubTotal
   let discounts=0;
    let Vats = 0;
   let distotal=0;
   let vattotal=0;
   let freight=0;
   let grandTotal=0;
    const subTotal = formData.rows.reduce((total, row) => total + (row.Qty * row.PPrice), 0);
    const discount = formData.rows.reduce((dis, row) => dis + row.Discount, 0);
    const vat = formData.rows.reduce((vats, row) => vats + row.Tax, 0);

    // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
    discounts = (subTotal * discount ) /100;
    distotal  = subTotal - discounts
     // 10% discount
     Vats = (distotal * vat )  / 100;
     vattotal = Vats + distotal;
     freight =  formData.Freight;
     grandTotal =  vattotal + freight
    // Calculate grand total
   

    // Update the formData state with the calculated values
    setFormData({
      ...formData,
      SubTotal: subTotal,
      Discount: discount,
      Vat: vat,
      gtotal: grandTotal
    });
  };
 
  
  const handleFreight = (e) => {
    let Freight = parseInt(e.target.value);
    setFormData({ ...formData, [e.target.name]: Freight });
    
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { ...initialRow, id: formData.rows.length + 1 }]
      
    });
  };
console.log(formData.rows.Tax);
  const handleDeleteRow = (index) => {
    const updatedRows = formData.rows.filter((row, i) => i !== index);
    setFormData({
      ...formData,
      rows: updatedRows
     
    });
    
  };
  console.log(party);  

  const handleAutocompleteChange = (value,index) => {
    if (value) {
      // Find the selected item by its product_name
      
      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
       alert (selectedItem?._id)
       
       
        const updatedRows = [...formData.rows];
        updatedRows[index]['Tax'] = value;
        updatedRows[index]['ItemName']=value;
        updatedRows[index].ItemName = selectedItem?._id
        // Recalculate the Total for the current row
        updatedRows[index].Tax = selectedItem?.tax_code
        setFormData({
          ...formData,
          rows: updatedRows
        });
    
        // alert(selectedItem?.tax_code);


      }
    }
  };
  const handleparty=((value)=>{
    if(value){
      const partyid = party.find((item)=>item.party_name === value)
      if(partyid){
        formData.Party=partyid?._id;
        

      }
    }
    setFormData({
      ...formData,
      
  })
  })
  console.log(formData.BillDate)
 
  return (
    <div>
     <Stack spacing={{ xs: 1 }} direction="row">
          <TextField variant="outlined" label="Bill Number" name='bill_no' size="small" onChange={(e) => handleInputChange("BillNo", e.target.value)} sx={{ width: 250, mb: 3 }} />
          <FormControl sx={{ minWidth: 120 }}>
           
            
            <Autocomplete
            onChange={(e,value) => handleparty(value,"Party", e.target.value)}
      disablePortal
      id="combo-box-demo"
      size='small'
      options={party.map((item)=> item.party_name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Party Name" />}
    />
          </FormControl>

          
            <TextField type='date' size="small"  onChange={(e) => handleInputChange("BillDate", e.target.value)}/>
          
        </Stack>

      {/* Dynamic rows */}
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
                  <Autocomplete
                  key={index}
      disablePortal
      id="combo-box-demo"
      name="product"
      size='small'
      options={display.map((item) => item.product_name)}
      sx={{ width: 300 }}
      onChange={(e, value) => handleAutocompleteChange(value, index,"ItemName",e.target.value)}
      renderInput={(params) => <TextField {...params} label="Select Product" />}
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
                     
                      type="date"
                      name='expDate'
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                      value={row.col3}
                      onChange={(e) => handleRowChange(index, "ExpDate", e.target.value)}
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
                      onChange={(e) =>
                        handleRowChange(index, "Qty", parseInt(e.target.value))
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, "Discount", parseInt(e.target.value))
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, "PPrice", parseInt(e.target.value))
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, "SPrice", parseInt(e.target.value))
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, "MRP", parseInt(e.target.value))
                      }
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
                      onChange={(e) =>
                        handleRowChange(index, "Tax", parseInt(e.target.value))
                      }
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
                  <DeleteIcon onClick={() => handleDeleteRow(index)} color='error' style={{cursor:'pointer'}}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      {/* Button to add a new row */}
      <div style={{display:'flex',gap:'10px',marginTop:'10px'}}>
      <Button variant="contained" color="primary" onClick={handleAddRow} startIcon={<AddIcon />}>
            Add Item
          </Button>
          <Button variant="contained" color="success" onClick={onSubmit}  startIcon={<CheckIcon />}>
            Submit
          </Button>
          </div>
      {/* Display calculated values */}
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
                    value={formData.SubTotal.toFixed(2)}
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
                    value={formData.Discount.toFixed(2)}
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
                  <TextField variant="outlined" name="vat" label="Vat" value={formData.Vat.toFixed(2)} size="small" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '10px' }}>
              <div className="mb-8">
              <Typography variant="h5"  > Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" name="Freight" onChange={handleFreight}  label="Freight" size="small" />
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
                      value={formData.gtotal.toFixed(2)}
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
