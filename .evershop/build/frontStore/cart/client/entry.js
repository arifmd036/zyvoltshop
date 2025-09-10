
      import React from 'react';
      import ReactDOM from 'react-dom';
      import { Area } from '@evershop/evershop/components/common';
      import {HydrateFrontStore} from '@evershop/evershop/components/common';
      
import e5254f98aea0090ca90cb2d07c28b6a9c from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/catalog/pages/frontStore/all/SearchBox.js';
import edded48a09cf20d9e55f6b3ead2bf38b6 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/checkout/pages/frontStore/all/MiniCart.js';
import e869c76e7d6f2f3a51bc14cf2944658de from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/checkout/pages/frontStore/cart/ShoppingCart.js';
import e296edacaada1138843eb274e30c1ac67 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/checkout/pages/frontStore/cart/Summary.js';
import e2763c2b56919e9b56f645814167f4e11 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/Breadcrumb.js';
import ed51278e1a2a4ccd0745ddb7cf7de94fa from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/Footer.js';
import ec8d6335ce455ac2614536f524e6bd243 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/HeadTags.js';
import e3ec23e49b200d6c8a45199a455ec5c42 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/Layout.js';
import ead93ea263a0f90048244cf3271ade8e5 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/Logo.js';
import e3fd37198a975a9edb5dcebd31666ba68 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/all/Notification.js';
import ed8299da12ce4c058335b6583a48bd165 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/customer/pages/frontStore/all/UserIcon.js';
import ec621f2f5b1a4ba3db4013288aabffc38 from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/modules/promotion/pages/frontStore/cart/Coupon.js';
import collection_products from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/components/frontStore/widgets/CollectionProducts.js';
import text_block from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/components/frontStore/widgets/TextBlock.js';
import basic_menu from 'file:///C:/Users/arifm/OneDrive/Documents/WORK/Projects/evershop/local/node_modules/@evershop/evershop/dist/components/frontStore/widgets/BasicMenu.js';
Area.defaultProps.components = {
  'icon-wrapper': {
    e5254f98aea0090ca90cb2d07c28b6a9c: {
      id: 'e5254f98aea0090ca90cb2d07c28b6a9c',
      sortOrder: 5,
      component: { default: e5254f98aea0090ca90cb2d07c28b6a9c }
    },
    edded48a09cf20d9e55f6b3ead2bf38b6: {
      id: 'edded48a09cf20d9e55f6b3ead2bf38b6',
      sortOrder: 10,
      component: { default: edded48a09cf20d9e55f6b3ead2bf38b6 }
    },
    ed8299da12ce4c058335b6583a48bd165: {
      id: 'ed8299da12ce4c058335b6583a48bd165',
      sortOrder: 30,
      component: { default: ed8299da12ce4c058335b6583a48bd165 }
    }
  },
  content: {
    e869c76e7d6f2f3a51bc14cf2944658de: {
      id: 'e869c76e7d6f2f3a51bc14cf2944658de',
      sortOrder: 10,
      component: { default: e869c76e7d6f2f3a51bc14cf2944658de }
    },
    e2763c2b56919e9b56f645814167f4e11: {
      id: 'e2763c2b56919e9b56f645814167f4e11',
      sortOrder: 0,
      component: { default: e2763c2b56919e9b56f645814167f4e11 }
    }
  },
  shoppingCartRight: {
    e296edacaada1138843eb274e30c1ac67: {
      id: 'e296edacaada1138843eb274e30c1ac67',
      sortOrder: 10,
      component: { default: e296edacaada1138843eb274e30c1ac67 }
    }
  },
  footer: {
    ed51278e1a2a4ccd0745ddb7cf7de94fa: {
      id: 'ed51278e1a2a4ccd0745ddb7cf7de94fa',
      sortOrder: 10,
      component: { default: ed51278e1a2a4ccd0745ddb7cf7de94fa }
    }
  },
  head: {
    ec8d6335ce455ac2614536f524e6bd243: {
      id: 'ec8d6335ce455ac2614536f524e6bd243',
      sortOrder: 5,
      component: { default: ec8d6335ce455ac2614536f524e6bd243 }
    }
  },
  body: {
    e3ec23e49b200d6c8a45199a455ec5c42: {
      id: 'e3ec23e49b200d6c8a45199a455ec5c42',
      sortOrder: 1,
      component: { default: e3ec23e49b200d6c8a45199a455ec5c42 }
    },
    e3fd37198a975a9edb5dcebd31666ba68: {
      id: 'e3fd37198a975a9edb5dcebd31666ba68',
      sortOrder: 10,
      component: { default: e3fd37198a975a9edb5dcebd31666ba68 }
    }
  },
  header: {
    ead93ea263a0f90048244cf3271ade8e5: {
      id: 'ead93ea263a0f90048244cf3271ade8e5',
      sortOrder: 10,
      component: { default: ead93ea263a0f90048244cf3271ade8e5 }
    }
  },
  shoppingCartLeft: {
    ec621f2f5b1a4ba3db4013288aabffc38: {
      id: 'ec621f2f5b1a4ba3db4013288aabffc38',
      sortOrder: 20,
      component: { default: ec621f2f5b1a4ba3db4013288aabffc38 }
    }
  },
  '*': {
    collection_products: {
      id: 'collection_products',
      sortOrder: 0,
      component: { default: collection_products }
    },
    text_block: {
      id: 'text_block',
      sortOrder: 0,
      component: { default: text_block }
    },
    basic_menu: {
      id: 'basic_menu',
      sortOrder: 0,
      component: { default: basic_menu }
    }
  }
} 
ReactDOM.hydrate(
        React.createElement(HydrateFrontStore, null),
        document.getElementById('app')
      );