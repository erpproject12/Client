// assets
import { IconKey } from '@tabler/icons';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// constant
const icons = {
  IconKey
};
const material = {
  AddShoppingCartIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const purchase = {
  id: 'mpurchase',
  title: 'Purchase',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Purchase',
      type: 'collapse',
      icon: material.AddShoppingCartIcon,

      children: [
        {
          id: 'view-purchase',
          title: 'New Purchase',
          type: 'item',
          url: '/mpurchase/view-purchase',
        
        },
        {
          id: 'view-purchase-return',
          title: 'Purchase Return',
          type: 'item',
          url: '/mpurchase/view-purchase-return',
         
        }
      ]
    }
  ]
};

export default purchase;
