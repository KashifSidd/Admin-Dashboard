import { IRouteAccess, Roles, Services } from "src/app/shared/models";

export const navLinks: INavLink[] = [
    {
        name: 'All Live Orders',
        icon: 'assets/icons/home.svg',
        route: 'all-service-live-statistics'
    },
    {
        name: 'Home',
        icon: 'assets/icons/home.svg',
        route: 'home'
    },
    {
        name: 'Inquiry Orders',
        icon: 'assets/icons/inquiry-order-icon.svg',
        route: 'inquiry-orders'
    },
    // {
    //   name: 'Log Data',
    //   icon: 'assets/icons/log-data.svg',
    //   route: 'log-data',
    // },
    // {
    //   name: 'Finance',
    //   icon: 'assets/icons/finance.svg',
    //   route: 'finance',
    // },
    // {
    //   name: 'Menu Cloning',
    //   icon: 'assets/icons/menu-cloning.svg',
    //   route: 'menu-cloning',
    // },
    {
        name: 'Live Dashboard',
        icon: 'assets/icons/live-dashboard.svg',
        route: 'live-dashboard'
    },
    {
        name: 'Zone Statistics',
        icon: 'assets/icons/live-dashboard.svg',
        route: 'zone-statistics'
    },
    {
        name: 'Riders',
        icon: 'assets/icons/rider-icon.svg',
        route: 'riders-list'
    },
    {
        name: 'Orders',
        icon: 'assets/icons/orders-icon.svg',
        subMenu: [
            {
                name: 'All Orders',
                route: 'orders'
            },
            {
                name: 'For Cancellation',
                route: 'orders-for-cancellation'
            },
            {
                name: 'For Refund',
                route: 'orders-for-refund'
            },
            {
                name: 'Settle Orders',
                route: 'orders-settlement'
            },
        ],
    },
    {
        name: 'Payouts',
        icon: 'assets/icons/finance.svg',
        route: 'payouts'
    },
    {
        name: 'Upload Data',
        icon: 'assets/icons/upload-data.svg',
        route: 'upload-data'
    },
    {
        name: 'Download Data',
        icon: 'assets/icons/download-data.svg',
        route: 'download-data'
    },
    {
        name: 'Catalog Approval',
        icon: 'assets/icons/catalog-approval-icon.svg',
        route: 'catalog-approval'
    },
    {
        name: 'Menu Changes',
        icon: 'assets/icons/menu-changes-approval-icon.svg',
        subMenu: [
            {
                name: 'Review',
                route: 'menu-changes-review'
            },
            {
                name: 'History',
                route: 'menu-changes-review-history'
            }
        ],
    },
    {
        name: 'Subscriptions',
        icon: 'assets/icons/subscription-icon.svg',
        subMenu: [
            {
                name: 'Plans',
                route: 'subscription-plans'
            },
            {
                name: 'All Subscriptions',
                route: 'subscriptions'
            },
            {
                name: 'Payments',
                route: 'subscription-payments'
            }
        ],
    },
    {
        name: 'Customer-review',
        icon: 'assets/icons/customer-review.svg',
        route: 'customer-review'
    },
    {
        name: 'Alerts',
        icon: 'assets/icons/alerts-icon.svg',
        route: 'alerts'
    },
    {
        name: 'Client',
        icon: 'assets/icons/client-icon.svg',
        route: 'client'
    },
    {
        name: 'Operational City',
        icon: 'assets/icons/operational-city.svg',
        route: 'operational-city'
    },
    {
        name: 'Operational Zone',
        icon: 'assets/icons/operational-zone.svg',
        route: 'operational-zone'
    },
    {
        name: 'Black Zone',
        icon: 'assets/icons/operational-zone.svg',
        route: 'black-zone'
    },
    {
        name: 'Tracking',
        icon: 'assets/icons/tracking.svg',
        route: 'live-tracking'
    },
    {
        name: 'Riders Allocation',
        icon: 'assets/icons/rider-icon.svg',
        route: 'riders-allocation'
    },
    {
        name: 'Rider Shifts',
        icon: 'assets/icons/rider-shift-icon.svg',
        route: 'rider-shifts'
    },
    {
        name: 'POD Collections',
        icon: 'assets/icons/finance.svg',
        route: 'rider-pod-collections'
    },
    {
        name: 'POD Deposits',
        icon: 'assets/icons/pod-deposit-icon.svg',
        route: 'rider-pod-deposits'
    },
    {
        name: 'Surge mapping',
        icon: 'assets/icons/surge-mapping-icon.svg',
        route: 'surge-mapping'
    },
    {
        name: 'Customers',
        icon: 'assets/icons/customer-icon.svg',
        route: 'customers'
    },
    {
        name: 'Admin Users',
        icon: 'assets/icons/admin-icon.svg',
        route: 'admin-users'
    },
    {
        name: 'City',
        icon: 'assets/icons/city.svg',
        route: 'city'
    },
    {
        name: 'Area',
        icon: 'assets/icons/area.svg',
        route: 'area'
    },
    {
        name: 'Client Logs',
        icon: 'assets/icons/client-logs-icon.svg',
        route: 'client-logs'
    },
    {
        name: 'All Services',
        icon: 'assets/icons/all-services.svg',
        route: 'all-services'
    },
    {
        name: 'Vendor Users',
        icon: 'assets/icons/admin-icon.svg',
        route: 'vendor-users'
    },
    {
        name: 'Merchants',
        icon: 'assets/icons/admin-icon.svg',
        route: 'pnd-merchant'
    },
    {
        name: 'KYC Pending',
        icon: 'assets/icons/client-logs-icon.svg',
        route: 'pnd-merchant-kyc-pending'
    },
    {
        name: 'Data Dump',
        icon: 'assets/icons/data-dump.svg',
        subMenu: [
            // {
            //   name: 'Items',
            //   route: 'data-dump/items',
            // },
            {
                name: 'Cuisines',
                route: 'data-dump/cuisines'
            },
            {
                name: 'Master Category',
                route: 'data-dump/master-category'
            },
            // {
            //   name: 'Vendor-Users',
            //   route: 'data-dump/vendor-users',
            // },
            {
                name: 'Category',
                route: 'data-dump/pnd-category'
            },
            {
                name: 'Cancellation Reason',
                route: 'data-dump/cancellation-reason'
            },
            {
                name: 'Global Var',
                route: 'data-dump/global-var'
            },
            {
                name: 'Master Shifts',
                route: 'data-dump/shifts'
            },
            {
                name: 'Change Logs',
                route: 'data-dump/change-logs'
            },
            {
                name: 'Master Surge',
                route: 'data-dump/master-surge'
            },
            {
                name: 'Banner',
                route: 'data-dump/banner'
            },            
        ],
    },
    {
        name: 'Push Notifications',
        icon: 'assets/icons/home.svg',
        route: 'push-notifications'
    },
];

export interface INavLink {
    name: string;
    icon?: string;
    route?: string;
    subMenu?: INavLink[]
    filteredSubMenu?: INavLink[]
}

export const ServiceDisplayName: { [key in Services]?: string } = {
    [Services.Live]: 'Live',
    [Services.Food]: 'Food',
    [Services.Grocery]: 'Grocery',
    [Services.PND]: 'Pickup & Drop',
    [Services.Paan]: 'Paan',
    [Services.Flower]: 'Flower',
    [Services.Pharmacy]: 'Pharmacy',
    [Services.Pet]: 'Pet',
    [Services.Rider]: 'Rider',
    [Services.User]: 'User',
    [Services.Core]: 'Core',
    [Services.Notification]: 'Notification',
    [Services.Cab]: 'Cab'
}