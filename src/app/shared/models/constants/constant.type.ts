export class ConstantType {
  id: number;
}
export interface IApiEndPoint {
  service: string;
  prefix?: string;
}

export enum Services {
  Food = 'food',
  Grocery = 'grocery',
  PND = 'pnd',
  Rider = 'rider',
  Paan = 'paan',
  Pharmacy ='pharmacy',
  User = 'user',
  Core = 'core',
  Flower = 'flower',
  Pet = 'pet',
  Live = 'live',
  Notification = 'notification',
  Cab = 'cab'
}

export enum Roles {
  superadmin = 'Super Admin',
  admin = 'Admin',
  serviceability = 'Serviceability',
  catalog = 'Catalog',
  oneview = 'One View',
  fleet_manager = 'Fleet Manager',
  ops_manager = 'Ops Manager',
  finance_manager = 'Finance Manager'
}

export interface IRouteAccess {
  service: Services[],
  role: Roles[]
}

export const apiEndPoints: { [key in Services]: IApiEndPoint} = {
  [Services.Food]: {service: 'food', prefix: 'restaurant'},
  [Services.Grocery]: {service:'grocery', prefix: 'store'},
  [Services.PND]: {service: 'pnd'},
  [Services.Rider]: {service: 'rider'},
  [Services.Pharmacy]: {service: 'pharmacy', prefix: 'outlet'},
  [Services.User]: {service:'user'},
  [Services.Core]: {service: 'core'},
  [Services.Paan]: {service:'paan', prefix: 'outlet'},
  [Services.Flower]: { service: 'flower', prefix: 'outlet' },
  [Services.Pet]: { service: 'pet', prefix: 'outlet'},
  [Services.Live]: {service: 'live'},
  [Services.Notification]: {service: 'notification'},
  [Services.Cab]: {service: 'cab'}

}

export const allowedRouteAccessTo: {[key: string]: IRouteAccess} = {
  '/': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy, Services.Rider,Services.User, Services.Core, Services.Paan, Services.Flower, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  }, // when there is no access to any route, user should land at this route
  '/home': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager, Roles.fleet_manager]
  },
  '/outlet-details': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  },
  '/data-dump/cuisines': {
    service: [Services.Food, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/data-dump/master-category': {
    service: [Services.Grocery, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/data-dump/cancellation-reason': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy,Services.Paan, Services.Flower, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/data-dump/pnd-category': {
    service: [Services.PND, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager,Roles.catalog]
  },
  '/data-dump/global-var': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Rider, Services.User, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin]
  },
  '/data-dump/shifts': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/data-dump/change-logs': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Rider, Services.Paan, Services.Flower, Services.User, Services.Pharmacy, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin]
  },
  '/data-dump/master-surge': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
'/data-dump/banner': {
  service: [Services.Core, Services.PND, Services.Cab],
  role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
},
  '/orders': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet, Services.Rider, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.oneview, Roles.ops_manager, Roles.catalog, Roles.finance_manager]
  },
  '/orders-for-cancellation': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager, Roles.finance_manager]
  },
  '/orders-for-refund': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager, Roles.finance_manager]
  },
  '/customer-orders': {
    service: [Services.Food, Services.Grocery, Services.PND, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.ops_manager,Roles.finance_manager]
  },  
  '/upload-data': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  },
  '/download-data': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  },
  '/payouts': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet, Services.PND, Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager, Roles.finance_manager]
  },
  '/catalog-approval': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  },
  '/menu-changes-review': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/menu-changes-review-history': {
    service: [Services.Food, Services.Grocery, Services.Pharmacy, Services.Paan, Services.Flower, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/subscription-plans': {
    service: [Services.Food, Services.Grocery, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/subscriptions': {
    service: [Services.Food, Services.Grocery, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/subscription-payments': {
    service: [Services.Food, Services.Grocery, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/riders-list': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager]
  },
  '/client': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/live-tracking': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager]
  },
  '/riders-allocation': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/orders-settlement': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager,Roles.finance_manager]
  },
  '/black-zone':{
    service:[Services.Rider],
    role:[Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/shifts': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
   '/rider-shifts': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager]
  },
   '/rider-pod-collections': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager,Roles.finance_manager]
  },
  '/rider-ping-logs': {
    service: [Services.Rider],
    role: [Roles.superadmin,Roles.admin, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/operational-city': {
    service: [Services.Rider],
    role: [Roles.superadmin,Roles.admin, Roles.ops_manager]
  },
  '/operational-zone': {
    service: [Services.Rider],
    role: [Roles.superadmin,Roles.admin, Roles.ops_manager]
  },
  '/rider-pod-deposits': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/live-dashboard': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/zone-statistics': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/alerts': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.fleet_manager, Roles.ops_manager]
  },
  '/customers': {
    service: [Services.User],
    role: [Roles.superadmin, Roles.admin]
  },
  '/admin-users': {
    service: [Services.User],
    role: [Roles.superadmin, Roles.admin]
  },
  '/city': {
    service: [Services.Core],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager]
  },
  '/area': {
    service: [Services.Core],
    role: [Roles.superadmin, Roles.serviceability, Roles.ops_manager]
  },
  '/client-logs': {
    service: [Services.Core],
    role: [Roles.superadmin, Roles.admin]
  },
  '/all-services': {
    service: [Services.Core],
    role: [Roles.superadmin, Roles.admin]
  },
  '/customer-review': {
    service: [Services.Food, Services.Grocery, Services.Paan, Services.Flower, Services.Pharmacy, Services.Pet],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/all-service-live-statistics': {
    service: [Services.Live],
    role: [Roles.superadmin, Roles.admin, Roles.serviceability, Roles.catalog, Roles.oneview, Roles.fleet_manager, Roles.ops_manager, Roles.finance_manager]
  },
  '/surge-mapping': {
    service: [Services.Rider],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager, Roles.finance_manager]
  },
  '/inquiry-orders': {
    service: [Services.Grocery],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  }, 
  '/pnd-merchant': {
    service: [Services.PND, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager,Roles.catalog]
  },
  '/pnd-merchant-kyc-pending': {
    service: [Services.PND, Services.Cab],
    role: [Roles.superadmin, Roles.admin, Roles.ops_manager,Roles.catalog]
  },
  '/push-notifications': {
    service: [Services.Notification],
    role: [Roles.superadmin, Roles.admin, Roles.catalog, Roles.ops_manager]
  },
  '/vendor-users': {
    service: [Services.User],
    role: [Roles.superadmin, Roles.admin]
  },
}

