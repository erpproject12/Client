// assets
import { IconKey } from '@tabler/icons';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
// constant
const icons = {
  IconKey,
  AddToPhotosIcon
};





const products = {
  id: 'mproduct',
  title: 'Product',
  type: 'group',
  children: [
    {
      id: 'view-product',
      title: 'Product',
      type: 'item',
      url: '/mproduct/view-product',
      icon: icons.AddToPhotosIcon,
      breadcrumbs: false
    }
  ]
};


export default products;
