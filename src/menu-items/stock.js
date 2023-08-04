// assets

import InventoryIcon from '@mui/icons-material/Inventory';

// constant

const material = {
    InventoryIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const stock = {
  id: 'mstock',
  title: 'Stocks',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Stocks',
      type: 'collapse',
      icon: material.InventoryIcon,

      children: [
        {
          id: 'view-opening-stocks',
          title: 'Opening Stock',
          type: 'item',
          url: '/mstock/view-opening-stocks',
        
        }
      ]
    }
  ]
};

export default stock;
