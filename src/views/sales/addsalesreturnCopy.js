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
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { View_Party,View_Product,Insert_Sales_Return} from '../../global';
const TableComponent = () => {
  const initialRow =
    {
      id: 1,
      ItemName: '',
      Batch: '',
      ExpDate: '',
      Qty: '0',
      Discount:0,
      PPrice: '0',
      MRP: '',
      Tax:0,
      Total:0
    }
    const [display,setDisplay]=useState([]);
    const [party,setParty]=useState([]);
  const [data, setData] = useState(
{
  BillNo:"",
  Party:"",
  BillDate:"",
  rows:[initialRow],
  SubTotal:0,
  Discount:0,
  Tax:0,
  Freight:0,
  gtotal:0,

}
  ); 
  console.log(data);
  const handleRowChange=(index,field,value)=>{
   const updatedRows = [...data.rows];
   updatedRows[index][field]=value;
   updatedRows[index].Total = calculateRowTotal(updatedRows[index]);
   setData({
    ...data,
    rows: updatedRows
   })
  }
  const handleAutocompleteChange = (value,index) => {
    if (value) {
      // Find the selected item by its product_name
      
      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
      
       
       
        const updatedRows = [...data.rows];
        updatedRows[index]['Tax'] = value;
        updatedRows[index]['ItemName']=value;
        updatedRows[index].ItemName = selectedItem?._id
        // Recalculate the Total for the current row
        updatedRows[index].Tax = selectedItem?.tax_code
        setData({
          ...data,
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
        data.Party=partyid?._id;
        

      }
    }
    setData({
      ...data,
      
  })
  })
  const onSubmit = () =>{
    Insert_Sales_Return(data)
    .then((res)=>{
      console.log(res);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const calculateRowTotal =(row) =>{
    const discount = (row.Qty * row.PPrice * row.Discount )/100;
    const totaldis = (row.Qty * row.PPrice)-discount;
    const tax = (totaldis * row.Tax)/100;
    const total = tax + totaldis;
    return total;
  
  }

useEffect(()=>{
  recalculateAll();
},[data.rows,data.Freight])

const recalculateAll =() =>{
  let discounts=0;
  let Vats = 0;
 let distotal=0;
 let vattotal=0;
 let freight=0;
 let grandTotal=0;
 const subtotal = data?.rows?.reduce((total, row) => total + (row.Qty * row.PPrice), 0);
 const discount = data?.rows?.reduce((dis, row) => dis + (row.Qty * row.PPrice * row.Discount) / 100, 0);
 
 const vat = data?.rows?.reduce((totalVat, row) => totalVat + ((row.Qty * row.PPrice - (row.Qty * row.PPrice * row.Discount) / 100) * row.Tax / 100), 0);
 

   // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
   discounts = subtotal-discount;
  
   //  distotal  = subtotal - discounts
     // 10% discount
   //   Vats = (distotal * vat ) ;
     vattotal = (discounts + vat ) ;
    freight =  data.Freight;
    grandTotal =  vattotal + freight
   // Calculate grand total
console.log(vat,909);
  setData({
    ...data,
    SubTotal:subtotal,
    Discount:discount,
    Tax:vat,
    gtotal: grandTotal
  })
}


  const handleFreight = (e) => {
    
    let Freight = parseInt(e.target.value);
    setData({ ...data, [e.target.name]: Freight });
    
  };
 const handleAddRow = () =>{
  setData({
    ...data,
    rows:[...data.rows,{...initialRow,id:data.rows.length+1}]
  })
 }
 console.log(data);
 const handleDeleteRow = (index) =>{
  const updatedRows = data.rows.filter((row,i)=> i !==index);
  setData({
    ...data,
    rows:updatedRows
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
 const handleInputChange = (e) =>{
  setData({
    ...data,[e.target.name]:e.target.value
  })
}
console.log(data)
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
console.log(data);
  return (
    <>
      <div>
        <Stack spacing={{ xs: 1 }} direction="row">
          <TextField variant="outlined" label="Bill Number" name="BillNo" size="small" onChange={handleInputChange} sx={{ width: 250, mb: 3 }} />
          <Autocomplete
            onChange={(e,value) => handleparty(value,"Party", e.target.value)}
      disablePortal
      id="combo-box-demo"
      size='small'
      options={party.map((item)=> item.party_name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Party Name" />}
    />

<TextField type='date' size="small" name="BillDate"  onChange={handleInputChange}/>
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
                <TableCell>Tax</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.rows.map((row,index) => (
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
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                     onChange={(e)=>handleRowChange(index,"Batch",e.target.value)}
                     
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
                      onChange={(e)=>handleRowChange(index,"Qty",e.target.value)}
                      
                    />
                  </TableCell>

                 
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      onChange={(e) =>
                        handleRowChange(index, "Discount", parseInt(e.target.value))
                      }
                     
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Price"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      onChange={(e) =>
                        handleRowChange(index, "PPrice", parseInt(e.target.value))
                      }
                     
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="MRP"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      onChange={(e) =>
                        handleRowChange(index, "MRP", parseInt(e.target.value))
                      }
                     
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Tax"
                      size="small"
                      value={row?.Tax}
                      sx={{ borderRadius: 4, width: '10ch' }}
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
                      sx={{ borderRadius: 0, width: '10ch' }}
                      value={calculateRowTotal(row)}
                      onChange={(e) =>
                        handleRowChange(index, "Total", parseInt(e.target.value))
                      }
                     
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
        <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
          <Button variant="contained" color="primary" onClick={handleAddRow} startIcon={<AddIcon />}>
            Add Item
          </Button>
          
          <Button variant="contained" color="success" onClick={onSubmit}  startIcon={<CheckIcon />}>
            Submit
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div className="flex">
            <div className="pr-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5" >Sub Total :</Typography>
                </div>
                <div className="mr-4">
                  <TextField variant="outlined" value={data.SubTotal} label="Sub Total" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" value={data.Discount} label="Discount" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  <TextField variant="outlined"  label="VAT" value={data.Tax} size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Freight" name='Freight' onChange={handleFreight} size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5" > Grand Total : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" value={data.gtotal} label="Grand Total" size="small" />
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
