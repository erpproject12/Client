// assets

import PersonIcon from '@mui/icons-material/Person';
// constant
const icons = {
 
  PersonIcon
};





const party = {
  id: 'mparty',
  title: 'Party',
  type: 'group',
  children: [
    {
      id: 'view-party',
      title:'Party',
      type: 'item',
      url: '/mparty/view-party',
      icon: icons.PersonIcon,
      breadcrumbs: false
    }
  ]
};


export default party;
