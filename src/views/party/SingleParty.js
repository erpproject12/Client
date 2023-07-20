// material-ui
import { List,ListItem } from '@mui/material';
import {Single_Party} from '../../global'
import { useParams } from 'react-router';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    let params = useParams();
const [party,setParty]=useState({})
useEffect(()=>{
    Single_Party(params.id)
    .then((res)=>{
        console.log("Single Product Display :" +JSON.stringify(res.data))
        setParty(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
},[])

return(

  <MainCard title="Party Details">
  <List>
    <ListItem variant="body2">
   Name:{party.party_name}
    </ListItem>
    <ListItem variant="body2">
     Phone:{party.party_phone}
    </ListItem>
    <ListItem variant="body2">
     Email:{party.party_email}
    </ListItem>
    <ListItem variant="body2">
   Address:{party.party_address}
    </ListItem>
    <ListItem variant="body2">
   Street:{party.party_street}
    </ListItem>
    <ListItem variant="body2">
   City:{party.party_city}
    </ListItem>
    <ListItem variant="body2">
   State:{party.party_state}
    </ListItem>
    <ListItem variant="body2">
   Pincode:{party.party_pincode}
    </ListItem>
    <ListItem variant="body2">
     
    
 Country:{party.party_country}
    </ListItem>
    <ListItem variant="body2">
   GST:{party.party_GST}
    </ListItem>
    <ListItem variant="body2">
   AccountType:{party.party_account_type}
    </ListItem>
    <ListItem variant="body2">
   Credit Limit:{party.party_creadit_limit}
    </ListItem>
   
    <ListItem variant="body2">
   Credit Days:{party.party_creadit_days}
    </ListItem>
    <ListItem variant="body2">
    Date:{party.date}
    </ListItem>
    <ListItem variant="body2">
    updated Date:{party.updated_date}
    </ListItem>
   
    </List>
   
    
  




     
     
  
  </MainCard>
)};

export default SamplePage;
