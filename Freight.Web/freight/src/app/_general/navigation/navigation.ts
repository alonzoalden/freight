import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'Shipments',
        title: 'Manage Shipments',
        translate: 'Manage Shipments',
        type: 'collapsable',
        icon: '',
        url: '/shipment',
        children: [
          {
            id: 'allshipments',
            title: 'All Shipments',
            type: 'item',
            url: '/shipment/all',
          },
          {
            id: 'openshipments',
            title: 'Open Shipments',
            type: 'item',
            url: '/shipment/open',
          },
          {
            id: 'closedshipments',
            title: 'Closed Shipments',
            type: 'item',
            url: '/shipment/closed',
          },
          {
            id: 'cancelledshipments',
            title: 'Cancelled Shipments',
            type: 'item',
            url: '/shipment/cancelled',
          }
        ]
      },
      {
        id: 'Manage Items',
        title: 'Items',
        translate: 'Items',
        type: 'collapsable',
        icon: '',
        url: '/item',
        exactMatch: true,
        children: [
          {
            id: 'allitems',
            title: 'All Items',
            type: 'item',
            url: '/item/all',
            exactMatch: true,
          }
        ]
      },
      {
        id: 'Billing',
        title: 'Billing',
        translate: 'Billing',
        type: 'collapsable',
        icon: '',
        url: '/billing',
        children: [
          {
            id: 'openinvoices',
            title: 'Open Invoices',
            type: 'item',
            url: '/billing/open',
          },
          {
            id: 'pastdueinvoices',
            title: 'Paid Invoices',
            type: 'item',
            url: '/billing/paid',
          },
          {
            id: 'pastdueinvoices',
            title: 'Past Due Invoices',
            type: 'item',
            url: '/billing/pastdue',
          },
        ]
      },
      {
        id: 'Customers',
        title: 'Customers',
        translate: 'Customers',
        type: 'collapsable',
        icon: '',
        url: '/customers',
        children: [
          {
            id: 'allcustomers',
            title: 'All Customers',
            type: 'item',
            url: '/customers',
          }
        ]
      },
      {
        id: 'Users',
        title: 'Users',
        translate: 'Users',
        type: 'collapsable',
        icon: '',
        url: '/users',
        children: [
          {
            id: 'allusers',
            title: 'All Users',
            type: 'item',
            url: '/users',
          },
        ]
      },
      {
        id: 'Business',
        title: 'Business',
        translate: 'Business',
        type: 'collapsable',
        icon: '',
        url: '/business',
        children: [
          {
            id: 'AllBusiness',
            title: 'All Business',
            type: 'item',
            url: '/business',
          },
        ]
      },
      {
        id: 'Settings',
        title: 'Settings',
        translate: 'Settings',
        type: 'collapsable',
        icon: '',
        url: '/settings',
        children: [
          {
            id: 'accoutinfo',
            title: 'Account Info',
            type: 'item',
            url: '/accountinfo',
          },
          {
            id: 'userprofile',
            title: 'User Profile',
            type: 'item',
            url: '/userprofile',
          },
          {
            id: 'notificationpreferences',
            title: 'Notification Preferences',
            type: 'item',
            url: '/notificationpreferences',
          },
        ]
      }
    ]
  }
];
