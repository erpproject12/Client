// material-ui
import { ListItem, Typography, List, TextField, FormControl, InputLabel, MenuItem, IconButton, Select } from '@mui/material';
import { Single_Product, DeleteProduct } from '../../global';
import { useParams } from 'react-router';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Label, LabelImportant } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader, MDBTypography, MDBCol, MDBRow } from 'mdb-react-ui-kit';

// ==============================|| SAMPLE PAGE ||============================== //

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const SamplePage = () => {
  const nav = useNavigate();

  let params = useParams();

  const [product, setProduct] = useState({});
  useEffect((res) => {
    Single_Product(params.id)
      .then((res) => {
        console.log('Single Product Display :' + JSON.stringify(res.data));
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  console.log(product);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
     
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteProduct(id)
          .then((res) => {
            console.log(res);
            nav('../../mproduct/view-product');
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        
      }
      
    });
    
  };

  return (
    <MainCard title={product.product_name}>
      <h1></h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Card sx={{ minWidth: 450, boxShadow: 3, marginLeft: '10px' }}>
          <div>
            <MDBCard shadow="0" border="primary" background="white" className="mb-3">
              <MDBCardHeader></MDBCardHeader>
              <MDBCardBody className="text-primary">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Product Code : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.product_code}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Category : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.category}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Rack Numuber : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.rack_no}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Manufactures : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.manufactures}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> Description :</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.product_description}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <Button variant="outlined" style={{ width: '100px', height: '35px' }}>
                      <Link to={`/mproduct/update-product/${product._id}`}>
                        {' '}
                        <IconButton>
                          <BorderColorIcon color="primary" />{' '}
                        </IconButton>{' '}
                        Edit
                      </Link>{' '}
                    </Button>{' '}
                  </MDBCol>
                  <MDBCol sm="9">
                    <Button
                      variant="outlined"
                      sx={{ color: 'red' }}
                      startIcon={
                        <DeleteIcon
                         
                          sx={{ color: 'red' }}
                        />
                      }
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                    >
                      Delete
                    </Button>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>
          </div>
        </Card>

        <Card sx={{ minWidth: 450, boxShadow: 3 }}>
          <div>
            <MDBCard shadow="0" border="primary" background="white" className="mb-3">
              <MDBCardHeader></MDBCardHeader>
              <MDBCardBody className="text-primary">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Tax Code : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.tax_code}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>HSN : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.HSN}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Unit of Masure : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.unit_of_masure}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Weight Dimension : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.weight_dimension}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> Variants : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.variants}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Country : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">bhbh</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Date : </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{product.date}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>
          </div>
        </Card>
      </div>
    </MainCard>
  );
};

export default SamplePage;
