// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const purchase = {
  id: 'mpurchase',
  title: 'Purchase',
  type: 'group',
  children: [
    {
      id: 'view-purchase',
      title: 'Purchase',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'view-purchase',
          title: 'New Purchase',
          type: 'item',
          url: '/mpurchase/view-purchase',
          target: true
        },
        {
          id: 'register3',
          title: 'New Purchase',
          type: 'item',
          url: '/mpurchase/view-purchase',
          target: true
        }
      ]
    }
  ]
};

export default purchase;
