// material-ui
import { ListItem, Typography,List ,TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select } from '@mui/material';
import {Single_Party,Delete_Party} from '../../global'
import { useParams } from 'react-router';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import { Label, LabelImportant } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBTypography,
  MDBCol,
  MDBRow
  
} from 'mdb-react-ui-kit';


// ==============================|| SAMPLE PAGE ||============================== //


const SamplePage = () => {
  let nav = useNavigate();
    let params = useParams();
const [party,setParty]=useState({})
useEffect((res)=>{
  Single_Party(params.id)
    .then((res)=>{
        console.log("Single party Display :" +JSON.stringify(res.data))
        setParty(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
console.log(party)


const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Delete_Party(id)
        .then((res) => {
          console.log(res);
          nav('../../mparty/view-party');
        })
        .catch((err) => {
          console.log(err);
        });
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
};


return(
  <MainCard title="Party Details" >
   
   
   <div>
      <MDBCard shadow='0' border='primary' background='white' className='mb-3'>
        <MDBCardHeader>{party.party_name}</MDBCardHeader>
        <MDBCardBody className='text-primary'>
          
                        <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Contect Number : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

               

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email Id : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Address : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_address} ,   {party.party_state} , {party.party_city} , {party.party_street}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> Pincode : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_pincode}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Country : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_country}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Date : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{party.party_date}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
          
                <MDBRow>
                  <MDBCol sm="3">

                    
                    <MDBCardText> <Button variant="outlined" sx={{color:'red'}} > <Link to={`/mparty/update-party/${party._id}`}>
                      
                      <BorderColorIcon color="primary" /> Edit
                    
                  </Link></Button></MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                  <Button variant="outlined" sx={{color:'red'}}  startIcon={<DeleteIcon  sx={{color:'red'}} />}
                  onClick={() => handleDelete(party._id)}>
        Delete
      </Button>

                  
                    
                  </MDBCol>
                </MDBRow>
                <hr />
          

        </MDBCardBody>
      </MDBCard>

     

      
</div>
</MainCard>



)};

export default SamplePage;
