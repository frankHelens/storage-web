// import SmartFormItem from '@/components/SmartForm/SmartFormItem'
// import {
//   Input
// } from 'element-ui'

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
      type: 'input',
      size: 6
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
      type: 'input',
      size: 6
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
      type: 'select',
      size: 6
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
      type: 'input',
      size: 6
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
      type: 'input',
      size: 6
    }
  },
  enterPrice: {
    label: '进货金额',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input',
      size: 6
    },
    sortable: true
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
  },
  productId: {
    width: 200,
    label: '商品编码',
    render: (h, params) => {
      return h('Select', {
        props: {
          filterable: true,
          remote: true,
          remoteMethod: (query) => {
            console.log(query)
          }
        }
      }, [
        h('Option', {
          props: {
            value: 'aaaaa'
          }
        }, 'aaaaa'),
        h('Option', {
          props: {
            value: 'bbbbb'
          }
        }, 'bbbbb'),
        h('Option', {
          props: {
            value: 'ccccc'
          }
        }, 'ccccc')
      ])
    }
  },
  enterNum: {
    width: 200,
    label: '入库金额',
    render: (h, params) => {
      return h('Input', {
        props: {
          value: params.row.enterNum
        }
      })
    }
  },
  discount: {
    width: 200,
    label: '折扣率',
    render: (h, params) => {
      return h('Input', {
        props: {
          value: params.row.discount
        }
      })
    }
  },
  remark: {
    label: '备注',
    width: 350,
    form: {
      type: 'input',
      size: 6
    },
    render: (h, params) => {
      return h('Input', {
        props: {
          value: params.row.remark
        }
      })
    }
  }
}
