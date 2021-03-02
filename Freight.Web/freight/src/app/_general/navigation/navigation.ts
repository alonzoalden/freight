import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    icon: 'apps',
    exactMatch: true,
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        translate: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        exactMatch: true,
        url: '/dashboard'
      },
      {
        id: 'Shipments',
        title: 'Manage Shipments',
        translate: 'Manage Shipments',
        type: 'collapsable',
        icon: 'local_shipping',
        url: '/shipment',
        exactMatch: true,
        children: [
          {
            id: 'allshipments',
            title: 'All Shipments',
            type: 'item',
            url: '/shipment/all',
            exactMatch: true,
          },
          {
            id: 'carrierdropoff',
            title: 'Carrier Drop Off',
            type: 'item',
            url: '/shipment/dropoff',
            exactMatch: true,
          },
          {
            id: 'carrierpickup',
            title: 'Carrier Pick Up',
            type: 'item',
            url: '/shipment/pickup',
            exactMatch: true,
          },
        ]
      },
      {
        id: 'Manage Items',
        title: 'Items',
        translate: 'Items',
        type: 'item',
        icon: 'dns',
        url: '/item',
        exactMatch: true,
        // children: [
        //   {
        //     id: 'allitems',
        //     title: 'All Items',
        //     type: 'item',
        //     url: '/item/all',
        //     exactMatch: true,
        //   }
        // ]
      },
      // {
      //   id: 'Billing',
      //   title: 'Billing',
      //   translate: 'Billing',
      //   type: 'collapsable',
      //   icon: '',
      //   url: '/billing',
      //   children: [
      //     {
      //       id: 'openinvoices',
      //       title: 'Open Invoices',
      //       type: 'item',
      //       url: '/billing/open',
      //     },
      //     {
      //       id: 'pastdueinvoices',
      //       title: 'Paid Invoices',
      //       type: 'item',
      //       url: '/billing/paid',
      //     },
      //     {
      //       id: 'pastdueinvoices',
      //       title: 'Past Due Invoices',
      //       type: 'item',
      //       url: '/billing/pastdue',
      //     },
      //   ]
      // },
      {
        id: 'Customers',
        title: 'Customers',
        translate: 'Customers',
        type: 'item',
        icon: 'people',
        url: '/customers',
        exactMatch: true,
        // children: [
        //   {
        //     id: 'allcustomers',
        //     title: 'All Customers',
        //     type: 'item',
        //     url: '/customers',
        //     exactMatch: true,
        //   }
        // ]
      },
      {
        id: 'Users',
        title: 'Users',
        translate: 'Users',
        type: 'item',
        icon: 'person',
        url: '/users',
        exactMatch: true,
        // children: [
        //   {
        //     id: 'allusers',
        //     title: 'All Users',
        //     type: 'item',
        //     url: '/users',
        //   },
        // ]
      },
      // {
      //   id: 'Business',
      //   title: 'Business',
      //   translate: 'Business',
      //   type: 'collapsable',
      //   icon: '',
      //   url: '/business',
      //   children: [
      //     {
      //       id: 'AllBusiness',
      //       title: 'All Business',
      //       type: 'item',
      //       url: '/business',
      //     },
      //   ]
      // },
      {
        id: 'Locations',
        title: 'Locations',
        translate: 'Locations',
        type: 'item',
        icon: 'location_on',
        url: '/location',
        exactMatch: true,
        // children: [
        //   {
        //     id: 'All Locations',
        //     title: 'All Locations',
        //     type: 'item',
        //     url: '/location',
        //   },
        // ]
      },
      {
        id: 'Fees',
        title: 'Fees',
        translate: 'Fees',
        type: 'item',
        icon: 'monetization_on',
        url: '/fee',
        exactMatch: true,
        // children: [
        //   {
        //     id: 'All Fees',
        //     title: 'All Fees',
        //     type: 'item',
        //     url: '/fee',
        //   },
        // ]
      },
      // {
      //   id: 'Settings',
      //   title: 'Settings',
      //   translate: 'Settings',
      //   type: 'collapsable',
      //   icon: '',
      //   url: '/settings',
      //   children: [
      //     {
      //       id: 'accoutinfo',
      //       title: 'Account Info',
      //       type: 'item',
      //       url: '/accountinfo',
      //     },
      //     {
      //       id: 'userprofile',
      //       title: 'User Profile',
      //       type: 'item',
      //       url: '/userprofile',
      //     },
      //     {
      //       id: 'notificationpreferences',
      //       title: 'Notification Preferences',
      //       type: 'item',
      //       url: '/notificationpreferences',
      //     },
      //   ]
      // }
    ]
  }
];
