// assets

import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// constant

const material = {
    TrendingUpIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const sales = {
  id: 'msales',
  title: 'Sales',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Sales',
      type: 'collapse',
      icon: material.TrendingUpIcon,

      children: [
        {
          id: 'view-sales',
          title: 'New Sales',
          type: 'item',
          url: '/msales/view-sales',
        
        },
        {
          id: 'view-sales-return',
          title: 'Sales Return',
          type: 'item',
          url: '/msales/view-sales-return',
         
        }
      ]
    }
  ]
};

export default sales;
