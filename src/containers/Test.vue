<template lang="pug">
  FormTable(
    :tableData="tableData"
    :tableList="tableList"
    :columns="columns")
</template>

<script>
import FormTable from '@/components/FormTable'
// import columns from '@/containers/Manage/EnterStock/columns'

export default {
  components: {
    FormTable
  },
  data () {
    return {
      tableList: ['code', 'name', 'type', 'unit', 'safeNum', 'productNum', 'storeNum', 'totalNum', 'price', 'newPrice', 'remark'],
      columns: {
        code: {
          label: '商品编号',
          width: 110,
          filter: {
            width: 80,
            type: 'input'
          },
          form: {
            type: 'select'
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
            type: 'select'
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
          label: '仓库库存',
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
            type: 'input'
          }
        }
      },
      tableData: [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }, {
        id: 5
      }, {
        id: 6
      }, {
        id: 7
      }, {
        id: 8
      }, {
        id: 9
      }, {
        id: 10
      }]
    }
  }
}
</script>
