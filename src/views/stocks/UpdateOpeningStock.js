import React, { useState, useEffect } from 'react';
import './style.css';
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
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { UpdateOpeningStock2} from '../../global';
// import { useParams } from 'react-router';

export default function UpdateOpeningStock({ toggleShow, centredModal, setCentredModal, id ,setid}) {
    const [count, setCount] = useState(0);

  const it_id=id._id;

  
  const Change = (field, value) => {
    setid((prevStock) => ({
      ...prevStock,
      [field]: value,
      total: field === 'qty' ? (parseFloat(value) * parseFloat(prevStock.price)) || 0 : (parseFloat(prevStock.qty) * parseFloat(value)) || 0,
    }));
  };

//   const calculateRowTotal = (field, value) => {
//     // Destructuring id to get the existing qty and price values
//     const { qty, price } = id;
    
//     // Parsing the value of field (either 'qty' or 'price') as a floating-point number
//     const qtyValue = parseFloat(field === 'qty' ? value : qty) || 0;
//     const priceValue = parseFloat(field === 'price' ? value : price) || 0;
  
//     // Calculating the total by multiplying the parsed qtyValue and priceValue
//     const total = qtyValue * priceValue;
    
//     // Returning the calculated total
//     return total;
//   };
  
  
  
  
  
  
  

  console.log(id);

  const onSubmit=()=>{
    UpdateOpeningStock2(it_id,id)
    .then((res)=>{
        console.log("Items"+res.data);
        toggleShow(id)
        
    })
    .catch((err)=>{
        console.log(err);
    })
  }


  return (
    <>
      <MDBModal tabIndex="-10000" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered style={{ maxWidth: '1500px', width: '100%', margin: '0 auto' }}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Opening Stock</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => toggleShow(id)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
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
                        <TextField
                          variant="outlined"
                          label="Item Name"
                          inputProps={
                            { readOnly: true, }
                        }
                        title='Update'
                          size="small"
                          sx={{ borderRadius: 4, width: '20ch' }}
                          value={id?.product_name}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          label="Batch"
                          
                          size="small"
                          sx={{ borderRadius: 4, width: '20ch' }}
                          value={id?.batch}
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
                          value={id?.exp_date}
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
                          value={id?.qty}
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
                          value={id?.price?.toFixed(2)}
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
                          value={id?.sell_price?.toFixed(2)}
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
                          value={id?.MRP?.toFixed(2)}
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
                          value={id?.total?.toFixed(2)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => toggleShow(id)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={onSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
