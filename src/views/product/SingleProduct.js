// material-ui
import { ListItem, Typography, List } from '@mui/material';
import { Single_Product, Update_Product } from '../../global';
import { useParams } from 'react-router';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
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
  return (
    <MainCard title="Product Details">
      <List>
        <ListItem>Product Code:{product.product_code}</ListItem>
        <ListItem>Product Name:{product.product_name}</ListItem>
        <ListItem>TaxCode:{product.tax_code}</ListItem>
        <ListItem>Description:{product.product_description}</ListItem>
        <ListItem>Rack Number:{product.rack_no}</ListItem>
        <ListItem>HSN:{product.HSN}</ListItem>
        <ListItem>Category:{product.category}</ListItem>
        <ListItem>Manufacturer:{product.manufactures}</ListItem>
        <ListItem> Unit Of Measure:{product.unit_of_masure}</ListItem>
        <ListItem> Weight/Demension:{product.weight_dimension}</ListItem>
        <ListItem> Variants:{product.variants}</ListItem>
        <ListItem> Variants:{product.variants}</ListItem>
        <ListItem>Date:{product.date}</ListItem>
        <ListItem>Updated Date:{product.updated_date}</ListItem>
      </List>
      <Typography variant="body2"></Typography>
    </MainCard>
  );
};

export default SamplePage;
