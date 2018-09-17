export const navItems = [
  {
    name: 'Dashboard',
    url: '/manage/dashboard',
    icon: 'icon-speedometer',
    roles: ['MANAGER'],
  },
  {
    name: 'Nhân viên',
    url: '/manage/user',
    icon: 'icon-puzzle',
    roles: ['MANAGER'],
    children: [
      {
        name: 'Danh sách',
        url: '/manage/user/list',
        icon: 'icon-people'
      },
      {
        name: 'Thêm mới',
        url: '/manage/user/create',
        icon: 'icon-user-follow'
      }
    ]
  },
  {
    name: 'Quản lý Bàn',
    url: '/manage/table',
    icon: 'icon-puzzle',
    roles: ['MANAGER'],
    children: [
      {
        name: 'Danh sách bàn',
        url: '/manage/table',
        icon: 'icon-people'
      },
      {
        name: 'Tạo bàn',
        url: '/manage/table/create',
        icon: 'icon-table-follow'
      }
    ]
  },
  {
    name: 'Quản lý danh mục thực đơn',
    url: '/manage/category',
    icon: 'icon-puzzle',
    roles: ['MANAGER'],
    children: [
      {
        name: 'Danh sách danh mục',
        url: '/manage/category/list',
        icon: 'icon-docs'
      },
      {
        name: 'Tạo danh mục',
        url: '/manage/category/create',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Quản lý món ăn',
    url: '/manage/food',
    icon: 'icon-puzzle',
    roles: ['MANAGER'],
    children: [
      {
        name: 'Danh sách món ăn',
        url: '/manage/food/list',
        icon: 'icon-docs'
      },
      {
        name: 'Tạo món ăn',
        url: '/manage/food/create',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Danh sách bàn trống',
    url: '/manage/view-available-table',
    icon: 'icon-cursor',
    roles: ['CUSTOMER','WAITER']
  },
  {
    name: 'Quản lý đặt bàn',
    url: '/manage/manage-table-booking',
    icon: 'cui-list',
    roles: ['CUSTOMER','WAITER']
  },
  {
    name: 'Trang Chủ',
    url: '/homepage',
    icon: 'icon-home',
    roles: ['CUSTOMER']
  },
  {
    name: 'Các món ăn',
    url: '/manage/chef',
    icon: 'icon-fire',
    roles: ['CHEF','WAITER']
  },
  {
    name: 'Thanh toán',
    url: '/manage/cashier',
    icon: 'icon-paypal',
    roles: ['CASHIER']
  }
];
