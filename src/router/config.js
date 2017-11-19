import Base from '@/containers/Config/Base'

export default {
  path: 'config',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    {
      path: 'adminVerifyType',
      component: Base,
      meta: {
        label: '行政审批类型',
        dictType: 'mgr_admin_verify_type',
        type: 'adminVerifyType'
      }
    },
    {
      path: 'guideType',
      component: Base,
      meta: {
        label: '办事指南类型',
        dictType: 'mgr_guide_type',
        type: 'guideType'
      }
    },
    {
      path: 'dangerType',
      component: Base,
      meta: {
        label: '隐患举报类型',
        dictType: 'mgr_danger_type',
        type: 'dangerType'
      }
    },
    {
      path: 'inexpensiveType',
      component: Base,
      meta: {
        label: '廉情举报类型',
        dictType: 'mgr_inexpensive_type',
        type: 'inexpensiveType'
      }
    },
    {
      path: 'messageType',
      component: Base,
      meta: {
        label: '短信类型',
        dictType: 'mgr_message_type',
        type: 'messageType'
      }
    }
  ]
}
