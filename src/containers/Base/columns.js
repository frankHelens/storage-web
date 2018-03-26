export default {
  code: {
    label: '商品编号',
    width: 110,
    filter: {
      width: 80,
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: 'custom'
  },
  name: {
    label: '商品名称',
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
  type: {
    label: '商品类别',
    width: 110,
    type: 'select',
    filter: {
      width: 115,
      type: 'select'
    },
    form: {
      type: 'select'
    },
    relation: 'productType',
    sortable: true
  },
  unit: {
    label: '单位',
    width: 110,
    type: 'select',
    filter: {
      type: 'select',
      like: true
    },
    form: {
      type: 'select'
    },
    relation: 'unit',
    sortable: true
  },
  safeNum: {
    label: '安全库存',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: 'custom'
  },
  productNum: {
    // label: '仓库库存',
    label: '库存数量',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  storeNum: {
    label: '店面库存',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  totalNum: {
    label: '总库存',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  price: {
    label: '金额',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  newPrice: {
    label: '最新金额',
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
    width: 200,
    form: {
      type: 'textarea'
    }
  },
  createdAt: {
    width: 110,
    label: '创建时间',
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
