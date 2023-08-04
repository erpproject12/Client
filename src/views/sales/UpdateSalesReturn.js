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
import {View_All,Update_Sales} from '../../global';
import { useParams } from 'react-router';
import { View_Party,View_Product,Insert_Sales} from '../../global';
const TableComponent = () => {
  const initialRow =
    {
      id: 1,
      ItemName: '',
      Batch: '',
      ExpDate: '',
      Qty: 0,
      Discount:0,
      PPrice: 0,
      MRP: '',
      Tax:"",
      Total:0
    }
    const [display,setDisplay]=useState([]);
    const [party,setParty]=useState([]);
   


  const [data, setData] = useState(
{

sales_return_freight:0,
party_id:{party_name:""},
Tax:0

}
  ); 
  console.log(data);
  const handleRowChange=(index,field,value)=>{
   const updatedRows = [...data.sales_return];
   updatedRows[index][field]=value;
   updatedRows[index].Total = calculateRowTotal(updatedRows[index]);

   setData({
    ...data,
    sales_return: updatedRows
   })
  }
  const handleFreight = (field,value) => {
   
    setData({ ...data,[field]:parseInt(value)});
  };
  
  useEffect(()=>{
    View_All(params.id)
    .then((res)=>{
        console.log("Sales_Return :" +JSON.stringify(res.data));
        setData(res.data)
    })
    .catch((error)=>{
        console.log("Error : "+error)
    })
  },[])
  const handleAutocompleteChange = (value,index) => {
    if (value) {
      // Find the selected item by its product_name
      
      const selectedItem = display.find((item) => item.product_name === value);
      if (selectedItem) {
      
       
       
        const updatedRows = [...data.sales_return];
        updatedRows[index]['Tax'] = value;
        updatedRows[index]['ItemName']=value;
        updatedRows[index].ItemName = selectedItem?._id
        // Recalculate the Total for the current row
        updatedRows[index].Tax = selectedItem?.tax_code
        setData({
          ...data,
          sales_return: updatedRows
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
    Update_Sales(params.id,data)
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
 

  useEffect(() => {
      recalculateAll();
  }, [data.sales_return,data.sales_return_freight]);

const recalculateAll =() =>{
    let discounts=0;
    let Vats = 0;
   let distotal=0;
   let vattotal=0;
   let freight=0;
   let grandTotal=0;
   const subtotal = data?.sales_return?.reduce((total, row) => total + (row.Qty * row.PPrice), 0);
 const discount = data?.sales_return?.reduce((dis, row) => dis + (row.Qty * row.PPrice * row.Discount) / 100, 0);
 
 const vat = data?.sales_return?.reduce((totalVat, row) => totalVat + ((row.Qty * row.PPrice - (row.Qty * row.PPrice * row.Discount) / 100) * row.Tax / 100), 0);
     // Calculate Discount, Vat, and Freight (replace these calculations with your desired logic)
     discounts = subtotal-discount;
    
    //  distotal  = subtotal - discounts
      // 10% discount
    //   Vats = (distotal * vat ) ;
    vattotal = (discounts + vat ) ;
    freight =  (data.sales_return_freight);
    grandTotal =  vattotal + freight
     // Calculate grand total
     const timestamp = (data.sales_return_date) ? data.sales_return_date : "2020-10-03"; // Replace this with your actual timestamp variable
     const datePart = timestamp.split('T')[0];
console.log(vat,786767);
     
    setData({
      ...data,
      sales_return_date:datePart,
      sales_return_total:subtotal,
      sales_return_discount:discount,
      sales_return_vat:vat,
      sales_return_gtotal: grandTotal,
      
      
    })
    
  }

  
  

 console.log(data?.sales_return?.PPrice,7777)
 const handleAddRow = () =>{
  setData({
    ...data,
    sales_return:[...data.sales_return,{...initialRow,id:data.sales_return.length+1}]
  })
 }
 console.log(data);
 const handleDeleteRow = (index) =>{
  const updatedRows = data.sales_return.filter((row,i)=> i !==index);
  setData({
    ...data,
    sales_return:updatedRows
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
console.log(data,777)
const params = useParams();
  useEffect(()=>{
    View_Party(params.id)
    .then((res)=>{
      console.log("Party name"+JSON.stringify(res.data));
      setParty(res.data)
    })
    .catch((error)=>{
      console.log("Error:"+error);
    })
  },[])
console.log(data?.party_id?.party_name,222222);

  return (
    <>
      <div>
        <Stack spacing={{ xs: 1 }} direction="row">
          <TextField variant="outlined" label="Bill Number" name="sales_return_bill" value={data.sales_return_bill} size="small" onChange={handleInputChange} sx={{ width: 250, mb: 3 }} />

          
          <Autocomplete
          
            
      disablePortal
      name="produasact"
      id="combo-box-demo1"
      size='small'
      value={data?.party_id?.party_name}
      options={party?.map((item)=> item.party_name)}
      sx={{ width: 300 }}
      onChange={(e,value) => handleparty(value,"Party", e.target.value)}
      renderInput={(params) => <TextField {...params} label="Select Party Name" />}
    />
<TextField type='date' size="small" name="sales_return_date" value={data?.sales_return_date}  onChange={handleInputChange}/>
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
              {(data?.sales_return)?.map((row,index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                  <Autocomplete
                  key={index}
      disablePortal
      id="combo-box-demo"
      name="product"
      size='small'
      value={row?.ItemName.product_name}
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
                      value={row?.Batch}
                      sx={{ borderRadius: 4, width: '10ch' }}
                     onChange={(e)=>handleRowChange(index,"Batch",e.target.value)}
                     
                    />
                  </TableCell>
                  <TableCell>
                  <TextField
                      variant="outlined"
                     
                      type="date"
                      name='expDate'
                      value={row?.ExpDate}
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                    
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
                      value={row?.Qty}
                      onChange={(e)=>handleRowChange(index,"Qty",e.target.value)}
                      
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Price"
                      size="small"
                      value={row?.PPrice}
                      sx={{ borderRadius: 4, width: '10ch' }}
                      onChange={(e) =>
                        handleRowChange(index, "PPrice", parseInt(e.target.value))
                      }
                     
                    />
                 </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      value={row?.Discount}
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
                      label="MRP"
                      size="small"
                      value={row.MRP}
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
    <TextField variant="outlined" value={(data?.sales_return_total ?? 0).toFixed(2)} label="Sub Total" size="small" />
  </div>
</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" value={(data.sales_return_discount ?? 0).toFixed(2)} label="Discount" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  <TextField variant="outlined"  label="VAT" value={(data.sales_return_vat ?? 0).toFixed(2)} size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Freight"  value={parseInt(data.sales_return_freight)}  onChange={(e)=>handleFreight("sales_return_freight",e.target.value)} size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5" > Grand Total : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" value={data.sales_return_gtotal} label="Grand Total" size="small" />
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
