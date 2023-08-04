// assets
import { IconDashboard } from '@tabler/icons';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// constant
const icons = { IconDashboard,PersonIcon,AddShoppingCartIcon,TrendingUpIcon,InventoryIcon,
  AddToPhotosIcon, ManageAccountsIcon};

// constant



// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboabrd',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'view-product',
      title: 'Product',
      type: 'item',
      url: '/mproduct/view-product',
      icon: icons.AddToPhotosIcon,
      breadcrumbs: true
    },
    {
      id: 'view-party',
      title:'Party',
      type: 'item',
      url: '/mparty/view-party',
      icon: icons.PersonIcon,
      breadcrumbs: true
    },
    {
      id: 'authentication',
      title: 'Purchase',
      type: 'collapse',
      icon: AddShoppingCartIcon,

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
    },
    {
      id: 'authentication',
      title: 'Sales',
      type: 'collapse',
      icon: TrendingUpIcon,

      children: [
        {
          id: 'view-sales',
          title: 'New Sales',
          type: 'item',
          url: '/msales/view-sales'
        },
        {
          id: 'view-sales-return',
          title: 'Sales Return',
          type: 'item',
          url: '/msales/view-sales-return'
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Stocks',
      type: 'collapse',
      icon: InventoryIcon,

      children: [
        {
          id: 'view-opening-stocks',
          title: 'Opening Stock',
          type: 'item',
          url: '/mstock/view-opening-stocks',
        
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Account',
      type: 'collapse',
      icon: ManageAccountsIcon,

      children: [
        {
          id: 'reciept',
          title: 'Reciept',
          type: 'item',
          url: '/account/reciept',
        
        }
      ]
    }
  ]
};



export default dashboard;