export const redirectConfig: { [key in Services]: { [key in Roles]: string } } = {
  [Services.Food]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',
  },
  [Services.Grocery]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',

  },
  [Services.PND]: {
    [Roles.superadmin]: 'orders',
    [Roles.admin]: 'orders',
    [Roles.serviceability]: '',
    [Roles.catalog]: 'orders',
    [Roles.fleet_manager]: '',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'orders',
    [Roles.finance_manager]: 'orders',
  },
  [Services.Rider]: {
    [Roles.superadmin]: 'live-dashboard',
    [Roles.admin]: 'live-dashboard',
    [Roles.serviceability]: 'live-dashboard',
    [Roles.catalog]: 'live-dashboard',
    [Roles.fleet_manager]: 'live-dashboard',
    [Roles.oneview]: 'live-dashboard',
    [Roles.ops_manager]: 'live-dashboard',
    [Roles.finance_manager]: 'live-dashboard',

  },
  [Services.Pharmacy]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',
  },
  [Services.User]: {
    [Roles.superadmin]: 'customers',
    [Roles.admin]: 'data-dump/global-var',
    [Roles.serviceability]: '',
    [Roles.catalog]: '',
    [Roles.fleet_manager]: '',
    [Roles.oneview]: '',
    [Roles.ops_manager]: '',
    [Roles.finance_manager]: ''
  },
  [Services.Core]: {
    [Roles.superadmin]: 'city',
    [Roles.admin]: 'city',
    [Roles.serviceability]: 'area',
    [Roles.catalog]: '',
    [Roles.fleet_manager]: '',
    [Roles.oneview]: '',
    [Roles.ops_manager]: 'city',
    [Roles.finance_manager]: ''
  },
  [Services.Paan]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',
  },
  [Services.Flower]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',
  },
  [Services.Pet]: {
    [Roles.superadmin]: 'home',
    [Roles.admin]: 'home',
    [Roles.serviceability]: 'customer-review',
    [Roles.catalog]: 'home',
    [Roles.fleet_manager]: 'customer-review',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'home',
    [Roles.finance_manager]: 'orders',
  },
  [Services.Live]: {
    [Roles.superadmin]: 'all-service-live-statistics',
    [Roles.admin]: 'all-service-live-statistics',
    [Roles.serviceability]: 'all-service-live-statistics',
    [Roles.catalog]: 'all-service-live-statistics',
    [Roles.fleet_manager]: 'all-service-live-statistics',
    [Roles.oneview]: 'all-service-live-statistics',
    [Roles.ops_manager]: 'all-service-live-statistics',
    [Roles.finance_manager]: 'all-service-live-statistics',
  },
  [Services.Notification]: {
    [Roles.superadmin]: 'push-notifications',
    [Roles.admin]: 'push-notifications',
    [Roles.serviceability]: '',
    [Roles.catalog]: 'push-notifications',
    [Roles.fleet_manager]: '',
    [Roles.oneview]: '',
    [Roles.ops_manager]: 'push-notifications',
    [Roles.finance_manager]: '',
  },
  [Services.Cab]: {
    [Roles.superadmin]: 'orders',
    [Roles.admin]: 'orders',
    [Roles.serviceability]: '',
    [Roles.catalog]: 'orders',
    [Roles.fleet_manager]: '',
    [Roles.oneview]: 'orders',
    [Roles.ops_manager]: 'orders',
    [Roles.finance_manager]: 'orders',
  },
}

export const pageSize: number = 25;
export const pageSizeOptions: number[] = [25, 50, 100, 200];

export const posErrorMsg = 'Restaurants registered with petpooja system can not take this action from speedyy web';
export const permissionDeniedErrorMsg = "You don't have enough access to perform this action";

export const dateFormat: string = 'dd/MM/YYYY';
export const dateShortTimeFormat: string = 'dd/MM/YYYY h:mm a';
export const dateLongTimeFormat: string = 'dd/MM/YYYY hh:mm:ss a';
export const maxFileUploadSizeAllowed: number  = 20971520 // 20 MB in bytes

export const polygonColors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];