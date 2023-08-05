import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Products = Loadable(lazy(() => import('views/product/Addproduct')));
// const Party = Loadable(lazy(() => import('views/Party/Addparty')));
const ViewProducts = Loadable(lazy(() => import('views/product/Viewproduct')));
const UpdateProducts = Loadable(lazy(() => import('views/product/UpdateProduct')));
const SingleProducts = Loadable(lazy(() => import('views/product/SingleProduct')));


const Party = Loadable(lazy(() => import('views/party/AddParty')));;
const ViewParty = Loadable(lazy(() => import('views/party/ViewParty')));
const UpdateParty = Loadable(lazy(() => import('views/party/UpdateParty')));
const SingleParty = Loadable(lazy(() => import('views/party/SingleParty')));

const Addpurchase = Loadable(lazy(() => import('views/purchase/Addpurchase')));
const Viewpurchase = Loadable(lazy(() => import('views/purchase/Viewpurchase')));
const AddpurchaseReturn = Loadable(lazy(() => import('views/purchase/AddpurchaseReturn')));
const ViewpurchaseReturn = Loadable(lazy(() => import('views/purchase/ViewpurchaseReturn')));

const ViewAllpurchaseReturn = Loadable(lazy(() => import('views/purchase/ViewAllPurchaseReturn')));
const UpdatepurchaseReturn = Loadable(lazy(() => import('views/purchase/Updatepurchase_Return')));




const Addsales = Loadable(lazy(() => import('views/sales/Addsales')));
const Viewsales = Loadable(lazy(() => import('views/sales/Viewsales')));
const AddsalesReturn = Loadable(lazy(() => import('views/sales/AddsalesReturn')));
const ViewsalesReturn = Loadable(lazy(() => import('views/sales/ViewsalesReturn')));
const UpdateSalesReturn = Loadable(lazy(() => import('views/sales/UpdateSalesReturn')));
const ViewAll = Loadable(lazy(() => import('views/sales/ViewAll')));
// const Updatepurchase = Loadable(lazy(() => import('views/purchase/Updatepurchase')));



// const Addsales = Loadable(lazy(() => import('views/sales/Addsales')));
const ViewOpeningStock = Loadable(lazy(() => import('views/stocks/ViewOpeningStock')));

const Reciept = Loadable(lazy(() => import('views/account/Reciept')));


// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'mproduct',
      children: [
        {
          path: 'add-product',
          element: <Products />
        },
        {
          path: 'view-product',
          element: <ViewProducts />
        },
        {
          path: 'update-product/:id',
          element: <UpdateProducts />
        },
        {
          path: 'single-product/:id',
          element: <SingleProducts />
        }
      ]
    },
    {
      path: 'mparty',
      children: [
        {
          path: 'add-party',
          element: <Party />
        },
        {
          path: 'view-party',
          element: <ViewParty />
        },
        {
          path: 'update-party/:id',
          element: <UpdateParty />
        },
        {
          path: 'single-party/:id',
          element: <SingleParty />
        }
      ]
    },
    {
      path: 'mpurchase',
      children: [
        {
          path: 'add-purchase',
          element: <Addpurchase />
        },
        {
          path: 'view-purchase',
          element: <Viewpurchase />
        },
        {
          path: 'add-purchase-return',
          element: <AddpurchaseReturn />
        },
        {
          path: 'view-purchase-return',
          element: <ViewpurchaseReturn />
        },
        {
          path: 'viewall-purchasereturn/:id',
          element: <ViewAllpurchaseReturn />
        },
        {
          path: 'update-purchasereturn/:id',
          element: <UpdatepurchaseReturn />
        }
      ]
    },
   
    {
      path: 'msales',
      children: [
        {
          path: 'add-sales',
          element: <Addsales />
        },
        {
          path: 'view-sales',
          element: <Viewsales />
        },
        {
          path: 'add-sales-return',
          element: <AddsalesReturn />
        },
        {
          path: 'view-sales-return',
          element: <ViewsalesReturn />
        },
        {
          path: 'view-all/:id',
          element: <ViewAll />
        },
        {
          path: 'update-sales-return/:id',
          element: <UpdateSalesReturn />
        }
      ]
    },

    {
      path: 'mstock',
      children: [
       
        {
          path: 'view-opening-stocks',
          element: <ViewOpeningStock />
        }
        
      ]
    },
   
    {
      path: 'account',
      children: [
       
        {
          path: 'reciept',
          element: <Reciept />
        }
        
      ]
    },
   
   
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
