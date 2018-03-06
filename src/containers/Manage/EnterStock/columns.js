export default {
  code: {
    label: '订单编号',
    width: 160,
    filter: {
      width: 80,
      type: 'input',
      like: true
    },
    form: {
      type: 'input'
    },
    sortable: 'custom'
  },
  origin: {
    label: '供应商',
    width: 200,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input'
    }
  },
  storageType: {
    label: '仓库名称',
    width: 110,
    type: 'select',
    filter: {
      width: 115,
      type: 'select'
    },
    form: {
      type: 'select'
    },
    relation: 'storageType',
    sortable: true
  },
  takePe: {
    label: '收货人',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input'
    }
  },
  makePe: {
    label: '制单人',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input'
    }
  },
  enterPrice: {
    label: '进货金额',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  remark: {
    label: '备注',
    form: {
      type: 'textarea'
    }
  },
  createdAt: {
    width: 110,
    label: '单据日期',
    type: 'time',
    dateType: 'YYYY-MM-DD',
    filter: {
      width: 100,
      type: 'daterange'
    },
    sortable: 'custom'
  },
  updatedAt: {
    width: 110,
    label: '更新时间',
    type: 'time',
    dateType: 'YYYY-MM-DD',
    filter: {
      width: 100,
      type: 'daterange'
    },
    sortable: 'custom'
  }
}
