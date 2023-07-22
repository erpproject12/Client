// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const purchase = {
  id: 'mpurchase',
  title: 'Manage Purchase',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'purchase',
      title: 'Purchase',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'view-purchase',
          title: 'New Purchase',
          type: 'item',
          url: '/mpurchase/view-purchase',
       
        },
        {
          id: 'purchase-return',
          title: 'Purchase Return',
          type: 'item',
          url: '/mpurchase/purchase-return',
        
        }
      ]
    }
  ]
};

export default purchase;
