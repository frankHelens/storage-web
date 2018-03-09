export default [{
//   id: 0,
//   label: '系统管理',
//   url: '/manager',
//   icon: 'gear-b',
//   type: 'MODULE'
// }, {
//   id: 1,
//   parentId: 0,
//   label: '用户管理',
//   url: '/manager/account',
//   icon: '',
//   type: 'PAGE'
// }, {
  id: 2,
  label: '基础信息',
  url: '',
  icon: 'document-text',
  type: 'MODULE'
}, {
  id: 3,
  parentId: 2,
  label: '商品列表',
  url: '/base/product',
  icon: 'document-text',
  type: 'MODULE'
}, {
  id: 4,
  label: '业务办理',
  url: '',
  icon: 'ios-compose',
  type: 'PAGE'
}, {
  id: 5,
  label: '入库管理',
  parentId: 4,
  url: '/manage/enterStock',
  icon: '',
  type: 'PAGE'
}, {
  id: 6,
  label: '入库单',
  parentId: 5,
  url: '/manage/enterStockDetail',
  icon: '',
  type: 'PAGE',
  noMenu: true
}]
